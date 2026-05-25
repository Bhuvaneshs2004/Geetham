import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Specials.css';

const specials = [
  { label: 'Weekday Lunch', title: 'Executive Thali Special', offer: '20% OFF', desc: 'A complete South Indian meal with rice, sambar, rasam, 3 curries, papad & dessert. Mon–Fri, 12–3 PM.', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80', code: 'LUNCH20', expires: 'Valid Mon–Fri' },
  { label: 'Weekend Brunch', title: 'Sunday Family Feast', offer: '15% OFF', desc: 'Unlimited dosas, idlis, vadas, chutneys & filter coffee for your whole family. Sundays, 9–11:30 AM.', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80', code: 'SUNDAY15', expires: 'Sundays Only' },
];

const Specials = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="specials" className="specials">
      <div className="specials-inner">
        <div ref={ref} className={`specials-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Limited Time</div>
          <h2 className="section-title">Special <em>Offers</em></h2>
        </div>

        <div className="specials-grid">
          {specials.map((s, i) => (
            <SpecialCard key={i} special={s} index={i} />
          ))}
        </div>

        {/* Marquee offer banner */}
        <div className="offer-marquee-wrap">
          <div className="offer-marquee">
            {Array(6).fill('🍛 FREE DESSERT ON ORDERS ABOVE ₹500  ·  🎉 BIRTHDAY SPECIAL DISCOUNTS  ·  📦 CATERING AVAILABLE  ·  ').map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecialCard = ({ special, index }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`special-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="special-img">
        <img src={special.img} alt={special.title} loading="lazy" />
        <div className="special-overlay" />
        <div className="special-offer-badge">
          <span>{special.offer}</span>
        </div>
        <div className="special-label">{special.label}</div>
      </div>
      <div className="special-body">
        <h3 className="special-title">{special.title}</h3>
        <p className="special-desc">{special.desc}</p>
        <div className="special-footer">
          <div className="special-code">
            <span className="code-label">Use Code</span>
            <span className="code-value">{special.code}</span>
          </div>
          <span className="special-expires">{special.expires}</span>
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
          Claim Offer
        </button>
      </div>
    </div>
  );
};

export default Specials;