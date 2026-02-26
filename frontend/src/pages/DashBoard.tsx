import React, { useState } from "react";
import {
  Zap, FileText, PlayCircle, BarChart3, Github, Link,
  MessageSquare, TrendingUp, Award, Target, ChevronRight,
  Plus, X, Linkedin, Globe, Sparkles, Activity, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onViewResume: () => void;
  onStartInterview: () => void;
}

const Dashboard = ({ onViewResume, onStartInterview }: DashboardProps) => {
  const [links, setLinks] = useState([
    { id: 1, label: "GitHub", icon: "github", placeholder: "github.com/username" },
    { id: 2, label: "Portfolio", icon: "globe", placeholder: "yourportfolio.com" },
  ]);

  const addLinkField = () => {
    setLinks([...links, { id: Date.now(), label: "Other Link", icon: "link", placeholder: "Add URL here..." }]);
  };

  const removeLinkField = (id: number) => {
    if (links.length > 1) setLinks(links.filter(l => l.id !== id));
  };

  const IconComp = ({ name }: { name: string }) => {
    const iconMap: Record<string, React.FC<any>> = {
      github: Github,
      globe: Globe,
      linkedin: Linkedin,
      link: Link,
    };
    
    const Icon = iconMap[name as keyof typeof iconMap] || Link;
    return <Icon className="h-3.5 w-3.5 flex-shrink-0" />;
  };

  const stats = [
    { label: "Overall Rating", val: "8.4", sub: "/ 10", Icon: BarChart3, color: "from-violet-500/20 to-violet-500/5", accent: "#8b5cf6" },
    { label: "Confidence", val: "72", sub: "%", Icon: Zap, color: "from-amber-500/20 to-amber-500/5", accent: "#f59e0b" },
    { label: "Growth Rate", val: "+12", sub: "%", Icon: TrendingUp, color: "from-emerald-500/20 to-emerald-500/5", accent: "#10b981" },
    { label: "Feedback Loop", val: "ON", sub: "", Icon: MessageSquare, color: "from-sky-500/20 to-sky-500/5", accent: "#0ea5e9" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .db-root * { 
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important; 
          font-style: normal !important;
          font-weight: inherit;
        }
        .db-display { 
          font-family: 'Syne', sans-serif !important; 
          font-style: normal !important;
          font-weight: 700 !important;
        }

        @keyframes dbFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dbPulseGlow {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%     { opacity: 0.7; transform: scale(1.08);}
        }
        @keyframes dbSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dbBarGrow {
          from { width: 0%; }
          to   { width: var(--bar-w); }
        }
        @keyframes dbFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-6px); }
        }

        .db-card {
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 1.75rem;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .db-card:hover {
          box-shadow: 0 20px 48px -12px rgba(0,0,0,0.15);
          transform: translateY(-4px);
          border-color: rgba(0,0,0,0.12);
        }
        .db-dark {
          background: #0c0c0e !important;
          border-color: rgba(255,255,255,0.07) !important;
          color: white;
        }
        .db-dark:hover { border-color: rgba(255,255,255,0.13) !important; }

        .db-stagger-1 { animation: dbFadeUp 0.6s 0.05s both cubic-bezier(0.22,1,0.36,1); }
        .db-stagger-2 { animation: dbFadeUp 0.6s 0.12s both cubic-bezier(0.22,1,0.36,1); }
        .db-stagger-3 { animation: dbFadeUp 0.6s 0.20s both cubic-bezier(0.22,1,0.36,1); }
        .db-stagger-4 { animation: dbFadeUp 0.6s 0.28s both cubic-bezier(0.22,1,0.36,1); }
        .db-stagger-5 { animation: dbFadeUp 0.6s 0.36s both cubic-bezier(0.22,1,0.36,1); }

        .db-glow-orb { animation: dbPulseGlow 4s ease-in-out infinite; }
        .db-float { animation: dbFloat 3.5s ease-in-out infinite; }
        .db-bar { animation: dbBarGrow 1.2s 0.5s both cubic-bezier(0.22,1,0.36,1); }

        .db-btn-primary {
          background: #0c0c0e !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 0.875rem !important;
          height: 3.25rem !important;
          font-weight: 700 !important;
          font-size: 0.8rem !important;
          letter-spacing: 0.08em;
          text-transform: uppercase !important;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
          width: 100%;
          font-family: inherit !important;
        }
        .db-btn-primary:hover { 
          background: #1a1a1f !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.35);
        }

        .db-btn-outline {
          background: transparent !important;
          color: #0c0c0e !important;
          border: 1.5px solid rgba(0,0,0,0.15) !important;
          border-radius: 0.875rem !important;
          height: 3.25rem !important;
          font-weight: 700 !important;
          font-size: 0.8rem !important;
          letter-spacing: 0.08em;
          text-transform: uppercase !important;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
          width: 100%;
          font-family: inherit !important;
        }
        .db-btn-outline:hover { 
          background: rgba(0,0,0,0.04) !important;
          border-color: rgba(0,0,0,0.3) !important;
          transform: translateY(-2px);
        }

        .db-input {
          background: transparent !important;
          outline: none !important;
          color: rgba(255,255,255,0.95) !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          width: 100%;
          border: none !important;
          font-family: inherit !important;
        }
        .db-input::placeholder { 
          color: rgba(255,255,255,0.3) !important;
          font-weight: 500 !important;
        }

        .db-link-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 0.875rem;
          padding: 0.875rem 1rem;
          transition: all 0.2s ease;
        }
        .db-link-row:focus-within { 
          border-color: hsl(var(--primary)/0.6);
          box-shadow: 0 0 0 3px hsl(var(--primary)/0.1);
        }

        .db-scrollbar::-webkit-scrollbar { width: 4px; }
        .db-scrollbar::-webkit-scrollbar-track { 
          background: rgba(255,255,255,0.06); 
          border-radius: 10px; 
        }
        .db-scrollbar::-webkit-scrollbar-thumb { 
          background: hsl(var(--primary)/0.4); 
          border-radius: 10px; 
        }

        .db-score-ring {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: conic-gradient(hsl(var(--primary)) 0% 84%, rgba(255,255,255,0.08) 84% 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .db-score-ring::before {
          content: '';
          position: absolute;
          inset: 8px;
          background: #0c0c0e;
          border-radius: 50%;
        }
        .db-score-ring span { 
          position: relative; 
          z-index: 1; 
          font-weight: 800; 
          font-size: 1.1rem; 
          color: #fff; 
          font-family: 'Syne', sans-serif !important;
        }

        .db-tag {
          display: inline-flex; 
          align-items: center; 
          gap: 0.4rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 0.4rem 0.875rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-family: inherit !important;
        }

        /* Fix for any remaining italic inheritance */
        *, *::before, *::after {
          font-style: normal !important;
        }
        h1, h2, h3, h4, h5, h6, p, span, div, button, input {
          font-style: normal !important;
        }
      `}</style>

      <div className="db-root space-y-6 pb-10 max-w-7xl mx-auto px-4">
        {/* Rest of your JSX remains exactly the same */}
        {/* ── Row 1: Hero + Action ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Hero card */}
          <div className="db-card db-dark db-stagger-1 lg:col-span-3 p-8 md:p-10 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Ambient orbs */}
            <div className="db-glow-orb absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)" }} />
            <div className="db-glow-orb absolute bottom-0 right-20 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 70%)", animationDelay: "2s" }} />

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left */}
              <div className="space-y-4 flex-1">
                <div className="db-tag">
                  <Zap className="h-3 w-3 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  Active Performance
                </div>
                <h2 className="db-display text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight">
                  Your<br />
                  <span style={{ color: "hsl(var(--primary))" }}>Growth.</span>
                </h2>
                <p className="text-white/50 font-medium text-sm max-w-md leading-relaxed">
                  Track your interview readiness and refine your profile in real-time.
                </p>

                {/* Mini skill bars */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: "Communication", w: "82%" },
                    { label: "Technical", w: "74%" },
                    { label: "STAR Method", w: "60%" },
                  ].map((bar) => (
                    <div key={bar.label} className="flex items-center gap-3">
                      <span className="text-white/40 text-xs font-bold w-24 uppercase tracking-wider flex-shrink-0">{bar.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div className="db-bar h-full rounded-full" style={{ "--bar-w": bar.w, background: "hsl(var(--primary))" } as React.CSSProperties} />
                      </div>
                      <span className="text-white/40 text-xs font-bold w-10 text-right flex-shrink-0">{bar.w}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Links panel */}
              <div className="w-full lg:w-72 space-y-3 bg-white/[0.04] p-6 rounded-2xl border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-white/40 tracking-widest">Profile Links</span>
                  <button
                    onClick={addLinkField}
                    className="group flex items-center gap-1 text-xs font-black uppercase px-3 py-1.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ 
                      color: "hsl(var(--primary))", 
                      borderColor: "hsl(var(--primary)/0.3)", 
                      background: "hsl(var(--primary)/0.1)" 
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                    Add
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[180px] overflow-y-auto db-scrollbar">
                  {links.map((link) => (
                    <div key={link.id} className="db-link-row group">
                      <IconComp name={link.icon} />
                      <input 
                        type="text" 
                        placeholder={link.placeholder} 
                        className="db-input flex-1" 
                      />
                      {links.length > 1 && (
                        <button 
                          onClick={() => removeLinkField(link.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 ml-1"
                          title="Remove link"
                        >
                          <X className="h-3.5 w-3.5 text-white/30 hover:text-red-300" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score ring bottom-right */}
            <div className="absolute bottom-8 right-8 hidden lg:flex items-end gap-3">
              <div className="db-score-ring">
                <span>8.4</span>
              </div>
              <div className="mb-1">
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Overall</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Score</p>
              </div>
            </div>
          </div>

          {/* Action card */}
          <div className="db-stagger-2 rounded-[1.75rem] p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: "hsl(var(--primary))", border: "none" }}>

            <div className="db-float mx-auto mb-4">
              <div className="h-20 w-20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <Target className="h-10 w-10 text-black/90" />
              </div>
            </div>

            <div>
              <h3 className="db-display text-2xl font-extrabold text-black text-center mb-2 tracking-tight leading-tight">
                Ready to<br/>Practice?
              </h3>
              <p className="text-black/50 text-sm font-medium text-center mb-6 leading-relaxed">
                Pick your next challenge
              </p>

              <div className="space-y-3">
                <button className="db-btn-primary" onClick={onStartInterview}>
                  ▶ Start Interview
                </button>
                <button className="db-btn-outline" onClick={onViewResume}>
                  ✦ Resume Analysis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Stats ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 db-stagger-3">
          {stats.map((stat, i) => (
            <div key={i} className="db-card relative overflow-hidden p-7 group cursor-pointer hover:scale-[1.02] transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-11 w-11 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300"
                    style={{ background: stat.accent + "20", border: `1px solid ${stat.accent}30` }}>
                    <stat.Icon className="h-5 w-5" style={{ color: stat.accent }} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/20 group-hover:text-black/40 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <p className="text-xs font-black uppercase text-black/40 tracking-[0.2em] mb-2 group-hover:text-black/60 transition-colors">{stat.label}</p>
                <h4 className="db-display text-3xl lg:text-4xl font-black text-black tracking-tight group-hover:text-black">
                  {stat.val}<span className="text-lg text-black/30 font-normal ml-1">{stat.sub}</span>
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 3: Feedback + Next Session ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 db-stagger-4">
          {/* Feedback card */}
          <div className="db-card db-dark db-stagger-4 p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                style={{ background: "hsl(var(--primary)/0.15)", border: "1px solid hsl(var(--primary)/0.25)" }}>
                <MessageSquare className="h-6 w-6" style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <h3 className="db-display text-xl font-black text-white tracking-tight">AI Feedback</h3>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Latest Interview Insights</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[
                {
                  dot: "hsl(var(--primary))",
                  tag: "Key Strength",
                  tagColor: "hsl(var(--primary))",
                  text: "Excellent grasp of system design fundamentals. Your ability to break down complex monoliths into microservices is impressive."
                },
                {
                  dot: "#f97316",
                  tag: "Improvement Area",
                  tagColor: "#fb923c",
                  text: "Use more quantitative metrics when describing past projects. Focus on 'Impact' rather than just 'Execution'."
                },
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-3xl border transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: item.tagColor }}>
                      {item.tag}
                    </p>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next session card */}
          <div className="db-stagger-5 rounded-[1.75rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden border-2 border-dashed group hover:border-solid"
            style={{ background: "#0c0c0e", borderColor: "rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-all duration-500"
                style={{ background: "hsl(var(--primary))" }} />
            </div>

            <div className="db-float relative z-10 mb-8">
              <div className="h-24 w-24 rounded-3xl flex items-center justify-center border-2 backdrop-blur-xl mx-auto group-hover:scale-110 transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}>
                <PlayCircle className="h-12 w-12" style={{ color: "hsl(var(--primary))" }} />
              </div>
            </div>

            <div className="relative z-10 space-y-3 mb-10">
              <h4 className="db-display text-3xl font-black text-white tracking-tight leading-tight">
                Ready for Round 2?
              </h4>
              <p className="text-white/45 text-base max-w-[280px] mx-auto leading-relaxed">
                Level up your growth rate by tackling a fresh set of challenges today.
              </p>
            </div>

            <button
              onClick={onStartInterview}
              className="relative z-20 flex items-center gap-2 text-lg font-black uppercase tracking-widest transition-all duration-300 group-hover:gap-4 hover:scale-105 active:scale-95"
              style={{ color: "hsl(var(--primary))" }}
            >
              Launch Session 
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
