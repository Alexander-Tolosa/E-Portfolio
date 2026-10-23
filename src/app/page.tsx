"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { content } from "@/data/content";
import { TechBadge } from "@/components/ui/TechBadge";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import { SkillsModal } from "@/components/ui/SkillsModal";
import { CertificatesModal } from "@/components/ui/CertificatesModal";
import { Projects } from "@/sections/Projects";
import { GithubStreak } from "@/sections/GithubStreak";
import { MinimalFooter } from "@/components/layout/MinimalFooter";

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

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isCertsModalOpen, setIsCertsModalOpen] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[640px] md:max-w-[760px] lg:max-w-[860px] px-6 pb-10 pt-[84px] lg:pl-6 lg:pr-6 lg:pt-10">
      {/* 1. TOP ROW: AVATAR + NAME + VERIFIED BADGE + SOCIAL ICONS */}
      <div id="top" className="flex items-center gap-5 sm:gap-6 mb-7">
        <div data-no-sound="true" className="shrink-0">
          <InteractiveAvatar
            animeSrc={content.personalInfo.animeAvatarUrl}
            formalSrc={content.personalInfo.formalAvatarUrl}
            alt={content.personalInfo.name}
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {content.personalInfo.name}
            </h1>

            {/* Verified Blue Badge Icon */}
            <span
              title="Verified Developer"
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1D9BF0] text-white shadow-xs shrink-0"
            >
              <Check size={12} className="stroke-[3.5]" />
            </span>
          </div>

          {/* Social Icons (GitHub, LinkedIn, Email) */}
          <div className="flex items-center gap-2.5 text-brand-text-muted">
            <a
              href={content.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/[0.04]"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={content.personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/[0.04]"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={content.personalInfo.socials.email}
              className="hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/[0.04]"
              aria-label="Send Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. BIO PARAGRAPH WITH INLINE TECH BADGES */}
      <p
        id="about"
        className="scroll-mt-28 max-w-[640px] text-[15px] sm:text-[16px] text-brand-text-muted leading-[1.8] mb-6 font-normal select-text"
      >
        I&apos;m a Front-End Developer and UI/UX designer building performant web
        applications and modern user interfaces with{" "}
        <TechBadge name="React" />{" "}
        <TechBadge name="Next.js" />{" "}
        <TechBadge name="TypeScript" />{" "}
        <TechBadge name="Tailwind CSS" />{" "}
        with custom design systems and client work. Using my experience from
        Cascade Development Group and projects, I turn complex ideas into clean,
        easy-to-use screens that work perfectly.
      </p>

      {/* 4. VIEW RESUME BUTTON */}
      <div className="mb-8">
        <a
          href={content.personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all shadow-md group cursor-pointer"
        >
          <span>View Resume</span>
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* 5. CURRENT FOCUS BAR */}
      <div className="border-t border-brand-border" />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-[14px] text-brand-text-muted">Current focus</span>
        <span className="flex h-8 items-center gap-2 rounded-full border border-brand-border bg-brand-card px-3.5 text-[14px] font-medium text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Front-End Engineering
        </span>
        <span className="flex h-8 items-center gap-2 rounded-full border border-brand-border bg-brand-card px-3.5 text-[14px] font-medium text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          UI/UX &amp; Design Systems
        </span>
      </div>
      <div className="mt-8 border-t border-brand-border" />

      {/* 4. PARTNERS / AFFILIATIONS STRIP */}
      <div className="py-5 relative z-30">
        <p className="text-center text-[12px] font-semibold tracking-[0.25em] text-brand-text-muted uppercase mb-5 select-none">
          PARTNERS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {/* CDG */}
          <a
            href="https://cdg-official.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredPartner("cdg")}
            onMouseLeave={() => setHoveredPartner(null)}
            onFocus={() => setHoveredPartner("cdg")}
            onBlur={() => setHoveredPartner(null)}
            className="group relative inline-flex items-center justify-center cursor-pointer py-1"
          >
            <Image
              src="/assets/images/cdg_emblem.png"
              alt="Cascade Development Group"
              width={414}
              height={285}
              unoptimized
              className="h-8 sm:h-9 w-auto object-contain opacity-85 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
            />
            {/* Hover Tooltip */}
            <div
              className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 transition-all duration-200 ease-out ${
                hoveredPartner === "cdg"
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100"
              }`}
            >
              <div className="relative bg-[#181d26] text-white text-[12px] sm:text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-2xl border border-white/10 flex items-center justify-center">
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#181d26] border-t border-l border-white/10" />
                <span className="relative z-10 leading-none">Cascade Development Group</span>
              </div>
            </div>
          </a>

          {/* ITSA */}
          <a
            href="https://itsa-website-psi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredPartner("itsa")}
            onMouseLeave={() => setHoveredPartner(null)}
            onFocus={() => setHoveredPartner("itsa")}
            onBlur={() => setHoveredPartner(null)}
            className="group relative inline-flex items-center justify-center cursor-pointer py-1"
          >
            <Image
              src="/assets/images/itsa_emblem.png"
              alt="Information Technology Student Association"
              width={362}
              height={595}
              unoptimized
              className="h-9 sm:h-10 w-auto object-contain opacity-85 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
            />
            {/* Hover Tooltip */}
            <div
              className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 transition-all duration-200 ease-out ${
                hoveredPartner === "itsa"
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100"
              }`}
            >
              <div className="relative bg-[#181d26] text-white text-[12px] sm:text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-2xl border border-white/10 flex items-center justify-center">
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#181d26] border-t border-l border-white/10" />
                <span className="relative z-10 leading-none">Information Technology Student Association</span>
              </div>
            </div>
          </a>

          {/* Augustinian Developer Society (ADS) */}
          <Link
            href="/affiliations"
            onMouseEnter={() => setHoveredPartner("ads")}
            onMouseLeave={() => setHoveredPartner(null)}
            onFocus={() => setHoveredPartner("ads")}
            onBlur={() => setHoveredPartner(null)}
            className="group relative inline-flex items-center justify-center cursor-pointer py-1"
          >
            <Image
              src="/assets/images/ads_emblem.png"
              alt="Augustinian Developer Society"
              width={130}
              height={108}
              unoptimized
              className="h-8 sm:h-9 w-auto object-contain opacity-85 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
            />
            {/* Hover Tooltip */}
            <div
              className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 transition-all duration-200 ease-out ${
                hoveredPartner === "ads"
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100"
              }`}
            >
              <div className="relative bg-[#181d26] text-white text-[12px] sm:text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-2xl border border-white/10 flex items-center justify-center">
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#181d26] border-t border-l border-white/10" />
                <span className="relative z-10 leading-none">Augustinian Developer Society</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-brand-border" />

      {/* 5. EXPERIENCE SECTION */}
      <section id="experience" className="pt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[14px] font-medium text-brand-text-muted">Experience</h2>
        </div>

        <div className="flex flex-col gap-10">
          {/* CDG */}
          <div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[16px] text-foreground">
                  <span className="font-medium">Front-End Developer</span>
                  <span className="text-brand-text-muted">
                    {" "}· Cascade Development Group (CDG)
                  </span>
                </p>
                <p className="text-[14px] text-brand-text-muted">2026 – Present</p>
              </div>

              <ul className="mt-3 space-y-1.5">
                <li className="flex gap-2.5 text-[15px] leading-[1.65] text-foreground/80">
                  <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-text-muted" />
                  <span>
                    IT solutions startup delivering web development, database
                    architecture, and technical consulting to clients across the
                    Visayas, collaborating with a team across the full business
                    lifecycle from scoping to deployment.
                  </span>
                </li>
                <li className="flex gap-2.5 text-[15px] leading-[1.65] text-foreground/80">
                  <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-text-muted" />
                  <span>
                    Designed and built clean, modular front-end architectures using
                    React, Next.js, and TypeScript, delivering accessible and
                    high-performance web interfaces.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* PharmaTrack */}
          <div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[16px] text-foreground">
                  <span className="font-medium">Front-End Developer &amp; UI/UX Design</span>
                  <span className="text-brand-text-muted">
                    {" "}· PharmaTrack — University of San Agustin
                  </span>
                </p>
                <p className="text-[14px] text-brand-text-muted">2026</p>
              </div>

              <ul className="mt-3 space-y-1.5">
                <li className="flex gap-2.5 text-[15px] leading-[1.65] text-foreground/80">
                  <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-text-muted" />
                  <span>
                    Designed the user experience from scratch, mapping out intuitive
                    dashboard layouts, and translated those high-fidelity designs
                    into a responsive frontend for pharmacy student attendance monitoring.
                  </span>
                </li>
                <li className="flex gap-2.5 text-[15px] leading-[1.65] text-foreground/80">
                  <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-text-muted" />
                  <span>
                    Focused on state management and building clean, accessible UI
                    components with offline-first check-in capabilities.
                  </span>
                </li>
              </ul>
            </div>
          </div>


        </div>

        <div className="mt-6">
          <Link
            href="/experience"
            className="text-[14px] font-medium text-brand-text-muted hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>
      </section>

      {/* 6. PROJECTS SECTION */}
      <Projects />

      {/* 8. TOOLS I USE */}
      <section id="tools" className="pt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[14px] font-medium text-brand-text-muted">Tools I use</h2>
        </div>

        <div className="divide-y divide-brand-border">
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
            <p className="text-[15px] text-foreground">VS Code</p>
            <p className="text-[14px] text-brand-text-muted">Primary code editor</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
            <p className="text-[15px] text-foreground">Antigravity</p>
            <p className="text-[14px] text-brand-text-muted">Agentic IDE</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
            <p className="text-[15px] text-foreground">Figma &amp; Canva</p>
            <p className="text-[14px] text-brand-text-muted">UI/UX prototyping &amp; design</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
            <p className="text-[15px] text-foreground">Git &amp; GitHub</p>
            <p className="text-[14px] text-brand-text-muted">Version control &amp; workflows</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
            <p className="text-[15px] text-foreground">Supabase</p>
            <p className="text-[14px] text-brand-text-muted">PostgreSQL database &amp; backend</p>
          </div>
        </div>
      </section>

      {/* 9. STACK */}
      <section id="stack" className="pt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[14px] font-medium text-brand-text-muted">Stack</h2>
          <button
            type="button"
            onClick={() => setIsSkillsModalOpen(true)}
            className="text-[14px] font-medium text-brand-text-muted hover:text-foreground cursor-pointer transition-colors"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-brand-border">
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">Frontend</p>
            <p className="text-[15px] text-foreground">
              React, TypeScript, Next.js, Tailwind CSS, HTML5, CSS3, Shadcn UI, JavaScript, Framer Motion, GSAP, Vite
            </p>
          </div>
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">Backend</p>
            <p className="text-[15px] text-foreground">
              Python, Java, Spring Boot, PostgreSQL, MySQL
            </p>
          </div>
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">Devops &amp; Cloud</p>
            <p className="text-[15px] text-foreground">
              GitHub Actions, Vercel
            </p>
          </div>
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">AI &amp; Automation</p>
            <p className="text-[15px] text-foreground">
              Anthropic Claude API, Prompt Engineering, AI Fluency
            </p>
          </div>
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">CMS &amp; No-Code</p>
            <p className="text-[15px] text-foreground">
              WordPress
            </p>
          </div>
          <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4">
            <p className="text-[14px] text-brand-text-muted">Developer Tools</p>
            <p className="text-[15px] text-foreground">
              Git, GitHub, VS Code, Supabase, Vercel, Canva, Antigravity, Discord, Teams, Viber
            </p>
          </div>
        </div>
      </section>

      {/* 10. CERTIFICATIONS */}
      <section id="certifications" className="pt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[14px] font-medium text-brand-text-muted">
            Certifications
          </h2>
          <button
            type="button"
            onClick={() => setIsCertsModalOpen(true)}
            className="text-[14px] font-medium text-brand-text-muted hover:text-foreground cursor-pointer transition-colors"
          >
            View all (08)
          </button>
        </div>

        <div className="divide-y divide-brand-border">
          {content.certifications.slice(0, 4).map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-foreground truncate">
                  {cert.title}
                </p>
                <p className="text-[13px] text-brand-text-muted mt-0.5">
                  {cert.issuer}
                </p>
              </div>
              <span className="text-[13px] text-brand-text-muted shrink-0">
                {cert.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 11. GITHUB HEATMAP / STREAK */}
      <section id="github" className="pt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[14px] font-medium text-brand-text-muted">GitHub</h2>
          <a
            href="https://github.com/Alexander-Tolosa"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[14px] font-medium text-brand-text-muted transition-colors hover:text-foreground"
          >
            <span>@Alexander-Tolosa</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
        <GithubStreak />
      </section>

      {/* 12. MINIMAL FOOTER */}
      <MinimalFooter />

      {/* Modals */}
      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        skillCategories={content.skills}
      />
      <CertificatesModal
        isOpen={isCertsModalOpen}
        onClose={() => setIsCertsModalOpen(false)}
        certifications={content.certifications}
      />
    </div>
  );
}
