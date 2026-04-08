"use client";

import { useState } from "react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const RoomSettingsPanel = () => {
  const [open, setOpen] = useState(false);
  const roomDims = useWorkspaceStore((s) => s.roomDims);
  const setRoomDims = useWorkspaceStore((s) => s.setRoomDims);

  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Room dimensions"
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-monis-charcoal hover:text-monis-orange transition-all hover:scale-110 active:scale-95"
      >
        {/* Ruler icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z" />
          <path d="m14.5 12.5 2-2" />
          <path d="m11.5 9.5 2-2" />
          <path d="m8.5 6.5 2-2" />
          <path d="m17.5 15.5 2-2" />
        </svg>
      </button>

      {/* Sliders panel */}
      {open && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-monis-sand p-4 w-52">
          <p className="text-xs font-semibold text-monis-charcoal mb-3 uppercase tracking-wide">Room Size</p>

          {/* Width */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs text-monis-charcoal/70">Width</label>
              <span className="text-xs font-medium text-monis-charcoal">{roomDims.w.toFixed(1)}m</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={roomDims.w}
              onChange={(e) => setRoomDims({ w: parseFloat(e.target.value) })}
              className="w-full accent-monis-orange cursor-pointer"
            />
          </div>

          {/* Length */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="text-xs text-monis-charcoal/70">Length</label>
              <span className="text-xs font-medium text-monis-charcoal">{roomDims.l.toFixed(1)}m</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={roomDims.l}
              onChange={(e) => setRoomDims({ l: parseFloat(e.target.value) })}
              className="w-full accent-monis-orange cursor-pointer"
            />
          </div>

          {/* Height */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-monis-charcoal/70">Height</label>
              <span className="text-xs font-medium text-monis-charcoal">{roomDims.h.toFixed(1)}m</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="5"
              step="0.1"
              value={roomDims.h}
              onChange={(e) => setRoomDims({ h: parseFloat(e.target.value) })}
              className="w-full accent-monis-orange cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSettingsPanel;
