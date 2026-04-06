import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Prime Investment</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of cryptocurrency investment with our cutting-edge platform
            designed for both beginners and professional traders.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="shield"
            title="Bank-Level Security"
            description="Your investments are protected with military-grade encryption and multi-layer security protocols."
            gradient="from-green-500 to-green-600"
          />
          <FeatureCard
            icon="trending-up"
            title="Advanced Analytics"
            description="Make informed decisions with real-time market data, AI-powered insights, and comprehensive charts."
            gradient="from-blue-500 to-blue-600"
          />
          <FeatureCard
            icon="zap"
            title="Lightning Fast"
            description="Execute trades in milliseconds with our high-performance trading engine and global infrastructure."
            gradient="from-purple-500 to-purple-600"
          />
          <FeatureCard
            icon="users"
            title="24/7 Support"
            description="Our expert team is available around the clock to assist you with any questions or concerns."
            gradient="from-indigo-500 to-indigo-600"
          />
          <FeatureCard
            icon="globe"
            title="Global Access"
            description="Trade from anywhere in the world with our mobile-first platform and multi-currency support."
            gradient="from-teal-500 to-teal-600"
          />
          <FeatureCard
            icon="bitcoin"
            title="200+ Cryptocurrencies"
            description="Access a diverse portfolio of cryptocurrencies from Bitcoin to the latest DeFi tokens."
            gradient="from-orange-500 to-orange-600"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;