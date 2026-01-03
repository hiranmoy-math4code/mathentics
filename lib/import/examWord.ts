
import { createClient } from "@/lib/supabase/client";

type ExamBlock = {
  title: string;
  description?: string;
  duration_minutes: number;
  total_marks: number;
  negative_marking: number;
  status: "draft" | "published" | "archived";
  start_time?: string;
  end_time?: string;
  sections: SectionBlock[];
};

type SectionBlock = {
  title: string;
  duration_minutes: number;
  total_marks: number;
  section_order: number;
  questions: QuestionBlock[];
};

type QuestionBlock = {
  question_text: string;
  question_type: "MCQ" | "MSQ" | "NAT";
  options: { text: string; is_correct: boolean }[];
  correct_answer?: string;
  explanation?: string;
  marks: number;
  negative_marks: number;
  difficulty?: "easy" | "medium" | "hard";
  topic?: string;
};

function getField(block: string, label: string): string {
  const regex = new RegExp(`\\{${label}\\}\\s*([^\\n]*)`, "i");
  const match = block.match(regex);
  return match ? match[1].trim() : "";
}

// 🔎 Parse the Word .docx into structured Exam
export async function parseExamWord(file: File): Promise<ExamBlock> {
  const buf = await file.arrayBuffer();
  const { default: mammoth } = await import("mammoth");
  const { value } = await mammoth.extractRawText({ arrayBuffer: buf });

  // exam block
  const examBlock = value.split("{EXAM BEGINS}")[1].split("{EXAM ENDS}")[0];

  const exam: ExamBlock = {
    title: getField(examBlock, "EXAM TITLE"),
    description: getField(examBlock, "DESCRIPTION"),
    duration_minutes: Number(getField(examBlock, "DURATION MINUTES") || 0),
    total_marks: Number(getField(examBlock, "TOTAL MARKS") || 0),
    negative_marking: Number(getField(examBlock, "NEGATIVE MARKING") || 0),
    status: (getField(examBlock, "STATUS") || "draft") as any,
    start_time: getField(examBlock, "START TIME") || undefined,
    end_time: getField(examBlock, "END TIME") || undefined,
    sections: [],
  };

  // sections
  const sectionBlocks = examBlock.split("{SECTION BEGINS}").slice(1);
  for (const sb of sectionBlocks) {
    const sectionPart = sb.split("{SECTION ENDS}")[0];
    const section: SectionBlock = {
      title: getField(sectionPart, "SECTION TITLE"),
      duration_minutes: Number(getField(sectionPart, "DURATION MINUTES") || 0),
      total_marks: Number(getField(sectionPart, "TOTAL MARKS") || 0),
      section_order: Number(getField(sectionPart, "SECTION ORDER") || 0),
      questions: [],
    };

    const qBlocks = sectionPart.split("{QUESTION BEGINS}").slice(1);
    for (const qb of qBlocks) {
      const qPart = qb.split("{QUESTION ENDS}")[0];
      const qType = (getField(qPart, "QUESTION TYPE") || "MCQ").toUpperCase();

      const rightAns = getField(qPart, "RIGHT ANSWER");
      const options = Array.from({ length: 10 })
        .map((_, i) => {
          const txt = getField(qPart, `OPTION ${i + 1}`);
          if (!txt) return null;
          const isCorrect =
            rightAns.split(",").map((x) => x.trim()).includes(String(i + 1));
          return { text: txt, is_correct: isCorrect };
        })
        .filter(Boolean) as { text: string; is_correct: boolean }[];

      const question: QuestionBlock = {
        question_text: getField(qPart, "QUESTION TEXT"),
        question_type: qType as any,
        options: qType === "NAT" ? [] : options,
        correct_answer: qType === "NAT" ? rightAns : undefined,
        explanation: getField(qPart, "EXPLANATION"),
        marks: Number(getField(qPart, "CORRECT MARKS") || 1),
        negative_marks: Number(getField(qPart, "NEGATIVE MARKS") || 0),
        difficulty: (getField(qPart, "DIFFICULTY") || "easy") as any,
        topic: getField(qPart, "TOPIC"),
      };

      section.questions.push(question);
    }

    exam.sections.push(section);
  }

  return exam;
}

// 🔎 Insert Exam + Sections + Questions into Supabase (OPTIMIZED with BATCH INSERTS)
export async function importExamToSupabase(
  file: File,
  adminId: string,
  onProgress?: (progress: number, message: string) => void
) {
  const exam = await parseExamWord(file);
  const supabase = createClient();

  // Progress helper
  const updateProgress = (progress: number, message: string) => {
    if (onProgress) onProgress(progress, message);
  };

  updateProgress(5, "Validating tenant...");

  // Get tenant ID from headers (server-side) or user membership
  let tenantId: string | null = null;

  // Try to get from user's active tenant membership
  const { data: membership } = await supabase
    .from('user_tenant_memberships')
    .select('tenant_id')
    .eq('user_id', adminId)
    .eq('is_active', true)
    .single();

  tenantId = membership?.tenant_id || null;

  if (!tenantId) {
    throw new Error('No active tenant found for user');
  }

  updateProgress(10, "Creating exam...");

  // insert exam with tenant_id
  const { data: examRow, error: examErr } = await supabase
    .from("exams")
    .insert({
      tenant_id: tenantId,
      admin_id: adminId,
      title: exam.title,
      description: exam.description,
      duration_minutes: exam.duration_minutes,
      total_marks: exam.total_marks,
      negative_marking: exam.negative_marking,
      status: exam.status,
      start_time: exam.start_time,
      end_time: exam.end_time,
    })
    .select("id")
    .single();

  if (examErr) throw examErr;

  const examId = examRow.id;

  updateProgress(20, "Creating sections...");

  // 🚀 BATCH INSERT: All sections at once
  const sectionsToInsert = exam.sections.map((sec) => ({
    tenant_id: tenantId,
    exam_id: examId,
    title: sec.title,
    duration_minutes: sec.duration_minutes,
    total_marks: sec.total_marks,
    section_order: sec.section_order,
  }));

  const { data: sectionRows, error: sectionsErr } = await supabase
    .from("sections")
    .insert(sectionsToInsert)
    .select("id, section_order");

  if (sectionsErr) throw sectionsErr;

  // Create a map of section_order -> section_id for quick lookup
  const sectionOrderToId = new Map(
    sectionRows.map(row => [row.section_order, row.id])
  );

  updateProgress(30, "Preparing questions...");

  // 🚀 BATCH PREPARATION: Collect all questions and options
  const allQuestionsInserts: any[] = [];
  const allQuestionBankInserts: any[] = [];
  const questionToSectionMap: Array<{ sectionOrder: number; questionIndex: number }> = [];

  exam.sections.forEach((sec) => {
    const sectionId = sectionOrderToId.get(sec.section_order);
    if (!sectionId) return;

    sec.questions.forEach((q, qIndex) => {
      // Track mapping for later option insertion
      questionToSectionMap.push({
        sectionOrder: sec.section_order,
        questionIndex: qIndex
      });

      // 🎯 PRIORITY 1: Questions insert (for exam delivery)
      allQuestionsInserts.push({
        tenant_id: tenantId,
        section_id: sectionId,
        question_text: q.question_text,
        question_type: q.question_type,
        marks: q.marks,
        negative_marks: q.negative_marks,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        question_order: qIndex,
      });

      // 🎯 PRIORITY 2: Question bank insert (for reference/reuse)
      allQuestionBankInserts.push({
        tenant_id: tenantId,
        admin_id: adminId,
        title: q.question_text.slice(0, 50), // short title
        question_text: q.question_text,
        question_type: q.question_type,
        marks: q.marks,
        negative_marks: q.negative_marks,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        subject: sec.title,
        topic: q.topic,
        difficulty: q.difficulty,
      });
    });
  });

  updateProgress(40, `Inserting ${allQuestionsInserts.length} exam questions...`);

  // 🚀 BATCH INSERT PRIORITY 1: All questions at once (EXAM DELIVERY)
  const { data: questionRows, error: qErr } = await supabase
    .from("questions")
    .insert(allQuestionsInserts)
    .select("id");

  if (qErr) throw qErr;

  updateProgress(55, "Inserting exam options...");

  // 🚀 BATCH INSERT PRIORITY 1: All options at once (EXAM DELIVERY)
  const allOptions: any[] = [];

  exam.sections.forEach((sec) => {
    sec.questions.forEach((q, qIdx) => {
      const globalQuestionIndex = questionToSectionMap.findIndex(
        m => m.sectionOrder === sec.section_order && m.questionIndex === qIdx
      );

      if (globalQuestionIndex === -1 || !questionRows[globalQuestionIndex]) return;

      const questionId = questionRows[globalQuestionIndex].id;

      if (q.options.length > 0) {
        q.options.forEach((opt, optIdx) => {
          allOptions.push({
            tenant_id: tenantId,
            question_id: questionId,
            option_text: opt.text,
            option_order: optIdx + 1,
            is_correct: opt.is_correct,
          });
        });
      }
    });
  });

  if (allOptions.length > 0) {
    const { error: optionsErr } = await supabase
      .from("options")
      .insert(allOptions);

    if (optionsErr) throw optionsErr;
  }

  updateProgress(70, "Inserting questions into question bank...");

  // 🚀 BATCH INSERT PRIORITY 2: All question_bank entries (REFERENCE)
  const { data: questionBankRows, error: qbErr } = await supabase
    .from("question_bank")
    .insert(allQuestionBankInserts)
    .select("id");

  if (qbErr) throw qbErr;

  updateProgress(85, "Inserting question bank options...");

  // 🚀 BATCH INSERT PRIORITY 2: All question_bank_options (REFERENCE)
  const allQuestionBankOptions: any[] = [];

  exam.sections.forEach((sec) => {
    sec.questions.forEach((q, qIdx) => {
      const globalQuestionIndex = questionToSectionMap.findIndex(
        m => m.sectionOrder === sec.section_order && m.questionIndex === qIdx
      );

      if (globalQuestionIndex === -1 || !questionBankRows[globalQuestionIndex]) return;

      const questionBankId = questionBankRows[globalQuestionIndex].id;

      if (q.options.length > 0) {
        q.options.forEach((opt, optIdx) => {
          allQuestionBankOptions.push({
            tenant_id: tenantId,
            question_id: questionBankId,
            option_text: opt.text,
            option_order: optIdx + 1,
            is_correct: opt.is_correct,
          });
        });
      }
    });
  });

  if (allQuestionBankOptions.length > 0) {
    const { error: qbOptionsErr } = await supabase
      .from("question_bank_options")
      .insert(allQuestionBankOptions);

    if (qbOptionsErr) throw qbOptionsErr;
  }

  updateProgress(100, "Import completed!");

  return { exam, examId };
}
