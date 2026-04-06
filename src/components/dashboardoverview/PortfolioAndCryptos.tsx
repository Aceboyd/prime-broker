import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type PortfolioAndCryptosProps = {
  portfolioData: any[];
  cryptoData: any[];
};

const PortfolioAndCryptos = ({ portfolioData, cryptoData }: PortfolioAndCryptosProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <span className="mr-1">?</span>
                    ) : (
                      <span className="mr-1">?</span>
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
  );
};

export default PortfolioAndCryptos;
