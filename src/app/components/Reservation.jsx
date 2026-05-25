import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Reservation.css';

const Reservation = () => {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', occasion: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reservation" className="reservation">
      <div className="res-inner">
        <div className="res-left">
          <div ref={ref} className={`res-content ${visible ? 'reveal' : ''}`}>
            <div className="section-tag">Reserve Your Spot</div>
            <h2 className="section-title">Book a <em>Table</em></h2>
            <div className="gold-line" />
            <p className="res-desc">
              Reserve your table at Geetham and embark on a culinary journey through the finest South Indian vegetarian cuisine. Every table is a seat at the heart of our kitchen.
            </p>

            <div className="res-info">
              {[
                { icon: '🕐', label: 'Opening Hours', value: 'Mon–Sun: 7:30 AM – 10:30 PM' },
                { icon: '📞', label: 'Call for Reservations', value: '73972 22111 / 73976 23777' },
                { icon: '📍', label: 'Location', value: 'Anna Nagar, Chennai – 600040' },
              ].map((item, i) => (
                <div key={i} className="res-info-item">
                  <span className="res-info-icon">{item.icon}</span>
                  <div>
                    <span className="res-info-label">{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="res-right">
          <div className="res-form-wrap">
            {submitted ? (
              <div className="res-success">
                <div className="success-icon">✓</div>
                <h3>Reservation Confirmed!</h3>
                <p>We'll call you within 15 minutes to confirm your table. See you at Geetham!</p>
              </div>
            ) : (
              <form className="res-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Make a Reservation</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" required />
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Time</label>
                    <select name="time" value={form.time} onChange={handleChange} required>
                      <option value="">Select time</option>
                      {['07:30', '08:30', '09:30', '12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                        <option key={t} value={t}>{t} {parseInt(t) < 12 ? 'AM' : 'PM'}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Number of Guests</label>
                    <select name="guests" value={form.guests} onChange={handleChange}>
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Special Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={handleChange}>
                      <option value="">Select (optional)</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Business Dinner</option>
                      <option>Family Get-together</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v3M16 2v3M3 9h18M21 7v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h16a1 1 0 011 1z"/></svg>
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="res-bg">
        <div className="res-bg-img" />
        <div className="res-bg-overlay" />
      </div>
    </section>
  );
};

export default Reservation;