import { createClient } from "@/lib/supabase/client";

// ... (keep all existing imports and types)

// Parse explanation - SIMPLIFIED VERSION
function parseExplanation(content: string): {
    type: 'structured' | 'freeform' | 'simple';
    text?: string;
    given?: string;
    solution?: string;
    steps?: string;
} | null {
    // Extract explanation content
    const match = content.match(/\\explanation\{([\s\S]*?)\}/);
    if (!match) return null;

    let explanationText = match[1].trim();
    if (!explanationText) return null;

    console.log('=== PARSING EXPLANATION ===');
    console.log('Raw text:', explanationText.substring(0, 200));

    // Clean LaTeX formatting - do it IMMEDIATELY
    const cleanText = (text: string) => {
        const cleaned = text
            .replace(/\\textbf\{([^}]*)\}/g, '$1')
            .replace(/\\textit\{([^}]*)\}/g, '$1')
            .replace(/\\emph\{([^}]*)\}/g, '$1')
            .replace(/\\text\{([^}]*)\}/g, '$1')
            .replace(/\\\\/g, '\n')
            .replace(/\\noindent\s*/g, '')
            .replace(/\\par\s*/g, '\n\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
        console.log('Cleaned:', cleaned.substring(0, 100));
        return cleaned;
    };

    // Check for structured format
    if (explanationText.includes('\\textbf{Given:}') ||
        explanationText.includes('\\textbf{Solution:}') ||
        explanationText.includes('\\textbf{Steps:}')) {

        console.log('Detected STRUCTURED format');

        // Extract sections
        const parts = explanationText.split(/\\textbf\{(?:Given|Solution|Steps):\}/);
        const labels = explanationText.match(/\\textbf\{(Given|Solution|Steps):\}/g) || [];

        const result: any = { type: 'structured' };

        for (let i = 0; i < labels.length; i++) {
            const label = labels[i].match(/\{(.*?):/)?.[1]?.toLowerCase();
            const text = parts[i + 1]?.trim();
            if (label && text) {
                result[label] = cleanText(text);
            }
        }

        console.log('Structured result:', result);
        return result;
    }

    // Check for display math
    if (explanationText.includes('\\[')) {
        console.log('Detected FREEFORM format');
        return {
            type: 'freeform',
            text: cleanText(explanationText)
        };
    }

    // Simple format
    console.log('Detected SIMPLE format');
    return {
        type: 'simple',
        text: cleanText(explanationText)
    };
}

export { parseExplanation };
