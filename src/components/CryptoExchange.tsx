import React from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock,
  List,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const tickerRow = [
  { symbol: 'ADA', price: '$0.36', change: '+0.51%', up: true },
  { symbol: 'APT', price: '$4.76', change: '-8.04%', up: false },
  { symbol: 'AVAX', price: '$12.13', change: '-0.13%', up: false },
  { symbol: 'BCH', price: '$593.34', change: '-0.69%', up: false },
  { symbol: 'BGB', price: '$3.65', change: '+1.03%', up: true },
  { symbol: 'BNB', price: '$890.62', change: '+0.50%', up: true },
  { symbol: 'BSC-USD', price: '$1.00', change: '-0.03%', up: false },
];

const topGainers = [
  { symbol: 'CC', price: '$0.16', change: '+8.05%' },
  { symbol: 'HYPE', price: '$22.56', change: '+5.32%' },
  { symbol: 'HBAR', price: '$0.11', change: '+1.32%' },
  { symbol: 'LEO', price: '$8.90', change: '+1.11%' },
  { symbol: 'BGB', price: '$3.65', change: '+1.03%' },
];

const topLosers = [
  { symbol: 'PEPE', price: '$0.00', change: '-13.47%' },
  { symbol: 'NEAR', price: '$2.44', change: '-11.88%' },
  { symbol: 'TAO', price: '$379.24', change: '-9.15%' },
  { symbol: 'ONDO', price: '$0.82', change: '-9.02%' },
  { symbol: 'APT', price: '$4.76', change: '-8.04%' },
];

const baseCryptos = [
  { symbol: 'AAVE', name: 'AAVE', price: '$251.76', change: '+0.51%', cap: '$3,811,599,422' },
  { symbol: 'ADA', name: 'ADA', price: '$0.36', change: '+0.51%', cap: '$13,264,933,511' },
  { symbol: 'APT', name: 'APT', price: '$4.76', change: '-8.04%', cap: '$2,998,606,018' },
  { symbol: 'AVAX', name: 'AVAX', price: '$12.13', change: '-0.13%', cap: '$5,230,833,970' },
  { symbol: 'BCH', name: 'BCH', price: '$593.34', change: '-0.69%', cap: '$11,856,464,850' },
  { symbol: 'BGB', name: 'BGB', price: '$3.65', change: '+1.03%', cap: '$2,556,806,466' },
  { symbol: 'BNB', name: 'BNB', price: '$890.62', change: '+0.50%', cap: '$121,416,916,834' },
  { symbol: 'BSC-USD', name: 'BSC-USD', price: '$1.00', change: '-0.03%', cap: '$8,975,342,975' },
  { symbol: 'BTC', name: 'BTC', price: '$89,465.00', change: '+0.15%', cap: '$1,787,058,167,882' },
  { symbol: 'BUIDL', name: 'BUIDL', price: '$1.00', change: '+0.00%', cap: '$2,920,559,767' },
  { symbol: 'CBBTC', name: 'CBBTC', price: '$89,439.00', change: '+0.11%', cap: '$6,965,709,380' },
  { symbol: 'CC', name: 'CC', price: '$0.16', change: '+8.05%', cap: '$5,820,235,810' },
  { symbol: 'CRO', name: 'CRO', price: '$0.09', change: '-0.30%', cap: '$3,635,599,441' },
  { symbol: 'DAI', name: 'DAI', price: '$1.00', change: '+0.02%', cap: '$4,378,263,149' },
  { symbol: 'DOGE', name: 'DOGE', price: '$0.12', change: '+0.24%', cap: '$20,960,438,154' },
  { symbol: 'DOT', name: 'DOT', price: '$1.92', change: '-0.22%', cap: '$3,184,411,235' },
  { symbol: 'ETC', name: 'ETC', price: '$17.04', change: '-6.38%', cap: '$2,592,787,307' },
  { symbol: 'ETH', name: 'ETH', price: '$2,952.57', change: '+0.18%', cap: '$356,239,023,754' },
  { symbol: 'HYPE', name: 'HYPE', price: '$22.56', change: '+5.32%', cap: '$5,377,197,422' },
  { symbol: 'JITOSOL', name: 'JITOSOL', price: '$189.10', change: '-5.82%', cap: '$2,912,390,998' },
  { symbol: 'LEO', name: 'LEO', price: '$8.90', change: '+1.11%', cap: '$8,204,165,018' },
  { symbol: 'LINK', name: 'LINK', price: '$12.20', change: '-0.26%', cap: '$8,636,131,318' },
  { symbol: 'LTC', name: 'LTC', price: '$67.88', change: '-0.15%', cap: '$5,211,153,449' },
  { symbol: 'NEAR', name: 'NEAR', price: '$2.44', change: '-11.88%', cap: '$2,975,537,964' },
];

const allCryptos = Array.from({ length: 100 }, (_, i) => {
  const base = baseCryptos[i % baseCryptos.length];
  return {
    rank: i + 1,
    symbol: i < baseCryptos.length ? base.symbol : `${base.symbol}${i + 1}`,
    name: base.name,
    price: base.price,
    change: base.change,
    cap: base.cap,
  };
});

const CryptoExchange = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 50;
  const totalPages = Math.ceil(allCryptos.length / pageSize);
  const pageStart = (page - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, allCryptos.length);
  const pageRows = allCryptos.slice(pageStart, pageEnd);
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Crypto Trading</h1>
          <p className="text-gray-400 mt-1">
            Trade Bitcoin, Ethereum, and other cryptocurrencies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white">
            <BarChart3 className="w-4 h-4" />
            Portfolio
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white">
            <List className="w-4 h-4" />
            Orders
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Value', value: '$902.70', icon: TrendingUp, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total Invested', value: '$904.96', icon: Wallet, accent: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total P/L', value: '$-2.26', sub: 'ROI: -0.25%', icon: TrendingDown, accent: 'text-rose-400', bg: 'bg-rose-500/10' },
          { label: 'Pending Orders', value: '0', icon: Clock, accent: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">{card.label}</p>
                <p className="text-2xl font-semibold text-white mt-2">{card.value}</p>
                {card.sub && <p className="text-sm text-rose-300 mt-2">{card.sub}</p>}
              </div>
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.accent}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticker row */}
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {tickerRow.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2 text-sm">
              <span className="text-white font-semibold">{item.symbol}</span>
              <span className="text-gray-300">{item.price}</span>
              <span className={item.up ? 'text-emerald-400' : 'text-rose-400'}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gainers / Losers / Sentiment */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            Top Gainers (24h)
          </div>
          <div className="mt-4 space-y-3">
            {topGainers.map((row) => (
              <div key={row.symbol} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                <div>
                  <p className="text-white font-semibold">{row.symbol}</p>
                  <p className="text-xs text-gray-400">{row.price}</p>
                </div>
                <p className="text-emerald-400 font-semibold">{row.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
            Top Losers (24h)
          </div>
          <div className="mt-4 space-y-3">
            {topLosers.map((row) => (
              <div key={row.symbol} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                <div>
                  <p className="text-white font-semibold">{row.symbol}</p>
                  <p className="text-xs text-gray-400">{row.price}</p>
                </div>
                <p className="text-rose-400 font-semibold">{row.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Market Sentiment
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-emerald-400">Bullish</span>
              <span className="text-rose-400">Bearish</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="h-3 bg-emerald-500 w-[38%]" />
            </div>
            <p className="text-center text-white font-semibold mt-2">38.0%</p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 flex items-center justify-between">
              <span className="text-emerald-300">Gainers</span>
              <span className="text-emerald-300 font-semibold">19</span>
            </div>
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 flex items-center justify-between">
              <span className="text-rose-300">Losers</span>
              <span className="text-rose-300 font-semibold">30</span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-gray-300">Avg Change</span>
              <span className="text-rose-400 font-semibold">-1.44%</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Cryptocurrencies table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-semibold">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            All Cryptocurrencies
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              className="bg-transparent outline-none text-gray-200"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="text-left py-3 px-6 w-16">#</th>
                <th className="text-left py-3 px-6">Cryptocurrency</th>
                <th className="text-left py-3 px-6">Price</th>
                <th className="text-left py-3 px-6">24h Change</th>
                <th className="text-left py-3 px-6">Market Cap</th>
                <th className="text-left py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => {
                const isUp = row.change.startsWith('+');
                return (
                  <tr key={row.symbol} className="border-b border-white/5">
                    <td className="py-4 px-6 text-gray-400">{row.rank}</td>
                    <td className="py-4 px-6">
                      <div className="text-white font-semibold">{row.symbol}</div>
                      <div className="text-gray-400 text-xs">{row.name}</div>
                    </td>
                    <td className="py-4 px-6 text-white">{row.price}</td>
                    <td className={`py-4 px-6 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {row.change}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{row.cap}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold">
                          Trade
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-400">
          <span>
            Showing {pageStart + 1} to {pageEnd} of {allCryptos.length} cryptocurrencies
          </span>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹
            </button>
            <button
              className={`w-9 h-9 rounded-xl ${page === 1 ? 'bg-emerald-600' : 'bg-white/5 border border-white/10'} text-white`}
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button
              className={`w-9 h-9 rounded-xl ${page === 2 ? 'bg-emerald-600' : 'bg-white/5 border border-white/10'} text-white`}
              onClick={() => setPage(2)}
              disabled={totalPages < 2}
            >
              2
            </button>
            <button
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* My Watchlist */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Star className="w-4 h-4 text-yellow-400" />
          My Watchlist
        </div>
        <div className="mt-4 space-y-4">
          {[
            { symbol: 'BTC', name: 'Bitcoin', price: '$89,465.00', change: '+0.15%' },
            { symbol: 'ETH', name: 'Ethereum', price: '$2,952.57', change: '+0.18%' },
            { symbol: 'BNB', name: 'BNB', price: '$890.62', change: '+0.50%' },
            { symbol: 'XRP', name: 'XRP', price: '$1.92', change: '-0.07%' },
            { symbol: 'ADA', name: 'Cardano', price: '$0.36', change: '+0.51%' },
          ].map((item) => {
            const isUp = item.change.startsWith('+');
            return (
              <div
                key={item.symbol}
                className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="text-white font-semibold">{item.symbol}</p>
                  <p className="text-xs text-gray-400">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{item.price}</p>
                  <p className={isUp ? 'text-emerald-400' : 'text-rose-400'}>
                    {item.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CryptoExchange;
