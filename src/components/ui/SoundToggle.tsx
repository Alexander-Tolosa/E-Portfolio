"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";

interface SoundToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function SoundToggle({ className = "", size = "md" }: SoundToggleProps) {
  const { soundEnabled, toggleSound } = useSound();
  const isSm = size === "sm";

  return (
    <motion.button
      data-no-sound="true"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.90 }}
      onClick={() => toggleSound()}
      className={`relative ${
        isSm ? "w-8 h-8" : "w-10 h-10"
      } rounded-full glass border border-brand-border text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center touch-manipulation overflow-hidden shadow-xs group no-sound ${
        soundEnabled
          ? "hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          : "hover:border-slate-500/50"
      } ${className}`}
      aria-label={soundEnabled ? "Mute hover sound" : "Enable hover sound"}
      title={soundEnabled ? "Mute hover sound" : "Enable hover sound"}
    >
      {/* Soft glowing radial aura on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full ${
          soundEnabled
            ? "bg-radial from-cyan-500/20 via-cyan-500/5 to-transparent"
            : "bg-radial from-slate-500/20 via-slate-500/5 to-transparent"
        }`}
      />

      <AnimatePresence mode="wait" initial={false}>
        {soundEnabled ? (
          <motion.div
            key="sound-on"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-cyan-400 dark:text-cyan-300 flex items-center justify-center relative z-10"
          >
            <Volume2 size={isSm ? 15 : 19} className="stroke-[2.2]" />
          </motion.div>
        ) : (
          <motion.div
            key="sound-off"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-brand-text-muted flex items-center justify-center relative z-10"
          >
            <VolumeX size={isSm ? 15 : 19} className="stroke-[2.2]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

