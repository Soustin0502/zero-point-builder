
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme as Theme) || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const root = document.documentElement;
      
      // Remove both classes first
      root.classList.remove('dark', 'light');
      
      // Add the current theme class
      root.classList.add(theme);
      
      // Update CSS custom properties for the theme
      if (theme === 'light') {
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '222.2 84% 4.9%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--popover', '0 0% 100%');
        root.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--primary', '315 100% 60%');
        root.style.setProperty('--primary-foreground', '210 40% 98%');
        root.style.setProperty('--secondary', '195 100% 40%');
        root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--muted', '210 40% 96%');
        root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
        root.style.setProperty('--accent', '285 100% 70%');
        root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--destructive', '0 84% 60%');
        root.style.setProperty('--destructive-foreground', '210 40% 98%');
        root.style.setProperty('--border', '214.3 31.8% 91.4%');
        root.style.setProperty('--input', '214.3 31.8% 91.4%');
        root.style.setProperty('--ring', '315 100% 60%');
      } else {
        root.style.setProperty('--background', '8 15% 5%');
        root.style.setProperty('--foreground', '300 100% 85%');
        root.style.setProperty('--card', '8 20% 8%');
        root.style.setProperty('--card-foreground', '300 100% 85%');
        root.style.setProperty('--popover', '8 20% 8%');
        root.style.setProperty('--popover-foreground', '300 100% 85%');
        root.style.setProperty('--primary', '315 100% 60%');
        root.style.setProperty('--primary-foreground', '8 15% 5%');
        root.style.setProperty('--secondary', '195 100% 60%');
        root.style.setProperty('--secondary-foreground', '8 15% 5%');
        root.style.setProperty('--muted', '8 20% 15%');
        root.style.setProperty('--muted-foreground', '300 50% 60%');
        root.style.setProperty('--accent', '285 100% 70%');
        root.style.setProperty('--accent-foreground', '8 15% 5%');
        root.style.setProperty('--destructive', '0 84% 50%');
        root.style.setProperty('--destructive-foreground', '8 15% 5%');
        root.style.setProperty('--border', '315 30% 20%');
        root.style.setProperty('--input', '315 30% 20%');
        root.style.setProperty('--ring', '315 100% 60%');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
