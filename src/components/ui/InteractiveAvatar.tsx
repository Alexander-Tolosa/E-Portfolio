"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveAvatarProps {
  animeSrc?: string;
  formalSrc?: string;
  alt?: string;
  className?: string;
}

export function InteractiveAvatar({
  animeSrc = "/assets/images/anime_avatar.png",
  formalSrc = "/assets/images/formal_avatar.png",
  alt = "Alexander Tolosa Profile",
  className = "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
}: InteractiveAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-full overflow-hidden border-2 border-brand-border/80 hover:border-foreground/80 shadow-lg cursor-pointer group transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] shrink-0 select-none ${className}`}
    >
      {/* 1. Anime Avatar Image (Default display) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={animeSrc}
        alt={`${alt} (Anime)`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
          isHovered
            ? "opacity-0 scale-110 filter blur-[1px]"
            : "opacity-100 scale-100 filter-none"
        }`}
      />

      {/* 2. Formal Avatar Image (Revealed on hover) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={formalSrc}
        alt={`${alt} (Formal)`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
          isHovered
            ? "opacity-100 scale-100 filter-none"
            : "opacity-0 scale-95 filter blur-[2px]"
        }`}
      />

      {/* 3. Shine Sweep Effect Overlay */}
      <motion.div
        animate={isHovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
        transition={
          isHovered
            ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            : { duration: 0 }
        }
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] pointer-events-none z-10"
      />

      {/* 4. Subtle Outer Glow Ring on Hover */}
      <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
