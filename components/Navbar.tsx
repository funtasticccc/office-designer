"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const Navbar = () => {
  const resetAll = useWorkspaceStore((s) => s.resetAll);
  const roomDims = useWorkspaceStore((s) => s.roomDims);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between pl-4 pr-[19px] lg:px-8 bg-monis-cream/90 backdrop-blur-md">
      {/* Left: Logo + Room Dimensions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={resetAll}>
          {/* rent.it logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[118px] h-[36px]"
            viewBox="0 -20 880 200"
          >
            <text
              x={-8}
              y={175}
              fontFamily="'Arial Black', Arial, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#e65d2e"
              letterSpacing="-12"
            >
              rent
            </text>
            <circle cx={585} cy={148} r={34} fill="#e65d2e" />
            <rect x={655} y={65} width={72} height={110} fill="#e65d2e" />
            <circle cx={691} cy={20} r={34} fill="#e65d2e" />
            <text
              x={730}
              y={175}
              fontFamily="'Arial Black', Arial, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#e65d2e"
              letterSpacing="-12"
            >
              t
            </text>
          </svg>        
          {/* <span className="text-[28px] font-extrabold text-monis-orange tracking-tight leading-none">rentIT</span> */}
        </div>

        {/* Live room dimensions badge */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 border-monis-charcoal/15 shadow-sm text-xs font-bold text-monis-charcoal tabular-nums leading-none">
          <span className="translate-y-[1px]">{roomDims.w}m</span>
          <span className="text-monis-charcoal/40 font-normal translate-y-[1px]">×</span>
          <span className="translate-y-[1px]">{roomDims.l}m</span>
          <span className="text-monis-charcoal/40 font-normal translate-y-[1px]">×</span>
          <span className="translate-y-[1px]">{roomDims.h}m</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end">
        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-monis-charcoal/60 px-6 lg:px-10">
          <span className="text-monis-orange border-b-2 border-monis-orange pb-0.5 cursor-default">
            Designer
          </span>
          <span className="cursor-default">
            Products
          </span>
          <span className="cursor-default">
            About
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-5 bg-monis-charcoal/30" />

        {/* Actions */}
        <div className="flex items-center gap-3 pl-6 lg:pl-10">
          <button
            onClick={resetAll}
            className="text-sm font-medium text-monis-charcoal/50 hover:text-monis-charcoal transition-colors"
          >
            Reset
          </button>
          <span
            className="hidden sm:inline-flex items-center gap-2 bg-monis-orange text-white text-sm font-semibold px-4 py-2 rounded-full cursor-default"
          >
            Sign In
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
