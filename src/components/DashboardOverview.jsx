import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    total_balance: 0,
    total_deposit: 0,
    total_profit: 0,
  });
  const [cryptoData, setCryptoData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);

  const activities = [
    { action: "Bought Bitcoin", amount: "0.05 BTC", time: "2 hours ago", status: "completed" },
    { action: "Sold Ethereum", amount: "1.2 ETH", time: "5 hours ago", status: "completed" },
    { action: "Deposit USD", amount: "$5,000", time: "1 day ago", status: "pending" },
    { action: "Referral Bonus", amount: "$50", time: "2 days ago", status: "completed" },
  ];

  // Fetch user stats & top cryptocurrencies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        // Fetch user profile
        const profileRes = await axios.get("https://prime-api-gm2o.onrender.com/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { total_balance, total_deposit, total_profit } = profileRes.data.data;
        setUserData({ total_balance, total_deposit, total_profit });

        // Generate fake portfolio chart data
        const chartData = Array.from({ length: 7 }, (_, i) => ({
          name: `Day ${i + 1}`,
          value: total_balance - 50 + Math.random() * 100,
        }));
        setPortfolioData(chartData);

        // Fetch top 5 coins
        const cryptoRes = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(cryptoRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      {/* Scrollbar Styles */}
      <style>
        {`
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
            border-radius: 9999px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #111827;
            border-radius: 9999px;
          }
        `}
      </style>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400">
          Welcome back! Here’s what’s happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {/* Total Balance */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6 hover:bg-gray-800/80 transition duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">${userData.total_balance}</h3>
          <p className="text-gray-400 text-sm">Total Balance</p>
        </div>

        {/* Total Deposit */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6 hover:bg-gray-800/80 transition duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">${userData.total_deposit}</h3>
          <p className="text-gray-400 text-sm">Total Deposit</p>
        </div>

        {/* Total Profit */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6 hover:bg-gray-800/80 transition duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">${userData.total_profit}</h3>
          <p className="text-gray-400 text-sm">Total Profit</p>
        </div>
      </div>

      {/* Portfolio Performance + Top Cryptos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Chart */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Portfolio Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Cryptocurrencies */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Top Cryptocurrencies</h3>
          <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin">
            {cryptoData.length === 0 ? (
              <p className="text-gray-400">Loading data...</p>
            ) : (
              cryptoData.map((coin) => (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <h4 className="text-white font-medium">{coin.name}</h4>
                      <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${coin.current_price.toLocaleString()}</p>
                    <div
                      className={`flex items-center justify-end ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    activity.status === "completed"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                />
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{activity.amount}</p>
                <p
                  className={`text-sm capitalize ${
                    activity.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
