"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";

export function About() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
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

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Timeline & Story (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-accent-blue" size={24} />
                Work Experience
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
          </div>

          {/* Right Column: Skill Matrix Tabs (5 Columns) */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-accent-indigo">⌨️</span>
              Technical Skill Matrix
            </h3>

            <Card animate={false} className="p-6">
              {/* Category Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1 rounded-xl border border-white/5">
                {content.skills.map((category, idx) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === idx
                        ? "bg-gradient-to-r from-accent-blue to-accent-indigo text-white shadow-md"
                        : "text-brand-text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {category.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Skills Progress Grid */}
              <div className="space-y-6">
                {content.skills[activeTab].skills.map((skill, sIdx) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-accent-blue">{skill.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: sIdx * 0.05 }}
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-indigo rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
