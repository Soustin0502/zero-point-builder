import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronDown, Trophy } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();

  const scrollToNextSection = () => {
    const eventsSection = document.querySelector('#events-stats');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "WarP Intra '25",
      description: "Our flagship intra-school competition where students showcase their programming prowess, innovative thinking, and technical skills across multiple domains.",
      date: "2025-08-02",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "170+",
      tags: ["Competition", "Programming", "Prizes"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      registration: "Open"
    },
    {
      id: 2,
      title: "WarP Inter '25",
      description: "The ultimate battleground where schools compete in the digital arena. A prestigious event that brings together the brightest minds from across the region.",
      date: "T.B.D.",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "200+",
      tags: ["Inter School", "Competition", "Tech Expo"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      registration: "Open"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "WarP Intra '24",
      description: "Our most successful intra-school competition featuring advanced programming challenges, AI workshops, and innovative project showcases.",
      date: "2024-08-02",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "150",
      tags: ["Competition", "Programming", "AI Workshop"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 4,
      title: "WarP Intra '23",
      description: "A landmark event that brought together coding enthusiasts for intense programming competitions and collaborative learning sessions.",
      date: "2023-08-02",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "130",
      tags: ["Competition", "Coding", "Collaboration"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 5,
      title: "WarP Inter '23",
      description: "Inter-school championship that showcased the best talent from multiple schools in competitive programming and tech innovation.",
      date: "2023-12-15",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "200",
      tags: ["Inter School", "Championship", "Innovation"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 6,
      title: "WarP Intra '22",
      description: "Foundation event that established our reputation for organizing high-quality programming competitions and technical workshops.",
      date: "2022-08-02",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "100",
      tags: ["Foundation", "Programming", "Workshop"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 7,
      title: "WarP Inter '22",
      description: "Our inaugural inter-school event that brought together young programmers from across the region for friendly competition.",
      date: "2022-12-10",
      time: "07:30 AM - 01:45 PM",
      location: "KG Hall",
      participants: "80",
      tags: ["Inaugural", "Inter School", "Programming"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''}`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Our Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Discover amazing opportunities to learn, compete, and innovate with fellow tech enthusiasts
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to events"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Stats Section */}
      <section id="events-stats" className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={statsRef}
            className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20 stagger-children ${statsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="text-primary" size={48} />
                </div>
                <CardTitle className="text-3xl font-orbitron font-bold text-primary">
                  {upcomingEvents.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira">Upcoming Events</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Exciting competitions and workshops planned for this year to challenge and inspire our community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:glow-blue transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="text-secondary" size={48} />
                </div>
                <CardTitle className="text-3xl font-orbitron font-bold text-secondary">
                  {pastEvents.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira">Successful Events</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Years of organizing memorable events that have shaped the tech community at our school.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Upcoming Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </div>

          <div 
            ref={eventsRef}
            className={`grid md:grid-cols-2 gap-8 mb-20 stagger-children ${eventsVisible ? 'animate' : ''}`}
          >
            {upcomingEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {event.registration}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-primary">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground/80 font-fira text-sm">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="font-fira">{event.date === "T.B.D." ? event.date : new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.participants}</span>
                    </div>
                  </div>

                  <SkillsDisplay 
                    skills={event.tags} 
                    maxVisible={3} 
                    primaryColor="secondary"
                  />

                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Past Events */}
          <div className="text-center mb-16 relative">
            <h3 className="text-2xl md:text-4xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Past Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/30 border-muted/30 hover:border-muted/50 transition-all duration-300 overflow-hidden opacity-80"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover grayscale"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80">
                      {event.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-muted-foreground">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground font-fira text-sm">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="font-fira">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.participants}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs border-muted/30 text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
