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
  const [isUploading, setIsUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    performance: "",
    numberOfTrades: "",
    followers: "",
    risk: "Low",
    roi: "",
    win_rate: "",
    trades: "",
    min_invest: "",
    max_invest: "",
    duration: "",
    slots: "",
    image_url: "",
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

  const buildPayload = () => ({
    name: editForm.name.trim(),
    description: editForm.description.trim(),
    performance: Number(editForm.performance) || 0,
    numberOfTrades: Number(editForm.numberOfTrades) || 0,
    followers: Number(editForm.followers) || 0,
    risk: editForm.risk,
    roi: Number(editForm.roi) || 0,
    win_rate: Number(editForm.win_rate) || 0,
    trades: Number(editForm.trades) || 0,
    min_invest: Number(editForm.min_invest) || 0,
    max_invest: Number(editForm.max_invest) || 0,
    duration: editForm.duration.trim(),
    slots: Number(editForm.slots) || 0,
    image_url: editForm.image_url.trim(),
    active: editForm.active,
  });

  const resetForm = () => {
    setEditForm({
      name: "",
      description: "",
      performance: "",
      numberOfTrades: "",
      followers: "",
      risk: "Low",
      roi: "",
      win_rate: "",
      trades: "",
      min_invest: "",
      max_invest: "",
      duration: "",
      slots: "",
      image_url: "",
      active: true,
    });
  };

  const createTrader = async () => {
    if (!editForm.name.trim()) return toast.error("Trader name is required");
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const payload = buildPayload();
      const res = await axios.post(`${API_BASE}/admin/traders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Trader created successfully!");
        resetForm();
        fetchTraders();
      } else toast.error("Failed to create trader");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating trader");
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadImage = async (file) => {
    setIsUploading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`${API_BASE}/admin/traders/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setEditForm({ ...editForm, image_url: res.data.data.url });
        toast.success("Image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const updateTrader = async (traderId) => {
    if (!editForm.name.trim()) return toast.error("Trader name is required");
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const payload = buildPayload();
      const res = await axios.put(`${API_BASE}/admin/traders/${traderId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Trader updated successfully!");
        setEditingTraderId(null);
        resetForm();
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

  const inputFields = [
    { key: "name", label: "Name", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "followers", label: "Followers", type: "number" },
    { key: "risk", label: "Risk", type: "select" },
    { key: "roi", label: "ROI (%)", type: "number" },
    { key: "win_rate", label: "Win Rate (%)", type: "number" },
    { key: "trades", label: "Trades", type: "number" },
    { key: "min_invest", label: "Min Invest", type: "number" },
    { key: "max_invest", label: "Max Invest", type: "number" },
    { key: "duration", label: "Duration", type: "text" },
    { key: "slots", label: "Slots", type: "number" },
    { key: "performance", label: "Performance", type: "number" },
    { key: "numberOfTrades", label: "Number Of Trades", type: "number" },
  ];

  return (
    <div className="rounded-2xl p-4 md:p-6 shadow-xl bg-white/5 border border-white/10 backdrop-blur">
      <h2 className="text-2xl font-bold text-white mb-6">Traders Management</h2>

      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {inputFields.map((field) => (
            field.type === "select" ? (
              <select
                key={field.key}
                value={editForm[field.key]}
                onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="Low" className="bg-slate-900 text-white">Low</option>
                <option value="Medium" className="bg-slate-900 text-white">Medium</option>
                <option value="High" className="bg-slate-900 text-white">High</option>
              </select>
            ) : (
              <input
                key={field.key}
                type={field.type}
                value={editForm[field.key]}
                onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                placeholder={field.label}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            )
          ))}
          <div className="w-full">
            <label className="text-xs text-gray-400">Upload Trader Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
              className="mt-2 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            />
            {isUploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
            {editForm.image_url && (
              <div className="mt-2 flex items-center gap-2">
                <img src={editForm.image_url} alt="preview" className="w-10 h-10 rounded-md object-cover" />
                <span className="text-xs text-gray-400 truncate">{editForm.image_url}</span>
              </div>
            )}
          </div>
        </div>

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
                <th className="py-4 px-6">Risk</th>
                <th className="py-4 px-6">ROI</th>
                <th className="py-4 px-6">Win Rate</th>
                <th className="py-4 px-6">Followers</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader) => (
                <tr key={trader._id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {trader.image_url ? (
                        <img
                          src={trader.image_url}
                          alt={trader.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-semibold">
                          {trader.name?.[0] || "T"}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-semibold">{trader.name}</p>
                        <p className="text-xs text-gray-400">{trader.description || "N/A"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{trader.risk || "Low"}</td>
                  <td className="py-4 px-6">{Number(trader.roi || 0).toFixed(2)}%</td>
                  <td className="py-4 px-6">{Number(trader.win_rate || 0).toFixed(2)}%</td>
                  <td className="py-4 px-6">{trader.followers || 0}</td>
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
                          name: trader.name || "",
                          description: trader.description || "",
                          performance: trader.performance?.toString() || "",
                          numberOfTrades: trader.numberOfTrades?.toString() || "",
                          followers: trader.followers?.toString() || "",
                          risk: trader.risk || "Low",
                          roi: trader.roi?.toString() || "",
                          win_rate: trader.win_rate?.toString() || "",
                          trades: trader.trades?.toString() || "",
                          min_invest: trader.min_invest?.toString() || "",
                          max_invest: trader.max_invest?.toString() || "",
                          duration: trader.duration || "",
                          slots: trader.slots?.toString() || "",
                          image_url: trader.image_url || "",
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
