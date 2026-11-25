import Link from "next/link";
import Image from "next/image";
import { shop } from "@/lib/content";
export function Phin({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="57" cy="31" rx="38" ry="10" />
      <path d="M24 35l6 48q27 13 54 0l6-48M91 42h13l-4 22H88M44 20v-8q13-6 26 0v8M19 86q38 19 76 0M28 96l7 39q22 13 45 0l7-39" />
      <path d="M39 108q18 7 37 0l-4 20q-13 7-28 0z" fill="currentColor" />
      <path d="M94 14l8-10M105 25l12-4M13 67l-9-4" />
    </svg>
  );
}
function BrandLogo() {
  return (
    <Link href="/" className="brand-logo" aria-label="Phin and Foam home">
      <span className="brand-logo-frame">
        <Image
          src="/images/brand/official-logo.png"
          alt="Phin & Foam Vietnamese Coffee"
          width={1448}
          height={1086}
          sizes="(max-width: 700px) 108px, 124px"
        />
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <div className="announcement">
        SMALL-BATCH COFFEE · NORTH AUSTIN{" "}
        <span>VIETNAMESE ROOTS. AUSTIN SOUL.</span>
      </div>
      <header className="header">
        <BrandLogo />
        <nav aria-label="Main navigation">
          <Link href="/#upcoming">Find us</Link>
          <Link href="/#contact">Book an event</Link>
          <Link href="/#about">Meet us</Link>
        </nav>
        <a
          className="instagram-nav"
          href={shop.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Phin and Foam on Instagram"
        >
          ◎
        </a>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <BrandLogo />
        <p>
          Same roots,
          <br />
          <em>a little bit more foam.</em>
        </p>
        <div className="footer-socials">
          <span>Good coffee. Better company.</span>
          <nav aria-label="Social profiles">
            <a href={shop.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={shop.tiktok} target="_blank" rel="noreferrer">
              TikTok ↗
            </a>
            <a href={shop.facebook} target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Phin & Foam Coffee LLC</span>
        <span>SMALL BATCH · AUSTIN, TX</span>
        <a href={`mailto:${shop.contactEmail}`}>{shop.contactEmail}</a>
      </div>
    </footer>
  );
}
