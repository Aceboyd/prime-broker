import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const TradersTable = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    performance: 0,
    active: true,
  });

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://prime-api-gm2o.onrender.com/admin/traders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTraders(res.data.data || []);
    } catch (error) {
      console.error('Error fetching traders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTrader = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://prime-api-gm2o.onrender.com/admin/traders`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setFormData({ name: '', description: '', performance: 0, active: true });
      fetchTraders();
    } catch (error) {
      console.error('Error creating trader:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Traders Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Trader
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Trader</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border rounded px-3 py-2 w-full"
              rows={3}
            />
            <input
              type="number"
              placeholder="Performance (%)"
              value={formData.performance}
              onChange={(e) => setFormData({ ...formData, performance: parseFloat(e.target.value) })}
              className="border rounded px-3 py-2 w-full"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="mr-2"
              />
              Active
            </label>
          </div>
          <button
            onClick={() => createTrader(formData)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
          >
            Create
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Performance</th>
              <th className="px-6 py-3 text-left">Active</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {traders.map((trader) => (
              <tr key={trader.id || trader._id} className="border-t">
                <td className="px-6 py-4">{trader.name}</td>
                <td className="px-6 py-4">{trader.description}</td>
                <td className="px-6 py-4">{trader.performance}%</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      trader.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trader.active ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    <Edit className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    <Trash2 className="w-4 h-4 inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
