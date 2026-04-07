import { create } from "zustand";
import { ProductCategory, getProductById, DESK_CONFIGS } from "@/data/products";

export type WizardStep = "desk" | "chair" | "monitors" | "accessories" | "summary";

const STEPS: WizardStep[] = ["desk", "chair", "monitors", "accessories", "summary"];

interface WorkspaceState {
  // ── Wizard navigation ──
  currentStep: WizardStep;
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  canGoNext: () => boolean;

  // ── Selections ──
  selectedDesk: string | null;
  selectedChair: string | null;
  monitorSelections: Record<string, number>;
  selectedAccessories: string[];

  // ── Actions ──
  selectDesk: (id: string) => void;
  selectChair: (id: string) => void;
  setMonitorCount: (id: string, count: number) => void;
  toggleAccessory: (id: string) => void;
  resetAll: () => void;

  // ── Derived ──
  getTotalPrice: () => number;
  getSurfaceY: () => number;
  getSelectedItemIds: () => string[];
  getMonitorItems: () => { id: string; count: number }[];
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  // ── Wizard ──
  currentStep: "desk",
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const idx = STEPS.indexOf(get().currentStep);
    if (idx < STEPS.length - 1) set({ currentStep: STEPS[idx + 1] });
  },
  prevStep: () => {
    const idx = STEPS.indexOf(get().currentStep);
    if (idx > 0) set({ currentStep: STEPS[idx - 1] });
  },
  canGoNext: () => {
    const { currentStep, selectedDesk, selectedChair } = get();
    if (currentStep === "desk") return !!selectedDesk;
    if (currentStep === "chair") return !!selectedChair;
    return true;
  },

  // ── Selections ──
  selectedDesk: "genius_desk_1",
  selectedChair: "ergonomic_chair",
  monitorSelections: {
    genius_monitor_1: 1,
  },
  selectedAccessories: ["genius_kb_1", "genius_mouse_1"],

  // ── Actions ──
  selectDesk: (id) => set({ selectedDesk: id }),
  selectChair: (id) => set({ selectedChair: id }),
  setMonitorCount: (id, count) =>
    set((state) => {
      const newSelections = { ...state.monitorSelections };
      const val = Math.max(0, count);
      
      // Total monitor count should not exceed 3
      const currentTotal = Object.entries(newSelections)
        .filter(([key]) => key !== id)
        .reduce((sum, [, c]) => sum + c, 0);
      
      const allowed = Math.min(val, 3 - currentTotal);
      
      if (allowed <= 0) {
        delete newSelections[id];
      } else {
        newSelections[id] = allowed;
      }
      
      return { monitorSelections: newSelections };
    }),
  toggleAccessory: (id) =>
    set((state) => ({
      selectedAccessories: state.selectedAccessories.includes(id)
        ? state.selectedAccessories.filter((a) => a !== id)
        : [...state.selectedAccessories, id],
    })),
  resetAll: () =>
    set({
      currentStep: "desk",
      selectedDesk: "genius_desk_1",
      selectedChair: "ergonomic_chair",
      monitorSelections: { genius_monitor_1: 1 },
      selectedAccessories: ["genius_kb_1", "genius_mouse_1"],
    }),

  // ── Derived ──
  getTotalPrice: () => {
    const state = get();
    let total = 0;
    if (state.selectedDesk) {
      const desk = getProductById(state.selectedDesk);
      if (desk) total += desk.price;
    }
    if (state.selectedChair) {
      const chair = getProductById(state.selectedChair);
      if (chair) total += chair.price;
    }
    
    // Monitors
    Object.entries(state.monitorSelections).forEach(([id, count]) => {
      const monitor = getProductById(id);
      if (monitor) total += monitor.price * count;
    });

    for (const accId of state.selectedAccessories) {
      const acc = getProductById(accId);
      if (acc) total += acc.price;
    }
    return total;
  },

  getSurfaceY: () => {
    const deskId = get().selectedDesk;
    if (deskId && DESK_CONFIGS[deskId]) {
      return DESK_CONFIGS[deskId].surfaceY;
    }
    return 1.05;
  },

  getSelectedItemIds: () => {
    const state = get();
    const ids: string[] = [];
    if (state.selectedDesk) ids.push(state.selectedDesk);
    if (state.selectedChair) ids.push(state.selectedChair);
    
    Object.entries(state.monitorSelections).forEach(([id, count]) => {
      for (let i = 0; i < count; i++) ids.push(id);
    });

    ids.push(...state.selectedAccessories);
    return ids;
  },

  getMonitorItems: () => {
    return Object.entries(get().monitorSelections).map(([id, count]) => ({
      id,
      count,
    }));
  },
}));
