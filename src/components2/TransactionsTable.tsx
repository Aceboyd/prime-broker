import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowDownToLine, ArrowUpFromLine, Repeat, Inbox, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [activeTab, setActiveTab] = useState('deposit');
  const [form, setForm] = useState({
    type: 'deposit',
    asset: '',
    amount: '',
    value: '',
    fee: '',
    status: 'pending',
    userId: '',
  });

  const assets = ['BTC', 'ETH', 'USDT'];
  const API_BASE = 'https://prime-api-gm2o.onrender.com';

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) fetchTransactions();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching users');
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_BASE}/admin/users/${userId}/transactions`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.data.success) {
        setTransactions(res.data.data);
      } else {
        toast.error('Failed to fetch transactions');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!form.userId) return 'Please select a user';
    if (!form.asset) return 'Please select an asset';
    if (form.amount === '' || form.value === '' || form.fee === '') return 'Amount, value, and fee are required';
    if (Number(form.amount) < 0 || Number(form.value) < 0 || Number(form.fee) < 0) return 'Values cannot be negative';
    return '';
  };

  const submitTransaction = async () => {
    const error = validateForm();
    if (error) return toast.error(error);
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...form,
        amount: parseFloat(form.amount),
        value: parseFloat(form.value),
        fee: parseFloat(form.fee),
      };
      const url = editingTransactionId
        ? `${API_BASE}/admin/users/${userId}/transactions/${editingTransactionId}`
        : `${API_BASE}/admin/transactions`;
      const method = editingTransactionId ? axios.put : axios.post;
      const res = await method(url, payload, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.data.success) {
        toast.success(editingTransactionId ? 'Transaction updated!' : 'Transaction created!');
        setShowForm(false);
        setEditingTransactionId(null);
        setForm({
          type: 'deposit',
          asset: '',
          amount: '',
          value: '',
          fee: '',
          status: 'pending',
          userId: userId,
        });
        fetchTransactions();
      } else {
        toast.error('Failed to save transaction');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.delete(`${API_BASE}/admin/users/${userId}/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.data.success) {
        toast.success('Transaction deleted successfully');
        fetchTransactions();
      } else {
        toast.error('Failed to delete transaction');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting transaction');
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const tabs = [
    { id: 'deposit', label: 'Deposits', Icon: ArrowDownToLine },
    { id: 'withdraw', label: 'Withdrawals', Icon: ArrowUpFromLine },
    { id: 'trade', label: 'Others', Icon: Repeat },
  ];

  const filtered = transactions.filter((t) => t.type === activeTab);

  const openCreate = () => {
    setEditingTransactionId(null);
    setForm({
      type: activeTab,
      asset: '',
      amount: '',
      value: '',
      fee: '',
      status: 'pending',
      userId: userId,
    });
    setShowForm(true);
  };

  const openEdit = (tx) => {
    setEditingTransactionId(tx.id);
    setForm({
      type: tx.type,
      asset: tx.asset,
      amount: tx.amount.toString(),
      value: tx.value.toString(),
      fee: tx.fee.toString(),
      status: tx.status,
      userId: userId,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Transaction History</h2>
        <p className="text-gray-400 text-sm mt-1">Manage user transactions with a user-facing layout</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full md:max-w-sm px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="" className="bg-slate-900 text-white">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id} className="bg-slate-900 text-white">
              {user.first_name} {user.last_name} ({user.email})
            </option>
          ))}
        </select>
        <button
          onClick={fetchTransactions}
          disabled={!userId}
          className={`px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium ${!userId ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          Fetch Transactions
        </button>
        <button
          onClick={openCreate}
          disabled={!userId}
          className={`px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2 ${!userId ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <Plus className="w-4 h-4" />
          Create Transaction
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingTransactionId ? 'Update Transaction' : 'Create Transaction'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingTransactionId(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              className="px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white"
            >
              <option value="" className="bg-slate-900 text-white">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id} className="bg-slate-900 text-white">
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white"
            >
              <option value="deposit" className="bg-slate-900 text-white">Deposit</option>
              <option value="withdraw" className="bg-slate-900 text-white">Withdrawal</option>
              <option value="trade" className="bg-slate-900 text-white">Trade</option>
            </select>
            <select
              value={form.asset}
              onChange={(e) => setForm({ ...form, asset: e.target.value })}
              className="px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white"
            >
              <option value="" className="bg-slate-900 text-white">Select Asset</option>
              {assets.map((asset) => (
                <option key={asset} value={asset} className="bg-slate-900 text-white">
                  {asset}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="any"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              placeholder="Amount"
            />
            <input
              type="number"
              step="any"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              placeholder="Value (USD)"
            />
            <input
              type="number"
              step="any"
              value={form.fee}
              onChange={(e) => setForm({ ...form, fee: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              placeholder="Fee"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white"
            >
              <option value="pending" className="bg-slate-900 text-white">Pending</option>
              <option value="completed" className="bg-slate-900 text-white">Completed</option>
              <option value="failed" className="bg-slate-900 text-white">Failed</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={submitTransaction}
              disabled={isProcessing}
              className={`px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium ${isProcessing ? 'opacity-60' : ''}`}
            >
              {isProcessing ? 'Saving...' : editingTransactionId ? 'Update' : 'Create'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-6 pt-6">
          <div className="flex flex-wrap gap-6">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 pb-4 border-b-2 transition ${
                  activeTab === id
                    ? 'text-emerald-400 border-emerald-500'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeTab === id ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10" />

        {loading ? (
          <div className="p-6 text-gray-400">Loading transactions...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <p className="text-white font-medium mt-4">No {activeTab} transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Records will appear here once added</p>
          </div>
        ) : (
          <div className="p-6">
            {activeTab === 'deposit' && (
              <>
                <div className="grid grid-cols-5 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
                  <div>Amount</div>
                  <div>Asset</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y divide-white/5">
                  {filtered.map((row) => (
                    <div key={row.id} className="grid grid-cols-5 gap-4 py-4 text-sm text-gray-200">
                      <div>{row.amount} {row.asset}</div>
                      <div>{row.asset}</div>
                      <div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          row.status === 'completed'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : row.status === 'failed'
                            ? 'bg-rose-500/15 text-rose-300'
                            : 'bg-amber-500/15 text-amber-300'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                      <div className="text-gray-400">{new Date(row.date).toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300" onClick={() => openEdit(row)}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-rose-400 hover:text-rose-300" onClick={() => setDeleteConfirmId(row.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'withdraw' && (
              <>
                <div className="grid grid-cols-6 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
                  <div>Amount</div>
                  <div>Amount + Charges</div>
                  <div>Asset</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y divide-white/5">
                  {filtered.map((row) => (
                    <div key={row.id} className="grid grid-cols-6 gap-4 py-4 text-sm text-gray-200">
                      <div>{row.amount} {row.asset}</div>
                      <div>${(row.value + row.fee).toFixed(2)}</div>
                      <div>{row.asset}</div>
                      <div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          row.status === 'completed'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : row.status === 'failed'
                            ? 'bg-rose-500/15 text-rose-300'
                            : 'bg-amber-500/15 text-amber-300'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                      <div className="text-gray-400">{new Date(row.date).toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300" onClick={() => openEdit(row)}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-rose-400 hover:text-rose-300" onClick={() => setDeleteConfirmId(row.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'trade' && (
              <>
                <div className="grid grid-cols-5 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
                  <div>Amount</div>
                  <div>Type</div>
                  <div>Asset</div>
                  <div>Date</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y divide-white/5">
                  {filtered.map((row) => (
                    <div key={row.id} className="grid grid-cols-5 gap-4 py-4 text-sm text-gray-200">
                      <div>{row.amount} {row.asset}</div>
                      <div>Trade</div>
                      <div>{row.asset}</div>
                      <div className="text-gray-400">{new Date(row.date).toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300" onClick={() => openEdit(row)}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-rose-400 hover:text-rose-300" onClick={() => setDeleteConfirmId(row.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="rounded-2xl p-8 max-w-lg w-full border border-white/20 bg-gray-900">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => deleteTransaction(deleteConfirmId)}
                disabled={isDeleting}
                className={`flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg"
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
