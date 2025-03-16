
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Building, Users, Award, Clock, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { number: '10+', label: 'Years Experience', icon: <Clock className="h-6 w-6 text-primary" /> },
    { number: '50+', label: 'Specialists', icon: <Users className="h-6 w-6 text-primary" /> },
    { number: '1000+', label: 'Happy Patients', icon: <Heart className="h-6 w-6 text-primary" /> },
    { number: '99%', label: 'Success Rate', icon: <Award className="h-6 w-6 text-primary" /> },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Regular Patient',
      content: 'DiagnoHub has completely transformed my healthcare experience. Their diagnostic services are accurate, and the staff is incredibly professional and caring.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Priya Patel',
      role: 'Annual Check-up Patient',
      content: 'I've been coming to DiagnoHub for my annual health check-ups for 3 years now. The efficiency and accuracy of their services keep me coming back.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Amit Kumar',
      role: 'Corporate Client',
      content: 'Our company partners with DiagnoHub for employee health check-ups. Their packages are comprehensive and the reporting is detailed and easy to understand.',
      avatar: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About DiagnoHub
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your Trusted Partner in Preventive Healthcare
              </p>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50/80 to-sky-50/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-6">
                  Founded in 2012, DiagnoHub was established with a mission to make advanced diagnostic 
                  services accessible to everyone. What started as a small laboratory with a team of 5 
                  dedicated professionals has now grown into a comprehensive diagnostic center with 
                  state-of-the-art equipment and a team of over 50 specialists.
                </p>
                <p className="text-gray-700 mb-6">
                  Our journey has been guided by our commitment to accuracy, affordability, and compassion. 
                  We believe that early and accurate diagnosis is the cornerstone of effective healthcare, 
                  and we strive to provide the most reliable diagnostic services to our patients.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">DiagnoHub Headquarters</h3>
                    <p className="text-gray-600">123 Healthcare Avenue, Medical District</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="DiagnoHub Center" 
                    className="rounded-2xl w-full h-auto relative z-10 shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gradient-to-r from-sky-50/80 to-blue-50/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600">
                At DiagnoHub, our core values guide everything we do. They reflect our commitment to 
                providing outstanding diagnostic services and patient care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Accuracy & Precision",
                  description: "We understand the critical importance of accurate diagnostic results. Our advanced equipment and skilled technicians ensure the highest level of precision."
                },
                {
                  title: "Compassion & Care",
                  description: "We believe in treating our patients with empathy and respect. Our friendly staff ensures a comfortable experience from registration to report collection."
                },
                {
                  title: "Innovation & Excellence",
                  description: "We continuously upgrade our technologies and methodologies to stay at the forefront of diagnostic services, providing the best possible care to our patients."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Patients Say
              </h2>
              <p className="text-gray-600">
                Don't just take our word for it. Hear from the people who have experienced our services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="glass rounded-2xl p-8"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Location Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50/80 to-sky-50/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Location</h2>
                <p className="text-gray-700 mb-6">
                  We're conveniently located in the heart of the city, easily accessible by public 
                  transport and with ample parking space.
                </p>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="pt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p className="text-gray-600">123 Healthcare Avenue, Medical District, City - 123456</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="pt-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Working Hours</h3>
                    <p className="text-gray-600">Monday to Saturday: 7:00 AM - 9:00 PM</p>
                    <p className="text-gray-600">Sunday: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-80 bg-gray-200 rounded-lg">
                {/* Placeholder for Google Maps - would be implemented with Google Maps API */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Google Maps Integration
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

export default AboutUs;
