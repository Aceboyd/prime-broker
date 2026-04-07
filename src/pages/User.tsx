import React, { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header2 from '../components/Header2';
import DashboardOverview from '../components/dashboardoverview';
import DepositFunds from '../components/DepositFunds';
import WithdrawFunds from '../components/WithdrawFunds';
import KYCVerification from '../components/KYCVerification';
import AccountInfo from '../components/AccountInfo';
import Transactions from '../components/Transactions';
import MarketTrades from '../components/MarketTrades';
import InvestmentPlans from '../components/InvestmentPlans';
import StockInvestmentPlans from '../components/StockInvestmentPlans';
import CryptoExchange from '../components/CryptoExchange';
import CopyTrading from '../components/CopyTrading';
import BotTrading, { BotItem } from '../components/BotTrading';
import BotSubscriptions from '../components/BotSubscriptions';
import BotDetail from '../components/BotDetail';
import CryptoStaking, { StakingPlan } from '../components/CryptoStaking';
import CryptoStakingDetail from '../components/CryptoStakingDetail';
import Support from '../components/Support';
import Trader from '../components/Trader';
import ChangePassword from '../components/ChangePassword';
import LoginHistory from '../components/LoginHistory';

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [withdrawLoginOpen, setWithdrawLoginOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotItem | null>(null);
  const [selectedStakingPlan, setSelectedStakingPlan] = useState<StakingPlan | null>(null);

  const tabRoutes = useMemo(
    () => ({
      overview: '/user-dashboard',
      'deposit-withdraw': '/user-dashboard/fund-account',
      withdrawal: '/user-dashboard/withdraw-funds',
      transactions: '/user-dashboard/transactions',
      'market-trades': '/user-dashboard/stock-market',
      'investment-plans': '/user-dashboard/investment-plans',
      'stock-investment': '/user-dashboard/stock-investment',
      'crypto-exchange': '/user-dashboard/crypto-exchange',
      'copy-trading': '/user-dashboard/copy-trading',
      trader: '/user-dashboard/trader',
      'bot-trading': '/user-dashboard/bot-trading',
      'bot-subscriptions': '/user-dashboard/bot-subscriptions',
      'bot-detail': '/user-dashboard/bot-detail',
      'crypto-staking': '/user-dashboard/crypto-staking',
      'crypto-staking-detail': '/user-dashboard/crypto-staking-detail',
      kyc: '/user-dashboard/kyc',
      account: '/user-dashboard/account',
      'change-password': '/user-dashboard/change-password',
      'login-history': '/user-dashboard/login-history',
      support: '/user-dashboard/support',
    }),
    []
  );

  const routeToTab = useMemo(() => {
    const entries = Object.entries(tabRoutes).map(([key, value]) => [value, key] as const);
    return Object.fromEntries(entries);
  }, [tabRoutes]);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    const target = tabRoutes[tab as keyof typeof tabRoutes] || '/user-dashboard';
    if (location.pathname !== target) {
      navigate(target);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview setActiveTab={handleSetActiveTab} />;
      case 'deposit-withdraw':
        return <DepositFunds />;
      case 'withdrawal':
        return <WithdrawFunds />;
      case 'transactions':
        return <Transactions />;
      case 'market-trades':
        return <MarketTrades />;
      case 'investment-plans':
        return <InvestmentPlans />;
      case 'stock-investment':
        return <StockInvestmentPlans />;
      case 'crypto-exchange':
        return <CryptoExchange />;
      case 'crypto-staking':
        return (
          <CryptoStaking
            onViewDetails={(plan) => {
              setSelectedStakingPlan(plan);
              handleSetActiveTab('crypto-staking-detail');
            }}
          />
        );
      case 'crypto-staking-detail':
        return (
          <CryptoStakingDetail
            plan={selectedStakingPlan}
            onBack={() => handleSetActiveTab('crypto-staking')}
          />
        );
      case 'copy-trading':
        return <CopyTrading />;
      case 'bot-trading':
        return (
          <BotTrading
            onSubscriptions={() => handleSetActiveTab('bot-subscriptions')}
            onSubscribe={(bot) => {
              setSelectedBot(bot);
              handleSetActiveTab('bot-detail');
            }}
          />
        );
      case 'bot-subscriptions':
        return (
          <BotSubscriptions
            onBrowseBots={() => handleSetActiveTab('bot-trading')}
            onViewBot={() => handleSetActiveTab('bot-detail')}
          />
        );
      case 'bot-detail':
        return <BotDetail onBack={() => handleSetActiveTab('bot-trading')} bot={selectedBot} />;
      case 'trader':
        return <Trader />;
      case 'kyc':
        return <KYCVerification />;
      case 'account':
        return <AccountInfo setActiveTab={handleSetActiveTab} />;
      case 'change-password':
        return <ChangePassword setActiveTab={handleSetActiveTab} />;
      case 'login-history':
        return <LoginHistory setActiveTab={handleSetActiveTab} />;
      case 'support':
        return <Support />;
      default:
        return <DashboardOverview />;
    }
  };

  React.useEffect(() => {
    const tab = routeToTab[location.pathname];
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.pathname, routeToTab, activeTab]);

  React.useEffect(() => {
    if (activeTab === 'withdrawal') {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setWithdrawLoginOpen(true);
      }
    }
  }, [activeTab]);

  return (
    <div className={`h-screen w-screen flex overflow-hidden ${isLightMode ? 'bg-slate-100' : 'bg-gray-900'}`}>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar (mobile & desktop) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 transform bg-gray-800 transition-transform lg:translate-x-0 lg:block ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main content with styled scroll */}
      <div className={`flex-1 lg:ml-72 h-full overflow-y-auto p-4 sm:p-6 lg:pt-3
        scrollbar-thin ${isLightMode ? 'scrollbar-thumb-slate-300 scrollbar-track-slate-100' : 'scrollbar-thumb-gray-700 scrollbar-track-gray-900'} hover:scrollbar-thumb-gray-600`}>
        
        <Header2
          onKycClick={() => setKycModalOpen(true)}
          onTransactions={() => handleSetActiveTab('transactions')}
        />

        {/* KYC Modal */}
        {kycModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setKycModalOpen(false)}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1f2937] to-[#111827] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold text-white">KYC Verification</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Verify your identity to unlock all features
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <span className="text-emerald-400 text-xl">🛡️</span>
                  </div>
                  <p className="text-gray-300 mt-4">Your account is not verified</p>
                </div>
                <button
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 transition"
                  onClick={() => {
                    setKycModalOpen(false);
                    handleSetActiveTab('kyc');
                  }}
                >
                  Verify Account
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile top bar with toggle */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button
            className="p-2 rounded-md text-gray-200 hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          {sidebarOpen && (
            <button
              className="p-2 rounded-md text-gray-200 hover:bg-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {renderContent()}
      </div>

      {/* Withdraw Login Modal */}
      {withdrawLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setWithdrawLoginOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1f2937] to-[#111827] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Login Required</h3>
              <p className="text-sm text-gray-400 mt-2">
                Please log in to access withdrawals.
              </p>
            </div>
            <div className="p-6 space-y-3">
              <button
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 transition"
                onClick={() => (window.location.href = '/signin')}
              >
                Login
              </button>
              <button
                  className="w-full rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-medium py-3 transition"
                  onClick={() => {
                    setWithdrawLoginOpen(false);
                    handleSetActiveTab('overview');
                  }}
                >
                  Cancel
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
