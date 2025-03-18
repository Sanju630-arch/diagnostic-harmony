import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, Heart, Stethoscope, User, Lock, ArrowRight, KeyRound, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
});

const phoneSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
});

const Auth: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isSignup, setIsSignup] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login, signup, checkPasswordStrength } = useAuth();
  
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '', password: '' },
  });
  
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  });
  
  const onEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
    if (isSignup) {
      await signup(data.email, data.password);
    } else {
      await login(data.email, '', 'email', data.password);
    }
  };
  
  const onPhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    login('', data.phone, 'phone');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = checkPasswordStrength(e.target.value);
    setPasswordStrength(strength * 25); // Convert 0-4 score to 0-100 percentage
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <motion.div 
                className="lg:col-span-2 flex flex-col justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="text-center lg:text-left">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Welcome to MawaDiagnosticCenter
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      Your personal health dashboard is just a login away. Access your reports, schedule appointments, and track your health journey.
                    </p>
                  </div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={fadeInUp} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Access Your Reports</h3>
                        <p className="text-gray-600">View and download your diagnostic reports anytime, anywhere.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Personalized Dashboard</h3>
                        <p className="text-gray-600">Track your health metrics and get personalized recommendations.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Lock className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Secure & Confidential</h3>
                        <p className="text-gray-600">Your health data is encrypted and protected with the highest security standards.</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-3"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="glass dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 md:p-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {isSignup ? "Create Account" : "Login"}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setIsSignup(!isSignup)}
                      className="flex items-center gap-2"
                    >
                      {isSignup ? (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Login Instead</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Sign Up</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="email" onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="email" className="flex items-center justify-center">
                        <Mail className="mr-2 h-4 w-4" />
                        With Email
                      </TabsTrigger>
                      <TabsTrigger value="phone" className="flex items-center justify-center">
                        <Phone className="mr-2 h-4 w-4" />
                        With Phone
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="email">
                      <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                          <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input 
                                      placeholder="you@example.com" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {(isSignup || !isSignup) && (
                            <FormField
                              control={emailForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                      <Input 
                                        type="password"
                                        placeholder="Enter your password" 
                                        className="pl-10" 
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          handlePasswordChange(e);
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  {isSignup && (
                                    <div className="mt-2">
                                      <Progress value={passwordStrength} className="h-2" />
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Password strength: {passwordStrength === 0 ? "Very Weak" : 
                                          passwordStrength <= 25 ? "Weak" :
                                          passwordStrength <= 50 ? "Fair" :
                                          passwordStrength <= 75 ? "Strong" : "Very Strong"}
                                      </p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <Button 
                            type="submit" 
                            className="w-full flex items-center justify-center gap-2"
                          >
                            {isSignup ? "Sign Up" : "Login"} 
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="phone">
                      <Form {...phoneForm}>
                        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                          <FormField
                            control={phoneForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input 
                                      placeholder="1234567890" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full flex items-center justify-center gap-2"
                          >
                            Continue with Phone 
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="mt-6 text-center text-sm text-gray-500">
                        <p>We'll send a verification code to this phone number</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                      By continuing, you agree to our{" "}
                      <a href="#" className="font-medium text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="font-medium text-primary hover:underline">
                        Privacy Policy
                      </a>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
