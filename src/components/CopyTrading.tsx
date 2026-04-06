import React from 'react';
import {
  CheckCircle,
  ClipboardCopy,
  Search,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';

const stats = [
  { label: 'Active Traders', value: '6', icon: Users, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Avg ROI', value: '52.5%', icon: TrendingUp, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Win Rate', value: '76%', icon: ShieldCheck, accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  { label: 'Active Trades', value: '112', icon: TrendingDown, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const traders = [
  {
    name: 'James Anderson',
    followers: 93,
    risk: 'Low Risk',
    desc: 'Algorithmic trader using advanced AI strategies. Minimal manual intervention, maximum efficiency.',
    roi: '70.0%',
    win: '82%',
    trades: '35',
    min: '$1,500',
    max: '$25,000',
    duration: '1 Day',
    slots: '79 slots available',
  },
  {
    name: 'Sarah Johnson',
    followers: 165,
    risk: 'Low Risk',
    desc: 'Cryptocurrency day trader specializing in BTC and ETH. High-risk, high-reward strategy with proven...',
    roi: '60.0%',
    win: '72%',
    trades: '25',
    min: '$1,000',
    max: '$20,000',
    duration: '14 Days',
    slots: '49 slots available',
  },
  {
    name: 'Lisa Thompson',
    followers: 139,
    risk: 'Low Risk',
    desc: 'Options trading specialist with focus on volatility strategies. Experienced in hedging and risk...',
    roi: '55.0%',
    win: '69%',
    trades: '14',
    min: '$3,000',
    max: '$30,000',
    duration: '2 Days',
    slots: '59 slots available',
  },
  {
    name: 'Emily Wong',
    followers: 226,
    risk: 'Low Risk',
    desc: 'Swing trader with expertise in tech stocks and commodities. Balanced risk-reward approach.',
    roi: '50.0%',
    win: '77%',
    trades: '18',
    min: '$750',
    max: '$10,000',
    duration: '60 Days',
    slots: '148 slots available',
  },
  {
    name: 'Michael Chen',
    followers: 192,
    risk: 'Low Risk',
    desc: 'Forex specialist with 8 years of experience in EUR/USD and GBP/USD pairs. Conservative...',
    roi: '45.0%',
    win: '69%',
    trades: '12',
    min: '$500',
    max: '$5,000',
    duration: '30 Days',
    slots: '100 slots available',
  },
  {
    name: 'David Martinez',
    followers: 193,
    risk: 'Low Risk',
    desc: 'Long-term stock market investor focusing on blue-chip companies. Low risk, stable growth strategy.',
    roi: '35.0%',
    win: '85%',
    trades: '8',
    min: '$2,000',
    max: '$50,000',
    duration: '6 Months',
    slots: '200 slots available',
  },
  {
    name: 'Olivia Brooks',
    followers: 142,
    risk: 'Medium Risk',
    desc: 'Momentum trader focusing on large-cap crypto breakouts and trend continuation.',
    roi: '58.0%',
    win: '63%',
    trades: '27',
    min: '$1,200',
    max: '$15,000',
    duration: '10 Days',
    slots: '61 slots available',
  },
  {
    name: 'Daniel Reyes',
    followers: 118,
    risk: 'High Risk',
    desc: 'High-frequency scalper with aggressive positioning and fast exits.',
    roi: '85.0%',
    win: '54%',
    trades: '41',
    min: '$2,500',
    max: '$40,000',
    duration: '3 Days',
    slots: '22 slots available',
  },
];

const CopyTrading = () => {
  const [riskFilter, setRiskFilter] = React.useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const filteredTraders =
    riskFilter === 'All'
      ? traders
      : traders.filter((t) => t.risk.startsWith(riskFilter));

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Expert Traders</h1>
            <p className="text-gray-400 mt-1">
              Verified professionals • Copy trades automatically • Earn passive income
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white">
            <ClipboardCopy className="w-4 h-4" />
            My Subscriptions
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">{card.label}</p>
                <p className="text-2xl font-semibold text-white mt-2">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.accent}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_auto_auto_auto] gap-3 items-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent outline-none text-gray-200 w-full"
            placeholder="Search traders by name, risk level, or performance..."
          />
        </div>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white ${
            riskFilter === 'All' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setRiskFilter('All')}
        >
          All Levels
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white flex items-center gap-2 ${
            riskFilter === 'Low' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setRiskFilter('Low')}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Low Risk
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white flex items-center gap-2 ${
            riskFilter === 'Medium' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setRiskFilter('Medium')}
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          Medium Risk
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white flex items-center gap-2 ${
            riskFilter === 'High' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setRiskFilter('High')}
        >
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          High Risk
        </button>
      </div>

      {/* Trader cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {filteredTraders.map((trader) => (
          <div key={trader.name} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-5 flex items-center gap-3 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-semibold">
                {trader.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{trader.name}</p>
                <p className="text-sm text-gray-400">{trader.followers} followers</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">
                {trader.risk}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-400">{trader.desc}</p>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-xs text-gray-400">ROI</p>
                  <p className="text-emerald-300 font-semibold">{trader.roi}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-xs text-gray-400">Win Rate</p>
                  <p className="text-sky-300 font-semibold">{trader.win}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-xs text-gray-400">Trades</p>
                  <p className="text-white font-semibold">{trader.trades}</p>
                </div>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-400">Investment Range</p>
                <div className="flex items-center justify-between mt-3 text-white">
                  <div>
                    <p className="text-xs text-gray-400">Minimum</p>
                    <p className="font-semibold">{trader.min}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Maximum</p>
                    <p className="font-semibold">{trader.max}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Duration
                </div>
                <span className="text-white font-semibold">{trader.duration}</span>
              </div>

              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  {trader.slots}
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-300" />
              </div>

              <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2">
                <ClipboardCopy className="w-4 h-4" />
                Copy This Trader
              </button>
            </div>
          </div>
        ))}
        {filteredTraders.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            No trader found
          </div>
        )}
      </div>
    </div>
  );
};

export default CopyTrading;
