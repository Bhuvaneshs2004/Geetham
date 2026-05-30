
'use client';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';
import { scrollToSection } from '../utils/scrollTo';

const About = () => {
  const [ref, visible] = useScrollReveal();
  const [imgRef, imgVisible] = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div ref={imgRef} className={`about-visual ${imgVisible ? 'reveal' : ''}`}>
          <div className="about-img-main">
            <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80" alt="South Indian thali" />
          </div>
          <div className="about-img-accent">
            <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80" alt="Dosas" className='Dosaimage'/>
          </div>
          {/* <div className="about-badge">
            <span className="badge-num">15+</span>
            <span className="badge-text">Years of<br />Excellence</span>
          </div> */}
          <div className="about-pattern" />
        </div>

        <div ref={ref} className={`about-content ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Our Story</div>
          <h2 className="section-title">
            A Legacy of <em>Authentic</em><br />South Indian Flavors
          </h2>
          <div className="gold-line" />
          <p className="about-text">
            Founded in 2010, Geetham Veg Restaurant was born from a deep love for the rich culinary traditions of South India. What started as a humble family kitchen has blossomed into Chennai's most beloved vegetarian dining destination.
          </p>
          <p className="about-text">
            Every dish we serve is a tribute to the time-honored recipes passed down through generations — cooked with the purest ingredients, the finest spices, and an unwavering commitment to authenticity.
          </p>

          <div className="about-pillars">
            {[
              { icon: '🌾', title: 'Farm Fresh', desc: 'Ingredients sourced daily from local farms' },
              { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Culinary masters with decades of experience' },
              { icon: '🚫', title: 'No Compromise', desc: 'Pure vegetarian, no artificial additives' },
            ].map((p, i) => (
              <div key={i} className="about-pillar" style={{ transitionDelay: `${i * 0.15}s` }}>
                <span className="pillar-icon">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <small>{p.desc}</small>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="about-cta1">
            <button className="btn-primary" onClick={() => scrollToSection('#menu')}>
              View Our Menu
            </button>
            <button className="btn-outline" onClick={() => scrollToSection('#contact')}>
              Get Directions
            </button>
          </div> */}
        </div>
      </div>

      <div className="about-bg-text">GEETHAM</div>
    </section>
  );
};

export default About;