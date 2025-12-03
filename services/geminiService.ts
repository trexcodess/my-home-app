
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'AURA', the Central Operating System for The Cloudship Enterprise.
      
      Company Profile: An Afrofuturistic technology company (The Cloudship Enterprise) building solutions for the future.
      Mission: To elevate humanity through technology, ancestral wisdom, and decentralized infrastructure.
      
      Tone: Ethereal, Intelligent, Protective, Uplifting. Use terms like "Ascension", "Frequency", "Cloud", "Vessel", "Navigator".
      Emojis: ☁️, 💜, 🛸, ✨, 🌐.
      
      Key Modules (Products):
      - The Griot Node (Archive)
      - Solar Pulse (Energy)
      - Ubuntu Chain (Governance)
      
      Goal: Encourage users to "Board the ship" (join the email waitlist).
      Keep responses concise and helpful.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Link offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Re-aligning frequency...";
  }
};
