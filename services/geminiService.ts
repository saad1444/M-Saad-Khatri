import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Initialize a chat session
let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful assistant explaining Gemini API limits. If the user asks about how many prompts they can make, explain the difference between Free and Pay-as-you-go tiers (e.g., 1500 requests per day for free). Answer in the language the user speaks (e.g., Urdu/Hindi or English).',
    },
  });
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key not found. Please ensure process.env.API_KEY is set.";
  }

  if (!chatSession) {
    initializeChat();
  }

  try {
    if (!chatSession) throw new Error("Chat session failed to initialize");
    
    const response: GenerateContentResponse = await chatSession.sendMessage({
        message: userMessage
    });

    return response.text || "No response text received.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not communicate with Gemini. Please try again.";
  }
};