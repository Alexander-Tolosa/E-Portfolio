"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Styles based on variants
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-indigo/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-purple text-white hover:opacity-95 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_25px_-2px_rgba(99,102,241,0.6)]",
    secondary:
      "glass text-foreground hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20",
    outline:
      "border-2 border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 hover:border-accent-blue",
    ghost:
      "text-brand-text-muted hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
