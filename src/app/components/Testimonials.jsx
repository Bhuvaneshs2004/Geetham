import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Testimonials.css';

const reviews = [
  { name: 'Priya Krishnamurthy', location: 'Anna Nagar, Chennai', rating: 5, text: 'Geetham has redefined my idea of vegetarian dining. The Chettinad curry was an absolute revelation — complex, aromatic, and deeply satisfying. The ambience and service were impeccable. My family visits every Sunday without fail!', avatar: 'PK', since: 'Guest since 2018' },
  { name: 'Rahul Sharma', location: 'Adyar, Chennai', rating: 5, text: 'As someone who grew up eating South Indian food, I was skeptical. But Geetham\'s masala dosa is the closest thing to my grandmother\'s cooking I\'ve found in any restaurant. Absolutely outstanding quality and consistency.', avatar: 'RS', since: 'Guest since 2020' },
  { name: 'Deepa Narayanan', location: 'T. Nagar, Chennai', rating: 5, text: 'We ordered catering for our daughter\'s wedding reception — 300 guests! The team at Geetham handled everything seamlessly. Every dish arrived hot, beautifully presented, and the guests couldn\'t stop praising the food.', avatar: 'DN', since: 'Guest since 2015' },
  { name: 'Karthik Sundaram', location: 'Velachery, Chennai', rating: 5, text: 'The Sunday brunch spread is legendary. I\'ve introduced Geetham to all my friends and colleagues. It\'s not just a meal, it\'s an experience. The filter coffee alone is worth the visit!', avatar: 'KS', since: 'Guest since 2019' },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(p => (p + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[active];

  return (
    <section id="reviews" className="testimonials">
      <div className="testimonials-inner">
        <div ref={ref} className={`test-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Guest Reviews</div>
          <h2 className="section-title">Words That <em>Warm</em> Our Hearts</h2>
        </div>

        <div className="test-main">
          <div className="test-quote-icon">❝</div>
          <div className="test-content" key={active}>
            <p className="test-text">{review.text}</p>
            <div className="test-stars">
              {Array(review.rating).fill('★').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <div className="test-author">
              <div className="test-avatar">{review.avatar}</div>
              <div>
                <strong>{review.name}</strong>
                <span>{review.location} · {review.since}</span>
              </div>
            </div>
          </div>

          <div className="test-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`test-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        <div className="test-sidebar">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`test-thumb ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="test-thumb-avatar">{r.avatar}</div>
              <div>
                <strong>{r.name}</strong>
                <small>{r.location}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="test-bg-quote">❝</div>
    </section>
  );
};

export default Testimonials;