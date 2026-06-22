"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { docCategories, DocCategoryColor } from "@/lib/data/docs/manifest";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  categoryTitle: string;
  categoryColor: DocCategoryColor;
}

export default function DocsSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Flatten and filter doc categories based on query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchLower = query.toLowerCase();
    const results: SearchItem[] = [];

    docCategories.forEach((category) => {
      category.articles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(searchLower) ||
          article.description.toLowerCase().includes(searchLower)
        ) {
          results.push({
            slug: article.slug,
            title: article.title,
            description: article.description,
            categoryTitle: category.title,
            categoryColor: category.color,
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to top 8 results
  }, [query]);

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setTimeout(() => setQuery(""), 200);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow render before focusing
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation within the dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setTimeout(() => setQuery(""), 200);
      return;
    }

    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedItem = searchResults[activeIndex];
      if (selectedItem) {
        router.push(`/docs/${selectedItem.slug}`);
        setIsOpen(false);
        setTimeout(() => setQuery(""), 200);
      }
    }
  };

  const getCategoryColorClass = (color: DocCategoryColor) => {
    switch (color) {
      case "blue": return "text-blue-400 bg-blue-500/10";
      case "purple": return "text-purple-400 bg-purple-500/10";
      case "emerald": return "text-emerald-400 bg-emerald-500/10";
      default: return "text-slate-400 bg-slate-500/10";
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button 
        type="button"
        className="mr-2 lg:mr-6 flex items-center gap-2 px-[18px] py-[8px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors group"
        onClick={() => {
          setIsOpen(true);
          setActiveIndex(0);
        }}
      >
        <svg 
          className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-[13.5px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:block">Search</span>
        <kbd className="hidden sm:inline-block font-sans text-[10px] font-medium text-slate-400 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 ml-2">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm transition-opacity" 
            aria-hidden="true" 
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-white/10">
              <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="w-full h-14 bg-transparent text-slate-200 text-lg placeholder:text-slate-500 focus:outline-none"
              />
              <button 
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors rounded-md hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                <kbd className="font-sans text-[10px] font-medium px-1.5 py-0.5">ESC</kbd>
              </button>
            </div>

            {/* Results Body */}
            {query.trim() !== "" ? (
              <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((item, index) => (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          onClick={() => {
                            setIsOpen(false);
                            setTimeout(() => setQuery(""), 200);
                          }}
                          className={`block px-4 py-3 rounded-xl transition-colors ${
                            index === activeIndex ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base font-medium text-slate-200 truncate pr-4">
                              {item.title}
                            </span>
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${getCategoryColorClass(item.categoryColor)}`}>
                              {item.categoryTitle}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-1">
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-14 text-center text-slate-400">
                    <p className="mb-2 text-lg">No results found</p>
                    <p className="text-sm">We couldn&apos;t find anything matching &quot;{query}&quot;</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 sm:p-6 text-sm text-slate-500">
                <p className="mb-4 text-xs font-semibold tracking-wider uppercase text-slate-400">Quick Links</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button onClick={() => { router.push('/docs/enablement-guide'); setIsOpen(false); setTimeout(() => setQuery(""), 200); }} className="text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="block text-slate-300 font-medium mb-0.5">Enablement Guide</span>
                    <span className="block text-xs">Learn how to setup workload environments.</span>
                  </button>
                  <button onClick={() => { router.push('/docs/user-guide'); setIsOpen(false); setTimeout(() => setQuery(""), 200); }} className="text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="block text-slate-300 font-medium mb-0.5">User Guide</span>
                    <span className="block text-xs">Complete lifecycle from trial to adoption.</span>
                  </button>
                  <button onClick={() => { router.push('/docs/security-document'); setIsOpen(false); setTimeout(() => setQuery(""), 200); }} className="text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="block text-slate-300 font-medium mb-0.5">Security Overview</span>
                    <span className="block text-xs">Compliance and infrastructure policies.</span>
                  </button>
                  <button onClick={() => { router.push('/docs/pricing'); setIsOpen(false); setTimeout(() => setQuery(""), 200); }} className="text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="block text-slate-300 font-medium mb-0.5">Pricing Details</span>
                    <span className="block text-xs">Information on credits and tiers.</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 rounded">↑</kbd><kbd className="bg-white/10 px-1.5 rounded">↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 rounded">↵</kbd> to select</span>
              </div>
              <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 rounded">esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
