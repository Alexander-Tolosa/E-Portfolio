"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference or default to dark
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    let initialTheme: Theme = "dark";

    if (storedTheme === "light" || storedTheme === "dark") {
      initialTheme = storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      initialTheme = "light";
    }

    setThemeState(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
  };

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    // 1. Fallback for browsers without View Transitions API or users with reduced motion
    if (
      typeof document === "undefined" ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(nextTheme);
      return;
    }

    // 2. Get click/tap coordinates without layout thrashing
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e && typeof e.clientX === "number" && typeof e.clientY === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    } else if (e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // 3. Calculate distance to furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 4. Suppress CSS element transitions temporarily for 60fps performance
    document.documentElement.classList.add("theme-transitioning");

    // 5. Start View Transition without blocking React main thread
    const transition = document.startViewTransition(() => {
      applyTheme(nextTheme);
    });

    const cleanup = () => {
      document.documentElement.classList.remove("theme-transitioning");
    };

    // 6. Animate circular clip-path on new layer once ready
    transition.ready
      .then(() => {
        const isMobile = window.innerWidth <= 768;
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: isMobile ? 320 : 400,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        animation.onfinish = cleanup;
        animation.oncancel = cleanup;
      })
      .catch(cleanup);

    transition.finished.then(cleanup).catch(cleanup);
  };

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "dark", setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
