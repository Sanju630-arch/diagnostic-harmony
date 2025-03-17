
import React from 'react';
import { motion } from 'framer-motion';

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1
};

export const LoadingSpinner: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#0ea5e9"
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <motion.span
            className="block absolute"
            style={{
              height: size,
              width: size,
              border: `${size/10}px solid`,
              borderColor: `${color} transparent transparent transparent`,
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
          <motion.span
            className="block absolute"
            style={{
              height: size * 0.8,
              width: size * 0.8,
              border: `${size/12}px solid`,
              borderColor: `transparent ${color} transparent transparent`,
              borderRadius: '50%',
            }}
            animate={{ rotate: -360 }}
            transition={{...spinTransition, duration: 1.5}}
          />
        </div>
        <motion.div
          className="mt-4 text-primary font-montserrat font-bold tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Loading...
        </motion.div>
        <motion.div
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Preparing your experience
        </motion.div>
      </div>
    </div>
  );
};
