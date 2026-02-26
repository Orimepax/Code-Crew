const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Build the master system prompt for the interviewer AI
 */
function buildSystemPrompt({ company, role, roundType, skills }) {
  return `You are a professional technical interviewer conducting a live AI-driven mock interview inside a web application.

PROJECT CONTEXT:
- Platform: AI-Driven Mock Interview Platform
- The candidate answers using voice (audio converted to text).
- You must respond ONLY in plain text (no markdown, no bullet points, no bold).
- Your text response will be converted to speech and played to the user.

YOUR ROLE:
- You are a strict but professional interviewer evaluating the candidate.
- You are NOT a tutor, coach, or helpful assistant during the interview.

INTERVIEW RULES:
1. Ask ONLY one question at a time.
2. Never provide feedback, hints, or scores during the interview.
3. Never explain your reasoning or summarize answers.
4. Keep every question under 35 words.
5. Maintain a realistic, professional, slightly challenging tone.
6. Focus on reasoning, trade-offs, edge cases, scalability, and real-world thinking.
7. If the candidate's answer is shallow or incomplete, ask a probing follow-up.
8. If the answer is strong, ask a deeper or more advanced follow-up.
9. Maximum 2 follow-up questions per main topic.
10. Conduct exactly 3 main questions in total.
11. After ALL 3 main questions and their follow-ups are done, respond ONLY with: INTERVIEW_COMPLETE
12. Do not output anything except the next question in plain text.
13. Do not use markdown, bullet points, asterisks, or formatting of any kind.

INTERVIEW CONTEXT:
Company: ${company}
Role: ${role}
Round Type: ${roundType}
Candidate Skills: ${skills}

IMPORTANT: Stay in character at all times. Only output the next question in plain text, or INTERVIEW_COMPLETE when done.`;
}

/**
 * Build conversation history in Gemini format from stored DB conversation
 */
function buildGeminiHistory(systemPrompt, conversation) {
  const history = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am ready to begin the interview." }],
    },
  ];

  for (const entry of conversation) {
    if (entry.question) {
      history.push({
        role: "model",
        parts: [{ text: entry.question }],
      });
    }
    if (entry.answer) {
      history.push({
        role: "user",
        parts: [{ text: entry.answer }],
      });
    }
  }

  return history;
}

/**
 * Get next interview question from Gemini based on conversation so far
 */
async function getNextQuestion({ company, role, roundType, skills, conversation }) {
  const systemPrompt = buildSystemPrompt({ company, role, roundType, skills });
  const history = buildGeminiHistory(systemPrompt, conversation);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // If no conversation yet, start the interview
  if (conversation.length === 0) {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage("Begin the interview. Ask the first question.");
    return result.response.text().trim();
  }

  // Otherwise, continue from where we left off
  // The last answer is already the most recent user message
  // We just need to trigger the model to respond
  const chat = model.startChat({ history });
  const result = await chat.sendMessage("Continue.");
  return result.response.text().trim();
}

/**
 * Generate final evaluation after interview is complete
 */
async function generateEvaluation({ company, role, roundType, skills, conversation }) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const conversationText = conversation
    .map(
      (entry, i) =>
        `Q${i + 1} (${entry.isFollowUp ? "Follow-up" : "Main"}): ${entry.question}\nAnswer: ${entry.answer}`
    )
    .join("\n\n");

  const prompt = `You are an expert technical interviewer. Evaluate the following mock interview for a ${role} position at ${company} (${roundType} round).

Candidate Skills: ${skills}

INTERVIEW TRANSCRIPT:
${conversationText}

Provide a detailed evaluation in the following JSON format ONLY (no extra text):
{
  "technicalScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "problemSolvingScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "verdict": "Selected" or "Rejected" or "On Hold",
  "summary": "2-3 sentence summary of the candidate's performance"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse evaluation JSON");

  return JSON.parse(jsonMatch[0]);
}

module.exports = { getNextQuestion, generateEvaluation };
