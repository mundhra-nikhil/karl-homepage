"use client";

import {
  categoryColorStyles,
  docCategories,
} from "@/lib/data/docs/manifest";

interface DocsTableOfContentsProps {
  activeSection: string;
}

export default function DocsTableOfContents({
  activeSection,
}: DocsTableOfContentsProps) {
  return (
    <aside className="hidden xl:flex flex-col shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[240px] border-l border-white/5 bg-[#050505] overflow-y-auto scrollbar-hide">
      {/* Sticky label — pins to top of the aside's scroll context */}
      <div className="sticky top-0 z-50 bg-[#050505] px-6 pt-10 pb-4 border-b border-white/5">
        <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">
          On this page
        </h4>
      </div>

      {/* Scrollable links */}
      <div className="relative px-6 pt-4 pb-8 flex flex-col gap-1 text-sm text-slate-400 mt-4">
        {/* Left rule line — spans the link area */}
        <div className="absolute left-6 top-4 bottom-8 w-[1px] bg-white/5"></div>

        {docCategories.map((category) => {
          const styles = categoryColorStyles[category.color];
          const isActive = activeSection === category.id;

          return (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`relative flex items-center pl-4 py-1.5 transition-colors hover:text-slate-200 ${
                isActive ? `${styles.tocActive} font-medium` : ""
              }`}
            >
              {isActive && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-full ${styles.tocShadow}`}
                ></div>
              )}
              {category.sidebarTitle}
            </a>
          );
        })}
      </div>
    </aside>
  );
}
