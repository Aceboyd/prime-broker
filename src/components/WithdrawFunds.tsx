import React, { useState } from 'react';

const WithdrawFunds = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');

  const cryptocurrencies = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      color: 'from-green-500 to-green-600',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`withdrawal ${amount} ${selectedCrypto} ${withdrawalAddress}`);
    setAmount('');
    setWithdrawalAddress('');
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Withdraw Funds
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Withdraw your cryptocurrency securely
          </p>
        </div>
      </div>

      {/* Withdrawal Form */}
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
                Withdrawal Address
              </label>
              <input
                type="text"
                value={withdrawalAddress}
                onChange={(e) => setWithdrawalAddress(e.target.value)}
                placeholder={`Enter ${selectedCrypto} withdrawal address`}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <p className="text-xs text-gray-400 mt-2">
                Enter a valid {selectedCrypto} address to withdraw funds.
              </p>
            </div>
          </div>

          {/* Right side - Action button */}
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm sm:text-base"
            >
              Confirm Withdrawal
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
            <h4 className="text-lg font-semibold text-white">Withdrawal Process</h4>
          </div>
          <div className="p-6 space-y-6">
            {[
              { step: "1", title: "Select Method", desc: "Choose your preferred withdrawal method from the available options." },
              { step: "2", title: "Enter Details", desc: "Provide your withdrawal amount and destination details securely." },
              { step: "3", title: "Confirmation", desc: "Review and confirm your withdrawal request details." },
              { step: "4", title: "Processing", desc: "Your request will be processed according to the method's timeframe." },
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
              "Always verify withdrawal addresses before confirming transactions.",
              "Enable two-factor authentication (2FA) for enhanced account security.",
              "For crypto withdrawals, confirm network type to avoid loss of funds.",
              "Start with small test withdrawals when using a new withdrawal address.",
              "Never share your account credentials or verification codes with anyone.",
              "Be cautious of phishing attempts asking for your withdrawal information.",
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
              Need help with your withdrawal? Contact our support team via the help center.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
              ===
            </div>
            <h4 className="text-lg font-semibold text-white">Withdrawal Policy</h4>
          </div>
          <div className="p-6 space-y-5">
            {[
              { title: "Processing Time", desc: "Varies by method", value: "24-72 hours" },
              { title: "Minimum Withdrawal", desc: "Varies by method", value: "See method details" },
              { title: "Daily Limit", desc: "Maximum per day", value: "$5,275,570.00" },
              { title: "Processing Days", desc: "Business days only", value: "Monday-Friday" },
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

export default WithdrawFunds;
