// LogoMarquee.jsx
import '../styles/LogoMarquee.css';

import logoAL         from '../logos/AL.png';
import logoFORD       from '../logos/FORD.png';
import logoIB         from '../logos/IB.png';
import logoLamp       from '../logos/lamp.png';
import logoMedall     from '../logos/medall.png';
import logoPhoenix    from '../logos/phoenix.png';
import logoSun        from '../logos/sun.png';
import logoSutherland from '../logos/sutherland.png';
import logoTCS        from '../logos/tcs.png';
import logoTNPL       from '../logos/tnpl.png';

const BRANDS = [
  { id: 1,  logo: logoAL,         alt: 'AL' },
  { id: 2,  logo: logoFORD,       alt: 'Ford' },
  { id: 3,  logo: logoIB,         alt: 'IB' },
  { id: 4,  logo: logoLamp,       alt: 'Lamp' },
  { id: 5,  logo: logoMedall,     alt: 'Medall' },
  { id: 6,  logo: logoPhoenix,    alt: 'Phoenix' },
  { id: 7,  logo: logoSun,        alt: 'Sun' },
  { id: 8,  logo: logoSutherland, alt: 'Sutherland' },
  { id: 9,  logo: logoTCS,        alt: 'TCS' },
  { id: 10, logo: logoTNPL,       alt: 'TNPL' },
];

function LogoCard({ brand }) {
  return (
    <div className="logo-card">
      <img src={brand.logo} alt={brand.alt} />
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
            <LogoCard key={`${brand.id}-${index}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}