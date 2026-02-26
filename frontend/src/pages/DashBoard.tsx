import { Zap, FileText, PlayCircle, BarChart3, Github, Link, MessageSquare, TrendingUp, Award, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onViewResume: () => void;
  onStartInterview: () => void;
}

const Dashboard = ({ onViewResume, onStartInterview }: DashboardProps) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      {/* --- Main Hero Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
              <Zap className="h-3.5 w-3.5 fill-primary" /> Active Performance
            </div>
            {/* Removed Italic here */}
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-none">
              Your <span className="text-primary">Growth</span>
            </h2>
            <p className="text-white/50 font-medium text-lg max-w-md">
              Everything you need to prepare smarter and track your interview readiness.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 focus-within:border-primary/50 transition-all">
              <Github className="h-5 w-5 text-white/40" />
              <input type="text" placeholder="GitHub URL" className="bg-transparent outline-none text-sm font-bold text-white w-full md:w-40 placeholder:text-white/20" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 focus-within:border-primary/50 transition-all">
              <Link className="h-5 w-5 text-white/40" />
              <input type="text" placeholder="Portfolio" className="bg-transparent outline-none text-sm font-bold text-white w-full md:w-40 placeholder:text-white/20" />
            </div>
          </div>
        </div>

        {/* --- Quick Action --- */}
        <div className="bg-primary p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(20,241,149,0.15)] group relative overflow-hidden">
          <Target className="h-12 w-12 text-black mb-6 group-hover:scale-110 transition-transform relative z-10" />
          <div className="space-y-3 w-full relative z-10">
            {/* Removed Italic from buttons */}
            <Button 
              onClick={onStartInterview} 
              className="w-full h-14 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black text-md uppercase transition-all shadow-xl"
            >
              Start Interview
            </Button>
            <Button 
              onClick={onViewResume} 
              variant="outline"
              className="w-full h-14 rounded-2xl border-black/20 bg-black/5 hover:bg-black/10 text-black font-black text-md uppercase"
            >
              Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Overall Rating", val: "8.4", sub: "/ 10", icon: BarChart3 },
          { label: "Confidence", val: "72", sub: "%", icon: Zap },
          { label: "Growth Rate", val: "+12", sub: "%", icon: TrendingUp },
          { label: "Feedback Loop", val: "Active", sub: "", icon: MessageSquare }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0f0f0f] p-8 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all group">
            <stat.icon className="h-6 w-6 text-primary mb-6 opacity-80 group-hover:opacity-100" />
            <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">{stat.label}</p>
            {/* Removed Italic from numbers */}
            <h4 className="text-3xl font-bold text-white tracking-tighter">
              {stat.val}<span className="text-sm text-white/20 ml-1 font-normal">{stat.sub}</span>
            </h4>
          </div>
        ))}
      </div>

      {/* --- Feedback Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Latest Feedback</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
              {/* Removed Italic from labels */}
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Strengths</p>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                "Excellent grasp of system design fundamentals. Behavioral answers are structured well."
              </p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">Improvements</p>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                "Try to be more concise during technical explanations to manage time better."
              </p>
            </div>
          </div>
        </div>

        {/* --- Placeholder Card --- */}
        <div className="border border-dashed border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group">
          <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary/10 transition-colors">
            <PlayCircle className="h-10 w-10 text-primary" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Next Session Ready</h4>
          <p className="text-white/40 text-sm max-w-[240px] mb-6 font-medium">Complete your next mock interview to unlock deeper analytics.</p>
          <Button variant="link" className="text-primary font-black uppercase tracking-tighter hover:no-underline flex items-center gap-2">
            Start Now <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;