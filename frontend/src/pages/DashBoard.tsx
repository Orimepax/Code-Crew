import React, { useState } from "react";
import { 
  Zap, 
  FileText, 
  PlayCircle, 
  BarChart3, 
  Github, 
  Link, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Target, 
  ChevronRight, 
  Plus, 
  X,
  Linkedin,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onViewResume: () => void;
  onStartInterview: () => void;
}

const Dashboard = ({ onViewResume, onStartInterview }: DashboardProps) => {
  // Dynamic links state
  const [links, setLinks] = useState([
    { id: 1, label: "GitHub", icon: <Github className="h-4 w-4" />, placeholder: "github.com/username" },
    { id: 2, label: "Portfolio", icon: <Globe className="h-4 w-4" />, placeholder: "yourportfolio.com" }
  ]);

  // Function to add a new link field
  const addLinkField = () => {
    const newId = Date.now();
    setLinks([...links, { 
      id: newId, 
      label: "Other Link", 
      icon: <Link className="h-4 w-4" />, 
      placeholder: "Add URL here..." 
    }]);
  };

  // Function to remove a link field
  const removeLinkField = (id: number) => {
    if (links.length > 1) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 p-4 md:p-0">
      
      {/* --- Main Hero Section (Deep Black & Neon) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[#0a0a0a] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Neon Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                <Zap className="h-3.5 w-3.5 fill-primary" /> Active Performance
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.9]">
                Your <span className="text-primary">Growth</span>
              </h2>
              <p className="text-white/40 font-medium text-lg max-w-sm leading-snug">
                Track your interview readiness and refine your profile in real-time.
              </p>
            </div>

            {/* Right Dynamic Inputs Area */}
            <div className="w-full md:w-auto space-y-4 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Profile Links</span>
                <button 
                  onClick={addLinkField}
                  className="group flex items-center gap-2 text-[10px] font-black uppercase text-primary border border-primary/20 px-2 py-1 rounded-lg hover:bg-primary hover:text-black transition-all"
                >
                  <Plus className="h-3 w-3" /> Add Field
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {links.map((link) => (
                  <div key={link.id} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/10 focus-within:border-primary/50 transition-all group">
                    <span className="text-white/40 group-focus-within:text-primary transition-colors">
                      {link.icon}
                    </span>
                    <input 
                      type="text" 
                      placeholder={link.placeholder} 
                      className="bg-transparent outline-none text-xs font-bold text-white w-full md:w-44 placeholder:text-white/20" 
                    />
                    <button 
                      onClick={() => removeLinkField(link.id)} 
                      className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all px-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Primary Action Card --- */}
        <div className="bg-primary p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(20,241,149,0.15)] group relative overflow-hidden">
          <div className="bg-black/10 p-5 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
            <Target className="h-10 w-10 text-black" />
          </div>
          <div className="space-y-3 w-full relative z-10">
            <Button 
              onClick={onStartInterview} 
              className="w-full h-14 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-md uppercase transition-all shadow-xl"
            >
              Start Interview
            </Button>
            <Button 
              onClick={onViewResume} 
              variant="outline" 
              className="w-full h-14 rounded-2xl border-black/10 bg-black/5 hover:bg-black/10 text-black font-black text-md uppercase"
            >
              Resume Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* --- Stats Row --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Overall Rating", val: "8.4", sub: "/ 10", icon: BarChart3 },
          { label: "Confidence", val: "72", sub: "%", icon: Zap },
          { label: "Growth Rate", val: "+12", sub: "%", icon: TrendingUp },
          { label: "Feedback Loop", val: "Active", sub: "", icon: MessageSquare }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0f0f0f] p-8 rounded-[2.2rem] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all">
                <stat.icon className="h-16 w-16 text-white" />
             </div>
            <stat.icon className="h-6 w-6 text-primary mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
            <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">{stat.label}</p>
            <h4 className="text-4xl font-bold text-white tracking-tighter">
              {stat.val}<span className="text-sm text-white/20 ml-1 font-normal">{stat.sub}</span>
            </h4>
          </div>
        ))}
      </div>

      {/* --- Feedback & Performance Insights --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 flex flex-col shadow-inner">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">Intelligence Feedback</h3>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Latest Interview Insights</p>
            </div>
          </div>
          
          <div className="space-y-5 flex-1">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[1.8rem] hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Key Strength</p>
              </div>
              <p className="text-white/70 text-sm font-medium leading-relaxed font-sans">
                "Excellent grasp of system design fundamentals. Your ability to break down complex monoliths into microservices is impressive."
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[1.8rem] hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Improvement Area</p>
              </div>
              <p className="text-white/70 text-sm font-medium leading-relaxed font-sans">
                "Try to use more quantitative metrics when describing past projects. Focus on the 'Impact' rather than just 'Execution'."
              </p>
            </div>
          </div>
        </div>

        {/* --- Interactive Next Session Card --- */}
        <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group bg-gradient-to-b from-transparent to-primary/[0.02] hover:border-primary/30 transition-all duration-500">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:scale-110 transition-transform" />
            <div className="h-24 w-24 bg-black rounded-[2rem] flex items-center justify-center border border-white/10 relative z-10 group-hover:rotate-[10deg] transition-transform">
              <PlayCircle className="h-12 w-12 text-primary fill-primary/10" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-white mb-3 tracking-tight">Ready for Round 2?</h4>
          <p className="text-white/40 text-base max-w-[280px] mb-8 font-medium font-sans">
            Level up your growth rate by tackling a fresh set of challenges today.
          </p>
          <Button 
            variant="link" 
            onClick={onStartInterview} 
            className="text-primary font-black text-xs uppercase tracking-[0.3em] hover:no-underline flex items-center gap-3 transition-all group-hover:gap-5"
          >
            Launch Session <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Custom CSS for the scrollbar inside the links area */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 241, 149, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 241, 149, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;