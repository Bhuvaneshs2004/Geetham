"use client"; // Critical for state!

import React, { useState, useEffect } from 'react';
import IntroSplash from './components/IntroSplash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Food from './components/Foodmarquee';
import Menu from './components/Menu';
import dynamic from 'next/dynamic';

const CompanyMap = dynamic(() => import('./components/CompanyMap'), {
    ssr: false
});
import Testimonials from './components/ClientTestimonials';
import Marquee from './components/LogoMarquee';
import Footer from './components/Footer';

export default function HomePage() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        if (!introComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [introComplete]);

    return (
        <main>
            <IntroSplash onComplete={() => setIntroComplete(true)} />

            <div style={{
                opacity: introComplete ? 1 : 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: introComplete ? 'all' : 'none',
            }}>
                <Navbar />
                <Hero />
                <Food />
                <Testimonials />
                <CompanyMap companyName='Geetham' height='560px' />
                <Menu />
                <Marquee />
                <Footer />
            </div>
        </main>
    );
}