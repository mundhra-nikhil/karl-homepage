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
    <aside className="hidden xl:block shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[240px] overflow-y-auto py-12 px-6 border-l border-white/5">
      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6">
        On this page
      </h4>
      <nav className="relative flex flex-col gap-1 text-sm text-slate-400">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5"></div>

        {docCategories.map((category) => {
          const styles = categoryColorStyles[category.color];
          const isActive = activeSection === category.id;

          return (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`relative pl-4 py-1.5 transition-colors hover:text-slate-200 ${isActive ? `${styles.tocActive} font-medium` : ""}`}
            >
              {isActive && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] ${styles.tocShadow}`}
                ></div>
              )}
              {category.sidebarTitle}
            </a>
          );
        })}
      </nav>

      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
        <a
          href="#"
          className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit this page
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Request an update
        </a>
      </div>
    </aside>
  );
}
