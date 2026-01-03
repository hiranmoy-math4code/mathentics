import { ImportedQuestion } from "./types";

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

export async function parseExcelQuestions(file: File): Promise<ImportedQuestion[]> {
  try {
    // Load XLSX from CDN
    await loadScript('https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js');

    // Wait a bit for global to be available
    if (!(window as any).XLSX) {
      await new Promise(r => setTimeout(r, 100));
    }

    const XLSX = (window as any).XLSX;
    if (!XLSX) throw new Error("XLSX library not loaded");

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    return rows.map((row, idx): ImportedQuestion => {
      const qType = (row["QUESTION TYPE"] || "MCQ").toUpperCase();

      // ✅ NAT → no options
      if (qType === "NAT") {
        return {
          title: row["TITLE"] || `Question ${idx + 1}`,
          question_text: row["QUESTION TEXT"],
          subject: row["SUBJECT"] || null,
          topic: row["TOPIC"] || null,
          question_type: "NAT",
          options: [], // always empty
          correct_answer: String(row["RIGHT ANSWER"] ?? "").trim(),
          explanation: row["EXPLANATION"] ?? null,
          marks: Number(row["CORRECT MARKS"] ?? 1),
          negative_marks: Number(row["NEGATIVE MARKS"] ?? 0),
          difficulty: (row["DIFFICULTY"] || "easy").toLowerCase(),
        };
      }

      // ✅ MCQ / MSQ → normal options
      const rightAnswers = String(row["RIGHT ANSWER"] || "")
        .split(",")
        .map((v: string) => v.trim());

      const options = Array.from({ length: 10 })
        .map((_, i) => {
          const text = row[`OPTION ${i + 1}`];
          if (!text) return null;
          const isCorrect = rightAnswers.includes(String(i + 1));
          return { text, is_correct: isCorrect };
        })
        .filter(Boolean) as { text: string; is_correct?: boolean }[];

      return {
        title: row["TITLE"] || `Question ${idx + 1}`,
        question_text: row["QUESTION TEXT"],
        subject: row["SUBJECT"] || null,
        topic: row["TOPIC"] || null,
        question_type: qType,
        options,
        correct_answer: rightAnswers.join(","), // keep for reference
        explanation: row["EXPLANATION"] ?? null,
        marks: Number(row["CORRECT MARKS"] ?? 1),
        negative_marks: Number(row["NEGATIVE MARKS"] ?? 0),
        difficulty: (row["DIFFICULTY"] || "easy").toLowerCase(),
      };
    });
  } catch (error) {
    console.error("Error parsing Excel:", error);
    throw error;
  }
}
