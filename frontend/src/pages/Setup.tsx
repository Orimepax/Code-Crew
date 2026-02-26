import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap, Briefcase, Code, Database, Palette, Users, BarChart } from "lucide-react";

const roles = [
  { id: "frontend", label: "Frontend Developer", icon: Palette },
  { id: "backend", label: "Backend Developer", icon: Database },
  { id: "fullstack", label: "Full Stack Developer", icon: Code },
  { id: "data", label: "Data Scientist", icon: BarChart },
  { id: "devops", label: "DevOps Engineer", icon: Briefcase },
  { id: "hr", label: "HR / Behavioral", icon: Users },
];

const levels = [
  { id: "junior", label: "Junior (0–2 yrs)", description: "Entry-level fundamentals" },
  { id: "mid", label: "Mid-Level (2–5 yrs)", description: "Applied knowledge & design" },
  { id: "senior", label: "Senior (5+ yrs)", description: "Architecture & leadership" },
];

const domains = [
  "React", "Node.js", "Python", "Java", "System Design",
  "Machine Learning", "Cloud/AWS", "SQL/Databases", "Communication", "Leadership",
];

const Setup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (d: string) =>
    setSelectedDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const canStart = selectedRole && selectedLevel && selectedDomains.length > 0;

  const handleStart = () => {
    const config = { role: selectedRole, level: selectedLevel, domains: selectedDomains };
    sessionStorage.setItem("interviewConfig", JSON.stringify(config));
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">InterviewIQ</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-3xl font-bold tracking-tight">
          Set Up Your <span className="text-gradient">Interview</span>
        </h1>
        <p className="mt-2 text-muted-foreground">We'll tailor questions to your profile.</p>

        {/* Role */}
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Select Role</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  selectedRole === role.id
                    ? "border-primary bg-primary/10 glow-primary"
                    : "border-border/50 bg-card hover:border-primary/30"
                }`}
              >
                <role.icon className={`h-5 w-5 ${selectedRole === role.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Experience Level</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  selectedLevel === level.id
                    ? "border-primary bg-primary/10 glow-primary"
                    : "border-border/50 bg-card hover:border-primary/30"
                }`}
              >
                <span className="block text-sm font-medium">{level.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{level.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Focus Areas</h2>
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => toggleDomain(d)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  selectedDomains.includes(d)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Start */}
        <div className="mt-12">
          <Button
            size="lg"
            disabled={!canStart}
            onClick={handleStart}
            className="glow-primary px-8 text-base font-semibold"
          >
            Start Interview
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {!canStart && (
            <p className="mt-3 text-sm text-muted-foreground">
              Please select a role, experience level, and at least one focus area.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
