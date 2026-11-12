"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Users, X } from "lucide-react";
import type { Hackathon } from "@/data/content";

type Photo = Hackathon["photos"][number];

const metaLine = (h: Hackathon) =>
  [`${h.dates}, ${h.year}`, h.organizer, h.team && `Team ${h.team}`, h.format]
    .filter(Boolean)
    .join(" · ");

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text-muted";

export function HackathonList({ hackathons }: { hackathons: Hackathon[] }) {
  const [detail, setDetail] = useState<Hackathon | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  const detailRef = useRef<HTMLDivElement>(null);
  const detailCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  const lightboxOpen = lightbox !== null;
  const closeDetail = useCallback(() => setDetail(null), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((o) =>
        o ? { ...o, index: (o.index + dir + o.photos.length) % o.photos.length } : o
      ),
    []
  );

  // Details window: scroll lock, focus in, focus back to the opener on close.
  const detailOpen = detail !== null;
  useEffect(() => {
    if (!detailOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    detailCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [detailOpen]);

  // Photo viewer: same, and it sits above the details window.
  useEffect(() => {
    if (!lightboxOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [lightboxOpen]);

  // Keyboard: Esc and Tab trapping go to the topmost window only.
  useEffect(() => {
    if (!detailOpen && !lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const root = lightboxOpen ? lightboxRef.current : detailRef.current;
      if (e.key === "Escape") {
        if (lightboxOpen) closeLightbox();
        else closeDetail();
      }
      if (lightboxOpen && e.key === "ArrowRight") step(1);
      if (lightboxOpen && e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && root) {
        const items = root.querySelectorAll<HTMLElement>("button, a[href]");
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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailOpen, lightboxOpen, closeDetail, closeLightbox, step]);

  const activePhoto = lightbox ? lightbox.photos[lightbox.index] : null;

  return (
    <>
      {/* Timeline: one row per hackathon, jumps to its card */}
      <ol className="mt-8 divide-y divide-brand-border border-y border-brand-border">
        {hackathons.map((h, i) => (
          <li key={h.id}>
            <a
              href={"#" + h.id}
              className={`flex w-full cursor-pointer items-start gap-4 rounded-lg py-4 text-left ${focusRing}`}
            >
              <span className="w-6 shrink-0 font-mono text-[13px] tabular-nums text-brand-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-brand-text-muted">
                  {h.dates}, {h.year}
                </span>
                <span className="mt-0.5 block text-[16px] font-medium text-foreground">
                  {h.project.name}
                </span>
                <span className="block text-[14px] text-brand-text-muted">{h.event}</span>
              </span>
              {(h.result || h.format) && (
                <span
                  className={`mt-0.5 inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[12.5px] font-medium ${
                    h.result
                      ? "border-[var(--sidebar-accent)]/40 bg-[var(--sidebar-accent)]/10 text-foreground"
                      : "border-brand-border text-brand-text-muted"
                  }`}
                >
                  {h.result ?? h.format}
                </span>
              )}
            </a>
          </li>
        ))}
      </ol>

      {/* One short card per hackathon */}
      <div className="mt-8 space-y-6">
        {hackathons.map((h) => {
          const cover = h.photos[0];
          const summary = h.project.summary ?? h.project.problem;
          return (
            <article
              key={h.id}
              id={h.id}
              className="scroll-mt-24 rounded-2xl border border-foreground/20 bg-foreground/[0.03] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-[22px] font-medium leading-tight tracking-[-0.01em] text-foreground">
                    {h.project.name}
                  </h2>
                  <p className="mt-1 text-[15px] text-brand-text-muted">{h.event}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetail(h)}
                  aria-label={`View full details of ${h.project.name}`}
                  title="View details"
                  className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/[0.08] ${focusRing}`}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[13.5px]">
                <span className="rounded-full border border-brand-border px-3 py-1 text-brand-text-muted">
                  {h.dates}, {h.year}
                </span>
                {h.result ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sidebar-accent)]/40 bg-[var(--sidebar-accent)]/10 px-3 py-1 font-medium text-foreground">
                    <Trophy size={13} className="text-[var(--sidebar-accent)]" />
                    {h.result}
                  </span>
                ) : (
                  h.format && (
                    <span className="rounded-full border border-brand-border px-3 py-1 text-brand-text-muted">
                      {h.format}
                    </span>
                  )
                )}
                {h.team && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-border px-3 py-1 text-brand-text-muted">
                    <Users size={13} />
                    Team {h.team}
                  </span>
                )}
              </div>

              {summary && (
                <p className="mt-4 text-[15.5px] leading-relaxed text-foreground/90">
                  {h.project.summary ?? summary}
                </p>
              )}

              {cover && (
                <button
                  type="button"
                  onClick={() => setLightbox({ photos: h.photos, index: 0 })}
                  aria-label={`Enlarge photo: ${cover.caption}`}
                  className={`group relative mt-5 block h-[200px] w-full cursor-zoom-in overflow-hidden rounded-xl border border-brand-border sm:h-[260px] ${focusRing}`}
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    sizes="(max-width: 640px) 90vw, 590px"
                    className="h-full w-full object-cover object-[50%_40%] transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Full details window */}
      <AnimatePresence>
        {detail && (
          <motion.div
            ref={detailRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${detail.project.name} details`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeDetail}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88dvh] w-full max-w-[620px] overflow-y-auto rounded-2xl border border-foreground/20 bg-brand-card p-6 sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={detailCloseRef}
                type="button"
                onClick={closeDetail}
                aria-label="Close details"
                className={`absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/[0.08] ${focusRing}`}
              >
                <X size={18} />
              </button>

              <h3 className="pr-12 text-[22px] font-medium leading-tight tracking-[-0.01em] text-foreground">
                {detail.project.name}
              </h3>
              <p className="mt-1 pr-12 text-[15px] text-foreground/90">{detail.event}</p>
              <p className="mt-1 text-[14px] text-brand-text-muted">
                {metaLine(detail)}
                {detail.result && ` · ${detail.result}`}
              </p>

              <div className="mt-6 space-y-5">
                {detail.project.summary && !detail.project.problem && (
                  <p className="text-[15px] leading-relaxed text-foreground/90">
                    {detail.project.summary}
                  </p>
                )}
                {detail.project.problem && (
                  <section>
                    <h4 className="text-[14px] font-medium text-foreground">The problem</h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-brand-text-muted">
                      {detail.project.problem}
                    </p>
                  </section>
                )}
                {detail.project.solution && (
                  <section>
                    <h4 className="text-[14px] font-medium text-foreground">What we built</h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-brand-text-muted">
                      {detail.project.solution}
                    </p>
                  </section>
                )}
                {detail.project.stack && (
                  <section>
                    <h4 className="text-[14px] font-medium text-foreground">Stack used</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {detail.project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-brand-border px-2.5 py-1 text-[12.5px] text-foreground/85"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {detail.team && !detail.project.stack && (
                  <p className="text-[14px] text-brand-text-muted">Team {detail.team}</p>
                )}
              </div>

              {detail.project.repo && (
                <a
                  href={detail.project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex min-h-10 items-center gap-1 rounded text-[14px] font-medium text-foreground underline underline-offset-4 ${focusRing}`}
                >
                  View on GitHub
                  <ArrowUpRight size={14} />
                </a>
              )}

              {detail.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {detail.photos.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setLightbox({ photos: detail.photos, index: i })}
                      aria-label={`Enlarge photo: ${photo.caption}`}
                      className={`group relative h-[150px] cursor-zoom-in overflow-hidden rounded-xl border border-brand-border ${
                        detail.photos.length === 1 ? "col-span-2" : ""
                      } ${focusRing}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(max-width: 640px) 45vw, 280px"
                        className="h-full w-full object-cover object-[50%_45%] transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo viewer */}
      <AnimatePresence>
        {activePhoto && lightbox && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.caption}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeLightbox}
          >
            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close photo"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} />
            </button>
            {lightbox.photos.length > 1 &&
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
              key={activePhoto.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex max-h-full max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                sizes="100vw"
                className="max-h-[75dvh] w-auto max-w-[92vw] rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-[13.5px] text-white/80">{activePhoto.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
