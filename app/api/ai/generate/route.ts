import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { prompt, systemInstruction } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { success: false, error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: "AI Service Configuration Error: API Key missing" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Using gemini-1.5-flash for speed and efficiency
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction ? { role: 'system', parts: [{ text: systemInstruction }] } : undefined
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ success: true, text });

    } catch (error: any) {
        console.error("AI Generation Error:", error);

        // Handle Gemini Safety/Quota errors gracefully
        const errorMessage = error.message?.includes("quota")
            ? "Usage limit exceeded. Please try again later."
            : error.message || "Failed to generate content";

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
