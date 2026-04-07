"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import WizardPanel from "@/components/WizardPanel";
import PriceBar from "@/components/PriceBar";
import LoadingScene from "@/components/LoadingScene";

// Dynamic import for Three.js (no SSR)
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <LoadingScene />,
});

const HomePage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `monis-workspace-${new Date().getTime()}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleFullscreen = () => {
    const container = document.querySelector('.canvas-container');
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-monis-cream">
      <Navbar />

      {/* Main content */}
      <main className="pt-16 pb-24">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-10rem)]">
          {/* ── 3D Scene (left on desktop, top on mobile) ── */}
          <div className="w-full lg:w-[55%] xl:w-[60%] lg:sticky lg:top-16 lg:h-[calc(100vh-10.5rem)] pl-4 pr-[11px] lg:pl-8 lg:pr-4">
            <div className="canvas-container relative group h-[500px] sm:h-[600px] lg:h-full overflow-hidden rounded-3xl border border-monis-sand bg-white/50 backdrop-blur-sm shadow-xl shadow-monis-charcoal/5 interaction-container">
              {/* Toolbar (Top Right) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleDownload}
                  title="Download Preview"
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-monis-charcoal hover:text-monis-orange transition-all hover:scale-110 active:scale-95"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
                <button
                  onClick={handleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"}
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-monis-charcoal hover:text-monis-orange transition-all hover:scale-110 active:scale-95"
                >
                  {isFullscreen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14h6m0 0v6m0-6L3 21M20 10h-6m0 0V4m0 6l7-7" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="live-badge">
                <span>Live Preview</span>
              </div>
              <Suspense fallback={<LoadingScene />}>
                <Scene3D />
              </Suspense>
            </div>
          </div>

          {/* ── Wizard Panel (right on desktop, below on mobile) ── */}
          <div className="w-full lg:w-[45%] xl:w-[40%] pl-4 pr-[11px] lg:pl-4 lg:pr-8 overflow-y-auto auto-hide-scrollbar lg:h-[calc(100vh-10.5rem)] lg:sticky lg:top-16">
            <WizardPanel />
          </div>
        </div>
      </main>

      {/* ── Sticky bottom price bar ── */}
      <PriceBar />
    </div>
  );
};

export default HomePage;
