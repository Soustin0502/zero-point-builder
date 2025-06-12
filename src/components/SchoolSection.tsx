
import { useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

gsap.registerPlugin(TextPlugin);

const SchoolSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);

  // Title animation
  const titleRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }, { start: "top 80%" });

  // Content card animation
  const contentRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.9,
        rotationY: -10
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 70%" });

  // Stats animation
  const statsRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const statItems = element.querySelectorAll('.stat-item');
    
    gsap.fromTo(statItems,
      {
        opacity: 0,
        y: 50,
        scale: 0.7
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "elastic.out(1, 0.3)"
      }
    );
  }, { start: "top 75%" });

  // Terminal typing animation
  const terminalRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const commandElement = element.querySelector('.terminal-command');
    const infoElements = element.querySelectorAll('.terminal-info');
    
    // Initial setup
    gsap.set(element, { opacity: 0, x: 100 });
    gsap.set(commandElement, { text: "" });
    gsap.set(infoElements, { opacity: 0 });
    
    const tl = gsap.timeline();
    
    // Slide in terminal
    tl.to(element, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    // Type command
    .to(commandElement, {
      text: "$ school --info",
      duration: 1.5,
      ease: "none"
    })
    // Show info with stagger
    .to(infoElements, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.2,
      ease: "power2.out"
    }, "+=0.5");
  }, { start: "top 80%" });

  const handleCardMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(true);

    // Enhanced GSAP hover effect
    gsap.to(e.currentTarget, {
      rotationY: 3,
      rotationX: 2,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent) => {
    setHoveredCard(false);
    
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section id="about-school" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="items-center">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative title-glow text-center">
            <span className="text-cyber relative z-10">About Our School</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>
        
        <div 
          ref={contentRef}
          className="bg-card/50 cyber-border rounded-lg p-8 mb-8 card-glossy-glow"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            '--mouse-x': hoveredCard ? `${mousePosition.x}px` : '50%',
            '--mouse-y': hoveredCard ? `${mousePosition.y}px` : '50%',
          } as React.CSSProperties}
        >
          <p className="text-lg font-fira text-foreground/80 leading-relaxed mb-6">
            Delhi Public School Mathura Road stands at the forefront of technological education, 
            fostering innovation and critical thinking. With state-of-the-art facilities 
            and a curriculum designed for the digital age, we prepare students to excel 
            in an increasingly connected world.
          </p>
          
          <div ref={statsRef} className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="stat-item text-center">
              <div className="text-2xl font-orbitron font-bold text-primary mb-2">Excellence</div>
              <div className="text-sm font-fira text-muted-foreground">In Education</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-2xl font-orbitron font-bold text-secondary mb-2">Innovation</div>
              <div className="text-sm font-fira text-muted-foreground">Through Technology</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-2xl font-orbitron font-bold text-accent mb-2">Future</div>
              <div className="text-sm font-fira text-muted-foreground">Ready Leaders</div>
            </div>
          </div>
        </div>

        <div 
          ref={terminalRef}
          className="terminal-text text-left bg-background/50 border border-primary/30 rounded-lg p-4"
        >
          <div className="terminal-command text-primary mb-2"></div>
          <div className="text-muted-foreground">
            <div className="terminal-info">Name: Delhi Public School Mathura Road</div>
            <div className="terminal-info">Established: 1949</div>
            <div className="terminal-info">Status: ✓ Digitally Enhanced Learning Environment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSection;
