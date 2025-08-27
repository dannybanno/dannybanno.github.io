import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  
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
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Danny's Web Design</h3>
            <p className="text-gray-400 mb-6">
              Creating beautiful, functional websites for businesses in Barrow-in-Furness and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavClick('/#home')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/#about')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/#services')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/#portfolio')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/#contact')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">Subscribe to receive web design tips and special offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md text-gray-900 text-sm md:text-base"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md flex items-center justify-center transition-colors duration-200"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 md:pt-12 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; {year} Danny's Web Design. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <button onClick={() => handleNavClick('/privacy')} className="hover:text-white transition-colors duration-200">Privacy Policy</button>
            <button onClick={() => handleNavClick('/terms')} className="hover:text-white transition-colors duration-200">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;