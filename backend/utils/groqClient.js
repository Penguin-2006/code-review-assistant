const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const reviewCode = async (code, language) => {
  const prompt = `You are a code reviewer. Review the following ${language} code and respond with ONLY valid JSON, no markdown formatting, no backticks, no extra text. Use exactly this structure:

{
  "bugs": ["list of potential bugs or logic errors"],
  "styleIssues": ["list of style/readability issues"],
  "securityConcerns": ["list of security concerns, empty array if none"],
  "complexityNotes": ["notes on time/space complexity or structural complexity"]
}

If a category has nothing to report, return an empty array for it. Do not include any explanation outside the JSON.

Code to review:
${code}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
  });

  const raw = completion.choices[0].message.content;

  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/```json|```/g, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Failed to parse AI response as JSON');
  }
};

module.exports = reviewCode;