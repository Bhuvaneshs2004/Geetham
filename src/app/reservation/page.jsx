'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './reservation.css';

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '07:00 PM',
  '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
];

const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7 Guests', '8+ Guests'];

const occasions = [
  { label: 'Birthday', icon: '🎂' },
  { label: 'Anniversary', icon: '💍' },
  { label: 'Business', icon: '💼' },
  { label: 'Date Night', icon: '🕯️' },
  { label: 'Family', icon: '👨‍👩‍👧' },
  { label: 'Other', icon: '✨' },
];

export default function ReservationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const today = new Date().toISOString().split('T')[0];

  const step1Valid = form.date && form.time && form.guests;
  const step2Valid = form.name && form.phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="res-page">
        {/* <div className="res-bg-pattern" /> */}
        <div className="res-success">
          <div className="res-success-icon">✦</div>
          <h2 className="res-success-title">Table Reserved!</h2>
          <p className="res-success-sub">
            Thank you, <strong>{form.name}</strong>. Your table for <strong>{form.guests}</strong> on{' '}
            <strong>{new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> at{' '}
            <strong>{form.time}</strong> is confirmed.
          </p>
          <p className="res-success-note">We'll send a confirmation to {form.phone}. See you soon! 🙏</p>
          <div className="res-success-actions">
            <button className="res-btn-primary" onClick={() => router.push('/')}>Back to Home</button>
            <button className="res-btn-outline" onClick={() => { setSubmitted(false); setStep(1); setForm({ date:'',time:'',guests:'',occasion:'',name:'',phone:'',email:'',notes:'' }); }}>
              New Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="res-page">
      {/* Decorative background */}
      <div className="res-bg-pattern" />
      <div className="res-glow res-glow-1" />
      <div className="res-glow res-glow-2" />

      {/* Back button */}
      <button className="res-back" onClick={() => router.push('/')}>
        <svg viewBox="0 0 320 512" width="12" height="12" fill="currentColor">
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        Back
      </button>

      <div className="res-container">
        {/* Left panel */}
        <div className="res-left">
          <div className="res-left-inner">
            <span className="res-eyebrow">Reserve a Table</span>
            <h1 className="res-heading">
              Dine with us,<br />
              <em>Make it Special</em>
            </h1>
            <p className="res-desc">
              Experience the warmth of South Indian hospitality. Book your table and let us craft an unforgettable meal for you.
            </p>

            <div className="res-info-cards">
              <div className="res-info-card">
                <span className="res-info-icon">🕐</span>
                <div>
                  <strong>Lunch</strong>
                  <small>11:00 AM – 3:00 PM</small>
                </div>
              </div>
              <div className="res-info-card">
                <span className="res-info-icon">🌙</span>
                <div>
                  <strong>Dinner</strong>
                  <small>7:00 PM – 10:00 PM</small>
                </div>
              </div>
              <div className="res-info-card">
                <span className="res-info-icon">📞</span>
                <div>
                  <strong>Call us</strong>
                  <small>73972 22111</small>
                </div>
              </div>
              <div className="res-info-card">
                <span className="res-info-icon">💬</span>
                <div>
                  <strong>WhatsApp</strong>
                  <small>73976 23777</small>
                </div>
              </div>
            </div>

            <p className="res-tagline">"Crafted with love since 1988"</p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="res-right">
          {/* Step indicator */}
          <div className="res-steps">
            <div className={`res-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
              <span className="res-step-dot">{step > 1 ? '✓' : '1'}</span>
              <span className="res-step-label">Date & Time</span>
            </div>
            <div className="res-step-line" />
            <div className={`res-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
              <span className="res-step-dot">{step > 2 ? '✓' : '2'}</span>
              <span className="res-step-label">Your Details</span>
            </div>
          </div>

          <form className="res-form" onSubmit={handleSubmit}>

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="res-step-content">
                <h2 className="res-form-title">When would you like to visit?</h2>

                {/* Date */}
                <div className="res-field">
                  <label className="res-label">Select Date</label>
                  <input
                    type="date"
                    className="res-input"
                    min={today}
                    value={form.date}
                    onChange={e => set('date', e.target.value)}
                    required
                  />
                </div>

                {/* Guests */}
                <div className="res-field">
                  <label className="res-label">Number of Guests</label>
                  <div className="res-pill-group">
                    {guestOptions.map(g => (
                      <button
                        key={g}
                        type="button"
                        className={`res-pill ${form.guests === g ? 'selected' : ''}`}
                        onClick={() => set('guests', g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div className="res-field">
                  <label className="res-label">Preferred Time</label>
                  <div className="res-pill-group">
                    {timeSlots.map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`res-pill ${form.time === t ? 'selected' : ''}`}
                        onClick={() => set('time', t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div className="res-field">
                  <label className="res-label">Occasion <span className="res-optional">(optional)</span></label>
                  <div className="res-occasion-group">
                    {occasions.map(o => (
                      <button
                        key={o.label}
                        type="button"
                        className={`res-occasion-btn ${form.occasion === o.label ? 'selected' : ''}`}
                        onClick={() => set('occasion', form.occasion === o.label ? '' : o.label)}
                      >
                        <span>{o.icon}</span>
                        <span>{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="res-btn-primary"
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                >
                  Continue
                  <svg viewBox="0 0 320 512" width="12" height="12" fill="currentColor">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="res-step-content">
                <h2 className="res-form-title">Your contact details</h2>

                {/* Booking summary */}
                <div className="res-summary">
                  <div className="res-summary-item">
                    <span>📅</span>
                    <span>{new Date(form.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="res-summary-sep">·</div>
                  <div className="res-summary-item">
                    <span>🕐</span>
                    <span>{form.time}</span>
                  </div>
                  <div className="res-summary-sep">·</div>
                  <div className="res-summary-item">
                    <span>👥</span>
                    <span>{form.guests}</span>
                  </div>
                  {form.occasion && (
                    <>
                      <div className="res-summary-sep">·</div>
                      <div className="res-summary-item">
                        <span>{occasions.find(o => o.label === form.occasion)?.icon}</span>
                        <span>{form.occasion}</span>
                      </div>
                    </>
                  )}
                  <button type="button" className="res-summary-edit" onClick={() => setStep(1)}>Edit</button>
                </div>

                <div className="res-field">
                  <label className="res-label">Full Name</label>
                  <input
                    type="text"
                    className="res-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>

                <div className="res-field">
                  <label className="res-label">Phone Number</label>
                  <input
                    type="tel"
                    className="res-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="res-field">
                  <label className="res-label">Email <span className="res-optional">(optional)</span></label>
                  <input
                    type="email"
                    className="res-input"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>

                <div className="res-field">
                  <label className="res-label">Special Requests <span className="res-optional">(optional)</span></label>
                  <textarea
                    className="res-input res-textarea"
                    placeholder="Allergies, seating preferences, cake arrangements…"
                    rows={3}
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                  />
                </div>

                <div className="res-form-actions">
                  <button type="button" className="res-btn-outline" onClick={() => setStep(1)}>
                    <svg viewBox="0 0 320 512" width="12" height="12" fill="currentColor">
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                    Back
                  </button>
                  <button
                    type="submit"
                    className="res-btn-primary"
                    disabled={!step2Valid}
                  >
                    ✦ Confirm Reservation
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}