"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle, GraduationCap, Award, ExternalLink, ArrowRight, Maximize2, X, Check, LayoutGrid, ChevronRight } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { DirectionalTilt } from "@/components/ui/DirectionalTilt";
import { CertificatesModal } from "@/components/ui/CertificatesModal";
import { TechBadge } from "@/components/ui/TechBadge";
import { SkillsModal } from "@/components/ui/SkillsModal";

function TimelineCard({
  item,
  type,
  index,
}: {
  item: {
    id: string;
    role?: string;
    degree?: string;
    company?: string;
    institution?: string;
    period: string;
    location: string;
    description: string[];
  };
  type: "experience" | "education";
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Trigger checkpoint check ONLY when touched/covered by the glowing line (active from top of screen down to 60% height)
  const isChecked = useInView(nodeRef, { margin: "1000px 0px -40% 0px", once: false });

  const title = item.role || item.degree;
  const subtitle = item.company || item.institution;
  const isExp = type === "experience";
  
  // All Experience items on the left, all Education items on the right
  const isLeftOnDesktop = isExp;

  // Scroll progress for this specific checkpoint node as screen scrolls up/down
  const { scrollYProgress: cardProgress } = useScroll({
    target: nodeRef,
    offset: ["start 95%", "start 60%", "end 15%", "end 0%"],
  });

  // Opacity: slowly fade in as screen scrolls up towards the circle checkpoint (95% -> 60%),
  // stay fully opaque while active (60% -> 15%), slowly fade out when scrolling past top (15% -> 0%)
  const opacity = useTransform(cardProgress, [0, 0.333, 0.666, 1], [0.15, 1, 1, 0.15]);

  // Scale: subtle scale up into focus as it reaches checkpoint
  const scale = useTransform(cardProgress, [0, 0.333, 0.666, 1], [0.93, 1, 1, 0.94]);

  // Dynamic X and Y translation gliding smoothly towards checkpoint center
  const x = useTransform(cardProgress, [0, 0.333], [isLeftOnDesktop ? -25 : 25, 0]);
  const y = useTransform(cardProgress, [0, 0.333, 0.666, 1], [25, 0, 0, -15]);

  // Soft blur effect fading into crisp focus as it reaches the checkpoint
  const filter = useTransform(cardProgress, [0, 0.333], ["blur(4px)", "blur(0px)"]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.div
        ref={cardRef}
        style={{ opacity, scale, x, y, filter }}
        className={`relative w-full pl-10 lg:pl-0 lg:w-[calc(50%-2.5rem)] ${
          isLeftOnDesktop ? "lg:mr-auto" : "lg:ml-auto"
        } group`}
      >
        {/* Horizontal Branch Connector Line to Central Divider Line on Desktop */}
        <div
          className={`hidden lg:block absolute top-8 h-[2px] transition-all duration-500 pointer-events-none ${
            isChecked
              ? "bg-gradient-to-r from-foreground via-accent-cyan to-foreground shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              : "bg-brand-border/60"
          } ${isLeftOnDesktop ? "-right-10 w-10" : "-left-10 w-10"}`}
        />

        {/* Checkpoint Node (Circle with Checkmark on Central Divider Line) */}
        <div
          ref={nodeRef}
          className={`absolute top-8 -translate-y-1/2 flex items-center justify-center transition-all duration-500 z-10 ${
            isLeftOnDesktop
              ? "left-4 lg:left-auto lg:-right-10 -translate-x-1/2 lg:translate-x-1/2"
              : "left-4 lg:-left-10 -translate-x-1/2"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              isChecked
                ? "bg-foreground border-foreground text-background scale-110 shadow-[0_0_15px_#fff,0_0_22px_var(--color-accent-cyan)]"
                : "bg-background border-brand-border text-brand-text-muted/40 scale-90"
            }`}
          >
            <Check
              size={13}
              className={`transition-all duration-300 ${
                isChecked
                  ? "scale-100 opacity-100 stroke-[3.5]"
                  : "scale-50 opacity-0 stroke-[2]"
              }`}
            />
          </div>
        </div>

        {/* Timeline Banner Card */}
        <Card
          animate={false}
          className={`p-5 border transition-all duration-500 ${
            isChecked
              ? "border-foreground/50 shadow-[0_0_25px_rgba(255,255,255,0.06)]"
              : "border-brand-border"
          }`}
        >
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                {/* Type Badge (Experience vs Education) */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold w-fit border transition-colors ${
                    isExp
                      ? "bg-accent-cyan/10 text-foreground border-accent-cyan/30"
                      : "bg-foreground/10 text-foreground border-foreground/30"
                  }`}
                >
                  {isExp ? <Briefcase size={11} /> : <GraduationCap size={11} />}
                  {isExp ? "Experience" : "Education"}
                </span>
                <h4 className="text-lg font-bold text-foreground group-hover:opacity-90 transition-opacity leading-snug mt-1">
                  {title}
                </h4>
                <p className="text-sm font-semibold text-foreground/70">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
              <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                <Calendar size={13} className="shrink-0" />
                {item.period}
              </span>
              <span className="text-foreground/20 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                <MapPin size={13} className="shrink-0" />
                {item.location}
              </span>
            </div>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-2 text-brand-text-muted text-sm">
            {item.description.map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2">
                <CheckCircle
                  size={14}
                  className={`mt-1 shrink-0 transition-colors duration-300 ${
                    isChecked ? "text-foreground" : "text-brand-text-muted/50"
                  }`}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}

export function About() {
  const visibleCategories = content.skills.filter((cat) => cat.skills.length > 0);
  const [activeTab, setActiveTab] = useState(0);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  });

  const getShortName = (name: string) => {
    if (name === "Devops & Cloud") return "DevOps";
    if (name === "AI & Machine Learning") return "AI / ML";
    if (name === "CMS & No-Code") return "CMS";
    if (name === "Developer Tools") return "Tools";
    return name;
  };

  const timelineItems = [
    { ...content.experiences[0], type: "experience" as const },
    { ...content.education[0], type: "education" as const },
    { ...content.experiences[1], type: "experience" as const },
    { ...content.education[1], type: "education" as const },
    { ...content.education[2], type: "education" as const },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[var(--orb-bg-secondary)] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted">
            Experience & Profile
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">
            Background & Skillset
          </h3>
        </div>

        {/* Stack Layout */}
        <div className="flex flex-col gap-16">
          {/* Technical Skillset and Tools Showcase */}
          <div className="w-full">
            <Card animate={false} className="p-6 md:p-8 relative overflow-hidden">
              {/* Header Title & View All button matching reference image */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Skillset and Tools
                </h3>
                <button
                  onClick={() => setIsSkillsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-text-muted hover:text-foreground transition-all cursor-pointer group"
                >
                  <LayoutGrid size={14} className="text-brand-text-muted group-hover:text-foreground transition-colors" />
                  <span>View All</span>
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Multi-Row Infinite Marquee Tracks matching reference image */}
              <div className="marquee-mask relative w-full overflow-hidden flex flex-col gap-3 py-2 select-none">
                {/* Row 1: Left Scroll */}
                <div className="flex w-max gap-3 animate-marquee">
                  {["React", "TypeScript", "Next.js", "Tailwind CSS", "Shadcn UI", "JavaScript", "Framer Motion", "Vite", "HTML5", "CSS3"].map((name, idx) => (
                    <div
                      key={`r1-1-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                  {/* Duplicate Row 1 */}
                  {["React", "TypeScript", "Next.js", "Tailwind CSS", "Shadcn UI", "JavaScript", "Framer Motion", "Vite", "HTML5", "CSS3"].map((name, idx) => (
                    <div
                      key={`r1-2-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                </div>

                {/* Row 2: Right Scroll (Reverse) */}
                <div className="flex w-max gap-3 animate-marquee-reverse">
                  {["Python", "Java", "Spring Boot", "PostgreSQL", "MySQL", "Supabase", "GitHub Actions", "IndexedDB", "Redis"].map((name, idx) => (
                    <div
                      key={`r2-1-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                  {/* Duplicate Row 2 */}
                  {["Python", "Java", "Spring Boot", "PostgreSQL", "MySQL", "Supabase", "GitHub Actions", "IndexedDB", "Redis"].map((name, idx) => (
                    <div
                      key={`r2-2-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                </div>

                {/* Row 3: Left Scroll */}
                <div className="flex w-max gap-3 animate-marquee">
                  {["WordPress", "Git", "GitHub", "Anthropic", "VS Code", "Canva", "Antigravity", "Discord", "Teams", "Vercel"].map((name, idx) => (
                    <div
                      key={`r3-1-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                  {/* Duplicate Row 3 */}
                  {["WordPress", "Git", "GitHub", "Anthropic", "VS Code", "Canva", "Antigravity", "Discord", "Teams", "Vercel"].map((name, idx) => (
                    <div
                      key={`r3-2-${name}-${idx}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-border/80 hover:border-foreground/40 hover:scale-105 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
                    >
                      <TechBadge name={name} className="!border-0 !bg-transparent !p-0 !m-0" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Interleaved Experience & Education Timeline */}
          <div id="experience" className="flex flex-col gap-6 scroll-mt-28">
            <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-3 text-center">
              <Briefcase className="text-foreground" size={24} />
              <span>Experience & Education</span>
              <GraduationCap className="text-foreground" size={24} />
            </h3>

            <div ref={timelineRef} className="relative pt-6 flex flex-col gap-10 sm:gap-14">
              {/* Central Background Track Line */}
              <div className="absolute left-4 lg:left-1/2 top-14 bottom-6 w-[2px] -translate-x-1/2 bg-brand-border/50 rounded-full pointer-events-none" />

              {/* Glowing Progress Fill Line (Scroll-Animated) */}
              <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                className="absolute left-4 lg:left-1/2 top-14 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-foreground via-accent-cyan to-foreground rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_8px_rgba(56,189,248,0.6)] pointer-events-none"
              />


              {/* Render Interleaved Timeline Cards */}
              {timelineItems.map((item, idx) => (
                <TimelineCard key={item.id} item={item} type={item.type} index={idx} />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Award className="text-foreground" size={24} />
              Certifications
            </h3>
            
            {content.certifications && content.certifications.length > 0 && (
              <div className="flex flex-col gap-6">
                {/* 4 Featured Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.certifications.slice(0, 4).map((cert, idx) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full"
                    >
                      <Card animate={false} className="p-5 border border-brand-border transition-colors h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-4 mb-4">
                            {cert.logo && (
                              <div className="w-12 h-12 rounded-xl overflow-hidden glass border border-brand-border flex items-center justify-center shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={cert.logo}
                                  alt={`${cert.issuer} logo`}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-base font-bold text-foreground transition-colors line-clamp-2">
                                  {cert.title}
                                </h4>
                                <span className="inline-flex items-center gap-1 text-xs text-brand-text-muted whitespace-nowrap mt-0.5 shrink-0">
                                  <Calendar size={12} />
                                  {cert.date}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-foreground/70 mt-1">
                                {cert.issuer}
                              </p>
                            </div>
                          </div>
                          {cert.description && cert.description.length > 0 && (
                            <ul className="space-y-2 text-brand-text-muted text-sm mt-3">
                              {cert.description.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2">
                                  <CheckCircle size={14} className="text-foreground/60 mt-1 shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {cert.credentialUrl && (
                          <div className="mt-4 pt-3 border-t border-brand-border flex justify-end">
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:opacity-80 transition-opacity"
                            >
                              Verify Credential
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Below Right: See All Button */}
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsCertModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-brand-border hover:border-brand-border text-xs font-bold text-foreground transition-all cursor-pointer shadow-md group"
                  >
                    <span>See All ({content.certifications.length})</span>
                    <ArrowRight size={14} className="text-foreground transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificates Modal */}
      <CertificatesModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certifications={content.certifications || []}
      />

      {/* Skills & Tools Categorized Modal */}
      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        skillCategories={content.skills || []}
      />
    </section>
  );
}
