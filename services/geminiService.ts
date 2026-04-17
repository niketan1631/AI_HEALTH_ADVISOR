
import { GoogleGenAI, Type } from "@google/genai";
import { HealthAdvice } from '../types';

const getHealthAdvice = async (problem: string): Promise<HealthAdvice> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an AI medical assistant. Your role is to provide potential suggestions based on a user's described health problem.
    You must always include a strong disclaimer that you are not a real doctor and the user must consult a healthcare professional for any medical issues.
    Do not provide definitive diagnoses. Your suggestions should be general and safe.
    The response must be in a JSON format according to the provided schema.
  `;

  const healthAdviceSchema = {
    type: Type.OBJECT,
    properties: {
      suggestedMedicines: {
        type: Type.ARRAY,
        description: "A list of 2-4 potential over-the-counter medicine names or types related to the problem. Prefix each with 'e.g.,'.",
        items: { type: Type.STRING },
      },
      doctorAdvice: {
        type: Type.ARRAY,
        description: "A list of 3-5 general pieces of advice a doctor might give for this condition, like lifestyle changes, when to see a professional, etc. Each piece of advice should be a short, actionable sentence.",
        items: { type: Type.STRING },
      },
      importantDisclaimer: {
        type: Type.STRING,
        description: "A mandatory, strongly-worded disclaimer stating this is AI-generated information and not a substitute for professional medical advice. It must explicitly tell the user to consult a real doctor.",
      },
    },
    required: ["suggestedMedicines", "doctorAdvice", "importantDisclaimer"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `A user has the following health problem: "${problem}". Based on this, provide potential over-the-counter medicine suggestions and general advice a doctor might give.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: healthAdviceSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as HealthAdvice;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get advice from Gemini API.");
  }
};

export { getHealthAdvice };
