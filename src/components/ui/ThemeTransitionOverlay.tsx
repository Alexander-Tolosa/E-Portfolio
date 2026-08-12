"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeTransitionOverlayProps {
  isTransitioning: boolean;
  transitionMode: "to-light" | "to-dark" | null;
}

export function ThemeTransitionOverlay({
  isTransitioning,
  transitionMode,
}: ThemeTransitionOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {isTransitioning && transitionMode && (
        <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
          {/* Single Pass Sweeping Diagonal Curtain */}
          <motion.div
            initial={{ x: "-130%" }}
            animate={{ x: "130%" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier for a single fluid sweep
            }}
            className={`absolute -top-[50vh] -bottom-[50vh] w-[180vw] -left-[40vw] -skew-x-[25deg] shadow-2xl ${
              transitionMode === "to-light"
                ? "bg-slate-100 border-r-4 border-white/80 shadow-[0_0_100px_rgba(255,255,255,0.9)]"
                : "bg-[#030712] border-r-4 border-slate-800/80 shadow-[0_0_100px_rgba(0,0,0,0.95)]"
            }`}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
