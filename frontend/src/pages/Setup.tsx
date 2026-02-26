import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Zap, Briefcase, Code, Database,
  Palette, Users, BarChart, CheckCircle2, Clock, Brain,
  Sparkles, ChevronRight, Target, Star, Award, TrendingUp,
  Activity, Calendar, Play, Mic, Video, Download
} from "lucide-react";

const roles = [
  { id: "frontend",  label: "Frontend",       sub: "Developer",  Icon: Palette,  color: "#8b5cf6" },
  { id: "backend",   label: "Backend",        sub: "Developer",  Icon: Database, color: "#0ea5e9" },
  { id: "fullstack", label: "Full Stack",     sub: "Developer",  Icon: Code,     color: "#10b981" },
  { id: "data",      label: "Data",           sub: "Scientist",  Icon: BarChart, color: "#f59e0b" },
  { id: "devops",    label: "DevOps",         sub: "Engineer",   Icon: Briefcase,color: "#ef4444" },
  { id: "hr",        label: "HR /",           sub: "Behavioral", Icon: Users,    color: "#ec4899" },
];

const levels = [
  { id: "junior", label: "Junior", range: "0–2 yrs", sessions: "20 min", q: "10 Qs" },
  { id: "mid", label: "Mid", range: "2–5 yrs", sessions: "35 min", q: "15 Qs" },
  { id: "senior", label: "Senior", range: "5+ yrs", sessions: "50 min", q: "20 Qs" },
];

const domains = [
  "React","Node.js","Python","Java",
  "System Design","Machine Learning",
  "Cloud / AWS","SQL / Databases",
  "Communication","Leadership"
];

export default function Setup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [interviewMode, setInterviewMode] = useState<"live" | "practice">("practice");

  const toggleDomain = (d: string) => {
    setSelectedDomains(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const canStart =
    selectedRole && selectedLevel && selectedDomains.length > 0;

  const activeRole = roles.find(r => r.id === selectedRole);
  const activeLevel = levels.find(l => l.id === selectedLevel);

  const handleStart = () => {
    sessionStorage.setItem(
      "interviewConfig",
      JSON.stringify({
        role: selectedRole,
        level: selectedLevel,
        domains: selectedDomains,
        mode: interviewMode
      })
    );
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 relative overflow-x-hidden">

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/20 blur-[150px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="h-16 px-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 font-bold text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <Zap className="text-purple-500" />
            InterviewIQ
          </button>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Activity className="h-4 w-4" />
            {[selectedRole, selectedLevel, selectedDomains.length > 0]
              .filter(Boolean).length} / 3
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-6">
            Perfect Your Interview
          </h1>
          <p className="text-xl text-zinc-400">
            AI-powered mock interviews tailored to your exact role.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT SIDE */}
          <div className="space-y-16">

            {/* ROLE */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Select Role
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {roles.map(role => {
                  const active = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-8 rounded-2xl border transition-all duration-300 text-left
                        ${active
                          ? "bg-zinc-900 border-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                          : "bg-zinc-900/60 border-white/10 hover:border-white/30"
                        }`}
                    >
                      <role.Icon
                        className="h-8 w-8 mb-4"
                        style={{ color: role.color }}
                      />
                      <div className="text-2xl font-bold text-white">
                        {role.label}
                      </div>
                      <div className="text-zinc-400">
                        {role.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* LEVEL */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Experience Level
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {levels.map(level => {
                  const active = selectedLevel === level.id;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`p-6 rounded-2xl border transition-all
                        ${active
                          ? "bg-zinc-900 border-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                          : "bg-zinc-900/60 border-white/10 hover:border-white/30"
                        }`}
                    >
                      <div className="text-xl font-bold text-white">
                        {level.label}
                      </div>
                      <div className="text-zinc-400 text-sm">
                        {level.range}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-12">

            {/* MODE */}
            <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Interview Mode
              </h3>

              <div className="flex gap-4">
                {["practice", "live"].map(mode => (
                  <button
                    key={mode}
                    onClick={() =>
                      setInterviewMode(mode as "practice" | "live")
                    }
                    className={`flex-1 py-3 rounded-xl font-semibold transition
                      ${interviewMode === mode
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-zinc-400"
                      }`}
                  >
                    {mode === "practice" ? "Practice" : "Live"}
                  </button>
                ))}
              </div>
            </div>

            {/* DOMAINS */}
            <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Focus Areas
              </h3>

              <div className="flex flex-wrap gap-3">
                {domains.map(d => {
                  const active = selectedDomains.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDomain(d)}
                      className={`px-4 py-2 rounded-full border text-sm transition
                        ${active
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-zinc-800 border-white/10 text-zinc-400"
                        }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* LAUNCH */}
        {canStart && (
          <div className="mt-24 text-center">
            <button
              onClick={handleStart}
              className="px-12 py-5 text-lg font-bold rounded-2xl
              bg-purple-600 hover:bg-purple-700
              shadow-[0_0_40px_rgba(139,92,246,0.5)]
              transition-all"
            >
              🚀 Launch {interviewMode === "live" ? "Live Interview" : "Practice Session"}
            </button>

            <div className="mt-6 text-zinc-400">
              {activeLevel?.sessions} • {activeLevel?.q}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}