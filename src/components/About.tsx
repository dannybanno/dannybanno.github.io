import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Shield, Zap, CheckCircle, Sparkles } from 'lucide-react';

const DotBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]" />
    </div>
  );
};

const TextGenerate = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="text-gray-600">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

const About = () => {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Modern Tech Stack',
      description: 'Built with cutting-edge technologies like React, TypeScript, and Web3 libraries.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Decentralized',
      description: 'Leveraging blockchain technology for secure and transparent applications.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure by Design',
      description: 'Implementing best practices for security and data protection.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized performance for the best user experience.',
    },
  ];

  const testimonials = [
    {
      quote: "Working with this team was a game-changer for my business. They delivered a stunning website that perfectly captures my brand.",
      name: "Sarah J.",
      title: "Business Owner"
    },
    {
      quote: "The attention to detail and responsiveness of their team was exceptional. Highly recommend their web design services!",
      name: "Michael P.",
      title: "Marketing Manager"
    },
    {
      quote: "Our new website is not only beautiful but also incredibly user-friendly. We've seen a noticeable increase in customer engagement.",
      name: "Emily L.",
      title: "Entrepreneur"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              About Us
            </h2>
            <TextGenerate text="We are a team of passionate web developers and designers dedicated to creating exceptional digital experiences. With years of experience in the industry, we understand what it takes to build websites that not only look great but also drive results for your business." />
            
            <div className="space-y-4 mt-8">
              {[
                'Experienced team of developers and designers',
                'Focus on modern technologies and best practices',
                'Commitment to client satisfaction',
                'Custom solutions for every business need'
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group"
                >
                  <div className="relative">
                    <CheckCircle className="text-blue-600 group-hover:text-purple-600 transition-colors" size={20} />
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Team working"
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-2xl opacity-20 -z-10" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Our Expertise
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative p-6 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm">
                  <div className="mb-4 text-blue-600 group-hover:text-purple-600 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Client Testimonials
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm h-full">
                  <Sparkles className="w-8 h-8 text-blue-400 mb-4" />
                  <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;