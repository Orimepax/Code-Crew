import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Calendar, FileText, ArrowRight, CheckCircle2, Upload, Sparkles } from "lucide-react";

interface ProfileSetupProps {
  onComplete: (file: File) => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [resume, setResume] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { alert("Only PDF files allowed"); return; }
    setResume(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { alert("Only PDF files allowed"); return; }
    setResume(file);
  };

  const fields = [
    { key: "name",  label: "Full Name",           icon: User,     placeholder: "e.g. Code Crew",     type: "text"   },
    { key: "role",  label: "Desired Role",         icon: Briefcase,placeholder: "e.g. Frontend Developer", type: "text"   },
    { key: "exp",   label: "Years of Experience",  icon: Calendar, placeholder: "e.g. 3",                  type: "number" },
  ];

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.25); }
          50%       { box-shadow: 0 0 0 8px hsl(var(--primary) / 0);  }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg);  opacity: 1; }
        }
        .profile-card   { animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .input-field    { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
        .input-field:focus { transform: translateY(-1px); box-shadow: 0 8px 24px -8px hsl(var(--primary)/0.2); }
        .save-btn       { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .save-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 20px 40px -12px hsl(var(--primary)/0.45); }
        .save-btn:active:not(:disabled) { transform: scale(0.97); }
        .check-pop      { animation: checkPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .upload-zone    { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
        .upload-zone:hover { transform: translateY(-2px); }
        .step-dot       { transition: all 0.3s ease; }
      `}</style>

      <div className="profile-card w-full max-w-5xl mx-auto mt-8 rounded-[2.5rem] bg-card border border-border overflow-hidden shadow-2xl shadow-black/10">

        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/30 w-full" />

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-3 pt-7 pb-1 px-8">
          {["Personal Info", "Role Details", "Upload Resume"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`step-dot flex items-center justify-center h-7 w-7 rounded-full text-xs font-black border-2 ${
                i < 2 ? "bg-primary border-primary text-primary-foreground" :
                resume ? "bg-primary border-primary text-primary-foreground" :
                "bg-background border-border text-muted-foreground"
              }`}>
                {(i < 2) || resume ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-bold hidden sm:block ${i === 2 && !resume ? "text-muted-foreground" : "text-foreground"}`}>
                {step}
              </span>
              {i < 2 && <div className="w-8 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>

        <div className="px-8 md:px-14 pt-8 pb-12">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-bold text-primary tracking-wide uppercase">AI Personalization</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3 leading-tight">
              Complete Your <span className="text-primary">Profile</span>
            </h2>
            <p className="text-muted-foreground text-base font-medium max-w-md mx-auto">
              Help our AI customize your perfect interview experience.
            </p>
          </div>

          {/* Form grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Left — text fields */}
            <div className="space-y-5">
              {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
                <div key={key} className="group">
                  <label className="flex items-center gap-2 text-xs font-black mb-2.5 ml-1 text-foreground uppercase tracking-wider">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={type}
                      placeholder={placeholder}
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      className="input-field w-full h-14 px-5 rounded-2xl border-2 border-border bg-background text-foreground text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
                    />
                    {focused === key && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-primary/20 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right — upload + CTA */}
            <div className="flex flex-col gap-5">

              {/* Upload zone */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black mb-2.5 ml-1 text-foreground uppercase tracking-wider">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  Professional Resume
                </label>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className={`upload-zone relative h-48 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed cursor-pointer overflow-hidden ${
                    resume
                      ? "border-primary bg-primary/5"
                      : dragging
                      ? "border-primary bg-primary/8 scale-[1.01]"
                      : "border-border bg-background hover:border-primary/60 hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />

                  <div className="relative text-center px-6 z-0">
                    {resume ? (
                      <div className="check-pop">
                        <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                          <CheckCircle2 className="h-7 w-7 text-primary" />
                        </div>
                        <p className="text-foreground font-black text-sm truncate max-w-[220px]">{resume.name}</p>
                        <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">✓ Ready to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to replace</p>
                      </div>
                    ) : (
                      <>
                        <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-black text-foreground uppercase tracking-wider">
                          {dragging ? "Drop it here!" : "Upload Resume"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                          PDF only · Drag & drop or click
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="save-btn w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground border-0 mt-auto group disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!resume}
                onClick={() => resume && onComplete(resume)}
              >
                <span className="flex items-center justify-center gap-3 text-base font-black tracking-tight">
                  Save & Start Practice
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Button>

              {!resume && (
                <p className="text-center text-xs text-muted-foreground font-medium">
                  Upload your resume to enable this button
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ProfileSetup;
