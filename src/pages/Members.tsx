
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, ChevronDown, Users, User } from 'lucide-react';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

const Members = () => {
  // Hero title animation
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

  // Hero cards animation
  const heroCardsRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const cards = element.querySelectorAll('.hero-stat-card');
    
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

  // Members header animation
  const membersHeaderRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 80%" });

  // Members grid animation
  const membersRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const memberCards = element.querySelectorAll('.member-card');
    
    gsap.fromTo(memberCards,
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
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 70%" });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#members-grid');
    if (aboutSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: aboutSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  const members = [
    {
      id: 1,
      name: "Soustin Roy",
      role: "President",
      year: "12th Grade",
      skills: ["Full-Stack Development", "AI/ML", "Leadership"],
      image: "./SOUSTIN.jpg",
      github: "soustinroy",
      linkedin: "soustin-roy",
      email: "soustin@school.edu",
      bio: "Visionary leader spearheading technological innovation at WarP Computer Club"
    },
    {
      id: 2,
      name: "Deeptanshu Shekhar",
      role: "President",
      year: "12th Grade",
      skills: ["Backend Development", "System Architecture", "Leadership"],
      image: "./DEEPTANSHU.jpeg",
      github: "deeptanshushekhar",
      linkedin: "deeptanshu-shekhar",
      email: "deeptanshu@school.edu",
      bio: "Visionary leader spearheading technological innovation at WarP Computer Club"
    },
    {
      id: 3,
      name: "Girisha Mehra",
      role: "Vice President",
      year: "11th Grade",
      skills: ["Frontend Development", "UI/UX Design", "Project Management"],
      image: "./GIRISHA.jpeg",
      github: "girishamehra",
      linkedin: "girisha-mehra",
      email: "girisha@school.edu",
      bio: "Strategic director driving club initiatives and fostering tech excellence"
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
      bio: "Strategic director driving club initiatives and fostering tech excellence"
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
      bio: "Experienced leader managing key technical projects and club operations"
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
      bio: "Experienced leader managing key technical projects and club operations"
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
      bio: "Dedicated team lead implementing club initiatives and technical solutions"
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
      bio: "Dedicated team lead implementing club initiatives and technical solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative title-glow">
              <span className="text-cyber relative z-10">Our Members</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Meet the brilliant minds driving innovation at WarP Computer Club
            </p>
          </div>

          {/* Hero Cards Section */}
          <div ref={heroCardsRef} className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            <Card className="hero-stat-card bg-card/30 cyber-border hover:border-primary/60 transition-all duration-300">
              <CardHeader className="text-center pb-2 pt-4">
                <div className="flex items-center justify-center mb-2">
                  <User className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-orbitron font-bold text-primary">
                  8+
                </CardTitle>
                <p className="text-muted-foreground font-fira text-xs">Core Members</p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-center font-fira text-xs text-foreground/80">
                  Dedicated students leading the WarP Computer Club.
                </p>
              </CardContent>
            </Card>

            <Card className="hero-stat-card bg-card/30 cyber-border hover:border-secondary/60 transition-all duration-300">
              <CardHeader className="text-center pb-2 pt-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-xl font-orbitron font-bold text-secondary">
                  90+
                </CardTitle>
                <p className="text-muted-foreground font-fira text-xs">Total Members</p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-center font-fira text-xs text-foreground/80">
                  Growing community of passionate tech enthusiasts exploring and learning together.
                </p>
              </CardContent>
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

      {/* Members Grid */}
      <section id="members-grid" className="py-20">
        <div className="container mx-auto px-4">
          {/* Members Header */}
          <div 
            ref={membersHeaderRef}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Meet the Core Members</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </div>

          {/* Members Grid */}
          <div className="flex justify-center">
            <div 
              ref={membersRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full justify-items-center"
            >
              {members.map((member, index) => (
                <Card 
                  key={member.id} 
                  className="member-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden transform hover:scale-105 w-full max-w-sm h-[500px] flex flex-col"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-full h-40 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 member-fade"></div>
                  </div>
                  
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-orbitron font-semibold text-primary mb-1 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-fira text-sm mb-1">{member.role}</p>
                      <p className="text-muted-foreground font-fira text-xs mb-3">{member.year}</p>
                      
                      <p className="text-foreground/80 font-fira text-sm mb-3 line-clamp-3 overflow-hidden">
                        {member.bio}
                      </p>
                      
                      <div className="mb-3">
                        <SkillsDisplay skills={member.skills} maxVisible={2} />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 flex-shrink-0 pt-2">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Members;
