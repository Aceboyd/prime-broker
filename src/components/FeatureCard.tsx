import React from 'react';
import { Shield, TrendingUp, Zap, Users, Globe, Bitcoin } from 'lucide-react';

const iconMap = {
  shield: <Shield className="w-8 h-8" />,
  'trending-up': <TrendingUp className="w-8 h-8" />,
  zap: <Zap className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  bitcoin: <Bitcoin className="w-8 h-8" />,
};

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div className={`p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all ${gradient}`}>
      <div className="flex items-center justify-center mb-4">{iconMap[icon]}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;