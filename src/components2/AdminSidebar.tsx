import React from 'react';
import { Users, DollarSign, Briefcase, Wallet, Shield } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5 mr-2" /> },
    { id: 'kyc', label: 'KYC', icon: <Shield className="w-5 h-5 mr-2" /> },
    { id: 'transactions', label: 'Transactions', icon: <DollarSign className="w-5 h-5 mr-2" /> },
    { id: 'traders', label: 'Traders', icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { id: 'wallets', label: 'Wallets', icon: <Wallet className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="w-full md:w-72 bg-slate-950/80 text-white p-5 flex flex-col gap-4 shadow-2xl border-b md:border-b-0 md:border-r border-white/10 backdrop-blur">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <p className="text-xs text-white/60">Prime Control</p>
        </div>
      </div>
      <div className="text-[11px] uppercase tracking-widest text-white/40 pt-2">Navigation</div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-white/70 hover:text-white hover:bg-white/5'
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
