import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Fallback: if we are at the top, select the first section
      if (scrollY < 50 && ids.length > 0) {
        setActiveId(ids[0]);
        return;
      }

      // Fallback: if we hit the bottom of the page, select the last section
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      // Walk sections in reverse so the LAST one whose top has scrolled past wins.
      // This correctly handles nested elements (like #skills / #experience inside #about).
      let current = "";
      for (let i = ids.length - 1; i >= 0; i--) {
        const element = document.getElementById(ids[i]);
        if (element) {
          // getBoundingClientRect().top gives viewport-relative position;
          // adding scrollY gives the true absolute page offset.
          const absoluteTop = scrollY + element.getBoundingClientRect().top;
          if (scrollY + offset >= absoluteTop) {
            current = ids[i];
            break;
          }
        }
      }

      if (current && current !== activeId) {
        setActiveId(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids, activeId, offset]);

  return activeId;
}
