import React, { useState } from 'react';
import IntroSplash from './components/IntroSplash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Specials from './components/Specials';
import Chef from './components/Chef';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';

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
        position: 'fixed', bottom: '32px', right: '32px',
        width: '48px', height: '48px',
        background: 'var(--primary)', border: 'none', color: 'white',
        fontSize: '1.1rem', cursor: 'pointer', zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.3s ease',
        pointerEvents: visible ? 'all' : 'none',
        boxShadow: '0 4px 20px rgba(200,16,46,0.4)',
      }}
    >↑</button>
  );
};

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroSplash onComplete={() => setIntroComplete(true)} />

      {/*
        KEY FIXES:
        1. Removed overflow:'hidden'   → was hijacking the scroll container away from window
        2. Removed visibility:'hidden' → was collapsing all section heights to 0,
                                          making offsetTop/getBoundingClientRect useless
        3. Use opacity + pointerEvents only → content invisible before intro,
                                               but layout still exists in the DOM
                                               so scroll targets have correct positions
      */}
      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: introComplete ? 'all' : 'none',
        // No overflow, no visibility — just opacity
      }}>
        <Navbar />
        <Hero />
        <About />
        <Menu />
        <Specials />
        <Chef />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;