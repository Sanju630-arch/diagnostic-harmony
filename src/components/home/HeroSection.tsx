
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../ui/AnimatedBackground';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium mb-6">
              Quality Healthcare Diagnostics
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Health, <br />
              <span className="text-primary">Our Priority</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Advanced diagnostic services with state-of-the-art technology and compassionate care. Book your health checkup today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/book-appointment"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              
              <Link 
                to="/packages"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                View Packages
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-50 to-white shadow-xl overflow-hidden">
                <img 
                  src="/placeholder.svg"
                  alt="Diagnostic Healthcare" 
                  className="w-full h-full object-cover animate-float"
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Advanced Technology</div>
                    <div className="text-sm text-gray-600">State-of-the-art equipment</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Expert Care</div>
                    <div className="text-sm text-gray-600">Experienced professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
