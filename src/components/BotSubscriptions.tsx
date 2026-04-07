import React from 'react';
import {
  ArrowRight,
  Bot,
  CalendarClock,
  Eye,
  Menu,
  Plus,
} from 'lucide-react';

const subscriptions = [
  {
    name: 'Crypto Scalper Elite',
    status: 'Completed',
    duration: '1 Days',
    started: 'Mar 13, 2026',
    daysLeft: '0 days left',
    invested: '$200.00',
    profit: '+$5.77',
    totalReturn: '$205.77',
    profitPct: '+2.89%',
    lastTrade: '3 weeks ago',
  },
];

type BotSubscriptionsProps = {
  onBrowseBots?: () => void;
  onViewBot?: () => void;
};

const BotSubscriptions = ({ onBrowseBots, onViewBot }: BotSubscriptionsProps) => {
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Menu className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Bot Subscriptions</h1>
            <p className="text-gray-400 mt-1">
              Monitor your active bot investments and performance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white"
            onClick={onBrowseBots}
          >
            <Plus className="w-4 h-4" />
            Browse Bots
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {subscriptions.map((sub) => (
          <div key={sub.name} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-5 flex items-center gap-4 border-b border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <Bot className="w-7 h-7 text-slate-900" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">{sub.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                  <span className="px-3 py-1 rounded-full bg-slate-700/60 text-sky-300 text-xs">
                    {sub.status}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarClock className="w-3.5 h-3.5" />
                    {sub.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Started: {sub.started} - {sub.daysLeft}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                  <p className="text-xs text-gray-400">Invested</p>
                  <p className="text-xl font-semibold text-white mt-1">{sub.invested}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <p className="text-xs text-gray-400">Current Profit</p>
                  <p className="text-xl font-semibold text-emerald-300 mt-1">{sub.profit}</p>
                </div>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-white font-semibold">{sub.totalReturn}</p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-400">Profit Percentage</p>
                <p className="text-emerald-300 font-semibold">{sub.profitPct}</p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-400">Last Trade</p>
                <p className="text-gray-200">{sub.lastTrade}</p>
              </div>

              <button
                className="w-full rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold py-3 flex items-center justify-center gap-2"
                onClick={onViewBot}
              >
                <Eye className="w-4 h-4" />
                View Bot
              </button>
            </div>
          </div>
        ))}
        {subscriptions.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            No subscriptions found
          </div>
        )}
      </div>
    </div>
  );
};

export default BotSubscriptions;
