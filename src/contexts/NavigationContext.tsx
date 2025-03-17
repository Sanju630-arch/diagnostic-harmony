
import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface NavigationContextType {
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateTo = (path: string) => {
    if (path === location.pathname) return;
    
    setIsLoading(true);
    
    // Simulate loading for a better experience
    setTimeout(() => {
      navigate(path);
      // Add small delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 300);
    }, 800); // Loading time in milliseconds
  };
  
  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </NavigationContext.Provider>
  );
};
