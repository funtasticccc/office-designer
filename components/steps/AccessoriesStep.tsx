"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ACCESSORY_CATEGORIES, getProductsByCategory, Product } from "@/data/products";
import { formatPrice } from "@/utils/format";

const ACCESSORY_ICONS: Record<string, string> = {
  table_lamp: "💡",
  table_mic: "🎙️",
  batman: "🦇",
  neon_light: "🌈",
  classic_lamp: "🏢",
  led_light: "✨",
  bonsai: "🎍",
  fern: "🌿",
  succulent: "🌵",
  vending: "🍬",
  radar: "📡",
  gamer_art: "🎮",
  mini_desk: "🪑",
  mini_fridge: "🥤",
  desk_plant: "🌿",
  webcam: "📷",
  coffee_machine: "☕",
};

const CATEGORY_LABELS: Record<string, string> = {
  lamp: "Lighting",
  mic: "Audio",
  plant: "Flora",
  webcam: "Video",
  coffee: "Refreshments",
  toy: "Decor",
};

const AccessoriesStep = () => {
  const selectedAccessories = useWorkspaceStore((s) => s.selectedAccessories);
  const toggleAccessory = useWorkspaceStore((s) => s.toggleAccessory);

  return (
    <div className="space-y-8">
      {ACCESSORY_CATEGORIES.map((cat) => {
        const items = getProductsByCategory(cat);
        if (items.length === 0) return null;

        return (
          <div key={cat} className="space-y-3">
            <h3 className="text-xs font-bold text-monis-charcoal/40 uppercase tracking-widest pl-1">
              {CATEGORY_LABELS[cat] || cat}
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {items.map((acc) => {
                const isSelected = selectedAccessories.includes(acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`accessory-chip ${isSelected ? "selected" : ""}`}
                  >
                    {/* Icon */}
                    <span className="text-2xl">
                      {ACCESSORY_ICONS[acc.id] || "📦"}
                    </span>

                    {/* Name */}
                    <p
                      className="text-[10.5px] font-semibold text-monis-charcoal leading-[1.2] text-center line-clamp-2 overflow-hidden h-[1.6rem] mb-1.5 px-0.5"
                      style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
                    >
                      {acc.name}
                    </p>

                    {/* Price */}
                    <div
                      className={`text-[10px] font-semibold flex flex-col items-center ${isSelected ? "text-monis-orange" : "text-monis-charcoal/35"
                        }`}
                    >
                      {acc.price === 0 ? (
                        <span>Free</span>
                      ) : (
                        <>
                          <span>+{formatPrice(acc.price)}</span>
                          <span className="text-[9px] opacity-70">/ week</span>
                        </>
                      )}
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-monis-orange flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Tip */}
      <div className="mt-6 p-4 bg-monis-sand/30 border border-monis-sand rounded-xl">
        <p className="text-xs text-monis-charcoal/60 font-medium flex items-center gap-2.5 leading-relaxed">
          <span className="text-sm">✨</span>
          Add the finishing touches — lighting, flora, and personality to make the workspace truly yours.
        </p>
      </div>
    </div>
  );
};

export default AccessoriesStep;
