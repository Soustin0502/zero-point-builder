
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Upload } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base about WarP Computer Club
  const clubKnowledge = {
    about: "WarP Computer Club is a premier technology club at Delhi Public School Mathura Road, founded to cultivate digital innovators and push the boundaries of technology.",
    members: [
      "Soustin Roy - President (12th Grade)",
      "Deeptanshu Shekhar - President (12th Grade)", 
      "Girisha Mehra - Vice President (11th Grade)",
      "Aaayan Ahmed War - Vice President (11th Grade)",
      "Ayaan Ali - Senior Executive (12th Grade)",
      "Rishit Uppal - Senior Executive (12th Grade)",
      "Ansh Mittal - Executive (11th Grade)",
      "Kunal Kachhawa - Executive (11th Grade)"
    ],
    events: {
      upcoming: ["WarP Intra '25 (August 2, 2025)", "WarP Inter '25 (TBD)"],
      past: ["WarP Intra '24", "WarP Intra '23", "WarP Inter '23", "WarP Intra '22", "WarP Inter '22"]
    },
    contact: {
      email: "warp.dpsmr@gmail.com",
      meeting: "Mon to Fri, 08:00 AM to 01:00 PM",
      location: "Computer Lab 1/2/3, Senior School Building, Ground Floor"
    },
    activities: ["Competitive Programming", "Web Development", "AI/ML Workshops", "Cybersecurity CTF", "Hackathons", "Tech Expo"]
  };

  const generateIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Welcome to WarP Computer Club! I'm here to help you learn about our club, events, members, and activities. What would you like to know?";
    }
    
    // About the club
    if (input.includes('about') || input.includes('what is warp') || input.includes('club')) {
      return `${clubKnowledge.about} We have ${clubKnowledge.members.length} active members working on cutting-edge projects in programming, AI/ML, cybersecurity, and more. Our mission is to architect the digital future through innovation and technology.`;
    }
    
    // Members
    if (input.includes('member') || input.includes('team') || input.includes('who') || input.includes('president')) {
      if (input.includes('president')) {
        return "Our club has two Presidents: Soustin Roy and Deeptanshu Shekhar, both in 12th Grade. They lead our club with expertise in full-stack development, AI/ML, and system architecture.";
      }
      return `We have ${clubKnowledge.members.length} dedicated members:\n\n${clubKnowledge.members.join('\n')}\n\nEach member brings unique skills in areas like programming, AI/ML, cybersecurity, web development, and more!`;
    }
    
    // Events
    if (input.includes('event') || input.includes('competition') || input.includes('intra') || input.includes('inter')) {
      if (input.includes('upcoming') || input.includes('future') || input.includes('2025')) {
        return `Our upcoming events include:\n• ${clubKnowledge.events.upcoming.join('\n• ')}\n\nWarP Intra '25 will be held on August 2, 2025, featuring competitive programming, hackathons, cybersecurity CTF challenges and much more!`;
      }
      return `We organize amazing events! Our upcoming events: ${clubKnowledge.events.upcoming.join(', ')}. We've also successfully conducted: ${clubKnowledge.events.past.join(', ')}. These events feature competitive programming, hackathons, workshops, and much more.`;
    }
    
    // Contact information
    if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('meeting')) {
      return `You can reach us at:\n📧 Email: ${clubKnowledge.contact.email}\n🕐 Meeting Times: ${clubKnowledge.contact.meeting}\n📍 Location: ${clubKnowledge.contact.location}\n\nFeel free to visit us during our meeting hours!`;
    }
    
    // Activities and skills
    if (input.includes('activity') || input.includes('skill') || input.includes('learn') || input.includes('programming') || input.includes('coding')) {
      return `We focus on various exciting activities:\n• ${clubKnowledge.activities.join('\n• ')}\n\nWhether you're interested in competitive programming, web development, AI/ML, or cybersecurity, we have something for everyone!`;
    }
    
    // Join the club
    if (input.includes('join') || input.includes('how to') || input.includes('participate')) {
      return `Great to hear you're interested in joining WarP! You can:\n1. Visit us during our meeting times (Mon-Fri, 8 AM - 1 PM)\n2. Email us at ${clubKnowledge.contact.email}\n3. Participate in our upcoming events\n4. Follow our activities and workshops\n\nWe welcome all students passionate about technology!(Only applicable for DPS Mathura Road Students)`;
    }

    // Focus Area
    if (input.includes('focus areas') || input.includes('key focus areas') || input.includes('focus points')) {
      return "Our key focus areas span a wide range of technical and creative disciplines. From programming in languages like Python, JavaScript, Java, and C++, to diving into AI/ML through workshops on machine learning, data science, and neural networks, our members are always exploring new frontiers. Cybersecurity is another core pillar, with activities like CTF competitions, ethical hacking, and network security sessions. We also nurture creative talents through photography, videography, graphic design, and content creation—encouraging members to tell powerful visual stories alongside their technical pursuits.";
    }
    
    // Programming languages
    if (input.includes('language') || input.includes('python') || input.includes('javascript') || input.includes('java') || input.includes('c++')) {
      return "Our members work with various programming languages including Python, JavaScript, Java, C++, and more! Beyond coding, they actively develop skills in photography, videography, designing, and much more. We regularly organize workshops and coding sessions to help everyone grow—whether you're just starting out or looking to sharpen your expertise across tech and creative fields.";
    }
    
    // AI/ML
    if (input.includes('ai') || input.includes('machine learning') || input.includes('artificial intelligence') || input.includes('ml')) {
      return "AI/ML is one of our key focus areas! We conduct workshops on machine learning, data science, and AI applications. Our members work on exciting projects involving neural networks, data analysis, and intelligent systems.";
    }
    
    // Cybersecurity
    if (input.includes('security') || input.includes('cyber') || input.includes('hacking') || input.includes('ctf')) {
      return "Cybersecurity is a major part of our activities! We organize CTF (Capture The Flag) competitions, ethical hacking workshops, and network security sessions. Our members learn about protecting digital infrastructure and ethical security research.";
    }
    
    // Skills
    if (input.includes('skills') || input.includes('skill') || input.includes('photo') || input.includes('video') || input.includes('3d') || input.includes('model') || input.includes('design')) {
      return "Creative and visual skills are an essential part of what we do! Our members explore photography, videography, graphic design, and content creation through hands-on projects and collaborative sessions. From capturing events to designing posters, videos, and digital content, we encourage everyone to express their creativity and refine their storytelling abilities using the latest tools and techniques.";
    }

    // School information
    if (input.includes('school') || input.includes('dps') || input.includes('delhi public school')) {
      return "We're based at Delhi Public School Mathura Road, a prestigious institution known for excellence in education and innovation. Our school provides state-of-the-art facilities and supports our technological endeavors.";
    }
    
    // Thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! I'm always here to help you learn more about WarP Computer Club. Feel free to ask anything else about our members, events, activities, or how to get involved!";
    }
    
    // Default response for unrecognized queries
    return `I'd be happy to help you learn about WarP Computer Club! You can ask me about:
    
• Our members and leadership team
• Upcoming and past events
• Club activities and focus areas
• How to join or participate
• Contact information and meeting times
• Programming languages and technologies we work with

What would you like to know more about?`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Generate intelligent response based on user input
      const responseContent = generateIntelligentResponse(input);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending message:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try asking about our club members, events, activities, or contact information!",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      // For now, just acknowledge the file upload
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `I see you've uploaded "${file.name}". While I can't process files yet, feel free to ask me any questions about WarP Computer Club!`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg glow-pink ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[calc(100vh-6rem)] sm:h-[500px] bg-card/95 backdrop-blur-sm cyber-border">
          <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4 border-b border-primary/20">
            <CardTitle className="text-base sm:text-lg font-orbitron text-primary">WarP AI Assistant</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary hover:bg-primary/10 p-1 sm:p-2"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)] sm:h-[420px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground font-fira text-xs sm:text-sm">
                  Hello! I'm your WarP Computer Club assistant. Ask me about our members, events, activities, or how to join!
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="font-fira text-xs sm:text-sm whitespace-pre-line break-words">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-2 sm:p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-primary/20">
              <div className="flex space-x-1 sm:space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-secondary text-secondary hover:bg-secondary/10 p-1.5 sm:p-2 min-w-0"
                >
                  <Upload size={14} className="sm:w-4 sm:h-4" />
                </Button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about WarP Computer Club..."
                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-primary/30 rounded-md text-foreground font-fira text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/80 text-primary-foreground p-1.5 sm:p-2 min-w-0"
                  size="sm"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
