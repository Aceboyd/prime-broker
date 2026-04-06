import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Copy } from 'lucide-react';

type DepositAndWithdrawalProps = {
  mode?: "deposit" | "withdrawal";
};

const DepositAndWithdrawal = ({ mode = "deposit" }: DepositAndWithdrawalProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(mode);
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const isLocked = mode === "deposit" || mode === "withdrawal";

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
    console.log(
      `${action} ${amount} ${selectedCrypto} ${
        action === 'withdrawal' ? withdrawalAddress : ''
      }`
    );
    setAmount('');
    if (action === 'withdrawal') setWithdrawalAddress('');
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
            {mode === "withdrawal" ? "Withdraw Funds" : "Fund Account"}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {mode === "withdrawal"
              ? "Withdraw your cryptocurrency securely"
              : "Deposit cryptocurrency to fund your account"}
          </p>
        </div>
      </div>

      {/* Deposit/Withdrawal Form */}
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
                {mode === "withdrawal"
                  ? "Withdrawal Address"
                  : action === 'deposit'
                  ? 'Deposit Address'
                  : 'Withdrawal Address'}
              </label>
              {mode === "withdrawal" ? (
                <input
                  type="text"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  placeholder={`Enter ${selectedCrypto} withdrawal address`}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              ) : action === 'deposit' ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input
                    type="text"
                    value={selectedCryptoData.depositAddress}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none text-sm sm:text-base"
                  />
                  <button
                    onClick={() =>
                      handleCopyAddress(selectedCryptoData.depositAddress)
                    }
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  placeholder={`Enter ${selectedCrypto} withdrawal address`}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              )}
              <p className="text-xs text-gray-400 mt-2">
                {action === 'deposit'
                  ? `Send ${selectedCrypto} to this address to deposit funds.`
                  : `Enter a valid ${selectedCrypto} address to withdraw funds.`}
              </p>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="space-y-4">
            {!isLocked && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setAction('deposit')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    action === 'deposit'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Deposit</span>
                </button>
                <button
                  onClick={() => setAction('withdrawal')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    action === 'withdrawal'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ArrowDownCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Withdrawal</span>
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm sm:text-base"
            >
              Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      {mode === "deposit" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                ✓
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
                    ✓
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
                ≡
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
              <button className="text-emerald-400 text-sm hover:text-emerald-300">
                View deposit history →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                ✓
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
                    ✓
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
                ≡
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
              <button className="text-emerald-400 text-sm hover:text-emerald-300">
                View full withdrawal policy →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositAndWithdrawal;
