import { createClient } from "@/lib/supabase/client";

// —— Helpers ——
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
  section_order: number;
  questions: QuestionBlock[];
};

type QuestionBlock = {
  question_text: string;
  question_type: "MCQ" | "MSQ" | "NAT";
  options: { text: string; is_correct: boolean }[];
  correct_answer?: string | null;
  explanation?: string | null;
  marks: number;
  negative_marks: number;
  difficulty?: "easy" | "medium" | "hard";
  topic?: string;
  title?: string;
};

function stripComments(src: string): string {
  // remove LaTeX comments (%) to avoid confusing regex, preserve newlines
  return src.replace(/(^|[\r\n])\s*%.*$/gm, "$1");
}

// Matches: \textbf{Label:} value
function metaLine(text: string, label: string): string | null {
  const re = new RegExp(`\\\\textbf\\{${label}:\\}\\s*([^\\\\\\n]+)`, "i");
  return re.exec(text)?.[1]?.trim() ?? null;
}

// Collect all matches (group 1) for a regex with the global flag
function collect(text: string, re: RegExp): string[] {
  return [...text.matchAll(re)].map((m) => m[1].trim());
}

// —— Parser ——
export async function parseExamLatex(file: File): Promise<ExamBlock> {
  const raw = await file.text();
  const text = stripComments(raw);

  // Exam title from \begin{exam}{Title}
  const title = (text.match(/\\begin{exam}\{([^}]*)\}/)?.[1] || "Untitled Exam").trim();

  const exam: ExamBlock = {
    title,
    description: metaLine(text, "Description") || "",
    duration_minutes: Number((metaLine(text, "Duration") || "0").replace(/minutes?/i, "").trim()),
    total_marks: Number(metaLine(text, "Total Marks") || 0),
    negative_marking: Number(metaLine(text, "Negative Marking") || 0),
    status: (metaLine(text, "Status")?.toLowerCase() || "draft") as "draft" | "published" | "archived",
    start_time: metaLine(text, "Start Time") || undefined,
    end_time: metaLine(text, "End Time") || undefined,
    sections: [],
  };

  // Sections
  const sectionBlocks = text.split("\\begin{examsection}").slice(1);
  for (const sb of sectionBlocks) {
    const headerMatch = sb.match(/\{(\d+)\}\{([^}]*)\}/); // {order}{title}
    const section_order = Number(headerMatch?.[1] ?? 0);
    const section_title = (headerMatch?.[2] ?? "Untitled").trim();

    const sectionBody = sb.split("\\end{examsection}")[0];

    // Find positions of each question start, bound blocks accordingly
    const qStartMatches = [...sectionBody.matchAll(/^\s*\\question\s*(?=\{)/gm)];
    const starts = qStartMatches.map((m) => m.index ?? 0);
    // nothing found → empty section
    if (!starts.length) {
      exam.sections.push({ title: section_title, section_order, questions: [] });
      continue;
    }
    starts.push(sectionBody.length); // sentinel end

    const questions: QuestionBlock[] = [];

    for (let i = 0; i < starts.length - 1; i++) {
      const start = starts[i]!;
      const end = starts[i + 1]!;
      let qblock = sectionBody.slice(start, end);

      // remove the leading \question and spaces
      qblock = qblock.replace(/^\s*\\question\s*/m, "");

      // Header: {TYPE}{TEXT}{MARKS}{NEG}{DIFF}{TOPIC}{TITLE}
      // Allow spaces around braces and multiline TEXT
      const headerRe =
        /^\{\s*([^}]*)\s*\}\s*\{\s*([\s\S]*?)\s*\}\s*\{\s*([^}]*)\s*\}\s*\{\s*([^}]*)\s*\}\s*\{\s*([^}]*)\s*\}\s*\{\s*([^}]*)\s*\}(?:\s*\{\s*([^}]*)\s*\})?/;
      const meta = qblock.match(headerRe);
      if (!meta) continue; // skip malformed question

      const qType = (meta[1] || "MCQ").toUpperCase() as "MCQ" | "MSQ" | "NAT";
      const qText = (meta[2] || "").trim();
      const marks = Number(meta[3] || 1);
      const neg = Number(meta[4] || 0);
      const diff = (meta[5] || "easy").toLowerCase() as "easy" | "medium" | "hard";
      const topic = ((meta[6] || '').trim()) || undefined;
      const title = ((meta[7] || '').trim()) || exam.title; // Use custom title or fallback to exam name

      const content = qblock.slice(meta[0].length).trim();

      // Options (optional)
      const options: { text: string; is_correct: boolean }[] = [];
      const optionsMatch = content.match(/\\begin{options}([\s\S]*?)\\end{options}/);
      if (optionsMatch) {
        // Each \item can be multiline; capture until next \item or end
        const items: string[] = [];
        const body = optionsMatch[1];
        const itemRe = /\\item\s+([\s\S]*?)(?=\\item\s+|$)/g;
        for (const m of body.matchAll(itemRe)) {
          items.push(m[1].trim());
        }
        items.forEach((t) => options.push({ text: t, is_correct: false }));
      }

      // Answer(s)
      const ansRaw = (content.match(/\\answer\{([^}]*)\}/)?.[1] || "").trim();
      if (ansRaw && (qType === "MCQ" || qType === "MSQ")) {
        ansRaw.split(",").forEach((token) => {
          const a = token.trim();
          let idx = -1;
          if (/^[A-Za-z]$/.test(a)) {
            idx = a.toUpperCase().charCodeAt(0) - 65; // A→0
          } else if (/^\d+$/.test(a)) {
            idx = Number(a) - 1; // 1-based → 0-based
          }
          if (idx >= 0 && options[idx]) options[idx].is_correct = true;
        });
      }

      // Explanation (optional) - simple format, keep as-is for LaTeX math rendering
      const explanation = content.match(/\\explanation\{([\s\S]*)\}$/)?.[1] ?? null;

      // Final push
      questions.push({
        question_text: qText,
        question_type: qType,
        options: qType === "NAT" ? [] : options,
        correct_answer: qType === "NAT" ? (ansRaw || null) : null,
        explanation,
        marks,
        negative_marks: neg,
        difficulty: diff,
        topic,
        title
      });
    }

    exam.sections.push({
      title: section_title,
      section_order,
      questions,
    });
  }

  return exam;
}


// 🔎 Insert Exam + Sections + Questions into Supabase (OPTIMIZED with BATCH INSERTS)
export async function importExamLatex(
  file: File,
  adminId: string,
  onProgress?: (progress: number, message: string) => void
) {
  const supabase = createClient();
  const exam = await parseExamLatex(file);

  // Progress helper
  const updateProgress = (progress: number, message: string) => {
    if (onProgress) onProgress(progress, message);
  };

  updateProgress(5, "Validating tenant...");

  // Get tenant ID from user's active tenant membership
  const { data: membership } = await supabase
    .from('user_tenant_memberships')
    .select('tenant_id')
    .eq('user_id', adminId)
    .eq('is_active', true)
    .single();

  const tenantId = membership?.tenant_id;

  if (!tenantId) {
    throw new Error('No active tenant found for user');
  }

  updateProgress(10, "Creating exam...");

  // Insert exam with tenant_id
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
  const sectionsToInsert = exam.sections.map((sec) => {
    const sectionTotalMarks = sec.questions.reduce((sum, q) => {
      const m = Number.isFinite(q.marks) ? Number(q.marks) : 0;
      return sum + m;
    }, 0);

    return {
      tenant_id: tenantId,
      exam_id: examId,
      title: sec.title,
      duration_minutes: 0,
      total_marks: sectionTotalMarks,
      section_order: sec.section_order,
    };
  });

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
        title: q.title,
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
