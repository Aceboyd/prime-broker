import React from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  LineChart,
  Percent,
  Search,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';

const stats = [
  { label: 'Active Bots', value: '8', icon: Bot, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Avg ROI', value: '42.0%', icon: LineChart, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Win Rate', value: '80%', icon: ShieldCheck, accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  { label: 'Subscribers', value: '1931', icon: Users, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export type BotItem = {
  name: string;
  active: number;
  cadence: string;
  tag: string;
  roi: string;
  win: string;
  trades: string;
  desc: string;
  min: string;
  max: string;
  profit: string;
};

export const bots: BotItem[] = [
  {
    name: 'Crypto Scalper Elite',
    active: 400,
    cadence: 'Daily',
    tag: 'Scalping',
    roi: '51.3%',
    win: '86%',
    trades: '2,342',
    desc: 'Lightning-fast scalping bot designed for cryptocurrency markets. Executes hundreds of small trades.',
    min: '$100',
    max: '$15,000',
    profit: '+$35,896.02',
  },
  {
    name: 'Neural Network Bot',
    active: 357,
    cadence: 'Daily',
    tag: 'Day Trading',
    roi: '47.8%',
    win: '80%',
    trades: '1,974',
    desc: 'Deep learning bot trained on millions of historical trades. Adapts to market conditions in real time.',
    min: '$300',
    max: '$30,000',
    profit: '+$35,294.30',
  },
  {
    name: 'Quantum Trader AI',
    active: 90,
    cadence: 'Daily',
    tag: 'Scalping',
    roi: '45.2%',
    win: '83%',
    trades: '1,799',
    desc: 'Advanced AI-powered bot using quantum computing algorithms for ultra-fast trade execution.',
    min: '$100',
    max: '$10,000',
    profit: '+$32,797.37',
  },
  {
    name: 'DayTrade Master',
    active: 500,
    cadence: 'Daily',
    tag: 'Day Trading',
    roi: '42.6%',
    win: '79%',
    trades: '1,163',
    desc: 'Intraday trading specialist focusing on capturing daily price volatility. Uses technical indicators.',
    min: '$250',
    max: '$25,000',
    profit: '+$23,872.83',
  },
  {
    name: 'Trend Surfer Pro',
    active: 34,
    cadence: 'Daily',
    tag: 'Swing Trading',
    roi: '41.7%',
    win: '72%',
    trades: '583',
    desc: 'Long-term trend following bot with sophisticated risk management. Ideal for patient investors.',
    min: '$1,000',
    max: '$100,000',
    profit: '+$25,914.72',
  },
  {
    name: 'Smart Swing Pro',
    active: 200,
    cadence: 'Daily',
    tag: 'Swing Trading',
    roi: '38.9%',
    win: '76%',
    trades: '892',
    desc: 'Professional swing trading bot that capitalizes on medium-term price movements.',
    min: '$500',
    max: '$50,000',
    profit: '+$19,230.50',
  },
  {
    name: 'Momentum Hunter',
    active: 328,
    cadence: 'Daily',
    tag: 'Swing Trading',
    roi: '36.5%',
    win: '74%',
    trades: '734',
    desc: 'Momentum-based trading bot that identifies and rides strong price trends in volatile markets.',
    min: '$500',
    max: '$40,000',
    profit: '+$17,890.40',
  },
  {
    name: 'Arbitrage Alpha',
    active: 22,
    cadence: 'Daily',
    tag: 'Scalping',
    roi: '32.1%',
    win: '89%',
    trades: '3,127',
    desc: 'Specialized arbitrage bot that exploits price differences across multiple exchanges.',
    min: '$200',
    max: '$20,000',
    profit: '+$27,450.80',
  },
];

type BotTradingProps = {
  onSubscriptions?: () => void;
  onSubscribe?: (bot: BotItem) => void;
};

const BotTrading = ({ onSubscriptions, onSubscribe }: BotTradingProps) => {
  const [tagFilter, setTagFilter] = React.useState<'All' | 'Scalping' | 'Day Trading' | 'Swing Trading'>(
    'All'
  );
  const filteredBots =
    tagFilter === 'All'
      ? bots
      : bots.filter((bot) => bot.tag === tagFilter);

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">Trading Bots</h1>
            <p className="text-gray-400 mt-1">
              Automated trading - 24/7 monitoring - AI-powered strategies
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-xs border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" />
            Live
          </span>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white"
            onClick={onSubscriptions}
          >
            <Activity className="w-4 h-4" />
            My Subscriptions
          </button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_auto_auto_auto] gap-3 items-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent outline-none text-gray-200 w-full"
            placeholder="Search bots..."
          />
        </div>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white ${
            tagFilter === 'All' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setTagFilter('All')}
        >
          All
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white ${
            tagFilter === 'Scalping' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setTagFilter('Scalping')}
        >
          Scalping
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white ${
            tagFilter === 'Day Trading' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setTagFilter('Day Trading')}
        >
          Day Trading
        </button>
        <button
          className={`rounded-2xl border border-white/10 px-4 py-3 text-white ${
            tagFilter === 'Swing Trading' ? 'bg-white/10' : 'bg-white/5'
          }`}
          onClick={() => setTagFilter('Swing Trading')}
        >
          Swing Trading
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <div key={bot.name} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-5 flex items-center gap-3 border-b border-white/10">
              <div className="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <Bot className="w-7 h-7 text-slate-900" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{bot.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {bot.active} active
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    {bot.cadence}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 text-xs border border-emerald-500/20">
                {bot.tag}
              </span>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <LineChart className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs text-gray-400">ROI</p>
                    <p className="text-emerald-300 font-semibold">{bot.roi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Percent className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs text-gray-400">Win Rate</p>
                    <p className="text-emerald-300 font-semibold">{bot.win}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Activity className="w-4 h-4 text-violet-400" />
                  <div>
                    <p className="text-xs text-gray-400">Trades</p>
                    <p className="text-white font-semibold">{bot.trades}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400">{bot.desc}</p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{bot.min} - {bot.max}</span>
                <span className="text-emerald-300 font-semibold">{bot.profit}</span>
              </div>

              <button
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2"
                onClick={() => onSubscribe?.(bot)}
              >
                <ArrowRight className="w-4 h-4" />
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
        {filteredBots.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            No bots found
          </div>
        )}
      </div>
    </div>
  );
};

export default BotTrading;
