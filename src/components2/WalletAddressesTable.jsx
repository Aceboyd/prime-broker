import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

export const WalletAddressesTable = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    currency: 'BTC',
    network: '',
    address: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://prime-api-gm2o.onrender.com/admin/wallet-addresses', {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setAddresses(res.data.data);
        toast.success('Wallet addresses fetched successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to fetch wallet addresses', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching wallet addresses', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching wallet addresses:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateAddress = async () => {
    if (!['BTC', 'ETH', 'USDT'].includes(editForm.currency) || !editForm.network || !editForm.address) {
      toast.error('Please fill all fields with valid data', {
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
      const res = await axios.post('https://prime-api-gm2o.onrender.com/admin/wallet-addresses', editForm, {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        toast.success('Wallet address saved successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setEditForm({ currency: 'BTC', network: '', address: '' });
        setEditingAddressId(null);
        fetchAddresses();
      } else {
        toast.error('Failed to save wallet address', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving wallet address', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error saving wallet address:', error.response?.data || error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Wallet Addresses Management</h2>
      <div className="mb-6 space-y-4">
        <select
          value={editForm.currency}
          onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
        <input
          type="text"
          value={editForm.network}
          onChange={(e) => setEditForm({ ...editForm, network: e.target.value })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Network"
        />
        <input
          type="text"
          value={editForm.address}
          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
          className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Wallet Address"
        />
        <button
          onClick={createOrUpdateAddress}
          disabled={isUpdating}
          className={`px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isUpdating ? 'Saving...' : 'Save Address'}
        </button>
      </div>
      {loading ? (
        <p className="text-gray-400">Loading wallet addresses...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-400">No wallet addresses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-white/20 sticky top-0 bg-gray-900/50">
                <th className="py-4 px-6">Currency</th>
                <th className="py-4 px-6">Network</th>
                <th className="py-4 px-6">Address</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id} className="border-b border-white/10 hover:bg-white/5">
                  {editingAddressId === address.id ? (
                    <>
                      <td className="py-4 px-6">
                        <select
                          value={editForm.currency}
                          onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="text"
                          value={editForm.network}
                          onChange={(e) => setEditForm({ ...editForm, network: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Network"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Wallet Address"
                        />
                      </td>
                      <td className="py-4 px-6 flex space-x-2">
                        <button
                          onClick={createOrUpdateAddress}
                          disabled={isUpdating}
                          className={`flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingAddressId(null)}
                          disabled={isUpdating}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6">{address.currency}</td>
                      <td className="py-4 px-6">{address.network}</td>
                      <td className="py-4 px-6 truncate max-w-xs">{address.address}</td>
                      <td className="py-4 px-6 flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingAddressId(address.id);
                            setEditForm({
                              currency: address.currency,
                              network: address.network,
                              address: address.address,
                            });
                          }}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
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
    </div>
  );
};