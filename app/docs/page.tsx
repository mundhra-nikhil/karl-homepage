"use client";

import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import DocsCardGrid from "@/components/docs/DocsCardGrid";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import { docCategories } from "@/lib/data/docs/manifest";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-150px 0px -60% 0px" }
    );

    docCategories.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 font-sans">
      <div className="docs-nav-wrapper sticky top-0 h-[68px] z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <Nav />
      </div>

      <div className="flex flex-1 w-full max-w-7xl mx-auto relative">
        <DocsSidebar />

        <main className="flex-1 min-w-0 px-6 py-12 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-20 mt-8 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Karl{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Manuals
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
                Learn how to install, set up, configure, and use Karl products
                with this collection of in-depth user guides, whitepapers, and
                security documentation.
              </p>
            </div>

            {docCategories.map((category) => (
              <DocsCardGrid key={category.id} category={category} />
            ))}
          </div>
        </main>

        <DocsTableOfContents activeSection={activeSection} />
      </div>

      <Footer />
    </div>
  );
}
