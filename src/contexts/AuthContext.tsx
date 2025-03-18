
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import zxcvbn from 'zxcvbn';

interface User {
  id: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, phone: string, method: 'email' | 'phone', password?: string) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  verificationId: string;
  signup: (email: string, password: string) => Promise<void>;
  checkPasswordStrength: (password: string) => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const supabaseUser = data.session.user;
        const user: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || undefined,
          phone: supabaseUser.phone || undefined,
        };
        setUser(user);
        localStorage.setItem('diagnohub_user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('diagnohub_user');
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const supabaseUser = session.user;
        const user: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || undefined,
          phone: supabaseUser.phone || undefined,
        };
        setUser(user);
        localStorage.setItem('diagnohub_user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('diagnohub_user');
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password);
    return result.score;
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          email: data.user.email || undefined,
        };
        setUser(newUser);
        localStorage.setItem('diagnohub_user', JSON.stringify(newUser));
        
        toast({
          title: "Account Created",
          description: "Your account has been successfully created. Please check your email for verification.",
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Failed to create account",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, phone: string, method: 'email' | 'phone', password?: string) => {
    setIsLoading(true);
    setAuthMethod(method);
    
    try {
      if (method === 'email') {
        setEmailOrPhone(email);
        
        if (password) {
          // Sign in with email and password
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data.user) {
            navigate('/dashboard');
          }
        } else {
          // Send magic link
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: window.location.origin + '/verify-otp',
            }
          });
          
          if (error) throw error;
          
          toast({
            title: "Email Sent",
            description: "Check your email for a sign-in link. For demo, use code 123456.",
          });
          
          navigate('/verify-otp');
        }
      } else {
        // Sign in with phone
        setEmailOrPhone(phone);
        const formattedPhoneNumber = phone.startsWith('+') ? phone : `+${phone}`;
        
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhoneNumber,
        });
        
        if (error) throw error;
        
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your phone. For demo, use code 123456.",
        });
        
        navigate('/verify-otp');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (otp === '123456') {
        // Demo verification for testing
        const demoUser: User = {
          id: Math.random().toString(36).substring(2, 15),
          ...(authMethod === 'email' && { email: emailOrPhone }),
          ...(authMethod === 'phone' && { phone: emailOrPhone }),
        };
        
        setUser(demoUser);
        localStorage.setItem('diagnohub_user', JSON.stringify(demoUser));
        
        toast({
          title: "Verification Successful",
          description: "You have successfully logged in with demo code.",
        });
        
        return true;
      }
      
      if (authMethod === 'phone') {
        // Verify phone OTP
        const { data, error } = await supabase.auth.verifyOtp({
          phone: emailOrPhone,
          token: otp,
          type: 'sms'
        });
        
        if (error) throw error;
        
        toast({
          title: "Verification Successful",
          description: "You have successfully logged in.",
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "The verification code is incorrect. Please try again.",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('diagnohub_user');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message || "Failed to log out",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login,
      logout,
      verifyOTP,
      verificationId,
      signup,
      checkPasswordStrength
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
