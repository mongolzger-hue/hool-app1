import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Analyzes an image to detect food ingredients.
 * @param {string} base64Image - The base64 encoded image string.
 * @returns {Promise<string[]>} - A list of detected ingredients.
 */
export async function analyzeIngredients(base64Image) {
  try {
    if (!genAI) throw new Error("Gemini API key is not configured.");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "List the food ingredients you see in this image. Return only a comma-separated list of ingredient names in Mongolian. Do not include any other text.";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image.split(",")[1],
          mimeType: "image/jpeg"
        }
      }
    ]);
    
    const text = result.response.text();
    return text.split(",").map(item => item.trim()).filter(item => item !== "");
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    throw error;
  }
}

/**
 * Generates a 7-day meal plan based on user profile and goals.
 * @param {object} userProfile - User data (TDEE, goals, etc.)
 * @param {string} goal - maintain, lose, or gain
 * @returns {Promise<object[]>} - A 7-day meal plan array.
 */
export async function generateMealPlan(userProfile, goal) {
  try {
    if (!genAI) throw new Error("Gemini API key is not configured.");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const targetCals = goal === 'lose' ? userProfile.lose : goal === 'gain' ? userProfile.gain : userProfile.tdee;
    
    const prompt = `Generate a 7-day healthy meal plan for a person with a daily calorie target of ${targetCals} kcal. 
    The goal is ${goal}. 
    Focus on Mongolian style but healthy meals. 
    Return the result ONLY as a JSON array of 7 objects. 
    Each object must have: 
    - "day": Name of the day in Mongolian (e.g., "Даваа")
    - "meals": An object with "breakfast", "lunch", "dinner", "snack"
    - Each meal must have "name" (Mongolian name), "calories" (number), "protein" (g), "fat" (g), "carbs" (g), "ingredients" (array of Mongolian strings), "steps" (array of instructions).
    Do not include any markdown formatting or extra text outside the JSON.`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean potential markdown code blocks
    const jsonString = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Meal Plan Error:", error);
    throw error;
  }
}
