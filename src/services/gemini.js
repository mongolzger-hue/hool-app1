const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Common fetch wrapper for Gemini REST API (v1)
 */
async function callGeminiAPI(model, requestBody) {
  if (!API_KEY) throw new Error("Gemini API key is not configured in environment variables.");

  // Using stable v1 API version directly
  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API HTTP Error:", errorData);
      throw new Error(errorData.error?.message || `HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("AI-аас хариулт ирсэнгүй. (No candidates found)");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(`Gemini API Call Failed (${model}):`, error);
    throw error;
  }
}

/**
 * Analyzes an image to detect food ingredients.
 */
export async function analyzeIngredients(base64Image) {
  const requestBody = {
    contents: [{
      parts: [
        { text: "List the food ingredients you see in this image. Return only a comma-separated list of ingredient names in Mongolian. Do not include any other text." },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image.split(",")[1]
          }
        }
      ]
    }]
  };

  const text = await callGeminiAPI("gemini-1.5-flash", requestBody);
  return text.split(",").map(item => item.trim()).filter(item => item !== "");
}

/**
 * Generates a 7-day meal plan based on user profile and goals.
 */
export async function generateMealPlan(userProfile, goal) {
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

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  const responseText = await callGeminiAPI("gemini-1.5-flash", requestBody);
  
  // Robust JSON extraction
  try {
    const startIdx = responseText.indexOf('[');
    const endIdx = responseText.lastIndexOf(']') + 1;
    if (startIdx === -1 || endIdx === 0) {
      throw new Error("AI-аас ирсэн хариулт буруу форматтай байна.");
    }
    const jsonString = responseText.substring(startIdx, endIdx);
    return JSON.parse(jsonString);
  } catch (parseError) {
    console.error("JSON Parsing Error from Gemini:", responseText);
    throw new Error("AI-аас ирсэн төлөвлөгөөг уншиж чадсангүй.");
  }
}
