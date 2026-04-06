import React from 'react';
import { Bitcoin, Zap, TrendingUp, Shield, Globe, Users } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Bitcoin, position: 'top-20 left-20', delay: '0s' },
    { Icon: Zap, position: 'top-40 right-32', delay: '1s' },
    { Icon: TrendingUp, position: 'bottom-40 left-16', delay: '2s' },
    { Icon: Shield, position: 'top-60 left-1/2', delay: '0.5s' },
    { Icon: Globe, position: 'bottom-20 right-20', delay: '1.5s' },
    { Icon: Users, position: 'top-32 right-1/4', delay: '2.5s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ position, delay }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-20 transform`}
          style={{
            animation: `float 6s ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          <div className="p-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;