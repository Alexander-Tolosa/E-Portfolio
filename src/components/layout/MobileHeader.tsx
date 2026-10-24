"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Mail, Copy, Check, Lock, Volume2, VolumeX } from "lucide-react";
import { content } from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ContactModal } from "./ContactModal";
import { groups, themeOptions, spyIds, useManilaClock, type NavItem } from "./Sidebar";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const { themeMode, setThemeMode } = useTheme();
  const { soundEnabled, toggleSound } = useSound();
  const time = useManilaClock();
  const spyId = useScrollSpy(spyIds, 160);
  const email = content.personalInfo.socials.email.replace("mailto:", "");

  const close = () => setIsOpen(false);

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-brand-border bg-brand-card/90 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-md lg:hidden">
        <Link
          href="/"
          onClick={close}
          className="text-[15.5px] font-medium text-foreground tracking-tight"
        >
          {content.personalInfo.name}
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-foreground active:bg-white/[0.08] transition-colors cursor-pointer touch-manipulation"
        >
          <Menu size={18} />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="absolute inset-y-0 right-0 flex w-[min(86vw,340px)] flex-col border-l border-brand-border bg-brand-card select-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
                <div>
                  <p className="text-[15.5px] font-medium text-foreground">
                    {content.personalInfo.name}
                  </p>
                  <p className="mt-1 flex items-center gap-2 font-mono text-[11px] text-brand-text-muted">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sidebar-accent)] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sidebar-accent)]" />
                    </span>
                    Available
                    {time && <span className="opacity-70">· {time} PHT</span>}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-foreground active:bg-white/[0.08] cursor-pointer touch-manipulation"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Say hello + copy */}
              <div className="px-3">
                <div className="flex h-12 items-center rounded-full border border-brand-border bg-white/[0.03] pr-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      setIsContactOpen(true);
                    }}
                    className="flex h-full flex-1 items-center gap-2 pl-4 text-[15px] font-medium text-foreground cursor-pointer touch-manipulation"
                  >
                    <Mail size={16} strokeWidth={1.75} />
                    <span>Say hello</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-brand-text-muted active:bg-white/[0.08] cursor-pointer touch-manipulation"
                  >
                    {copied ? (
                      <Check size={15} strokeWidth={2} className="text-[var(--sidebar-accent)]" />
                    ) : (
                      <Copy size={15} strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>

              {/* Timeline index */}
              <nav
                aria-label="Section links"
                className="mt-4 flex-1 overflow-y-auto overscroll-contain px-3 pb-3 space-y-4"
              >
                {groups.map((group) => (
                  <div key={group.title}>
                    <p className="px-3 pb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-brand-text-muted/70">
                      <span className="text-[var(--sidebar-accent)]">§</span> {group.title}
                    </p>
                    <ul className="ml-[17px]">
                      {group.items.map((item) => {
                        const active = isActive(item);
                        const row =
                          "relative flex h-12 items-center rounded-r-xl pl-4 pr-3 text-[15px] font-medium transition-colors touch-manipulation";
                        const node = (
                          <span
                            aria-hidden
                            className={`absolute -left-[4.5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border ${
                              item.locked
                                ? "border-dashed border-brand-text-muted/40 bg-brand-card"
                                : active
                                  ? "scale-125 border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                                  : "border-brand-text-muted/50 bg-brand-card"
                            }`}
                          />
                        );

                        return (
                          <li key={item.label}>
                            {item.locked ? (
                              <div className={`${row} text-foreground/35`}>
                                {node}
                                <span className="flex-1">{item.label}</span>
                                <Lock size={13} strokeWidth={2} className="text-brand-text-muted/50" />
                              </div>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={close}
                                aria-current={active ? "page" : undefined}
                                className={`${row} active:bg-white/[0.06] ${
                                  active ? "text-foreground font-semibold" : "text-foreground/85"
                                }`}
                              >
                                {node}
                                <span className="shrink-0">{item.label}</span>
                                <span
                                  aria-hidden
                                  className="mx-2 mt-2 h-px flex-1 border-b border-dotted border-brand-text-muted/25"
                                />
                                <span
                                  className={`font-mono text-[12px] tabular-nums ${
                                    active ? "text-[var(--sidebar-accent)]" : "text-brand-text-muted/70"
                                  }`}
                                >
                                  {item.count}
                                </span>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Bottom: theme, sound, email */}
              <div className="flex flex-col gap-3 border-t border-brand-border px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="flex items-center gap-2.5">
                  <div className="relative inline-flex items-center rounded-full border border-brand-border bg-white/[0.04] p-1">
                    {themeOptions.map(({ mode, label, Icon }) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={(e) => setThemeMode(mode, e)}
                        aria-label={label}
                        className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 cursor-pointer touch-manipulation"
                      >
                        {themeMode === mode && (
                          <motion.div
                            layoutId="mobileThemeCapsule"
                            className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.18]"
                            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
                          />
                        )}
                        <Icon
                          size={15}
                          strokeWidth={1.8}
                          className={`relative z-10 ${themeMode === mode ? "text-white" : ""}`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white/[0.04] text-zinc-400 cursor-pointer touch-manipulation"
                  >
                    {soundEnabled ? (
                      <Volume2 size={15} strokeWidth={1.8} />
                    ) : (
                      <VolumeX size={15} strokeWidth={1.8} />
                    )}
                  </button>
                </div>

                <a
                  href={content.personalInfo.socials.email}
                  className="flex items-center gap-2 font-mono text-[12.5px] text-foreground/90"
                >
                  <Mail size={14} strokeWidth={1.8} className="shrink-0 text-brand-text-muted" />
                  <span className="truncate">{email}</span>
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
