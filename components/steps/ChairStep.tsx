"use client";

import Image from "next/image";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/utils/format";

const ChairStep = () => {
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const selectChair = useWorkspaceStore((s) => s.selectChair);

  const chairs = getProductsByCategory("chair");

  return (
    <div className="grid grid-cols-2 gap-3">
      {chairs.map((chair) => {
        const isSelected = selectedChair === chair.id;
        return (
          <button
            key={chair.id}
            onClick={() => selectChair(chair.id)}
            className={`product-card relative flex flex-col items-center text-center p-4 transition-all ${isSelected ? "selected border-monis-orange ring-1 ring-monis-orange/10" : ""
              }`}
          >
            {/* Check badge (Top-Right) */}
            {isSelected && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-monis-orange flex items-center justify-center shadow-sm z-10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Thumbnail */}
            <div className="relative w-full aspect-square rounded-2xl bg-monis-sand/40 mb-4 overflow-hidden shadow-inner">
              <div className="absolute inset-3">
                <Image
                  src={chair.thumbnail}
                  alt={chair.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Info Group */}
            <div className="flex flex-col gap-1.5 w-full">
              {/* Div 1: Title */}
              <h3
                className="font-bold text-monis-charcoal text-sm leading-tight line-clamp-2 min-h-[2.4rem] flex items-center justify-center"
                style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
              >
                {chair.name}
              </h3>

              {/* Div 2: Caption / Description */}
              <p
                className="text-[11px] text-monis-charcoal/40 leading-relaxed line-clamp-2 overflow-hidden min-h-[2.1rem]"
                style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
              >
                {chair.description}
              </p>

              {/* Div 3: Price */}
              <p className="font-bold text-monis-orange text-[13px] mt-1 bg-monis-orange/5 py-1.5 rounded-lg border border-monis-orange/10">
                +{formatPrice(chair.price)} <span className="text-[10px] opacity-60 font-medium">/ week</span>
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChairStep;
