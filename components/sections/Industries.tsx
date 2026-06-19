import Image from "next/image";
import { industries } from "@/lib/data/industries";

/**
 * Industries — grid of industry cards.
 * Each card is informational only (not clickable).
 *
 * Layout:
 *  - Mobile:  horizontal snap-scroll carousel (peek at next card)
 *  - Tablet:  2-column grid
 *  - Desktop: 4-column grid
 */
export default function Industries() {
  return (
    <section className="industries-section">
      <div className="industries-inner">
        {/* Header */}
        <div className="industries-header">
          <h2>Industries</h2>
          <p>Industry Expertise Delivering Your Sector&apos;s Critical KPIs</p>
        </div>

        {/* Grid / Carousel */}
        <div className="industries-grid">
          {industries.map((industry) => (
            <div key={industry.id} className="industry-card">
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

              {/* Bottom accent bar */}
              <div className="industry-card-accent" />
            </div>
          ))}
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
