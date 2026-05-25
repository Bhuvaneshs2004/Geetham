import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Contact.css';

const Contact = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div ref={ref} className={`contact-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Find Us</div>
          <h2 className="section-title">Visit <em>Geetham</em></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-cards">
            {[
              { icon: '📍', title: 'Address', lines: ['15/4, 5th Avenue, H-Block,', 'Anna Nagar, Chennai – 600040', 'Tamil Nadu, India'] },
              { icon: '📞', title: 'Phone & WhatsApp', lines: ['73972 22111', '73976 23777'] },
              { icon: '🕐', title: 'Hours', lines: ['Monday – Sunday', '7:30 AM – 10:30 PM', 'Open All Days'] },
              { icon: '📧', title: 'Email', lines: ['info@geethamveg.com', 'catering@geethamveg.com'] },
            ].map((card, i) => (
              <ContactCard key={i} card={card} index={i} />
            ))}
          </div>

          <div className="contact-map-wrap">
            <div className="map-placeholder">
              <div className="map-pin-icon">📍</div>
              <h3>Geetham Veg Restaurant</h3>
              <p>Anna Nagar, Chennai</p>
              <a
                href="https://maps.google.com/?q=Anna+Nagar+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA Banner */}
        <div className="whatsapp-banner">
          <span className="wa-icon">💬</span>
          <div>
            <strong>Order via WhatsApp</strong>
            <p>Fast, easy delivery to your doorstep. Chat with us now!</p>
          </div>
          <a href="https://wa.me/917397623777" target="_blank" rel="noopener noreferrer" className="wa-btn">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ card, index }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`contact-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="contact-card-icon">{card.icon}</span>
      <div>
        <h4>{card.title}</h4>
        {card.lines.map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
};

export default Contact;