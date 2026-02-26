import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, ArrowRight, X, Mail, Lock, Sparkles } from "lucide-react";

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
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px);  }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-6px) rotate(2deg); }
        }
        .modal-card   { animation: modalIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .role-btn     { transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .role-btn:hover:not(.active) { transform: translateY(-2px); }
        .input-wrap   { position: relative; }
        .input-icon   { position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .styled-input { padding-left: 3.2rem !important; }
        .submit-btn   { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 40px -12px hsl(var(--primary) / 0.45); }
        .submit-btn:active { transform: scale(0.97); }
        .glow-ring    { box-shadow: 0 0 0 1px hsl(var(--border)), 0 32px 64px -16px hsl(var(--primary) / 0.18), 0 8px 32px -8px rgba(0,0,0,0.25); }
        .float-badge  { animation: floatBadge 3s ease-in-out infinite; }
      `}</style>

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Card */}
      <div className="modal-card glow-ring relative bg-card w-full max-w-[420px] rounded-[2rem] overflow-hidden border border-border">

        {/* Top gradient band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/30" />

        {/* Floating badge */}
        <div className="float-badge absolute top-5 right-5 flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[11px] font-bold text-primary tracking-wide">AI POWERED</span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 h-9 w-9 flex items-center justify-center rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-8 pt-10 pb-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground leading-tight">
              Welcome Back
            </h2>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              Select your role and sign in to continue
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1.5 bg-muted/80 rounded-2xl mb-7 gap-1.5 border border-border/50">
            {[
              { val: "user",      label: "Candidate",  Icon: User      },
              { val: "recruiter", label: "Recruiter",  Icon: Briefcase },
            ].map(({ val, label, Icon }) => (
              <button
                key={val}
                onClick={() => setRole(val)}
                className={`role-btn flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold ${
                  role === val
                    ? "active bg-background text-foreground shadow-md border border-border/80"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${role === val ? "text-primary" : ""}`} />
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="input-wrap">
              <div className="input-icon">
                <Mail className="h-4.5 w-4.5 text-muted-foreground" style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="styled-input w-full h-14 pr-5 rounded-xl border-2 border-input bg-background text-foreground text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/60"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password */}
            <div className="input-wrap">
              <div className="input-icon">
                <Lock className="h-4 w-4 text-muted-foreground" style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="styled-input w-full h-14 pr-5 rounded-xl border-2 border-input bg-background text-foreground text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/60"
                placeholder="Password"
                required
              />
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="submit-btn w-full h-13 text-base font-black bg-primary hover:bg-primary/95 text-primary-foreground rounded-xl mt-1 group"
              style={{ height: "3.25rem" }}
            >
              <span className="flex items-center justify-center gap-2.5">
                Sign In as {role === "user" ? "Candidate" : "Recruiter"}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted/60"
          >
            Maybe later
          </button>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;