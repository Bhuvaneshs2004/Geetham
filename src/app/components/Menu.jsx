import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Menu.css';

const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Rice', 'Desserts', 'Beverages'];

const dishes = [
  { id: 1, name: 'Masala Dosa', cat: 'Starters', price: 89, desc: 'Crispy fermented rice crepe with spiced potato filling & chutneys', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', tag: 'Bestseller', veg: true },
  { id: 2, name: 'Veg Biryani', cat: 'Rice', price: 179, desc: 'Fragrant basmati rice with mixed vegetables, saffron & whole spices', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', tag: 'Chef\'s Choice', veg: true },
  { id: 3, name: 'Paneer Butter Masala', cat: 'Main Course', price: 219, desc: 'Cottage cheese in rich tomato-butter gravy with kasuri methi', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', tag: 'Popular', veg: true },
  { id: 4, name: 'Chole Bhature', cat: 'Breads', price: 129, desc: 'Spiced chickpea curry served with fluffy deep-fried bread', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', tag: 'Favourite', veg: true },
  { id: 5, name: 'Gulab Jamun', cat: 'Desserts', price: 79, desc: 'Soft milk-solid dumplings soaked in rose-scented sugar syrup', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', tag: 'Sweet', veg: true },
  { id: 6, name: 'Mango Lassi', cat: 'Beverages', price: 69, desc: 'Thick creamy yogurt blended with Alphonso mango pulp', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80', tag: 'Refreshing', veg: true },
  { id: 7, name: 'Sambar Vada', cat: 'Starters', price: 99, desc: 'Crispy lentil donuts soaked in tangy vegetable sambar', img: 'https://images.unsplash.com/photo-1605196560547-b2f7281b7355?w=400&q=80', tag: 'Traditional', veg: true },
  { id: 8, name: 'Garlic Naan', cat: 'Breads', price: 49, desc: 'Tandoor-baked flatbread with garlic butter & fresh coriander', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80', tag: '', veg: true },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, visible] = useScrollReveal();

  const filtered = activeCategory === 'All' ? dishes : dishes.filter(d => d.cat === activeCategory);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-inner">
        <div ref={ref} className={`menu-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Our Menu</div>
          <h2 className="section-title">Culinary <em>Masterpieces</em></h2>
          <p className="menu-subtitle">Each dish is a celebration of India's rich culinary heritage, crafted with love and the finest ingredients</p>
        </div>

        <div className={`menu-filters ${visible ? 'reveal-filters' : ''}`}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dishes-grid">
          {filtered.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
      </div>

      <div className="menu-bg-deco" />
    </section>
  );
};

const DishCard = ({ dish, index }) => {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`dish-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="dish-img-wrap">
        <img src={dish.img} alt={dish.name} loading="lazy" />
        <div className={`dish-img-overlay ${hovered ? 'show' : ''}`} />
        {dish.tag && <span className="dish-tag">{dish.tag}</span>}
        {/* <span className="veg-mark">🟢</span> */}
      </div>
      <div className="dish-body">
        <div className="dish-top">
          <h3 className="dish-name">{dish.name}</h3>
          <span className="dish-price">₹{dish.price}</span>
        </div>
        <p className="dish-desc">{dish.desc}</p>
        <div className="dish-footer">
          <span className="dish-cat">{dish.cat}</span>
          <button className="dish-order-btn">Order Now →</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;