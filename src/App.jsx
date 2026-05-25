import React, { useState, useEffect } from 'react';
import IntroSplash from './app/components/IntroSplash';
import Navbar from './app/components/Navbar';
import Hero from './app/components/Hero';
import Food from './app/components/Foodmarquee';
import Menu from './app/components/Menu';
import Specials from './app/components/Specials';
import Chef from './app/components/Chef';
import Gallery from './app/components/Gallery';
// import Testimonials from './app/components/Testimonials';
import Reservation from './app/components/Reservation';
import Contact from './app/components/Contact';
import Footer from './app/components/Footer';
import Testimonials from './app/components/ClientTestimonials';
import Marquee from './app/components/LogoMarquee';
import CompanyMap from "./app/components/CompanyMap"
import '../src/app/styles/global.css';

const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        background: 'var(--primary)',
        border: 'none',
        color: 'white',
        fontSize: '1.1rem',
        cursor: 'pointer',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.3s ease',
        pointerEvents: visible ? 'all' : 'none',
        boxShadow: '0 4px 20px rgba(200,16,46,0.4)',
      }}
    >
      ↑
    </button>
  );
};

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Disable scroll while intro video is playing
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [introComplete]);

  return (
    <>
      <IntroSplash onComplete={() => setIntroComplete(true)} />

      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: introComplete ? 'all' : 'none',
        }}
      >
        <Navbar />
        <Hero />
        <Food />
        <Testimonials />
        <CompanyMap companyName='Geetham' height='560px'/>
        <Menu />
        <Marquee/>
        <Footer />
        {/* <Specials />
        <Chef />
        <Gallery />
        <Reservation />
        <Contact />
        <ScrollToTop /> */}
      </div>
    </>
  );
}

export default App;