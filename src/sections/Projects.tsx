"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-brand-dark/30 select-text">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[var(--orb-bg-secondary)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--orb-bg-secondary)] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10 select-text">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted select-text cursor-text">
            Portfolio Work
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight select-text cursor-text font-mono">
            Featured Projects
          </h3>
        </div>

        {/* Perspective Container & Animated Project Grid */}
        <div className="perspective-[1000px] w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {content.projects.map((project, idx) => (
                <motion.div layout key={project.id} className="h-full">
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
