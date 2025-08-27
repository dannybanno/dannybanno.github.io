import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Example Website",
    category: "Digital Solutions",
    image: "https://i.imgur.com/rWc7xR1.jpeg",
    description: "A sleek, modern website featuring a clean design that highlights the company’s services, introduces the team, showcases client testimonials, and provides an easy-to-use contact section.",
    technologies: ["HTML", "CSS", "JavaScript / TypeScript", "React"],
    link: "https://glowing-creponne-910ef5.netlify.app"
  },
  {
    id: 2,
    title: "Barber Shop Booking",
    category: "Service Business",
    image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A stylish website for a local barber shop with an integrated booking system and gallery.",
    technologies: ["HTML", "TailwindCSS", "JavaScript", "Node.js"],
    link: "#"
  },
  {
    id: 3,
    title: "Mechanic Shop",
    category: "Service Business",
    image: "https://images.pexels.com/photos/3807339/pexels-photo-3807339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A comprehensive website for a local mechanic with service details, testimonials, and contact information.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "#"
  },
  {
    id: 4,
    title: "Dental Clinic",
    category: "Healthcare",
    image: "https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A professional website for a dental clinic featuring services, team members, and appointment booking.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    link: "#"
  },
  {
    id: 5,
    title: "Fitness Studio",
    category: "Health & Fitness",
    image: "https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A dynamic website for a fitness studio showcasing classes, trainers, and membership options.",
    technologies: ["HTML", "TailwindCSS", "JavaScript", "React"],
    link: "#"
  },
  {
    id: 6,
    title: "Local Bookstore",
    category: "Retail",
    image: "https://images.pexels.com/photos/2767785/pexels-photo-2767785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "An inviting website for a local bookstore featuring their inventory, events, and blog.",
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
    link: "#"
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">My Portfolio</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check out some of my recent projects for local businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden h-60">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-500 mb-3">{project.category}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <span className="mr-1">Visit Site</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              
              <p className="text-gray-500 mb-4">{selectedProject.category}</p>
              <p className="text-gray-700 mb-6">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2 text-gray-900">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-full py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;