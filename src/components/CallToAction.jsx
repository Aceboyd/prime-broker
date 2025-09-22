import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your Crypto Journey?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join Prime Investment today and take control of your financial future
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300"
          aria-label="Create a free account"
        >
          Create Free Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;