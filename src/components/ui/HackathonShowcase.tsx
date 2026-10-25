"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Hackathon } from "@/data/content";

type Photo = Hackathon["photos"][number];

function ResultBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full border border-[var(--sidebar-accent)]/40 bg-[var(--sidebar-accent)]/10 px-2.5 py-0.5 text-[12.5px] font-medium text-foreground">
      {children}
    </span>
  );
}

export function HackathonList({ hackathons }: { hackathons: Hackathon[] }) {
  const [open, setOpen] = useState<{ photos: Photo[]; index: number } | null>(null);

  const isOpen = open !== null;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((o) =>
        o ? { ...o, index: (o.index + dir + o.photos.length) % o.photos.length } : o
      ),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [isOpen, close, step]);

  const active = open ? open.photos[open.index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Index: one row per hackathon */}
      <ol className="mt-8 divide-y divide-brand-border border-y border-brand-border">
        {hackathons.map((h, i) => (
          <li key={h.id}>
            <a
              href={"#" + h.id}
              className="group flex w-full cursor-pointer items-start gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-text-muted rounded-lg"
            >
              <span className="w-6 shrink-0 font-mono text-[13px] tabular-nums text-brand-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-brand-text-muted">
                  {h.dates}, {h.year}
                </span>
                <span className="mt-0.5 block text-[16px] font-medium text-foreground">
                  {h.event}
                </span>
                <span className="block text-[14px] text-brand-text-muted">
                  {h.project.name}
                </span>
              </span>
              <ResultBadge>{h.result}</ResultBadge>
            </a>
          </li>
        ))}
      </ol>

      {/* Details */}
      <div className="mt-12 space-y-14">
        {hackathons.map((h) => (
          <article key={h.id} id={h.id} className="scroll-mt-24">
            <h2 className="text-[20px] font-medium tracking-[-0.01em] text-foreground">
              {h.event}
            </h2>
            <p className="mt-1 text-[14.5px] text-brand-text-muted">
              {h.dates}, {h.year} · {h.result} · Team {h.team}
            </p>

            <p className="mt-4 text-[15.5px] leading-relaxed text-foreground/90">
              <span className="font-medium text-foreground">{h.project.name}</span> —{" "}
              {h.project.summary}
            </p>
            {h.project.repo && (
              <a
                href={h.project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-10 items-center gap-1 rounded text-[14px] font-medium text-brand-text-muted transition-colors hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-text-muted"
              >
                View on GitHub
                <ArrowUpRight size={14} />
              </a>
            )}

            <div className="mt-5 grid grid-cols-5 gap-3">
              {h.photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setOpen({ photos: h.photos, index: i })}
                  aria-label={`Enlarge photo: ${photo.caption}`}
                  className={`group relative h-[200px] cursor-zoom-in overflow-hidden rounded-xl border border-brand-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text-muted sm:h-[240px] ${
                    photo.height > photo.width ? "col-span-2" : "col-span-3"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 640px) 60vw, 380px"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      photo.height > photo.width ? "object-[50%_62%]" : "object-[50%_40%]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {active && open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
          >
            <button
              type="button"
              ref={closeRef}
              onClick={close}
              aria-label="Close photo"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} />
            </button>
            {open.photos.length > 1 &&
              ([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(dir);
                  }}
                  aria-label={dir === 1 ? "Next photo" : "Previous photo"}
                  className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    dir === 1 ? "right-3" : "left-3"
                  }`}
                >
                  {dir === 1 ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
                </button>
              ))}
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex max-h-full max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                className="max-h-[75dvh] w-auto max-w-[92vw] rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-[13.5px] text-white/80">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
