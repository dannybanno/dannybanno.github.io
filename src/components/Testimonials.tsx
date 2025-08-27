import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  business: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    business: "Local Cafe Owner",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Danny created a beautiful website for our cafe that perfectly captures our brand. Since launching, our online orders have increased by 30%!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Smith",
    business: "Barber Shop Owner",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The booking system Danny integrated into our website has completely transformed our business. Our customers love how easy it is to make appointments.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Davis",
    business: "Dental Clinic",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Our clinic needed a professional website that instilled trust. Danny delivered exactly that and more. The website is beautiful and patients find it easy to navigate.",
    rating: 5
  },
  {
    id: 4,
    name: "Robert Wilson",
    business: "Auto Repair Shop",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Danny was easy to work with and understood exactly what our business needed. The website has helped us reach new customers in our area.",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = window.setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
            Client Success Stories
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real results from real businesses. See how we've helped transform their online presence.
          </p>
        </div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <Quote className="w-12 h-12 text-blue-300/50 mb-6" />
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-20 h-20 rounded-xl object-cover border-2 border-blue-400/50 shadow-lg"
                            loading="lazy"
                          />
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-30 -z-10" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{testimonial.name}</h3>
                            <p className="text-blue-200">{testimonial.business}</p>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} 
                              />
                            ))}
                          </div>
                        </div>
                        <blockquote className="text-lg text-blue-50 leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:-ml-8 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white shadow-lg hover:bg-white/20 transition-all duration-200 focus:outline-none border border-white/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:-mr-8 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white shadow-lg hover:bg-white/20 transition-all duration-200 focus:outline-none border border-white/20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-200 ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;