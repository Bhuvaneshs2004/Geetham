'use client';
import { useEffect, useRef, useState } from "react";
import "../styles/Foodgallery.css";

const ITEMS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=85",
    label: "Idly",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=85",
    label: "Medu Vada",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=85",
    label: "Masala Dosa",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=85",
    label: "Ghee Pongal",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1742281258189-3b933879867a?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Filter Coffee",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=85",
    label: "Poori Masala",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=85",
    label: "Rava Dosa",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&q=85",
    label: "South Indian Meals",
  },
  {
    id: 9,
    img:"https://media.istockphoto.com/id/1292563627/photo/assorted-south-indian-breakfast-foods-on-wooden-background-ghee-dosa-uttappam-medhu-vada.webp?a=1&b=1&s=612x612&w=0&k=20&c=horyU4NBswJFPSeVuEAlZtpB-BF_xFODzd4J4AbVH9M=",
    label: "Curd Rice",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=85",
    label: "Sambar Rice",
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?w=600&q=85",
    label: "Chapati Kurma",
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=85",
    label: "Mini Tiffin",
  },
  {
    id: 13,
    img:"https://media.istockphoto.com/id/678434780/photo/ven-pongal-traditional-indian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=qglWwS5-kOHxxQEWOoYp0MObkhgNeVxDoMrXxZiF_3Y=",
    label: "Kesari",
  },
  {
    id: 14,
    img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=85",
    label: "Banana Leaf Meals",
  },
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
    <div className="fg-page" id="food-gallery">
      {/* <div className="fg-corner fg-corner--tl" />
      <div className="fg-corner fg-corner--tr" />
      <div className="fg-corner fg-corner--bl" />
      <div className="fg-corner fg-corner--br" /> */}

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
              <div className="fg-blob abstract-manga">
                <img src={cell.img} alt={cell.label} className="fg-blob-img abstract-manga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}