import { useEffect, useRef, useState } from "react";
import "../styles/FoodGallery.css";

const ITEMS = [
  { id: 1,  img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=85", label: "Pancakes" },
  { id: 2,  img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=85", label: "Blue Latte" },
  { id: 3,  img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=85", label: "Crispy Burger" },
  { id: 4,  img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=85", label: "Golden Latte" },
  { id: 5,  img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=85", label: "Açaí Bowl" },
  { id: 6,  img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=85", label: "French Toast" },
  { id: 7,  img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85", label: "Skewers" },
  { id: 8,  img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=85", label: "Waffles" },
  { id: 9,  img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=85", label: "Fruit Bowl" },
  { id: 10, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=85", label: "Dessert" },
  { id: 11, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=85", label: "Burger" },
  { id: 12, img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=85", label: "Smoothie" },
  { id: 13, img: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&q=85", label: "Cake" },
  { id: 14, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=85", label: "Pasta" },
];

const GRID_SIZE = 15;
const MENU_INDEX = 7;

const CELL_META = Array.from({ length: GRID_SIZE }, (_, i) => ({
  speed: 0.025 + (i % 5) * 0.006 + Math.floor(i / 5) * 0.003,
  base: [-8, 6, -10, 4, -7, 9, -5, 0, 7, -9, 5, -6, 11, -4, 8][i],
  dir: i % 2 === 0 ? 1 : -1,
}));

// Menu cell gets its own scroll meta (index 7)
const MENU_META = CELL_META[MENU_INDEX];

function MenuCell({ rotation }) {
  return (
    <div
      className="fg-cell fg-cell--menu"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="fg-blob fg-blob--menu">
        <div className="fg-menu-bg" />
        <div className="fg-menu-label">
          <span className="fg-menu-dot" />
          <span className="fg-menu-text">MENU</span>
          <span className="fg-menu-line" />
        </div>
      </div>
    </div>
  );
}

export default function FoodGallery() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const menuRotation = MENU_META.base + scrollY * MENU_META.speed * MENU_META.dir;

  let itemIdx = 0;
  const cells = Array.from({ length: GRID_SIZE }, (_, ci) => {
    if (ci === MENU_INDEX) return { isMenu: true };
    const item = ITEMS[itemIdx % ITEMS.length];
    itemIdx++;
    return { isMenu: false, ...item };
  });

  return (
    <div className="fg-page">
      <div className="fg-corner fg-corner--tl" />
      <div className="fg-corner fg-corner--tr" />
      <div className="fg-corner fg-corner--bl" />
      <div className="fg-corner fg-corner--br" />

      <div className="fg-grid">
        {cells.map((cell, ci) => {
          if (cell.isMenu) return <MenuCell key="menu" rotation={menuRotation} />;

          const meta = CELL_META[ci];
          const rotation = meta.base + scrollY * meta.speed * meta.dir;

          return (
            <div
              key={ci}
              className="fg-cell"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="fg-blob">
                <img src={cell.img} alt={cell.label} className="fg-blob-img" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}