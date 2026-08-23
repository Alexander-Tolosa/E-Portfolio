"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

const filterCategories = [
  "All",
  "Web Development",
  "E-Commerce",
  "Mobile Apps",
  "Custom Software",
  "UI/UX Design",
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = content.projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Web Development") {
      return (
        project.category.toLowerCase().includes("web") ||
        project.category.toLowerCase().includes("attendance") ||
        project.category.toLowerCase().includes("system")
      );
    }
    if (activeCategory === "E-Commerce") {
      return (
        project.category.toLowerCase().includes("e-commerce") ||
        project.category.toLowerCase().includes("cafe") ||
        project.category.toLowerCase().includes("storefront") ||
        project.title.toLowerCase().includes("cafe")
      );
    }
    if (activeCategory === "Custom Software") {
      return (
        project.category.toLowerCase().includes("software") ||
        project.category.toLowerCase().includes("system") ||
        project.category.toLowerCase().includes("portal")
      );
    }
    if (activeCategory === "UI/UX Design") {
      return (
        project.role.toLowerCase().includes("design") ||
        project.role.toLowerCase().includes("ui/ux")
      );
    }
    if (activeCategory === "Mobile Apps") {
      return (
        project.description.toLowerCase().includes("mobile") ||
        project.techStack.some((t) => t.toLowerCase().includes("native") || t.toLowerCase().includes("mobile"))
      );
    }
    return project.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 sm:py-28 relative overflow-hidden bg-[#030712]/40 select-text">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#5b52f9] font-bold text-xs tracking-widest uppercase mb-2 inline-block">
            MY WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-1">
            Featured <span className="text-[#4f75ff]">Projects</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-3.5 leading-relaxed">
            Explore my portfolio of successful projects that showcase my expertise in building digital solutions that make an impact.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12 sm:mb-14 select-none">
          {filterCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#5b52f9] text-white shadow-[0_0_18px_rgba(91,82,249,0.45)]"
                    : "border border-white/10 hover:border-white/20 bg-transparent text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* macOS Browser Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-[820px] mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-neutral-500 text-sm">
            No projects found in this category. Select &quot;All&quot; to view all work.
          </div>
        )}
      </div>
    </section>
  );
}
