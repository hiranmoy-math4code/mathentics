import { renderWithLatex } from "@/lib/renderWithLatex";

interface ExplanationRendererProps {
    explanation: string | null;
}

export function ExplanationRenderer({ explanation }: ExplanationRendererProps) {
    if (!explanation) return null;

    return (
        <div className="explanation-simple">
            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Explanation:</h4>
            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {renderWithLatex(explanation)}
            </div>
        </div>
    );
}
