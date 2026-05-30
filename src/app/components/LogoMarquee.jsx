import Image from 'next/image';
import '../styles/LogoMarquee.css';

const BRANDS = [
  { id: 1, logo: '/logos/AL.png', alt: 'AL' },
  { id: 2, logo: '/logos/FORD.png', alt: 'Ford' },
  { id: 3, logo: '/logos/IB.png', alt: 'IB' },
  { id: 4, logo: '/logos/lamp.png', alt: 'Lamp' },
  { id: 5, logo: '/logos/medall.png', alt: 'Medall' },
  { id: 6, logo: '/logos/phoenix.png', alt: 'Phoenix' },
  { id: 7, logo: '/logos/sun.png', alt: 'Sun' },
  { id: 8, logo: '/logos/sutherland.png', alt: 'Sutherland' },
  { id: 9, logo: '/logos/tcs.png', alt: 'TCS' },
  { id: 10, logo: '/logos/tnpl.png', alt: 'TNPL' },
];

function LogoCard({ brand }) {
  return (
    <div className="logo-card">
      <Image
        src={brand.logo}
        alt={brand.alt}
        width={180}
        height={100}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default function LogoMarquee() {
  const looped = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="marquee-section">
      <p className="marquee-label">
        <span>Trusted by Leading Brands</span>
      </p>

      <div className="marquee-track-wrapper">
        <div className="marquee-belt">
          {looped.map((brand, index) => (
            <LogoCard
              key={`${brand.id}-${index}`}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}