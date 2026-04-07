import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/utils/format";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { useState } from "react";

const MonitorStep = () => {
  const [showAll, setShowAll] = useState(false);
  const { monitorSelections, setMonitorCount } = useWorkspaceStore(
    useShallow((s) => ({
      monitorSelections: s.monitorSelections,
      setMonitorCount: s.setMonitorCount,
    }))
  );

  const monitors = getProductsByCategory("monitor");
  const totalMonitors = Object.values(monitorSelections).reduce((a, b) => a + b, 0);

  const visibleMonitors = showAll ? monitors : monitors.slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-monis-charcoal/40 uppercase tracking-widest">
          Choose Your Monitors
        </p>
        <span className="text-[10px] font-bold text-monis-orange uppercase bg-monis-orange/10 px-2 py-1 rounded-full">
          {totalMonitors} / 3 Max
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleMonitors.map((monitor) => {
          const count = monitorSelections[monitor.id] || 0;
          return (
            <div
              key={monitor.id}
              className={`product-card flex flex-col gap-3 p-3 transition-all ${
                count > 0 ? "selected border-monis-orange" : "border-monis-sand"
              }`}
            >
              {/* Image (16/9) */}
              <div className="w-full aspect-video relative bg-monis-sand/40 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={monitor.thumbnail}
                  alt={monitor.name}
                  fill
                  className="object-cover p-1"
                />
              </div>

              {/* Info Group */}
              <div className="flex flex-col gap-1 min-w-0 px-0.5">
                {/* Div 1: Title */}
                <h3 
                  className="font-bold text-monis-charcoal text-[13px] leading-tight line-clamp-2 min-h-[2rem]"
                  style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
                >
                  {monitor.name}
                </h3>
                
                {/* Div 2: Caption (Monitor details) */}
                <p 
                  className="text-[10px] text-monis-charcoal/40 line-clamp-2 overflow-hidden min-h-[1.9rem] leading-tight"
                  style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
                >
                  {monitor.description}
                </p>

                {/* Div 3: Price */}
                <p className="font-bold text-monis-orange text-xs mt-0.5">
                  +{formatPrice(monitor.price)} <span className="text-[10px] opacity-60 font-medium">/ week</span>
                </p>
              </div>

              {/* Stepper (Full width) */}
              <div className="flex items-center w-full">
                <button
                  onClick={() => setMonitorCount(monitor.id, count - 1)}
                  disabled={count <= 0}
                  className="flex-1 h-9 rounded-l-lg bg-monis-sand hover:bg-[#e8dec4] disabled:opacity-20 flex items-center justify-center transition-colors font-bold text-monis-charcoal"
                >
                  −
                </button>
                <div className="flex-1 h-9 bg-white border-y-2 border-monis-sand flex items-center justify-center font-bold text-sm text-monis-charcoal">
                  {count}
                </div>
                <button
                  onClick={() => setMonitorCount(monitor.id, count + 1)}
                  disabled={totalMonitors >= 3}
                  className="flex-1 h-9 rounded-r-lg bg-monis-orange hover:bg-[#d15425] disabled:opacity-20 flex items-center justify-center transition-colors font-bold text-white shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toggle Button */}
      {monitors.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3.5 mt-2 rounded-xl text-xs font-bold text-monis-orange bg-monis-orange/10 hover:bg-monis-orange/20 transition-all flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              Show only recommended options
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </>
          ) : (
            <>
              Show all options
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </>
          )}
        </button>
      )}

      {/* Tip */}
      <div className="mt-4 p-4 bg-white border-2 border-monis-sand rounded-2xl">
        <p className="text-xs text-monis-charcoal/45 leading-relaxed">
          Boost your productivity with up to 3 monitors. Mix and match different
          sizes to fit your unique workflow.
        </p>
      </div>
    </div>
  );
};

export default MonitorStep;
