import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-success to-primary rounded-full">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">CLEARVEST</span>
              <span className="text-xs text-danger font-medium">KNOW WHAT YOU OWN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/input"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/input') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Analyze Portfolio
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              About
            </a>
          </nav>

          <div className="hidden md:block">
            <Link to="/input" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className={`block px-2 py-1 text-base font-medium rounded hover:bg-gray-100 ${
                isActive('/') ? 'text-primary' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/input"
              className={`block px-2 py-1 text-base font-medium rounded hover:bg-gray-100 ${
                isActive('/input') ? 'text-primary' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analyze Portfolio
            </Link>
            <a
              href="#features"
              className="block px-2 py-1 text-base font-medium text-gray-600 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-2 py-1 text-base font-medium text-gray-600 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <div className="pt-2">
              <Link
                to="/input"
                className="btn-primary w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;