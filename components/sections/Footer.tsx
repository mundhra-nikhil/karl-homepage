"use client";

import Image from "next/image";

/**
 * Footer — Replicates the Kanerika main footer structure exactly.
 */
export default function Footer() {
  return (
    <footer id="main-footer" className="kanerika-main-footer">
      <div className="footer-inner">

        {/* ── Top row: Logo + description + newsletter + social ── */}
        <div className="footer-logo-section">

          {/* Logo */}
          <div className="footer-logo-wrap">
            <Image
              src="https://kanerika.com/wp-content/uploads/2024/05/white-kanerika-Logo.svg"
              alt="Global Tech Consulting Firm | AI, Analytics and Automation | Kanerika"
              width={160}
              height={54}
              unoptimized
            />
          </div>

          {/* Description */}
          <div className="footer-desc-wrap">
            <p className="footer-desc">
              Kanerika is a leading provider of end-to-end AI, Migration,{" "}
              <span className="footer-desc-accent">
                Analytics, and&nbsp;Automation solutions with years of
                implementation expertize.&nbsp;
              </span>
            </p>
          </div>

          {/* Newsletter */}
          <div id="footer-news" className="footer-newsletter">
            <p className="footer-news-label">Subscribe for the latest updates.</p>
            <form
              className="footer-form"
              method="post"
              action="https://kanerika.com/?na=s"
            >
              <input type="hidden" name="nlang" value="" />
              <div className="footer-form-field">
                <label htmlFor="tnp-footer-email" className="footer-form-label">
                  Email
                </label>
                <input
                  id="tnp-footer-email"
                  className="footer-form-input"
                  type="email"
                  name="ne"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button type="submit" className="footer-form-btn">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social icons */}
          <div className="footer-social-icons" role="list">
            <span role="listitem">
              <a href="https://www.instagram.com/kanerika_inc/" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">
                <span className="sr-only">Instagram</span>
                <svg aria-hidden="true" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </span>

            <span role="listitem">
              <a href="https://www.facebook.com/people/Kanerika/100065296068420/" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon">
                <span className="sr-only">Facebook</span>
                <svg aria-hidden="true" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>
            </span>

            <span role="listitem">
              <a href="https://x.com/kanerikaSoft/" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="social-icon">
                <span className="sr-only">X-twitter</span>
                <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </span>

            <span role="listitem">
              <a href="https://www.linkedin.com/company/kanerika/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">
                <span className="sr-only">LinkedIn</span>
                <svg aria-hidden="true" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
            </span>

            <span role="listitem">
              <a href="https://www.youtube.com/@kanerikainc/" target="_blank" rel="noopener noreferrer" title="YouTube" className="social-icon">
                <span className="sr-only">YouTube</span>
                <svg aria-hidden="true" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>
            </span>
          </div>
        </div>

        {/* ── Navigation link columns ── */}
        <div className="footer-link-section">
          {/* Services */}
          <div className="footer-col">
            <p className="footer-col-heading">Services</p>
            <ul className="footer-col-links">
              <li><a href="https://kanerika.com/services/ai/">AI Consulting</a></li>
              <li><a href="https://kanerika.com/services/generative-ai/">Generative AI</a></li>
              <li><a href="https://kanerika.com/services/agentic-ai/">Agentic AI</a></li>
              <li><a href="https://kanerika.com/services/data-analytics/">Data Analytics</a></li>
              <li><a href="https://kanerika.com/services/data-governance/">Data Governance</a></li>
              <li><a href="https://kanerika.com/services/data-integration/">Data Integration</a></li>
              <li><a href="https://kanerika.com/services/rpa/">Intelligent Automation</a></li>
              <li><a href="https://kanerika.com/services/migration/">Migration</a></li>
            </ul>
          </div>

          {/* Business Functions */}
          <div className="footer-col">
            <p className="footer-col-heading">Business Functions</p>
            <ul className="footer-col-links">
              <li><a href="https://kanerika.com/business-functions/sales/">Sales</a></li>
              <li><a href="https://kanerika.com/business-functions/finance/">Finance</a></li>
              <li><a href="https://kanerika.com/business-functions/supply-chain/">Supply Chain</a></li>
              <li><a href="https://kanerika.com/business-functions/operations/">Operations</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="footer-col">
            <p className="footer-col-heading">Industries</p>
            <ul className="footer-col-links">
              <li><a href="https://kanerika.com/industries/bfsi/">BFSI</a></li>
              <li><a href="https://kanerika.com/industries/logistics-and-supply-chain/">Logistics &amp; Supply Chain</a></li>
              <li><a href="https://kanerika.com/industries/manufacturing/">Manufacturing</a></li>
              <li><a href="https://kanerika.com/industries/retail-and-fmcg/">Retail &amp; FMCG</a></li>
            </ul>
          </div>

          {/* Company + Resources */}
          <div className="footer-col">
            <p className="footer-col-heading">Company</p>
            <ul className="footer-col-links">
              <li><a href="https://kanerika.com/careers/">Careers</a></li>
              <li><a href="https://kanerika.com/partners/">Partners</a></li>
            </ul>
            <ul className="footer-col-links footer-col-links--mt">
              <li><a href="https://kanerika.com/resources/blogs/">Blogs</a></li>
              <li><a href="https://kanerika.com/resources/events-and-webinars/">Events &amp; Webinars</a></li>
              <li><a href="https://kanerika.com/submit-guest-blog/">Submit Guest Blog</a></li>
            </ul>
          </div>
        </div>

        {/* ── Badge + bottom bar row ── */}
        <div className="footer-social-section">

          {/* Badge rows */}
          <div className="footer-badges-row">
            <div className="footer-badges-group">
              <a href="https://www.goodfirms.co/company/kanerika-inc" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/GoodsFirms.svg" alt="GoodsFirms" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
              <a href="https://pars.cmmiinstitute.com/appraisals/71370" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/CMMI.svg" alt="CMMI" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
              <a href="https://clutch.co/profile/kanerika" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/Clutch-Light.svg" alt="Clutch" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
              <a href="https://www.capterra.in/software/1062440/flip" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/Capterra-Light.svg" alt="Capterra" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
            </div>

            <div className="footer-badge-divider" />

            <div className="footer-badges-group">
              <a href="https://www.glassdoor.co.in/Reviews/Kanerika-Software-Reviews-E1319224.htm" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/Glassdoor-Logo.svg" alt="Glassdoor" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
              <a href="https://www.g2.com/sellers/kanerika" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/Asset-20-1.svg" alt="G2 badge" width={0} height={0} style={{ height: "52px", width: "auto" }} unoptimized />
              </a>
              <a href="https://www.50pros.com/agency/kanerika?utm_source=widget&utm_medium=embed&utm_campaign=global-award" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/50PROS.svg" alt="50PROS" width={0} height={0} style={{ height: "52px", width: "auto" }} unoptimized />
              </a>
              <a href="https://www.greatplacetowork.in/great/company/kanerika-inc" target="_blank" rel="noopener noreferrer">
                <Image src="https://kanerika.com/wp-content/uploads/2024/05/Great-Place-To-Work.svg" alt="Great Place To Work" width={0} height={0} style={{ height: "42px", width: "auto" }} unoptimized />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright">© 2026 Copyright. All rights reserved</p>
            <ul className="footer-legal-links">
              <li><a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="/dpa/" target="_blank" rel="noopener noreferrer">DPA</a></li>
              <li><a href="https://kanerika.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></li>
              <li><a href="https://kanerika.com/sitemap_index.xml" target="_blank" rel="noopener noreferrer">Sitemap</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
