"use client";

import DocsSearch from "@/components/docs/DocsSearch";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Nav — top navigation bar.
 */
interface NavProps {
  showDocsSearch?: boolean;
}

export default function Nav({ showDocsSearch = false }: NavProps) {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="nav-logo">
        <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 dark:from-rose-400 dark:via-purple-400 dark:to-blue-400">
          Karl
        </span>
        {showDocsSearch && (
          <span className="text-black dark:text-white font-bold text-2xl hidden sm:inline-block">Docs</span>
        )}
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li className="nav-dropdown-wrapper">
          <Link href="/docs" className={`nav-dropdown-trigger ${pathname?.startsWith("/docs") ? "active" : ""}`}>
            Resources
          </Link>
          <div className="nav-dropdown-menu">
            <Link href="/docs/whitepaper" className={pathname === "/docs/whitepaper" ? "active" : ""}>
              About
            </Link>
            <Link href="/docs/security-document" className={pathname === "/docs/security-document" ? "active" : ""}>
              Security
            </Link>
            <Link href="/docs" className={pathname === "/docs" ? "active" : ""}>
              Documentation
            </Link>
          </div>
        </li>
      </ul>

      <div className="nav-right">
        {showDocsSearch && <DocsSearch />}
        {showDocsSearch && <ThemeToggle />}
        <div className="elementor-element elementor-element-6a629555 elementor-button-info lets-talk elementor-widget elementor-widget-button" data-id="6a629555" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
          <a className="elementor-button elementor-button-link elementor-size-sm" href="https://kanerika.com/contact-us/" target="_blank" rel="noopener noreferrer" title="Contact Us">
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">Contact Us</span>
              <span className="elementor-button-icon">
                <svg aria-hidden="true" className="e-font-icon-svg e-fas-arrow-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

