
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { TestTube, Microscope, Heart, Activity, Brain, Stethoscope, ArrowRight, Clock, Calendar, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      icon: <TestTube className="h-8 w-8 text-primary" />,
      name: "Laboratory Tests",
      description: "Comprehensive blood tests, urine analysis, stool examination, and more for accurate diagnosis and health monitoring.",
      features: ["Complete Blood Count", "Liver Function Tests", "Kidney Function Tests", "Lipid Profile", "Blood Sugar Tests"],
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      name: "Cardiology Tests",
      description: "Advanced cardiac diagnostics to assess heart health and function, helping prevent and manage cardiovascular diseases.",
      features: ["Electrocardiogram (ECG)", "Echocardiogram", "Stress Test", "Holter Monitoring", "Cardiac Marker Tests"],
    },
    {
      icon: <Microscope className="h-8 w-8 text-primary" />,
      name: "Pathology Services",
      description: "Expert analysis of tissues and bodily fluids to diagnose diseases and conditions with precision and accuracy.",
      features: ["Histopathology", "Cytopathology", "Molecular Pathology", "Immunohistochemistry", "Fine Needle Aspiration Cytology"],
    },
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      name: "Radiology & Imaging",
      description: "State-of-the-art imaging services to visualize internal organs and structures for diagnostic and treatment planning.",
      features: ["X-Ray", "Ultrasound", "CT Scan", "MRI", "Mammography"],
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      name: "Neurology Tests",
      description: "Specialized tests to evaluate brain function and diagnose neurological disorders with precision.",
      features: ["Electroencephalogram (EEG)", "Nerve Conduction Study", "Electromyography (EMG)", "Evoked Potential Tests", "Sleep Studies"],
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-primary" />,
      name: "Specialized Tests",
      description: "Advanced diagnostic tests for specific conditions and comprehensive health evaluation.",
      features: ["Allergy Testing", "Hormone Tests", "Genetic Testing", "Immunology Tests", "Vitamin & Mineral Profiles"],
    },
  ];

  const benefits = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Easy Scheduling",
      description: "Book your appointments online or over the phone for your convenience.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Quick Results",
      description: "Get your test results promptly, with digital access via our patient portal.",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      title: "Expert Consultation",
      description: "Discuss your results with our healthcare professionals for proper guidance.",
    },
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
                Our Diagnostic Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Advanced diagnostics with precision and care
              </p>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/booking-options" className="text-primary font-medium flex items-center">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-sky-50/80 to-blue-50/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The DiagnoHub Advantage
              </h2>
              <p className="text-gray-600">
                What makes our diagnostic services stand out from the rest
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/booking-options">
                  Book Your Diagnostic Service
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Sample Collection Process */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Process</h2>
                <p className="text-gray-700 mb-8">
                  At DiagnoHub, we've streamlined our diagnostic process to ensure accuracy, comfort, and 
                  efficiency for all our patients. Here's how it works:
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      number: "01",
                      title: "Book Appointment",
                      description: "Schedule your diagnostic test online, via phone, or WhatsApp."
                    },
                    {
                      number: "02",
                      title: "Sample Collection",
                      description: "Visit our center for sample collection or opt for home collection services."
                    },
                    {
                      number: "03",
                      title: "Laboratory Analysis",
                      description: "Our experts analyze your samples using advanced technology."
                    },
                    {
                      number: "04",
                      title: "Report Generation",
                      description: "Comprehensive reports are generated with accurate results."
                    },
                    {
                      number: "05",
                      title: "Results Delivery",
                      description: "Access your results online or collect physical reports from our center."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {step.number}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="DiagnoHub Process" 
                    className="rounded-2xl w-full h-auto relative z-10 shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Home Collection Services */}
        <section className="py-16 bg-gradient-to-r from-blue-50/80 to-sky-50/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Home Collection Service" 
                    className="rounded-2xl w-full h-auto relative z-10 shadow-lg"
                  />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Collection Services</h2>
                <p className="text-gray-700 mb-6">
                  Can't come to our center? No problem! We offer convenient home collection services for most of our 
                  diagnostic tests, bringing the lab to your doorstep.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Experienced phlebotomists for safe and painless sample collection",
                    "Strict adherence to sample handling protocols",
                    "Available 7 days a week with flexible timing",
                    "Advanced booking and same-day services available",
                    "Nominal additional charges based on location"
                  ].map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 font-bold">✓</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/booking-options">
                    Book Home Collection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-blue-400/10 overflow-hidden">
              <div className="p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Ready to book your diagnostic test?
                  </h2>
                  <p className="text-gray-700 mb-8 text-lg">
                    Choose from our wide range of diagnostic services or comprehensive health packages tailored to your needs.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                    <Button asChild size="lg">
                      <Link to="/booking-options">
                        Book Individual Test
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/packages">
                        View Health Packages
                      </Link>
                    </Button>
                  </div>
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

export default Services;
