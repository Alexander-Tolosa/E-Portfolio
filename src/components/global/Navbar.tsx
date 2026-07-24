"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
            <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-zinc-300 transition-colors" />
            KIMZSEN<span className="text-zinc-400 font-light">.Dev</span>
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
                    ? "text-white"
                    : "text-brand-text-muted hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white to-zinc-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

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
                      ? "text-white"
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
