import EventsPage from '../components/Eventspage';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Events & Corporate Bookings | Geetham',
  description: 'Book your birthday, anniversary, corporate event or wedding at Geetham Veg Restaurant Chennai.',
};

export default function EventsRoute() {
    
  return( 
  <>
  <BackButton/>
  <EventsPage />
  <Footer/>
  </>);
}