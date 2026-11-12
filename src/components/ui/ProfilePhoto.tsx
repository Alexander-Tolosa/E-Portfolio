"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  className?: string;
}

export function ProfilePhoto({
  src,
  hoverSrc,
  alt,
  className = "aspect-[4/5] w-28 sm:w-36 md:w-44",
}: ProfilePhotoProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      data-no-sound="true"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className={`no-sound group relative shrink-0 cursor-pointer select-none overflow-hidden rounded-xl border border-brand-border/80 bg-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-0.5 hover:rotate-[-2deg] hover:border-foreground/70 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
        className={`object-cover object-[50%_25%] transition-all duration-500 ease-out ${
          hoverSrc && active ? "scale-110 opacity-0 blur-[2px]" : "scale-100 opacity-100"
        }`}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
          className={`object-cover object-[50%_20%] transition-all duration-500 ease-out ${
            active ? "scale-100 opacity-100" : "scale-95 opacity-0 blur-[2px]"
          }`}
        />
      )}
    </div>
  );
}
