"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Check,
  Copy,
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
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ContactModal } from "./ContactModal";

export type NavItem = {
  label: string;
  href: string;
  count?: string;
  locked?: boolean;
};

type NavGroup = { title: string; items: NavItem[] };

export const groups: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Affiliations", href: "/affiliations", count: "03" },
      { label: "Hackathons", href: "/hackathons", count: "01" },
      { label: "Links", href: "/#contact", count: "05" },
    ],
  },
  {
    title: "Work with me",
    items: [{ label: "Services", href: "/#experience", count: "02" }],
  },
  {
    title: "Portfolio",
    items: [
      { label: "More about me", href: "#", locked: true },
      { label: "Projects", href: "/#projects", count: "02" },
      { label: "Stack", href: "/#stack", count: "20" },
      { label: "Certifications", href: "/#certifications", count: "09" },
    ],
  },
];

export const themeOptions = [
  { mode: "system", label: "System theme", Icon: Monitor },
  { mode: "light", label: "Light theme", Icon: Sun },
  { mode: "dark", label: "Dark theme", Icon: Moon },
] as const;

// Page order of the sections the sidebar links to.
export const spyIds = ["experience", "projects", "stack", "certifications"];

export function useManilaClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Sidebar() {
  const pathname = usePathname();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { themeMode, setThemeMode } = useTheme();
  const { soundEnabled, toggleSound } = useSound();
  const time = useManilaClock();
  const spyId = useScrollSpy(spyIds, 160);
  const email = content.personalInfo.socials.email.replace("mailto:", "");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = content.personalInfo.socials.email;
    }
  };

  const isActive = (item: NavItem) => {
    if (item.locked) return false;
    if (item.href.startsWith("/#")) {
      return pathname === "/" && item.href === `/#${spyId}`;
    }
    return pathname === item.href;
  };

  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const rowBase =
    "group relative flex h-10 items-center rounded-r-xl pl-4 pr-3 text-[14.5px] font-medium transition-all duration-200 " +
    "[background-image:radial-gradient(120px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--sidebar-accent)_14%,transparent),transparent_70%)] " +
    "[background-repeat:no-repeat] [background-size:0%_100%] hover:[background-size:100%_100%]";

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-brand-border bg-brand-card lg:flex select-none">
        {/* Brand + live status */}
        <div className="px-5 pt-4 pb-3">
          <Link
            href="/"
            className="text-[15.5px] font-medium text-foreground hover:opacity-80 transition-opacity"
          >
            {content.personalInfo.name}
          </Link>
          <p className="mt-1 flex items-center gap-2 font-mono text-[11px] text-brand-text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sidebar-accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sidebar-accent)]" />
            </span>
            Available
            {time && <span className="opacity-70">· {time} PHT</span>}
          </p>
        </div>

        {/* Say hello + copy email */}
        <div className="px-3">
          <div className="flex h-[46px] items-center rounded-full border border-brand-border bg-white/[0.03] pr-1.5 shadow-xs transition-colors hover:bg-white/[0.06]">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="flex h-full flex-1 items-center gap-2 pl-4 text-[15px] font-medium text-foreground cursor-pointer"
            >
              <Mail size={16} strokeWidth={1.75} />
              <span>Say hello</span>
            </button>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              title={copied ? "Copied!" : email}
              className="flex h-8 w-8 items-center justify-center rounded-full text-brand-text-muted transition-colors hover:bg-white/[0.08] hover:text-foreground cursor-pointer"
            >
              {copied ? (
                <Check size={14} strokeWidth={2} className="text-[var(--sidebar-accent)]" />
              ) : (
                <Copy size={14} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* Timeline index */}
        <nav
          aria-label="Section links"
          className="mt-4 flex-1 overflow-y-auto px-3 pb-3 space-y-4 custom-scrollbar"
        >
          {groups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-brand-text-muted/70">
                <span className="text-[var(--sidebar-accent)]">§</span> {group.title}
              </p>
              <ul className="relative ml-[17px]">
                {group.items.map((item) => {
                  const active = isActive(item);

                  const body = (
                    <>
                      {/* Rail node */}
                      <span
                        aria-hidden
                        className={`absolute -left-[4.5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
                          item.locked
                            ? "border-dashed border-brand-text-muted/40 bg-brand-card"
                            : active
                              ? "scale-125 border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                              : "border-brand-text-muted/50 bg-brand-card group-hover:border-[var(--sidebar-accent)]"
                        }`}
                      />
                      <span className="shrink-0">{item.label}</span>
                      {item.locked ? (
                        <>
                          <span className="flex-1" />
                          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-brand-text-muted/60 group-hover:inline mr-1.5">
                            soon
                          </span>
                          <Lock size={12} strokeWidth={2} className="shrink-0 text-brand-text-muted/50" />
                        </>
                      ) : (
                        <>
                          <span
                            aria-hidden
                            className="mx-2 mt-2 h-px flex-1 border-b border-dotted border-brand-text-muted/25"
                          />
                          <span
                            className={`font-mono text-[11.5px] tabular-nums transition-colors ${
                              active ? "text-[var(--sidebar-accent)]" : "text-brand-text-muted/70"
                            }`}
                          >
                            {item.count}
                          </span>
                        </>
                      )}
                    </>
                  );

                  return (
                    <li key={item.label} onMouseMove={handleSpotlight}>
                      {item.locked ? (
                        <div
                          className={`${rowBase} cursor-not-allowed text-foreground/35`}
                          title="Coming soon"
                        >
                          {body}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`${rowBase} hover:translate-x-0.5 ${
                            active
                              ? "text-foreground font-semibold"
                              : "text-foreground/85 hover:text-foreground"
                          }`}
                        >
                          {body}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom: theme + sound */}
        <div className="border-t border-brand-border px-5 py-4 bg-brand-card/30 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative inline-flex items-center p-1 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-brand-border shadow-inner">
              {themeOptions.map(({ mode, label, Icon }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={(e) => setThemeMode(mode, e)}
                  aria-label={label}
                  title={label}
                  className="relative flex h-6.5 w-6.5 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {themeMode === mode && (
                    <motion.div
                      layoutId="activeThemeCapsule"
                      className="absolute inset-0 rounded-full bg-white dark:bg-white/[0.18] shadow-xs dark:shadow-inner border border-black/5 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
                    />
                  )}
                  <Icon
                    size={13.5}
                    strokeWidth={1.8}
                    className={`relative z-10 transition-colors ${
                      themeMode === mode ? "text-zinc-900 dark:text-white" : ""
                    }`}
                  />
                </button>
              ))}
            </div>

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

          <p className="font-mono text-[11px] leading-[1.5] text-brand-text-muted">
            Projects, collabs &amp; everything in between.
          </p>

          <a
            href={content.personalInfo.socials.email}
            className="group flex items-center gap-2 font-mono text-[12px] text-foreground/90 hover:text-foreground transition-colors"
          >
            <Mail
              size={14}
              strokeWidth={1.8}
              className="shrink-0 text-brand-text-muted group-hover:text-foreground transition-colors"
            />
            <span className="truncate hover:underline underline-offset-4">{email}</span>
          </a>
        </div>
      </aside>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
