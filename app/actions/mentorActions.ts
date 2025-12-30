"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Securely call Gemini from the server.
 * This prevents the API key from being exposed in the browser.
 */
export async function callGeminiAction(prompt: string, systemInstruction: string = "") {
    try {
        // Preference: Server-side secret first, then public key as fallback
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            console.error("❌ Gemini API Key missing in environment");
            return {
                success: false,
                error: "AI service is currently unavailable. Please contact support."
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Using gemini-1.5-flash for maximum reliability and speed
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
            }
        });

        const contents = [{ role: 'user' as const, parts: [{ text: prompt }] }];

        const result = await model.generateContent({
            contents,
            systemInstruction: systemInstruction ? { role: 'system' as const, parts: [{ text: systemInstruction }] } : undefined
        });

        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            text: text || "I'm sorry, I couldn't generate a response."
        };
    } catch (error: any) {
        console.error("💥 Gemini Server Action Error:", error);

        // Handle specific safety or quota errors if possible
        const errorMessage = error.message?.includes("quota")
            ? "API Quota exceeded. Please try again in a minute."
            : "Failed to connect to AI mentor. Please try again later.";

        return {
            success: false,
            error: errorMessage
        };
    }
}
