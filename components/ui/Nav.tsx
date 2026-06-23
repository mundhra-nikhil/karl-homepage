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
        <img src="/Karl logo.svg" alt="Karl Logo" className="h-[30px] w-auto object-contain" />
        {showDocsSearch && (
          <span className="text-black dark:text-white font-bold text-xl hidden sm:inline-block">Docs</span>
        )}
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li><a href="#">Platform</a></li>
        <li><a href="#">Solutions</a></li>
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
        <a href="#" className="n-login" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
          Login
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{flexShrink: 0}}>
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#" className="n-demo">Request a Demo</a>
      </div>
    </nav>
  );
}

