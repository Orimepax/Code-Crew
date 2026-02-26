import { X, Zap, Brain, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Brain,
    title: "AI Understands Your Profile",
    description:
      "Select your role, experience level, or upload your resume. Our AI analyzes your skills and gaps.",
  },
  {
    icon: MessageSquare,
    title: "Adaptive Mock Interview",
    description:
      "Get real interview questions that adjust in real time based on your answers.",
  },
  {
    icon: BarChart3,
    title: "Instant Feedback & Insights",
    description:
      "Receive detailed feedback, STAR analysis, and skill radar reports after each session.",
  },
];

const HowItWorks = ({ isOpen, onClose }: HowItWorksProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-xl bg-background p-8 shadow-xl animate-in fade-in zoom-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            How It <span className="text-gradient">Works</span>
          </h2>

          <p className="mt-3 text-muted-foreground">
            A simple, powerful way to prepare for real interviews using AI.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border border-border/50 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button onClick={onClose} size="lg" className="px-8">
            Start Practicing 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;