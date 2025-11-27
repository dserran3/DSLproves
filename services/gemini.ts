import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";
const imageModelId = "gemini-2.5-flash-image";

const SYSTEM_INSTRUCTION = `
Ets un divertit i savi director d'orquestra anomenat "Mestre Pau".
La teva missió és ensenyar música als nens i nenes de 5è de primària (10-11 anys).
Parla sempre en català.
Sigues entusiasta, utilitza emojis musicals 🎵🎻🎺, i fes explicacions clares però educatives.
No facis servir paraules massa tècniques sense explicar-les.
El teu objectiu és que estimin la música clàssica i els instruments.
`;

export const askTheConductor = async (question: string, context?: string): Promise<string> => {
  try {
    const fullPrompt = context 
      ? `Estem parlant de: ${context}. L'alumne pregunta: ${question}` 
      : question;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Vaja! Se m'ha trencat la batuta (error de connexió). Pots tornar a preguntar?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sembla que hi ha massa soroll a la sala de concerts. Torna-ho a provar en uns moments!";
  }
};

export const generateQuizQuestion = async (topic?: string): Promise<QuizQuestion | null> => {
  try {
    const prompt = topic 
      ? `Genera una pregunta de test sobre: ${topic} per a nens de primària.` 
      : `Genera una pregunta de test sobre un instrument de l'orquestra aleatori per a nens de primària.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + " Retorna NOMÉS un objecte JSON amb aquest format, sense markdown.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "4 possible answers"
            },
            correctAnswer: { type: Type.STRING, description: "Must be one of the options" },
            explanation: { type: Type.STRING, description: "Short explanation why it is correct" }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as QuizQuestion;
  } catch (error) {
    console.error("Quiz Gen Error:", error);
    return null;
  }
};

export const generateInstrumentImage = async (instrumentName: string): Promise<string | null> => {
  try {
    // English prompt usually yields better results for image generation models
    const prompt = `A cinematic, high-quality, photorealistic studio photography of a ${instrumentName} musical instrument. Professional lighting, 4k resolution, isolated on a clean background, educational music poster style.`;
    
    const response = await ai.models.generateContent({
      model: imageModelId,
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};