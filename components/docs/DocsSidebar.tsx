import Link from "next/link";
import {
  categoryColorStyles,
  docCategories,
} from "@/lib/data/docs/manifest";

export default function DocsSidebar() {
  return (
    <aside className="hidden md:flex flex-col sticky top-[68px] h-[calc(100vh-68px)] w-[280px] shrink-0 overflow-y-auto py-8 px-6 border-r border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
          Karl Docs
        </h2>
        <p className="text-xs text-slate-500 mt-1">v2.0.0-beta</p>
      </div>

      <nav className="flex flex-col gap-8">
        {docCategories.map((category) => {
          const styles = categoryColorStyles[category.color];

          return (
            <div key={category.id}>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${styles.dot}`}
                ></div>
                {category.sidebarTitle}
              </h4>
              <ul className="flex flex-col gap-1.5 border-l border-white/5 ml-1 pl-4 text-sm">
                {category.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/docs/${article.slug}`}
                      className={`block py-1 text-slate-400 ${styles.hover} transition-colors`}
                    >
                      {article.sidebarTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
