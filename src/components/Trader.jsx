import React, { useState } from 'react';
import { Users } from 'lucide-react';

const Trader = () => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  const mockTraders = [
    { id: 1, name: 'Alice Smith', expertise: 'Crypto Arbitrage', successRate: '85%', trades: 120 },
    { id: 2, name: 'Bob Johnson', expertise: 'Swing Trading', successRate: '78%', trades: 95 },
    { id: 3, name: 'Carol White', expertise: 'Long-Term HODL', successRate: '90%', trades: 60 },
  ];

  const handleSelectTrader = (traderId) => {
    setSelectedTrader(traderId);
    console.log(`Selected trader: ${traderId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Select Trader</h1>
          <p className="text-gray-400">Choose a professional trader to manage your investments</p>
        </div>
      </div>

      {/* Trader List */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Available Traders</h3>

        <div className="space-y-4">
          {mockTraders.map((trader) => (
            <div
              key={trader.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {/* Avatar + Info */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{trader.name}</h4>
                  <p className="text-gray-400 text-sm">{trader.expertise}</p>
                </div>
              </div>

              {/* Stats + Select */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white font-semibold">{trader.successRate} Success</p>
                  <p className="text-gray-400 text-sm">{trader.trades} Trades</p>
                </div>

                <button
                  onClick={() => handleSelectTrader(trader.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedTrader === trader.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {selectedTrader === trader.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trader;
