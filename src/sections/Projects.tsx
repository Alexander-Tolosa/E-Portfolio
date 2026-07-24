"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const [filterCategory, setFilterCategory] = useState("All");

  // Get list of unique categories
  const categories = ["All", ...Array.from(new Set(content.projects.map((p) => p.category)))];

  const filteredProjects =
    filterCategory === "All"
      ? content.projects
      : content.projects.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-brand-dark/30">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-white px-3 py-1 rounded-full bg-white/10">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
            Featured Projects & Case Studies
          </h2>
          <div className="h-1 w-20 bg-white mt-4 mx-auto md:mx-0 rounded" />
        </div>

        {/* Categories Filtering Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`text-xs font-semibold px-5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                filterCategory === category
                  ? "bg-gradient-to-r from-white to-zinc-300 border-transparent text-black font-bold shadow-md shadow-white/10"
                  : "border-white/10 text-brand-text-muted hover:text-white hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Animated Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="h-full"
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
