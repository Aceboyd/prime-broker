import React, { useState } from 'react';
import { UsersTable } from '../components2/UsersTable';
import { TransactionsTable } from '../components2/TransactionsTable';
import { TradersTable } from '../components2/TradersTable';
import { WalletAddressesTable } from '../components2/WalletAddressesTable';
import { AdminSidebar } from '../components2/AdminSidebar';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return <UsersTable />;
      case 'transactions':
        return <TransactionsTable />;
      case 'traders':
        return <TradersTable />;
      case 'wallets':
        return <WalletAddressesTable />;
      default:
        return <UsersTable />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, Admin</span>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
