"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className = "" }: SoundToggleProps) {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <motion.button
      data-no-sound="true"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => toggleSound()}
      className={`relative p-2.5 rounded-full glass border border-brand-border text-foreground hover:text-white dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center touch-manipulation no-sound ${className}`}
      aria-label={soundEnabled ? "Mute hover sound" : "Enable hover sound"}
      title={soundEnabled ? "Mute hover sound" : "Enable hover sound"}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {soundEnabled ? (
          <motion.div
            key="sound-on"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-cyan-400 dark:text-cyan-300 flex items-center justify-center"
          >
            <Volume2 size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="sound-off"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-brand-text-muted flex items-center justify-center"
          >
            <VolumeX size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
