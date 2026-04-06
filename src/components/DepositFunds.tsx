import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const DepositFunds = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');

  const cryptocurrencies = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      color: 'from-orange-500 to-orange-600',
      depositAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      color: 'from-blue-500 to-blue-600',
      depositAddress: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      color: 'from-green-500 to-green-600',
      depositAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`deposit ${amount} ${selectedCrypto}`);
    setAmount('');
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  const selectedCryptoData = cryptocurrencies.find(
    (crypto) => crypto.symbol === selectedCrypto
  );

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Fund Account
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Deposit cryptocurrency to fund your account
          </p>
        </div>
      </div>

      {/* Deposit Form */}
      <div className="glass-effect rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
          Manage Funds
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side */}
          <div className="space-y-4">
            {/* Crypto Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cryptocurrency
              </label>
              <div className="flex flex-wrap gap-2">
                {cryptocurrencies.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                      selectedCrypto === crypto.symbol
                        ? `bg-gradient-to-r ${crypto.color} text-white`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${crypto.color} rounded-full flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {crypto.symbol[0]}
                      </span>
                    </div>
                    <span>{crypto.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deposit Address
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  type="text"
                  value={selectedCryptoData?.depositAddress ?? ''}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none text-sm sm:text-base"
                />
                <button
                  onClick={() =>
                    handleCopyAddress(selectedCryptoData?.depositAddress ?? '')
                  }
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
                  title="Copy address"
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Send {selectedCrypto} to this address to deposit funds.
              </p>
            </div>
          </div>

          {/* Right side - Action button */}
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm sm:text-base"
            >
              Confirm Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
              OK
            </div>
            <h4 className="text-lg font-semibold text-white">Deposit Process</h4>
          </div>
          <div className="p-6 space-y-6">
            {[
              { step: "1", title: "Select Method", desc: "Choose your preferred deposit method from the available options." },
              { step: "2", title: "Enter Amount", desc: "Specify the amount you wish to deposit to your account." },
              { step: "3", title: "Complete Payment", desc: "Follow the instructions to complete your deposit through the selected method." },
              { step: "4", title: "Confirmation", desc: "Your deposit will be confirmed and credited to your account." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-sm font-semibold">
                  {item.step}
                </div>
                <div>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center text-yellow-300">
              !
            </div>
            <h4 className="text-lg font-semibold text-white">Security Tips</h4>
          </div>
          <div className="p-6 space-y-4">
            {[
              "Always verify payment details before confirming transactions.",
              "Use secure and private internet connections when making deposits.",
              "For crypto deposits, double-check the network type to avoid loss of funds.",
              "Never share your payment credentials with anyone.",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-yellow-500/15 text-yellow-300 flex items-center justify-center text-xs">
                  OK
                </span>
                <p className="text-sm text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Need help with your deposit? Contact our support team via the help center.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
              ===
            </div>
            <h4 className="text-lg font-semibold text-white">Deposit Policy</h4>
          </div>
          <div className="p-6 space-y-5">
            {[
              { title: "Processing Time", desc: "All payment methods", value: "Instant" },
              { title: "Minimum Deposit", desc: "Platform requirement", value: "$50.00" },
              { title: "Deposit Methods", desc: "Available options", value: "Multiple" },
            ].map((row) => (
              <div key={row.title} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{row.title}</p>
                  <p className="text-sm text-gray-400">{row.desc}</p>
                </div>
                <p className="text-sm text-white font-semibold">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;
