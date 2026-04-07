import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  TrendingUp,
  User,
  Home,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Briefcase,
  LineChart,
  Bitcoin,
  Users,
  Bot,
  Coins,
  Folder,
  LifeBuoy,
  MessageCircle,
} from 'lucide-react';
import axios from 'axios';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'https://prime-api-gm2o.onrender.com/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          }
        );

        if (response.data?.success && isMounted) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const menuSections = [
    {
      title: 'Main',
      items: [
        { id: 'overview', icon: Home, label: 'Portfolio Overview' },
        { id: 'account', icon: User, label: 'Account Settings' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { id: 'fund-account', icon: ArrowDownToLine, label: 'Fund Account', mapTo: 'deposit-withdraw' },
        { id: 'withdraw-funds', icon: ArrowUpFromLine, label: 'Withdraw Funds', mapTo: 'withdrawal' },
        { id: 'transactions', icon: History, label: 'Transaction History' },
      ],
    },
    {
      title: 'Investments',
      items: [
        { id: 'investment-plans', icon: Briefcase, label: 'Investment Plans', mapTo: 'investment-plans' },
        { id: 'stock-investment', icon: TrendingUp, label: 'Stock Investment', mapTo: 'stock-investment' },
        { id: 'stock-market', icon: LineChart, label: 'Stock Market', mapTo: 'market-trades' },
        { id: 'crypto-exchange', icon: Bitcoin, label: 'Crypto Exchange', mapTo: 'crypto-exchange' },
        { id: 'copy-trading', icon: Users, label: 'Copy Trading', mapTo: 'copy-trading' },
        { id: 'bot-trading', icon: Bot, label: 'Bot Trading', mapTo: 'bot-trading' },
        { id: 'crypto-staking', icon: Coins, label: 'Crypto Staking', mapTo: 'crypto-staking' },
      ],
    },
    {
      title: 'Services',
      items: [],
    },
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
        className={`fixed top-0 left-0 h-screen w-80 text-white z-50 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:transform-none shadow-lg lg:shadow-none
        bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#0b1220]`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Prime</p>
                <p className="text-base font-semibold text-gray-100">Investment</p>
              </div>
            </div>
          </div>

          {/* User + Balance */}
          <div className="px-6 py-5 border-b border-gray-800/60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                <span className="text-white font-semibold text-base">
                  {user
                    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
                    : '...'}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-100">
                  {user ? `${user.first_name} ${user.last_name}` : 'Loading user...'}
                </p>
                <p className="text-[10px] text-gray-400">Account Holder</p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Total Balance</p>
              <p className="text-xl font-semibold text-gray-100 mt-1">
                {user ? `$${Number(user.total_balance || 0).toLocaleString()}` : '$0.00'}
              </p>
              <p className="text-[10px] text-emerald-400 mt-1">+12.34% today</p>
            </div>
          </div>

          {/* Scrollable Menu */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-[#0b1220] transition-all duration-300">
            <style>
              {`
                .scrollbar-thin::-webkit-scrollbar {
                  width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                  background: #1f2937;
                  border-radius: 9999px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                  background: #0b1220;
                  border-radius: 9999px;
                }
              `}
            </style>
            <ul className="space-y-8">
              {menuSections.map((section) => (
                <li key={section.title}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                    {section.title}
                  </p>
                  <ul className="space-y-3">
                    {section.items.map(({ id, icon: Icon, label, mapTo }) => {
                      const isActive = activeTab === (mapTo || id);
                      return (
                        <li key={id}>
                          <button
                            onClick={() => {
                              setActiveTab(mapTo || id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                            ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]'
                                : 'text-gray-200/90 hover:bg-white/5 hover:text-white'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="font-medium text-base">{label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Support Card */}
            <div className="mt-10 rounded-2xl border border-emerald-500/60 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <LifeBuoy className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
              <p className="text-base font-semibold text-gray-100">Need Help?</p>
              <p className="text-xs text-gray-400 mt-1">Our support team is available 24/7</p>
            </div>
          </div>
          <button
                className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-100 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                onClick={() => setActiveTab('support')}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Contact Support</span>
              </button>
            </div>
          </nav>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
