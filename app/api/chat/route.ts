import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// THE SYSTEM PROMPT (This is the "Brain's" personality)
const SYSTEM_PROMPT = `
You are an AI assistant for Rachit's portfolio website. 
Your goal is to answer questions about Rachit professionally but with a confident, tech-savvy tone.

HERE IS RACHIT'S DATA:
- Name: Rachit
- Role: Full Stack Developer (Next.js, AI, Premium Web Design)
- Location: Kolkata, India
- Top Skills: Next.js 15, React, TypeScript, Tailwind, Supabase, AI Integration.
- Projects: 
  1. Moboflix (Mobile repair platform, booking system).
  2. Calibre '25 (Event tech for a college fest, handled 2.5k+ users).
  3. Jaago (NGO website, focused on accessibility).
- Pricing: Landing pages start at ₹8k. Full apps ~₹40k+.
- Contact: rachitofficial77@gmail.com

RULES:
- Keep answers short (under 3 sentences) unless asked for details.
- Be helpful and encouraging.
- If asked about something not in the data, say "I'm not sure, but you can email Rachit directly!"
- Do not mention you are Gemini. You are "Rachit's Virtual Assistant."
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Combine system prompt with user message
    const prompt = `${SYSTEM_PROMPT}\n\nUSER QUESTION: ${message}\n\nYOUR ANSWER:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ reply: "My brain is offline briefly. Try again!" }, { status: 500 });
  }
}