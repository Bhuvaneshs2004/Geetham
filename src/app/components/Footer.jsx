// Footer.jsx

'use client';
import Link from 'next/link';  // ← add this
import '../styles/Footer.css';
import Image from 'next/image';

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
  {
    icon: '📍',
    label: 'Address',
    text: 'Near Chennai International Airport,\nPallavaram, Chennai – 600 043',
  },
  {
    icon: '📞',
    label: 'Reservations',
    text: '+91 44 1234 5678',
  },
  {
    icon: '🕐',
    label: 'Hours',
    text: '6:00 AM – 11:00 PM\nAll days including holidays',
  },
  {
    icon: '✉️',
    label: 'Email',
    text: 'info@geetham.in',
  },
];

/* ── Social icons ───────────────────────────────────────── */

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/geethamvegrestaurant/',
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },

  {
    label: 'Instagram',
    href: 'https://www.instagram.com/geethamvegrestaurant/',
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },

  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@geethamvegrestaurant',
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },

];

/* ── Nav Column ───────────────────────────────────────── */

function NavColumn({ heading, links }) {
  return (
    <div className="footer-col">
      <p className="footer-col-heading">{heading}</p>
      <ul className="footer-col-links">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>  {/* ← Link not a */}
          </li>
        ))}
      </ul>
    </div>
  );
}
/* ── Footer ───────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">

          {/* Logo */}
          <div className="footer-logo-wrap">
            <Image
              src="/assets/Gethamlogo.png"
              alt="Geetham Restaurant"
              width={180}
              height={80}
              className="footer-logo-img"
              priority
            />
          </div>

          {/* Description */}
          <p className="footer-brand-desc">
            A celebrated pure vegetarian restaurant near Chennai Airport,
            serving authentic South Indian flavours with warmth and tradition.
          </p>

          {/* Social */}
<div className="footer-social-row">
  {SOCIAL.map((s) =>
    s.internal ? (
      <Link
        key={s.label}
        href={s.href}
        className="footer-social-btn"
        aria-label={s.label}
      >
        {s.svg}
      </Link>
    ) : (
      
       <a key={s.label}
        href={s.href}
        className="footer-social-btn"
        aria-label={s.label}
        target="_blank"
        rel="noopener noreferrer"
      >
        {s.svg}
      </a>
    )
  )}
</div>

        </div>

        {/* Navigation */}
        <NavColumn
          heading="Explore"
          links={NAV_EXPLORE}
        />

        <NavColumn
          heading="Experience"
          links={NAV_EXPERIENCE}
        />

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <p className="footer-copy">
          © {new Date().getFullYear()} Geetham Restaurant.
          All rights reserved.
        </p>
        <ul className="footer-legal">
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Use</Link></li>
        </ul>

      </div>

    </footer>
  );
}