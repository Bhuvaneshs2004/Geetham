'use client';                          // ← add this
import Link from 'next/link';          // ← add this
import "../styles/AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-grain" />

      <div className="about-container">
        <div className="about-content">
          <span className="about-eyebrow">About Us</span>

          <h2 className="about-heading">
            Authentic flavours,
            <br />
            <em>crafted with love</em>
          </h2>

          <div className="about-divider" />

          <p className="about-body">
            At Geetham, we believe every meal is a celebration of tradition.
            Born from generations of family recipes passed down through the
            kitchens of Tamil Nadu, our food carries the warmth of home in
            every bite.
          </p>

          <p className="about-body">
            We source only the freshest local ingredients, blending time-honoured
            spices with modern culinary artistry — creating a dining experience
            that honours the past while embracing the present.
          </p>

          {/* ✅ Link instead of <a> — preserves history */}
          <Link href="/about" className="about-cta">
            <span>Discover Our Story</span>
            <svg
              className="about-cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="about-video-wrapper">
          <div className="about-video-frame">
            <video
              className="about-video"
              src="./assets/menuVideo.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <span className="about-corner about-corner-tl" />
            <span className="about-corner about-corner-br" />
          </div>
        </div>
      </div>
    </section>
  );
}