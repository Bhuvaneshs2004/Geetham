// LogoMarquee.jsx
import '../styles/LogoMarquee.css';
import Image from 'next/image';

const BRANDS = [
  { id: 1,  logo: '/logos/AL.png',         alt: 'AL' },
  { id: 2,  logo: '/logos/FORD.png',        alt: 'Ford' },
  { id: 3,  logo: '/logos/IB.png',          alt: 'IB' },
  { id: 4,  logo: '/logos/lamp.png',        alt: 'Lamp' },
  { id: 5,  logo: '/logos/medall.png',      alt: 'Medall' },
  { id: 6,  logo: '/logos/phoenix.png',     alt: 'Phoenix' },
  { id: 7,  logo: '/logos/sun.png',         alt: 'Sun' },
  { id: 8,  logo: '/logos/sutherland.png',  alt: 'Sutherland' },
  { id: 9,  logo: '/logos/tcs.png',         alt: 'TCS' },
  { id: 10, logo: '/logos/tnpl.png',        alt: 'TNPL' },
];

function LogoCard({ brand }) {
  return (
    <div className="logo-card">
      <div className="logo-img-wrapper">
        <Image
          src={brand.logo}
          alt={brand.alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="140px"
        />
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  // Two copies is enough for a seamless loop
  const looped = [...BRANDS, ...BRANDS];

  return (
    <section className="marquee-section">
      <p className="marquee-label">
        <span>Trusted by Leading Brands</span>
      </p>

      <div className="marquee-track-wrapper">
        <div className="marquee-belt">
          {looped.map((brand, index) => (
            <LogoCard key={`${brand.id}-${index}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}