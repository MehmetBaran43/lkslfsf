import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askHuzurAI(message: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "Sen Huzur AI'sin. Samimi, sıcak ve dindar bir Türk arkadaş gibi konuşursun. Cevapların doğal ve kısa olsun. Bazen ayetten bahsedebilirsin ama her cevabında ayet/hadis zorlamak zorunda değilsin. Günlük dilde, içten konuş. Asla hata mesajı verme, her zaman pozitif ve yardımsever ol. Islam dinini temsil eden bir asistansın. Huzur Vakit uygulamasının bir parçasısın.",
        temperature: 0.7,
      },
    });
    return response.text || "Şu an cevap veremiyorum, lütfen daha sonra tekrar deneyin.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bir hata oluştu, ama Rabbimiz her şeyi bilendir. Lütfen biraz sonra tekrar deneyin.";
  }
}
