
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SchoolSection from '@/components/SchoolSection';
import EventsSection from '@/components/EventsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';

const Index = () => {
  console.log("Index page is rendering");
  console.log("All components imported successfully");
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SchoolSection />
        <EventsSection />
        <TestimonialsSection />
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
