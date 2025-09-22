
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;