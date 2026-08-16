"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/data/content";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const gradients = [
    "from-foreground/10 to-foreground/5",
    "from-brand-border/80 to-brand-card/80",
    "from-foreground/15 to-brand-border/50",
  ];
  const placeholderGradient = gradients[index % gradients.length];

  return (
    <div className="h-full w-full">
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -6,
          scale: 1.015,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        }}
        whileTap={{ scale: 0.99 }}
        className="glass rounded-2xl p-6 md:p-7 overflow-hidden relative group border border-brand-border hover:border-brand-border/80 flex flex-col justify-between h-full w-full select-text shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Subtle glowing mesh in background identical to certification cards */}
        <div className="absolute -inset-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        <div className="relative z-20 flex flex-col justify-between h-full">
          <div>
            {/* Image Thumbnail */}
            <div className="w-full h-48 sm:h-52 rounded-xl border border-brand-border relative overflow-hidden mb-6 flex items-center justify-center bg-black/20 shadow-lg">
              {project.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${placeholderGradient}`}
                />
              )}
              {/* Subtle Grid Overlay */}
              <div className="absolute inset-0 bg-[size:14px_24px] animated-grid opacity-25 pointer-events-none" />
            </div>

            {/* Category & Quick External Links */}
            <div className="flex items-center justify-between gap-2 mb-2 select-text">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted select-text cursor-text">
                {project.category}
              </span>
              <div className="flex items-center gap-2 select-none">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full glass border border-brand-border/60 text-brand-text-muted hover:text-foreground hover:border-foreground/40 transition-all cursor-pointer shadow-xs"
                    title="View Codebase"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full glass border border-brand-border/60 text-brand-text-muted hover:text-foreground hover:border-foreground/40 transition-all cursor-pointer shadow-xs"
                    title="View Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Title & Short Description */}
            <div>
              <h3 className="text-xl font-bold mb-2.5 text-foreground select-text cursor-text">
                {project.title}
              </h3>
              <p className="text-brand-text-muted text-sm mb-6 line-clamp-3 leading-relaxed select-text cursor-text">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills & Action Link */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-6 select-text">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full glass border border-brand-border text-foreground/85 select-text cursor-text shadow-2xs"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-[10px] font-mono font-medium px-2 py-1 rounded-full glass border border-brand-border text-brand-text-muted select-text cursor-text shadow-2xs">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground hover:opacity-80 transition-opacity group/link cursor-pointer"
            >
              <span>View Case Study</span>
              <ArrowRight
                size={14}
                className="transform group-hover/link:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
