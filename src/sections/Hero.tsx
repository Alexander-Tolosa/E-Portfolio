"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const skills = ["Developer", "Editor", "Junior"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight Tracking */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-60"
        animate={{
          background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
        }}
      />

      {/* Dynamic Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 45, -25, 0],
          y: [0, -65, 45, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-accent-blue/12 rounded-full blur-[110px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -55, 35, 0],
          y: [0, 45, -55, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-[38rem] h-[38rem] bg-accent-purple/8 rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, 35, -35, 0],
          y: [0, 35, 35, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-2/3 w-[28rem] h-[28rem] bg-accent-cyan/6 rounded-full blur-[95px] pointer-events-none z-0"
      />
      
      {/* Decorative moving grid pattern with parallax mouse tracking */}
      <motion.div
        className="absolute -inset-16 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 animated-grid"
        animate={{
          x: mousePosition.x * -0.04,
          y: mousePosition.y * -0.04,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-shine mb-8 py-1 whitespace-nowrap"
          >
            {content.personalInfo.name}
          </motion.h1>

          {/* Top 3 Skills / Roles Row with Target Brackets and Blur Parallax Hover Effect */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-10 sm:gap-14 md:gap-20 py-4 relative z-20 select-none"
          >
            {skills.map((skill, idx) => (
              <div
                key={skill}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-base sm:text-lg md:text-xl font-bold tracking-widest uppercase cursor-default transition-all duration-300 ${
                  hoveredIndex === null
                    ? "text-white/60 filter-none"
                    : hoveredIndex === idx
                    ? "text-white scale-105"
                    : "text-white/20 filter blur-[2px]"
                }`}
              >
                {skill}
                
                {/* Cyan Target scope corner brackets on hover */}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="brackets"
                    className="absolute -inset-x-4 -inset-y-1.5 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    {/* Top-Left */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-cyan rounded-tl-sm" />
                    {/* Top-Right */}
                    <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-cyan rounded-tr-sm" />
                    {/* Bottom-Left */}
                    <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-cyan rounded-bl-sm" />
                    {/* Bottom-Right */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-cyan rounded-br-sm" />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Wave Lines matching user layout */}
      <div className="absolute bottom-[20%] left-0 w-full h-32 pointer-events-none opacity-20 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100,60 C 200,100 400,20 720,60 C 1040,100 1240,20 1540,60"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
          />
          <path
            d="M -100,80 C 150,110 380,40 720,80 C 1060,120 1290,50 1540,80"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <path
            d="M -100,40 C 250,90 420,10 720,40 C 1020,70 1190,-10 1540,40"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Scroll indicator banner */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-brand-text-muted">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border-2 border-brand-text-muted p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-accent-blue rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
