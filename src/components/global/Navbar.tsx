"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Name */}
          <Link
            href="/"
            onClick={(e) => handleScrollClick(e, "hero")}
            className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-blue group-hover:bg-accent-cyan transition-colors" />
            KIMZSEN<span className="text-accent-blue font-light">.Dev</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleScrollClick(e, item.id)}
                className={`text-sm font-medium transition-all cursor-pointer relative py-1.5 ${
                  activeSection === item.id
                    ? "text-accent-blue"
                    : "text-brand-text-muted hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-indigo"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Call to action (Direct Email Link) */}
          <div className="hidden md:block">
            <a
              href={content.personalInfo.socials.email}
              className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all cursor-pointer"
            >
              {"Let's Talk"}
              <ArrowUpRight size={16} className="opacity-60" />
            </a>
          </div>

          {/* Mobile menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-text-muted hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            className="fixed inset-0 top-[73px] z-40 bg-brand-dark/95 backdrop-blur-lg border-b border-white/5 md:hidden"
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
                      ? "text-accent-blue"
                      : "text-brand-text-muted"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                href={content.personalInfo.socials.email}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold shadow-lg text-lg"
              >
                {"Let's Talk"}
                <ArrowUpRight size={20} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
