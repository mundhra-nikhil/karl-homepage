"use client";

import { useEffect, useState } from "react";
import {
  categoryColorStyles,
  docCategories,
} from "@/lib/data/docs/manifest";

interface DocsTableOfContentsProps {
  activeSection?: string;
}

export default function DocsTableOfContents({
  activeSection: propActiveSection,
}: DocsTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, number> = {};
      
      // 1. Gather raw viewport positions
      const rawPositions = docCategories.map((cat) => {
        const el = document.getElementById(cat.id);
        return {
          id: cat.id,
          top: el ? el.getBoundingClientRect().top : 0,
          height: 32, // estimated height of each item
        };
      });

      // 2. Sort by raw top position
      rawPositions.sort((a, b) => a.top - b.top);

      // 3. Collision resolution (minimum 80px top offset to avoid the header)
      let currentMinTop = 80;
      rawPositions.forEach((pos) => {
        let calculatedTop = pos.top - 68;
        if (calculatedTop < currentMinTop) {
          calculatedTop = currentMinTop;
        }
        newPositions[pos.id] = calculatedTop;
        currentMinTop = calculatedTop + pos.height + 8;
      });

      setPositions(newPositions);

      // 4. Update dynamic connecting line style
      const firstId = docCategories[0]?.id;
      const lastId = docCategories[docCategories.length - 1]?.id;
      if (
        firstId &&
        lastId &&
        newPositions[firstId] !== undefined &&
        newPositions[lastId] !== undefined
      ) {
        const top = newPositions[firstId] + 12;
        const height = newPositions[lastId] - newPositions[firstId];
        setLineStyle({ top, height: Math.max(0, height) });
      }

      // 5. Detect active section
      let active = "";
      let bestDiff = -Infinity;
      docCategories.forEach((cat) => {
        const el = document.getElementById(cat.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const diff = rect.top - 200; // Trigger activation slightly before section hits top
          if (diff <= 0) {
            if (diff > bestDiff) {
              bestDiff = diff;
              active = cat.id;
            }
          }
        }
      });

      if (!active && docCategories.length > 0) {
        active = docCategories[0].id;
      }
      setActiveSection(active);
    };

    updatePositions();
    window.addEventListener("scroll", updatePositions, { passive: true });
    window.addEventListener("resize", updatePositions);
    const interval = setInterval(updatePositions, 1000);

    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
      clearInterval(interval);
    };
  }, []);

  const lastCatId = docCategories[docCategories.length - 1]?.id;
  const containerHeight =
    lastCatId && positions[lastCatId] !== undefined
      ? positions[lastCatId] + 60
      : 400;

  return (
    <aside className="hidden xl:flex flex-col shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[240px] bg-docs-bg-page overflow-y-auto scrollbar-hide transition-colors duration-200">
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
        {docCategories.length > 1 && (
          <div
            className="absolute left-6 w-[1px] bg-docs-border-main transition-all duration-300 ease-out"
            style={{
              top: `${lineStyle.top}px`,
              height: `${lineStyle.height}px`,
            }}
          />
        )}

        {docCategories.map((category) => {
          const styles = categoryColorStyles[category.color];
          const isActive = (propActiveSection || activeSection) === category.id;
          const topPos = positions[category.id] ?? 80;

          return (
            <a
              key={category.id}
              href={`#${category.id}`}
              style={{
                position: "absolute",
                top: `${topPos}px`,
                left: "24px",
                right: "24px",
                transition: "top 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s, font-weight 0.2s",
              }}
              className={`flex items-center pl-4 py-1.5 hover:text-docs-text-primary ${
                isActive ? `${styles.tocActive} font-medium` : "text-docs-text-muted"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-full ${styles.tocShadow}`}
                />
              )}
              {category.sidebarTitle}
            </a>
          );
        })}
      </div>
    </aside>
  );
}
