
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-card/30 border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link to="">
                <img 
                  src="./WarP Computer Club Logo.png" 
                  alt="The Computer Club" 
                  className={`h-8 transition-all duration-300 ${
                    theme === 'light' ? 'logo-glow-light' : ''
                  }`}
                />
              </Link>
            </div>
            <p className="font-fira text-muted-foreground text-sm leading-relaxed">
              WarP Computer Club - Empowering the next generation of digital innovators at Delhi Public School Mathura Road.
            </p>
          </div>
          
          <div>
            <h3 className="font-orbitron font-semibold text-primary mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/members" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Members
              </Link>
              <Link to="/events" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/blog" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/feedbacks" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Feedbacks
              </Link>
              <Link to="/contact" className="block font-fira text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-orbitron font-semibold text-primary mb-4">Contact Us</h3>
            <div className="space-y-2 font-fira text-sm text-muted-foreground">
              <div>Email: warp.dpsmr@gmail.com</div>
              <div>Meeting: Mon to Fri, 08:00 AM to 01:00 PM</div>
              <div>Location: Computer Lab 1/2/3, Senior School Building, Ground Floor</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="font-fira text-sm text-muted-foreground">
            © 2025 WarP Computer Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
