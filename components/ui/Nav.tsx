/**
 * Nav — top navigation bar.
 * Stateless; no props required.
 */
export default function Nav() {
  return (
    <nav>
      <a href="#" className="nav-logo">
        <div className="logomark">K</div>
        <span className="wordmark">Karl</span>
      </a>

      <ul className="nav-links">
        <li><a href="#">Platform</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Security</a></li>
        <li><a href="/docs">Resources</a></li>
        <li><a href="#">About</a></li>
      </ul>

      <div className="nav-right">
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
