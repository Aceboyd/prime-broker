import React, { useState } from 'react';
import { Bitcoin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative z-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Prime Investment
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signin"
            className="px-3 py-1 text-sm text-white hover:text-blue-400 transition-colors"
            aria-label="Sign in"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm"
            aria-label="Get started"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 right-0 mx-4 bg-gray-900/95 p-4 rounded-lg shadow-lg flex flex-col space-y-3">
          <a href="#features" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>About</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>Contact</a>
          
          <div className="border-t border-gray-700 pt-3 flex flex-col space-y-2">
            <Link
              to="/signin"
              className="px-3 py-2 text-sm text-white hover:text-blue-400 transition-colors"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm text-center"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
