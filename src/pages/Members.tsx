import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Member {
  id: string;
  name: string;
  position: string;
  image_url: string;
  linkedin_url?: string;
  github_url?: string;
  email?: string;
  website_url?: string;
}

const memberData: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'President',
    image_url: 'https://images.unsplash.com/photo-1570295999685-1e6b2bd0e27e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/johndoe',
    github_url: 'https://github.com/johndoe',
    email: 'john.doe@example.com',
    website_url: 'https://johndoe.com'
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Vice President',
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b82bb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/janesmith',
    github_url: 'https://github.com/janesmith',
    email: 'jane.smith@example.com',
    website_url: 'https://janesmith.com'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    position: 'Treasurer',
    image_url: 'https://images.unsplash.com/photo-1534528741702-a0cfae57f6ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/mikejohnson',
    github_url: 'https://github.com/mikejohnson',
    email: 'mike.johnson@example.com',
    website_url: 'https://mikejohnson.com'
  },
  {
    id: '4',
    name: 'Emily Brown',
    position: 'Secretary',
    image_url: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/emilybrown',
    github_url: 'https://github.com/emilybrown',
    email: 'emily.brown@example.com',
    website_url: 'https://emilybrown.com'
  },
  {
    id: '5',
    name: 'David Wilson',
    position: 'Webmaster',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/davidwilson',
    github_url: 'https://github.com/davidwilson',
    email: 'david.wilson@example.com',
    website_url: 'https://davidwilson.com'
  },
  {
    id: '6',
    name: 'Ashley Garcia',
    position: 'Social Media Manager',
    image_url: 'https://images.unsplash.com/photo-1544005313-9466f0e3d3cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    linkedin_url: 'https://www.linkedin.com/in/ashleygarcia',
    github_url: 'https://github.com/ashleygarcia',
    email: 'ashley.garcia@example.com',
    website_url: 'https://ashleygarcia.com'
  },
];

const Members = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [membersRef, membersVisible] = useScrollAnimation();

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
              <span className="text-cyber relative z-10">Our Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Meet the passionate minds behind WarP Computer Club
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={membersRef}
            initial={{ opacity: 0, y: 20 }}
            animate={membersVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
              Our Core Members
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberData.map((member) => (
              <motion.div
                key={member.id}
                className="member-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="member-image w-full h-64 object-cover rounded-t-md transition-all duration-300"
                  />
                  <div className="member-fade absolute inset-0"></div>
                </div>
                <CardContent className="relative p-6">
                  <CardTitle className="text-xl font-orbitron text-primary mb-2">
                    {member.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mb-3 w-fit">
                    {member.position}
                  </Badge>
                  <div className="flex space-x-4 mt-4">
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={20} className="text-foreground/80 hover:text-primary transition-colors" />
                      </a>
                    )}
                    {member.github_url && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer">
                        <Github size={20} className="text-foreground/80 hover:text-primary transition-colors" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`}>
                        <Mail size={20} className="text-foreground/80 hover:text-primary transition-colors" />
                      </a>
                    )}
                    {member.website_url && (
                      <a href={member.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} className="text-foreground/80 hover:text-primary transition-colors" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Members;
