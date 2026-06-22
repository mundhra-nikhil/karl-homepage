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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When multiple entries intersect, we want to set the active one
        // Typically it's better to pick the top-most one or the one currently taking up space.
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:flex flex-col shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[280px] border-l border-white/5 bg-[#050505] overflow-y-auto scrollbar-hide">
      <div className="sticky top-0 z-50 bg-[#050505] px-6 pt-10 pb-4 border-b border-white/5">
        <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">
          On this page
        </h4>
      </div>

      <div className="relative px-6 pt-4 pb-8 flex flex-col gap-1 text-[13px] leading-snug text-slate-400 mt-4">
        <div className="absolute left-6 top-4 bottom-8 w-[1px] bg-white/5"></div>

        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`relative flex items-center py-1.5 transition-colors hover:text-slate-200 ${
                heading.level === 3 ? "pl-7 text-[12px]" : "pl-4"
              } ${
                isActive ? "text-blue-400 font-medium" : ""
              }`}
            >
              {isActive && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
                ></div>
              )}
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
