
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePackages = () => setIsPackagesOpen(!isPackagesOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { 
      name: 'Packages', 
      path: '/packages',
      isDropdown: true,
      dropdownItems: [
        { name: 'All Packages', path: '/packages' },
        { name: 'Basic Health Checkup', path: '/packages/basic-health-checkup' },
        { name: 'Comprehensive Health Checkup', path: '/packages/comprehensive-health-checkup' },
        { name: 'Cardiac Health Checkup', path: '/packages/cardiac-health-checkup' },
        { name: 'Diabetes Health Checkup', path: '/packages/diabetes-health-checkup' },
      ]
    },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-medium text-primary">DiagnoHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => 
              !link.isDropdown ? (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium px-1 py-2 transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <div key={link.name} className="relative group">
                  <button 
                    className={`flex items-center text-sm font-medium px-1 py-2 transition-colors hover:text-primary ${
                      location.pathname.includes(link.path) ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          {navLinks.map((link) => 
            !link.isDropdown ? (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'text-primary bg-sky-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <div key={link.name}>
                <button
                  onClick={togglePackages}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.includes(link.path) ? 'text-primary bg-sky-50' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isPackagesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPackagesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
