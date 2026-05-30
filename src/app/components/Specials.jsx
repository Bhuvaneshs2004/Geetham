import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Specials.css';

const SPECIALS = [
  { label:'Weekday Lunch',   title:'Executive Thali Special', offer:'20% OFF', desc:'Rice, sambar, rasam, 3 curries, papad & dessert. Mon–Fri, 12–3 PM.',             img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80', code:'LUNCH20',   expires:'Valid Mon–Fri'  },
  { label:'Weekend Brunch',  title:'Sunday Family Feast',     offer:'15% OFF', desc:'Unlimited dosas, idlis, vadas, chutneys & filter coffee. Sundays 9–11:30 AM.',   img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80', code:'SUNDAY15',  expires:'Sundays Only'   },
  { label:'Evening Special', title:'Biryani Night Delight',   offer:'18% OFF', desc:'Fragrant dum biryani with raita, salan & sherbet. Daily after 7 PM.',            img:'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=500&q=80', code:'BIRYAN18',  expires:'Daily 7 PM+'    },
  { label:"Chef's Pick",     title:'Signature Curry Feast',   offer:'25% OFF', desc:"Chef's curry trio with naan, rice & a starter — our most-loved plate.",          img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80', code:'CHEF25',    expires:'Limited Seats'  },
  { label:'Family Combo',    title:'Grand Family Platter',    offer:'30% OFF', desc:'Serves 4 — biryanis, gravies, breads, desserts & drinks. Pre-book advised.',     img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80', code:'FAMILY30',  expires:'Pre-book Only'  },
  { label:'Quick Bite',      title:'Street Style Snack Box',  offer:'10% OFF', desc:'Chaats, vadas, bondas & masala chai — our best street-style snacks box.',        img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', code:'SNACK10',   expires:'Anytime'        },
];

const N = SPECIALS.length;

/* ── single card ── */
const FanCard = ({ item, offset, onClick }) => {
  const abs   = Math.abs(offset);
  const rotY  = offset * 38;
  const tx    = offset * 155;
  const tz    = -abs * 90;
  const scale = 1 - abs * 0.08;
  const opacity = Math.max(0, 1 - abs * 0.25);

  return (
    <div
      className={`fan-card ${offset === 0 ? 'active' : ''}`}
      style={{
        transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        zIndex: N - abs,
      }}
      onClick={onClick}
    >
      <img src={item.img} alt={item.title} loading="lazy" draggable={false} />
      <div className="fan-overlay" />
      <div className="fan-info">
        <span className="fan-label">{item.label}</span>
        <div className="fan-title">{item.title}</div>
        <span className="fan-badge">{item.offer}</span>
      </div>
    </div>
  );
};

/* ── offer panel ── */
const OfferPanel = ({ item, visible }) => (
  <div className={`offer-panel ${visible ? 'show' : ''}`}>
    <div className="op-inner">
      <div className="op-left">
        <div className="op-dish">{item.title}</div>
        <div className="op-desc">{item.desc}</div>
      </div>
      <div className="op-right">
        <div>
          <div className="op-code-lbl">Use Code</div>
          <div className="op-code">{item.code}</div>
        </div>
        <div className="op-expires">{item.expires}</div>
        <button className="btn-primary" style={{ justifyContent:'center' }}>
          Claim Offer
        </button>
      </div>
    </div>
  </div>
);

/* ── main section ── */
const Specials = () => {
  const [current, setCurrent] = useState(Math.floor(N / 2));
  const [panelVisible, setPanelVisible] = useState(false);
  const dragStartX = useRef(null);
  const dragMoved  = useRef(false);
  const autoRef    = useRef(null);
  const panelTimer = useRef(null);

  const [headerRef, headerVisible] = useScrollReveal();

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= N) return;
    setCurrent(idx);
    setPanelVisible(false);
    clearTimeout(panelTimer.current);
    panelTimer.current = setTimeout(() => setPanelVisible(true), 120);
  }, []);

  /* auto-advance */
  useEffect(() => {
    autoRef.current = setInterval(() => setCurrent(c => {
      const next = (c + 1) % N;
      setPanelVisible(false);
      clearTimeout(panelTimer.current);
      panelTimer.current = setTimeout(() => setPanelVisible(true), 120);
      return next;
    }), 3200);
    return () => clearInterval(autoRef.current);
  }, []);

  /* keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { clearInterval(autoRef.current); goTo(Math.min(current + 1, N - 1)); }
      if (e.key === 'ArrowLeft')  { clearInterval(autoRef.current); goTo(Math.max(current - 1, 0)); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  /* show panel on mount */
  useEffect(() => {
    panelTimer.current = setTimeout(() => setPanelVisible(true), 400);
    return () => clearTimeout(panelTimer.current);
  }, []);

  /* drag handlers */
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current  = false;
    clearInterval(autoRef.current);
  };
  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) dragMoved.current = true;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (!dragMoved.current) return;
    if      (dx < -40) goTo(Math.min(current + 1, N - 1));
    else if (dx >  40) goTo(Math.max(current - 1, 0));
  };

  return (
    <section id="specials" className="specials">
      <div className="specials-inner">

        <div ref={headerRef} className={`specials-header ${headerVisible ? 'reveal' : ''}`}>
          <div className="section-tag">Limited Time</div>
          <h2 className="section-title">Today's <em>Specials</em></h2>
          <p className="specials-sub">Click any dish — claim your offer</p>
        </div>

      </div>

      {/* 3-D Fan Stage — full bleed */}
      <div
        className="fan-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="fan-track">
          {SPECIALS.map((item, i) => (
            <FanCard
              key={i}
              item={item}
              offset={i - current}
              onClick={() => { clearInterval(autoRef.current); goTo(i); }}
            />
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="fan-dots">
        {SPECIALS.map((_, i) => (
          <button
            key={i}
            className={`fan-dot ${i === current ? 'on' : ''}`}
            onClick={() => { clearInterval(autoRef.current); goTo(i); }}
            aria-label={`Show ${SPECIALS[i].title}`}
          />
        ))}
      </div>

      {/* offer panel */}
      <div className="specials-inner">
        <OfferPanel item={SPECIALS[current]} visible={panelVisible} />
      </div>

      {/* marquee */}
      <div className="offer-marquee-wrap">
        <div className="offer-marquee">
          {Array(6).fill('🍛 FREE DESSERT ON ORDERS ABOVE ₹500  ·  🎉 BIRTHDAY SPECIAL DISCOUNTS  ·  📦 CATERING AVAILABLE  ·  ').map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;