
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Trophy, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue?: string;
  max_participants: number;
  current_participants: number;
  status: string;
  event_type: string;
  featured_image_url?: string;
  registration_link?: string;
  results_url?: string;
  created_at: string;
  updated_at: string;
  registration_deadline?: string;
  winners?: any;
}

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'text-green-500';
      case 'ongoing':
        return 'text-blue-500';
      case 'completed':
        return 'text-gray-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderEventCard = (event: Event) => (
    <motion.div
      key={event.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-full">
        <CardHeader>
          <CardTitle className="text-lg font-orbitron text-primary">
            {event.title}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span className="font-fira">{new Date(event.event_date).toLocaleDateString()}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {event.venue && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span className="font-fira">{event.venue}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={14} />
            <span className="font-fira">
              {event.current_participants} / {event.max_participants}
            </span>
          </div>
          <Badge variant="secondary" className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
          <p className="text-foreground/80 font-fira text-sm leading-relaxed">
            {event.description}
          </p>
          {event.registration_link && (
            <Button asChild variant="link" className="w-fit p-0">
              <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Register Now
                <ExternalLink size={16} />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Join our exciting tech events and competitions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={eventsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={eventsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
              Upcoming Events
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={eventsVisible ? "visible" : "hidden"}
            >
              {events.map(renderEventCard)}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
