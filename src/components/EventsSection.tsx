
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const EventsSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [terminalRef, terminalVisible] = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const events = [
    {
      title: "WarP Intra '25",
      type: "Intra School Event",
      description: "Our flagship intra-school competition where students showcase their programming prowess, innovative thinking, and technical skills across multiple domains.",
      features: [
        "Competitive Programming",
        "Web Development Challenge",
        "AI/ML Workshop",
        "Cybersecurity CTF"
      ],
      color: "primary"
    },
    {
      title: "WarP Inter '25",
      type: "Inter School Event",
      description: "The ultimate battleground where schools compete in the digital arena. A prestigious event that brings together the brightest minds from across the region.",
      features: [
        "Multi-School Competition",
        "Hackathon Marathon",
        "Tech Expo & Showcase",
        "Networking Sessions"
      ],
      color: "secondary"
    }
  ];

  return (
    <section id="events" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
            <span className="text-cyber relative z-10">Our Events</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
            Two flagship events that define our commitment to excellence in technology education
          </p>
        </div>

        <div 
          ref={eventsRef}
          className={`relative max-w-6xl mx-auto events-container ${eventsVisible ? 'animate' : ''}`}
        >
          {events.map((event, index) => (
            <Card 
              key={index} 
              className={`
                bg-card cyber-border transition-all duration-300 group event-card
                ${index === 0 ? 'event-card-1' : 'event-card-2'}
                ${hoveredCard === index ? 'z-20' : ''}
                ${hoveredCard !== null && hoveredCard !== index ? 'adjacent-glow' : ''}
              `}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === index ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === index ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <CardHeader>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-fira uppercase tracking-wider mb-2 ${
                  event.color === 'primary' 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-secondary/20 text-secondary border border-secondary/30'
                }`}>
                  {event.type}
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold">
                  <span className={event.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                    {event.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-fira text-foreground/80 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {event.features.map((feature, idx) => (
                      <li key={idx} className="font-fira text-sm text-foreground/70 flex items-center">
                        <span className={`w-1 h-1 rounded-full mr-3 ${
                          event.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                        }`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  asChild
                  variant="outline" 
                  className={`w-full font-fira ${
                    event.color === 'primary' 
                      ? 'border-primary text-primary hover:bg-primary/10' 
                      : 'border-secondary text-secondary hover:bg-secondary/10'
                  }`}
                >
                  <Link to="/events">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div 
          ref={terminalRef}
          className={`text-center mt-12 scroll-fade-in ${terminalVisible ? 'animate' : ''}`}
        >
          <div className="terminal-text bg-background/50 border border-accent/30 rounded-lg p-4 max-w-md mx-auto">
            <div className="text-accent mb-1">$ events --schedule</div>
            <div className="text-muted-foreground text-sm">
              WarP Intra '25: August 02, 2025<br/>
              WarP Inter '25: T.B.D.
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
            <Link to="/blog">
              Read Our Blog & Announcements
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
