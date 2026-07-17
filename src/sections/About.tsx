"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle, GraduationCap, Award, ExternalLink } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { DirectionalTilt } from "@/components/ui/DirectionalTilt";

export function About() {
  const visibleCategories = content.skills.filter((cat) => cat.skills.length > 0);
  const [activeTab, setActiveTab] = useState(0);

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
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue px-3 py-1 rounded-full bg-accent-blue/10">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
            Professional Profile & Skills
          </h2>
          <div className="h-1 w-20 bg-accent-blue mt-4 mx-auto md:mx-0 rounded" />
        </div>

        {/* Stack Layout */}
        <div className="flex flex-col gap-16">
          {/* Technical Skill Matrix & Photo Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Technical Skill Matrix */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card animate={false} className="p-6 md:p-8 relative overflow-visible">
                {/* Decorative Corner Brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />

                {/* Introduction Header and Bio */}
                <div className="mb-6">
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    Started creating mobile applications using Flutter, FlutterFlow, and Firebase and eventually switched to Web Development using NextJS, React, and Tailwind
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="text-xs font-bold text-accent-blue uppercase tracking-wider">
                    Skillset & tools
                  </h5>
                </div>

                {/* Category Selection Tabs on Top */}
                <div className="flex flex-row gap-1 mb-6 bg-white/5 p-1 rounded-xl border border-white/5">
                  {visibleCategories.map((category, idx) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveTab(idx)}
                      className={`flex-1 text-[9px] md:text-xs font-mono font-semibold px-1 md:px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === idx
                          ? "bg-gradient-to-r from-accent-blue to-accent-indigo text-white shadow-md"
                          : "text-brand-text-muted hover:text-white hover:bg-white/5"
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
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/6 transition-all duration-300 group cursor-default"
                    >
                      <span className="text-xs md:text-sm font-mono font-medium text-white/80 group-hover:text-white transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </div>

            {/* Profile Picture */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-sm"
              >
                <DirectionalTilt className="relative group w-full rounded-[2rem] border border-white/10 bg-brand-card">
                  <img
                    src="/assets/images/profile_avatar.jpg"
                    alt="Alexander Tolosa Portrait"
                    className="w-full h-auto object-cover aspect-[4/5] object-center rounded-[2rem] transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Glassmorphism Badge */}
                  <div 
                    style={{ transform: "translateZ(30px)" }}
                    className="absolute top-5 right-5 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-white tracking-widest uppercase backdrop-blur-md"
                  >
                    Alexander
                  </div>
                </DirectionalTilt>
              </motion.div>
            </div>
          </div>

          {/* Experience & Education Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Work Experience */}
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-accent-blue" size={24} />
                Experience
              </h3>
              
              {/* Timeline Container */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10 before:rounded-full">
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
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-brand-dark border-2 border-accent-blue group-hover:bg-accent-blue transition-colors duration-300" />
                    
                    <Card animate={false} className="p-5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-sm font-semibold text-white/70">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <span className="inline-flex items-center gap-1 text-xs text-brand-text-muted">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-white/40">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Experience Bullet Points */}
                      <ul className="space-y-2 text-brand-text-muted text-sm">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-accent-emerald mt-1 shrink-0" />
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
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="text-accent-blue" size={24} />
                Education
              </h3>
              
              {/* Timeline Container */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10 before:rounded-full">
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
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-brand-dark border-2 border-accent-blue group-hover:bg-accent-blue transition-colors duration-300" />
                    
                    <Card animate={false} className="p-5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                            {edu.degree}
                          </h4>
                          <p className="text-sm font-semibold text-white/70">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <span className="inline-flex items-center gap-1 text-xs text-brand-text-muted">
                            <Calendar size={12} />
                            {edu.period}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-white/40">
                            <MapPin size={12} />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Education Bullet Points */}
                      <ul className="space-y-2 text-brand-text-muted text-sm">
                        {edu.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-accent-emerald mt-1 shrink-0" />
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
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-accent-blue" size={24} />
              Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.certifications?.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card animate={false} className="p-5 border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="text-lg font-bold text-white transition-colors">
                          {cert.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-xs text-brand-text-muted whitespace-nowrap">
                          <Calendar size={12} />
                          {cert.date}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white/70 mb-3">
                        {cert.issuer}
                      </p>
                      {cert.description && cert.description.length > 0 && (
                        <ul className="space-y-2 text-brand-text-muted text-sm">
                          {cert.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <CheckCircle size={14} className="text-accent-emerald mt-1 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {cert.credentialUrl && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-indigo transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
}
