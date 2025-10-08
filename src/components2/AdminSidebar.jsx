import React from 'react';
import { Users, DollarSign, Briefcase, Wallet } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5 mr-2" /> },
    { id: 'transactions', label: 'Transactions', icon: <DollarSign className="w-5 h-5 mr-2" /> },
    { id: 'traders', label: 'Traders', icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { id: 'wallets', label: 'Wallets', icon: <Wallet className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 flex flex-col space-y-4 shadow-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AdminSidebar;