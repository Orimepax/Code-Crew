const mongoose = require("mongoose");

const InterviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: { type: String, required: true },
  role: { type: String, required: true },
  roundType: {
    type: String,
    enum: ["Technical", "HR", "System Design"],
    required: true,
  },
  skills: { type: String, default: "" },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED"],
    default: "IN_PROGRESS",
  },

  // Track interview progress
  currentMainQuestion: { type: Number, default: 0 }, // 0, 1, 2
  currentFollowUpCount: { type: Number, default: 0 }, // 0, 1, 2
  totalMainQuestions: { type: Number, default: 3 },
  maxFollowUps: { type: Number, default: 2 },

  // Full conversation history sent to Gemini
  conversation: [
    {
      question: String,
      answer: String,
      isFollowUp: Boolean,
      mainQuestionIndex: Number, // which main question (0, 1, 2)
      followUpCount: Number,     // follow-up number under that main question
      timestamp: { type: Date, default: Date.now },
    },
  ],

  // Final evaluation from AI
  evaluation: {
    technicalScore: Number,
    communicationScore: Number,
    problemSolvingScore: Number,
    overallScore: Number,
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
    verdict: String,
    summary: String,
  },

  totalDuration: Number, // in seconds
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InterviewSession", InterviewSessionSchema);
