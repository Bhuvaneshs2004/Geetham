'use client';
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { scrollToSection } from '../utils/scrollTo';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // New navbar animation states
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Background blur effect
      setScrolled(currentScrollY > 60);

      // Hide navbar on scroll down
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setShowNavbar(false);
      }

      // Show navbar on scroll up
      else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);

      // Scroll spy
      const ids = navLinks.map((l) => l.href.replace('#', ''));

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);

        if (el && currentScrollY >= el.offsetTop - 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const handleNav = (e, href) => {
    e.preventDefault();

    setOpen(false);

    scrollToSection(href);

    setActiveSection(href.replace('#', ''));
  };

  return (
    <header
      className={`navbar
        ${scrolled ? 'scrolled' : ''}
        ${showNavbar ? 'navbar-show' : 'navbar-hide'}
      `}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNav(e, '#home')}
        >
          <div className="logo-icon">
            <img
              src="/assets/Gethamlogo.png"
              alt="Geetham Logo"
              className="logo-image"
            />
          </div>
        </a>

        {/* Navigation */}
        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.replace('#', '')
                ? 'active'
                : ''
                }`}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          <div className="nav-cta-mobile">
            <a href="tel:7397222111" className="btn-primary">
              Book Table
            </a>
          </div>
        </nav>

        {/* Right Side */}
        <div className="navbar-right">

          <div className="nav-phones">

            <a href="tel:7397222111" className="nav-phone">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
              </svg>

              73972 22111
            </a>

            <a
              href="tel:7397623777"
              className="nav-phone nav-phone-whatsapp"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>

              73976 23777
            </a>

          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;