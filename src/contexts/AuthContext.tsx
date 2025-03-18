
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  PhoneAuthProvider, 
  RecaptchaVerifier, 
  signInWithCredential, 
  signInWithPhoneNumber,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface User {
  id: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, phone: string, method: 'email' | 'phone') => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  verificationId: string;
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
    // Check for existing user session
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || undefined,
          phone: firebaseUser.phoneNumber || undefined,
        };
        setUser(user);
        localStorage.setItem('diagnohub_user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('diagnohub_user');
      }
      setIsLoading(false);
    });

    // Handle email sign-in if coming from an email link
    const url = window.location.href;
    if (isSignInWithEmailLink(auth, url)) {
      // Get the email from localStorage (saved when sending the link)
      const email = localStorage.getItem('emailForSignIn');
      if (email) {
        setIsLoading(true);
        signInWithEmailLink(auth, email, url)
          .then(() => {
            localStorage.removeItem('emailForSignIn');
            navigate('/dashboard');
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: error.message,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }

    return () => unsubscribe();
  }, [navigate, toast]);

  // Initialize reCAPTCHA verifier
  const setupRecaptcha = (phoneNumber: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
    
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const login = async (email: string, phone: string, method: 'email' | 'phone') => {
    setAuthMethod(method);
    setIsLoading(true);
    
    try {
      if (method === 'email') {
        setEmailOrPhone(email);
        
        // For demonstration, we're using email link authentication
        // In production, you might want to use Firebase Custom Auth with email OTP
        const actionCodeSettings = {
          url: window.location.origin + '/verify-otp',
          handleCodeInApp: true,
        };
        
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        localStorage.setItem('emailForSignIn', email);
        
        toast({
          title: "Email Sent",
          description: "Check your email for a sign-in link. For demo, use code 123456.",
        });
        
        navigate('/verify-otp');
      } else {
        setEmailOrPhone(phone);
        
        // Initialize phone authentication
        const formattedPhoneNumber = phone.startsWith('+') ? phone : `+${phone}`;
        const confirmationResult = await setupRecaptcha(formattedPhoneNumber);
        setVerificationId(confirmationResult.verificationId);
        
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
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // For demonstration purposes, also accept 123456 as a valid OTP
      if (otp === '123456') {
        // Create a demo user for testing
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
      
      // Real Firebase verification
      if (authMethod === 'phone' && verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        await signInWithCredential(auth, credential);
        
        toast({
          title: "Verification Successful",
          description: "You have successfully logged in.",
        });
        
        return true;
      }
      
      // For email, we're currently using email link which doesn't need OTP
      // This is just a fallback check
      if (authMethod === 'email') {
        // In reality, you'd implement a custom email OTP solution here
        throw new Error("Invalid verification method");
      }
      
      throw new Error("Invalid verification code");
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
      await signOut(auth);
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
        description: error.message,
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
      verificationId
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
