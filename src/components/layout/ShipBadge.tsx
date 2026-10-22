"use client";

import React, { useState } from "react";
import { Rocket } from "lucide-react";

export function ShipBadge() {
  const [count, setCount] = useState(14);
  const [isShipped, setIsShipped] = useState(false);

  const handleShipClick = () => {
    setCount((prev) => prev + 1);
    setIsShipped(true);
    setTimeout(() => setIsShipped(false), 1200);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 hidden items-center gap-3 rounded-full border border-brand-border bg-brand-card py-1.5 pl-4 pr-1.5 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_8px_24px_-12px_rgba(17,17,19,0.12)] lg:flex select-none">
      <div className="leading-tight">
        <p className="text-[12px] font-medium text-brand-text-muted/70">
          Ships this month
        </p>
        <p
          aria-live="polite"
          className="text-[15px] font-medium tabular-nums text-foreground"
        >
          {count}
        </p>
      </div>

      <button
        type="button"
        onClick={handleShipClick}
        className={`relative flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[14px] font-medium text-background transition-transform active:scale-95 cursor-pointer ${
          isShipped ? "-translate-y-1" : "hover:-translate-y-0.5"
        }`}
      >
        <Rocket
          size={14}
          className={`transition-transform duration-300 ${
            isShipped ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
          }`}
        />
        <span>{isShipped ? "Shipped!" : "Ship"}</span>
      </button>
    </div>
  );
}
