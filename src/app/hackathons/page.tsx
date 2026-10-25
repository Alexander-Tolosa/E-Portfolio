import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { HackathonList } from "@/components/ui/HackathonShowcase";

export const metadata: Metadata = {
  title: "Hackathons | Alexander Tolosa",
  description:
    "HackIloilo 2026 Top 8 Finalist with Team KasCoders, and the Gilayon clinic system.",
};

export default function HackathonsPage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-6 pb-10 pt-[84px] lg:pt-10">
      <Link
        href="/"
        className="group inline-flex min-h-8 items-center gap-1.5 rounded text-[14px] font-medium text-brand-text-muted transition-colors hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-text-muted"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <h1 className="mt-6 text-[26px] font-medium leading-tight tracking-[-0.01em] text-foreground">
        Hackathons
      </h1>

      <HackathonList hackathons={content.hackathons} />

      <MinimalFooter />
    </div>
  );
}
