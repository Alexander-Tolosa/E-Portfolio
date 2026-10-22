import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { content } from "@/data/content";
import { MinimalFooter } from "@/components/layout/MinimalFooter";

export const metadata: Metadata = {
  title: "Affiliations | Alexander Tolosa",
  description: "Current leadership roles and community affiliations held by Alexander Tolosa.",
};

export default function AffiliationsPage() {
  const affiliations = content.affiliations || [];

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
          Affiliations
        </h1>
        <p className="mt-2 text-[16px] text-brand-text-muted">
          Current leadership &amp; community roles.
        </p>

        {/* Affiliations List */}
        <div className="mt-8">
          <div className="divide-y divide-brand-border">
            {affiliations.map((item) => {
              const hasLink = Boolean(item.url);
              const isExternal = item.url?.startsWith("http");

              const contentBlock = (
                <div className="flex items-center gap-4 py-4 transition-colors hover:bg-white/[0.02] rounded-xl px-2.5 -mx-2.5 group cursor-default">
                  {/* Organization Logo */}
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-white/[0.04] flex items-center justify-center p-2 shadow-xs transition-colors group-hover:border-white/20">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${item.name} logo`}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="h-full w-full bg-brand-border/40 flex items-center justify-center text-xs font-bold text-foreground">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Middle Details: Name & Role */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[15.5px] font-medium leading-tight text-foreground group-hover:text-foreground transition-colors truncate">
                        {item.name}
                      </p>
                      {hasLink && (
                        <ExternalLink
                          size={12}
                          className="shrink-0 text-brand-text-muted opacity-0 group-hover:opacity-80 transition-opacity"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-[14px] text-brand-text-muted">
                      {item.role}
                    </p>
                  </div>

                  {/* Right: Organization Category/Type */}
                  <p className="hidden max-w-[200px] shrink-0 text-right text-[13px] leading-snug text-brand-text-muted sm:block">
                    {item.category}
                  </p>
                </div>
              );

              if (hasLink && item.url) {
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-border rounded-xl"
                  >
                    {contentBlock}
                  </Link>
                );
              }

              return <div key={item.id}>{contentBlock}</div>;
            })}
          </div>
        </div>

        {/* Minimal Footer */}
        <MinimalFooter />
      </div>
  );
}
