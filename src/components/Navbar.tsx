
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Menu, X, Sun, Moon, User, LogOut, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Members', href: '/members' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Feedbacks', href: '/feedbacks' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

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
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors font-fira text-sm tracking-wider ${
                  isActiveLink(link.href)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2 bg-muted/50 rounded-full p-1 border border-border">
              <Sun size={16} className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
              />
              <Moon size={16} className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>

            {/* Auth Controls */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-fira text-sm">{profile?.email?.split('@')[0] || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="font-fira">
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="font-fira">
                        <Link to="/admin">
                          <Shield size={16} className="mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="font-fira text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm" className="font-fira">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme Toggle for smaller screens */}
            <div className="hidden sm:flex items-center space-x-1 bg-muted/50 rounded-full p-1 border border-border">
              <Sun size={14} className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted scale-75"
              />
              <Moon size={14} className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            {/* Hamburger Menu Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>

              {/* Mobile Navigation Menu - Top Right Dropdown */}
              {isOpen && (
                <div className="absolute right-0 top-12 w-64 bg-card/95 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    {/* Theme toggle for mobile (only visible on very small screens) */}
                    <div className="sm:hidden flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                      <span className="text-sm font-fira text-foreground/80">Theme</span>
                      <div className="flex items-center space-x-1 bg-muted/50 rounded-full p-1 border border-border">
                        <Sun size={14} className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <Switch
                          checked={theme === 'dark'}
                          onCheckedChange={toggleTheme}
                          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted scale-75"
                        />
                        <Moon size={14} className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2 mb-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className={`block transition-colors font-fira text-base tracking-wider py-2 px-2 rounded hover:bg-muted/50 ${
                            isActiveLink(link.href)
                              ? 'text-primary bg-primary/10 border-l-2 border-primary'
                              : 'text-foreground/80 hover:text-primary'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Auth Section */}
                    {user ? (
                      <div className="border-t border-border pt-4">
                        <p className="text-sm font-fira text-muted-foreground mb-3">
                          Signed in as: {profile?.email}
                        </p>
                        <div className="space-y-2">
                          <button className="block w-full text-left py-2 px-2 text-sm font-fira text-foreground/80 hover:text-primary transition-colors rounded hover:bg-muted/50">
                            <User size={16} className="inline mr-2" />
                            Profile
                          </button>
                          {isAdmin() && (
                            <Link
                              to="/admin"
                              className="block py-2 px-2 text-sm font-fira text-foreground/80 hover:text-primary transition-colors rounded hover:bg-muted/50"
                              onClick={() => setIsOpen(false)}
                            >
                              <Shield size={16} className="inline mr-2" />
                              Admin Panel
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              handleSignOut();
                              setIsOpen(false);
                            }}
                            className="block w-full text-left py-2 px-2 text-sm font-fira text-destructive hover:text-destructive/80 transition-colors rounded hover:bg-muted/50"
                          >
                            <LogOut size={16} className="inline mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t border-border pt-4">
                        <Link
                          to="/auth"
                          className="block text-center py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors font-fira text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
