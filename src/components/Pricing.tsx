import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import PlaceholderImage from './PlaceholderImage';
import { GlowingEffect } from "../components/ui/glowing-effect";
import { cn } from '../lib/utils';
import { Button as MovingBorderButton } from "./ui/moving-border";
import { Sparkles } from "./ui/sparkles";
import { ArrowRight } from 'lucide-react';
import { Meteors } from "./ui/meteors";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface PricingProps {
  productName: string;
  price: number;
  features: Feature[];
  imageUrls: {
    preview: string;
    features?: string[];
  };
  links: {
    product: string;
    details: string;
  };
  isPopular?: boolean;
}

const Pricing: React.FC<PricingProps> = ({
  productName,
  price,
  features,
  imageUrls,
  links,
  isPopular = false,
}) => {
    // State for image error handling
  const [previewImageError, setPreviewImageError] = useState(false);
  const [featureIconErrors, setFeatureIconErrors] = useState<Record<string, boolean>>({});

   const handlePreviewImageError = () => {
     setPreviewImageError(true);
   };

   // Placeholder function for feature icon error handling if using <img> tags
   const handleFeatureIconError = (featureTitle: string) => {
       setFeatureIconErrors(prev => ({ ...prev, [featureTitle]: true }));
   };


  return (
    <ErrorBoundary>
      <motion.section
        className="relative py-20 font-sans overflow-hidden"
        aria-labelledby="pricing-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Gradient divider at the top */}
        <div className="absolute top-0 left-0 w-full h-2 z-30" style={{background: 'linear-gradient(90deg, #0ea5e9 0%, #a78bfa 100%)'}} />
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100" />
        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-md" style={{borderRadius: '2rem', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'}} />
        {/* Meteors and sparkles */}
        <Meteors number={18} className="z-0" />
        <Sparkles className="absolute inset-0 z-0 pointer-events-none">{null}</Sparkles>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              id="pricing-heading"
              className="text-5xl md:text-6xl font-primary font-bold text-gray-900"
            >
              {productName}
            </h2>
            <p
              className="mt-4 text-xl md:text-2xl text-gray-600 font-primary"
            >
              Professional Website Solutions Made Simple
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pricing Card */}
            <GlowingEffect disabled={false} className="rounded-2xl">
              <motion.div
                className="relative bg-white/70 rounded-2xl shadow-xl border border-white/30 p-10 h-full backdrop-blur-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isPopular && (
                  <motion.span
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase shadow-lg animate-pulse"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 2px 8px #a78bfa)' }}
                  >
                    Most Popular
                  </motion.span>
                )}

                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl md:text-4xl font-primary font-bold text-gray-900">{productName}</h3>
                  <motion.div
                    className="text-5xl md:text-6xl font-extrabold text-gray-900"
                    whileHover={{ scale: 1.08, color: '#6366f1' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    ${price}
                  </motion.div>
                </div>

                <ul className="mt-8 space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <motion.li
                      key={feature.title}
                      className="flex items-center group"
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.span whileHover={{ scale: 1.3, rotate: 20 }} className="inline-block">
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2 transition-transform duration-200" />
                      </motion.span>
                      <span className="text-gray-700 text-lg font-primary">{feature.description}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 space-y-4">
                  <GlowingEffect glow={true} disabled={false}>
                    <Link
                      to={links.product}
                      className="w-full px-10 py-5 bg-blue-600 text-white font-primary font-medium text-xl hover:bg-blue-700 flex items-center justify-center rounded-full shadow-lg transition duration-300 group"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                    </Link>
                  </GlowingEffect>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to={links.details}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-primary font-medium rounded-full text-blue-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition duration-300"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </GlowingEffect>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <GlowingEffect key={feature.title} disabled={false} className="rounded-2xl">
                  <motion.div
                    className="bg-white/70 rounded-2xl shadow-xl border border-white/30 p-10 flex flex-col items-start h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 float-animation backdrop-blur-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-full">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="mb-4"
                      >
                        {featureIconErrors[feature.title] ? (
                          <PlaceholderImage className="h-8 w-8 text-gray-400" alt={feature.title} />
                        ) : (
                          <img src={feature.icon} alt={`${feature.title} icon`} className="h-8 w-8 text-blue-500" onError={() => handleFeatureIconError(feature.title)} />
                        )}
                      </motion.div>
                    </Sparkles>
                    <h4 className="text-lg md:text-xl font-primary font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-base font-primary">{feature.description}</p>
                  </motion.div>
                </GlowingEffect>
              ))}
            </div>
          </div>

          {/* Preview Image */}
          <motion.div className="mt-16" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {previewImageError ? (
              <PlaceholderImage
                className="w-full h-64 rounded-2xl shadow-xl object-cover border border-white/30 backdrop-blur-md"
                alt={`${productName} preview`}
              />
            ) : (
              <motion.img
                src={imageUrls.preview}
                alt={`${productName} preview`}
                className="w-full h-64 rounded-2xl shadow-xl object-cover border border-white/30 backdrop-blur-md"
                onError={handlePreviewImageError}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            )}
          </motion.div>

        </div>
        {/* Top shadow */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-12 z-40" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.10), transparent)'}} />
        {/* Bottom shadow */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 z-40" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.10), transparent)'}} />
      </motion.section>
    </ErrorBoundary>
  );
};

export default Pricing; 