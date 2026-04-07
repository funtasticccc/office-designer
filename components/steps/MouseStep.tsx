"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/utils/format";

const MouseStep = () => {
  const selectedMouse = useWorkspaceStore((s) => s.selectedMouse);
  const selectMouse = useWorkspaceStore((s) => s.selectMouse);

  const mice = getProductsByCategory("mouse");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-monis-charcoal/40 uppercase tracking-widest">
          Choose Your Mouse
        </p>
        <span className="text-[10px] font-bold text-monis-charcoal/30 uppercase bg-monis-sand/60 px-2 py-1 rounded-full">
          Optional
        </span>
      </div>

      {mice.map((mouse) => {
        const isSelected = selectedMouse === mouse.id;
        return (
          <button
            key={mouse.id}
            onClick={() => selectMouse(isSelected ? null : mouse.id)}
            className={`product-card relative flex items-center gap-4 p-4 text-left transition-all ${
              isSelected ? "selected border-monis-orange ring-1 ring-monis-orange/20" : ""
            }`}
          >
            {/* Check badge */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-monis-orange flex items-center justify-center shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-2xl bg-monis-sand/60 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
              <img
                src={mouse.thumbnail}
                alt={mouse.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-1 pr-6">
              <h3
                className="font-bold text-monis-charcoal text-sm leading-tight line-clamp-2"
                style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
              >
                {mouse.name}
              </h3>
              <p
                className="text-[11px] text-monis-charcoal/40 leading-relaxed line-clamp-2 overflow-hidden min-h-[2.1rem]"
                style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
              >
                {mouse.description}
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[9px] text-monis-charcoal/30 uppercase font-bold tracking-widest">from</span>
                <p className="font-bold text-monis-orange text-sm">
                  {formatPrice(mouse.price)} <span className="text-[10px] opacity-60 font-medium">/ week</span>
                </p>
              </div>
            </div>
          </button>
        );
      })}

      {/* Tip */}
      <div className="mt-2 p-3 bg-white border-2 border-monis-sand rounded-2xl">
        <p className="text-xs text-monis-charcoal/45 leading-relaxed">
          Precision at your fingertips. Click a selected mouse again to deselect.
        </p>
      </div>
    </div>
  );
};

export default MouseStep;
