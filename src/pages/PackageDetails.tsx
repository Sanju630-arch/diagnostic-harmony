
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPackageById, Package, TestItem } from '@/lib/packageData';
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

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
      }, 300);
    }
  }, [id]);
  
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
            <Link 
              to="/packages" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Packages
            </Link>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-blur-in">
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
              <button 
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Packages
              </button>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{packageData.name}</h1>
              
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
              
              <p className="text-gray-600 mb-8 text-lg">{packageData.description}</p>
              
              {/* Fasting Information */}
              {packageData.fasting && (
                <div className="flex items-start p-4 bg-amber-50 border border-amber-200 rounded-lg mb-8">
                  <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Fasting Required</h4>
                    <p className="text-amber-700">
                      This package requires {packageData.fastingHours} hours of fasting before the test. 
                      Water consumption is allowed.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Tests Included */}
              <h3 className="text-xl font-medium text-gray-900 mb-6">Tests Included</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {packageData.tests.map((test, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{test.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Additional Information */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Additional Information</h3>
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
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="glass rounded-xl overflow-hidden sticky top-24">
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
                  
                  <Link 
                    to={`/book-appointment?package=${packageData.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackageDetails;
