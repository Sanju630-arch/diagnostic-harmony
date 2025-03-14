
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/lib/packageData';
import { ArrowRight } from 'lucide-react';

interface PackageCardProps {
  packageItem: Package;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageItem, featured = false }) => {
  return (
    <div 
      className={`glass group rounded-2xl overflow-hidden card-hover ${
        featured ? 'lg:col-span-2 md:flex' : ''
      }`}
    >
      <div 
        className={`h-48 bg-gradient-to-br from-sky-100 to-blue-50 ${
          featured ? 'md:w-1/3 md:h-auto' : ''
        }`}
      >
        <div className="w-full h-full flex items-center justify-center p-8">
          <img 
            src={packageItem.image} 
            alt={packageItem.name}
            className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'md:w-2/3' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium text-gray-900">{packageItem.name}</h3>
          {packageItem.popular && (
            <div className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
              Popular
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">{packageItem.shortDescription}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-primary font-semibold">₹{packageItem.price.toLocaleString()}</div>
          
          <Link 
            to={`/packages/${packageItem.id}`}
            className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
