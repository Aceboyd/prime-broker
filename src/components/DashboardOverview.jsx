import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Bitcoin,
  Users,
} from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$47,832.50",
      change: "+12.34%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Bitcoin Holdings",
      value: "2.45 BTC",
      change: "+8.92%",
      trend: "up",
      icon: Bitcoin,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Active Trades",
      value: "14",
      change: "+2",
      trend: "up",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Referrals",
      value: "23",
      change: "+5",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const topCryptos = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,250.00", change: "+5.67%", trend: "up" },
    { name: "Ethereum", symbol: "ETH", price: "$2,890.50", change: "+3.42%", trend: "up" },
    { name: "Cardano", symbol: "ADA", price: "$0.45", change: "-2.15%", trend: "down" },
    { name: "Polkadot", symbol: "DOT", price: "$7.82", change: "+1.23%", trend: "up" },
  ];

  const activities = [
    { action: "Bought Bitcoin", amount: "0.05 BTC", time: "2 hours ago", status: "completed" },
    { action: "Sold Ethereum", amount: "1.2 ETH", time: "5 hours ago", status: "completed" },
    { action: "Deposit USD", amount: "$5,000", time: "1 day ago", status: "pending" },
    { action: "Referral Bonus", amount: "$50", time: "2 days ago", status: "completed" },
  ];

  return (
    <div className="space-y-8 lg:space-y-12">
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

      {/* Header with extra spacing from sidebar */}
      <div className="lg:pl-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm lg:text-base">
          Welcome back! Here's what's happening with your investments.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/60 backdrop-blur rounded-xl lg:rounded-2xl p-5 lg:p-6 hover:bg-gray-800/80 transition duration-300 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm lg:text-base font-medium">
                    {stat.change}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Portfolio + Top Cryptos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Chart Placeholder */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl lg:rounded-2xl p-6 h-full">
          <h3 className="text-xl font-bold text-white mb-6">
            Portfolio Performance
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>
              <p className="text-gray-400 text-base">
                Chart visualization placeholder
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Integrate a chart library like Recharts or ApexCharts
              </p>
            </div>
          </div>
        </div>

        {/* Top Cryptocurrencies */}
        <div className="bg-gray-800/60 backdrop-blur rounded-xl lg:rounded-2xl p-6 h-full">
          <h3 className="text-xl font-bold text-white mb-6">
            Top Cryptocurrencies
          </h3>
          <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin">
            {topCryptos.map((crypto, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {crypto.symbol}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base">
                      {crypto.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-base">
                    {crypto.price}
                  </p>
                  <div
                    className={`flex items-center space-x-1 ${
                      crypto.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {crypto.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">{crypto.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/60 backdrop-blur rounded-xl lg:rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    activity.status === "completed"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                />
                <div>
                  <h4 className="text-white font-medium text-base">
                    {activity.action}
                  </h4>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold text-base">
                  {activity.amount}
                </p>
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
