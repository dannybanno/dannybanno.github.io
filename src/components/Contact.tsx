import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormState {
  name: string;
  email: string;
  business: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    business: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            business: '',
            message: ''
          });
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your project? Contact me today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="mb-6 text-green-500">
                  <CheckCircle size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mb-2">Thank you for reaching out.</p>
                <p className="text-gray-600">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="business" className="block text-gray-700 font-medium mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    placeholder="Your Business LLC"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-md border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`py-2.5 px-6 rounded-md text-white font-medium transition-colors duration-300 ${
                      isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 md:space-y-10"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 rounded-full p-2 text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a href="mailto:contact@dannyweb.design" className="text-blue-600 hover:underline">
                      contact@dannyweb.design
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 rounded-full p-2 text-blue-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a href="tel:+441234567890" className="text-blue-600 hover:underline">
                      +44 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 rounded-full p-2 text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Barrow-in-Furness, Cumbria, UK</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Get a Proposal</h3>
              <p className="text-gray-600 mb-6">
                Need a detailed quote for your project? Schedule a free 30-minute consultation and I'll prepare a customized proposal for your business.
              </p>
              <a
                href="#schedule"
                className="inline-block py-3 px-6 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition-colors duration-300"
              >
                Schedule a Call
              </a>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Find Us</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1479.1234567890123!2d-3.2275!3d54.1109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487c0c9c6c8c6c8f%3A0x1234567890abcdef!2sBarrow-in-Furness%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;