import React, { useState } from 'react';
import { Bitcoin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative z-50 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Prime Investment
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 right-6 bg-gray-900/95 p-4 rounded-lg shadow-lg flex flex-col space-y-2">
            <a href="#features" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>Features</a>
            <a href="#about" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>About</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>Contact</a>
          </nav>
        )}

        <div className="flex items-center space-x-4">
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
      </div>
    </header>
  );
};

export default Header;