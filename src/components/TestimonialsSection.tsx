
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating: number;
  position: string;
}

const TestimonialsSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-background/50 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-muted animate-pulse rounded w-64 mx-auto mb-4"></div>
            <div className="h-1 bg-muted animate-pulse rounded w-24 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 cyber-border">
              <CardContent className="p-8 animate-pulse">
                <div className="h-24 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background via-background/50 to-primary/5"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary">
            What Our Members Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <Quote className="text-primary mx-auto mb-6" size={48} />
                    
                    <p className="text-lg font-fira text-foreground/90 mb-6 leading-relaxed">
                      "{testimonials[currentIndex].feedback}"
                    </p>
                    
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    <h4 className="text-xl font-orbitron font-semibold text-primary mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground font-fira">
                      {testimonials[currentIndex].position}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft size={20} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight size={20} />
                </Button>
              </>
            )}
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
