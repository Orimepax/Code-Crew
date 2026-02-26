import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Zap,
  Send,
  Clock,
  ChevronRight,
  Loader2,
  Volume2,
  Mic,
  MicOff,
} from "lucide-react";

interface InterviewConfig {
  role: string;
  level: string;
  domains: string[];
}

const questionBank: Record<string, string[]> = {
  frontend: [
    "Explain the virtual DOM and how React uses it to optimize rendering performance.",
    "How would you handle state management in a large-scale React application? Compare different approaches.",
    "Describe a challenging UI bug you've encountered and how you debugged it.",
    "What are web accessibility best practices and how do you implement them?",
    "Explain the difference between CSS Grid and Flexbox. When would you use each?",
  ],
  backend: [
    "Explain REST vs GraphQL. When would you choose one over the other?",
    "How do you design a database schema for a multi-tenant SaaS application?",
    "Describe how you would implement rate limiting in a production API.",
    "What strategies do you use for handling database migrations in production?",
    "Explain the CAP theorem and its implications for distributed systems.",
  ],
  fullstack: [
    "How would you architect a real-time chat application from frontend to backend?",
    "Explain your approach to API versioning and backward compatibility.",
    "Describe your CI/CD pipeline and deployment strategy.",
    "How do you handle authentication and authorization across your stack?",
    "What's your approach to monitoring and debugging production issues?",
  ],
  data: [
    "Explain the bias-variance tradeoff and how it affects model selection.",
    "How would you handle imbalanced datasets in a classification problem?",
    "Describe your approach to feature engineering for a recommendation system.",
    "Explain gradient descent and its variants. When would you use each?",
    "How do you evaluate the performance of a machine learning model in production?",
  ],
  devops: [
    "Explain container orchestration with Kubernetes. How do you handle scaling?",
    "Describe your approach to infrastructure as code.",
    "How do you implement zero-downtime deployments?",
    "What's your monitoring and alerting strategy for distributed systems?",
    "How do you manage secrets and configuration across environments?",
  ],
  hr: [
    "Tell me about a time you had a conflict with a teammate. How did you resolve it?",
    "Describe a project where you had to learn a new technology quickly.",
    "Tell me about a time you failed and what you learned from it.",
    "How do you prioritize tasks when everything seems urgent?",
    "Describe a situation where you went above and beyond for a project.",
  ],
};

const Interview = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // 🎤 Speech-to-Text
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // =========================
  // Load Interview Config
  // =========================
  useEffect(() => {
    const stored = sessionStorage.getItem("interviewConfig");
    if (!stored) {
      navigate("/setup");
      return;
    }

    const cfg: InterviewConfig = JSON.parse(stored);
    setConfig(cfg);

    const bank = questionBank[cfg.role] || questionBank.hr;
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
  }, [navigate]);

  // =========================
  // Timer
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================
  // Setup Speech Recognition
  // =========================
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswer(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // =========================
  // Text-to-Speech
  // =========================
  const speakQuestion = () => {
    if (!questions[currentIdx]) return;
    const utterance = new SpeechSynthesisUtterance(
      questions[currentIdx]
    );
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Auto speak on question change
  useEffect(() => {
    if (questions.length > 0) speakQuestion();
  }, [currentIdx, questions]);

  // =========================
  // Submit Answer
  // =========================
  const handleSubmit = async () => {
    if (!answer.trim()) return;

    stopListening();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnswer("");
    setIsSubmitting(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      const results = questions.map((q, i) => ({
        question: q,
        answer: newAnswers[i],
      }));

      sessionStorage.setItem(
        "interviewResults",
        JSON.stringify(results)
      );
      sessionStorage.setItem("interviewTime", String(elapsed));
      navigate("/results");
    }
  };

  if (!config || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <button
            onClick={() => navigate("/setup")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              InterviewIQ
            </span>
          </button>

          <div className="flex items-center gap-4">
            <Clock className="h-4 w-4" />
            {formatTime(elapsed)}
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {currentIdx + 1} / {questions.length}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-6 pt-28 pb-16">
        <div className="mb-10 h-1 w-full bg-muted rounded-full">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${((currentIdx + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="text-xs font-semibold uppercase text-primary">
          Question {currentIdx + 1}
        </div>

        <h2 className="text-2xl font-bold mt-2">
          {questions[currentIdx]}
        </h2>

        {/* Voice Controls */}
        <div className="mt-4 flex gap-3">
          <Button variant="outline" onClick={speakQuestion}>
            <Volume2 className="h-4 w-4 mr-2" />
            Hear Question
          </Button>

          {!listening ? (
            <Button variant="outline" onClick={startListening}>
              <Mic className="h-4 w-4 mr-2" />
              Start Speaking
            </Button>
          ) : (
            <Button variant="destructive" onClick={stopListening}>
              <MicOff className="h-4 w-4 mr-2" />
              Stop Mic
            </Button>
          )}
        </div>

        {/* Answer */}
        <div className="mt-8">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type or speak your answer..."
            className="min-h-[200px]"
          />
          <div className="mt-2 text-right text-xs text-muted-foreground">
            {answer.length} characters
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : currentIdx < questions.length - 1 ? (
              <>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Finish <Send className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;