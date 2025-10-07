import React from 'react';
import { LayoutDashboard, Users, TrendingUp, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Users', key: 'users', icon: LayoutDashboard },
    { label: 'Transactions', key: 'transactions', icon: CreditCard },
    { label: 'Traders', key: 'traders', icon: TrendingUp },
    { label: 'Wallet Addresses', key: 'wallets', icon: Users },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Crypto Admin</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 ${
              activeTab === item.key ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
};
