
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const Blog = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [headingRef, headingVisible] = useScrollAnimation(0.2);
  const [blogRef, blogVisible] = useScrollAnimation(0.3);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prevExpandedPosts) => {
      const newExpandedPosts = new Set(prevExpandedPosts);
      if (newExpandedPosts.has(postId)) {
        newExpandedPosts.delete(postId);
      } else {
        newExpandedPosts.add(postId);
      }
      return newExpandedPosts;
    });
  };

  const scrollToNextSection = () => {
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
              <span className="text-cyber relative z-10">Blog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Latest updates, announcements, and insights from WarP Computer Club
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
      
      {/* Blog Posts Section */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={headingRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={headingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Latest Posts</span>
              <span 
                className="absolute inset-0 text-cyber opacity-30 blur-[2px] scale-105"
                style={{
                  background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Latest Posts
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="flex justify-center">
            <motion.div 
              className="relative z-10"
              ref={blogRef}
              initial={{ opacity: 0, y: 20 }}
              animate={blogVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="bg-card/50 cyber-border animate-pulse w-full max-w-md">
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
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
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate={blogVisible ? "visible" : "hidden"}
                >
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-full max-w-sm"
                    >
                      <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-full">
                        <CardHeader className="text-center">
                          <CardTitle className="text-lg font-orbitron text-primary">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span className="font-fira">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4 text-center">
                          <p className="text-foreground/80 font-fira text-sm leading-relaxed text-justify">
                            {expandedPosts.has(post.id) ? post.content : post.excerpt}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(post.id)}
                            className="self-center"
                          >
                            {expandedPosts.has(post.id) ? (
                              <>
                                Read Less
                                <ChevronUp className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Read More
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <div className="flex items-center justify-center gap-2 mt-2">
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
                              className="justify-center"
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
