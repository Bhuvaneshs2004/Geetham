'use client';
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import "../styles/Foodgallery.css";

const ITEMS = [
  { id: 1, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=85", label: "Idly" },
  { id: 2, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=85", label: "Dosa" },
  { id: 3, img: "https://images.unsplash.com/photo-1756757077703-26dc3ba7e853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaHUlMjB2YWRhfGVufDB8fDB8fHww", label: "Medhu vada" },
  { id: 4, img: "https://media.istockphoto.com/id/678434780/photo/ven-pongal-traditional-indian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=qglWwS5-kOHxxQEWOoYp0MObkhgNeVxDoMrXxZiF_3Y=", label: "Ghee Pongal" },
  { id: 5, img: "https://plus.unsplash.com/premium_photo-1671379526961-1aebb82b317b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Filter Coffee" },
  { id: 6, img: "https://images.unsplash.com/photo-1643892467625-65df6a500524?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9vcml8ZW58MHx8MHx8fDA%3D", label: "Poori Masala" },
  { id: 7, img: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmF2YSUyMGRvc2F8ZW58MHx8MHx8fDA%3D", label: "Rava Dosa" },
  { id: 8, img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBpbmRpYW4lMjBtZWFsfGVufDB8fDB8fHww", label: "South Indian Meals" },
  { id: 9, img: "https://images.unsplash.com/photo-1633383718081-22ac93e3db65?q=80&w=758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Curd Rice" },
  { id: 10, img: "https://t4.ftcdn.net/jpg/04/97/27/31/240_F_497273126_pikW8XumWHbIQyQwU1wJkUIBCP4GOLMP.jpg", label: "Sambar Rice" },
  { id: 11, img: "https://t4.ftcdn.net/jpg/10/67/47/47/240_F_1067474728_JY2g8CSlNHJbnUhZcT6CF3cFocfxpcSo.jpg", label: "Chapati Kurma" },
  { id: 12, img: "https://t3.ftcdn.net/jpg/15/28/37/90/240_F_1528379033_Uv8R7syxnXYndVMiDS6doPGM6rKM74cM.jpg", label: "Kesari" },
];

const VISIBLE_COUNT = 4;
// Delfood shows partial plates at both edges — render 1 extra slot on each side
const EDGE_SLOTS   = 1;
const TOTAL_SLOTS  = VISIBLE_COUNT + EDGE_SLOTS * 2; // 6 slots rendered

export default function FoodGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideOffset,  setSlideOffset]  = useState(0);
  const [isAnimating,  setIsAnimating]  = useState(false);
  const autoPlayRef = useRef(null);
  const router      = useRouter();
  const totalItems  = ITEMS.length;

  const slide = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const delta = dir === 'next' ? 1 : -1;
    setSlideOffset(delta);

    setTimeout(() => {
      setCurrentIndex((prev) => ((prev + delta) % totalItems + totalItems) % totalItems);
      setSlideOffset(0);
      setIsAnimating(false);
    }, 520); // matches CSS transition duration
  }, [isAnimating, totalItems]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => slide('next'), 3500);
    return () => clearInterval(autoPlayRef.current);
  }, [slide]);

  // Build track: 1 extra slot on each side bleeds off-screen (like Delfood)
  // Slots: [-EDGE_SLOTS ... -1, 0, 1, 2, 3, 4 ... VISIBLE_COUNT + EDGE_SLOTS - 1]
  const trackItems = [];
  for (let i = -EDGE_SLOTS; i < VISIBLE_COUNT + EDGE_SLOTS; i++) {
    const realIndex = ((currentIndex + i) % totalItems + totalItems) % totalItems;
    trackItems.push({ ...ITEMS[realIndex], slot: i });
  }

  // Full track width = TOTAL_SLOTS slots. Each visible slot = 1/VISIBLE_COUNT of clip width.
  // translateX neutral = edge slots hidden left  = -(EDGE_SLOTS / TOTAL_SLOTS) * 100%
  // On slide: shift by ±(1/TOTAL_SLOTS)*100% extra
  const neutralPct  = (EDGE_SLOTS / TOTAL_SLOTS) * 100;
  const shiftPct    = (slideOffset / TOTAL_SLOTS) * 100;
  const translatePct = -(neutralPct + shiftPct);

  return (
    <section className="fg-section" id="food-gallery">
      <h1 className="Headinng01">Specials</h1>

      {/* Wave curve */}
      <div className="fg-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
  fill="#D14136"
  fillOpacity="0.1"
/>
        </svg>
      </div>

      {/* Carousel — arrows sit on the section edges, Delfood-style */}
      <div className="fg-carousel-wrapper">

        <button className="fg-arrow fg-arrow--left" onClick={() => slide('prev')} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Clip: exactly VISIBLE_COUNT wide, overflow hidden */}
        <div className="fg-track-clip">
          <div
            className="fg-track"
            style={{
              /* track is TOTAL_SLOTS/VISIBLE_COUNT × clip width */
              width: `${(TOTAL_SLOTS / VISIBLE_COUNT) * 100}%`,
              transform: `translateX(${translatePct}%)`,
              transition: isAnimating
                ? 'transform 0.52s cubic-bezier(0.25, 0.1, 0.25, 1)'
                : 'none',
            }}
          >
            {trackItems.map((item) => (
              <div
                className={`fg-plate-item${item.slot < 0 || item.slot >= VISIBLE_COUNT ? ' fg-plate-item--edge' : ''}`}
                key={`${item.id}-slot${item.slot}`}
                style={{ width: `${100 / TOTAL_SLOTS}%` }}
              >
                <div className="fg-circle">
                  <img src={item.img} alt={item.label} className="fg-circle-img" loading="lazy" />
                </div>
                <p className="fg-plate-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="fg-arrow fg-arrow--right" onClick={() => slide('next')} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>

      {/* Dots */}
      <div className="fg-dots">
        {ITEMS.map((_, i) => (
          <button
            key={i}
            className={`fg-dot${i === currentIndex ? ' fg-dot--active' : ''}`}
            onClick={() => { if (!isAnimating) setCurrentIndex(i); }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="fg-cta">
        <button className="fg-cta-btn" onClick={() => router.push('/menu')}>
          View Full Menu
        </button>
      </div>

    </section>
  );
}