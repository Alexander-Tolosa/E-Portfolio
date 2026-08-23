"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const isSm = size === "sm";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.90 }}
      onClick={(e) => toggleTheme(e)}
      className={`relative ${
        isSm ? "w-8 h-8" : "w-10 h-10"
      } rounded-full glass border border-brand-border text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center touch-manipulation overflow-hidden shadow-xs group ${
        isDark
          ? "hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
          : "hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Soft glowing radial aura on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full ${
          isDark
            ? "bg-radial from-amber-500/20 via-amber-500/5 to-transparent"
            : "bg-radial from-indigo-500/20 via-indigo-500/5 to-transparent"
        }`}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-amber-400 flex items-center justify-center relative z-10"
          >
            <Sun size={isSm ? 15 : 19} className="stroke-[2.2]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-indigo-600 dark:text-indigo-400 flex items-center justify-center relative z-10"
          >
            <Moon size={isSm ? 15 : 19} className="stroke-[2.2]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

