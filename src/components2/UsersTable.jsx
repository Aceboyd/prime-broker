import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    phone: '',
    total_balance: 0,
    total_deposit: 0,
    total_profit: 0,
    kyc_status: 'pending',
    selected_trader: null,
  });
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchTraders();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://prime-api-gm2o.onrender.com/admin/users', {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        toast.success('Users fetched successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
    } finally {
      setLoading(false);
    }
  };

  const fetchTraders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://prime-api-gm2o.onrender.com/admin/traders', {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        setTraders(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching traders:', error.response?.data || error);
    }
  };

  const handleEditFormChange = (e, field) => {
    const value = field.includes('total_') ? parseFloat(e.target.value) || 0 : e.target.value;
    setEditForm((prev) => {
      const newForm = { ...prev, [field]: value };
      if (field === 'total_deposit' || field === 'total_profit') {
        newForm.total_balance = (newForm.total_deposit || 0) + (newForm.total_profit || 0);
      }
      return newForm;
    });
  };

  const updateUser = async (id) => {
    if (!editForm.email.includes('@') || !editForm.email.includes('.')) {
      toast.error('Please enter a valid email', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (editForm.total_deposit < 0 || editForm.total_profit < 0) {
      toast.error('Deposit and profit cannot be negative', {
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
        total_balance: editForm.total_deposit + editForm.total_profit,
      };
      const res = await axios.put(`https://prime-api-gm2o.onrender.com/admin/users/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        toast.success('User updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setEditingUserId(null);
        fetchUsers();
      } else {
        toast.error('Failed to update user', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating user', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error updating user:', error.response?.data || error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteUser = async (id) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.delete(`https://prime-api-gm2o.onrender.com/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (res.data.success) {
        toast.success('User deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        fetchUsers();
      } else {
        toast.error('Failed to delete user', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting user', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error deleting user:', error.response?.data || error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="w-full max-w-[calc(100vw-280px)] mx-auto glass-effect rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Users Management</h2>
      {loading ? (
        <p className="text-gray-400 text-lg">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400 text-lg">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 text-sm md:text-base">
            <thead>
              <tr className="border-b border-white/20 sticky top-0 bg-gray-900/70 backdrop-blur-sm">
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[140px]">Name</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[180px]">Email</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Country</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Phone</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Balance</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Deposit</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Profit</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">KYC Status</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[120px]">Trader</th>
                <th className="py-4 px-4 md:px-6 font-semibold min-w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                  {editingUserId === user.id ? (
                    <>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="text"
                          value={editForm.first_name}
                          onChange={(e) => handleEditFormChange(e, 'first_name')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg mb-2"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          value={editForm.last_name}
                          onChange={(e) => handleEditFormChange(e, 'last_name')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Last Name"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => handleEditFormChange(e, 'email')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Email"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="text"
                          value={editForm.country}
                          onChange={(e) => handleEditFormChange(e, 'country')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Country"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => handleEditFormChange(e, 'phone')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Phone"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          value={editForm.total_balance.toFixed(2)}
                          disabled
                          className="w-full min-w-[200px] px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all text-lg opacity-70 cursor-not-allowed"
                          placeholder="Balance"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          value={editForm.total_deposit}
                          onChange={(e) => handleEditFormChange(e, 'total_deposit')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Deposit"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <input
                          type="number"
                          value={editForm.total_profit}
                          onChange={(e) => handleEditFormChange(e, 'total_profit')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                          placeholder="Profit"
                        />
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <select
                          value={editForm.kyc_status}
                          onChange={(e) => handleEditFormChange(e, 'kyc_status')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <select
                          value={editForm.selected_trader || ''}
                          onChange={(e) => handleEditFormChange(e, 'selected_trader')}
                          className="w-full min-w-[200px] px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                        >
                          <option value="">No Trader</option>
                          {traders.map((trader) => (
                            <option key={trader.id} value={trader.id}>
                              {trader.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 md:px-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <button
                          onClick={() => updateUser(user.id)}
                          disabled={isUpdating}
                          className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 ${
                            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
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
                      <td className="py-4 px-4 md:px-6 break-words min-w-[140px]">{user.first_name} {user.last_name}</td>
                      <td className="py-4 px-4 md:px-6 break-words min-w-[180px]">{user.email}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{user.country || 'N/A'}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{user.phone || 'N/A'}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">${user.total_balance?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">${user.total_deposit?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">${user.total_profit?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            user.kyc_status === 'approved'
                              ? 'bg-green-500/30 text-green-300'
                              : user.kyc_status === 'rejected'
                              ? 'bg-red-500/30 text-red-300'
                              : 'bg-yellow-500/30 text-yellow-300'
                          }`}
                        >
                          {user.kyc_status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4 md:px-6 min-w-[120px]">{traders.find(t => t.id === user.selected_trader)?.name || 'None'}</td>
                      <td className="py-4 px-4 md:px-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 min-w-[180px]">
                        <button
                          onClick={() => {
                            setEditingUserId(user.id);
                            setEditForm({
                              first_name: user.first_name,
                              last_name: user.last_name,
                              email: user.email,
                              country: user.country || '',
                              phone: user.phone || '',
                              total_balance: (user.total_deposit || 0) + (user.total_profit || 0),
                              total_deposit: user.total_deposit || 0,
                              total_profit: user.total_profit || 0,
                              kyc_status: user.kyc_status || 'pending',
                              selected_trader: user.selected_trader || null,
                            });
                          }}
                          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(user.id)}
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
              Are you sure you want to delete {users.find(u => u.id === deleteConfirmId)?.first_name}{' '}
              {users.find(u => u.id === deleteConfirmId)?.last_name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => deleteUser(deleteConfirmId)}
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