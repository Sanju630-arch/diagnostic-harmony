
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/ui/PackageCard';
import { packages } from '@/lib/packageData';
import { Search, Filter, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const Packages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract all unique tags from packages
  const allTags = Array.from(
    new Set(packages.flatMap(pkg => pkg.tags))
  );
  
  // Filter packages based on search query and selected tag
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag ? pkg.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
          <AnimatedBackground />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-6">
                <HeartPulse className="h-6 w-6 text-primary mr-2" />
                <span className="text-primary font-medium">Comprehensive Health Packages</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Health Checkup Packages
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Choose from our comprehensive range of diagnostic packages tailored to your health needs.
              </p>
              
              {/* Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative max-w-md mx-auto"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white/80 backdrop-blur-sm shadow-sm"
                  placeholder="Search for packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Packages List */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Tags */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center mr-2">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">Filter:</span>
              </div>
              
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              
              {allTags.map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05), duration: 0.5 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                    <div className="p-6 border border-gray-200 border-t-0 rounded-b-xl">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                      <div className="space-y-2 mb-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-start">
                            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPackages.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <PackageCard packageItem={pkg} featured={index === 0 && filteredPackages.length > 1} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Packages;
