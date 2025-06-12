import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();
  const [detailsRef, detailsVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createCyberStyledEmail = (data: typeof formData) => {
    return `
      ╔══════════════════════════════════════════════════════════════════════════════╗
      ║                          WarP COMPUTER CLUB                                 ║
      ║                      DIGITAL COMMUNICATION PROTOCOL                         ║
      ╚══════════════════════════════════════════════════════════════════════════════╝

      > SYSTEM INFILTRATION SUCCESSFUL
      > ESTABLISHING SECURE CONNECTION...
      > CONNECTION ESTABLISHED

      ┌─ SENDER IDENTIFICATION ─────────────────────────────────────────────────────┐
      │ Name: ${data.name}
      │ Email: ${data.email}
      │ Timestamp: ${new Date().toISOString()}
      └─────────────────────────────────────────────────────────────────────────────┘

      ┌─ MESSAGE HEADER ────────────────────────────────────────────────────────────┐
      │ Subject: ${data.subject}
      │ Priority: HIGH
      │ Encryption: CYBER-GRADE
      └─────────────────────────────────────────────────────────────────────────────┘

      ┌─ MESSAGE PAYLOAD ───────────────────────────────────────────────────────────┐
      ${data.message}
      └─────────────────────────────────────────────────────────────────────────────┘

      > MESSAGE TRANSMISSION COMPLETE
      > AWAITING RESPONSE FROM WarP COMMAND CENTER...

      ╔══════════════════════════════════════════════════════════════════════════════╗
      ║ This message was sent via the WarP Computer Club Contact System             ║
      ║ Architecting the digital future through innovation and technology           ║
      ╚══════════════════════════════════════════════════════════════════════════════╝
          `.trim();
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cyberMessage = createCyberStyledEmail(formData);
      
      // Check if device is mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile devices, use a more compatible approach
        const mailtoLink = `mailto:warp.dpsmr@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(cyberMessage)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Email client opened",
          description: "Your email app should open with the pre-filled message.",
        });
      } else {
        // For desktop, try Gmail first
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=warp.dpsmr@gmail.com&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(cyberMessage)}`;
        
        const newWindow = window.open(gmailUrl, '_blank');
        
        if (newWindow) {
          toast({
            title: "Gmail opened successfully!",
            description: "Your message has been pre-filled in Gmail. Please send it from there.",
          });
        } else {
          // Fallback to mailto if popup is blocked
          const mailtoLink = `mailto:warp.dpsmr@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(cyberMessage)}`;
          window.location.href = mailtoLink;
          
          toast({
            title: "Email client opened",
            description: "Your default email client should open with the cyber-styled message.",
          });
        }
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    // {/* Contact Section */}
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
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
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Contact Us</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Ready to connect with the digital revolution? Get in touch with us.
            </p>
          </motion.div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to blog posts"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card 
              ref={formRef}
              className={`bg-card/50 cyber-border scroll-slide-left card-glossy-glow ${formVisible ? 'animate' : ''}`}
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 0 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 0 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl text-primary">
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Email</label>
                    <Input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Subject</label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Message subject" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..." 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                    style={{ boxShadow: '0 0 20px hsl(320 100% 65% / 0.4)' }}
                  >
                    {isLoading ? 'Opening Gmail...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card 
                ref={infoRef}
                className={`bg-card/50 cyber-border card-glossy-glow scroll-slide-right ${infoVisible ? 'animate' : ''}`}
                onMouseMove={(e) => handleCardMouseMove(e, 1)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  '--mouse-x': hoveredCard === 1 ? `${mousePosition.x}px` : '50%',
                  '--mouse-y': hoveredCard === 1 ? `${mousePosition.y}px` : '50%',
                  animationDelay: '0.2s'
                } as React.CSSProperties}
              >
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-secondary">
                    Club Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-4">
                    <div className="text-primary mb-2">$ club --info</div>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <div>Name: WarP Computer Club</div>
                      <div>Founded: 2020</div>
                      <div>Members: 75+</div>
                      <div>Events: 2 Annual</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                ref={detailsRef}
                className={`bg-card/50 cyber-border card-glossy-glow scroll-slide-right ${detailsVisible ? 'animate' : ''}`}
                onMouseMove={(e) => handleCardMouseMove(e, 2)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  '--mouse-x': hoveredCard === 2 ? `${mousePosition.x}px` : '50%',
                  '--mouse-y': hoveredCard === 2 ? `${mousePosition.y}px` : '50%',
                  animationDelay: '0.4s'
                } as React.CSSProperties}
              >
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-accent">
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 font-fira text-sm">
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                      <div className="text-foreground">warp.dpsmr@gmail.com</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Meeting Times</div>
                      <div className="text-foreground">Mon to Fri, 08:00 AM to 01:00 PM</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                      <div className="text-foreground">Computer Lab 1/2/3, Senior School Building, Ground Floor</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default Contact;
