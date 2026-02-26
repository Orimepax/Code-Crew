import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Zap, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Link as LinkIcon, 
  Brain, 
  ArrowLeft,
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featureList = [
  {
    icon: Zap,
    title: "AI Mock Interview",
    description: "Practice real-time AI-powered mock interviews tailored to your role and experience level.",
    tag: "Most Popular",
    color: "bg-blue-500"
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume and get AI-based feedback aligned with job descriptions.",
    tag: "AI Powered",
    color: "bg-green-500"
  },
  {
    icon: BarChart3,
    title: "Growth Tracker",
    description: "Track your performance, improvement, and interview readiness using visual analytics.",
    tag: "Analytics",
    color: "bg-purple-500"
  },
  {
    icon: MessageSquare,
    title: "Interview Feedback",
    description: "Get detailed analysis on technical depth, confidence, and STAR method usage.",
    tag: "Deep Insights",
    color: "bg-orange-500"
  },
  {
    icon: LinkIcon,
    title: "Profile Links",
    description: "Connect your GitHub, LinkedIn, or Portfolio to enhance your interview prep.",
    tag: "Integration",
    color: "bg-pink-500"
  },
  {
    icon: Brain,
    title: "Skill Assessment",
    description: "Evaluate your technical skills with adaptive testing before the interview.",
    tag: "New",
    color: "bg-yellow-500"
  }
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* --- Dashboard-style Navbar (Static for Features Page) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <Zap className="h-6 w-6 text-primary fill-primary" />
            <span className="text-lg font-bold tracking-tight">InterviewIQ</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="font-bold gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="container mx-auto max-w-6xl pt-28 px-6">
        
        {/* Header Section like Dashboard */}
        <div className="bg-primary/5 p-8 md:p-12 rounded-[2.5rem] border border-primary/10 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-black italic uppercase tracking-tighter leading-none">
              Powerful Tools for <span className="text-primary underline decoration-black underline-offset-4">Success</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground font-medium leading-relaxed">
              Bhai, humne saare features ko aise design kiya hai ki aapki preparation next level par ho. 
              Track growth, get feedback, and ace that interview.
            </p>
          </div>
        </div>

        {/* Feature Grid with Neobrutalist Style */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white border-2 border-black rounded-[2rem] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
            >
              {/* Feature Tag */}
              <div className="absolute top-6 right-8">
                <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1 rounded-md">
                  {feature.tag}
                </span>
              </div>

              {/* Icon Container */}
              <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black mb-6 rotate-3 group-hover:rotate-0 transition-transform`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground font-bold text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex items-center text-primary font-black italic uppercase text-xs cursor-pointer group-hover:gap-2 transition-all">
                Learn More <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-black text-white p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Ready to start?</h2>
            <p className="text-white/60 font-medium">Launch your first AI Mock Interview today.</p>
          </div>
          <Button onClick={() => navigate("/")} size="lg" className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-black italic uppercase text-xl hover:scale-105 transition-transform">
            Go to Practice <Zap className="ml-2 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;