import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Gallery.css';

const images = [
  { url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', label: 'Restaurant Interior', span: 'wide' },
  { url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', label: 'Signature Thali', span: '' },
  { url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', label: 'Crispy Dosa', span: '' },
  { url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', label: 'Veg Biryani', span: '' },
  { url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', label: 'Sweet Corner', span: '' },
  { url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', label: 'Paneer Special', span: 'wide' },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const [ref, visible] = useScrollReveal();

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-inner">
        <div ref={ref} className={`gallery-header ${visible ? 'reveal' : ''}`}>
          <div className="section-tag">Visual Feast</div>
          <h2 className="section-title">A Glimpse Into <em>Geetham</em></h2>
        </div>

        <div className="gallery-grid">
          {images.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} onOpen={() => setLightbox(img)} />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close">✕</button>
          <img src={lightbox.url} alt={lightbox.label} />
          <p className="lightbox-label">{lightbox.label}</p>
        </div>
      )}
    </section>
  );
};

const GalleryItem = ({ img, index, onOpen }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`gallery-item ${img.span === 'wide' ? 'wide' : ''} ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      onClick={onOpen}
    >
      <img src={img.url} alt={img.label} loading="lazy" />
      <div className="gallery-overlay">
        <div className="gallery-overlay-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
        </div>
        <span>{img.label}</span>
      </div>
    </div>
  );
};

export default Gallery;