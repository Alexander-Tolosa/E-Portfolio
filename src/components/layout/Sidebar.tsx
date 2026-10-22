"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Link as LinkIcon,
  UsersRound,
  Briefcase,
  User,
  LayoutGrid,
  Layers,
  Award,
  Lock,
  Monitor,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { content } from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { ContactModal } from "./ContactModal";



export function Sidebar() {
  const pathname = usePathname();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { themeMode, setThemeMode } = useTheme();
  const { soundEnabled, toggleSound } = useSound();

  const exploreLinks = [
    { label: "Affiliations", href: "/affiliations", icon: UsersRound, count: "03" },
    { label: "Links", href: "/#contact", icon: LinkIcon, count: "05" },
  ];

  const workLinks = [
    { label: "Services", href: "/#experience", icon: Briefcase, count: "02" },
  ];

  const portfolioLinks = [
    { label: "More about me", href: "#", icon: User, locked: true },
    { label: "Projects", href: "/#projects", icon: LayoutGrid, count: "02" },
    { label: "Stack", href: "/#stack", icon: Layers, count: "20" },
    { label: "Certifications", href: "/#certifications", icon: Award, count: "08" },
  ];

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-brand-border bg-brand-card lg:flex select-none">
        {/* Sidebar Brand Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <Link
            href="/"
            className="text-[15.5px] font-medium text-foreground hover:opacity-80 transition-opacity"
          >
            {content.personalInfo.name}
          </Link>
        </div>

        {/* Contact Pill Button */}
        <div className="px-3">
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="flex h-[46px] w-full items-center gap-2 rounded-full px-4 text-[15px] font-medium text-foreground border border-brand-border bg-white/[0.03] hover:bg-white/[0.08] transition-colors shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <Mail size={16} strokeWidth={1.75} />
            <span>Contact</span>
          </button>
        </div>

        {/* Navigation Categories */}
        <nav
          aria-label="Section links"
          className="mt-3 flex-1 overflow-y-auto px-2 pb-3 space-y-3 custom-scrollbar"
        >
          {/* Explore Category */}
          <div>
            <p className="px-3 pb-1.5 pt-2 text-[12px] font-medium text-brand-text-muted/70">
              Explore
            </p>
            {exploreLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex h-10 items-center gap-2.5 rounded-xl px-3 text-[14.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-foreground font-semibold"
                      : "text-foreground/90 hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} className="shrink-0 text-brand-text-muted" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.count && (
                    <span className="text-[12px] font-medium text-brand-text-muted/60">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Section Divider */}
          <div className="my-2.5 border-t border-brand-border mx-2" />

          {/* Work with me Category */}
          <div>
            <p className="px-3 pb-1.5 pt-1 text-[12px] font-medium text-brand-text-muted/70">
              Work with me
            </p>
            {workLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex h-10 items-center gap-2.5 rounded-xl px-3 text-[14.5px] font-medium text-foreground/90 transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  <Icon size={16} strokeWidth={1.75} className="shrink-0 text-brand-text-muted" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.count && (
                    <span className="text-[12px] font-medium text-brand-text-muted/60">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Section Divider */}
          <div className="my-2.5 border-t border-brand-border mx-2" />

          {/* Portfolio Category */}
          <div>
            <p className="px-3 pb-1.5 pt-1 text-[12px] font-medium text-brand-text-muted/70">
              Portfolio
            </p>
            {portfolioLinks.map((item) => {
              const Icon = item.icon;
              if (item.locked) {
                return (
                  <div
                    key={item.label}
                    className="flex h-10 items-center gap-2.5 rounded-xl px-3 text-[14.5px] font-medium text-foreground/35 cursor-not-allowed select-none"
                    title="Coming soon"
                  >
                    <Icon size={16} strokeWidth={1.75} className="shrink-0 text-brand-text-muted/40" />
                    <span className="flex-1 truncate">{item.label}</span>
                    <Lock size={13} strokeWidth={2} className="shrink-0 text-brand-text-muted/40" />
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex h-10 items-center gap-2.5 rounded-xl px-3 text-[14.5px] font-medium text-foreground/90 transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  <Icon size={16} strokeWidth={1.75} className="shrink-0 text-brand-text-muted" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.count && (
                    <span className="text-[12px] font-medium text-brand-text-muted/60">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Bottom Footer: Theme capsule, Sound toggle, Paraphrased inquiry text, Email */}
        <div className="border-t border-brand-border px-5 py-4 bg-brand-card/30 flex flex-col gap-3">
          {/* Controls row: Theme Capsule + Sound Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Capsule (System, Light, Dark) */}
            <div className="relative inline-flex items-center p-1 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-brand-border shadow-inner">
              <button
                type="button"
                onClick={(e) => setThemeMode("system", e)}
                aria-label="System theme"
                title="System theme"
                className="relative flex h-6.5 w-6.5 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {themeMode === "system" && (
                  <motion.div
                    layoutId="activeThemeCapsule"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/[0.18] shadow-xs dark:shadow-inner border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
                  />
                )}
                <Monitor
                  size={13.5}
                  strokeWidth={1.8}
                  className={`relative z-10 transition-colors ${
                    themeMode === "system" ? "text-zinc-900 dark:text-white" : ""
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={(e) => setThemeMode("light", e)}
                aria-label="Light theme"
                title="Light theme"
                className="relative flex h-6.5 w-6.5 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {themeMode === "light" && (
                  <motion.div
                    layoutId="activeThemeCapsule"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/[0.18] shadow-xs dark:shadow-inner border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
                  />
                )}
                <Sun
                  size={13.5}
                  strokeWidth={1.8}
                  className={`relative z-10 transition-colors ${
                    themeMode === "light" ? "text-zinc-900 dark:text-white" : ""
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={(e) => setThemeMode("dark", e)}
                aria-label="Dark theme"
                title="Dark theme"
                className="relative flex h-6.5 w-6.5 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {themeMode === "dark" && (
                  <motion.div
                    layoutId="activeThemeCapsule"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/[0.18] shadow-xs dark:shadow-inner border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
                  />
                )}
                <Moon
                  size={13.5}
                  strokeWidth={1.8}
                  className={`relative z-10 transition-colors ${
                    themeMode === "dark" ? "text-zinc-900 dark:text-white" : ""
                  }`}
                />
              </button>
            </div>

            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
              title={soundEnabled ? "Mute audio" : "Unmute audio"}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-black/10 dark:border-brand-border bg-black/5 dark:bg-white/[0.04] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 size={14} strokeWidth={1.8} />
              ) : (
                <VolumeX size={14} strokeWidth={1.8} />
              )}
            </button>
          </div>

          {/* Rephrased inquiry text */}
          <p className="text-[13px] leading-[1.38] text-brand-text-muted">
            For projects, collabs &amp; everything
            <br />
            in between, reach me at
          </p>

          {/* Email row with mail icon */}
          <a
            href={content.personalInfo.socials.email}
            className="group flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors font-mono text-[12px] truncate"
          >
            <Mail
              size={14}
              strokeWidth={1.8}
              className="shrink-0 text-brand-text-muted group-hover:text-foreground transition-colors"
            />
            <span className="truncate hover:underline underline-offset-4">
              {content.personalInfo.socials.email.replace("mailto:", "")}
            </span>
          </a>
        </div>
      </aside>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
