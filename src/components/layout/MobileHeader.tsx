"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Mail,
  UsersRound,
  Link as LinkIcon,
  Briefcase,
  User,
  LayoutGrid,
  Layers,
  Award,
  Lock,
} from "lucide-react";
import { content } from "@/data/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ContactModal } from "./ContactModal";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Affiliations", href: "/affiliations", icon: UsersRound, count: "03" },
    { label: "Projects", href: "/#projects", icon: LayoutGrid, count: "02" },
    { label: "Experience", href: "/#experience", icon: Briefcase, count: "02" },
    { label: "Stack & Skills", href: "/#stack", icon: Layers, count: "20" },
    { label: "Certifications", href: "/#certifications", icon: Award, count: "08" },
    { label: "More about me", href: "#", icon: User, locked: true },
    { label: "Links & Socials", href: "/#contact", icon: LinkIcon, count: "05" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-brand-border bg-brand-card/90 px-4 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="text-[15.5px] font-medium text-foreground tracking-tight"
        >
          {content.personalInfo.name}
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" className="w-8 h-8" />
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-foreground hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-brand-dark/95 backdrop-blur-xl lg:hidden flex flex-col p-6 animate-in slide-in-from-top-4 duration-200 overflow-y-auto">
          {/* Quick Contact Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsContactOpen(true);
            }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-border bg-white/[0.05] text-sm font-medium text-foreground mb-6"
          >
            <Mail size={16} />
            <span>Contact Alexander</span>
          </button>

          {/* Links list */}
          <div className="space-y-1 flex-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              if (item.locked) {
                return (
                  <div
                    key={item.label}
                    className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-foreground/35 cursor-not-allowed select-none"
                    title="Coming soon"
                  >
                    <Icon size={16} className="text-brand-text-muted/40 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    <Lock size={13} className="text-brand-text-muted/40 shrink-0" />
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-foreground font-semibold"
                      : "text-brand-text-muted hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon size={16} className="text-brand-text-muted shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <span className="text-xs text-brand-text-muted/60">{item.count}</span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-brand-border text-xs text-brand-text-muted flex justify-between items-center">
            <span>GMT+8 Iloilo, Philippines</span>
            <span>&copy; {new Date().getFullYear()} Alexander Tolosa</span>
          </div>
        </div>
      )}

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
