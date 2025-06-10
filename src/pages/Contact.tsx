import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Success!",
      description: "Your message has been sent successfully.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
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
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Get in touch with WarP Computer Club
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={contactRef}
            initial={{ opacity: 0, y: 20 }}
            animate={contactVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
              Reach Out to Us
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={contactVisible ? "visible" : "hidden"}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-primary">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        className="bg-background/50 border-primary/50 text-foreground"
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="bg-background/50 border-primary/50 text-foreground"
                      />
                    </div>
                    <div>
                      <Input 
                        type="text" 
                        name="subject" 
                        placeholder="Subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required 
                        className="bg-background/50 border-primary/50 text-foreground"
                      />
                    </div>
                    <div>
                      <Textarea 
                        name="message" 
                        placeholder="Your Message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        className="bg-background/50 border-primary/50 text-foreground resize-none"
                      />
                    </div>
                    <Button disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-fira">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2" size={16} />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={contactVisible ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-primary">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 text-foreground/80 font-fira">
                    <Mail className="text-primary" size={20} />
                    <span>warp.dpsmr@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-foreground/80 font-fira">
                    <Phone className="text-primary" size={20} />
                    <span>+91 9999 8888 77</span>
                  </div>
                  <div className="flex items-center space-x-3 text-foreground/80 font-fira">
                    <MapPin className="text-primary" size={20} />
                    <span>
                      Computer Lab 1/2/3, Senior School Building, Ground Floor
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-foreground/80 font-fira">
                    <Clock className="text-primary" size={20} />
                    <span>Mon to Fri, 08:00 AM to 01:00 PM</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
