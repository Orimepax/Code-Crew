import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, ArrowRight } from "lucide-react";

const AuthModal = ({ isOpen, onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("user");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) onLoginSuccess({ role });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-card backdrop-blur-3xl w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-border animate-in zoom-in duration-500">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="text-muted-foreground mt-3 text-lg font-medium">
            Please select your role and log in
          </p>
        </div>

        <div className="flex p-1.5 bg-muted rounded-[2rem] mb-10 gap-1 border border-border">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] text-base font-bold transition-all ${
              role === "user" 
                ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]" 
                : "text-muted-foreground hover:text-foreground hover:bg-background"
            }`}
          >
            <User className="h-5 w-5" />
            Candidate
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] text-base font-bold transition-all ${
              role === "recruiter" 
                ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]" 
                : "text-muted-foreground hover:text-foreground hover:bg-background"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            Recruiter
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 px-6 rounded-2xl border-2 border-input bg-background text-foreground text-lg outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              placeholder="Email address"
              required
            />
          </div>

          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 px-6 rounded-2xl border-2 border-input bg-background text-foreground text-lg outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              placeholder="Password"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 text-xl font-black bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group"
          >
            <span className="flex items-center justify-center gap-3">
              Sign In as {role === "user" ? "Candidate" : "Recruiter"}
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Button>
        </form>

        <button 
          onClick={onClose}
          className="mt-8 w-full text-lg font-bold text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default AuthModal;