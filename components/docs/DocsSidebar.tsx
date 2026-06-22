"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  categoryColorStyles,
  docCategories,
} from "@/lib/data/docs/manifest";

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col sticky top-[68px] h-[calc(100vh-68px)] w-[280px] shrink-0 border-r border-white/5 bg-[#050505] overflow-y-auto scrollbar-hide">
      {/* Scrollable nav content */}
      <div className="relative px-6 pt-8 pb-6 flex flex-col gap-8">
        {docCategories.map((category) => {
          const styles = categoryColorStyles[category.color];

          return (
            <div key={category.id}>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`}></div>
                {category.sidebarTitle}
              </h4>
              <ul className="flex flex-col gap-1.5 border-l border-white/5 ml-1 pl-4 text-sm">
                {category.articles.map((article) => {
                  const href = `/docs/${article.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={article.slug}>
                      <Link
                        href={href}
                        className={`block py-1 transition-colors ${
                          isActive
                            ? `${styles.tocActive} font-medium`
                            : `text-slate-400 ${styles.hover}`
                        }`}
                      >
                        {article.sidebarTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
