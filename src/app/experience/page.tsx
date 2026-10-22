import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import { MinimalFooter } from "@/components/layout/MinimalFooter";

export const metadata: Metadata = {
  title: "Experience | Alexander Tolosa",
  description: "Professional experience, roles, and education for Alexander Tolosa.",
};

export default function ExperiencePage() {
  const experiences = content.experiences || [];
  const education = content.education || [];

  return (
    <div className="mx-auto w-full max-w-[640px] px-6 pb-10 pt-[84px] lg:pl-6 lg:pr-6 lg:pt-10">
      {/* Back Link */}
      <Link
        href="/"
        className="group inline-flex min-h-8 items-center gap-1.5 text-[14px] font-medium text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back
      </Link>

      {/* Title & Subtitle */}
      <h1 className="mt-6 text-[26px] font-medium leading-tight tracking-[-0.01em] text-foreground">
        Experience
      </h1>
      <p className="mt-2 text-[16px] text-brand-text-muted">
        Professional experience, organizational roles, and education.
      </p>

      {/* Experience List */}
      <div className="mt-8">
        <div className="flex flex-col gap-10">
          {experiences.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* Organization Logo */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-white/[0.04] flex items-center justify-center p-1.5 shadow-xs">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    width={44}
                    height={44}
                    unoptimized
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="h-full w-full bg-brand-border/40 flex items-center justify-center text-xs font-bold text-foreground">
                    {item.company.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-[16px] text-foreground">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-brand-text-muted">
                      {" "}· {item.company}
                    </span>
                  </p>
                  <p className="text-[14px] text-brand-text-muted">{item.period}</p>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {item.description.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2.5 text-[15px] leading-[1.65] text-foreground/80"
                    >
                      <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-text-muted" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-6 text-[14px] font-medium text-brand-text-muted">
            Education
          </h2>
          <div className="flex flex-col gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="flex gap-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-white/[0.04] flex items-center justify-center p-1.5 shadow-xs">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={44}
                      height={44}
                      unoptimized
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="h-full w-full bg-brand-border/40 flex items-center justify-center text-xs font-bold text-foreground">
                      {edu.institution.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[16px] font-medium text-foreground">
                      {edu.institution}
                    </p>
                    <p className="text-[14px] text-brand-text-muted">
                      {edu.period}
                    </p>
                  </div>
                  <p className="text-[15px] text-brand-text-muted mt-0.5">
                    {edu.degree}
                  </p>
                  {edu.description && edu.description.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {edu.description.map((desc, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[12px] font-medium px-2.5 py-0.5 rounded-md border border-brand-border bg-white/[0.03] text-brand-text-muted"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
