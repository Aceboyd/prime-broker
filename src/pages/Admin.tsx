import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UsersTable } from '../components2/UsersTable';
import { TransactionsTable } from '../components2/TransactionsTable';
import { TradersTable } from '../components2/TradersTable';
import { WalletAddressesTable } from '../components2/WalletAddressesTable';
import AdminSidebar from '../components2/AdminSidebar';
import KycReview from '../components2/KycReview';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('No token found. Already logged out.');
        console.log('No token found in localStorage');
        navigate('/admin');
        return;
      }

      const response = await axios.post(
        'https://prime-api-gm2o.onrender.com/auth/admin/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (response.data.success) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        console.log('Logout successful, token and admin data cleared from localStorage');
        toast.success('Logged out successfully!');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        toast.error(response.data.message || 'Logout failed.');
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      toast.error('Error during logout. Please try again.');
      console.error('Logout error:', error.response?.data || error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
            <UsersTable />
          </div>
        );
      case 'transactions':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Transactions</h2>
            <TransactionsTable />
          </div>
        );
      case 'kyc':
        return (
          <div>
            <KycReview />
          </div>
        );
      case 'traders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Traders</h2>
            <TradersTable />
          </div>
        );
      case 'wallets':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Wallet Addresses</h2>
            <WalletAddressesTable />
          </div>
        );
      default:
        return <UsersTable />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col md:flex-row relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)] pointer-events-none"></div>

      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="bg-white/5 border-b border-white/10 px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 backdrop-blur">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/70">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-600/90 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{renderActiveTab()}</main>
      </div>
    </div>
  );
};

export default Admin;
