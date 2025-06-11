
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  email: string;
  feedback: string;
  position: string;
  rating: number;
  approved: boolean;
}

const TestimonialsSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation(0.1, '0px', true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials...');
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(3);

      console.log('Supabase response:', { data, error });

      if (error) throw error;
      
      if (data) {
        console.log('Testimonials fetched:', data);
        setTestimonials(data);
      } else {
        console.log('No testimonials data received');
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
            <span className="text-cyber relative z-10">Feedbacks</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
            Hear from our valued members about their journey with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={sectionVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12 bg-primary/20">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-orbitron text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground font-fira">
                          {testimonial.position}
                        </p>
                        {/* Add star rating */}
                        <div className="flex items-center mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                      {testimonial.feedback}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            asChild 
            variant="ghost" 
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
          >
            <Link to="/feedbacks">View All Feedbacks <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
