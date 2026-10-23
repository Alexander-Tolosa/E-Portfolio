"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

function subscribeSound(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("sound-setting-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sound-setting-change", callback);
  };
}

function getSoundSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("soundEnabled");
  return stored !== null ? stored === "true" : true;
}

function getServerSoundSnapshot(): boolean {
  return true;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const soundEnabled = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    getServerSoundSnapshot
  );

  const toggleSound = () => {
    const next = !soundEnabled;
    localStorage.setItem("soundEnabled", String(next));
    window.dispatchEvent(new Event("sound-setting-change"));
  };

  const setSoundEnabled = (enabled: boolean) => {
    localStorage.setItem("soundEnabled", String(enabled));
    window.dispatchEvent(new Event("sound-setting-change"));
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
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
