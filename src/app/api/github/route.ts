import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = "Alexander-Tolosa";
  const url = `https://github.com/users/${username}/contributions`;
  
  try {
    const res = await fetch(`${url}?_=${Date.now()}`, {
      cache: "no-store"
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: res.status });
    }
    
    const html = await res.text();
    
    const tdRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/gi;
    const matches = html.match(tdRegex) || [];
    
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/gi;
    let tooltipMatch;
    const countMap: Record<string, number> = {};
    
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const id = tooltipMatch[1];
      const text = tooltipMatch[2].trim();
      
      let count = 0;
      if (text.startsWith("No contributions")) {
        count = 0;
      } else {
        const match = text.match(/^([\d,]+)\s+contribution/i);
        if (match) {
          count = parseInt(match[1].replace(/,/g, ''), 10);
        }
      }
      countMap[id] = count;
    }

    const parsedDays = matches.map(match => {
      const dateMatch = match.match(/data-date="([^"]+)"/i);
      const levelMatch = match.match(/data-level="([^"]+)"/i);
      const idMatch = match.match(/id="([^"]+)"/i);
      
      const date = dateMatch ? dateMatch[1] : "";
      const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;
      const id = idMatch ? idMatch[1] : "";
      
      const count = id && countMap[id] !== undefined ? countMap[id] : level;
      
      return { date, level, count };
    }).filter(d => d.date);

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;
    
    parsedDays.sort((a, b) => a.date.localeCompare(b.date));
    
    let maxStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;
    
    const todayStr = new Date().toISOString().split("T")[0];
    
    for (const d of parsedDays) {
      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
      
      if (d.date <= todayStr) {
        if (d.count > 0) {
          currentStreak = tempStreak;
        } else {
          currentStreak = 0;
        }
      }
    }
    
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayDateStr = yesterdayDate.toISOString().split("T")[0];
    const yesterdayEntry = parsedDays.find(d => d.date === yesterdayDateStr);
    const todayEntry = parsedDays.find(d => d.date === todayStr);
    
    if (todayEntry && todayEntry.count === 0 && yesterdayEntry && yesterdayEntry.count > 0) {
      let countBack = 0;
      const yesterdayIndex = parsedDays.findIndex(d => d.date === yesterdayDateStr);
      if (yesterdayIndex !== -1) {
        for (let i = yesterdayIndex; i >= 0; i--) {
          if (parsedDays[i].count > 0) {
            countBack++;
          } else {
            break;
          }
        }
      }
      currentStreak = countBack;
    }

    return NextResponse.json({
      username,
      totalContributions,
      currentStreak,
      maxStreak,
      days: parsedDays
    });
  } catch (error) {
    console.error("GitHub scrape error:", error);
    return NextResponse.json({ error: "Failed to scrape contributions" }, { status: 500 });
  }
}
