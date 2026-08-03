"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { ExternalLink, Flame, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface GithubData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  days: { date: string; level: number; count: number }[];
}

export function GithubStreak() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to the right (most recent days) when data loads
  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  // Construct matrix grid (weeks) & month labels
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || !data.days || data.days.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const sortedDays = [...data.days].sort((a, b) => a.date.localeCompare(b.date));
    const weeksArr: ({ date: string; level: number; count: number } | null)[][] = [];
    let currentWeek: ({ date: string; level: number; count: number } | null)[] = [];

    const firstDateParts = sortedDays[0].date.split("-");
    const firstDate = new Date(
      parseInt(firstDateParts[0], 10),
      parseInt(firstDateParts[1], 10) - 1,
      parseInt(firstDateParts[2], 10)
    );
    const firstDayOfWeek = firstDate.getDay(); // 0 = Sun, 1 = Mon ...

    // Pad start of first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    sortedDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Month labels extraction
    const monthLabelsArr: { name: string; colIndex: number }[] = [];
    let lastMonth = -1;

    weeksArr.forEach((week, colIdx) => {
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const parts = validDay.date.split("-");
        const monthNum = parseInt(parts[1], 10) - 1;
        if (monthNum !== lastMonth) {
          const monthName = new Date(
            parseInt(parts[0], 10),
            monthNum,
            1
          ).toLocaleString("en-US", { month: "short" });
          if (
            monthLabelsArr.length === 0 ||
            colIdx - monthLabelsArr[monthLabelsArr.length - 1].colIndex >= 3
          ) {
            monthLabelsArr.push({ name: monthName, colIndex: colIdx });
            lastMonth = monthNum;
          }
        }
      }
    });

    return { weeks: weeksArr, monthLabels: monthLabelsArr };
  }, [data]);

  // Tile styles (Square shape with subtle rounded corners & glowing green intensity)
  const getSquareStyles = (level: number) => {
    if (isLight) {
      switch (level) {
        case 0:
          return "bg-[#ebedf0] border border-slate-200/80 rounded-[3px]";
        case 1:
          return "bg-[#9be9a8] border border-[#7edb8c] rounded-[3px]";
        case 2:
          return "bg-[#40c463] border border-[#30b053] rounded-[3px]";
        case 3:
          return "bg-[#30a14e] border border-[#238c3f] rounded-[3px]";
        case 4:
        default:
          return "bg-[#216e39] border border-[#16572a] rounded-[3px] shadow-[0_0_6px_rgba(33,110,57,0.4)]";
      }
    }

    switch (level) {
      case 0:
        return "bg-[#161b22] border border-[#21262d]/70 rounded-[3px]";
      case 1:
        return "bg-[#0e4429] border border-[#006d32]/90 rounded-[3px] shadow-[0_0_5px_rgba(14,68,41,0.7)]";
      case 2:
        return "bg-[#006d32] border border-[#26a641]/90 rounded-[3px] shadow-[0_0_7px_rgba(0,109,50,0.85)]";
      case 3:
        return "bg-[#26a641] border border-[#39d353] rounded-[3px] shadow-[0_0_10px_rgba(38,166,65,0.95)]";
      case 4:
      default:
        return "bg-[#39d353] border border-[#56ff75] rounded-[3px] shadow-[0_0_14px_rgba(57,211,83,1)]";
    }
  };

  if (loading) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              isLight
                ? "bg-white border-slate-200 shadow-lg"
                : "bg-[#0d1117] border-[#30363d] shadow-2xl"
            }`}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700/20">
              <div className="h-4 w-28 bg-slate-700/30 rounded animate-pulse" />
              <div className="h-4 w-36 bg-slate-700/30 rounded animate-pulse" />
            </div>
            <div className="h-40 w-full bg-slate-700/20 rounded-xl animate-pulse mb-6" />
            <div className="h-4 w-64 bg-slate-700/30 rounded animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null;
  }

  // Row labels for vertical axis (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
  const dayRowLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden font-mono ${
            isLight
              ? "bg-white border-slate-200/90 shadow-xl shadow-slate-200/50"
              : "bg-[#0d1117] border-[#30363d] shadow-2xl shadow-black/60"
          }`}
        >
          {/* Ambient Subtle Green Glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-[120px] pointer-events-none ${
              isLight ? "bg-emerald-500/5" : "bg-emerald-500/10"
            }`}
          />

          {/* Top Header Row Inside Card */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3
              className={`font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold ${
                isLight ? "text-slate-600" : "text-[#8b949e]"
              }`}
            >
              GITHUB STATUS
            </h3>
            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors ${
                isLight
                  ? "text-slate-800 hover:text-black"
                  : "text-[#c9d1d9] hover:text-white"
              }`}
            >
              @{data.username.toUpperCase()}
              <ExternalLink size={14} className="opacity-80" />
            </a>
          </div>

          {/* Main Contribution Graph Area */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto py-2 mb-6 no-scrollbar scroll-smooth relative z-10"
          >
            <div className="inline-block min-w-[780px] select-none">
              {/* Horizontal Axis: Month Labels */}
              <div className="flex text-[10px] sm:text-xs font-mono mb-2 pl-8 relative h-4">
                {monthLabels.map((m) => (
                  <div
                    key={`${m.name}-${m.colIndex}`}
                    className={`absolute ${
                      isLight ? "text-slate-500" : "text-[#8b949e]"
                    }`}
                    style={{
                      left: `calc(2rem + ${m.colIndex * 15}px)`,
                    }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>

              {/* Graph Grid with Left Vertical Axis */}
              <div className="flex items-start gap-2">
                {/* Vertical Axis (Left Labels: Mon, Wed, Fri) */}
                <div className="flex flex-col justify-between h-[106px] text-[10px] sm:text-xs font-mono pr-1 pt-[1px]">
                  {dayRowLabels.map((label, idx) => (
                    <div
                      key={idx}
                      className={`h-[12px] flex items-center leading-none ${
                        isLight ? "text-slate-500" : "text-[#8b949e]"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Contribution Tile Grid (53 columns x 7 rows) */}
                <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                  {weeks.map((week, wIdx) =>
                    week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={`empty-${wIdx}-${dIdx}`}
                            className="w-3 h-3 rounded-[3px] opacity-0"
                          />
                        );
                      }

                      return (
                        <div
                          key={day.date}
                          className="w-3 h-3 relative group/cell cursor-pointer"
                        >
                          <div
                            className={`w-3 h-3 ${getSquareStyles(
                              day.level
                            )} transition-all duration-200 group-hover/cell:scale-125 group-hover/cell:z-20`}
                          />

                          {/* Hover Tooltip */}
                          <div
                            className={`absolute bottom-full mb-3 hidden group-hover/cell:block z-30 px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap pointer-events-none shadow-2xl border ${
                              isLight
                                ? "bg-slate-900 text-white border-slate-700"
                                : "bg-[#161b22] text-[#c9d1d9] border-[#30363d]"
                            } ${
                              wIdx < 10
                                ? "left-0"
                                : wIdx >= weeks.length - 10
                                ? "right-0"
                                : "left-1/2 -translate-x-1/2"
                            }`}
                          >
                            <span className="font-bold text-[#39d353]">
                              {day.count}
                            </span>{" "}
                            {day.count === 1 ? "contribution" : "contributions"}{" "}
                            on{" "}
                            {new Date(
                              day.date + "T00:00:00"
                            ).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Stats Line */}
          <div
            className={`pt-4 pb-4 border-t font-mono text-xs tracking-wider flex flex-wrap items-center justify-between gap-y-2 relative z-10 ${
              isLight
                ? "border-slate-200 text-slate-700"
                : "border-[#30363d] text-[#c9d1d9]"
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold">
              <span>
                <strong className={isLight ? "text-slate-900" : "text-white"}>
                  {data.totalContributions.toLocaleString()}
                </strong>{" "}
                CONTRIBUTIONS IN THE LAST YEAR
              </span>
              <span className={isLight ? "text-slate-400" : "text-[#8b949e]"}>
                •
              </span>
              <span className="flex items-center gap-1">
                <Flame
                  size={14}
                  className="text-orange-500 fill-orange-500/20 animate-pulse"
                />
                <span>
                  STREAK:{" "}
                  <strong className={isLight ? "text-slate-900" : "text-white"}>
                    {data.currentStreak}
                  </strong>{" "}
                  DAYS
                </span>
              </span>
              <span className={isLight ? "text-slate-400" : "text-[#8b949e]"}>
                •
              </span>
              <span className="flex items-center gap-1">
                <Award size={14} className="text-amber-500 fill-amber-500/20" />
                <span>
                  LONGEST:{" "}
                  <strong className={isLight ? "text-slate-900" : "text-white"}>
                    {data.maxStreak}
                  </strong>{" "}
                  DAYS
                </span>
              </span>
            </div>
          </div>

          {/* Bottom Footer Area: Link & Legend */}
          <div
            className={`pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-xs relative z-10 ${
              isLight ? "text-slate-500" : "text-[#8b949e]"
            }`}
          >
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline transition-colors ${
                isLight ? "hover:text-slate-800" : "hover:text-slate-200"
              }`}
            >
              Learn how we count contributions
            </a>

            {/* GitHub Legend */}
            <div className="flex items-center gap-1.5 select-none">
              <span>Less</span>
              <div className="flex items-center gap-[3px]">
                <div
                  className={`w-3 h-3 ${getSquareStyles(
                    0
                  )}`}
                />
                <div
                  className={`w-3 h-3 ${getSquareStyles(
                    1
                  )}`}
                />
                <div
                  className={`w-3 h-3 ${getSquareStyles(
                    2
                  )}`}
                />
                <div
                  className={`w-3 h-3 ${getSquareStyles(
                    3
                  )}`}
                />
                <div
                  className={`w-3 h-3 ${getSquareStyles(
                    4
                  )}`}
                />
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
