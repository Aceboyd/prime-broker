import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export const TradersTable = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTraderId, setEditingTraderId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    performance: "",
    numberOfTrades: "",
    active: true,
  });

  const API_BASE = "https://prime-api-gm2o.onrender.com";

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_BASE}/admin/traders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setTraders(res.data.data || []);
      } else {
        toast.error("Failed to fetch traders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching traders");
    } finally {
      setLoading(false);
    }
  };

  const createTrader = async () => {
    if (!editForm.name.trim()) return toast.error("Trader name is required");
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const payload = {
        name: editForm.name.trim(),
        description: editForm.description.trim(),
        performance: Number(editForm.performance) || 0,
        numberOfTrades: Number(editForm.numberOfTrades) || 0,
        active: editForm.active,
      };
      const res = await axios.post(`${API_BASE}/admin/traders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Trader created successfully!");
        setEditForm({
          name: "",
          description: "",
          performance: "",
          numberOfTrades: "",
          active: true,
        });
        fetchTraders();
      } else toast.error("Failed to create trader");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating trader");
    } finally {
      setIsProcessing(false);
    }
  };

  const updateTrader = async (traderId) => {
    if (!editForm.name.trim()) return toast.error("Trader name is required");
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const payload = {
        name: editForm.name.trim(),
        description: editForm.description.trim(),
        performance: Number(editForm.performance) || 0,
        numberOfTrades: Number(editForm.numberOfTrades) || 0,
        active: editForm.active,
      };
      const res = await axios.put(`${API_BASE}/admin/traders/${traderId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Trader updated successfully!");
        setEditingTraderId(null);
        setEditForm({
          name: "",
          description: "",
          performance: "",
          numberOfTrades: "",
          active: true,
        });
        fetchTraders();
      } else toast.error("Failed to update trader");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating trader");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteTrader = async (traderId) => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`${API_BASE}/admin/traders/${traderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Trader deleted successfully!");
        fetchTraders();
      } else toast.error("Failed to delete trader");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting trader");
    } finally {
      setIsProcessing(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Traders Management</h2>

      <div className="mb-6 space-y-4">
        {["name", "description", "performance", "numberOfTrades"].map((field) => (
          <input
            key={field}
            type={field === "performance" || field === "numberOfTrades" ? "number" : "text"}
            value={editForm[field]}
            onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
        ))}

        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={editForm.active}
            onChange={(e) => setEditForm({ ...editForm, active: e.target.checked })}
            className="h-4 w-4 text-green-500 focus:ring-green-500 bg-white/10 border-white/20 rounded"
          />
          <span>Active</span>
        </label>

        <button
          onClick={() =>
            editingTraderId ? updateTrader(editingTraderId) : createTrader()
          }
          disabled={isProcessing}
          className={`px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 ${
            isProcessing ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing
            ? "Processing..."
            : editingTraderId
            ? "Update Trader"
            : "Create Trader"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-gray-400" size={24} />
          <p className="text-gray-400 ml-2">Loading traders...</p>
        </div>
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
                <th className="py-4 px-6">Trades</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader) => (
                <tr key={trader._id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-6">{trader.name}</td>
                  <td className="py-4 px-6">{trader.description || "N/A"}</td>
                  <td className="py-4 px-6">{Number(trader.performance || 0).toFixed(2)}%</td>
                  <td className="py-4 px-6">{trader.numberOfTrades || 0}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trader.active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {trader.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingTraderId(trader._id);
                        setEditForm({
                          name: trader.name,
                          description: trader.description || "",
                          performance: trader.performance?.toString() || "",
                          numberOfTrades: trader.numberOfTrades?.toString() || "",
                          active: trader.active,
                        });
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit size={18} />
                    </button>
                    {deleteConfirmId === trader._id ? (
                      <>
                        <button
                          onClick={() => deleteTrader(trader._id)}
                          disabled={isProcessing}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(trader._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
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
