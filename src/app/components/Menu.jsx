'use client';
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Menu.css';

const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Rice', 'Desserts', 'Beverages'];

const dishes = [
  { id: 1, name: 'Masala Dosa', cat: 'Starters', price: 89, desc: 'Crispy fermented rice crepe with spiced potato filling & chutneys', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFzYWxhJTIwZG9zYXxlbnwwfHwwfHx8MA%3D%3D', veg: true },
  { id: 2, name: 'Veg Biryani', cat: 'Rice', price: 179, desc: 'Fragrant basmati rice with mixed vegetables, saffron & whole spices', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', tag: 'Chef\'s Choice', veg: true },
  { id: 3, name: 'Paneer Butter Masala', cat: 'Main Course', price: 219, desc: 'Cottage cheese in rich tomato-butter gravy with kasuri methi', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', tag: 'Popular', veg: true },
  { id: 4, name: 'Chole Bhature', cat: 'Breads', price: 129, desc: 'Spiced chickpea curry served with fluffy deep-fried bread', img: 'https://t4.ftcdn.net/jpg/07/97/81/15/240_F_797811579_hkvqOFxnQsfQFrJPPxt60wI3XAX8Gcxd.jpg', tag: 'Favourite', veg: true },
  { id: 5, name: 'Gulab Jamun', cat: 'Desserts', price: 79, desc: 'Soft milk-solid dumplings soaked in rose-scented sugar syrup', img: 'https://t3.ftcdn.net/jpg/09/33/35/02/240_F_933350291_19S5GlfcAwG3l3lB0Ci7eMA8FXcK4X6d.jpg', tag: 'Sweet', veg: true },
  { id: 6, name: 'Mango Lassi', cat: 'Beverages', price: 69, desc: 'Thick creamy yogurt blended with Alphonso mango pulp', img: 'https://t3.ftcdn.net/jpg/06/15/51/14/240_F_615511475_JV12R1QWhU2iCgv9qNTpNr9Ew17jSz6F.jpg', tag: 'Refreshing', veg: true },
  { id: 7, name: 'Sambar Vada', cat: 'Starters', price: 99, desc: 'Crispy lentil donuts soaked in tangy vegetable sambar', img: 'https://t4.ftcdn.net/jpg/04/34/93/43/240_F_434934399_px1pXbG9U4NU5H10kCPkkwlKfOwREZVu.jpg', tag: 'Traditional', veg: true },
  { id: 8, name: 'Garlic Naan', cat: 'Breads', price: 49, desc: 'Tandoor-baked flatbread with garlic butter & fresh coriander', img: 'https://t4.ftcdn.net/jpg/07/18/16/87/240_F_718168709_mc2zfZw46fQxI81ifoYBEWhJwpsL5iPY.jpg', tag: '', veg: true },
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