"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { industries, type Industry } from "@/lib/data/industries";

interface OtherSectorsProps {
  currentSlug: string;
}

export default function OtherSectors({ currentSlug }: OtherSectorsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter out current sector, leaving the other 7
  const otherSectors = industries.filter((ind) => ind.id !== currentSlug);

  const checkScrollLimits = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Use 1px buffer to account for rounding errors in scroll position
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollLimits();
      container.addEventListener("scroll", checkScrollLimits, { passive: true });
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollLimits);
      }
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [currentSlug]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const { clientWidth, scrollLeft } = container;
      // Scroll by ~75% of container width for a smooth chunk transition
      const amount = clientWidth * 0.75;
      const targetScroll =
        direction === "left" ? scrollLeft - amount : scrollLeft + amount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="other-sectors-section w-full py-20 border-b border-[#e7e5e4] bg-[#F7F6F2]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header with Title & Nav Buttons */}
        <div className="other-sectors-header flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-[28px] font-bold text-[#1c1917] tracking-tight">
              Explore Other Sectors
            </h2>
            <p className="text-sm text-[#78716c] mt-1">
              Discover how we empower other industries with AI intelligence
            </p>
          </div>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => handleScroll("left")}
              className={`p-2.5 rounded-full border border-[#e7e5e4] bg-white text-[#1c1917] hover:border-slate-400 hover:bg-slate-50 transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                !canScrollLeft ? "opacity-35 cursor-not-allowed" : ""
              }`}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className={`p-2.5 rounded-full border border-[#e7e5e4] bg-white text-[#1c1917] hover:border-slate-400 hover:bg-slate-50 transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                !canScrollRight ? "opacity-35 cursor-not-allowed" : ""
              }`}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport & Horizontal Track */}
        <div className="other-sectors-viewport-wrap relative">
          <div
            ref={scrollContainerRef}
            className="other-sectors-viewport overflow-x-auto flex gap-6 pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              msOverflowStyle: "none",
            }}
          >
            {otherSectors.map((sector) => (
              <Link
                key={sector.id}
                href={`/${sector.id}`}
                className="sector-card group flex flex-col bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300 flex-shrink-0"
              >
                {/* Compact Image/Placeholder with hover scale */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 border-b border-[#e7e5e4]">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-base mb-2 group-hover:text-[#7F77DD] transition-colors duration-150">
                      {sector.name}
                    </h3>
                    <p className="text-[#78716c] text-xs leading-relaxed line-clamp-2">
                      {sector.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#1c1917] group-hover:text-[#7F77DD] transition-colors duration-150">
                    Explore Solutions
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
