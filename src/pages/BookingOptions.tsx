
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, MessageSquare, ArrowRight, ArrowLeft, Mail, CalendarCheck, Clock, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { getPackageById } from '@/lib/packageData';
import { motion } from 'framer-motion';

const BookingOptions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  useEffect(() => {
    if (packageId) {
      const packageData = getPackageById(packageId);
      setSelectedPackage(packageData);
    }
  }, [packageId]);

  const handleFormBooking = () => {
    setIsLoading(true);
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/book-appointment${packageId ? `?package=${packageId}` : ''}`);
    }, 1000);
  };

  const handleWhatsAppBooking = () => {
    let message = 'I would like to book an appointment';
    if (selectedPackage) {
      message += ` for the ${selectedPackage.name} package`;
    }
    
    toast({
      title: "WhatsApp Booking",
      description: "Opening WhatsApp to connect with our team...",
    });
    // In a real implementation, you would use the WhatsApp API or a deep link
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePhoneBooking = () => {
    toast({
      title: "Phone Booking",
      description: "Initiating call to our booking team...",
    });
    // In a real implementation, you might use tel: protocol or show the number
    window.location.href = 'tel:+1234567890';
  };

  const bookingOptions = [
    {
      title: "Online Appointment Form",
      description: "Fill out our comprehensive online form to book your appointment with detailed preferences.",
      icon: <CalendarCheck className="h-10 w-10 text-primary" />,
      action: handleFormBooking,
      buttonText: "Book Online",
      primary: true
    },
    {
      title: "Book via WhatsApp",
      description: "Connect instantly with our team on WhatsApp for quick appointment scheduling.",
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      action: handleWhatsAppBooking,
      buttonText: "WhatsApp Us",
      primary: false
    },
    {
      title: "Book via Phone",
      description: "Call our customer care team directly to schedule your appointment.",
      icon: <Phone className="h-10 w-10 text-blue-500" />,
      action: handlePhoneBooking,
      buttonText: "Call Now",
      primary: false
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
          <AnimatedBackground />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Book Your Appointment
              </h1>
              
              {selectedPackage ? (
                <div className="mb-6">
                  <div className="inline-flex items-center mb-2 px-4 py-2 bg-blue-50 rounded-full">
                    <Package className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-medium">
                      Selected: {selectedPackage.name}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600">
                    Choose how you'd like to book your {selectedPackage.name} package.
                  </p>
                </div>
              ) : (
                <p className="text-lg text-gray-600 mb-8">
                  Choose how you'd like to schedule your diagnostic appointment with us.
                </p>
              )}
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-700">Same-day appointments available</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-700">Open Mon-Sat, 8am-8pm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {bookingOptions.map((option, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden transition-all hover:shadow-lg card-hover"
                  >
                    <div className="p-8">
                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                        {option.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                      <p className="text-gray-600 mb-6">{option.description}</p>
                      
                      {isLoading && option.primary ? (
                        <Button disabled className="w-full">
                          <Skeleton className="h-4 w-24 bg-white/20" />
                        </Button>
                      ) : (
                        <Button 
                          onClick={option.action}
                          variant={option.primary ? "default" : "outline"}
                          className="w-full"
                        >
                          {option.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {selectedPackage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12 p-6 bg-gray-50 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <ArrowLeft className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Changed your mind?</span>
                  </div>
                  <Button 
                    variant="outline" 
                    asChild
                    className="ml-4"
                  >
                    <Link to="/packages">
                      Browse Other Packages
                    </Link>
                  </Button>
                </motion.div>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 p-8 glass rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Need More Information?</h3>
                    <p className="text-gray-600">
                      Our team is available to answer any questions you may have about our health packages 
                      or appointment process.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/contact" className="inline-flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Us
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/packages" className="inline-flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Packages
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingOptions;
