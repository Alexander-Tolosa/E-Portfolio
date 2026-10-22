import React from "react";
import { content } from "@/data/content";

export function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-brand-border py-6 select-none"
    >
      <p className="text-[13.5px] text-brand-text-muted">
        &copy; {currentYear} {content.personalInfo.name}
      </p>
      <nav aria-label="Social" className="flex flex-wrap items-center gap-4">
        <a
          href={content.personalInfo.socials.email}
          className="inline-flex min-h-8 items-center text-[13.5px] text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          Email
        </a>
        <a
          href={content.personalInfo.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center text-[13.5px] text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          LinkedIn
        </a>
        <a
          href={content.personalInfo.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center text-[13.5px] text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          GitHub
        </a>
        <a
          href={content.personalInfo.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center text-[13.5px] text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          Facebook
        </a>
        <a
          href={content.personalInfo.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center text-[13.5px] text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          Instagram
        </a>
      </nav>
    </footer>
  );
}
