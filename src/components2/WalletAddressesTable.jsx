import      React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const WalletAddressesTable = () => {
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    currency: 'BTC',
    network: '',
    address: '',
  });

  useEffect(() => {
    fetchWalletAddresses();
  }, []);

  const fetchWalletAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://prime-api-gm2o.onrender.com/admin/wallet-addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWalletAddresses(res.data.data || []);
    } catch (error) {
      console.error('Error fetching wallet addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWalletAddress = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://prime-api-gm2o.onrender.com/admin/wallet-addresses`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setFormData({ currency: 'BTC', network: '', address: '' });
      fetchWalletAddresses();
    } catch (error) {
      console.error('Error creating wallet address:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Wallet Addresses</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet Address
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Wallet Address</h3>
          <div className="space-y-4">
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
            <input
              type="text"
              placeholder="Network (e.g., ERC20, TRC20)"
              value={formData.network}
              onChange={(e) => setFormData({ ...formData, network: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Wallet Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            onClick={() => createWalletAddress(formData)}
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
              <th className="px-6 py-3 text-left">Currency</th>
              <th className="px-6 py-3 text-left">Network</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {walletAddresses.map((wallet) => (
              <tr key={wallet.id} className="border-t">
                <td className="px-6 py-4">{wallet.currency}</td>
                <td className="px-6 py-4">{wallet.network}</td>
                <td className="px-6 py-4">{wallet.address}</td>
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
