import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TracingBeam = ({ children }: { children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && glowRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            ref={glowRef}
            className="absolute pointer-events-none z-50 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = href.substring(2);
          const element = document.getElementById(section);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - navbarHeight,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        const section = href.substring(2);
        const element = document.getElementById(section);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth'
          });
        }
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <TracingBeam>
            <motion.button
              onClick={() => handleNavClick('/#home')}
              className={`text-2xl font-primary font-bold ${
                isScrolled ? 'gradient-text' : 'text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Web3Dev
            </motion.button>
          </TracingBeam>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <TracingBeam key={link.href}>
                <motion.button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              </TracingBeam>
            ))}
            <TracingBeam>
              <motion.button
                onClick={() => handleNavClick('/#contact')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 hover:bg-white/90'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </TracingBeam>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-700 hover:text-blue-600 transition-colors text-left py-2"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNavClick('/#contact')}
                  className="bg-blue-600 text-white rounded-full py-2.5 font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;