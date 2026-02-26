import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Calendar, FileText, ArrowRight, CheckCircle2 } from "lucide-react";

// ✅ Fix: onComplete ab file accept karega
interface ProfileSetupProps {
  onComplete: (file: File) => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [resume, setResume] = useState<File | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }
    setResume(file);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 rounded-[2.5rem] bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">
          Complete Your <span className="text-gradient">Profile</span>
        </h2>
        <p className="text-black text-lg font-semibold">
          This information helps our AI customize your interview experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold mb-2 ml-1 text-black">
              <User className="h-4 w-4 text-primary" /> Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Kanishka Gupta"
              className="w-full h-16 px-6 rounded-2xl border border-black bg-white focus:ring-2 focus:ring-primary outline-none transition-all duration-300 text-black font-bold placeholder:text-gray-400"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold mb-2 ml-1 text-black">
              <Briefcase className="h-4 w-4 text-primary" /> Desired Role
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              className="w-full h-16 px-6 rounded-2xl border border-black bg-white focus:ring-2 focus:ring-primary outline-none transition-all duration-300 text-black font-bold placeholder:text-gray-400"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold mb-2 ml-1 text-black">
              <Calendar className="h-4 w-4 text-primary" /> Years of Experience
            </label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="w-full h-16 px-6 rounded-2xl border border-black bg-white focus:ring-2 focus:ring-primary outline-none transition-all duration-300 text-black font-bold placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative group">
             <label className="flex items-center gap-2 text-sm font-bold mb-2 ml-1 text-black">
              <FileText className="h-4 w-4 text-primary" /> Professional Resume
            </label>
            <div className={`relative h-44 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl transition-all duration-300 ${resume ? 'border-primary bg-primary/5' : 'border-black bg-white hover:bg-gray-50'}`}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center p-4">
                {resume ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-2" />
                    <p className="text-black font-black truncate max-w-[250px]">{resume.name}</p>
                    <p className="text-xs text-primary font-bold">File Selected</p>
                  </>
                ) : (
                  <>
                    <FileText className="h-8 w-8 text-black mx-auto mb-2" />
                    <p className="text-sm font-black text-black uppercase tracking-wider">Upload PDF</p>
                    <p className="text-xs text-black mt-1 font-medium">Click or drag & drop</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            className="w-full h-16 rounded-3xl bg-primary hover:opacity-90 text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 group mt-auto border-0"
            disabled={!resume}
            // ✅ Fix: onComplete ko resume bhej raha hai
            onClick={() => resume && onComplete(resume)}
          >
            <span className="text-lg md:text-xl font-black tracking-tight flex items-center justify-center gap-3">
              SAVE & START PRACTICE
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;