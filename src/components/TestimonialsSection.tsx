
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating?: number;
  position?: string;
  created_at: string;
  approved: boolean;
  email?: string;
}

const TestimonialsSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation(0.1, '0px', true);
  const [cardsRef, cardsVisible] = useScrollAnimation(0.1, '0px', true);
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

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }
      
      if (data) {
        const formattedData: Testimonial[] = data.map(item => ({
          id: item.id,
          name: item.name || 'Anonymous',
          feedback: item.feedback || '',
          rating: item.rating,
          position: item.position,
          created_at: item.created_at,
          approved: item.approved,
          email: item.email
        }));
        
        console.log('Formatted testimonials:', formattedData);
        setTestimonials(formattedData);
      }
    } catch (error) {
      console.error('Error in fetchTestimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 scroll-fade-in ${sectionVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
            <span className="text-cyber relative z-10">Community Feedbacks</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
            See what our community members have to say about their experiences.
          </p>
        </div>

        {/* Feedbacks Grid */}
        <div className="mb-12 flex justify-center">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse p-6 h-80 w-full max-w-md card-glossy-glow">
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
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 font-fira text-lg">
                No feedbacks available yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div
              ref={cardsRef}
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center stagger-children ${cardsVisible ? 'animate' : ''}`}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full max-w-md"
                >
                  <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 p-6 h-80 flex flex-col card-glossy-glow">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12 bg-primary/20 flex-shrink-0">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-orbitron text-primary truncate">{testimonial.name}</h4>
                        {testimonial.position && (
                          <p className="text-sm text-muted-foreground font-fira truncate">
                            {testimonial.position}
                          </p>
                        )}
                        {testimonial.rating && (
                          <div className="flex items-center mt-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-foreground/80 font-fira text-sm leading-relaxed flex-1 overflow-hidden">
                      "{testimonial.feedback}"
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
          >
            <Link to="/feedbacks" className="flex items-center gap-2">
              View All Feedbacks
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
