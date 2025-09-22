import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Download,
  Search,
  Calendar,
  TrendingUp,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      type: 'trade',
      asset: 'Bitcoin',
      symbol: 'BTC',
      amount: '0.05',
      value: '$2,162.50',
      price: '$43,250.00',
      status: 'completed',
      date: '2025-01-15T14:30:00Z',
      fee: '$5.41'
    },
    {
      id: 'TXN002',
      type: 'trade',
      asset: 'Ethereum',
      symbol: 'ETH',
      amount: '1.2',
      value: '$3,468.60',
      price: '$2,890.50',
      status: 'completed',
      date: '2025-01-15T10:15:00Z',
      fee: '$8.67'
    },
    {
      id: 'TXN003',
      type: 'deposit',
      asset: 'USD',
      symbol: 'USD',
      amount: '5,000',
      value: '$5,000.00',
      price: '$1.00',
      status: 'pending',
      date: '2025-01-14T16:45:00Z',
      fee: '$0.00'
    },
    {
      id: 'TXN004',
      type: 'trade',
      asset: 'Cardano',
      symbol: 'ADA',
      amount: '2,500',
      value: '$1,125.00',
      price: '$0.45',
      status: 'completed',
      date: '2025-01-14T09:20:00Z',
      fee: '$2.81'
    },
    {
      id: 'TXN005',
      type: 'withdraw',
      asset: 'USD',
      symbol: 'USD',
      amount: '1,000',
      value: '$1,000.00',
      price: '$1.00',
      status: 'failed',
      date: '2025-01-13T11:30:00Z',
      fee: '$15.00'
    },
    {
      id: 'TXN006',
      type: 'trade',
      asset: 'Polkadot',
      symbol: 'DOT',
      amount: '200',
      value: '$1,564.00',
      price: '$7.82',
      status: 'completed',
      date: '2025-01-13T08:45:00Z',
      fee: '$3.91'
    }
  ]);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-green-400" />;
      case 'withdraw':
        return <ArrowUpRight className="w-5 h-5 text-red-400" />;
      case 'trade':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortTransactions = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...transactions].sort((a, b) => {
      if (key === 'amount' || key === 'value' || key === 'price' || key === 'fee') {
        const aVal = parseFloat(a[key].replace('$', '').replace(',', ''));
        const bVal = parseFloat(b[key].replace('$', '').replace(',', ''));
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      } else if (key === 'date') {
        return direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setTransactions(sorted);
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesSearch = tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateRange.start || !dateRange.end ||
      (new Date(tx.date) >= new Date(dateRange.start) && new Date(tx.date) <= new Date(dateRange.end + 'T23:59:59Z'));

    return matchesStatus && matchesType && matchesSearch && matchesDate;
  });

  const exportToCSV = () => {
    const rows = [['ID', 'Type', 'Asset', 'Symbol', 'Amount', 'Value', 'Price', 'Fee', 'Status', 'Date']];
    filteredTransactions.forEach(tx => {
      rows.push([
        tx.id,
        tx.type,
        tx.asset,
        tx.symbol,
        tx.amount,
        tx.value,
        tx.price,
        tx.fee,
        tx.status,
        formatDate(tx.date)
      ]);
    });
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  const refreshData = () => {
    const newTx = {
      id: `TXN${(Math.random() * 10000).toFixed(0).padStart(3, '0')}`,
      type: ['deposit', 'withdraw', 'trade'][Math.floor(Math.random() * 3)],
      asset: ['Bitcoin', 'Ethereum', 'USD', 'Cardano', 'Polkadot'][Math.floor(Math.random() * 5)],
      symbol: ['BTC', 'ETH', 'USD', 'ADA', 'DOT'][Math.floor(Math.random() * 5)],
      amount: (Math.random() * 1000).toFixed(2),
      value: `$${(Math.random() * 5000).toFixed(2)}`,
      price: `$${(Math.random() * 1000).toFixed(2)}`,
      status: ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)],
      date: new Date().toISOString(),
      fee: `$${(Math.random() * 20).toFixed(2)}`
    };
    setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Transaction History</h2>
          <p className="text-gray-400 text-sm">Track your deposits, withdrawals, and trades</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            <Filter className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-effect bg-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by asset, symbol, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="trade">Trade</option>
          </select>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <span className="text-gray-400">-</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-effect bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                {[
                  { key: 'id', label: 'Transaction' },
                  { key: 'asset', label: 'Asset' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'value', label: 'Value' },
                  { key: 'fee', label: 'Fee' },
                  { key: 'status', label: 'Status' },
                  { key: 'date', label: 'Date' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => sortTransactions(key)}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortConfig.key === key && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white capitalize">
                          {transaction.type}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 bg-gradient-to-r ${transaction.symbol === 'BTC' ? 'from-orange-500 to-yellow-500' : transaction.symbol === 'ETH' ? 'from-blue-500 to-blue-600' : transaction.symbol === 'USD' ? 'from-green-500 to-green-600' : 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center mr-3`}>
                        <span className="text-white text-xs font-bold">
                          {transaction.symbol.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {transaction.asset}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {transaction.amount} {transaction.symbol}
                    </div>
                    <div className="text-xs text-gray-400">
                      @ {transaction.price}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                    {transaction.value}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {transaction.fee}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(transaction.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No transactions found</div>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-2 bg-green-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors">
            2
          </button>
          <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;