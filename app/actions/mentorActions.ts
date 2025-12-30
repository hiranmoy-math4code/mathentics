"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Securely call Gemini from the server.
 * This prevents the API key from being exposed in the browser.
 */
export async function callGeminiAction(prompt: string, systemInstruction: string = "") {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("Gemini API key is not configured in environment variables.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using 1.5-flash as it is more stable than the preview versions often used
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const contents = [{ role: 'user' as const, parts: [{ text: prompt }] }];

        // Proper handling of system instructions for Gemini 1.5
        const result = await model.generateContent({
            contents,
            systemInstruction: systemInstruction ? { role: 'system' as const, parts: [{ text: systemInstruction }] } : undefined
        });

        const response = await result.response;
        return {
            success: true,
            text: response.text() || "I couldn't generate a response."
        };
    } catch (error: any) {
        console.error("Gemini Server Action Error:", error);
        return {
            success: false,
            error: error.message || "Failed to connect to the AI service."
        };
    }
}
