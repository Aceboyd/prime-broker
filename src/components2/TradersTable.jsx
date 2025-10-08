import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

export const TradersTable = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTraderId, setEditingTraderId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    performance: 0,
    active: true,
  });

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://prime-api-gm2o.onrender.com/admin/traders', {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setTraders(res.data.data);
        toast.success('Traders fetched successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to fetch traders', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching traders', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching traders:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const createTrader = async () => {
    if (!editForm.name) {
      toast.error('Name is required', {
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
      const res = await axios.post('https://prime-api-gm2o.onrender.com/admin/traders', editForm, {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        toast.success('Trader created successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setEditForm({ name: '', description: '', performance: 0, active: true });
        fetchTraders();
      } else {
        toast.error('Failed to create trader', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating trader', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error creating trader:', error.response?.data || error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Traders Management</h2>
      <div className="mb-6 space-y-4">
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Trader Name"
        />
        <input
          type="text"
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Description"
        />
        <input
          type="number"
          value={editForm.performance}
          onChange={(e) => setEditForm({ ...editForm, performance: parseFloat(e.target.value) || 0 })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Performance (%)"
        />
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={editForm.active}
            onChange={(e) => setEditForm({ ...editForm, active: e.target.checked })}
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 bg-white/10 border-white/20 rounded"
          />
          <span>Active</span>
        </label>
        <button
          onClick={createTrader}
          disabled={isUpdating}
          className={`px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isUpdating ? 'Creating...' : 'Create Trader'}
        </button>
      </div>
      {loading ? (
        <p className="text-gray-400">Loading traders...</p>
      ) : traders.length === 0 ? (
        <p className="text-gray-400">No traders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-white/20 sticky top-0 bg-gray-900/50">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Performance</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader) => (
                <tr key={trader.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-6 truncate max-w-xs">{trader.name}</td>
                  <td className="py-4 px-6 truncate max-w-xs">{trader.description || 'N/A'}</td>
                  <td className="py-4 px-6">{trader.performance.toFixed(2)}%</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trader.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {trader.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};