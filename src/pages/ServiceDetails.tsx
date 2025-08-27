import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Users, Zap, Shield, Cloud, Palette, Layout, Code, Smartphone } from 'lucide-react';

interface LocationState {
  title: string;
  description: string;
}

interface ServiceDetails {
  description: string;
  features: string[];
  process: string[];
  benefits: string[];
  timeline: string;
  pricing: {
    basic: string;
    standard: string;
    premium: string;
  };
}

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, description } = (location.state as LocationState) || {};

  const serviceDetails: Record<string, ServiceDetails> = {
    'Responsive Website Design': {
      description: 'Custom-designed websites that look great on any device - desktop, tablet, or mobile.',
      features: [
        'Mobile-first design approach',
        'Cross-browser compatibility',
        'Optimized for all screen sizes',
        'Touch-friendly interfaces',
        'Fast loading times',
        'Accessibility compliance',
        'Cloudflare Enterprise Protection',
        'DDoS Attack Prevention',
        'Global CDN Network'
      ],
      process: [
        'Initial consultation and requirements gathering',
        'Wireframing and design concepts',
        'Responsive design implementation',
        'Testing across devices',
        'Launch and optimization',
        'Cloudflare Security Setup'
      ],
      benefits: [
        'Improved user experience across all devices',
        'Higher conversion rates',
        'Better search engine rankings',
        'Reduced bounce rates',
        'Increased customer satisfaction',
        'Future-proof design',
        'Enterprise-grade security',
        'Global performance optimization',
        'Automatic threat protection'
      ],
      timeline: '2-4 weeks',
      pricing: {
        basic: 'Starting at $1,500',
        standard: 'Starting at $2,500',
        premium: 'Starting at $3,500'
      }
    },
    'Website Redesign': {
      description: 'Transform your outdated website into a modern, effective online presence.',
      features: [
        'Modern design implementation',
        'Improved user experience',
        'Enhanced functionality',
        'Better conversion rates',
        'Updated content structure',
        'SEO optimization'
      ],
      process: [
        'Current website audit',
        'Competitor analysis',
        'New design concepts',
        'Content restructuring',
        'Implementation and testing',
        'Launch and monitoring'
      ],
      benefits: [],
      timeline: '',
      pricing: {
        basic: '',
        standard: '',
        premium: ''
      }
    },
    'Google Maps & Contact Integration': {
      description: 'Help customers find and contact your business with integrated maps and contact forms.',
      features: [
        'Interactive Google Maps integration',
        'Custom contact forms',
        'Location-based services',
        'Business hours display',
        'Contact information management',
        'Form submission handling'
      ],
      process: [
        'Map integration setup',
        'Contact form design',
        'Form validation implementation',
        'Email notification setup',
        'Testing and optimization'
      ],
      benefits: [],
      timeline: '',
      pricing: {
        basic: '',
        standard: '',
        premium: ''
      }
    },
    'SEO-Ready Code': {
      description: 'Websites built with search engines in mind to help improve your visibility online.',
      features: [
        'Semantic HTML structure',
        'Meta tag optimization',
        'Schema markup implementation',
        'Mobile optimization',
        'Fast loading speeds',
        'Clean URL structure'
      ],
      process: [
        'SEO audit',
        'Technical optimization',
        'Content structure planning',
        'Implementation',
        'Testing and verification'
      ],
      benefits: [],
      timeline: '',
      pricing: {
        basic: '',
        standard: '',
        premium: ''
      }
    },
    'Hosting & Domain Setup': {
      description: 'Complete setup of your website hosting and domain registration for a hassle-free launch.',
      features: [
        'Domain registration',
        'Hosting setup',
        'SSL certificate installation',
        'Email configuration',
        'DNS management',
        'Backup solutions'
      ],
      process: [
        'Domain selection',
        'Hosting package selection',
        'DNS configuration',
        'SSL setup',
        'Email setup',
        'Launch preparation'
      ],
      benefits: [],
      timeline: '',
      pricing: {
        basic: '',
        standard: '',
        premium: ''
      }
    },
    'Ongoing Maintenance': {
      description: 'Regular updates and maintenance to keep your website secure, fast, and up-to-date.',
      features: [
        'Regular security updates',
        'Performance monitoring',
        'Content updates',
        'Backup management',
        'Technical support',
        'Analytics reporting'
      ],
      process: [
        'Initial website audit',
        'Maintenance plan creation',
        'Regular updates schedule',
        'Performance monitoring',
        'Security checks',
        'Monthly reporting'
      ],
      benefits: [],
      timeline: '',
      pricing: {
        basic: '',
        standard: '',
        premium: ''
      }
    }
  };

  const details = title ? serviceDetails[title] : null;

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center p-8 rounded-lg bg-white shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Service not found</h1>
          <button
            onClick={() => navigate('/#services')}
            className="btn-primary"
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.button
          onClick={() => navigate('/#services')}
          className="flex items-center text-blue-600 mb-8 hover:text-blue-700 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="mr-2" />
          Back to Services
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {description}
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <CheckCircle2 className="mr-2 text-blue-600" />
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {details.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Clock className="mr-2 text-blue-600" />
                  Our Process
                </h2>
                <ul className="space-y-4">
                  {details.process.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-2">{index + 1}.</span>
                      <span className="text-gray-600">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Users className="mr-2 text-blue-600" />
                  Benefits
                </h2>
                <ul className="space-y-4">
                  {details.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Zap className="mr-2 text-blue-600" />
                  Timeline & Pricing
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 text-blue-600" />
                    <span>Estimated timeline: {details.timeline}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Pricing Options:</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">Basic: {details.pricing.basic}</p>
                      <p className="text-gray-600">Standard: {details.pricing.standard}</p>
                      <p className="text-gray-600">Premium: {details.pricing.premium}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Cloud className="mr-2 text-blue-600" />
                Cloudflare Enterprise Protection
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Security Features:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Shield className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Advanced DDoS Protection - Blocks malicious traffic and prevents service disruption</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Web Application Firewall (WAF) - Protects against common web vulnerabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">SSL/TLS Encryption - Ensures secure data transmission</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Performance Benefits:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Zap className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Global CDN Network - Content delivery from 200+ data centers worldwide</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Automatic Caching - Faster page loads and reduced server load</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Smart Routing - Optimized traffic delivery for best performance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                <Palette className="mr-2 text-blue-600" />
                Featured Portfolio
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Layout className="text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">E-commerce Redesign</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Complete UX overhaul of an e-commerce platform, resulting in 40% increase in conversion rate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Figma</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">User Research</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">A/B Testing</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Smartphone className="text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Mobile App Design</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Native mobile app design with focus on accessibility and user engagement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Sketch</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">iOS/Android</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Prototyping</span>
                  </div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Code className="text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Design System</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Comprehensive design system implementation for enterprise applications.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Layout className="text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Dashboard UI</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Data visualization and analytics dashboard design.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Smartphone className="text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Mobile First</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Responsive web design with mobile-first approach.
                  </p>
                </motion.div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => navigate('/portfolio')}
                  className="btn-secondary"
                >
                  View Full Portfolio
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="flex items-center justify-center text-gray-600">
                <Shield className="mr-2 text-blue-600" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/#contact')}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Get Started
                </button>
                <div>
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Our Portfolio →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails; 