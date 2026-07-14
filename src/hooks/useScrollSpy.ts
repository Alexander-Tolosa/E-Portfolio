import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      let currentSection = "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      // Fallback: if we are at the top, select the first section
      if (window.scrollY < 50 && ids.length > 0) {
        currentSection = ids[0];
      }
      
      // Fallback: if we hit the bottom of the page, select the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        currentSection = ids[ids.length - 1];
      }

      if (currentSection && currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids, activeId, offset]);

  return activeId;
}
