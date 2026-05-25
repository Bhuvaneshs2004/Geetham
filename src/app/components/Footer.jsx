// Footer.jsx
import '../styles/Footer.css';
import Image from 'next/image';
import Link from 'next/link';

const NAV_EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Catering', href: '/catering' },
];

const NAV_EXPERIENCE = [
  { label: 'Dine In', href: '/dine-in' },
  { label: 'Takeaway', href: '/takeaway' },
  { label: 'Home Delivery', href: '/delivery' },
  { label: 'Corporate Orders', href: '/corporate' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Festive Specials', href: '/specials' },
];

const CONTACT = [
  { icon: '📍', label: 'Address', text: 'Near Chennai International Airport,\nPallavaram, Chennai – 600 043' },
  { icon: '📞', label: 'Reservations', text: '+91 44 1234 5678' },
  { icon: '🕐', label: 'Hours', text: '6:00 AM – 11:00 PM\nAll days including holidays' },
  { icon: '✉️', label: 'Email', text: 'info@geetham.in' },
];

/* ── Social icons as inline SVG ──────────────────────────────────── */
const SOCIAL = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#2C1F0E" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'Google Maps',
    href: '#',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

/* ── Sub-components ─────────────────────────────────────────────── */

function NavColumn({ heading, links }) {
  return (
    <div className="footer-col">
      <p className="footer-col-heading">{heading}</p>
      <ul className="footer-col-links">
        {links.map((l) => (
          <li key={l.label}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* ── Brand column ── */}
        <div className="footer-brand">

          {/* Logo only — no wordmark text */}
          <div className="footer-logo-wrap">
            <Image src="/logos/geetham_logo.png" alt="Geetham Logo" width={150} height={50} />
          </div>

          <p className="footer-brand-desc">
            A celebrated pure vegetarian restaurant near Chennai Airport, serving
            authentic South Indian flavours with warmth and tradition since our
            founding.
          </p>

          {/* Social icons */}
          <div className="footer-social-row">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-btn"
                aria-label={s.label}
                title={s.label}
              >
                {s.svg}
              </a>
            ))}
          </div>

        </div>

        <NavColumn heading="Explore" links={NAV_EXPLORE} />
        <NavColumn heading="Experience" links={NAV_EXPERIENCE} />

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Geetham Restaurant. All rights reserved.
        </p>
        <ul className="footer-legal">
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Use</Link></li>
        </ul>
        <div className="footer-cert">
          <span className="" aria-hidden="true" />
        </div>
      </div>

    </footer>
  );
}