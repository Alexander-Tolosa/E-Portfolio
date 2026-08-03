import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = "Alexander-Tolosa";
  const url = `https://github.com/users/${username}/contributions`;
  
  try {
    const res = await fetch(`${url}?_=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: res.status });
    }
    
    const html = await res.text();
    
    // Match calendar days (td or rect element in modern GitHub)
    const dayRegex = /<(?:td|rect)[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/gi;
    const matches = html.match(dayRegex) || [];
    
    // Parse tooltips for accurate counts
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/gi;
    let tooltipMatch;
    const countMap: Record<string, number> = {};
    
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const id = tooltipMatch[1];
      const text = tooltipMatch[2].trim();
      
      let count = 0;
      if (!text.startsWith("No contributions")) {
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
      
      const count = id && countMap[id] !== undefined ? countMap[id] : (level > 0 ? level : 0);
      
      return { date, level, count };
    }).filter(d => d.date);

    // Total contributions string in HTML
    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
    const totalContributions = totalMatch 
      ? parseInt(totalMatch[1].replace(/,/g, ''), 10) 
      : parsedDays.reduce((acc, curr) => acc + curr.count, 0);
    
    parsedDays.sort((a, b) => a.date.localeCompare(b.date));
    
    // Compute max streak
    let maxStreak = 0;
    let tempStreak = 0;
    
    for (const d of parsedDays) {
      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }
    
    // Compute current streak backward
    const todayStr = new Date().toISOString().split("T")[0];
    const activeDays = parsedDays.filter(d => d.date <= todayStr);
    
    let currentStreak = 0;
    let startIndex = activeDays.length - 1;
    
    // If today has 0 contributions, start checking from yesterday so active streak isn't reset prematurely today
    if (activeDays.length > 0 && activeDays[startIndex].count === 0) {
      startIndex = activeDays.length - 2;
    }
    
    for (let i = startIndex; i >= 0; i--) {
      if (activeDays[i] && activeDays[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
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
