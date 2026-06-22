"use client";

import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  headings: Heading[];
}

export default function ArticleTableOfContents({
  headings,
}: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const updatePositions = () => {
      const newPositions: Record<string, number> = {};
      
      // 1. Gather all raw viewport positions
      const rawPositions = headings.map((h) => {
        const el = document.getElementById(h.id);
        return {
          id: h.id,
          top: el ? el.getBoundingClientRect().top : 0,
          height: 32, // estimated height of each TOC item (py-1.5 is roughly 32px height)
        };
      });

      // 2. Sort by raw top position
      rawPositions.sort((a, b) => a.top - b.top);

      // 3. Collision resolution
      // The TOC starts sticky at top-[68px].
      // Inside this aside, the header "On this page" takes up about 80px.
      // So the minimum top offset for any link to avoid overlapping the header is 80px.
      let currentMinTop = 80;
      rawPositions.forEach((pos) => {
        // Map viewport top to TOC container top.
        // Viewport Y = rect.top -> relative to TOC container (which starts at viewport Y = 68) is rect.top - 68.
        let calculatedTop = pos.top - 68;
        if (calculatedTop < currentMinTop) {
          calculatedTop = currentMinTop;
        }
        newPositions[pos.id] = calculatedTop;
        // Keep a minimum gap of 8px between elements (height 32px + 8px gap = 40px)
        currentMinTop = calculatedTop + pos.height + 8;
      });

      setPositions(newPositions);

      // 4. Update the dynamic connecting line style
      const firstId = headings[0]?.id;
      const lastId = headings[headings.length - 1]?.id;
      if (
        firstId &&
        lastId &&
        newPositions[firstId] !== undefined &&
        newPositions[lastId] !== undefined
      ) {
        const top = newPositions[firstId] + 12; // middle of the first item
        const height = newPositions[lastId] - newPositions[firstId];
        setLineStyle({ top, height: Math.max(0, height) });
      }

      // 5. Detect active heading
      // Active heading is the one that has scrolled past Y = 150px (under header) but is closest to the top of viewport.
      let active = "";
      let bestDiff = -Infinity;
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // We target 150px from top as the activation threshold
          const diff = rect.top - 150;
          if (diff <= 0) {
            if (diff > bestDiff) {
              bestDiff = diff;
              active = h.id;
            }
          }
        }
      });

      if (!active && headings.length > 0) {
        active = headings[0].id;
      }
      setActiveId(active);
    };

    // Initial run
    updatePositions();

    // Listen on scroll and resize
    window.addEventListener("scroll", updatePositions, { passive: true });
    window.addEventListener("resize", updatePositions);

    // Watch for dynamic changes (like images loading or content expanding)
    const interval = setInterval(updatePositions, 1000);

    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
      clearInterval(interval);
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  // Calculate container height dynamically to allow scrollbar to function correctly
  const lastHeadingId = headings[headings.length - 1]?.id;
  const containerHeight =
    lastHeadingId && positions[lastHeadingId] !== undefined
      ? positions[lastHeadingId] + 60
      : 400;

  return (
    <aside className="hidden xl:flex flex-col shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[280px] bg-docs-bg-page overflow-y-auto scrollbar-hide transition-colors duration-200">
      {/* Sticky header is relative, but has z-50 to stay on top of absolute links */}
      <div className="relative z-50 bg-docs-bg-page px-6 pt-10 pb-4 transition-colors duration-200">
        <h4 className="text-xs font-bold text-docs-text-primary uppercase tracking-widest transition-colors duration-200">
          On this page
        </h4>
      </div>

      <div 
        className="relative px-6 transition-all duration-200"
        style={{ height: `${containerHeight}px` }}
      >
        {/* Dynamic vertical rule line */}
        {headings.length > 1 && (
          <div
            className="absolute left-6 w-[1px] bg-docs-border-main transition-all duration-300 ease-out"
            style={{
              top: `${lineStyle.top}px`,
              height: `${lineStyle.height}px`,
            }}
          />
        )}

        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const topPos = positions[heading.id] ?? 80;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              style={{
                position: "absolute",
                top: `${topPos}px`,
                left: "24px",
                right: "24px",
                transition: "top 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s, font-weight 0.2s",
              }}
              className={`flex items-center py-1.5 hover:text-docs-text-primary ${
                heading.level === 3 ? "pl-7 text-[12px]" : "pl-4"
              } ${
                isActive ? "text-blue-600 dark:text-blue-400 font-medium" : "text-docs-text-muted"
              }`}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              )}
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
