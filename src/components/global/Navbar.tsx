"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = ["hero", "about", "projects", "contact"];
  const activeSection = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Helper to handle smooth click scroll
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-brand-border/60 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md py-3.5"
            : "bg-background/40 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Name / Initials */}
          <Link
            href="/"
            onClick={(e) => handleScrollClick(e, "hero")}
            className="text-base font-bold tracking-wider text-foreground flex items-center gap-2 cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-full bg-foreground text-background text-xs font-mono font-bold flex items-center justify-center group-hover:scale-105 transition-transform">
              AT
            </span>
            <span className="font-semibold tracking-tight text-foreground text-sm sm:text-base">
              Alexander<span className="text-brand-text-muted font-normal">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleScrollClick(e, item.id)}
                className={`text-sm font-medium transition-all cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? "text-foreground font-semibold"
                    : "text-brand-text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Desktop Theme & Sound Toggles */}
            <div className="pl-3 border-l border-brand-border flex items-center gap-2">
              <SoundToggle />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Actions (Sound Toggle, Theme Toggle & Menu Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <SoundToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-text-muted hover:text-foreground p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[73px] z-40 bg-brand-dark/95 backdrop-blur-lg border-b border-brand-border md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-73px)] gap-8 p-6">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.id)}
                  className={`text-2xl font-bold tracking-tight ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-brand-text-muted"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
