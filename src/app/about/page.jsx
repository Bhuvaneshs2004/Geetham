// app/about/page.jsx
import { useScrollReveal } from '../hooks/useScrollReveal';
import AboutSection from '../components/About';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
<>
  <BackButton/>
  <AboutSection />
  <Footer/>
</>
);
}