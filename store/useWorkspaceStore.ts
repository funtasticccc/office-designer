import { create } from "zustand";
import { getProductById, DESK_CONFIGS } from "@/data/products";

export type WizardStep = "desk" | "chair" | "monitors" | "tech" | "keyboards" | "mouses" | "accessories" | "summary";
export type CameraPreset = "overview" | "side" | "front";

const STEPS: WizardStep[] = ["desk", "chair", "monitors", "tech", "keyboards", "mouses", "accessories", "summary"];

interface WorkspaceState {
  // ── Room Dimensions ──
  roomDims: { w: number; l: number; h: number };
  setRoomDims: (dims: Partial<{ w: number; l: number; h: number }>) => void;

  // ── Camera ──
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;

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
  selectedTech: string | null;
  selectedKeyboard: string | null;
  selectedMouse: string | null;
  selectedAccessories: string[];

  // ── Actions ──
  selectDesk: (id: string) => void;
  selectChair: (id: string) => void;
  setMonitorCount: (id: string, count: number) => void;
  selectTech: (id: string | null) => void;
  selectKeyboard: (id: string | null) => void;
  selectMouse: (id: string | null) => void;
  toggleAccessory: (id: string) => void;
  resetAll: () => void;

  // ── Derived ──
  getTotalPrice: () => number;
  getSurfaceY: () => number;
  getSelectedItemIds: () => string[];
  getMonitorItems: () => { id: string; count: number }[];
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  // ── Room Dimensions ──
  roomDims: { w: 4, l: 4, h: 2.5 },
  setRoomDims: (dims) => set((state) => ({ roomDims: { ...state.roomDims, ...dims } })),

  // ── Camera ──
  cameraPreset: "overview",
  setCameraPreset: (preset) => set({ cameraPreset: preset }),

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
  selectedDesk: "desk_2",
  selectedChair: "ergonomic_chair",
  monitorSelections: {
    monitor_2: 1,
  },
  selectedTech: "macbook",
  selectedKeyboard: "kb_1",
  selectedMouse: "mouse_1",
  selectedAccessories: ["bonsai"],

  // ── Actions ──
  selectDesk: (id) => set({ selectedDesk: id }),
  selectChair: (id) => set({ selectedChair: id }),
  setMonitorCount: (id, count) =>
    set((state) => {
      const newSelections = { ...state.monitorSelections };
      const val = Math.max(0, count);

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
  selectTech: (id) => set({ selectedTech: id }),
  selectKeyboard: (id) => set({ selectedKeyboard: id }),
  selectMouse: (id) => set({ selectedMouse: id }),
  toggleAccessory: (id) =>
    set((state) => ({
      selectedAccessories: state.selectedAccessories.includes(id)
        ? state.selectedAccessories.filter((a) => a !== id)
        : [...state.selectedAccessories, id],
    })),
  resetAll: () =>
    set({
      currentStep: "desk",
      selectedDesk: "desk_2",
      selectedChair: "ergonomic_chair",
      monitorSelections: { monitor_2: 1 },
      selectedTech: "macbook",
      selectedKeyboard: "kb_1",
      selectedMouse: "mouse_1",
      selectedAccessories: ["bonsai"],
      roomDims: { w: 4, l: 4, h: 2.5 },
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

    Object.entries(state.monitorSelections).forEach(([id, count]) => {
      const monitor = getProductById(id);
      if (monitor) total += monitor.price * count;
    });

    if (state.selectedTech) {
      const tech = getProductById(state.selectedTech);
      if (tech) total += tech.price;
    }
    if (state.selectedKeyboard) {
      const kb = getProductById(state.selectedKeyboard);
      if (kb) total += kb.price;
    }
    if (state.selectedMouse) {
      const mouse = getProductById(state.selectedMouse);
      if (mouse) total += mouse.price;
    }

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

    if (state.selectedTech) ids.push(state.selectedTech);
    if (state.selectedKeyboard) ids.push(state.selectedKeyboard);
    if (state.selectedMouse) ids.push(state.selectedMouse);

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
