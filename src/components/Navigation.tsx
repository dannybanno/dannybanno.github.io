import { Button } from '@/components/ui/button';
import { Link, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: 'Blog', path: '#blog' },
    { label: 'Projects', path: '#projects' },
    { label: 'About', path: '#about' },
    { label: 'Contact', path: '#contact' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-card border border-border rounded-lg px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item.label} href={item.path}>
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    className="font-mono text-sm relative group px-3 py-2 transition-colors hover:bg-transparent hover:text-primary"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card border-border backdrop-blur-sm"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </Button>
        
        {isOpen && (
          <div className="absolute top-12 right-0 bg-card border border-border rounded-lg backdrop-blur-sm min-w-[160px]">
            <div className="p-2">
              <div className="text-primary font-mono text-sm font-medium px-3 py-2 mb-2">
                devlog
              </div>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-mono text-sm relative group transition-colors hover:bg-transparent hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;