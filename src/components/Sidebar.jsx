import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bitcoin,
  LayoutDashboard,
  PieChart,
  Shield,
  User,
  CreditCard,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
  Users,
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'deposit-withdraw', icon: PieChart, label: 'Deposit and Withdraw' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
    { id: 'market-trades', icon: TrendingUp, label: 'Market Trades' },
    { id: 'trader', icon: Users, label: 'Trader' },
    { id: 'kyc', icon: Shield, label: 'KYC Verification' },
    { id: 'account', icon: User, label: 'Account Settings' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white shadow-md hover:bg-gray-700 transition-colors duration-200"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:transform-none shadow-lg lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center justify-center p-4 border-b border-gray-800">
            <Link to="/" className="flex items-center space-x-3 focus:outline-none">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Bitcoin className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Prime Investment
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-1 border-b border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">JD</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-sm text-gray-400">Premium Member</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Portfolio Value</span>
                <Bell className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-3xl font-bold text-white mt-1">$47,832.50</p>
              <p className="text-sm text-green-400">+12.34% today</p>
            </div>
          </div>

          {/* Scrollable Menu */}
          <nav
            className="flex-1 overflow-y-auto px-4 py-4 
              scrollbar-thin 
              scrollbar-thumb-rounded-full 
              scrollbar-track-rounded-full 
              scrollbar-track-gray-900 
              transition-all duration-300"
          >
            <style>
              {`
                /* Custom Gradient Scrollbar */
                .scrollbar-thin::-webkit-scrollbar {
                  width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                  border-radius: 9999px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                  background: #111827;
                  border-radius: 9999px;
                }
              `}
            </style>
            <ul className="space-y-2">
              {menuItems.map(({ id, icon: Icon, label }) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      setActiveTab(id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    aria-current={activeTab === id ? 'page' : undefined}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-base">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-2 border-t border-gray-800">
            <button
              className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                /* Add sign out logic */
              }}
            >
              <LogOut className="w-6 h-6" />
              <span className="font-medium text-base">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
