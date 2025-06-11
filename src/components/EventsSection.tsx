
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ArrowRight } from 'lucide-react';

const EventsSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [terminalRef, terminalVisible] = useScrollAnimation();
  const [blogRef, blogVisible] = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchLatestBlogPosts();
  }, []);

  const fetchLatestBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, author, created_at, category')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const events = [
    {
      title: "WarP Intra '25",
      type: "Intra School Event",
      description: "Our flagship intra-school competition where students showcase their programming prowess, innovative thinking, and technical skills across multiple domains.",
      features: [
        "Competitive Programming",
        "Web Development Challenge",
        "AI/ML Workshop",
        "Cybersecurity CTF"
      ],
      color: "primary"
    },
    {
      title: "WarP Inter '25",
      type: "Inter School Event",
      description: "The ultimate battleground where schools compete in the digital arena. A prestigious event that brings together the brightest minds from across the region.",
      features: [
        "Multi-School Competition",
        "Hackathon Marathon",
        "Tech Expo & Showcase",
        "Networking Sessions"
      ],
      color: "secondary"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-primary/20 text-primary border-primary/30';
      case 'social': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'event': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <section id="events" className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
            <div 
            ref={titleRef}
            className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
            >
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
                    <span className="text-cyber relative z-10">Our Events</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110 opacity-100 pointer-events-none"></div>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
                    Two flagship events that define our commitment to excellence in technology education
                </p>
            </div>

            <div 
            ref={eventsRef}
            className={`relative max-w-6xl mx-auto events-container ${eventsVisible ? 'animate' : ''}`}
            >
                {events.map((event, index) => (
                    <Card 
                    key={index} 
                    className={`
                        bg-card cyber-border transition-all duration-300 group event-card
                        ${index === 0 ? 'event-card-1' : 'event-card-2'}
                        ${hoveredCard === index ? 'z-20' : ''}
                        ${hoveredCard !== null && hoveredCard !== index ? 'adjacent-glow' : ''}
                    `}
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    onMouseLeave={handleCardMouseLeave}
                    style={{
                        '--mouse-x': hoveredCard === index ? `${mousePosition.x}px` : '50%',
                        '--mouse-y': hoveredCard === index ? `${mousePosition.y}px` : '50%',
                    } as React.CSSProperties}
                    >
                        <CardHeader>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-fira uppercase tracking-wider mb-2 ${
                            event.color === 'primary' 
                                ? 'bg-primary/20 text-primary border border-primary/30' 
                                : 'bg-secondary/20 text-secondary border border-secondary/30'
                            }`}>
                            {event.type}
                            </div>
                            <CardTitle className="text-2xl font-orbitron font-bold">
                                <span className={event.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                                    {event.title}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="font-fira text-foreground/80 leading-relaxed">
                            {event.description}
                            </p>
                            
                            <div className="space-y-2">
                                <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                                    Key Features:
                                </h4>
                                <ul className="space-y-1">
                                    {event.features.map((feature, idx) => (
                                    <li key={idx} className="font-fira text-sm text-foreground/70 flex items-center">
                                        <span className={`w-1 h-1 rounded-full mr-3 ${
                                        event.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                        }`}></span>
                                        {feature}
                                    </li>
                                    ))}
                                </ul>
                            </div>

                            <Button 
                            asChild
                            variant="outline" 
                            className={`w-full font-fira ${
                                event.color === 'primary' 
                                ? 'border-primary text-primary hover:bg-primary/10' 
                                : 'border-secondary text-secondary hover:bg-secondary/10'
                            }`}
                            >
                                <Link to="/events">Learn More</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div 
            ref={terminalRef}
            className={`text-center mt-12 scroll-fade-in ${terminalVisible ? 'animate' : ''}`}
            >
                <div className="terminal-text bg-background/50 border border-accent/30 rounded-lg p-4 max-w-md mx-auto">
                    <div className="text-accent mb-1">$ events --schedule</div>
                    <div className="text-muted-foreground text-sm">
                        WarP Intra '25: August 02, 2025<br/>
                        WarP Inter '25: T.B.D.
                    </div>
                </div>
            </div><br/><br/><br/><br/><br/>
            
            {/* Blog Section */}
            <div 
            ref={blogRef}
            className={`text-center mb-16 scroll-fade-in ${blogVisible ? 'animate' : ''}`}
            >
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
                    <span className="text-cyber relative z-10">Latest from Our Blogs</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110 opacity-100 pointer-events-none"></div>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                    <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with our latest announcements, tech insights, and club activities
                    </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
                {blogPosts.map((post, index) => (
                    <Card key={post.id} className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 w-full max-w-md mx-auto">
                        <CardHeader className="pb-3">
                            <div className={`inline-block px-2 py-1 rounded-full text-xs font-fira uppercase tracking-wider mb-2 border ${getCategoryColor(post.category)}`}>
                                {post.category}
                            </div>
                            <CardTitle className="text-lg font-orbitron text-primary line-clamp-2">
                                {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <User size={12} />
                                    <span className="font-fira">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span className="font-fira">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-foreground/70 font-fira text-sm line-clamp-4 mb-4">
                                {post.excerpt}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-8">
                <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                    <Link to="/blog" className="flex items-center gap-2">
                        View All Posts
                        <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
};

export default EventsSection;
