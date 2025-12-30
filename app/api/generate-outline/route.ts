import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { courseTitle } = await request.json();

    if (!courseTitle) {
      return NextResponse.json(
        { success: false, error: "Course title is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate a comprehensive course outline for a course titled "${courseTitle}". 
    Return a JSON structure with the following format:
    {
      "modules": [
        {
          "title": "Module Title",
          "lessons": [
            { 
              "title": "Lesson Title",
              "content_type": "video" | "text" | "pdf" 
            }
          ]
        }
      ]
    }
    Rules:
    - Mix content types appropriately (e.g., "Introduction" -> video, "Summary" -> text, "Cheatsheet" -> pdf).
    - Ensure the outline is structured logically with progressive difficulty.
    - Do not include any markdown formatting or code blocks, just the raw JSON string.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown code blocks if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const outline = JSON.parse(text);

    return NextResponse.json({ success: true, outline });
  } catch (error: any) {
    console.error("Error generating course outline:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate course outline. " + (error.message || "") },
      { status: 500 }
    );
  }
}
