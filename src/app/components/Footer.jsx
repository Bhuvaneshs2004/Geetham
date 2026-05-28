'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../styles/Footer.css';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Menu', href: '/menu' },
  { label: 'Gallery', href: '#food-gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Catering', href: '/events#catering' },
];

const experienceLinks = [
  { label: 'Dine In', href: '#' },
  { label: 'Takeaway', href: '#' },
  { label: 'Home Delivery', href: '#' },
  { label: 'Corporate Orders', href: '/events' },
  { label: 'Reservations', href: 'tel:7397222111' },
  { label: 'Festive Specials', href: '#food-gallery' },
];

const hours = [
  { days: 'Mon – Fri', time: '11am – 10pm' },
  { days: 'Saturday',  time: '10am – 11pm' },
  { days: 'Sunday',    time: '10am – 10pm' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/geethamvegrestaurant/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor">
        <path d="M360 80c-130.5 0-200 78.8-200 185.2V352h-80v112h80v208h120V464h96l16-112h-112v-76.4c0-30.6 8.4-51.6 52-51.6H392V80h-32z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/geethamvegrestaurant',
    icon: (
      <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor">
        <path d="M320 96c-72.6 0-81.7.3-110.2 1.6C181.3 99 163.4 103 148 109.6c-15.9 6.8-29.4 16-42.8 29.4C91.8 152.4 82.6 165.9 75.8 181.8 69.2 197.2 65.2 215.1 63.8 244c-1.3 28.5-1.6 37.6-1.6 110.2s.3 81.7 1.6 110.2c1.4 28.9 5.4 46.8 12 62.2 6.8 15.9 16 29.4 29.4 42.8 13.4 13.4 26.9 22.6 42.8 29.4 15.4 6.6 33.3 10.6 62.2 12 28.5 1.3 37.6 1.6 110.2 1.6s81.7-.3 110.2-1.6c28.9-1.4 46.8-5.4 62.2-12 15.9-6.8 29.4-16 42.8-29.4 13.4-13.4 22.6-26.9 29.4-42.8 6.6-15.4 10.6-33.3 12-62.2 1.3-28.5 1.6-37.6 1.6-110.2s-.3-81.7-1.6-110.2c-1.4-28.9-5.4-46.8-12-62.2-6.8-15.9-16-29.4-29.4-42.8-13.4-13.4-26.9-22.6-42.8-29.4-15.4-6.6-33.3-10.6-62.2-12C401.7 96.3 392.6 96 320 96zm0 48.2c71.4 0 79.9.3 108 1.5 26.1 1.2 40.2 5.5 49.6 9.2 12.5 4.8 21.4 10.6 30.7 19.9 9.3 9.3 15.1 18.2 19.9 30.7 3.7 9.4 8 23.5 9.2 49.6 1.2 28.1 1.5 36.6 1.5 108s-.3 79.9-1.5 108c-1.2 26.1-5.5 40.2-9.2 49.6-4.8 12.5-10.6 21.4-19.9 30.7-9.3 9.3-18.2 15.1-30.7 19.9-9.4 3.7-23.5 8-49.6 9.2-28.1 1.2-36.6 1.5-108 1.5s-79.9-.3-108-1.5c-26.1-1.2-40.2-5.5-49.6-9.2-12.5-4.8-21.4-10.6-30.7-19.9-9.3-9.3-15.1-18.2-19.9-30.7-3.7-9.4-8-23.5-9.2-49.6-1.2-28.1-1.5-36.6-1.5-108s.3-79.9 1.5-108c1.2-26.1 5.5-40.2 9.2-49.6 4.8-12.5 10.6-21.4 19.9-30.7 9.3-9.3 18.2-15.1 30.7-19.9 9.4-3.7 23.5-8 49.6-9.2 28.1-1.2 36.6-1.5 108-1.5zm0 82a173.8 173.8 0 1 0 0 347.6 173.8 173.8 0 0 0 0-347.6zm0 286.4a112.6 112.6 0 1 1 0-225.2 112.6 112.6 0 0 1 0 225.2zm221-293a40.6 40.6 0 1 0-81.2 0 40.6 40.6 0 0 0 81.2 0z"/>
      </svg>
    ),
  },

];

const Footer = () => {
  return (
    <footer className="footer">

      {/* ── Top saffron line ── */}
      <div className="footer-topline" />

      {/* ── CTA Band ── */}
      <div className="footer-cta-band">
        <div className="footer-cta-left">
          <h3 className="footer-cta-title">
            Ready for an authentic South Indian experience?
          </h3>
          <p className="footer-cta-sub">
            Dine in · Takeaway · Corporate catering available
          </p>
        </div>
        <div className="footer-cta-btns">
          <a href="tel:7397222111" className="footer-btn-saffron">
            <svg width="13" height="13" viewBox="0 0 640 640" fill="currentColor">
              <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
            </svg>
            Reserve a Table
          </a>
          <Link href="/menu" className="footer-btn-ghost">
            View Menu
          </Link>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="footer-main">

        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <Image
              src="/assets/Gethamlogo.png"
              alt="Geetham Logo"
              width={130}
              height={42}
              className="footer-logo-img"
            />
          </div>
          <span className="footer-brand-tag">Pure Veg · South Indian Cuisine</span>
          <p className="footer-brand-desc">
            A celebrated vegetarian restaurant near Chennai Airport, crafting
            authentic South Indian flavours with warmth and tradition since our
            founding.
          </p>

          {/* Contact info */}
          <div className="footer-contact-rows">
            <a href="tel:7397222111" className="footer-contact-item">
              <span className="footer-contact-dot">
                <svg width="10" height="10" viewBox="0 0 640 640" fill="#E8A355">
                  <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
                </svg>
              </span>
              73972 22111 · 73976 23777
            </a>
            <a href="/map" className="footer-contact-item">
              <span className="footer-contact-dot">
                <svg width="10" height="10" viewBox="0 0 640 640" fill="#E8A355">
                  <path d="M320 64C217.6 64 134.4 147.2 134.4 249.6c0 140.6 168.4 309.2 176.1 316.9a13.3 13.3 0 0 0 19 0C337.2 558.8 505.6 390.2 505.6 249.6 505.6 147.2 422.4 64 320 64zm0 256a70.4 70.4 0 1 1 0-140.8A70.4 70.4 0 0 1 320 320z"/>
                </svg>
              </span>
              No. 12, Kaveri Nagar, Chennai – 600016
            </a>
          </div>

          {/* Social icons */}
          <div className="footer-social-row">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-btn"
                aria-label={s.label}
                target="_blank"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Explore</h4>
          <ul className="footer-col-links">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Experience</h4>
          <ul className="footer-col-links">
            {experienceLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Opening Hours</h4>
          <div className="footer-hours-card">
            <p className="footer-hours-title">Weekly Schedule</p>
            {hours.map((h) => (
              <div key={h.days} className="footer-hours-row">
                <span className="footer-hours-day">{h.days}</span>
                <span className="footer-hours-time">{h.time}</span>
              </div>
            ))}
          </div>
          <div className="footer-veg-badge">
            <span className="footer-veg-dot" />
            100% Pure Vegetarian
          </div>
        </div>

      </div>

      {/* ── Divider ── */}
      <div className="footer-divider-wrap">
        <div className="footer-divider" />
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Geetham Restaurant. All rights reserved.
        </p>
        <ul className="footer-legal">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
        <p className="footer-tagline">Crafted with love since 1988</p>
      </div>

    </footer>
  );
};

export default Footer;