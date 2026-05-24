import React, { useEffect, useRef, useState } from 'react';
import '../styles/IntroSplash.css';
import introVideo from '../assets/Intro.mp4';

const IntroSplash = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('playing'); // playing | overlay | transitioning | done
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setPhase('overlay');
      setTimeout(() => setShowWelcome(true), 300);
      setTimeout(() => {
        setPhase('transitioning');
        setTimeout(() => {
          setPhase('done');
          document.body.classList.remove('no-scroll');
          onComplete();
        }, 900);
      }, 2800);
    };

    const handleError = () => {
      setTimeout(() => {
        setPhase('overlay');
        setTimeout(() => setShowWelcome(true), 300);
        setTimeout(() => {
          setPhase('transitioning');
          setTimeout(() => {
            setPhase('done');
            document.body.classList.remove('no-scroll');
            onComplete();
          }, 900);
        }, 2200);
      }, 400);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`intro-splash ${phase === 'transitioning' ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        src={introVideo}
      />

      {/* Cinematic bars */}
      <div className="cinema-bar cinema-bar-top" />
      <div className="cinema-bar cinema-bar-bottom" />

      {/* Overlay */}
      <div className={`intro-overlay ${phase === 'overlay' || phase === 'transitioning' ? 'visible' : ''}`} />

      {/* Welcome text */}
      {showWelcome && (
        <div className={`welcome-text-wrap ${phase === 'transitioning' ? 'fade-out-text' : ''}`}>
          <div className="welcome-eyebrow">
            <span className="eyebrow-line" />
            <span>Est. 2010</span>
            <span className="eyebrow-line" />
          </div>
          <h1 className="welcome-heading">
            <span className="welcome-line welcome-line-1">Welcome to</span>
            <span className="welcome-line welcome-line-2">Geetham</span>
          </h1>
          <p className="welcome-subtitle">Authentic South Indian Cuisine</p>
          <div className="welcome-ornament">
            <span className="ornament-dot" />
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
            <span className="ornament-dot" />
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroSplash;