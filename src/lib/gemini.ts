import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client
// It automatically looks for the GEMINI_API_KEY in process.env
export const ai = new GoogleGenAI({});
