import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

async function test() {
  const ai = new GoogleGenAI({ apiKey });
  const candidateModels = [
    'gemini-3.6-flash',
    'gemini-3.1-pro-preview'
  ];

  for (const modelName of candidateModels) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const res = await ai.models.generateContent({
        model: modelName,
        contents: 'Explain blood donation in 1 sentence.'
      });
      console.log(`SUCCESS with ${modelName}:`, res.text);
      return;
    } catch (err) {
      console.error(`ERROR with ${modelName}:`, err.message);
    }
  }
}

test();
