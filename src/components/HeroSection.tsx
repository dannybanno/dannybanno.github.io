import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Programming & Stuff';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-primary">
            dannybanno
          </h1>
          
          <div className="text-xl md:text-2xl font-mono mb-8 text-muted-foreground">
            {displayText}
          </div>
          
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto leading-relaxed opacity-80">
            Exploring gamehacking, reverse engineering, and system internals through detailed technical writeups and research.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a href="#blog">
              <Button variant="default" size="lg" className="font-mono">
                Read Posts
              </Button>
            </a>
            <Button variant="outline" size="lg" className="font-mono">
              View Projects
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center bounce-subtle">
            <span className="text-base font-mono text-foreground/80 mb-2 tracking-wider">read</span>
            <ChevronDown className="w-6 h-6 text-foreground/60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;