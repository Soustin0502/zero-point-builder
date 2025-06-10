
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY
    });
  };

  const handleLogoMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const maxDistance = 20;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > 0) {
      const normalizedX = deltaX / distance;
      const normalizedY = deltaY / distance;
      
      const moveDistance = Math.min(distance * 0.3, maxDistance);
      
      setLogoPosition({
        x: -normalizedX * moveDistance,
        y: -normalizedY * moveDistance
      });
    }
  };

  const handleLogoMouseLeave = () => {
    setLogoPosition({ x: 0, y: 0 });
  };

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about-us');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden hero-fade-in page-hover-effect"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-6">
            <span className="text-primary font-fira text-sm">
              &gt; SYSTEM INFILTRATION SUCCESSFUL
            </span>
          </div>
          
          <div 
            className="mb-6 inline-block relative"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
          >
            <img 
              src="./WARP TEXT HORIZ.png" 
              alt="WarP Logo" 
              className="h-24 md:h-32 mx-auto transition-transform duration-300 ease-out relative z-0"
              style={{
                transform: `translate(${logoPosition.x}px, ${logoPosition.y}px)`,
                filter: `drop-shadow(0px 0px 15px rgba(255, 51, 204, 0.8))`,
              }}
            />
          </div>
          
          <h2 className="text-xl md:text-3xl font-ocr font-bold mb-6 text-muted-foreground">
            The Computer Club
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg font-fira text-foreground/80 leading-relaxed">
              Welcome to the digital frontier where code meets creativity. 
              We are the architects of tomorrow's technology, the guardians of digital innovation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira glow-pink"
            >
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-fira">
              <Link to="/contact">Learn More</Link>
            </Button>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
