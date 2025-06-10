
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
  const [blogRef, blogVisible] = useScrollAnimation();
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
              <span className="text-cyber relative z-10">Blog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Latest updates, announcements, and insights from WarP Computer Club
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={blogRef}
            initial={{ opacity: 0, y: 20 }}
            animate={blogVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
              Latest Posts
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
                        {expandedPosts.has(post.id) ? post.content : post.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(post.id)}
                        className="self-start"
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
