"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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
  hidden: { opacity: 0, y: 40, rotateX: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pixel coordinates for glare overlay
  const pixelX = useMotionValue(150);
  const pixelY = useMotionValue(150);

  // Spring physics for realistic 3D tilt inertia
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map coordinates to 3D rotation angles (-15deg to 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Smooth springs for spotlight glare in pixels
  const glareXSpring = useSpring(pixelX, { stiffness: 350, damping: 25 });
  const glareYSpring = useSpring(pixelY, { stiffness: 350, damping: 25 });

  // Parallax offset for thumbnail image
  const imgTranslateX = useSpring(useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]), {
    stiffness: 250,
    damping: 25,
  });
  const imgTranslateY = useSpring(useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Set pixel coordinates for glare
    pixelX.set(mouseXPos);
    pixelY.set(mouseYPos);

    // Normalize between -0.5 and 0.5 for spring rotation
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const gradients = [
    "from-foreground/10 to-foreground/5",
    "from-brand-border/80 to-brand-card/80",
    "from-foreground/15 to-brand-border/50",
  ];
  const placeholderGradient = gradients[index % gradients.length];

  return (
    <div className="perspective-[1000px] h-full w-full">
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        }}
        className="group relative h-full w-full rounded-2xl glass border border-brand-border/90 backdrop-blur-xl p-6 md:p-7 flex flex-col justify-between overflow-hidden shadow-2xl hover:border-foreground/40 transition-all duration-300 select-text will-change-transform"
      >
        {/* Pixel-Accurate Spotlight Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-10"
          style={{
            background: `radial-gradient(500px circle at ${glareXSpring.get()}px ${glareYSpring.get()}px, rgba(255, 255, 255, 0.12), transparent 40%)`,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Outer 3D Preserve Container */}
        <div className="relative z-20 flex flex-col justify-between h-full" style={{ transformStyle: "preserve-3d" }}>
          <div>
            {/* Magnetic Image Thumbnail Floating at translateZ(40px) */}
            <div
              className="w-full h-48 sm:h-52 rounded-xl border border-brand-border relative overflow-hidden mb-6 flex items-center justify-center bg-black/20 group-hover:border-foreground/30 transition-colors shadow-lg"
              style={{ transform: "translateZ(40px)" }}
            >
              {project.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <motion.img
                  src={project.image}
                  alt={project.title}
                  style={{
                    x: imgTranslateX,
                    y: imgTranslateY,
                  }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <motion.div
                  style={{ x: imgTranslateX, y: imgTranslateY }}
                  className={`absolute inset-0 bg-gradient-to-br ${placeholderGradient}`}
                />
              )}
              {/* Subtle Grid Overlay */}
              <div className="absolute inset-0 bg-[size:14px_24px] animated-grid opacity-25 pointer-events-none" />
            </div>

            {/* Category & Quick External Links Floating at translateZ(30px) */}
            <div className="flex items-center justify-between gap-2 mb-2 select-text" style={{ transform: "translateZ(30px)" }}>
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

            {/* Project Title & Short Description Floating at translateZ(30px) */}
            <div style={{ transform: "translateZ(30px)" }}>
              <h3 className="text-xl font-bold mb-2.5 text-foreground group-hover:text-foreground/90 transition-colors select-text cursor-text">
                {project.title}
              </h3>
              <p className="text-brand-text-muted text-sm mb-6 line-clamp-3 leading-relaxed select-text cursor-text">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills & Action Link Floating at translateZ(20px) */}
          <div style={{ transform: "translateZ(20px)" }}>
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
