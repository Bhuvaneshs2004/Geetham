'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/Hero.css';
import { scrollToSection } from '../utils/scrollTo';

const Hero = () => {
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.setProperty('--parallax', `${window.scrollY * 0.4}px`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* <div className="hero-bg temple-archway" style={{ maxWidth: '800px', margin: '0 auto', position: 'absolute', left: 0, right: 0, height: '90%' }}>
        <video
          className="hero-video"
          src="/assets/geetham-vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, var(--tamarind-brown), transparent)' }} />
      </div> */}

      <div className="hero-deco hero-deco-tl" />
      <div className="hero-deco hero-deco-br" />

      <div className={`hero-content ${loaded ? 'animate-in' : ''}`}>


        <h1 className="hero-title">
          <span className="hero-title-line-1 cormorant-garamond-Heading">Indulge in</span>
          <em className="hero-title-em cormorant-garamond-Heading">Authentic</em>
          <span className="hero-title-line-3 cormorant-garamond-Heading">Indian Food!</span>
        </h1>

        <p className="hero-subtitle">
          A symphony of spices, tradition, and love — <br />
          crafted to perfection with generations-old recipes
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={() => scrollToSection('#menu')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Explore Menu
          </button>
          <button className="btn-outline" onClick={() => scrollToSection('#reservation')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v3M16 2v3M3 9h18M21 7v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h16a1 1 0 011 1z" />
            </svg>
            Book a Table
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">15+</span>
            <span className="stat-label">Years of Excellence</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Daily Guests</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-num">4.9★</span>
            <span className="stat-label">Customer Rating</span>
          </div>
        </div>
      </div>

      {/* <div className="hero-scroll-hint" onClick={() => scrollToSection('#about')}>
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div> */}

      <div className="hero-float hero-float-1">
        <span className="float-emoji">🍛</span>
        <div>
          <strong>Biryani Special</strong>
          <small>Chef's Signature</small>
        </div>
      </div>
      <div className="hero-float hero-float-2">
        <span className="float-emoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg></span>
        <div>
          <strong>Top Rated</strong>
          <small>Since 2010</small>
        </div>
      </div>
    </section>
  );
};

export default Hero;