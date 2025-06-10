import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const AboutSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="about-us" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
            <span className="text-cyber relative z-10">About Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={contentRef}
            className={`space-y-6 scroll-slide-left ${contentVisible ? 'animate' : ''}`}
          >
            <div className="bg-card cyber-border rounded-lg p-6 card-glossy-glow"
                 onMouseMove={(e) => handleCardMouseMove(e, 0)}
                 onMouseLeave={handleCardMouseLeave}
                 style={{
                   '--mouse-x': hoveredCard === 0 ? `${mousePosition.x}px` : '50%',
                   '--mouse-y': hoveredCard === 0 ? `${mousePosition.y}px` : '50%',
                 } as React.CSSProperties}>
              <h3 className="text-xl font-orbitron font-semibold text-primary mb-4">
                Our Mission
              </h3>
              <p className="font-fira text-foreground/80 leading-relaxed">
                To cultivate a community of digital innovators who push the boundaries 
                of technology. We believe in the power of code to transform reality 
                and create solutions for tomorrow's challenges.
              </p>
            </div>

            <div className="bg-card cyber-border rounded-lg p-6 card-glossy-glow"
                 onMouseMove={(e) => handleCardMouseMove(e, 1)}
                 onMouseLeave={handleCardMouseLeave}
                 style={{
                   '--mouse-x': hoveredCard === 1 ? `${mousePosition.x}px` : '50%',
                   '--mouse-y': hoveredCard === 1 ? `${mousePosition.y}px` : '50%',
                 } as React.CSSProperties}>
              <h3 className="text-xl font-orbitron font-semibold text-secondary mb-4">
                What We Do
              </h3>
              <p className="font-fira text-foreground/80 leading-relaxed">
                From competitive programming to cutting-edge AI development, 
                we explore every facet of computer science. Our members engage 
                in hackathons, workshops, and collaborative projects that shape the future.
              </p>
            </div>
          </div>

          <div 
            ref={statsRef}
            className={`space-y-4 stagger-children ${statsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300 card-glossy-glow"
                  onMouseMove={(e) => handleCardMouseMove(e, 2)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    '--mouse-x': hoveredCard === 2 ? `${mousePosition.x}px` : '50%',
                    '--mouse-y': hoveredCard === 2 ? `${mousePosition.y}px` : '50%',
                  } as React.CSSProperties}>
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">75+</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Active Members</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:glow-blue transition-all duration-300 card-glossy-glow"
                  onMouseMove={(e) => handleCardMouseMove(e, 3)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    '--mouse-x': hoveredCard === 3 ? `${mousePosition.x}px` : '50%',
                    '--mouse-y': hoveredCard === 3 ? `${mousePosition.y}px` : '50%',
                  } as React.CSSProperties}>
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-secondary mb-2">5</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Years of Legacy</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300 card-glossy-glow"
                  onMouseMove={(e) => handleCardMouseMove(e, 4)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    '--mouse-x': hoveredCard === 4 ? `${mousePosition.x}px` : '50%',
                    '--mouse-y': hoveredCard === 4 ? `${mousePosition.y}px` : '50%',
                  } as React.CSSProperties}>
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-accent mb-2">2</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Annual Events</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;