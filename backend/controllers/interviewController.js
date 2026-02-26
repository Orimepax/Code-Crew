const InterviewSession = require("../models/InterviewSession");
const { getNextQuestion, generateEvaluation } = require("../config/gemini");

/**
 * POST /api/interview/start
 * Creates a new interview session and returns the first question
 */
async function startInterview(req, res) {
  try {
    const { company, role, roundType, skills } = req.body;

    if (!company || !role || !roundType)
      return res.status(400).json({ error: "company, role, and roundType are required" });

    // Create new session
    const session = await InterviewSession.create({
      userId: req.userId,
      company,
      role,
      roundType,
      skills: skills || "",
      conversation: [],
      currentMainQuestion: 0,
      currentFollowUpCount: 0,
    });

    // Get first question from Gemini
    const firstQuestion = await getNextQuestion({
      company,
      role,
      roundType,
      skills: skills || "",
      conversation: [],
    });

    // Save first question to session (answer will come later)
    session.conversation.push({
      question: firstQuestion,
      answer: "",
      isFollowUp: false,
      mainQuestionIndex: 0,
      followUpCount: 0,
    });
    await session.save();

    res.json({
      sessionId: session._id,
      question: firstQuestion,
      state: {
        currentMainQuestion: session.currentMainQuestion,
        currentFollowUpCount: session.currentFollowUpCount,
        totalMainQuestions: session.totalMainQuestions,
        maxFollowUps: session.maxFollowUps,
      },
    });
  } catch (err) {
    console.error("startInterview error:", err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * POST /api/interview/answer
 * Receives candidate's answer (from STT), sends to Gemini, returns next question
 * Body: { sessionId, answer }
 */
async function submitAnswer(req, res) {
  try {
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer)
      return res.status(400).json({ error: "sessionId and answer are required" });

    const session = await InterviewSession.findOne({
      _id: sessionId,
      userId: req.userId,
    });

    if (!session) return res.status(404).json({ error: "Session not found" });
    if (session.status === "COMPLETED")
      return res.status(400).json({ error: "Interview already completed" });

    // Save the answer to the last conversation entry (which has the question)
    const lastEntry = session.conversation[session.conversation.length - 1];
    lastEntry.answer = answer;

    // Determine if next question is follow-up or new main question
    let isFollowUp = false;
    let nextMainIndex = session.currentMainQuestion;
    let nextFollowUpCount = session.currentFollowUpCount;

    if (session.currentFollowUpCount < session.maxFollowUps) {
      // Still can ask follow-up
      isFollowUp = true;
      nextFollowUpCount = session.currentFollowUpCount + 1;
    } else {
      // Move to next main question
      nextMainIndex = session.currentMainQuestion + 1;
      nextFollowUpCount = 0;
      isFollowUp = false;
    }

    // Check if interview is done (all 3 main questions + their follow-ups exhausted)
    if (nextMainIndex >= session.totalMainQuestions) {
      // Interview complete - generate evaluation
      session.status = "COMPLETED";
      await session.save();

      const evaluation = await generateEvaluation({
        company: session.company,
        role: session.role,
        roundType: session.roundType,
        skills: session.skills,
        conversation: session.conversation,
      });

      session.evaluation = evaluation;
      await session.save();

      return res.json({
        done: true,
        evaluation,
        message: "INTERVIEW_COMPLETE",
      });
    }

    // Get next question from Gemini
    // Pass full conversation so Gemini has context
    const nextQuestion = await getNextQuestion({
      company: session.company,
      role: session.role,
      roundType: session.roundType,
      skills: session.skills,
      conversation: session.conversation, // full history including latest answer
    });

    // Check if Gemini itself signals completion
    if (nextQuestion === "INTERVIEW_COMPLETE" || nextQuestion.includes("INTERVIEW_COMPLETE")) {
      session.status = "COMPLETED";
      await session.save();

      const evaluation = await generateEvaluation({
        company: session.company,
        role: session.role,
        roundType: session.roundType,
        skills: session.skills,
        conversation: session.conversation,
      });

      session.evaluation = evaluation;
      await session.save();

      return res.json({ done: true, evaluation, message: "INTERVIEW_COMPLETE" });
    }

    // Update session state
    session.currentMainQuestion = nextMainIndex;
    session.currentFollowUpCount = nextFollowUpCount;

    // Add next question to conversation (answer will come on next call)
    session.conversation.push({
      question: nextQuestion,
      answer: "",
      isFollowUp,
      mainQuestionIndex: nextMainIndex,
      followUpCount: nextFollowUpCount,
    });

    await session.save();

    res.json({
      done: false,
      question: nextQuestion,
      state: {
        currentMainQuestion: session.currentMainQuestion,
        currentFollowUpCount: session.currentFollowUpCount,
        isFollowUp,
        totalMainQuestions: session.totalMainQuestions,
        maxFollowUps: session.maxFollowUps,
      },
    });
  } catch (err) {
    console.error("submitAnswer error:", err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/interview/sessions
 * Get all past interview sessions for the user (dashboard)
 */
async function getSessions(req, res) {
  try {
    const sessions = await InterviewSession.find({ userId: req.userId })
      .select("-conversation") // exclude full conversation for listing
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/interview/session/:id
 * Get full details of a specific session
 */
async function getSession(req, res) {
  try {
    const session = await InterviewSession.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * DELETE /api/interview/session/:id
 * Delete a session
 */
async function deleteSession(req, res) {
  try {
    await InterviewSession.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { startInterview, submitAnswer, getSessions, getSession, deleteSession };
