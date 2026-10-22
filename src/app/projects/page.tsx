import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { MinimalFooter } from "@/components/layout/MinimalFooter";

export const metadata: Metadata = {
  title: "Projects | Alexander Tolosa",
  description: "Featured web applications, client solutions, and case studies by Alexander Tolosa.",
};

export default function ProjectsPage() {
  const projects = content.projects || [];

  return (
    <div className="mx-auto w-full max-w-[640px] md:max-w-[760px] lg:max-w-[860px] px-6 pb-10 pt-[84px] lg:pl-6 lg:pr-6 lg:pt-10">
      {/* Back Link */}
      <Link
        href="/"
        className="group inline-flex min-h-8 items-center gap-1.5 text-[14px] font-medium text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back
      </Link>

      {/* Title & Subtitle */}
      <h1 className="mt-6 text-[26px] font-medium leading-tight tracking-[-0.01em] text-foreground">
        Projects
      </h1>
      <p className="mt-2 text-[16px] text-brand-text-muted">
        Selected works, client platforms, and case studies.
      </p>

      {/* Projects Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      {/* Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
