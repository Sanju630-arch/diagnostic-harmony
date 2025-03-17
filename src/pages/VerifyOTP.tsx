
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/contexts/NavigationContext';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyOTP } = useAuth();
  const { navigateTo } = useNavigation();
  const location = useLocation();
  const { toast } = useToast();
  
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
    try {
      const success = await verifyOTP(otp);
      if (success) {
        navigateTo('/dashboard');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An error occurred during verification. Please try again."
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">Verify Your Identity</h1>
          <p className="text-slate-600 font-montserrat">We've sent a 6-digit verification code to your email or phone</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-montserrat font-bold text-slate-700">
              Enter 6-digit code
            </label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full p-4 text-center text-xl tracking-widest font-montserrat"
              placeholder="• • • • • •"
            />
            <p className="text-xs text-slate-500 mt-1 font-montserrat">
              Use code 123456 for testing
            </p>
          </div>

          <Button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-montserrat font-bold"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
          
          <div className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              onClick={() => navigateTo('/auth')}
              className="text-blue-600 hover:text-blue-800 underline text-sm font-montserrat"
            >
              Back to Login
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
