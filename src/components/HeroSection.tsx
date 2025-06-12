
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAPAnimation, useGSAPTimeline } from '@/hooks/useGSAPAnimation';

gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  // GSAP Timeline for entrance animations
  const createEntranceTimeline = () => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(".hero-system-text", { opacity: 0, y: -20 });
    gsap.set(".hero-logo", { scale: 0, rotation: -180, opacity: 0 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
    gsap.set(".hero-description", { opacity: 0, y: 30 });
    gsap.set(".hero-buttons", { opacity: 0, y: 40 });
    gsap.set(".hero-scroll-indicator", { opacity: 0, y: 20 });

    // Entrance sequence
    tl.to(".hero-system-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(".hero-logo", {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
      filter: "drop-shadow(0px 0px 20px rgba(255, 51, 204, 0.9))"
    }, "-=0.3")
    .to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8")
    .to(".hero-description", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(".hero-buttons .hero-button", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(".hero-scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    return tl;
  };

  const timeline = useGSAPTimeline(createEntranceTimeline, []);

  // Enhanced logo hover animation
  const logoRef = useGSAPAnimation<HTMLDivElement>((element) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const maxDistance = 30;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > 0) {
        const normalizedX = deltaX / distance;
        const normalizedY = deltaY / distance;
        
        const moveDistance = Math.min(distance * 0.4, maxDistance);
        
        gsap.to(element.querySelector('.hero-logo'), {
          x: -normalizedX * moveDistance,
          y: -normalizedY * moveDistance,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element.querySelector('.hero-logo'), {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Button hover animations
  const buttonRef = useGSAPAnimation<HTMLDivElement>((element) => {
    const buttons = element.querySelectorAll('.hero-button');
    
    buttons.forEach(button => {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY
    });
  };

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about-us');
    if (aboutSection) {
      // Enhanced scroll animation
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: aboutSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden hero-fade-in page-hover-effect"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background Grid with animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="hero-system-text inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-6">
            <span className="text-primary font-fira text-sm">
              &gt; SYSTEM INFILTRATION SUCCESSFUL
            </span>
          </div>
          
          <div 
            ref={logoRef}
            className="mb-6 inline-block relative"
          >
            <img 
              src="./WARP TEXT HORIZ.png" 
              alt="WarP Logo" 
              className="hero-logo h-24 md:h-32 mx-auto transition-transform duration-300 ease-out relative z-0"
            />
          </div>
          
          <h2 className="hero-subtitle text-xl md:text-3xl font-ocr font-bold mb-6 text-muted-foreground">
            The Computer Club
          </h2>
          
          <div className="hero-description max-w-2xl mx-auto mb-8">
            <p className="text-lg font-fira text-foreground/80 leading-relaxed">
              Welcome to the digital frontier where code meets creativity. 
              We are the architects of tomorrow's technology, the guardians of digital innovation.
            </p>
          </div>

          <div 
            ref={buttonRef}
            className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild
              className="hero-button bg-primary hover:bg-primary/80 text-primary-foreground font-fira glow-pink"
            >
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button 
              variant="outline" 
              className="hero-button border-secondary text-secondary hover:bg-secondary/10 font-fira"
            >
              <Link to="/contact">Learn More</Link>
            </Button>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="hero-scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary animate-bounce" size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
