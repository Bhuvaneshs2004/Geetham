// ClientTestimonials.jsx
import '../styles/ClientTestimonials.css';

// ── Real reviews sourced from TripAdvisor & Google ─────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Wanderboat Reviewer',
    role: 'Verified Diner · Google',
    initials: 'WR',
    stars: 5,
    source: 'Google',
    quote:
      'Geetham Restaurant has won my heart as one of the top pure vegetarian spots in Chennai. The Tower Dosa is a culinary marvel — visually stunning and bursting with authentic flavours. And the Filter Coffee? Truly next level!',
  },
  {
    id: 2,
    name: 'TripAdvisor Guest',
    role: 'Verified Diner · TripAdvisor',
    initials: 'TG',
    stars: 5,
    source: 'TripAdvisor',
    featured: true,
    quote:
      'If you want a wholesome South Indian lunch, you must not miss this place. Even during peak summer with heavy rush, they served cool welcome drinks while we waited in queue. Thoughtful and delicious!',
  },
  {
    id: 3,
    name: 'Airport Traveller',
    role: 'Verified Diner · TripAdvisor',
    initials: 'AT',
    stars: 5,
    source: 'TripAdvisor',
    quote:
      'Worth a visit for breakfast, lunch, or dinner near Chennai Airport. The Filter Coffee was so good we had to repeat it within 30 minutes! Mini Tiffin + Filter Coffee is the best combination.',
  },
  {
    id: 4,
    name: 'Swaminathan H.',
    role: 'Verified Diner · Google',
    initials: 'SH',
    stars: 5,
    source: 'Google',
    quote:
      'Yummy and crispy Podi Masala Dosa is a must-try. I would also recommend Butter Naan and Paneer Tikka Masala. Parking facility is good and the overall experience was excellent.',
  },
  {
    id: 5,
    name: 'Medavakkam Visitor',
    role: 'Verified Diner · TripAdvisor',
    initials: 'MV',
    stars: 5,
    source: 'TripAdvisor',
    quote:
      'Visited the spacious new restaurant in Medavakkam for dinner. Huge dining area with comfortable seating. The seat management was very good — we were seated within minutes despite the crowd.',
  },
  {
    id: 6,
    name: 'Chennai Food Lover',
    role: 'Verified Diner · Google',
    initials: 'CF',
    stars: 5,
    source: 'Google',
    quote:
      'Clean, hygienic, and quality is awesome! We had Medu Vada with curd, Ghee Roast Dosa, and Filter Coffee. It was a great experience. Five minutes to Chennai Airport — a perfect stop.',
  },
];

/* ── Source badge colors ────────────────────────────────────────────── */
const SOURCE_COLORS = {
  Google:      { bg: 'rgba(66,133,244,0.10)',  border: 'rgba(66,133,244,0.25)',  color: '#2563EB' },
  TripAdvisor: { bg: 'rgba(90,143,112,0.12)',  border: 'rgba(90,143,112,0.30)',  color: '#3D7A57' },
};

/* ── Stars ──────────────────────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <div className="test-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="test-star">★</span>
      ))}
    </div>
  );
}

/* ── Avatar ─────────────────────────────────────────────────────────── */
function Avatar({ initials }) {
  return <div className="test-avatar">{initials}</div>;
}

/* ── Card ───────────────────────────────────────────────────────────── */
function TestimonialCard({ data }) {
  return (
    <div className={`test-card${data.featured ? ' featured' : ''}`}>

      <div className="test-card-top">
        <Stars count={data.stars} />
      </div>

      <p className="test-quote">{data.quote}</p>

      <div className="test-divider" />

      <div className="test-author">
        <Avatar initials={data.initials} />
        <div className="test-author-info">
          <span className="test-author-name">{data.name}</span>
          <span className="test-author-role">{data.role}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function ClientTestimonials() {
  return (
    <section className="testimonials-section">
      <div className="test-inner">

        <div className="test-header">
          <h2 className="test-title">
            What Our Guests <em>Really Say</em>
          </h2>
        </div>

        <div className="test-grid">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} data={t} />
          ))}
        </div>

      </div>
    </section>
  );
}