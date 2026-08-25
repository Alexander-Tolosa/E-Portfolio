"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const images = (
    project.images && project.images.length > 0
      ? project.images
      : [project.image]
  ).filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const domainName = project.domain || `${project.id}.com`;

  // Autoplay slideshow: switches image every 4 seconds, pauses on hover
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="h-full w-full"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-2xl bg-white dark:bg-[#0d0d0d] border border-neutral-200/90 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-300 overflow-hidden group h-full shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] dark:shadow-xl dark:hover:shadow-2xl flex flex-col justify-between select-text"
      >
        {/* Top Mock Browser Chrome Bar */}
        <div className="bg-[#f8f9fa] dark:bg-[#14151a] px-4 py-2.5 flex items-center justify-between border-b border-neutral-200/80 dark:border-white/5 select-none">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5 w-14">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          </div>

          {/* Centered Pill Address Bar */}
          <div className="bg-white dark:bg-[#1d1e24] border border-neutral-200/80 dark:border-white/5 rounded-md px-3.5 py-0.5 text-[11.5px] text-neutral-500 dark:text-neutral-400 font-mono tracking-tight flex items-center justify-center max-w-[210px] truncate shadow-2xs">
            <span className="truncate">{domainName}</span>
          </div>

          {/* Spacer to keep Address Bar Centered */}
          <div className="w-14" />
        </div>

        {/* Slideshow Image Viewport (envember.com style) */}
        <Link
          href={`/projects/${project.id}`}
          className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-black/80 block cursor-pointer border-b border-neutral-100 dark:border-transparent"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${project.id}-${currentIndex}`}
              src={images[currentIndex]}
              alt={`${project.title} screenshot ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Center Hover Action Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-md border border-neutral-200/80 dark:border-white/20 text-neutral-900 dark:text-white flex items-center justify-center scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
              <ArrowUpRight size={18} />
            </div>
          </div>

          {/* Slideshow Indicator Dots matching envember.com */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 dark:bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 z-20 select-none">
              {images.map((_, dotIdx) => {
                const isActive = currentIndex === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentIndex(dotIdx);
                    }}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-4 h-1.5 bg-white shadow-xs"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </Link>

        {/* Project Title and Muted Description */}
        <Link
          href={`/projects/${project.id}`}
          className="p-6 bg-white dark:bg-[#0d0d0d] block cursor-pointer flex-grow"
        >
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[#4f75ff] dark:group-hover:text-indigo-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
