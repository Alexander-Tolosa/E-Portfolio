"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle, GraduationCap, Award, ExternalLink, ArrowRight, Maximize2, X, Check } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { DirectionalTilt } from "@/components/ui/DirectionalTilt";
import { CertificatesModal } from "@/components/ui/CertificatesModal";

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

              {/* Checked Status Badge */}
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-all duration-500 shrink-0 ${
                  isChecked
                    ? "bg-foreground text-background border-foreground shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                    : "bg-brand-border/20 border-brand-border text-brand-text-muted/60"
                }`}
              >
                {isChecked ? "CHECKED" : "MILESTONE"}
              </span>
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
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

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
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[var(--orb-bg-secondary)] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground px-3 py-1 rounded-full bg-brand-border/20 border border-brand-border">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4">
            Professional Profile & Skills
          </h2>
          <div className="h-1 w-20 bg-foreground mt-4 mx-auto md:mx-0 rounded" />
        </div>

        {/* Stack Layout */}
        <div className="flex flex-col gap-16">
          {/* Technical Skill Matrix & Photo Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Technical Skill Matrix */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card animate={false} className="p-6 md:p-8 relative overflow-visible">
                {/* Decorative Corner Brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-brand-border pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-brand-border pointer-events-none" />

                {/* Introduction Header and Bio */}
                <div className="mb-6">
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    I&apos;m a Front-End Developer and UI/UX Designer, Using my experience from Cascade Development Group and projects turning complex ideas into clean, easy-to-use screens that work perfectly.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                    Skillset & tools
                  </h5>
                </div>

                {/* Category Selection Tabs on Top */}
                <div className="flex flex-row gap-1 mb-6 bg-brand-border/10 p-1 rounded-xl border border-brand-border">
                  {visibleCategories.map((category, idx) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveTab(idx)}
                      className={`flex-1 text-[9px] md:text-xs font-mono font-semibold px-1 md:px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === idx
                          ? "bg-foreground text-background shadow-md"
                          : "text-brand-text-muted hover:text-foreground hover:bg-brand-border/10"
                      }`}
                    >
                      {getShortName(category.name)}
                    </button>
                  ))}
                </div>

                {/* Wrapping Flow of Tech Stack Badges */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-2.5"
                >
                  {visibleCategories[activeTab]?.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full glass border border-brand-border hover:border-brand-border transition-all duration-300 group cursor-default"
                    >
                      <span className="text-xs md:text-sm font-mono font-medium text-foreground/80 group-hover:text-foreground transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </div>

            {/* Profile Photo Layout */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] xl:w-[28rem] xl:h-[28rem] cursor-pointer"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <DirectionalTilt className="w-full h-full rounded-3xl overflow-hidden border border-brand-border glass relative group shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/images/profile_avatar.jpg"
                    alt="Alexander Tolosa Profile Photo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Expand Overlay Icon */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl glass border border-brand-border text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-md">
                    <Maximize2 size={18} />
                  </div>
                </DirectionalTilt>
              </motion.div>
            </div>
          </div>

          {/* Interleaved Experience & Education Timeline */}
          <div className="flex flex-col gap-6">
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

      {/* Expanded Profile Photo Lightbox Modal */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhotoModalOpen(false)}
              className="fixed inset-0 bg-brand-dark/85 backdrop-blur-xl cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden glass border border-brand-border shadow-2xl z-10 flex flex-col items-center p-2"
            >
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass border border-brand-border text-foreground hover:opacity-80 transition-opacity cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Close photo view"
              >
                <X size={20} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/profile_avatar.jpg"
                alt="Alexander Tolosa Expanded Profile Photo"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="py-3 px-6 text-center">
                <h4 className="text-base font-bold text-foreground">{content.personalInfo.name}</h4>
                <p className="text-xs text-brand-text-muted">{content.personalInfo.title}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
