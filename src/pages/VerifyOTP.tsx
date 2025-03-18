
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { useNavigation } from '@/contexts/NavigationContext';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null);
  const { verifyOTP } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setLoading } = useNavigation();

  useEffect(() => {
    // Create a hidden reCAPTCHA container
    if (!document.getElementById('recaptcha-container')) {
      const recaptchaContainer = document.createElement('div');
      recaptchaContainer.id = 'recaptcha-container';
      document.body.appendChild(recaptchaContainer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code."
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      const success = await verifyOTP(otp);
      if (success) {
        setVerificationResult('success');
        
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          setLoading(true);
          navigate('/dashboard');
          
          // Simulate loading time
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }, 1500);
      } else {
        setVerificationResult('error');
      }
    } catch (error) {
      setVerificationResult('error');
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An error occurred during verification. Please try again."
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent. For demo, use code 123456."
    });
  };
  
  const handleChangeMethod = () => {
    setLoading(true);
    navigate('/auth');
    
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const resultAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Verify Your Identity
                  </h1>
                  <p className="text-gray-600">
                    We've sent a 6-digit verification code to you
                  </p>
                </div>
                
                {verificationResult === 'success' ? (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={resultAnimation}
                    className="text-center py-6"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                      <ShieldCheck className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Successful</h2>
                    <p className="text-gray-600 mb-6">You'll be redirected to your dashboard shortly</p>
                  </motion.div>
                ) : verificationResult === 'error' ? (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={resultAnimation}
                    className="text-center py-6"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                      <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                    <p className="text-gray-600 mb-6">The code you entered is incorrect. Please try again.</p>
                    <Button
                      variant="outline"
                      onClick={() => setVerificationResult(null)}
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter 6-digit code
                      </label>
                      <div className="mx-auto">
                        <InputOTP 
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Use code 123456 for testing
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isVerifying || otp.length !== 6}
                      className="w-full"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Continue"
                      )}
                    </Button>
                    
                    <div className="flex justify-between text-sm">
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResendOTP}
                        className="text-primary"
                      >
                        Resend Code
                      </Button>
                      
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleChangeMethod}
                        className="text-primary"
                      >
                        Change Method
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Hidden container for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default VerifyOTP;
