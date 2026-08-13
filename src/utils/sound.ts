"use client";

let audioCtx: AudioContext | null = null;
let lastPlayTime = 0;

/**
 * Lazy initializer for AudioContext
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

/**
 * Silently initializes/resumes the AudioContext without generating sound output
 */
export function resumeAudioContext() {
  getAudioContext();
}

/**
 * Plays a soothing, fast water drop sound effect using Web Audio API.
 */
export function playWaterDropSound() {
  const now = performance.now();
  // 45ms throttle so fast cursor movements produce smooth, soothing liquid droplets
  if (now - lastPlayTime < 45) return;
  lastPlayTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const duration = 0.055; // 55 milliseconds - snappy, clean droplet

    // 1. Primary Sine Oscillator (Main Water Droplet Body)
    const mainOsc = ctx.createOscillator();
    const mainGain = ctx.createGain();

    mainOsc.type = "sine";
    // Droplet pitch sweep: starts warm (~580Hz) and rapidly glides up (~1380Hz) before settling
    mainOsc.frequency.setValueAtTime(580, startTime);
    mainOsc.frequency.exponentialRampToValueAtTime(1380, startTime + duration * 0.65);
    mainOsc.frequency.exponentialRampToValueAtTime(1150, startTime + duration);

    // Smooth Gain Envelope for soft, non-intrusive sound
    mainGain.gain.setValueAtTime(0.0001, startTime);
    mainGain.gain.linearRampToValueAtTime(0.035, startTime + 0.006); // Soft peak volume
    mainGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // 2. Harmonic Oscillator (Subtle Liquid Resonance)
    const harmonicOsc = ctx.createOscillator();
    const harmonicGain = ctx.createGain();

    harmonicOsc.type = "sine";
    harmonicOsc.frequency.setValueAtTime(870, startTime);
    harmonicOsc.frequency.exponentialRampToValueAtTime(2070, startTime + duration * 0.65);

    harmonicGain.gain.setValueAtTime(0.0001, startTime);
    harmonicGain.gain.linearRampToValueAtTime(0.008, startTime + 0.006);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // 3. Lowpass Filter for organic, warm acoustics
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3200, startTime);

    // Connect Audio Nodes
    mainOsc.connect(mainGain);
    harmonicOsc.connect(harmonicGain);

    mainGain.connect(filter);
    harmonicGain.connect(filter);

    filter.connect(ctx.destination);

    // Start & Stop Oscillators
    mainOsc.start(startTime);
    harmonicOsc.start(startTime);

    mainOsc.stop(startTime + duration);
    harmonicOsc.stop(startTime + duration);
  } catch {
    // Ignore audio restrictions prior to user gesture
  }
}
