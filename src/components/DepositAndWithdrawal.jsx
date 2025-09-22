import React, { useState } from 'react';
import { Bitcoin, CreditCard, ArrowUpCircle, ArrowDownCircle, Copy } from 'lucide-react';

const DepositAndWithdrawal = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');

  const cryptocurrencies = [
    { name: 'Bitcoin', symbol: 'BTC', color: 'from-orange-500 to-orange-600', depositAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { name: 'Ethereum', symbol: 'ETH', color: 'from-blue-500 to-blue-600', depositAddress: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE' },
    { name: 'Tether', symbol: 'USDT', color: 'from-green-500 to-green-600', depositAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling deposit/withdrawal
    console.log(`${action} ${amount} ${selectedCrypto} ${action === 'withdrawal' ? withdrawalAddress : ''}`);
    setAmount('');
    if (action === 'withdrawal') setWithdrawalAddress('');
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  const selectedCryptoData = cryptocurrencies.find(crypto => crypto.symbol === selectedCrypto);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Deposit & Withdrawal</h1>
          <p className="text-gray-400">Manage your cryptocurrency deposits and withdrawals</p>
        </div>
      </div>

      {/* Deposit/Withdrawal Form */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Manage Funds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crypto Selection and Amount */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cryptocurrency</label>
              <div className="flex space-x-2">
                {cryptocurrencies.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCrypto === crypto.symbol
                        ? `bg-gradient-to-r ${crypto.color} text-white`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-gradient-to-r ${crypto.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{crypto.symbol[0]}</span>
                    </div>
                    <span>{crypto.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {action === 'deposit' ? 'Deposit Address' : 'Withdrawal Address'}
              </label>
              {action === 'deposit' ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={selectedCryptoData.depositAddress}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyAddress(selectedCryptoData.depositAddress)}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
                    title="Copy address"
                  >
                    <Copy className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  placeholder={`Enter ${selectedCrypto} withdrawal address`}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <p className="text-xs text-gray-400 mt-2">
                {action === 'deposit'
                  ? `Send ${selectedCrypto} to this address to deposit funds.`
                  : `Enter a valid ${selectedCrypto} address to withdraw funds.`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setAction('deposit')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  action === 'deposit'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <ArrowUpCircle className="w-5 h-5" />
                <span>Deposit</span>
              </button>
              <button
                onClick={() => setAction('withdrawal')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  action === 'withdrawal'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <ArrowDownCircle className="w-5 h-5" />
                <span>Withdrawal</span>
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositAndWithdrawal;