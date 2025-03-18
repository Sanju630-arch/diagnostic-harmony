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
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
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

    const url = window.location.href;
    if (isSignInWithEmailLink(auth, url)) {
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

  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password);
    return result.score;
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUser: User = {
        id: result.user.uid,
        email: result.user.email || undefined,
      };
      setUser(newUser);
      localStorage.setItem('diagnohub_user', JSON.stringify(newUser));
      toast({
        title: "Account Created",
        description: "Your account has been successfully created.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
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
          const result = await signInWithEmailAndPassword(auth, email, password);
          const user: User = {
            id: result.user.uid,
            email: result.user.email || undefined,
          };
          setUser(user);
          localStorage.setItem('diagnohub_user', JSON.stringify(user));
          navigate('/dashboard');
        } else {
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
        }
      } else {
        setEmailOrPhone(phone);
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

  const setupRecaptcha = (phoneNumber: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      }
    });
    
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (otp === '123456') {
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
      
      if (authMethod === 'phone' && verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        await signInWithCredential(auth, credential);
        
        toast({
          title: "Verification Successful",
          description: "You have successfully logged in.",
        });
        
        return true;
      }
      
      if (authMethod === 'email') {
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
