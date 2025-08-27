import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Repeat, 
  MapPin, 
  Search, 
  Server, 
  WrenchIcon,
  Code,
  Smartphone,
  Zap,
  Shield,
  Users
} from 'lucide-react';
import { cn } from "../lib/utils";
import ErrorBoundary from "./ErrorBoundary";
import SEO from '../components/SEO';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: 'Responsive Website Design',
    description: 'Custom websites that look great on any device',
    icon: Monitor
  },
  {
    title: 'Website Redesign',
    description: 'Transform your outdated website into a modern, effective online presence',
    icon: Repeat
  },
  {
    title: 'Google Maps & Contact Integration',
    description: 'Help customers find and contact your business',
    icon: MapPin
  },
  {
    title: 'SEO-Ready Code',
    description: 'Websites built with search engines in mind',
    icon: Search
  },
  {
    title: 'Hosting & Domain Setup',
    description: 'Complete setup of your website hosting and domain',
    icon: Server
  },
  {
    title: 'Ongoing Maintenance',
    description: 'Regular updates and maintenance to keep your website secure',
    icon: WrenchIcon
  },
  {
    title: 'Custom Web Development',
    description: 'Tailored websites built with modern technologies to meet your specific business needs.',
    icon: Code
  },
  {
    title: 'Responsive Design',
    description: 'Websites that look and work perfectly on all devices, from desktop to mobile.',
    icon: Smartphone
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and attract more organic traffic.',
    icon: Search
  },
  {
    title: 'Performance Optimization',
    description: 'Lightning-fast loading times and smooth user experiences.',
    icon: Zap
  },
  {
    title: 'Security Implementation',
    description: 'Protect your website and user data with industry-standard security measures.',
    icon: Shield
  },
  {
    title: 'User Experience Design',
    description: 'Intuitive interfaces that engage visitors and drive conversions.',
    icon: Users
  }
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        (index % 4 === 0) && "lg:border-l",
        index < 8 && "lg:border-b",
        "bg-gray-50/80 shadow-md hover:shadow-lg transition-shadow duration-200"
      )}
    >
      {/* Background Gradient Effect on Hover - Keep these as they are part of the Feature component design */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && index < 8 && (
         <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-100 to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-6 md:px-10 text-gray-600">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-6 md:px-10">
        {/* Left Border Animation */}
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-6 md:px-10">
        {description}
      </p>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const servicesToShow = services.slice(0, 8);

  const handleClose = () => {
    // Implementation of handleClose
  };

  const handleSubmit = () => {
    // Implementation of handleSubmit
  };

  useKeyboardNavigation({
    'Escape': () => handleClose(),
    'Enter': () => handleSubmit(),
  });

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background Layer with Grid and Fade - Keep this as it's the section background */}
      <div 
        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:60px_60px] z-0"
        style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
      ></div>

      {/* Content Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">My Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of the key services we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 gap-8 md:gap-10">
          {servicesToShow.map((service, index) => (
             <Feature 
               key={service.title} 
               title={service.title}
               description={service.description}
               icon={<service.icon size={24} />} 
               index={index}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

export default () => (
  <ErrorBoundary>
    <Services />
  </ErrorBoundary>
);