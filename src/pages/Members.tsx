
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ChevronDown, Users, Calendar, Trophy } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import Footer from '@/components/Footer';

const Members = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [membersHeaderRef, membersHeaderVisible] = useScrollAnimation();
  const [membersRef, membersVisible] = useScrollAnimation();
  const [heroStatsRef, heroStatsVisible] = useScrollAnimation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#members-stats');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const members = [
    {
      id: 1,
      name: "Soustin Roy",
      role: "President",
      year: "12th Grade",
      skills: ["Full-Stack Development", "AI/ML", "Leadership"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      github: "soustinroy",
      linkedin: "soustin-roy",
      email: "soustin@school.edu",
      bio: "Leading the club with a vision to bridge technology and innovation, passionate about creating impactful digital solutions."
    },
    {
      id: 2,
      name: "Deeptanshu Shekhar",
      role: "President",
      year: "12th Grade",
      skills: ["Backend Development", "System Architecture", "Leadership"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      github: "deeptanshushekhar",
      linkedin: "deeptanshu-shekhar",
      email: "deeptanshu@school.edu",
      bio: "Co-leading the club with expertise in building robust systems and fostering collaborative learning environments."
    },
    {
      id: 3,
      name: "Girisha Mehra",
      role: "Vice President",
      year: "11th Grade",
      skills: ["Frontend Development", "UI/UX Design", "Project Management"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      github: "girishamehra",
      linkedin: "girisha-mehra",
      email: "girisha@school.edu",
      bio: "Focused on creating beautiful user experiences and managing innovative projects that inspire the next generation."
    },
    {
      id: 4,
      name: "Aaayan Ahmed War",
      role: "Vice President",
      year: "11th Grade",
      skills: ["Machine Learning", "Data Science", "Research"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      github: "aaayanawar",
      linkedin: "aaayan-ahmed-war",
      email: "aaayan@school.edu",
      bio: "Exploring the frontiers of artificial intelligence and leading research initiatives in machine learning applications."
    },
    {
      id: 5,
      name: "Ayaan Ali",
      role: "Senior Executive",
      year: "12th Grade",
      skills: ["Cybersecurity", "Ethical Hacking", "Network Security"],
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
      github: "ayaanali",
      linkedin: "ayaan-ali-security",
      email: "ayaan@school.edu",
      bio: "Dedicated to understanding and protecting digital infrastructure through ethical security research and education."
    },
    {
      id: 6,
      name: "Rishit Uppal",
      role: "Senior Executive",
      year: "12th Grade",
      skills: ["DevOps", "Cloud Computing", "Automation"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      github: "rishituppal",
      linkedin: "rishit-uppal",
      email: "rishit@school.edu",
      bio: "Passionate about streamlining development processes and building scalable cloud infrastructure solutions."
    },
    {
      id: 7,
      name: "Ansh Mittal",
      role: "Executive",
      year: "11th Grade",
      skills: ["Web Development", "Mobile Apps", "Game Development"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      github: "anshmittal",
      linkedin: "ansh-mittal",
      email: "ansh@school.edu",
      bio: "Creating engaging digital experiences across web and mobile platforms with a focus on interactive applications."
    },
    {
      id: 8,
      name: "Kunal Kachhawa",
      role: "Executive",
      year: "11th Grade",
      skills: ["Data Analytics", "Python", "Database Management"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c77?w=400&h=400&fit=crop&crop=face",
      github: "kunalkachhawa",
      linkedin: "kunal-kachhawa",
      email: "kunal@school.edu",
      bio: "Transforming raw data into meaningful insights and building efficient database solutions for complex problems."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''} mb-8`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Our Members</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Meet the brilliant minds driving innovation at WarP Computer Club
            </p>
          </div>

          {/* Hero Stats Cards */}
          <div 
            ref={heroStatsRef}
            className={`grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 stagger-children ${heroStatsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/30 cyber-border hover:border-primary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <Users className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                  {members.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">Active Members</p>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 cyber-border hover:border-secondary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="text-secondary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-secondary">
                  5+
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">Years Legacy</p>
              </CardHeader>
            </Card>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to members"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Stats Section */}
      <section id="members-stats" className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={statsRef}
            className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20 stagger-children ${statsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="text-primary" size={48} />
                </div>
                <CardTitle className="text-3xl font-orbitron font-bold text-primary">
                  {members.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira">Core Members</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Dedicated individuals working together to push the boundaries of technology and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:glow-blue transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="text-secondary" size={48} />
                </div>
                <CardTitle className="text-3xl font-orbitron font-bold text-secondary">
                  5+
                </CardTitle>
                <p className="text-muted-foreground font-fira">Years of Legacy</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Building a strong foundation of technological excellence and community engagement since our inception.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Members Header */}
          <div 
            ref={membersHeaderRef}
            className={`text-center mb-16 scroll-fade-in ${membersHeaderVisible ? 'animate' : ''}`}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Meet the Core Members</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </div>

          {/* Members Grid */}
          <div 
            ref={membersRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-children ${membersVisible ? 'animate' : ''}`}
          >
            {members.map((member, index) => (
              <Card 
                key={member.id} 
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden transform hover:scale-105 member-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative">
                  <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                      <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 member-fade"></div>
                </div>
                
                <CardContent className="p-6 relative">
                  <h3 className="text-xl font-orbitron font-semibold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-fira text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground font-fira text-xs mb-4">{member.year}</p>
                  
                  <p className="text-foreground/80 font-fira text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  <div className="mb-4">
                    <SkillsDisplay skills={member.skills} maxVisible={2} />
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={`https://github.com/${member.github}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                    <a 
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      className="text-muted-foreground hover:text-secondary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/*       <Footer /> */}
    </div>
  );
};

export default Members;
