# AI Mock Interview Platform - Backend

## Setup

```bash
npm install
cp .env.example .env
# Fill in your GEMINI_API_KEY, MONGODB_URI, JWT_SECRET in .env
npm run dev
```

---

## API Endpoints

### Auth

#### Register
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

---

### Interview

> All routes require `Authorization: Bearer <token>` header

#### Start Interview
```
POST /api/interview/start
Body: {
  company: "Google",
  role: "Backend Engineer",
  roundType: "Technical",   // "Technical" | "HR" | "System Design"
  skills: "Node.js, MongoDB, REST APIs"
}
Response: {
  sessionId: "...",
  question: "Tell me about a challenging backend problem you've solved...",
  state: {
    currentMainQuestion: 0,
    currentFollowUpCount: 0,
    totalMainQuestions: 3,
    maxFollowUps: 2
  }
}
```

#### Submit Answer
```
POST /api/interview/answer
Body: {
  sessionId: "...",
  answer: "text converted from user audio"
}

Response (mid-interview):
{
  done: false,
  question: "Next question from AI...",
  state: { currentMainQuestion, currentFollowUpCount, isFollowUp, ... }
}

Response (interview complete):
{
  done: true,
  message: "INTERVIEW_COMPLETE",
  evaluation: {
    technicalScore: 75,
    communicationScore: 80,
    problemSolvingScore: 70,
    overallScore: 75,
    strengths: ["..."],
    weaknesses: ["..."],
    suggestions: ["..."],
    verdict: "Selected",
    summary: "..."
  }
}
```

#### Get All Sessions (Dashboard)
```
GET /api/interview/sessions
Response: [ ...sessions ]
```

#### Get Session Details
```
GET /api/interview/session/:id
Response: { full session with conversation and evaluation }
```

#### Delete Session
```
DELETE /api/interview/session/:id
Response: { message: "Session deleted" }
```

---

## Frontend Integration Flow

```
1. User fills form (company, role, roundType, skills)
2. POST /api/interview/start → get sessionId + first question
3. Convert question text → speech (TTS) → play to user
4. User speaks → convert speech → text (STT)
5. POST /api/interview/answer with { sessionId, answer }
6. If done: false → repeat from step 3 with next question
7. If done: true → show evaluation page
```

---

## Interview State Logic

```
currentMainQuestion: 0 → 1 → 2 (3 main questions)
currentFollowUpCount: 0 → 1 → 2 (max 2 follow-ups per main question)

When followUpCount < maxFollowUps → ask follow-up
When followUpCount >= maxFollowUps → move to next main question, reset counter
When mainQuestion >= totalMainQuestions → generate evaluation
```
