import { useEffect, useRef } from "react";
import "../styles/FoodMarquee.css";
import foodgallery from '../components/Foodgallery';
import FoodGallery from "../components/Foodgallery";

const ROWS = [
  ["pancake", "acai bowl", "matcha"],
  ["bubble tea", "poke", "avocado toast"],
  ["chicken bao", "satay", "waffle"],
  ["french toast", "açaí", "latte"],
];

const STYLE_MAP = [
  ["filled", "ghost", "outline"],
  ["ghost", "outline", "filled"],
  ["outline", "filled", "ghost"],
  ["filled", "ghost", "outline"],
];

export default function FoodMarquee() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  // current rendered position (smoothly lerped)
  const currentX = useRef(ROWS.map(() => 0));
  // target position (updated on scroll)
  const targetX = useRef(ROWS.map(() => 0));
  const rafId = useRef(null);
  const lastScrollY = useRef(0);
  const isActive = useRef(false);

  useEffect(() => {
    rowRefs.current.forEach((el) => {
      if (el) el.style.transform = "translateX(0px)";
    });
    currentX.current = ROWS.map(() => 0);
    targetX.current = ROWS.map(() => 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lastScrollY.current = window.scrollY;
          isActive.current = true;
          startLoop();
        } else {
          isActive.current = false;
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (!isActive.current) return;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      targetX.current.forEach((_, i) => {
        // odd index (row 1,3) → left (-), even index (row 2,4) → right (+)
        // array is 0-based so: index 0,2 = row 1,3 → left; index 1,3 = row 2,4 → right
        const dir = i % 2 === 0 ? -1 : 1;
        targetX.current[i] += delta * dir * 0.5;
      });

      lastScrollY.current = scrollY;
    };

    // Lerp loop — runs independently of scroll for buttery smoothness
    function startLoop() {
      if (rafId.current) return;
      function loop() {
        let stillMoving = false;

        rowRefs.current.forEach((el, i) => {
          if (!el) return;
          const diff = targetX.current[i] - currentX.current[i];
          if (Math.abs(diff) > 0.01) {
            currentX.current[i] += diff * 0.08; // lerp factor — lower = smoother/slower ease-out
            stillMoving = true;
          } else {
            currentX.current[i] = targetX.current[i];
          }
          el.style.transform = `translateX(${currentX.current[i]}px)`;
        });

        rafId.current = requestAnimationFrame(loop);
      }
      rafId.current = requestAnimationFrame(loop);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
<section
  className="fm-section"
  ref={sectionRef}
  aria-label="BB Café best sellers"
>
    <>
      {ROWS.map((words, rowIdx) => {
        const styles = STYLE_MAP[rowIdx % STYLE_MAP.length];
        return (
          <div
            key={rowIdx}
            className="fm-row"
            ref={(el) => (rowRefs.current[rowIdx] = el)}
          >
            {words.map((word, wIdx) => (
              <span key={wIdx} className={`fm-word ${styles[wIdx % styles.length]}`}>
                {word}
              </span>
            ))}
            {words.map((word, wIdx) => (
              <span
                key={`dup-${wIdx}`}
                className={`fm-word ${styles[wIdx % styles.length]}`}
                aria-hidden="true"
              >
                {word}
              </span>
            ))}
          </div>
        );
      })}
      </>
      <FoodGallery/>
    </section>
  );
}