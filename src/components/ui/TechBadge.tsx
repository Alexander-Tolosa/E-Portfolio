"use client";

import React from "react";

interface TechBadgeProps {
  name: string;
  className?: string;
  showIcon?: boolean;
}

export function TechBadge({ name, className = "", showIcon = true }: TechBadgeProps) {
  const getIcon = () => {
    const key = name.toLowerCase();

    if (key.includes("react")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#61DAFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    }

    if (key.includes("next")) {
      return (
        <svg className="w-3.5 h-3.5 text-foreground shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.6 17.5l-6.2-8.5v8.5H10V6.5h1.9l6.1 8.4V6.5h1.6v11h-2z"/>
        </svg>
      );
    }

    if (key.includes("typescript") || key === "ts") {
      return (
        <svg className="w-3.5 h-3.5 text-[#3178C6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M11.5 16.5h-2v-8h-2.5V7h7v1.5H11.5v8zM14.5 16.5v-1.5c.6.5 1.4.8 2.2.8 1.1 0 1.7-.5 1.7-1.2 0-.8-.6-1.1-1.8-1.5-1.7-.5-2.6-1.2-2.6-2.6 0-1.7 1.4-2.7 3.4-2.7 1 0 1.9.3 2.6.7l-.6 1.4c-.6-.4-1.3-.6-2-.6-1.1 0-1.7.5-1.7 1.1 0 .7.6 1.1 1.9 1.5 1.7.5 2.5 1.3 2.5 2.6 0 1.7-1.4 2.8-3.6 2.8-1.1 0-2.1-.3-2.9-.8z" fill="#FFF"/>
        </svg>
      );
    }

    if (key.includes("tailwind")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    }

    if (key.includes("laravel")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#FF2D20] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 3L12 6.8L18.5 3L22 5v14l-3.5 2L12 17.2L5.5 21L2 19V5l3.5-2z"/>
        </svg>
      );
    }

    if (key.includes("wordpress")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#21759B] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.158 0C5.457 0 0 5.457 0 12.158c0 6.701 5.457 12.158 12.158 12.158 6.701 0 12.158-5.457 12.158-12.158C24.316 5.457 18.859 0 12.158 0zM1.401 12.158c0-2.3.731-4.432 1.975-6.175l5.228 14.331C4.544 18.799 1.401 15.845 1.401 12.158zm10.757 10.757c-1.396 0-2.723-.27-3.935-.765l4.31-12.511 4.414 12.091c-.059.004-.118.009-.178.009-1.523 0-2.883-.435-4.611-1.176z"/>
        </svg>
      );
    }

    if (key.includes("postgres")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#336791] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      );
    }

    if (key.includes("supabase")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.35 24v-8.75h7.25L10.65 0v8.75H3.4L13.35 24z"/>
        </svg>
      );
    }

    if (key.includes("python")) {
      return (
        <svg className="w-3.5 h-3.5 text-[#3776AB] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.89 0C5.55 0 5.95 2.76 5.95 2.76v2.86h6.05v.86H3.6S0 6.09 0 12.44s3.15 6.06 3.15 6.06h1.88v-2.65s-.1-3.15 3.14-3.15h5.36s3.04.05 3.04-3.04V3.6S17.15 0 11.89 0z"/>
        </svg>
      );
    }

    return (
      <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
    );
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-brand-border bg-brand-card/80 hover:bg-brand-border/30 transition-all text-xs font-mono font-medium text-foreground align-baseline mx-1 cursor-text select-text shadow-xs ${className}`}>
      {showIcon && getIcon()}
      <span>{name}</span>
    </span>
  );
}
