
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Calendar, ClipboardCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Easy Appointment Booking",
      description: "Book your diagnostic appointments online with our simple scheduling system. Choose your preferred date and time."
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
      title: "Comprehensive Health Packages",
      description: "Choose from our range of health packages designed to address different health concerns and age groups."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Quick Turnaround Time",
      description: "Get your test results faster with our efficient processing. Access your reports online or receive them via email."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose DiagnoHub?
              </h2>
              <p className="text-gray-600">
                We combine advanced diagnostic technology with compassionate care to provide 
                you with the most accurate and comfortable healthcare experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass rounded-2xl p-8 transition-all hover:shadow-lg">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Packages */}
        <FeaturedPackages />
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-sky-100 to-blue-50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="p-12 lg:p-16 flex items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      Take Control of Your Health Today
                    </h2>
                    <p className="text-gray-700 mb-8 text-lg">
                      Early detection is key to better health outcomes. Our diagnostic services 
                      help you stay informed about your health status and take preventive measures.
                    </p>
                    <Link 
                      to="/book-appointment"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors"
                    >
                      Book Your Appointment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
                
                <div className="hidden lg:block relative h-full">
                  <img 
                    src="/placeholder.svg" 
                    alt="Health Checkup" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
