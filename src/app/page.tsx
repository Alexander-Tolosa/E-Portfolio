"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IntroScreen } from "@/components/global/IntroScreen";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <>
      {!introCompleted && <IntroScreen onComplete={() => setIntroCompleted(true)} />}

      {/* Main landing container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: introCompleted ? 1 : 0, y: introCompleted ? 0 : 15 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative"
      >
        {/* Decorative vertical lines on sides of the page for high-tech premium aesthetics */}
        <div className="fixed top-0 left-12 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block pointer-events-none" />
        <div className="fixed top-0 right-12 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block pointer-events-none" />

        {/* Main Sections stack */}
        <Hero />
        <About />
        <Projects />
        <Contact />
      </motion.div>
    </>
  );
}
