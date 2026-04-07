"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/utils/format";
import { useShallow } from "zustand/react/shallow";

const SummaryStep = () => {
  const {
    selectedDesk,
    selectedChair,
    monitorSelections,
    selectedTech,
    selectedKeyboard,
    selectedMouse,
    selectedAccessories,
    getTotalPrice,
  } = useWorkspaceStore(
    useShallow((s) => ({
      selectedDesk: s.selectedDesk,
      selectedChair: s.selectedChair,
      monitorSelections: s.monitorSelections,
      selectedTech: s.selectedTech,
      selectedKeyboard: s.selectedKeyboard,
      selectedMouse: s.selectedMouse,
      selectedAccessories: s.selectedAccessories,
      getTotalPrice: s.getTotalPrice,
    }))
  );

  const desk = selectedDesk ? getProductById(selectedDesk) : null;
  const chair = selectedChair ? getProductById(selectedChair) : null;

  const total = getTotalPrice();

  // Build line items
  const lineItems: { name: string; detail: string; price: number }[] = [];

  if (desk) {
    lineItems.push({ name: desk.name, detail: "Desk", price: desk.price });
  }
  if (chair) {
    lineItems.push({ name: chair.name, detail: "Chair", price: chair.price });
  }

  // Monitors
  Object.entries(monitorSelections).forEach(([id, count]) => {
    const monitor = getProductById(id);
    if (monitor && count > 0) {
      lineItems.push({
        name: `${monitor.name} ×${count}`,
        detail: "Monitor",
        price: monitor.price * count,
      });
    }
  });

  if (selectedTech) {
    const tech = getProductById(selectedTech);
    if (tech) lineItems.push({ name: tech.name, detail: "Computer", price: tech.price });
  }
  if (selectedKeyboard) {
    const kb = getProductById(selectedKeyboard);
    if (kb) lineItems.push({ name: kb.name, detail: "Keyboard", price: kb.price });
  }
  if (selectedMouse) {
    const mouse = getProductById(selectedMouse);
    if (mouse) lineItems.push({ name: mouse.name, detail: "Mouse", price: mouse.price });
  }

  for (const accId of selectedAccessories) {
    const acc = getProductById(accId);
    if (acc) {
      lineItems.push({ name: acc.name, detail: acc.category, price: acc.price });
    }
  }

  return (
    <div>
      {/* Line items */}
      <div className="bg-white border-2 border-monis-sand rounded-2xl overflow-hidden">
        {lineItems.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 ${
              i < lineItems.length - 1 ? "border-b border-monis-sand/60" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-monis-sand/50 flex items-center justify-center text-xs font-bold text-monis-charcoal/30 uppercase">
                {item.detail.slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-monis-charcoal">
                  {item.name}
                </p>
                <p className="text-[11px] text-monis-charcoal/40 capitalize">
                  {item.detail}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-monis-charcoal">
              {item.price === 0 ? (
                <span className="text-monis-green">Free</span>
              ) : (
                `${formatPrice(item.price)} / week`
              )}
            </p>
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center justify-between px-4 py-4 bg-monis-sand/30 border-t-2 border-monis-sand">
          <p className="text-sm font-bold text-monis-charcoal uppercase tracking-wider">
            Total per week
          </p>
          <p className="font-display text-2xl text-monis-orange">
            {formatPrice(total)}
          </p>
        </div>
      </div>

      {/* Delivery info */}
      <div className="mt-4 p-4 bg-white border-2 border-monis-sand rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-monis-orange/10 flex items-center justify-center flex-shrink-0 text-lg">
            ⚡
          </div>
          <div>
            <p className="text-sm font-semibold text-monis-charcoal">
              Next-day delivery across Bali
            </p>
            <p className="text-xs text-monis-charcoal/45 mt-0.5 leading-relaxed">
              Professional setup included. We deliver, install, and pick up when
              you&apos;re done. Flexible weekly or monthly rentals.
            </p>
          </div>
        </div>
      </div>

      {/* Save / Share */}
      <div className="mt-4 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-monis-sand text-sm font-medium text-monis-charcoal/60 hover:border-monis-wood hover:text-monis-charcoal transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share Setup
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-monis-sand text-sm font-medium text-monis-charcoal/60 hover:border-monis-wood hover:text-monis-charcoal transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save Blueprint
        </button>
      </div>

      {/* Monthly discount callout */}
      <div className="mt-4 p-4 bg-gradient-to-r from-monis-orange/5 to-monis-orange/10 border border-monis-orange/15 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">💰</span>
          <p className="text-sm font-semibold text-monis-orange">
            Save up to 20%
          </p>
        </div>
        <p className="text-xs text-monis-charcoal/50 leading-relaxed">
          Dynamic pricing automatically applies discounts for longer rental
          periods. Switch to monthly and save.
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
