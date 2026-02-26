import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowLeft, RotateCcw, Trophy, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface QA {
  question: string;
  answer: string;
}

interface FeedbackItem {
  question: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  tip: string;
}

const skillLabels = [
  { key: "communication", label: "Communication" },
  { key: "technical", label: "Technical Depth" },
  { key: "clarity", label: "Clarity" },
  { key: "confidence", label: "Confidence" },
  { key: "analytical", label: "Analytical" },
  { key: "structure", label: "Structure" },
];

function generateFeedback(qa: QA): FeedbackItem {
  const len = qa.answer.length;
  const hasExamples = /for example|such as|instance/i.test(qa.answer);
  const hasStructure = /first|second|finally|step|then|because|therefore/i.test(qa.answer);
  const fillerCount = (qa.answer.match(/\b(um|uh|like|basically|actually|just)\b/gi) || []).length;

  let score = 5;
  if (len > 200) score += 1;
  if (len > 400) score += 1;
  if (hasExamples) score += 1;
  if (hasStructure) score += 1;
  if (fillerCount < 2) score += 0.5;
  score = Math.min(10, Math.round(score * 10) / 10);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (len > 200) strengths.push("Good answer length with sufficient detail");
  else weaknesses.push("Answer could be more detailed");

  if (hasExamples) strengths.push("Uses concrete examples to support points");
  else weaknesses.push("Consider adding specific examples");

  if (hasStructure) strengths.push("Well-structured response with logical flow");
  else weaknesses.push("Try structuring your answer with clear transitions");

  if (fillerCount < 2) strengths.push("Clear and concise language");
  else weaknesses.push(`Reduce filler words (found ${fillerCount})`);

  const tips = [
    "Use the STAR method: Situation, Task, Action, Result.",
    "Quantify your impact with specific numbers or metrics.",
    "Start with a clear thesis statement before diving into details.",
    "Practice summarizing your answer in one sentence first.",
    "Relate your answer to the company's specific challenges.",
  ];

  return {
    question: qa.question,
    score,
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3),
    tip: tips[Math.floor(Math.random() * tips.length)],
  };
}

function generateSkillScores(feedbackItems: FeedbackItem[]) {
  const avg = feedbackItems.reduce((sum, f) => sum + f.score, 0) / feedbackItems.length;
  return skillLabels.map((s) => ({
    skill: s.label,
    value: Math.min(10, Math.max(3, avg + (Math.random() * 3 - 1.5))),
    fullMark: 10,
  }));
}

const Results = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [radarData, setRadarData] = useState<{ skill: string; value: number; fullMark: number }[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("interviewResults");
    const time = sessionStorage.getItem("interviewTime");
    if (!stored) {
      navigate("/setup");
      return;
    }
    const results: QA[] = JSON.parse(stored);
    const fb = results.map(generateFeedback);
    setFeedback(fb);
    setRadarData(generateSkillScores(fb));
    setTotalTime(Number(time || 0));
    setOverallScore(Math.round((fb.reduce((s, f) => s + f.score, 0) / fb.length) * 10) / 10);
  }, [navigate]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  const scoreColor = overallScore >= 7 ? "text-primary" : overallScore >= 5 ? "text-accent" : "text-destructive";

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">InterviewIQ</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/setup")}>
              <RotateCcw className="mr-1.5 h-4 w-4" /> New Interview
            </Button>
            <Button size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your <span className="text-gradient">Performance Report</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Here's how you did — with actionable insights.</p>
        </div>

        {/* Summary cards */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
            <div className={`text-4xl font-extrabold ${scoreColor}`}>{overallScore}</div>
            <div className="mt-1 text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
            <div className="text-4xl font-extrabold text-foreground">{feedback.length}</div>
            <div className="mt-1 text-sm text-muted-foreground">Questions Answered</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
            <div className="text-4xl font-extrabold text-foreground">{formatTime(totalTime)}</div>
            <div className="mt-1 text-sm text-muted-foreground">Total Time</div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-10 rounded-xl border border-border/50 bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold">Skill Radar</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="hsl(220, 14%, 16%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="hsl(174, 72%, 52%)"
                  fill="hsl(174, 72%, 52%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Feedback */}
        <h2 className="mb-6 text-lg font-semibold">Detailed Feedback</h2>
        <div className="space-y-6">
          {feedback.map((fb, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Question {i + 1}
                  </div>
                  <h3 className="font-medium leading-relaxed">{fb.question}</h3>
                </div>
                <div className={`flex-shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
                  fb.score >= 7 ? "bg-primary/10 text-primary" : fb.score >= 5 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                }`}>
                  {fb.score}/10
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {fb.strengths.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      <TrendingUp className="h-3.5 w-3.5" /> Strengths
                    </div>
                    <ul className="space-y-1">
                      {fb.strengths.map((s, j) => (
                        <li key={j} className="text-sm text-muted-foreground">• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {fb.weaknesses.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      <AlertTriangle className="h-3.5 w-3.5" /> Improve
                    </div>
                    <ul className="space-y-1">
                      {fb.weaknesses.map((w, j) => (
                        <li key={j} className="text-sm text-muted-foreground">• {w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <p className="text-sm text-muted-foreground">{fb.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/setup")}
            className="glow-primary px-8 font-semibold"
          >
            <RotateCcw className="mr-2 h-5 w-5" /> Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
