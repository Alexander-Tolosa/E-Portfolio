"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Project } from "@/data/content";

interface ProjectDeckShowcaseProps {
  projects: Project[];
}

export function ProjectDeckShowcase({ projects }: ProjectDeckShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Extend or duplicate projects if needed to form a 5-card deck
  const deckProjects = [
    {
      ...projects[0],
      displayBadge: "Next.js • Supabase",
      tagline: "USA Pharmacy Dept.",
      location: "Iloilo, Philippines",
      rotateAngle: -14,
      defaultX: -110,
      defaultY: 18,
    },
    {
      ...projects[1] || projects[0],
      displayBadge: "Offline-First Sync",
      tagline: "Silim Cafe Co.",
      location: "Specialty Coffee Store",
      rotateAngle: -7,
      defaultX: -40,
      defaultY: 6,
    },
    {
      ...projects[0],
      id: "pharmatrack-core",
      title: "PharmaTrack Pro",
      category: "Attendance Monitoring",
      displayBadge: "IndexedDB • Auto Sync",
      tagline: "Cascade Dev Group",
      location: "USA College of Pharmacy",
      rotateAngle: 0,
      defaultX: 0,
      defaultY: 0,
    },
    {
      ...projects[1] || projects[0],
      id: "silim-storefront",
      title: "Silim Digital Store",
      category: "Interactive Storefront",
      displayBadge: "Foodpanda API Integration",
      tagline: "Digital Ecosystem",
      location: "Iloilo City",
      rotateAngle: 7,
      defaultX: 40,
      defaultY: 6,
    },
    {
      ...projects[0],
      id: "cdg-architecture",
      title: "CDG Architecture",
      category: "Frontend Infrastructure",
      displayBadge: "React • TypeScript",
      tagline: "Cascade Dev Group",
      location: "Visayas IT Solutions",
      rotateAngle: 14,
      defaultX: 110,
      defaultY: 18,
    },
  ];

  return (
    <div className="w-full rounded-3xl glass border border-brand-border/90 p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col items-center justify-between min-h-[580px] sm:min-h-[620px] shadow-2xl select-text">
      {/* Soft Background Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--orb-bg-secondary)] rounded-full blur-[140px] pointer-events-none" />

      {/* Showcase Header */}
      <div className="text-center max-w-xl mx-auto z-10 mb-8 sm:mb-12 select-text">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3 font-mono select-text cursor-text">
          Interactive Portfolio Showcase
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-muted font-mono leading-relaxed select-text cursor-text">
          Explore key projects engineered with high performance, offline-first sync, interactive storefronts, and intuitive UI/UX design.
        </p>
      </div>

      {/* Interactive Fan-Out Card Deck Container */}
      <div className="relative w-full max-w-2xl h-[340px] sm:h-[380px] flex items-center justify-center z-20 my-2">
        {deckProjects.map((project, idx) => {
          const isHovered = hoveredIndex === idx;
          const hasAnyHover = hoveredIndex !== null;

          // Calculate interactive fanning offset based on hover state
          let calculatedX = project.defaultX;
          if (hasAnyHover) {
            if (idx < hoveredIndex) {
              calculatedX -= 35; // Shift left neighbor further left
            } else if (idx > hoveredIndex) {
              calculatedX += 35; // Shift right neighbor further right
            }
          }

          return (
            <motion.div
              key={`${project.id}-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                x: isHovered ? calculatedX * 1.1 : calculatedX,
                y: isHovered ? -28 : project.defaultY,
                rotate: isHovered ? 0 : project.rotateAngle,
                scale: isHovered ? 1.08 : 1,
                zIndex: isHovered ? 50 : 20 - Math.abs(idx - 2) * 5,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 25,
              }}
              className="absolute w-[200px] sm:w-[240px] md:w-[260px] h-[290px] sm:h-[330px] rounded-2xl shadow-2xl glass border border-brand-border/80 overflow-hidden cursor-pointer group flex flex-col justify-between p-4 sm:p-5 select-text"
            >
              {/* Card Image Cover Background */}
              {project.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/15 to-brand-border/50 opacity-80" />
              )}

              {/* Dark Gradient Overlay for Crisp Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:via-black/40 transition-colors" />

              {/* Top Floating Badge Pill */}
              <div className="relative z-10 flex items-center justify-between gap-1 select-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{project.displayBadge}</span>
                </span>
                <Link
                  href={`/projects/${project.id.replace("-core", "").replace("-storefront", "")}`}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors"
                  title="View Case Study"
                >
                  <ExternalLink size={13} />
                </Link>
              </div>

              {/* Bottom Card Info & Verified Badge */}
              <div className="relative z-10 select-text flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight select-text cursor-text font-mono">
                    {project.title}
                  </h4>
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 fill-blue-400/20" />
                </div>

                <p className="text-[11px] font-semibold text-white/80 select-text cursor-text">
                  {project.role || "Front-End Dev & UI/UX"}
                </p>

                <div className="flex items-center justify-between text-[10px] text-white/60 font-mono pt-1 select-text">
                  <span>{project.location}</span>
                  <span className="text-emerald-400 font-semibold">{project.category}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Pill CTA Button matching video design */}
      <div className="z-20 mt-6 sm:mt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-mono font-bold hover:scale-105 transition-all shadow-xl cursor-pointer group"
        >
          <span>Explore All Projects</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
