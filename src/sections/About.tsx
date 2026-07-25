"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle, GraduationCap, Award, ExternalLink, ArrowRight, Maximize2, X } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { DirectionalTilt } from "@/components/ui/DirectionalTilt";
import { CertificatesModal } from "@/components/ui/CertificatesModal";

export function About() {
  const visibleCategories = content.skills.filter((cat) => cat.skills.length > 0);
  const [activeTab, setActiveTab] = useState(0);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const getShortName = (name: string) => {
    if (name === "Devops & Cloud") return "DevOps";
    if (name === "AI & Machine Learning") return "AI / ML";
    if (name === "CMS & No-Code") return "CMS";
    if (name === "Developer Tools") return "Tools";
    return name;
  };

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

          {/* Experience & Education Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Work Experience */}
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="text-foreground" size={24} />
                Experience
              </h3>
              
              {/* Timeline Container */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-brand-border before:rounded-full">
                {content.experiences.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative pl-10 group"
                  >
                    {/* Timeline Node Icon */}
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-foreground group-hover:bg-foreground transition-colors duration-300" />
                    
                    <Card animate={false} className="p-5 border border-brand-border transition-colors">
                      <div className="flex flex-col gap-1.5 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-foreground group-hover:opacity-80 transition-opacity leading-snug">
                            {exp.role}
                          </h4>
                          <p className="text-sm font-semibold text-foreground/70 mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
                          <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                            <Calendar size={13} className="shrink-0" />
                            {exp.period}
                          </span>
                          <span className="text-foreground/20 hidden sm:inline">•</span>
                          <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                            <MapPin size={13} className="shrink-0" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Experience Bullet Points */}
                      <ul className="space-y-2 text-brand-text-muted text-sm">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-foreground/60 mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="text-foreground" size={24} />
                Education
              </h3>
              
              {/* Timeline Container */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-brand-border before:rounded-full">
                {content.education.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative pl-10 group"
                  >
                    {/* Timeline Node Icon */}
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-foreground group-hover:bg-foreground transition-colors duration-300" />
                    
                    <Card animate={false} className="p-5 border border-brand-border transition-colors">
                      <div className="flex flex-col gap-1.5 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-foreground group-hover:opacity-80 transition-opacity leading-snug">
                            {edu.degree}
                          </h4>
                          <p className="text-sm font-semibold text-foreground/70 mt-0.5">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
                          <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                            <Calendar size={13} className="shrink-0" />
                            {edu.period}
                          </span>
                          <span className="text-foreground/20 hidden sm:inline">•</span>
                          <span className="inline-flex items-center gap-1.5 text-brand-text-muted font-medium whitespace-nowrap">
                            <MapPin size={13} className="shrink-0" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Education Bullet Points */}
                      <ul className="space-y-2 text-brand-text-muted text-sm">
                        {edu.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-foreground/60 mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
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
                                  className="w-full h-full object-cover"
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
                <h4 className="text-base font-bold text-foreground">Alexander Tolosa</h4>
                <p className="text-xs text-brand-text-muted">Full-Stack Software Engineer</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
