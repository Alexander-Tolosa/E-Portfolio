"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { content } from "@/data/content";

export function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const sectionIds = ["hero", "about", "skills", "experience", "projects", "contact"];
  const activeSection = useScrollSpy(sectionIds, 130);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile island when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/#hero", id: "hero" },
    { label: "About", href: "/#about", id: "about" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  // Helper to handle smooth click scroll or route to home sections
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();

      // For "Home" / hero, always scroll to the very top
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const offset = 90; // height of floating dynamic island + margin
        const absoluteTop = window.scrollY + element.getBoundingClientRect().top;
        window.scrollTo({
          top: Math.max(0, absoluteTop - offset),
          behavior: "smooth",
        });
      }
    } else {
      e.preventDefault();
      router.push(`/#${id}`);
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleScrollClick(e, "contact");
  };

  const currentActive = activeSection || "hero";

  return (
    <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4">
      <motion.div
        ref={navRef}
        layout
        initial={{ y: -30, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
        className={`pointer-events-auto transition-all duration-300 backdrop-blur-2xl ${
          isOpen
            ? isDark
              ? "w-[94vw] max-w-sm rounded-3xl p-3.5 sm:p-4 bg-[#08090d]/95 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white"
              : "w-[94vw] max-w-sm rounded-3xl p-3.5 sm:p-4 bg-white/95 border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-neutral-900"
            : isDark
              ? "w-[94vw] max-w-[940px] md:w-[940px] h-[58px] rounded-full px-3 sm:px-4 bg-[#08090d]/90 border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.7)] text-white flex items-center justify-between"
              : "w-[94vw] max-w-[940px] md:w-[940px] h-[58px] rounded-full px-3 sm:px-4 bg-white/85 border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-neutral-900 flex items-center justify-between"
        }`}
      >
        {/* Main Bar Content */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Brand with Avatar */}
          <Link
            href="/#hero"
            onClick={(e) => handleScrollClick(e, "hero")}
            className="flex items-center gap-2.5 group cursor-pointer select-none pl-1 flex-shrink-0"
          >
            <div className={`relative w-9 h-9 rounded-full overflow-hidden border shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200 ${
              isDark ? "border-white/25 bg-neutral-900" : "border-neutral-200/80 bg-neutral-100"
            }`}>
              <img
                src="/icon.png"
                alt={content.personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`font-bold tracking-tight text-[15px] transition-colors ${
              isDark ? "text-white group-hover:text-white/90" : "text-neutral-900 group-hover:text-neutral-700"
            }`}>
              Alexander
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-transparent"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => {
              const isActive = currentActive === item.id && pathname === "/";
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-colors select-none cursor-pointer ${
                    isActive
                      ? isDark
                        ? "text-white font-semibold"
                        : "text-neutral-950 font-semibold"
                      : isDark
                        ? "text-neutral-400 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-950"
                  }`}
                >
                  {/* Hover background */}
                  {hoveredTab === item.id && !isActive && (
                    <motion.div
                      layoutId="island-nav-hover"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isDark ? "bg-white/10" : "bg-neutral-100/80"
                      }`}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  {/* Active highlight pill */}
                  {isActive && (
                    <motion.div
                      layoutId="island-nav-active"
                      className={`absolute inset-0 rounded-full shadow-2xs border -z-10 ${
                        isDark
                          ? "bg-[#1c1d24] border-white/15 text-white"
                          : "bg-neutral-100/90 border-neutral-200/80 text-neutral-950"
                      }`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Toggles & CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Desktop Theme & Sound Toggles */}
            <div className="hidden sm:flex items-center gap-1.5">
              <SoundToggle size="sm" className={isDark ? "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:border-white/30" : "bg-neutral-100/80 border-neutral-200/80 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300"} />
              <ThemeToggle size="sm" className={isDark ? "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:border-white/30" : "bg-neutral-100/80 border-neutral-200/80 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300"} />
            </div>

            {/* CTA Button "Book a Call" */}
            <a
              href="/#contact"
              onClick={handleCtaClick}
              style={{ backgroundColor: "#5b52f9" }}
              className="relative group hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white hover:opacity-95 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(91,82,249,0.45)] hover:shadow-[0_0_28px_rgba(91,82,249,0.7)] cursor-pointer select-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book a Call
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <ThemeToggle size="sm" className={isDark ? "bg-white/5 border-white/10 text-neutral-300" : "bg-neutral-100/80 border-neutral-200/80 text-neutral-600"} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer focus:outline-none transition-transform active:scale-90 ${
                  isDark ? "bg-white/5 border-white/10 text-white" : "bg-neutral-100/80 border-neutral-200/80 text-neutral-800"
                }`}
                aria-label="Toggle Navigation Island"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Expanded Menu Island */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden w-full"
            >
              <div className="pt-4 pb-1 flex flex-col gap-2.5">
                {/* Mobile Navigation Links */}
                <div className={`flex flex-col gap-1 p-1.5 rounded-2xl border ${
                  isDark ? "bg-black/40 border-white/10" : "bg-neutral-100/80 border-neutral-200/80"
                }`}>
                  {navItems.map((item, idx) => {
                    const isActive = currentActive === item.id && pathname === "/";
                    return (
                      <motion.a
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        href={item.href}
                        onClick={(e) => handleScrollClick(e, item.id)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? isDark
                              ? "bg-[#1c1d24] text-white font-semibold shadow-xs border border-white/10"
                              : "bg-white text-neutral-950 font-semibold shadow-2xs border border-neutral-200/80"
                            : isDark
                              ? "text-neutral-400 hover:text-white hover:bg-white/5"
                              : "text-neutral-600 hover:text-neutral-950 hover:bg-white/60"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5b52f9]" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile Bottom Controls & CTA */}
                <div className="pt-2 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <SoundToggle size="sm" className={isDark ? "bg-white/5 border-white/10 text-neutral-300" : "bg-neutral-100/80 border-neutral-200/80 text-neutral-600"} />
                    <span className={`text-xs font-medium ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Sound Effects</span>
                  </div>

                  <a
                    href="/#contact"
                    onClick={handleCtaClick}
                    style={{ backgroundColor: "#5b52f9" }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white hover:opacity-95 active:scale-95 transition-all shadow-[0_0_18px_rgba(91,82,249,0.45)]"
                  >
                    <span>Book a Call</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
