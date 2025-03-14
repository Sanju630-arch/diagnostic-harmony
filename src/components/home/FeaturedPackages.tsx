
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, getPopularPackages } from '@/lib/packageData';
import PackageCard from '../ui/PackageCard';
import { ArrowRight } from 'lucide-react';

const FeaturedPackages: React.FC = () => {
  const popularPackages = getPopularPackages();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Popular Health Packages
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Comprehensive diagnostic packages tailored to your specific health needs. 
              Choose from our range of carefully curated health checkups.
            </p>
          </div>
          
          <Link 
            to="/packages"
            className="inline-flex items-center mt-6 md:mt-0 text-primary hover:text-primary/80 font-medium group"
          >
            View All Packages
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPackages.map((pkg, index) => (
            <PackageCard 
              key={pkg.id} 
              packageItem={pkg} 
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
