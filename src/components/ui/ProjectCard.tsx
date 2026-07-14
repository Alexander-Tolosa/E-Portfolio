"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/data/content";
import { Card } from "./Card";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Simple random color schemes to display if a project screenshot fails/is loading
  const gradients = [
    "from-accent-blue/20 to-accent-indigo/20",
    "from-accent-indigo/20 to-accent-purple/20",
    "from-accent-purple/20 to-accent-cyan/20",
  ];
  const placeholderGradient = gradients[index % gradients.length];

  return (
    <Card className="h-full flex flex-col justify-between" delay={index * 0.1}>
      <div>
        {/* Project Thumbnail Image / Placeholder */}
        <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${placeholderGradient} border border-white/5 relative overflow-hidden mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300`}>
          {/* Animated decorative grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          {/* Centralized text indicator */}
          <span className="text-sm font-semibold text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest relative z-10">
            {project.category}
          </span>
          
          {/* Soft center light source */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-indigo/10 rounded-full blur-2xl group-hover:bg-accent-blue/15 transition-colors" />
        </div>

        {/* Project Content */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-text-muted hover:text-white transition-colors"
                title="View Codebase"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-text-muted hover:text-white transition-colors"
                title="View Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-blue transition-colors duration-200">
          {project.title}
        </h3>
        
        <p className="text-brand-text-muted text-sm mb-6 line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/70"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Action Link to Case Study */}
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center text-sm font-semibold text-accent-blue hover:text-accent-indigo transition-colors group/link cursor-pointer"
        >
          View Case Study
          <ArrowRight
            size={16}
            className="ml-1 transform group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </Card>
  );
}
