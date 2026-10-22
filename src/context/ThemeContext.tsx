"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";
export type ThemeMode = "system" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setTheme: (theme: Theme, e?: React.MouseEvent<any> | MouseEvent) => void;
  setThemeMode: (mode: ThemeMode, e?: React.MouseEvent<any> | MouseEvent) => void;
  toggleTheme: (e?: React.MouseEvent<any> | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    let initialMode: ThemeMode = "dark";
    if (storedMode === "system" || storedMode === "light" || storedMode === "dark") {
      initialMode = storedMode;
    } else if (storedTheme === "light" || storedTheme === "dark") {
      initialMode = storedTheme;
    }

    setThemeModeState(initialMode);

    let activeTheme: Theme = "dark";
    if (initialMode === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } else {
      activeTheme = initialMode;
    }

    setThemeState(activeTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(activeTheme);
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      const currentMode = localStorage.getItem("theme-mode");
      if (currentMode === "system") {
        const sysTheme: Theme = e.matches ? "light" : "dark";
        setThemeState(sysTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(sysTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyThemeTransition = (
    nextTheme: Theme,
    nextMode: ThemeMode,
    e?: React.MouseEvent<any> | MouseEvent
  ) => {
    const updateDOM = () => {
      setThemeModeState(nextMode);
      localStorage.setItem("theme-mode", nextMode);

      if (nextMode === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", nextMode);
      }

      setThemeState(nextTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(nextTheme);
    };

    // If the active rendered theme is already what's requested, update preference without screen wave
    if (nextTheme === theme && mounted) {
      updateDOM();
      return;
    }

    // Fallback for browsers without View Transitions API or users with reduced motion
    if (
      typeof document === "undefined" ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateDOM();
      return;
    }

    // Prioritize center of clicked button element for radial ripple origin
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e && "currentTarget" in e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (e && typeof e.clientX === "number" && typeof e.clientY === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    }

    // Calculate distance to furthest screen corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Suppress CSS element transitions so the view transition snapshot is sharp and instantaneous
    document.documentElement.classList.add("theme-transitioning");

    // Force React to synchronously commit DOM changes before the new snapshot is captured
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        updateDOM();
      });
    });

    const cleanup = () => {
      document.documentElement.classList.remove("theme-transitioning");
    };

    // Silky-smooth radial circular reveal with fluid deceleration
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
            duration: isMobile ? 420 : 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        animation.onfinish = cleanup;
        animation.oncancel = cleanup;
      })
      .catch(cleanup);

    transition.finished.then(cleanup).catch(cleanup);
  };

  const setThemeMode = (mode: ThemeMode, e?: React.MouseEvent<any> | MouseEvent) => {
    let resolvedTheme: Theme = "dark";
    if (mode === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } else {
      resolvedTheme = mode;
    }
    applyThemeTransition(resolvedTheme, mode, e);
  };

  const setTheme = (newTheme: Theme, e?: React.MouseEvent<any> | MouseEvent) => {
    setThemeMode(newTheme, e);
  };

  const toggleTheme = (e?: React.MouseEvent<any> | MouseEvent) => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyThemeTransition(nextTheme, nextTheme, e);
  };

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "dark", themeMode: mounted ? themeMode : "dark", setTheme, setThemeMode, toggleTheme }}>
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
