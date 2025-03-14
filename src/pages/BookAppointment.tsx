
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPackageById, packages } from '@/lib/packageData';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BookAppointment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedPackageId = searchParams.get('package');
  const { toast } = useToast();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [packageId, setPackageId] = useState(preSelectedPackageId || '');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  ];
  
  // Package information for the selected package
  const [selectedPackageInfo, setSelectedPackageInfo] = useState<any>(null);
  
  // Update selected package info when packageId changes
  useEffect(() => {
    if (packageId) {
      const packageInfo = getPackageById(packageId);
      setSelectedPackageInfo(packageInfo);
    } else {
      setSelectedPackageInfo(null);
    }
  }, [packageId]);
  
  // Form validation
  const validateForm = () => {
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }
    
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date for your appointment",
        variant: "destructive",
      });
      return false;
    }
    
    if (!time) {
      toast({
        title: "Error",
        description: "Please select a time slot for your appointment",
        variant: "destructive",
      });
      return false;
    }
    
    if (!packageId) {
      toast({
        title: "Error",
        description: "Please select a health package",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been scheduled successfully. You will receive a confirmation shortly.",
      });
      
      // Reset form
      setFullName('');
      setPhone('');
      setEmail('');
      setDate(undefined);
      setTime('');
      setPackageId('');
      setComments('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
          <AnimatedBackground />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Book Your Appointment
              </h1>
              <p className="text-lg text-gray-600">
                Schedule your health checkup at your convenience. Fill in your details below.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="glass rounded-xl p-8">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-4">Personal Information</h3>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  id="phone"
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                  placeholder="1234567890"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  id="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                  placeholder="john@example.com"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Appointment Details */}
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-4">Appointment Details</h3>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Date
                              </label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Select date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable past dates and Sundays
                                      return date < new Date() || date.getDay() === 0;
                                    }}
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Time
                              </label>
                              <Select value={time} onValueChange={setTime}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Select Health Package
                            </label>
                            <Select value={packageId} onValueChange={setPackageId}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a package" />
                              </SelectTrigger>
                              <SelectContent>
                                {packages.map((pkg) => (
                                  <SelectItem key={pkg.id} value={pkg.id}>
                                    {pkg.name} - ₹{pkg.price.toLocaleString()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Comments
                            </label>
                            <div className="relative">
                              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                <MessageSquare className="h-5 w-5 text-gray-400" />
                              </div>
                              <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                placeholder="Any specific requests or medical information..."
                                rows={4}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Processing...' : 'Book Appointment'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                
                {/* Sidebar */}
                <div>
                  <div className="glass rounded-xl overflow-hidden sticky top-24">
                    <div className="bg-gradient-to-br from-sky-100 to-blue-50 p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        Booking Information
                      </h3>
                      <p className="text-gray-600">Important details about your appointment</p>
                    </div>
                    
                    <div className="p-6">
                      {selectedPackageInfo ? (
                        <div className="mb-6">
                          <div className="flex items-start mb-4">
                            <Package className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900">{selectedPackageInfo.name}</h4>
                              <p className="text-gray-600 text-sm">{selectedPackageInfo.shortDescription}</p>
                              <p className="text-primary font-medium mt-1">₹{selectedPackageInfo.price.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          {selectedPackageInfo.fasting && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                              <p className="text-amber-800 font-medium">Fasting Required</p>
                              <p className="text-amber-700">
                                This package requires {selectedPackageInfo.fastingHours} hours of fasting before the test.
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-600 mb-6">
                          Select a health package to see details
                        </p>
                      )}
                      
                      <h4 className="font-medium text-gray-900 mb-3">Important Notes:</h4>
                      <ul className="space-y-2 text-gray-600 text-sm mb-6">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Appointments are confirmed upon booking. You'll receive an email confirmation.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Please arrive 15 minutes before your scheduled appointment.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Bring a valid ID proof and your appointment confirmation.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Follow fasting guidelines if applicable for your selected package.</span>
                        </li>
                      </ul>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                        <span>Need help?</span>
                        <a href="tel:+1234567890" className="text-primary hover:underline">Call us</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
