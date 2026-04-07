"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ACCESSORY_CATEGORIES, getProductsByCategory, Product } from "@/data/products";
import { formatPrice } from "@/utils/format";

const ACCESSORY_ICONS: Record<string, string> = {
  mx_keyboard: "⌨️",
  mx_mouse: "🖱️",
  desk_lamp: "💡",
  desk_plant: "🌿",
  webcam: "📷",
  coffee_machine: "☕",
};

const AccessoriesStep = () => {
  const selectedAccessories = useWorkspaceStore((s) => s.selectedAccessories);
  const toggleAccessory = useWorkspaceStore((s) => s.toggleAccessory);

  // Gather all accessory products
  const accessories: Product[] = [];
  for (const cat of ACCESSORY_CATEGORIES) {
    accessories.push(...getProductsByCategory(cat));
  }   

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {accessories.map((acc) => {
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
                style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
              >
                {acc.name}
              </p>

              {/* Price */}
              <div
                className={`text-[10px] font-semibold flex flex-col items-center ${
                  isSelected ? "text-monis-orange" : "text-monis-charcoal/35"
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

      {/* Tip */}
      <div className="mt-6 p-3 bg-monis-green/5 border border-monis-green/15 rounded-xl">
        <p className="text-xs text-monis-green font-medium flex items-center gap-2">
          <span>🌱</span>
          The tropical desk plant is free with every workspace rental!
        </p>
      </div>
    </div>
  );
};

export default AccessoriesStep;
