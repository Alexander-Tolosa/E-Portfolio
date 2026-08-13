"use client";

import React, { useEffect } from "react";
import { playWaterDropSound, resumeAudioContext } from "@/utils/sound";
import { useSound } from "@/context/SoundContext";

export function HoverSoundProvider({ children }: { children: React.ReactNode }) {
  const { soundEnabled } = useSound();

  useEffect(() => {
    let activeElement: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      if (!soundEnabled) return;

      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      // Skip sound completely for elements explicitly opting out (e.g. profile picture avatar)
      if (target.closest('[data-no-sound="true"], .no-sound, [data-no-sound]')) {
        return;
      }

      // Find closest interactive element
      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .glass-hover, .cursor-pointer, [data-hover-sound]'
      );

      if (!interactiveEl) return;

      if (interactiveEl.closest('[data-no-sound="true"], .no-sound, [data-no-sound]')) {
        return;
      }

      if (interactiveEl !== activeElement) {
        activeElement = interactiveEl;
        playWaterDropSound();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (activeElement && !activeElement.contains(e.relatedTarget as Node)) {
        activeElement = null;
      }
    };

    // Unlock Web Audio API context on first user gesture silently (without playing a sound)
    const unlockAudio = () => {
      resumeAudioContext();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [soundEnabled]);

  return <>{children}</>;
}
