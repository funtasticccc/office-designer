"use client";

import { useWorkspaceStore, WizardStep } from "@/store/useWorkspaceStore";
import DeskStep from "./steps/DeskStep";
import ChairStep from "./steps/ChairStep";
import MonitorStep from "./steps/MonitorStep";
import TechStep from "./steps/TechStep";
import KeyboardStep from "./steps/KeyboardStep";
import MouseStep from "./steps/MouseStep";
import AccessoriesStep from "./steps/AccessoriesStep";
import SummaryStep from "./steps/SummaryStep";

const STEPS: { key: WizardStep; label: string; icon: string }[] = [
  { key: "desk", label: "Desk", icon: "🪑" },
  { key: "chair", label: "Chair", icon: "💺" },
  { key: "monitors", label: "Monitors", icon: "🖥️" },
  { key: "tech", label: "Computer", icon: "💻" },
  { key: "keyboards", label: "Keyboard", icon: "⌨️" },
  { key: "mouses", label: "Mouse", icon: "🖱️" },
  { key: "accessories", label: "Extras", icon: "✨" },
  { key: "summary", label: "Summary", icon: "📋" },
];

const STEP_HEADERS: Record<WizardStep, { title: string; subtitle: string }> = {
  desk: {
    title: "Pick your desk",
    subtitle: "Choose the foundation of your workspace. Both desks are height-adjustable for ergonomic comfort.",
  },
  chair: {
    title: "Pick your chair",
    subtitle: "Select an ergonomic chair that keeps you comfortable through long work sessions.",
  },
  monitors: {
    title: "Add monitors",
    subtitle: "Add up to 3 monitors to boost your productivity. Choose the size and resolution you need.",
  },
  tech: {
    title: "Add a computer",
    subtitle: "Rent a laptop or desktop to power your setup. Pick one or skip if you're bringing your own.",
  },
  keyboards: {
    title: "Pick a keyboard",
    subtitle: "From mechanical to wireless — find the typing experience that fits your flow.",
  },
  mouses: {
    title: "Pick a mouse",
    subtitle: "Ergonomic, precision, or gaming — choose the mouse that suits your style.",
  },
  accessories: {
    title: "Enhance your space",
    subtitle: "Add finishing touches — lighting, audio, and personality to complete your setup.",
  },
  summary: {
    title: "Your workspace",
    subtitle: "Review your complete workspace setup. Everything is ready to be delivered to your door in Bali.",
  },
};

export const StepIndicators = () => {
  const currentStep = useWorkspaceStore((s) => s.currentStep);
  const setStep = useWorkspaceStore((s) => s.setStep);

  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-1.5 pb-3">
      {STEPS.map((step, i) => (
        <button
          key={step.key}
          onClick={() => setStep(step.key)}
          className={`step-dot ${
            i === currentIndex
              ? "active"
              : i < currentIndex
              ? "completed"
              : "upcoming"
          }`}
          aria-label={step.label}
        />
      ))}
      <span className="ml-auto text-xs font-semibold text-monis-orange uppercase tracking-widest">
        Step {currentIndex + 1} of {STEPS.length}
      </span>
    </div>
  );
};

export const StepTitle = () => {
  const currentStep = useWorkspaceStore((s) => s.currentStep);
  const header = STEP_HEADERS[currentStep];

  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl md:text-4xl text-monis-charcoal leading-tight pt-3">
        {header.title}
      </h1>
      <p className="mt-2 text-sm text-monis-charcoal/50 leading-relaxed max-w-md">
        {header.subtitle}
      </p>
    </div>
  );
};

const WizardPanel = () => {
  const currentStep = useWorkspaceStore((s) => s.currentStep);

  return (
    <div className="animate-fade-in">
      {currentStep === "desk" && <DeskStep />}
      {currentStep === "chair" && <ChairStep />}
      {currentStep === "monitors" && <MonitorStep />}
      {currentStep === "tech" && <TechStep />}
      {currentStep === "keyboards" && <KeyboardStep />}
      {currentStep === "mouses" && <MouseStep />}
      {currentStep === "accessories" && <AccessoriesStep />}
      {currentStep === "summary" && <SummaryStep />}
    </div>
  );
};

export default WizardPanel;
