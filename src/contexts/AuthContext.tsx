
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, phone: string, method: 'email' | 'phone') => void;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('diagnohub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('diagnohub_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, phone: string, method: 'email' | 'phone') => {
    setAuthMethod(method);
    if (method === 'email') {
      setEmailOrPhone(email);
      // Simulate sending an email with OTP
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email.",
      });
    } else {
      setEmailOrPhone(phone);
      // Simulate sending an SMS with OTP
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone.",
      });
    }
    navigate('/verify-otp');
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Simulate OTP verification
      // In a real app, this would verify with a backend service
      if (otp === '123456') {
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 15),
          ...(authMethod === 'email' && { email: emailOrPhone }),
          ...(authMethod === 'phone' && { phone: emailOrPhone }),
        };
        
        setUser(newUser);
        localStorage.setItem('diagnohub_user', JSON.stringify(newUser));
        
        toast({
          title: "Verification Successful",
          description: "You have successfully logged in.",
        });
        
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: "The verification code is incorrect. Please try again.",
        });
        
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An error occurred during verification. Please try again.",
      });
      
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('diagnohub_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login,
      logout,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
