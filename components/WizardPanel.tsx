"use client";

import { useWorkspaceStore, WizardStep } from "@/store/useWorkspaceStore";
import DeskStep from "./steps/DeskStep";
import ChairStep from "./steps/ChairStep";
import MonitorStep from "./steps/MonitorStep";
import AccessoriesStep from "./steps/AccessoriesStep";
import SummaryStep from "./steps/SummaryStep";

const STEPS: { key: WizardStep; label: string; icon: string }[] = [
  { key: "desk", label: "Desk", icon: "🪑" },
  { key: "chair", label: "Chair", icon: "💺" },
  { key: "monitors", label: "Monitors", icon: "🖥️" },
  { key: "accessories", label: "Extras", icon: "✨" },
  { key: "summary", label: "Summary", icon: "📋" },
];

const WizardPanel = () => {
  const currentStep = useWorkspaceStore((s) => s.currentStep);
  const setStep = useWorkspaceStore((s) => s.setStep);

  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="py-6 lg:py-8">
      {/* ── Step Indicators ── */}
      <div className="flex items-center gap-2 mb-6">
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
        <span className="ml-3 text-xs font-semibold text-monis-orange uppercase tracking-widest">
          Step {currentIndex + 1} of {STEPS.length}
        </span>
      </div>

      {/* ── Step Header ── */}
      <div className="mb-6">
        <h1 className="font-display text-3xl lg:text-4xl text-monis-charcoal leading-tight">
          {currentStep === "desk" && "Pick your desk"}
          {currentStep === "chair" && "Pick your chair"}
          {currentStep === "monitors" && "Add monitors"}
          {currentStep === "accessories" && "Enhance your space"}
          {currentStep === "summary" && "Your workspace"}
        </h1>
        <p className="mt-2 text-sm text-monis-charcoal/50 leading-relaxed max-w-md">
          {currentStep === "desk" &&
            "Choose the foundation of your workspace. Both desks are height-adjustable for ergonomic comfort."}
          {currentStep === "chair" &&
            "Select an ergonomic chair that keeps you comfortable through long work sessions."}
          {currentStep === "monitors" &&
            "Add up to 3 monitors to boost your productivity. Choose the size and resolution you need."}
          {currentStep === "accessories" &&
            "Complete your setup with peripherals and lifestyle extras. Toggle anything on or off."}
          {currentStep === "summary" &&
            "Review your complete workspace setup. Everything is ready to be delivered to your door in Bali."}
        </p>
      </div>

      {/* ── Step Content ── */}
      <div className="animate-fade-in">
        {currentStep === "desk" && <DeskStep />}
        {currentStep === "chair" && <ChairStep />}
        {currentStep === "monitors" && <MonitorStep />}
        {currentStep === "accessories" && <AccessoriesStep />}
        {currentStep === "summary" && <SummaryStep />}
      </div>
    </div>
  );
};

export default WizardPanel;
