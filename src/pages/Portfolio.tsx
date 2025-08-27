import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "E-commerce Website",
      description: "A modern e-commerce platform with seamless user experience",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Web Design"
    },
    {
      title: "Mobile App UI",
      description: "User interface design for a fitness tracking application",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Mobile Design"
    },
    {
      title: "Dashboard Design",
      description: "Analytics dashboard with intuitive data visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "UI/UX Design"
    }
  ];

  return (
    <div className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 mb-8 hover:text-blue-700 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </motion.button>

        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            My Portfolio
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent web design and development projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 md:mt-24">
          <button
            onClick={() => navigate('/#contact')}
            className="btn-primary"
          >
            Begin Your Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 