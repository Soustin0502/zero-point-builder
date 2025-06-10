
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Members', href: '/members' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="./WarP Computer Club Logo.png" 
              alt="The Computer Club" 
              className={`h-8 md:h-10 transition-all duration-300 ${
                theme === 'light' ? 'logo-glow-light' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-fira text-sm tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle - Pill Shape */}
            <div className="flex items-center space-x-2 bg-muted/50 rounded-full p-1 border border-border">
              <Sun size={16} className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
              />
              <Moon size={16} className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted/50 rounded-full p-1 border border-border">
              <Sun size={14} className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted scale-75"
              />
              <Moon size={14} className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border border-primary/20 rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-fira text-sm tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
