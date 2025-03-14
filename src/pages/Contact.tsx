
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Phone",
      details: ["+1 (234) 567-890", "+1 (234) 567-891"],
      action: { label: "Call now", href: "tel:+1234567890" }
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email",
      details: ["info@diagnohub.com", "support@diagnohub.com"],
      action: { label: "Send email", href: "mailto:info@diagnohub.com" }
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Address",
      details: ["123 Medical Plaza,", "Healthcare District, City, State 12345"],
      action: { label: "Get directions", href: "#" }
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Working Hours",
      details: ["Monday - Saturday:", "7:00 AM - 9:00 PM"],
      action: { label: "Book appointment", href: "/book-appointment" }
    }
  ];
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Message Sent",
        description: "We have received your message and will get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
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
                Contact Us
              </h1>
              <p className="text-lg text-gray-600">
                Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div>
                <div className="glass rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-50 p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Get In Touch
                    </h3>
                    <p className="text-gray-600">We're here to help and answer any questions</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {contactInfo.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                              {item.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                            {item.details.map((detail, i) => (
                              <p key={i} className="text-gray-600">{detail}</p>
                            ))}
                            <a 
                              href={item.action.href} 
                              className="inline-block mt-2 text-sm text-primary hover:text-primary/80 font-medium"
                            >
                              {item.action.label}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass rounded-xl p-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">
                    Send Us a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
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
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
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
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          placeholder="How can we help you?"
                          rows={6}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Location
              </h2>
              <p className="text-gray-600">
                Visit our diagnostic center for high-quality healthcare services. 
                We're conveniently located in the Healthcare District.
              </p>
            </div>
            
            <div className="glass rounded-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.979681!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1617980078153!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="DiagnoHub Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
