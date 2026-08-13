"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("soundEnabled");
    if (stored !== null) {
      setSoundEnabledState(stored === "true");
    }
    setMounted(true);
  }, []);

  const toggleSound = () => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      localStorage.setItem("soundEnabled", String(next));
      return next;
    });
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem("soundEnabled", String(enabled));
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled: mounted ? soundEnabled : true,
        toggleSound,
        setSoundEnabled,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
