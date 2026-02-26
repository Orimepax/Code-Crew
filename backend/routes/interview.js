const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  startInterview,
  submitAnswer,
  getSessions,
  getSession,
  deleteSession,
} = require("../controllers/interviewController");

const router = express.Router();

// All routes require auth
router.use(authMiddleware);

// Start a new interview session
router.post("/start", startInterview);

// Submit an answer and get next question
router.post("/answer", submitAnswer);

// Get all sessions (dashboard)
router.get("/sessions", getSessions);

// Get specific session details
router.get("/session/:id", getSession);

// Delete a session
router.delete("/session/:id", deleteSession);

module.exports = router;
