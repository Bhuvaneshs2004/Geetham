import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { scrollToSection } from '../utils/scrollTo';

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Menu',     href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [open, setOpen]                   = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll-spy: walk sections from bottom up, first one whose
      // top edge has passed the viewport threshold wins
      const ids = navLinks.map(l => l.href.replace('#', ''));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);                    // ✅ uses el.offsetTop, always correct
    setActiveSection(href.replace('#', ''));
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">

        <a href="#home" className="navbar-logo" onClick={(e) => handleNav(e, '#home')}>
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M8 10 Q14 6 20 10 Q14 8 8 10Z" fill="#C8102E" />
              <path d="M7 14 Q14 10 21 14 Q14 12 7 14Z" fill="#D4AF37" />
              <path d="M8 18 Q14 14 20 18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">Geetham</span>
            <span className="logo-tagline">Veg Restaurant</span>
          </div>
        </a>

        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="nav-cta-mobile">
            <a href="tel:7397222111" className="btn-primary">Book Table</a>
          </div>
        </nav>

        <div className="navbar-right">
          <div className="nav-phones">
            <a href="tel:7397222111" className="nav-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/>
              </svg>
              73972 22111
            </a>
            <a href="tel:7397623777" className="nav-phone nav-phone-whatsapp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              73976 23777
            </a>
          </div>
          <button
            className={`hamburger ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;