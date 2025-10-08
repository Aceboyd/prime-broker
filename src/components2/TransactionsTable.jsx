import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Check, X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editForm, setEditForm] = useState({
    type: '',
    asset: '',
    amount: '',
    value: '',
    fee: '',
    status: 'pending',
  });
  const [createForm, setCreateForm] = useState({
    type: 'deposit',
    asset: '',
    amount: '',
    value: '',
    fee: '',
    status: 'pending',
    userId: '',
  });

  const assets = ['BTC', 'ETH', 'USDT'];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) fetchTransactions();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://prime-api-gm2o.onrender.com/admin/users', {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        toast.error('Failed to fetch users', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching users', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching users:', error.response?.data || error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`https://prime-api-gm2o.onrender.com/admin/users/${userId}/transactions`, {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setTransactions(res.data.data);
        toast.success('Transactions fetched successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to fetch transactions', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching transactions', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching transactions:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async () => {
    if (!createForm.userId) {
      toast.error('Please select a user', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (createForm.amount === '' || createForm.value === '' || createForm.fee === '') {
      toast.error('Amount, value, and fee are required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (parseFloat(createForm.amount) < 0 || parseFloat(createForm.value) < 0 || parseFloat(createForm.fee) < 0) {
      toast.error('Amount, value, and fee cannot be negative', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (!createForm.asset) {
      toast.error('Please select an asset', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setIsCreating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...createForm,
        amount: parseFloat(createForm.amount),
        value: parseFloat(createForm.value),
        fee: parseFloat(createForm.fee),
      };
      const res = await axios.post(
        `https://prime-api-gm2o.onrender.com/admin/transactions`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
        }
      );
      if (res.data.success) {
        toast.success('Transaction created successfully! User balance may be updated.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowCreateForm(false);
        setCreateForm({
          type: 'deposit',
          asset: '',
          amount: '',
          value: '',
          fee: '',
          status: 'pending',
          userId: '',
        });
        if (createForm.userId === userId) {
          fetchTransactions();
        }
      } else {
        toast.error('Failed to create transaction', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating transaction', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error creating transaction:', error.response?.data || error);
    } finally {
      setIsCreating(false);
    }
  };

  const updateTransaction = async (transactionId) => {
    if (editForm.amount === '' || editForm.value === '' || editForm.fee === '') {
      toast.error('Amount, value, and fee are required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (parseFloat(editForm.amount) < 0 || parseFloat(editForm.value) < 0 || parseFloat(editForm.fee) < 0) {
      toast.error('Amount, value, and fee cannot be negative', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (!editForm.asset) {
      toast.error('Please select an asset', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...editForm,
        amount: parseFloat(editForm.amount),
        value: parseFloat(editForm.value),
        fee: parseFloat(editForm.fee),
      };
      const res = await axios.put(
        `https://prime-api-gm2o.onrender.com/admin/users/${userId}/transactions/${transactionId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
        }
      );
      if (res.data.success) {
        toast.success('Transaction updated successfully! User balance may be updated.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setEditingTransactionId(null);
        fetchTransactions();
      } else {
        toast.error('Failed to update transaction', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating transaction', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error updating transaction:', error.response?.data || error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.delete(
        `https://prime-api-gm2o.onrender.com/admin/users/${userId}/transactions/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
        }
      );
      if (res.data.success) {
        toast.success('Transaction deleted successfully! User balance may be updated.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        fetchTransactions();
      } else {
        toast.error('Failed to delete transaction', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting transaction', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error deleting transaction:', error.response?.data || error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="w-full max-w-[calc(100vw-280px)] mx-auto glass-effect rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Transactions Management</h2>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full sm:max-w-xs min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name} ({user.email})
            </option>
          ))}
        </select>
        <button
          onClick={fetchTransactions}
          disabled={!userId}
          className={`mt-2 sm:mt-0 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
            !userId ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          Fetch Transactions
        </button>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setCreateForm({ ...createForm, userId: userId });
          }}
          disabled={!userId}
          className={`mt-2 sm:mt-0 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
            !userId ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Transaction
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Create New Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={createForm.userId}
              onChange={(e) => setCreateForm({ ...createForm, userId: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} ({user.email})
                </option>
              ))}
            </select>
            <select
              value={createForm.type}
              onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
            >
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdrawal</option>
              <option value="trade">Trade</option>
            </select>
            <select
              value={createForm.asset}
              onChange={(e) => setCreateForm({ ...createForm, asset: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
            >
              <option value="">Select Asset</option>
              {assets.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="any"
              value={createForm.amount}
              onChange={(e) => setCreateForm({ ...createForm, amount: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
              placeholder="Amount"
            />
            <input
              type="number"
              step="any"
              value={createForm.value}
              onChange={(e) => setCreateForm({ ...createForm, value: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
              placeholder="Value"
            />
            <input
              type="number"
              step="any"
              value={createForm.fee}
              onChange={(e) => setCreateForm({ ...createForm, fee: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
              placeholder="Fee"
            />
            <select
              value={createForm.status}
              onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
              className="min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
            <button
              onClick={createTransaction}
              disabled={isCreating}
              className={`flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                isCreating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Check className="w-4 h-4 mr-2" />
              {isCreating ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              disabled={isCreating}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-lg">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400 text-lg">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 text-sm md:text-base">
            <thead>
              <tr className="border-b border-white/20 sticky top-0 bg-gray-900/70 backdrop-blur-sm">
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[140px]">User</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Type</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Asset</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Amount</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Value</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Fee</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Status</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[140px]">Date</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                  {editingTransactionId === transaction.id ? (
                    <>
                      <td className="py-4 px-4 md:px-6 break-words min-w-[140px]">
                        {transaction.user?.first_name} {transaction.user?.last_name}
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <select
                          value={editForm.type}
                          onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                        >
                          <option value="deposit">Deposit</option>
                          <option value="withdraw">Withdrawal</option>
                          <option value="trade">Trade</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <select
                          value={editForm.asset}
                          onChange={(e) => setEditForm({ ...editForm, asset: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                        >
                          <option value="">Select Asset</option>
                          {assets.map((asset) => (
                            <option key={asset} value={asset}>
                              {asset}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          step="any"
                          value={editForm.amount}
                          onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                          placeholder="Amount"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          step="any"
                          value={editForm.value}
                          onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                          placeholder="Value"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          step="any"
                          value={editForm.fee}
                          onChange={(e) => setEditForm({ ...editForm, fee: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                          placeholder="Fee"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-white transition-all text-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 md:px-6 min-w-[140px]">
                        {new Date(transaction.date).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 md:px-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 min-w-[180px]">
                        <button
                          onClick={() => updateTransaction(transaction.id)}
                          disabled={isUpdating}
                          className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingTransactionId(null)}
                          disabled={isUpdating}
                          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-4 md:px-6 break-words min-w-[140px]">
                        {transaction.user?.first_name} {transaction.user?.last_name}
                      </td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{transaction.type}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{transaction.asset}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{transaction.amount.toFixed(4)}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">${transaction.value.toFixed(2)}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">${transaction.fee.toFixed(2)}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            transaction.status === 'completed'
                              ? 'bg-green-500/30 text-green-300'
                              : transaction.status === 'failed'
                              ? 'bg-red-500/30 text-red-300'
                              : 'bg-yellow-500/30 text-yellow-300'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 md:px-6 min-w-[140px]">{new Date(transaction.date).toLocaleString()}</td>
                      <td className="py-4 px-4 md:px-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 min-w-[180px]">
                        <button
                          onClick={() => {
                            setEditingTransactionId(transaction.id);
                            setEditForm({
                              type: transaction.type,
                              asset: transaction.asset,
                              amount: transaction.amount.toString(),
                              value: transaction.value.toString(),
                              fee: transaction.fee.toString(),
                              status: transaction.status,
                            });
                          }}
                          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(transaction.id)}
                          disabled={isDeleting}
                          className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                            isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-effect rounded-2xl p-8 max-w-lg w-full border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Are you sure you want to delete this transaction for{' '}
              {transactions.find((t) => t.id === deleteConfirmId)?.user?.first_name}{' '}
              {transactions.find((t) => t.id === deleteConfirmId)?.user?.last_name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => deleteTransaction(deleteConfirmId)}
                disabled={isDeleting}
                className={`flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
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