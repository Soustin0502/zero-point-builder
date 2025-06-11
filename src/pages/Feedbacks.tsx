
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, Calendar, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  feedback: string;
  rating?: number;
  created_at: string;
}

const Feedbacks = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [feedbacksRef, feedbacksVisible] = useScrollAnimation(0.1, '0px', true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formHeadingRef, formHeadingVisible] = useScrollAnimation(0.2);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const scrollToNextSection = () => {
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection) {
      testimonialSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Feedbacks</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110 opacity-100 pointer-events-none"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              See what our community members say about WarP Computer Club
            </p>
          </motion.div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={feedbacksRef}
            initial={{ opacity: 0, y: 20 }}
            animate={feedbacksVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
              Community Feedbacks
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110 opacity-100 pointer-events-none"></div>
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
              initial={{ opacity: 0 }}
              animate={feedbacksVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={feedbacksVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-orbitron text-primary">
                          {testimonial.name}
                        </CardTitle>
                        {testimonial.rating && (
                          <div className="flex gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        )}
                      </div>
                      {testimonial.position && (
                        <Badge variant="outline" className="w-fit">
                          {testimonial.position}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span className="font-fira">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                        "{testimonial.feedback}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={formHeadingRef}
            className={`text-center mb-16 scroll-fade-in ${formHeadingVisible ? 'animate' : ''}`}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
              <span className="text-cyber relative z-10">Give your Feedback</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </div>
          
          {/* Existing Feedback Form */}
          <div className="max-w-2xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </section>

{/*       <Footer /> */}
    </div>
  );
};

export default Feedbacks;
