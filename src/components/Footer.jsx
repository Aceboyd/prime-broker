import React from 'react';
import { Bitcoin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Prime Investment
            </span>
          </div>
          <p className="text-gray-400 text-sm text-center md:text-right">
            © {currentYear} Prime Investment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;