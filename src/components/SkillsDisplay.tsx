
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface SkillsDisplayProps {
  skills: string[];
  maxVisible?: number;
  primaryColor?: string;
}

const SkillsDisplay = ({ skills, maxVisible = 2, primaryColor = "primary" }: SkillsDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const visibleSkills = isExpanded ? skills : skills.slice(0, maxVisible);
  const hiddenCount = skills.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-1">
      <div className={`flex flex-wrap gap-1 transition-all duration-300 ${isExpanded ? 'animate-slide-in-right' : ''}`}>
        {visibleSkills.map((skill, index) => (
          <Badge 
            key={skill} 
            variant="outline" 
            className={`text-xs border-${primaryColor}/30 text-${primaryColor} ${
              isExpanded && index >= maxVisible ? 'animate-fade-in' : ''
            }`}
            style={{ animationDelay: `${(index - maxVisible) * 0.1}s` }}
          >
            {skill}
          </Badge>
        ))}
      </div>
      
      {!isExpanded && hiddenCount > 0 && (
        <Badge 
          variant="outline" 
          className="text-xs border-muted text-muted-foreground cursor-pointer hover:border-primary/50 hover:text-primary transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          +{hiddenCount}
        </Badge>
      )}
      
      {isExpanded && skills.length > maxVisible && (
        <Badge 
          variant="outline" 
          className="text-xs border-muted text-muted-foreground cursor-pointer hover:border-primary/50 hover:text-primary transition-colors"
          onClick={() => setIsExpanded(false)}
        >
          Show less
        </Badge>
      )}
    </div>
  );
};

export default SkillsDisplay;
