
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

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

const TestimonialsSection = () => {
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
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
            <span className="text-cyber relative z-10">Latest from Our Blog</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </div>

        <motion.div 
          className="relative z-10 flex justify-center"
          ref={blogRef}
          initial={{ opacity: 0, y: 20 }}
          animate={blogVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse">
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
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
    </section>
  );
};

export default TestimonialsSection;
