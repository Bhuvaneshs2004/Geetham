import React from 'react';
import '../styles/Footer.css';
import { scrollToSection } from '../utils/scrollTo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-inner">

          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M8 10 Q14 6 20 10 Q14 8 8 10Z" fill="#C8102E" />
                <path d="M7 14 Q14 10 21 14 Q14 12 7 14Z" fill="#D4AF37" />
                <path d="M8 18 Q14 14 20 18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Geetham<em>Veg</em></span>
            </div>
            <p className="footer-tagline">
              Indulge in Authentic Indian Food — where every meal is a celebration of tradition, taste, and togetherness.
            </p>
            <div className="footer-socials">
              {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map(s => (
                <a key={s} href="#" className="social-link" aria-label={s}>{s[0]}</a>
              ))}
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Quick Links</h4>
            {[
              { label: 'Home',     id: '#home' },
              { label: 'About Us', id: '#about' },
              { label: 'Menu',     id: '#menu' },
              { label: 'Specials', id: '#specials' },
              { label: 'Gallery',  id: '#gallery' },
              { label: 'Contact',  id: '#contact' },
            ].map(({ label, id }) => (
              <a
                key={label}
                href={id}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="footer-links-group">
            <h4>Our Cuisine</h4>
            {['South Indian', 'North Indian', 'Chettinad Specials', 'Thali Meals', 'Street Food', 'Desserts & Sweets'].map(item => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          <div className="footer-links-group">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>15/4, 5th Avenue, Anna Nagar,<br />Chennai – 600040</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <a href="tel:7397222111">73972 22111</a>
            </div>
            <div className="footer-contact-item">
              <span>💬</span>
              <a href="tel:7397623777">73976 23777</a>
            </div>
            <div className="footer-contact-item">
              <span>🕐</span>
              <span>7:30 AM – 10:30 PM Daily</span>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2024 Geetham Veg Restaurant. All rights reserved.</span>
          <span className="footer-made">Made with ❤️ in Chennai</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="footer-bg-text">GEETHAM</div>
    </footer>
  );
};

export default Footer;