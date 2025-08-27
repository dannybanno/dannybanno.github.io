import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServiceDetails from './pages/ServiceDetails';
import Portfolio from './pages/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import Pricing from './components/Pricing';

function App() {
  const location = useLocation();
  const pricingFeatures = [
    {
      title: "Responsive Design",
      description: "Looks great on all devices",
      icon: "/icons/responsive.svg"
    },
    {
      title: "SEO Optimized",
      description: "Built for search engines",
      icon: "/icons/seo.svg"
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed",
      icon: "/icons/performance.svg"
    },
    {
      title: "Modern Design",
      description: "Clean and professional look",
      icon: "/icons/design.svg"
    }
  ];

  // Get the appropriate title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return "Danny's Web Design | Professional Websites for Local Businesses";
      case '/service-details':
        return "Service Details | Danny's Web Design";
      case '/portfolio':
        return "Portfolio | Danny's Web Design";
      default:
        return "Danny's Web Design | Professional Websites for Local Businesses";
    }
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SEO
          title={getPageTitle()}
          description="Professional web design services for businesses in Barrow-in-Furness. Custom websites, redesigns, and maintenance."
          keywords={['web design', 'website development', 'local business', 'Barrow-in-Furness']}
        />
        <div className="min-h-screen bg-white">
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Services />
                <Pricing
                  productName="Website in a Box"
                  price={999}
                  features={pricingFeatures}
                  imageUrls={{
                    preview: "https://i.imgur.com/ZmxlIgZ.png",
                    features: ["/images/feature1.jpg", "/images/feature2.jpg"]
                  }}
                  links={{
                    product: "/purchase",
                    details: "/product-details"
                  }}
                  isPopular={true}
                />
                <Contact />
              </>
            } />
            <Route path="/service-details" element={<ServiceDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;