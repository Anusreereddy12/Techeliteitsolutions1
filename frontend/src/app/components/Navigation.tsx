import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              TechElite
            </h1>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`transition-colors ${isActive('/services') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Services
              </Link>
              
              {/* Courses Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <button 
                  className={`flex items-center gap-1 transition-colors ${
                    location.pathname.startsWith('/courses') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Courses
                  <ChevronDown size={16} className={`transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCoursesOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 mt-1">
                    <Link 
                      to="/courses/online" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Online Courses
                    </Link>
                    <Link 
                      to="/courses/offline" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Offline Courses
                    </Link>
                    <Link 
                      to="/courses/placements" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Placements
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive('/contact') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            
            {/* Mobile Courses Dropdown */}
            <div>
              <button 
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors w-full"
              >
                Courses
                <ChevronDown size={16} className={`transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCoursesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="/courses/online" className="block text-gray-600 hover:text-blue-600 transition-colors">
                    Online Courses
                  </Link>
                  <Link to="/courses/offline" className="block text-gray-600 hover:text-blue-600 transition-colors">
                    Offline Courses
                  </Link>
                  <Link to="/courses/placements" className="block text-gray-600 hover:text-blue-600 transition-colors">
                    Placements
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <div className="flex flex-col gap-2">
              <Link to="/login" className="block text-gray-700 hover:text-blue-600 transition-colors font-semibold text-center">
                Login
              </Link>
              <Link to="/register" className="block bg-blue-600 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}