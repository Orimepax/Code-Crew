import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Zap, Send, Clock, ChevronRight, Loader2,
  Volume2, Mic, MicOff, Brain, Sparkles, Activity
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

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  const startListening = () => { recognitionRef.current?.start(); setListening(true); };
  const stopListening = () => { recognitionRef.current?.stop(); setListening(false); };

  const speakQuestion = () => {
    if (!questions[currentIdx]) return;
    const utterance = new SpeechSynthesisUtterance(questions[currentIdx]);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (questions.length > 0) speakQuestion();
  }, [currentIdx, questions]);

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
      const results = questions.map((q, i) => ({ question: q, answer: newAnswers[i] }));
      sessionStorage.setItem("interviewResults", JSON.stringify(results));
      sessionStorage.setItem("interviewTime", String(elapsed));
      navigate("/results");
    }
  };

  if (!config || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-purple-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .su-display { font-family: 'Syne', sans-serif; }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .mic-active-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #8b5cf6;
          border-radius: 9999px;
          animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Progress Bar Top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-700"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
               <Zap className="h-5 w-5 text-purple-500 fill-purple-500" />
            </div>
            <span className="su-display text-xl tracking-tight hidden sm:block">InterviewIQ</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="font-mono font-bold text-sm tracking-tighter">{formatTime(elapsed)}</span>
            </div>
            <div className="text-sm font-bold bg-purple-500 text-white px-3 py-1 rounded-lg">
              Q {currentIdx + 1} / {questions.length}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 gap-8">
          
          {/* Question Console */}
          <div className="relative p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Current Challenge</span>
              </div>
              <h2 className="su-display text-2xl md:text-3xl leading-snug mb-8">
                {questions[currentIdx]}
              </h2>

              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="secondary" 
                  className="bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl h-11"
                  onClick={speakQuestion}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
                
                <div className="relative">
                  {listening && <div className="mic-active-ring" />}
                  <Button 
                    className={`rounded-xl h-11 transition-all ${listening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                    onClick={listening ? stopListening : startListening}
                  >
                    {listening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {listening ? 'Stop Recording' : 'Voice Answer'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-slate-400">Your Response</label>
              {listening && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse">
                  <Activity size={14} />
                  STT ACTIVE
                </div>
              )}
            </div>
            
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Start typing your brilliance, or use the voice assistant..."
              className="min-h-[250px] bg-white/[0.02] border-white/10 rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/20 text-lg p-6 transition-all"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-slate-500 px-2">
                Character count: <span className="text-slate-300">{answer.length}</span>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!answer.trim() || isSubmitting}
                className="bg-white text-black hover:bg-slate-200 rounded-xl px-8 h-12 font-bold"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    {currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                    <ChevronRight size={18} />
                  </div>
                )}
              </Button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none opacity-20">
        <div className="container mx-auto flex justify-center">
           <div className="text-[10rem] font-black su-display select-none tracking-tighter">AI.MOCK</div>
        </div>
      </footer>
    </div>
  );
};

export default Interview;