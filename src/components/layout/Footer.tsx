
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-medium text-primary mb-4">DiagnoHub</h3>
            <p className="text-gray-600 mb-4">
              Providing quality healthcare diagnostics with advanced technology and compassionate care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-600 hover:text-primary transition-colors">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-gray-600 hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Packages */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Our Packages</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/packages/basic-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Basic Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/packages/comprehensive-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Comprehensive Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/packages/cardiac-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Cardiac Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/packages/diabetes-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Diabetes Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/packages/women-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Women's Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/packages/men-health-checkup" className="text-gray-600 hover:text-primary transition-colors">
                  Men's Health Checkup
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-600">
                  123 Medical Plaza, <br />
                  Healthcare District, <br />
                  City, State 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a href="mailto:info@diagnohub.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@diagnohub.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-600">
                  Mon-Sat: 7:00 AM - 9:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2023 DiagnoHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
