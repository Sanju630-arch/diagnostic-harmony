
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
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
              className="max-h-full object-contain rounded-lg shadow-md"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </div>
        </div>
        
        <CardContent className={`p-6 ${featured ? 'md:w-2/3' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-medium text-gray-900">{packageItem.name}</h3>
            {packageItem.popular && (
              <motion.span 
                className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Popular
              </motion.span>
            )}
          </div>
          
          <p className="text-gray-600 mb-3">{packageItem.shortDescription}</p>
          
          <div className="space-y-2 mb-4">
            {packageItem.tests.slice(0, 3).map((test, index) => (
              <motion.div 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{test.name}</span>
              </motion.div>
            ))}
            {packageItem.tests.length > 3 && (
              <motion.div 
                className="text-sm text-primary"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                +{packageItem.tests.length - 3} more tests
              </motion.div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div className="text-primary font-semibold">₹{packageItem.price.toLocaleString()}</div>
            
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link 
                to={`/packages/${packageItem.id}`}
                className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline"
              >
                View Details
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: "easeInOut" }}
                >
                  <ArrowRight className="ml-1 h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
