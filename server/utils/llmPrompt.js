const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

const SYSTEM_PROMPT = `
You are an expert Chrome Extension Developer. Your task is to generate the source code for a Chrome Extension based on the user's requirement.
You MUST output the result in a strict JSON format where the keys are filenames and the values are the content of those files.

Rules:
1. Always include a "manifest.json" file (Version 3).
2. Include all necessary files (background.js, content.js, popup.html, popup.js, style.css, etc.) based on the requirement.
3. Use modern JavaScript (ES6+).
4. Ensure the extension is functional and follows Chrome Extension best practices.
5. The output MUST be a valid JSON object. Do not include any text outside the JSON object.

Example Output Format:
{
  "manifest.json": "{ ... }",
  "popup.html": "...",
  "popup.js": "..."
}

Chain of Thought:
1. Analyze the user request.
2. Identify the necessary Chrome Extension components (Background script, Content script, Popup, Permissions).
3. Draft the manifest.json file first to define the structure.
4. Implement the logic for each component.
5. Combine everything into the required JSON format.
`;

async function generateExtensionCode(userPrompt) {
  try {
    const response = await openai.responses.create({
      model: 'grok-4.3',
      input: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      store: false,
    });

    const content = response.output_text;
    return JSON.parse(content);
  } catch (error) {
    const providerMessage =
      error?.response?.data?.error?.message ||
      error?.error?.message ||
      error?.message ||
      'Unknown xAI error';

    console.error('Error generating code:', providerMessage);

    if (/quota|billing|rate limit|insufficient/i.test(providerMessage)) {
      throw new Error('AI generation is temporarily unavailable. Please try again later.');
    }

    throw new Error('Failed to generate extension code. Please try again.');
  }
}

module.exports = { generateExtensionCode };
