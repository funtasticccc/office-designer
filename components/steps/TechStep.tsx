"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/utils/format";
import Image from "next/image";

const TechStep = () => {
  const selectedTech = useWorkspaceStore((s) => s.selectedTech);
  const selectTech = useWorkspaceStore((s) => s.selectTech);

  const techProducts = getProductsByCategory("tech");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-monis-charcoal/40 uppercase tracking-widest">
          Choose Your Computer
        </p>
        <span className="text-[10px] font-bold text-monis-charcoal/30 uppercase bg-monis-sand/60 px-2 py-1 rounded-full">
          Optional
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {techProducts.map((product) => {
          const isSelected = selectedTech === product.id;
          return (
            <button
              key={product.id}
              onClick={() => selectTech(isSelected ? null : product.id)}
              className={`product-card relative flex flex-col items-center text-center p-4 transition-all ${
                isSelected ? "selected border-monis-orange ring-1 ring-monis-orange/10" : ""
              }`}
            >
              {/* Check badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-monis-orange flex items-center justify-center shadow-sm z-10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              {/* Thumbnail */}
              <div className="w-full aspect-square rounded-2xl bg-monis-sand/40 flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain p-3"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 w-full">
                <h3
                  className="font-bold text-monis-charcoal text-[12px] leading-tight line-clamp-2 min-h-[2.2rem] flex items-center justify-center"
                  style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[10px] text-monis-charcoal/40 leading-relaxed line-clamp-2 overflow-hidden min-h-[1.9rem]"
                  style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
                >
                  {product.description}
                </p>
                <p className="font-bold text-monis-orange text-[12px] mt-1 bg-monis-orange/5 py-1.5 rounded-lg border border-monis-orange/10">
                  +{formatPrice(product.price)} <span className="text-[10px] opacity-60 font-medium">/ week</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <div className="mt-2 p-3 bg-white border-2 border-monis-sand rounded-2xl">
        <p className="text-xs text-monis-charcoal/45 leading-relaxed">
          Pick a computer to power your workspace. All rentals include pre-setup and tech support.
        </p>
      </div>
    </div>
  );
};

export default TechStep;
