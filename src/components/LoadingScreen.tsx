import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';  // Adjust this path based on your file structure

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  const commonContent = (
    <div className="text-center">
      <img 
        src="./WarP Icon.png"  // Use consistent path with leading slash
        alt="WarP Computer Club" 
        className={`h-24 md:h-32 mx-auto mb-8 animate-pulse ${
          theme === 'light' ? 'logo-glow-light' : ''
        }`}
      />
      <div className="flex space-x-2 justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-fira text-sm mt-4">Loading...</p>
    </div>
  );

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none">
        {commonContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      {commonContent}
    </div>
  );
};

export default LoadingScreen;