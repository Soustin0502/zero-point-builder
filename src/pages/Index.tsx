
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SchoolSection from '@/components/SchoolSection';
import EventsSection from '@/components/EventsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image_url: string;
  instagram_post_url: string;
  published: boolean;
}

const Index = () => {
  const [blogRef, blogVisible] = useScrollAnimation();
  const [feedbackRef, feedbackVisible] = useScrollAnimation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("Index page is rendering");
  console.log("All components imported successfully");

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SchoolSection />
        <EventsSection />
        <TestimonialsSection />
        
        {/* Blog Section */}
        <section 
          ref={blogRef}
          className="py-20 bg-gradient-to-br from-background via-background/50 to-primary/5"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={blogVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
                Latest from Our Blog
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            </motion.div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
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
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate={blogVisible ? "visible" : "hidden"}
              >
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-full">
                      <CardHeader>
                        <CardTitle className="text-lg font-orbitron text-primary">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span className="font-fira">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4">
                        <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <User size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground font-fira text-sm">
                            {post.author}
                          </span>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        {post.instagram_post_url && (
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="justify-start"
                          >
                            <a
                              href={post.instagram_post_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              View on Instagram
                              <ExternalLink size={16} />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={blogVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                <Link to="/blog">Read All Posts</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section 
          ref={feedbackRef}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={feedbackVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
                Share Your Experience
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            </motion.div>
            <FeedbackForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
