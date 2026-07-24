"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Award, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface GithubData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  days: { date: string; level: number; count: number }[];
}

export function GithubStreak() {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching github streak data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 relative overflow-hidden bg-brand-dark/20">
        <div className="max-w-5xl mx-auto px-6">
          <Card animate={false} className="p-8 border border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="h-32 w-full bg-white/5 rounded-xl animate-pulse mb-6" />
            <div className="h-4 w-48 bg-white/10 rounded animate-pulse" />
          </Card>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null; // Graceful fallback if scraping fails or is blocked
  }

  // Get the size class and opacity class for each level
  const getDotStyles = (level: number) => {
    switch (level) {
      case 0:
        return "w-1 h-1 bg-white/10 rounded-full";
      case 1:
        return "w-1.5 h-1.5 bg-white/40 rounded-full";
      case 2:
        return "w-2 h-2 bg-white/65 rounded-full";
      case 3:
        return "w-2.5 h-2.5 bg-white/85 rounded-full";
      case 4:
      default:
        return "w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]";
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-brand-dark/20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Row outside the card */}
        <div className="mb-6 flex justify-between items-center">
          <h3 className="font-mono text-base uppercase tracking-widest text-white/80">
            Github Status
          </h3>
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-widest text-white hover:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            @{data.username.toUpperCase()}
            <ExternalLink size={14} />
          </a>
        </div>

        <Card animate={false} className="p-8 border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors relative overflow-visible">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

          {/* Middle: Contribution Grid */}
          <div className="w-full overflow-x-auto pt-14 pb-4 mb-6 no-scrollbar">
            {/* The standard grid height is 7 cells (for 7 days).
                Each column is a week.
                We center the circles in a fixed-size container cell to make alignment perfect. */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[880px] h-[115px] items-center justify-items-center mx-auto px-12">
              {data.days.map((day, idx) => (
                <div
                  key={day.date}
                  className="w-3 h-3 flex items-center justify-center relative group/cell"
                >
                  <div className={`${getDotStyles(day.level)} transition-all duration-300 group-hover/cell:scale-125`} />
                  
                  {/* Tooltip on hover - enlarged and styled */}
                  <div className={`absolute bottom-full mb-3.5 hidden group-hover/cell:block z-20 bg-brand-dark/95 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap pointer-events-none shadow-xl shadow-black/50 ${
                    idx < 14 ? "left-0" : idx >= data.days.length - 14 ? "right-0" : "left-1/2 -translate-x-1/2"
                  }`}>
                    {day.count} {day.count === 1 ? "contribution" : "contributions"} on {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/5 font-mono text-xs tracking-widest text-white/50 uppercase">
            <div>
              {data.totalContributions.toLocaleString()} contributions in the last year
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-white/70">
                <Flame size={14} className="text-orange-500 animate-pulse" />
                <span>Streak: <strong className="text-white">{data.currentStreak}</strong> Days</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70">
                <Award size={14} className="text-yellow-500" />
                <span>Longest: <strong className="text-white">{data.maxStreak}</strong> Days</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
