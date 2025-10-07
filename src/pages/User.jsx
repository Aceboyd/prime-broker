import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardOverview from '../components/DashboardOverview';
import DepositAndWithdrawal from '../components/DepositAndWithdrawal';
import KYCVerification from '../components/KYCVerification';
import AccountInfo from '../components/AccountInfo';
import Transactions from '../components/Transactions';
import MarketTrades from '../components/MarketTrades';
import Trader from '../components/Trader';
import ChangePassword from '../components/ChangePassword';
import LoginHistory from '../components/LoginHistory';

const User = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'deposit-withdraw':
        return <DepositAndWithdrawal />;
      case 'transactions':
        return <Transactions />;
      case 'market-trades':
        return <MarketTrades />;
      case 'trader':
        return <Trader />;
      case 'kyc':
        return <KYCVerification />;
      case 'account':
        return <AccountInfo setActiveTab={setActiveTab} />;
      case 'change-password':
        return <ChangePassword setActiveTab={setActiveTab} />;
      case 'login-history':
        return <LoginHistory setActiveTab={setActiveTab} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-900">
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
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main content with styled scroll */}
      <div className="flex-1 lg:ml-72 h-full overflow-y-auto p-4 sm:p-6 
        scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600">
        
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
    </div>
  );
};

export default User;
