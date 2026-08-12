"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutGrid } from "lucide-react";
import { SkillCategory } from "@/data/content";
import { TechBadge } from "@/components/ui/TechBadge";

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillCategories: SkillCategory[];
}

export function SkillsModal({ isOpen, onClose, skillCategories }: SkillsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/85 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Window matching reference image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
          className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl glass border border-brand-border shadow-2xl z-10 flex flex-col p-6 sm:p-8 overflow-hidden select-text"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass border border-brand-border text-brand-text-muted hover:text-foreground transition-all cursor-pointer shadow-md select-none"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-8 select-text">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid size={20} className="text-foreground/80 shrink-0" />
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-mono select-text cursor-text">
                Skillset and Tools
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-brand-text-muted font-mono leading-relaxed select-text cursor-text">
              The tools, frameworks, and platforms I reach for across the front end, back end, infrastructure, and AI.
            </p>
          </div>

          {/* Categorized Skills Grid */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-7 no-scrollbar select-text">
            {skillCategories.map((category) => {
              if (!category.skills || category.skills.length === 0) return null;

              return (
                <div key={category.name} className="space-y-3 select-text">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-text-muted/80 select-text cursor-text">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 select-text">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass border border-brand-border/80 hover:border-foreground/40 transition-all text-xs font-mono font-medium text-foreground select-text cursor-text"
                      >
                        <TechBadge name={skill.name} className="!border-0 !bg-transparent !p-0 !m-0 select-text cursor-text" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
