"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/data/industries";

/**
 * Industries — scroll-driven horizontal carousel using GSAP ScrollTrigger.
 * Each card is informational only (not clickable).
 *
 * Layout:
 *  - Mobile:  horizontal snap-scroll carousel (peek at next card, native touch swipe)
 *  - Desktop: GSAP pinned scroll-linked horizontal slider
 */
export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: any;
    let windowLoadHandler: (() => void) | undefined;
    let active = true;

    const initGSAP = async () => {
      // Dynamically import gsap and its ScrollTrigger plugin to prevent SSR issues
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      if (!active) return;

      // Register ScrollTrigger inside the browser
      gsap.registerPlugin(ScrollTrigger);

      // Measure after layout is final
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const progressBar = progressBarRef.current;

        if (!section || !track || !active) return;

        // Wrap the animation setup in gsap.context() scoped to sectionRef
        ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          // Pinned horizontal scroll for viewport sizes 768px and up (Desktop/Tablet)
          mm.add("(min-width: 768px)", () => {
            const getDistance = () => {
              const container = track.parentElement;
              if (!container) return 0;

              const style = window.getComputedStyle(track);
              const paddingRight = parseFloat(style.paddingRight) || 0;
              const marginRight = parseFloat(style.marginRight) || 0;

              // Calculate translation distance so the track ends flush with container client width
              const distance = track.scrollWidth - container.clientWidth;
              return Math.max(0, distance + paddingRight + marginRight);
            };

            gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + getDistance(),
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (progressBar) {
                    progressBar.style.width = `${self.progress * 100}%`;
                  }
                },
              },
            });
          });
        }, sectionRef);
      });

      // Call ScrollTrigger.refresh() on the window load event so distances are correct after images load
      windowLoadHandler = () => {
        ScrollTrigger.refresh();
      };

      if (document.readyState === "complete") {
        windowLoadHandler();
      } else {
        window.addEventListener("load", windowLoadHandler);
      }
    };

    initGSAP();

    return () => {
      active = false;
      if (ctx) {
        ctx.revert();
      }
      if (windowLoadHandler) {
        window.removeEventListener("load", windowLoadHandler);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="industries-section">
      <div className="industries-inner">
        {/* Header */}
        <div className="industries-header">
          <h2>Industries</h2>
          <p>Industry Expertise Delivering Your Sector&apos;s Critical KPIs</p>
        </div>

        {/* Viewport for horizontal track */}
        <div className="industries-viewport">
          <div ref={trackRef} className="industries-track">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/${industry.id}`}
                className="industry-card cursor-pointer decoration-none"
              >
                {/* Image — 1:1 ratio, full-bleed */}
                <div className="industry-card-image">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 768px) 72vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="industry-card-overlay" />
                </div>

                {/* Text */}
                <div className="industry-card-text">
                  <h3>{industry.name}</h3>
                  <p>{industry.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Progress Bar (Desktop only) */}
        <div className="industries-progress-wrap">
          <div ref={progressBarRef} className="industries-progress-bar" />
        </div>

        {/* Mobile scroll hint dots */}
        <div className="industries-dots">
          {industries.map((industry) => (
            <span key={industry.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
