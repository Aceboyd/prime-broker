import React, { useState } from 'react';
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

const Dashboard = () => {
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
      {/* Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-80 z-30">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main content area (scrollable) */}
      <div className="flex-1 lg:ml-80 h-full overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;