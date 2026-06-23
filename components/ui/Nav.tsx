import DocsSearch from "@/components/docs/DocsSearch";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";

/**
 * Nav — top navigation bar.
 */
interface NavProps {
  showDocsSearch?: boolean;
}

export default function Nav({ showDocsSearch = false }: NavProps) {
  return (
    <nav>
      <Link href="/" className="nav-logo">
        <img src="/karl-logo.png" alt="Karl Logo" className="w-[30px] h-[30px] rounded-md object-contain bg-white" />
        <span className="wordmark">Karl</span>
        {showDocsSearch && (
          <span className="text-slate-400 font-medium text-lg hidden sm:inline-block">Docs</span>
        )}
      </Link>

      <ul className="nav-links">
        <li><a href="#">Platform</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Security</a></li>
        <li><Link href="/docs">Resources</Link></li>
        <li><a href="#">About</a></li>
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
