
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  LogIn, 
  Home,
  Info,
  HeartPulse,
  Package,
  CalendarCheck
} from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const location = useLocation();
  const { navigateTo } = useNavigation();

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
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About Us', path: '/about', icon: <Info className="w-5 h-5" /> },
    { name: 'Services', path: '/services', icon: <HeartPulse className="w-5 h-5" /> },
    { 
      name: 'Packages', 
      path: '/packages',
      icon: <Package className="w-5 h-5" />,
      isDropdown: true,
      dropdownItems: [
        { name: 'All Packages', path: '/packages' },
        { name: 'Basic Health Checkup', path: '/packages/basic-health-checkup' },
        { name: 'Comprehensive Health Checkup', path: '/packages/comprehensive-health-checkup' },
        { name: 'Cardiac Health Checkup', path: '/packages/cardiac-health-checkup' },
        { name: 'Diabetes Health Checkup', path: '/packages/diabetes-health-checkup' },
      ]
    },
    { name: 'Book Appointment', path: '/booking-options', icon: <CalendarCheck className="w-5 h-5" /> },
    { name: 'Login / Signup', path: '/auth', icon: <LogIn className="w-5 h-5" /> },
  ];

  return (
    <TooltipProvider>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a 
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              href="/"
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <span className="text-xl font-sf font-bold text-primary dark:text-white">DiagnoHub</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => 
                !link.isDropdown ? (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <a 
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(link.path);
                        }}
                        href={link.path}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors hover:bg-gray-800 ${
                          location.pathname === link.path ? 'text-primary bg-gray-800' : 'text-gray-300'
                        } cursor-pointer`}
                      >
                        {link.icon}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="rounded-xl bg-gray-800 px-3 py-1.5 text-sm font-medium shadow-md">
                      {link.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={link.name} className="relative group">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          className={`flex items-center justify-center p-2 rounded-full transition-colors hover:bg-gray-800 ${
                            location.pathname.includes(link.path) ? 'text-primary bg-gray-800' : 'text-gray-300'
                          }`}
                        >
                          {link.icon}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="rounded-xl bg-gray-800 px-3 py-1.5 text-sm font-medium shadow-md">
                        {link.name}
                      </TooltipContent>
                    </Tooltip>
                    <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(item.path);
                          }}
                          href={item.path}
                          className="block px-4 py-2 text-sm font-sf text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Mobile Nav Toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-primary hover:bg-gray-800 focus:outline-none"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 shadow-lg rounded-b-lg">
            {navLinks.map((link) => 
              !link.isDropdown ? (
                <a
                  key={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.path);
                  }}
                  href={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-sf font-medium ${
                    location.pathname === link.path ? 'text-primary bg-gray-800' : 'text-gray-300 hover:bg-gray-800'
                  } cursor-pointer`}
                >
                  {link.icon}
                  {link.name}
                </a>
              ) : (
                <div key={link.name}>
                  <button
                    onClick={togglePackages}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-base font-sf font-medium ${
                      location.pathname.includes(link.path) ? 'text-primary bg-gray-800' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isPackagesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isPackagesOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(item.path);
                          }}
                          href={item.path}
                          className="block px-3 py-2 rounded-md text-sm font-sf font-medium text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
