import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Shield,
  ChevronDown
} from "lucide-react";

import AuthModal from "@/pages/AuthModal";
import ProfileSetup from "@/components/ui/ProfileSetup";
import HowItWorks from "@/pages/HowItWorksButton";
import Dashboard from "@/pages/DashBoard"; 

const featuresData = [
  { icon: Brain, title: "AI-Powered Questions", description: "Adaptive questions that evolve based on your performance and skill gaps." },
  { icon: MessageSquare, title: "Real-Time Feedback", description: "Instant analysis of clarity, structure, confidence, and technical depth." },
  { icon: BarChart3, title: "Skill Radar Report", description: "Visual breakdown of your strengths across skills." },
  { icon: Target, title: "STAR Method Detection", description: "AI evaluates your behavioral answers against the STAR framework." },
  { icon: TrendingUp, title: "Progress Tracking", description: "Track improvement over time with detailed session history." },
  { icon: Shield, title: "Industry Coverage", description: "Practice for Frontend, Backend, Data Science, HR, and more." },
];

const Index = () => {
  const navigate = useNavigate();
  
  // --- States ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);

  // --- Handlers ---
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleProfileComplete = (file: File) => {
    setUploadedResume(file);
    setIsProfileComplete(true);
    setShowDashboard(true); 
  };

  const handleFeaturesNavigation = () => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
    } else if (!isProfileComplete) {
      alert("Bhai, pehle profile complete karke resume toh upload kar lo! 📄");
    } else {
      navigate("/features");
    }
  };

  const handleDropdownAction = (action: string) => {
    if (action === "resume") {
      if (uploadedResume) {
        const fileURL = URL.createObjectURL(uploadedResume);
        window.open(fileURL, "_blank");
      } else {
        alert("Please upload your resume first!");
      }
    } else if (action === "interview") {
      navigate("/setup");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => { setShowDashboard(false); navigate("/"); }}
          >
            <Zap className="h-6 w-6 text-primary fill-primary" />
            <span className="text-lg font-bold tracking-tight">InterviewIQ</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button 
              onClick={() => setIsHowItWorksOpen(true)} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              How It Works
            </button>
            
            <button 
              onClick={handleFeaturesNavigation} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </button>

            <button 
              onClick={() => {
                if(isLoggedIn && isProfileComplete) setShowDashboard(true);
                else if(!isLoggedIn) setIsAuthOpen(true);
                else alert("Pehle profile setup pura karein!");
              }}
              className={`text-sm font-bold transition-colors ${showDashboard ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              DashBoard
            </button>
          </div>

          {!isLoggedIn ? (
            <Button onClick={() => setIsAuthOpen(true)} size="sm" className="font-bold">
              Login / Signup
            </Button>
          ) : (
             <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Active Session
             </div>
          )}
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="pt-24 lg:pt-32 transition-all duration-500">
        <div className="container mx-auto px-6 pb-24">
          
          {/* Case 1: Dashboard (After Login & Profile) */}
          {isLoggedIn && isProfileComplete && showDashboard ? (
            <Dashboard 
              onViewResume={() => handleDropdownAction("resume")} 
              onStartInterview={() => handleDropdownAction("interview")} 
            />
          ) : (
            <>
              {/* Case 2: Profile Setup (After Login, Before Completion) */}
              {isLoggedIn && !isProfileComplete && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto">
                   <ProfileSetup onComplete={handleProfileComplete} />
                </div>
              )}

              {/* Case 3: Landing Page Hero (Not Logged In) */}
              {!isLoggedIn && (
                <section className="relative overflow-hidden pt-8 pb-16 text-center animate-in fade-in duration-700">
                  <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                    <Zap className="h-3.5 w-3.5" />
                    AI-Powered Interview Coach
                  </div>

                  <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                    Ace Every Interview with{" "}
                    <span className="text-primary underline decoration-black decoration-4 underline-offset-8">Intelligent Feedback</span>
                  </h1>

                  <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
                    Turn Your Resume Into Interview Success. Practice Smarter with AI-Powered Mock Interviews.
                  </p>

                  <div className="mt-10">
                    <Button size="lg" className="glow-primary px-10 py-7 text-lg font-bold rounded-2xl" onClick={() => setIsAuthOpen(true)}>
                      Get Started <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </div>
                </section>
              )}

              {/* Case 4: Bottom Features Preview (Visible on Home) */}
              {(!isLoggedIn || (isLoggedIn && isProfileComplete && !showDashboard)) && (
                <section id="features-preview" className="py-12 border-t border-border/50">
                  <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black uppercase italic">
                      Everything You Need to <span className="text-primary underline"></span>
                    </h2>
                  </div>

                  <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuresData.map((feature) => (
                      <div key={feature.title} className="group rounded-[2rem] border-2 border-border/50 bg-card p-8 hover:border-primary/50 transition-all cursor-pointer" onClick={handleFeaturesNavigation}>
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-3 font-bold text-xl uppercase italic">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground font-black italic uppercase">
            <Zap className="h-5 w-5 text-primary fill-primary" />
            InterviewIQ
          </div>
          <div className="font-bold uppercase tracking-widest opacity-40 text-[10px]">Built with AI · 2026</div>
        </div>
      </footer>

      {/* --- Modals --- */}
      <AuthModal
        isOpen={isAuthOpen}
        onLoginSuccess={handleLoginSuccess}
        onClose={() => setIsAuthOpen(false)}
      />
      <HowItWorks isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
    </div>
  );
};

export default Index;