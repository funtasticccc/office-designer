"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { formatPrice } from "@/utils/format";
import { useShallow } from "zustand/react/shallow";

const PriceBar = () => {
  const {
    getTotalPrice,
    monitorSelections,
    selectedAccessories,
    selectedTech,
    selectedKeyboard,
    selectedMouse
  } = useWorkspaceStore(useShallow((s) => ({
    getTotalPrice: s.getTotalPrice,
    monitorSelections: s.monitorSelections,
    selectedAccessories: s.selectedAccessories,
    selectedTech: s.selectedTech,
    selectedKeyboard: s.selectedKeyboard,
    selectedMouse: s.selectedMouse,
  })));

  const currentStep = useWorkspaceStore((s) => s.currentStep);
  const nextStep = useWorkspaceStore((s) => s.nextStep);
  const canGoNext = useWorkspaceStore((s) => s.canGoNext);

  const total = getTotalPrice();

  const monitorTotalCount = Object.values(monitorSelections).reduce((a, b) => a + b, 0);
  const itemCount =
    2 + monitorTotalCount + (selectedTech ? 1 : 0) + (selectedKeyboard ? 1 : 0) + (selectedMouse ? 1 : 0) + selectedAccessories.length; // desk + chair + monitors + tech + keyboard + mouse + accessories

  const isSummary = currentStep === "summary";

  return (
    <div className="cta-bar">
      <div className="w-full flex flex-wrap items-center justify-between gap-y-4 gap-x-4 px-4 lg:px-8">
        {/* Left: Price info */}
        {!isSummary && (
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-monis-charcoal/40 font-bold">
                  Total / week
                </p>
                <span className="bg-monis-orange/10 text-monis-orange text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-tighter">
                  {itemCount} items
                </span>
              </div>
              <p className="font-display text-xl md:text-2xl text-monis-charcoal leading-none">
                {formatPrice(total)}
              </p>
            </div>
          </div>
        )}

        {/* Right: CTA */}
        <div className={`flex items-center gap-3 ${isSummary ? 'ml-auto w-full sm:w-auto' : ''}`}>
          {/* Back Button (Inside PriceBar) */}
          {currentStep !== "desk" && (
            <button
              onClick={() => useWorkspaceStore.getState().prevStep()}
              className="flex items-center gap-1.5 text-monis-charcoal/40 md:hover:text-monis-orange font-bold text-sm transition-all active:scale-95 px-2"
            >
              <span>Back</span>
            </button>
          )}

          {isSummary ? (
            <span
              className="group flex-1 sm:flex-none flex items-center justify-center gap-2 bg-monis-orange text-white font-bold text-sm px-6 py-3.5 md:px-8 md:py-4 rounded-full shadow-lg shadow-monis-orange/20 cursor-default"
            >
              <span>Rent Your Setup</span>
            </span>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canGoNext()}
              className="group flex items-center gap-2 bg-monis-orange hover:bg-[#d15425] disabled:bg-monis-charcoal/10 disabled:text-monis-charcoal/30 disabled:cursor-not-allowed text-white font-bold text-xs md:text-sm px-6 py-3 md:px-8 md:py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-monis-orange/20 active:scale-95"
            >
              <span>Next</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PriceBar;
