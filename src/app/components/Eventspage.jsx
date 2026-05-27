'use client';
import React, { useState } from 'react';
import '../styles/Events.css';

const EVENT_TYPES = [
  { id: 'birthday',    icon: '🎂', label: 'Birthday',        desc: 'Make it unforgettable' },
  { id: 'anniversary', icon: '💍', label: 'Anniversary',     desc: 'Celebrate your love' },
  { id: 'corporate',   icon: '🤝', label: 'Corporate',       desc: 'Meetings & team events' },
  { id: 'wedding',     icon: '🌸', label: 'Wedding',         desc: 'Reception & ceremony' },
  { id: 'festive',     icon: '🪔', label: 'Festive / Puja',  desc: 'Traditions & gatherings' },
  { id: 'other',       icon: '✨', label: 'Other',            desc: 'Tell us your occasion' },
];

const CAPACITY_OPTIONS = ['Up to 20', '20 – 50', '50 – 100', '100 – 200', '200+'];

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'All Day'];

const PACKAGES = [
  {
    id: 'silver',
    name: 'Silver',
    price: '₹599',
    unit: '/ person',
    color: 'pkg-silver',
    features: ['Welcome drinks', 'Buffet (15 dishes)', 'Basic décor', 'Dedicated server'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '₹999',
    unit: '/ person',
    color: 'pkg-gold',
    popular: true,
    features: ['Welcome drinks + mocktails', 'Buffet (25 dishes)', 'Premium décor & flowers', '2 dedicated servers', 'Live chaat counter'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '₹1,499',
    unit: '/ person',
    color: 'pkg-platinum',
    features: ['Full open bar (mocktails)', 'Unlimited buffet (35+ dishes)', 'Luxury floral décor', 'Dedicated event manager', 'Live dosa + dessert counter', 'Custom cake / mithai'],
  },
];

const INIT = {
  name: '', email: '', phone: '',
  eventType: '', date: '', time: '',
  guests: '', meal: '', package: '',
  venue: 'indoor', special: '',
};

export default function EventsPage() {
  const [form, setForm] = useState(INIT);
  const [step, setStep] = useState(1); // 1 = details, 2 = package, 3 = confirm
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())      e.name      = 'Name is required';
    if (!form.email.trim())     e.email     = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim())     e.phone     = 'Phone is required';
    if (!form.eventType)        e.eventType = 'Select an event type';
    if (!form.date)             e.date      = 'Pick a date';
    if (!form.guests)           e.guests    = 'Select guest count';
    if (!form.meal)             e.meal      = 'Select meal preference';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    if (!form.package) {
      setErrors({ package: 'Please select a package' });
      return false;
    }
    return true;
  };

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const back = () => setStep(s => s - 1);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen form={form} />;

  return (
    <main className="events-page">
      {/* ── Hero ── */}
      <section className="events-hero">
        <div className="events-hero-overlay" />
        <div className="events-hero-inner">
          <div className="section-tag">Events & Corporate Bookings</div>
          <h1 className="events-hero-title">
            Host Your <em>Most Cherished</em><br />Moments With Us
          </h1>
          <p className="events-hero-sub">
            From intimate family celebrations to grand corporate gatherings — Geetham crafts
            unforgettable experiences rooted in authentic South Indian hospitality.
          </p>
          <div className="hero-stats">
            <div className="hero-stat"><span className="stat-num">500+</span><span className="stat-lbl">Events Hosted</span></div>
            <div className="hero-divider" />
            <div className="hero-stat"><span className="stat-num">5,000+</span><span className="stat-lbl">Happy Guests</span></div>
            <div className="hero-divider" />
            <div className="hero-stat"><span className="stat-num">15+</span><span className="stat-lbl">Years Experience</span></div>
          </div>
        </div>
        <div className="hero-scroll-hint">↓ Book Your Event</div>
      </section>

      {/* ── Why Geetham ── */}
      <section className="why-section">
        <div className="why-inner">
          {[
            { icon: '🍽️', title: 'Authentic Cuisine', desc: '35+ vegetarian dishes prepared fresh by our master chefs' },
            { icon: '🏛️', title: 'Beautiful Venues', desc: 'Indoor & outdoor spaces for 10 to 500 guests' },
            { icon: '🎨', title: 'Custom Décor', desc: 'Tailored floral arrangements and themed setups' },
            { icon: '👔', title: 'Dedicated Manager', desc: 'A personal coordinator from booking to farewell' },
          ].map((w, i) => (
            <div className="why-card" key={i}>
              <span className="why-icon">{w.icon}</span>
              <strong>{w.title}</strong>
              <small>{w.desc}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section className="booking-section" id="book">
        <div className="booking-inner">

          {/* Left panel */}
          <div className="booking-info">
            <div className="section-tag">Reserve Your Date</div>
            <h2 className="booking-title">Let's Plan Your<br /><em>Perfect Event</em></h2>
            <div className="gold-line" />
            <p className="booking-desc">
              Fill in the details and our events team will reach out within 24 hours to finalise
              your bespoke celebration package.
            </p>

            <div className="contact-box">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Call Us</strong>
                  <span>+91 98765 43210</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <span>events@geetham.in</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <strong>Office Hours</strong>
                  <span>Mon – Sat, 9 AM – 7 PM</span>
                </div>
              </div>
            </div>

            <div className="venue-preview">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" alt="Event venue" />
              <div className="venue-caption">Our banquet hall — decorated for a wedding reception</div>
            </div>
          </div>

          {/* Right panel — Multi-step form */}
          <div className="form-panel">
            {/* Step indicator */}
            <div className="step-bar">
              {['Your Details', 'Choose Package', 'Confirm'].map((label, i) => (
                <React.Fragment key={i}>
                  <div className={`step-item ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
                    <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
                    <span className="step-label">{label}</span>
                  </div>
                  {i < 2 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* ── Step 1: Details ── */}
            {step === 1 && (
              <div className="form-step">
                <h3 className="step-title">Tell us about yourself & your event</h3>

                {/* Contact */}
                <div className="form-group-row">
                  <Field label="Full Name" error={errors.name}>
                    <input type="text" placeholder="Ramesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" placeholder="ramesh@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </Field>
                </div>
                <Field label="Phone Number" error={errors.phone}>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </Field>

                {/* Event type grid */}
                <Field label="Type of Event" error={errors.eventType}>
                  <div className="event-type-grid">
                    {EVENT_TYPES.map(et => (
                      <button
                        key={et.id}
                        type="button"
                        className={`event-type-btn ${form.eventType === et.id ? 'active' : ''}`}
                        onClick={() => set('eventType', et.id)}
                      >
                        <span className="et-icon">{et.icon}</span>
                        <span className="et-label">{et.label}</span>
                        <span className="et-desc">{et.desc}</span>
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Date, time, guests, meal */}
                <div className="form-group-row">
                  <Field label="Event Date" error={errors.date}>
                    <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} />
                  </Field>
                  <Field label="Preferred Time">
                    <input type="time" value={form.time} onChange={e => set('time', e.target.value)} />
                  </Field>
                </div>

                <div className="form-group-row">
                  <Field label="Expected Guests" error={errors.guests}>
                    <select value={form.guests} onChange={e => set('guests', e.target.value)}>
                      <option value="">Select count</option>
                      {CAPACITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Meal Preference" error={errors.meal}>
                    <select value={form.meal} onChange={e => set('meal', e.target.value)}>
                      <option value="">Select meal</option>
                      {MEALS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Venue */}
                <Field label="Venue Preference">
                  <div className="venue-toggle">
                    {['indoor', 'outdoor', 'both'].map(v => (
                      <button key={v} type="button"
                        className={`venue-btn ${form.venue === v ? 'active' : ''}`}
                        onClick={() => set('venue', v)}>
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Special Requests / Notes">
                  <textarea rows={3} placeholder="Dietary needs, décor preferences, accessibility requirements…"
                    value={form.special} onChange={e => set('special', e.target.value)} />
                </Field>

                <button className="btn-next" onClick={next} type="button">
                  Continue to Packages →
                </button>
              </div>
            )}

            {/* ── Step 2: Packages ── */}
            {step === 2 && (
              <div className="form-step">
                <h3 className="step-title">Choose your catering package</h3>
                {errors.package && <p className="error-inline">{errors.package}</p>}
                <div className="packages-grid">
                  {PACKAGES.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`pkg-card ${pkg.color} ${form.package === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                      onClick={() => set('package', pkg.id)}
                    >
                      {pkg.popular && <div className="pkg-popular-badge">Most Popular</div>}
                      <div className="pkg-name">{pkg.name}</div>
                      <div className="pkg-price">{pkg.price}<span>{pkg.unit}</span></div>
                      <ul className="pkg-features">
                        {pkg.features.map((f, i) => <li key={i}><span className="pkg-check">✓</span>{f}</li>)}
                      </ul>
                      <div className={`pkg-select-ring ${form.package === pkg.id ? 'visible' : ''}`}>Selected ✓</div>
                    </div>
                  ))}
                </div>
                <div className="form-nav">
                  <button className="btn-back" onClick={back} type="button">← Back</button>
                  <button className="btn-next" onClick={next} type="button">Review Booking →</button>
                </div>
              </div>
            )}

            {/* ── Step 3: Confirm ── */}
            {step === 3 && (
              <div className="form-step">
                <h3 className="step-title">Review & confirm your booking</h3>
                <div className="summary-card">
                  <SummaryRow label="Name"        value={form.name} />
                  <SummaryRow label="Email"       value={form.email} />
                  <SummaryRow label="Phone"       value={form.phone} />
                  <SummaryRow label="Event Type"  value={EVENT_TYPES.find(e => e.id === form.eventType)?.label} />
                  <SummaryRow label="Date"        value={form.date} />
                  <SummaryRow label="Time"        value={form.time || '—'} />
                  <SummaryRow label="Guests"      value={form.guests} />
                  <SummaryRow label="Meal"        value={form.meal} />
                  <SummaryRow label="Venue"       value={form.venue.charAt(0).toUpperCase() + form.venue.slice(1)} />
                  <SummaryRow label="Package"     value={PACKAGES.find(p => p.id === form.package)?.name + ' — ' + PACKAGES.find(p => p.id === form.package)?.price + '/person'} />
                  {form.special && <SummaryRow label="Notes" value={form.special} />}
                </div>
                <p className="confirm-note">
                  By confirming, you agree that our events team will contact you within 24 hours to
                  finalise details and collect an advance payment.
                </p>
                <div className="form-nav">
                  <button className="btn-back" onClick={back} type="button">← Edit</button>
                  <button className="btn-submit" onClick={submit} type="button">
                    Confirm Booking ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="gallery-strip">
        <div className="gallery-strip-inner">
          <div className="section-tag" style={{ marginBottom: '32px' }}>Past Events</div>
          <div className="gallery-grid">
            {[
              'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80',
              'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80',
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80',
              'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&q=80',
            ].map((src, i) => (
              <div key={i} className="gallery-img-wrap">
                <img src={src} alt={`Event ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Helpers ── */
function Field({ label, error, children }) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  );
}

function SuccessScreen({ form }) {
  const pkg = PACKAGES.find(p => p.id === form.package);
  return (
    <div className="success-page">
      <div className="success-overlay" />
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h2>Booking Request Sent!</h2>
        <p>
          Thank you, <strong>{form.name}</strong>! Your {EVENT_TYPES.find(e => e.id === form.eventType)?.label} booking
          for <strong>{form.date}</strong> ({form.guests} guests, {pkg?.name} package) has been received.
        </p>
        <p className="success-sub">
          Our events team will call you at <strong>{form.phone}</strong> within 24 hours to confirm details.
        </p>
        <a href="/" className="btn-home">← Back to Home</a>
      </div>
    </div>
  );
}