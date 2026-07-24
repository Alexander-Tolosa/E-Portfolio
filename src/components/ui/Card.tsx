"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function Card({ children, className = "", animate = true, delay = 0 }: CardProps) {
  const containerClasses = `glass glass-hover rounded-2xl p-6 overflow-hidden relative group ${className}`;

  if (!animate) {
    return (
      <div className={containerClasses}>
        {/* Subtle glowing mesh in background */}
        <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={containerClasses}
    >
      {/* Subtle glowing mesh in background */}
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
