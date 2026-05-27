'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import '../styles/Navbar.css';
import { scrollToSection } from '../utils/scrollTo';

const navLinks = [
  { label: 'Home', href: '#home', type: 'scroll' },

  { label: 'About', href: '/about', type: 'route' },

  { label: 'Menu', href: '/menu', type: 'route' },

  { label: 'Near You', href: '/map', type: 'route' },

  { label: 'Specials', href: '#food-gallery', type: 'scroll' },

  {label:'Events & Corporate Booking', href:'/events', type:'route'}

];

const Navbar = () => {

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState('home');

  const [showNavbar, setShowNavbar] =
    useState(true);

  const [lastScrollY, setLastScrollY] =
    useState(0);

  /* ─────────────────────────────────────
     Navbar scroll behavior
  ───────────────────────────────────── */
  useEffect(() => {

    const onScroll = () => {

      /* Prevent navbar hide while menu open */
      if (open) return;

      const currentScrollY = window.scrollY;

      /* Blur effect */
      setScrolled(currentScrollY > 60);

      /* Hide navbar */
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 120
      ) {
        setShowNavbar(false);
      }

      /* Show navbar */
      else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);

      /* Only run scroll spy on homepage */
      if (pathname !== '/') return;

      const ids = navLinks
        .filter(link => link.type === 'scroll')
        .map(link => link.href.replace('#', ''));

      for (let i = ids.length - 1; i >= 0; i--) {

        const el = document.getElementById(ids[i]);

        if (
          el &&
          currentScrollY >= el.offsetTop - 140
        ) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );
    };

  }, [lastScrollY, open, pathname]);

  /* ─────────────────────────────────────
     Lock body scroll
  ───────────────────────────────────── */
  useEffect(() => {

    if (open) {
      document.body.style.overflow = 'hidden';
    }

    else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };

  }, [open]);

  /* ─────────────────────────────────────
     Scroll navigation
  ───────────────────────────────────── */
  const handleScrollNav = (e, href) => {

    e.preventDefault();

    setOpen(false);

    /* Go homepage first if not already there */
    if (pathname !== '/') {

      window.location.href = '/' + href;

      return;
    }

    scrollToSection(href);

    setActiveSection(
      href.replace('#', '')
    );
  };

  return (
    <>

      {/* ─────────────────────────────
         Navbar
      ───────────────────────────── */}
      <header
        className={`
          navbar
          ${scrolled ? 'scrolled' : ''}
          ${showNavbar ? 'navbar-show' : 'navbar-hide'}
        `}
      >

        <div className="navbar-inner">

          {/* ─────────────────────────
             Logo
          ───────────────────────── */}
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) =>
              handleScrollNav(e, '#home')
            }
          >

            <div className="logo-icon">

              <Image
                src="/assets/Gethamlogo.png"
                alt="Geetham Logo"
                className="logo-image"
                width={130}
                height={42}
                priority
              />

            </div>

          </a>

          {/* ─────────────────────────
             Navigation
          ───────────────────────── */}
          <nav
            className={`
              navbar-nav
              ${open ? 'open' : ''}
            `}
          >

            {navLinks.map((link) => {

              /* ─────────────────────
                 ROUTE LINKS
              ───────────────────── */
              if (link.type === 'route') {

                const routeActive =
                  pathname === link.href;

                return (

                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      nav-link
                      ${routeActive ? 'active' : ''}
                    `}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>

                );
              }

              /* ─────────────────────
                 SCROLL LINKS
              ───────────────────── */
              const scrollActive =
                activeSection ===
                link.href.replace('#', '');

              return (

                <a
                  key={link.href}
                  href={link.href}
                  className={`
                    nav-link
                    ${scrollActive ? 'active' : ''}
                  `}
                  onClick={(e) =>
                    handleScrollNav(e, link.href)
                  }
                >
                  {link.label}
                </a>

              );

            })}

            {/* Mobile CTA */}
            <div className="nav-cta-mobile">

              <a
                href="tel:7397222111"
                className="btn-primary"
              >
                Book Table
              </a>

            </div>

          </nav>

          {/* ─────────────────────────
             Right Side
          ───────────────────────── */}
          <div className="navbar-right">

            {/* Phones */}
<div className="nav-phones">

  <a href="tel:7397222111" className="nav-phone">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      className="phone-icon"
      width='15'
      height='15'
    >
      <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
    </svg>

    <span>73972 22111</span>
  </a>

  <a
    href="tel:7397623777"
    className="nav-phone nav-phone-whatsapp"
  >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width='16' height='16' fill='green'><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>

    <span>73976 23777</span>
  </a>

</div>

            {/* Hamburger */}
            <button
              className={`
                hamburger
                ${open ? 'active' : ''}
              `}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >

              {open ? (

                <svg
                  className="menu-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M55.1 73.5C45.7 64.1 45.7 48.9 55.1 39.5C64.5 30.1 79.7 30.1 89.1 39.5L192 142.4L294.9 39.5C304.3 30.1 319.5 30.1 328.9 39.5C338.3 48.9 338.3 64.1 328.9 73.5L226 176.4L328.9 279.3C338.3 288.7 338.3 303.9 328.9 313.3C319.5 322.7 304.3 322.7 294.9 313.3L192 210.4L89.1 313.3C79.7 322.7 64.5 322.7 55.1 313.3C45.7 303.9 45.7 288.7 55.1 279.3L158 176.4L55.1 73.5z"
                  />
                </svg>

              ) : (

                <svg
                  className="menu-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path
                    fill="currentColor"
                    d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
                  />
                </svg>

              )}

            </button>

          </div>

        </div>

      </header>

      {/* ─────────────────────────────
         Backdrop
      ───────────────────────────── */}
      <div
        className={`
          navbar-backdrop
          ${open ? 'open' : ''}
        `}
        onClick={() => setOpen(false)}
      />

    </>
  );
};

export default Navbar;