import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Chef.css';

const chefs = [
  { name: 'Chef Rajan Murugan', role: 'Executive Head Chef', exp: '22 yrs', specialty: 'Chettinad Cuisine', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80', awards: ['Best Chef Award 2021', 'Culinary Excellence 2019'] },
  { name: 'Chef Lalitha Devi', role: 'Pastry & Desserts', exp: '14 yrs', specialty: 'Traditional Sweets', img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80', awards: ['Sweet Artisan 2022'] },
  { name: 'Chef Arun Venkat', role: 'Tandoor Specialist', exp: '18 yrs', specialty: 'North Indian Breads', img: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=400&q=80', awards: ['Golden Tong Award 2020'] },
];

const Chef = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="chefs" className="chef-section">
      <div className="chef-inner">
        <div ref={ref} className={`chef-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Meet The Team</div>
          <h2 className="section-title">The <em>Maestros</em> Behind<br />Every Perfect Plate</h2>
          <p className="chef-subtitle">Our culinary artists bring decades of expertise and a deep passion for South Indian cuisine to every single dish</p>
        </div>

        <div className="chefs-grid">
          {chefs.map((chef, i) => <ChefCard key={i} chef={chef} index={i} />)}
        </div>
      </div>

      <div className="chef-bg-pattern" />
    </section>
  );
};

const ChefCard = ({ chef, index }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`chef-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="chef-img-wrap">
        <img src={chef.img} alt={chef.name} loading="lazy" />
        <div className="chef-img-overlay" />
        <div className="chef-exp-badge">
          <span>{chef.exp}</span>
          <small>Experience</small>
        </div>
      </div>
      <div className="chef-info">
        <h3 className="chef-name">{chef.name}</h3>
        <span className="chef-role">{chef.role}</span>
        <div className="chef-specialty">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {chef.specialty}
        </div>
        {chef.awards.length > 0 && (
          <div className="chef-awards">
            {chef.awards.map((a, i) => <span key={i} className="chef-award">🏆 {a}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chef;