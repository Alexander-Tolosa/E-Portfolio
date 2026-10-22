"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const projects = content.projects;

  return (
    <section id="projects" className="pt-12 scroll-mt-12 select-text">
      {/* Section Header */}
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-[14px] font-medium text-brand-text-muted">Projects</h2>
      </div>

      {/* macOS Browser Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      {/* View all button below */}
      <div className="mt-6">
        <Link
          href="/projects"
          className="text-[14px] font-medium text-brand-text-muted hover:text-foreground transition-colors"
        >
          View all →
        </Link>
      </div>
    </section>
  );
}
