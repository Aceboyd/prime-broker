import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/crypto-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Prime Investment
            </span>
            <br />
            <span>Your Gateway to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Crypto Success
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of investors who trust Prime Investment for secure, profitable
            cryptocurrency trading and investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to="/signup"
              className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-lg font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              aria-label="Start investing"
            >
              Start Investing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="px-6 py-3 border-2 border-white/20 rounded-lg text-lg font-semibold hover:border-white/40 transition-all duration-300 bg-white/10"
              onClick={() => alert('Demo coming soon!')}
              aria-label="Watch demo"
            >
              Watch Demo
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                <AnimatedCounter end={50000} duration={2000} prefix="$" suffix="M+" />
              </div>
              <p className="text-gray-400 text-sm">Total Volume Traded</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">
                <AnimatedCounter end={125000} duration={2500} suffix="+" />
              </div>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">
                <AnimatedCounter end={99.9} duration={2000} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;