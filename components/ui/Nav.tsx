import Image from "next/image";

/**
 * Nav — top navigation bar.
 * Stateless; no props required.
 */
export default function Nav() {
  return (
    <nav>
      <a href="#" className="nav-logo">
        <Image
          src="/karl logo.png"
          alt="Karl Logo"
          width={30}
          height={30}
          className="object-contain"
        />
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
        <a href="#" className="n-login">Login v</a>
        <a href="#" className="n-demo">Request a Demo</a>
      </div>
    </nav>
  );
}
