
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPackageById, Package, TestItem } from '@/lib/packageData';
import { 
  ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, 
  ArrowRight, HeartPulse, ShieldCheck, Medal, Beaker
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      // Simulate loading
      setLoading(true);
      setTimeout(() => {
        const foundPackage = getPackageById(id);
        if (foundPackage) {
          setPackageData(foundPackage);
        }
        setLoading(false);
      }, 800);
    }
  }, [id]);

  const handleBookNow = () => {
    if (packageData) {
      navigate(`/booking-options?package=${packageData.id}`);
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
                  
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-64 bg-gray-200 rounded mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!packageData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Package Not Found</h2>
            <p className="text-gray-600 mb-8">
              The health package you're looking for doesn't exist or may have been removed.
            </p>
            <Button asChild>
              <Link to="/packages">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Packages
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/packages" className="hover:text-primary">Packages</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{packageData.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <Button 
                variant="ghost"
                onClick={() => navigate('/packages')}
                className="mb-6 p-0 hover:bg-transparent"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span>Back to Packages</span>
              </Button>
              
              <motion.div variants={fadeIn}>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {packageData.name}
                </h1>
              
                <div className="flex flex-wrap gap-2 mb-6">
                  {packageData.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-blue-50 text-primary text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {packageData.popular && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-medium rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </motion.div>
              
              <motion.p 
                variants={fadeIn} 
                className="text-gray-700 mb-8 text-lg leading-relaxed"
              >
                {packageData.description}
              </motion.p>
              
              {/* Benefits */}
              <motion.div
                variants={fadeIn}
                className="mb-10"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Medal className="h-5 w-5 text-primary mr-2" />
                  Package Benefits
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <HeartPulse className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Early Detection</h4>
                      <p className="text-gray-600 text-sm">Identify potential health issues before they become serious concerns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Beaker className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Advanced Diagnostics</h4>
                      <p className="text-gray-600 text-sm">Using state-of-the-art equipment for accurate results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Comprehensive Assessment</h4>
                      <p className="text-gray-600 text-sm">Get a holistic view of your health status</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Doctor Consultation</h4>
                      <p className="text-gray-600 text-sm">Expert review of your results with personalized advice</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Fasting Information */}
              {packageData.fasting && (
                <motion.div 
                  variants={fadeIn}
                  className="flex items-start p-4 bg-amber-50 border border-amber-200 rounded-lg mb-8"
                >
                  <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Fasting Required</h4>
                    <p className="text-amber-700">
                      This package requires {packageData.fastingHours} hours of fasting before the test. 
                      Water consumption is allowed.
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Tests Included */}
              <motion.div variants={fadeIn} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Tests Included
                </h3>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.tests.map((test, index) => (
                    <motion.div 
                      key={index} 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { delay: index * 0.05, duration: 0.3 } 
                        }
                      }}
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm group hover:border-primary hover:bg-blue-50/30 transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover:text-primary transition-colors" />
                      <div>
                        <span className="text-gray-700 font-medium">{test.name}</span>
                        {test.description && (
                          <p className="text-gray-500 text-sm mt-1">{test.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Process Steps */}
              <motion.div variants={fadeIn} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h3>
                
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {[
                      { title: "Book Your Appointment", desc: "Schedule online or call us to book your preferred date and time" },
                      { title: "Sample Collection", desc: "Visit our center or opt for home collection service" },
                      { title: "Laboratory Analysis", desc: "We perform the tests using advanced diagnostic equipment" },
                      { title: "Report Generation", desc: "Get your digital reports within 24-48 hours" },
                      { title: "Doctor Consultation", desc: "Review your results with our healthcare professional" }
                    ].map((step, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                        className="flex relative"
                      >
                        <div className="flex-shrink-0 z-10">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary font-bold text-lg border-4 border-white shadow-sm">
                            {index + 1}
                          </div>
                        </div>
                        <div className="ml-6 pt-3">
                          <h4 className="text-lg font-medium text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-600">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Additional Information */}
              <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">Turnaround Time:</span>
                      <span className="text-gray-600 ml-2">24-48 hours</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">Availability:</span>
                      <span className="text-gray-600 ml-2">Monday to Saturday</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden sticky top-24 shadow-md border border-gray-100">
                <div className="bg-gradient-to-br from-sky-100 to-blue-50 p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{packageData.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Inclusive of all taxes</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">Home Sample Collection Available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">Digital Reports within 48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">Free Doctor Consultation</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleBookNow}
                  >
                    Book This Package
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500">
                    For corporate bookings or special requirements, please{" "}
                    <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackageDetails;
