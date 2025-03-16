
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/lib/packageData';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface PackageCardProps {
  packageItem: Package;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageItem, featured = false }) => {
  return (
    <motion.div 
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative h-full ${featured ? 'lg:col-span-2 md:flex' : ''}`}
    >
      <Card className="h-full overflow-hidden group hover:border-primary/50 transition-colors">
        <div 
          className={`h-48 bg-gradient-to-br from-sky-100 to-blue-50 ${
            featured ? 'md:w-1/3 md:h-auto' : ''
          }`}
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            <motion.img 
              src={packageItem.image} 
              alt={packageItem.name}
              className="max-h-full object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
        
        <CardContent className={`p-6 ${featured ? 'md:w-2/3' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-medium text-gray-900">{packageItem.name}</h3>
            {packageItem.popular && (
              <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
                Popular
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-3">{packageItem.shortDescription}</p>
          
          <div className="space-y-2 mb-4">
            {packageItem.tests.slice(0, 3).map((test, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{test.name}</span>
              </div>
            ))}
            {packageItem.tests.length > 3 && (
              <div className="text-sm text-primary">+{packageItem.tests.length - 3} more tests</div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div className="text-primary font-semibold">₹{packageItem.price.toLocaleString()}</div>
            
            <Link 
              to={`/packages/${packageItem.id}`}
              className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline"
            >
              View Details
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
