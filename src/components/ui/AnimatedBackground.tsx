
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="geometric-bg absolute inset-0 opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full filter blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-100/20 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
