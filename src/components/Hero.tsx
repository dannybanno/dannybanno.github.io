import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
import { Button as MovingBorderButton } from './ui/moving-border';
import { Meteors } from "./ui/meteors";
import { Sparkles } from "./ui/sparkles";
import { cn } from "../lib/utils";

const Hero = () => {
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
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay z-0" />
        <Meteors number={20} className="!absolute" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <Sparkles className="w-full inline-block">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Transform Your Business with
                <motion.span 
                  className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{ backgroundPosition: ['0% center', '100% center'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Professional Web Design
                </motion.span>
              </h1>
            </Sparkles>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto md:mx-0">
              Custom websites that help local businesses stand out and succeed in the digital world.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="flex items-center space-x-3 text-white/90"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircle className="text-blue-400" size={20} />
                <span>Responsive Design</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-white/90"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircle className="text-blue-400" size={20} />
                <span>SEO Optimized</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-white/90"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircle className="text-blue-400" size={20} />
                <span>Fast Loading</span>
              </motion.div>
            </div>

            {/* Adjusted button container for mobile alignment and flexible sizing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
              {/* Using the imported MovingBorderButton with adjusted sizing classes */}
              <MovingBorderButton
                borderRadius="9999px"
                onClick={() => handleNavClick('/#contact')}
                className="px-10 py-5 bg-blue-600 text-white font-medium text-xl hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
                containerClassName="p-[1px]"
                borderClassName="bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-100"
              >
                <span>Get Your Free Quote</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </MovingBorderButton>
              <motion.button
                onClick={() => navigate('/portfolio')}
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium text-xl hover:bg-white/20 transition-colors relative overflow-hidden group w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 mb-16 grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-8 items-stretch justify-items-stretch"
          >
            {[
              { value: 5, suffix: '+', label: 'Years Experience' },
              { value: 50, suffix: '+', label: 'Projects Completed' },
              { value: 100, suffix: '%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center relative overflow-hidden group h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white mb-2">
                    {typeof stat.value === 'number' ? (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

/* Add this to your main CSS file or a global style block */
/* @media (pointer: coarse) {
  body {
    cursor: auto !important;
  }
} */