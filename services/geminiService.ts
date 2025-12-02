import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production app, you might proxy this through a backend to keep the key secret,
// but for this client-side demo as requested, we use the env var directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContent = async (
  prompt: string, 
  systemInstruction: string = "You are a helpful AI assistant."
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};

export const toolsPrompts = {
  ideaGenerator: (niche: string) => `Generate 3 unique, viable SaaS business ideas for the "${niche}" niche. Include a catchy name, a one-sentence pitch, and a brief monetization strategy for each. Format nicely with Markdown.`,
  
  emailGenerator: (recipient: string, topic: string) => `Write a professional, persuasive cold email to ${recipient} about "${topic}". Keep it under 150 words. Focus on value proposition. Use a conversational but professional tone.`,
  
  adCopyGenerator: (product: string, audience: string) => `Write 3 variations of Facebook Ad copy (Primary Text and Headline) for a product called "${product}" targeting "${audience}". Use the AIDA framework. Emphasize benefits over features.`
};