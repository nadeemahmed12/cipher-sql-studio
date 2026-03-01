import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateHint = async (question, userQuery) => {
  const prompt = `
You are an SQL mentor.

IMPORTANT:
- Do NOT give full SQL solution.
- Only give a short hint (2-3 lines).
- Suggest which SQL clause to use.

Question:
${question}

User Query:
${userQuery || "No query yet"}
`;

  try {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text.slice(0, 300);

} catch (err) {
  console.error("LLM Error:", err);
  return "Review your WHERE or GROUP BY clause carefully.";
}
};