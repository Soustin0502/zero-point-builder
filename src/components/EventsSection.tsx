
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

gsap.registerPlugin(TextPlugin);

const EventsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Title animation
  const titleRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }, { start: "top 80%" });

  // Events cards with morphing and floating effects
  const eventsRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const cards = element.querySelectorAll('.event-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 100,
        rotationY: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)"
      }
    );

    // Add floating animation
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: "+=10",
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });
  }, { start: "top 70%" });

  // Terminal typing animation for events schedule
  const terminalRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const commandElement = element.querySelector('.terminal-command');
    const infoElements = element.querySelectorAll('.terminal-info');
    
    // Initial setup
    gsap.set(element, { opacity: 0, x: 100 });
    gsap.set(commandElement, { text: "" });
    gsap.set(infoElements, { opacity: 0 });
    
    const tl = gsap.timeline();
    
    // Slide in terminal
    tl.to(element, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    // Type command
    .to(commandElement, {
      text: "$ events --schedule",
      duration: 1.5,
      ease: "none"
    })
    // Show info with stagger
    .to(infoElements, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.2,
      ease: "power2.out"
    }, "+=0.5");
  }, { start: "top 80%" });

  // Blog section animation
  const blogRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { start: "top 80%" });

  // Latest Posts animation
  const postsRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const cards = element.querySelectorAll('.blog-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 80,
        rotationX: 45,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 75%" });

  // Blog terminal animation
  const blogTerminalRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const commandElement = element.querySelector('.blog-terminal-command');
    const infoElements = element.querySelectorAll('.blog-terminal-info');
    
    // Initial setup
    gsap.set(element, { opacity: 0, x: -100 });
    gsap.set(commandElement, { text: "" });
    gsap.set(infoElements, { opacity: 0 });
    
    const tl = gsap.timeline();
    
    // Slide in terminal
    tl.to(element, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    // Type command
    .to(commandElement, {
      text: "$ blog --latest",
      duration: 1.5,
      ease: "none"
    })
    // Show info with stagger
    .to(infoElements, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.2,
      ease: "power2.out"
    }, "+=0.5");
  }, { start: "top 80%" });

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

    // Enhanced morphing effect
    gsap.to(e.currentTarget, {
      rotationY: 8,
      rotationX: 4,
      scale: 1.05,
      z: 100,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent) => {
    setHoveredCard(null);
    
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      z: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
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
    <section id="events" className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
            <div 
            ref={titleRef}
            className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative title-glow">
                    <span className="text-cyber relative z-10">Our Events</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
                    Two flagship events that define our commitment to excellence in technology education
                </p>
            </div>

            <div 
            ref={eventsRef}
            className="relative max-w-6xl mx-auto events-container items-center"
            >
                {events.map((event, index) => (
                    <Card 
                    key={index} 
                    className={`
                        event-card bg-card cyber-border transition-all duration-300 group
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
            className="text-center mt-12"
            >
                <div className="terminal-text bg-background/50 border border-accent/30 rounded-lg p-4 max-w-md mx-auto">
                    <div className="terminal-command text-accent mb-1"></div>
                    <div className="text-muted-foreground text-sm">
                        <div className="terminal-info">WarP Intra '25: August 02, 2025</div>
                        <div className="terminal-info">WarP Inter '25: T.B.D.</div>
                    </div>
                </div>
            </div><br/><br/><br/><br/><br/>
            
            {/* Latest Posts Section */}
            <div 
            ref={blogRef}
            className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative title-glow">
                    <span className="text-cyber relative z-10">Latest Posts</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                    <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with our latest announcements, tech insights, and club activities
                    </p>
            </div>

            <div className="flex justify-center">
                <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center items-center">
                    {blogPosts.length > 0 ? blogPosts.map((post, index) => (
                        <Card key={post.id} className="blog-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 w-full max-w-md card-glossy-glow">
                            <CardHeader className="pb-3 text-center">
                                <div className={`inline-block px-2 py-1 rounded-full text-xs font-fira uppercase tracking-wider mb-2 border ${getCategoryColor(post.category)}`}>
                                    {post.category}
                                </div>
                                <CardTitle className="text-lg font-orbitron text-primary line-clamp-2">
                                    {post.title}
                                </CardTitle>
                                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
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
                            <CardContent className="pt-0 text-center">
                                <p className="text-foreground/70 font-fira text-sm line-clamp-4 mb-4 text-justify">
                                    {post.excerpt}
                                </p>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-foreground/60 font-fira text-lg">
                                No posts available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Blog Terminal Info */}
            <div 
            ref={blogTerminalRef}
            className="text-center mt-8"
            >
                <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-4 max-w-md mx-auto">
                    <div className="blog-terminal-command text-primary mb-2"></div>
                    <div className="text-muted-foreground text-sm">
                        <div className="blog-terminal-info">Total Posts: {blogPosts.length}</div>
                        <div className="blog-terminal-info">Categories: Tech, Events, Announcements</div>
                        <div className="blog-terminal-info">Status: ✓ Regularly Updated</div>
                    </div>
                </div>
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
