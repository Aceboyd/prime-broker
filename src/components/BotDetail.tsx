import React from 'react';
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  CheckCircle,
  ChevronDown,
  Users,
  Zap,
} from 'lucide-react';
import { bots, BotItem } from './BotTrading';

type BotDetailProps = {
  onBack?: () => void;
  bot?: BotItem | null;
};

const BotDetail = ({ onBack, bot }: BotDetailProps) => {
  const activeBot = bot ?? bots[0];
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <button
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bots
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-2xl bg-white flex items-center justify-center">
            <Bot className="w-10 h-10 text-slate-900" />
            <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{activeBot.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">
                {activeBot.tag}
              </span>
              <span className="flex items-center gap-1">
                <CalendarClock className="w-4 h-4" />
                {activeBot.cadence}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {activeBot.active} active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Performance Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/20 p-4 text-center">
                <p className="text-xs text-gray-400">ROI</p>
                <p className="text-2xl font-semibold text-emerald-300 mt-1">{activeBot.roi}</p>
              </div>
              <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/20 p-4 text-center">
                <p className="text-xs text-gray-400">Win Rate</p>
                <p className="text-2xl font-semibold text-emerald-300 mt-1">{activeBot.win}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-xs text-gray-400">Total Trades</p>
                <p className="text-2xl font-semibold text-white mt-1">{activeBot.trades}</p>
              </div>
              <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/20 p-4 text-center">
                <p className="text-xs text-gray-400">Total Profit</p>
                <p className="text-2xl font-semibold text-emerald-300 mt-1">{activeBot.profit}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">About This Bot</h2>
            <p className="text-gray-300 mt-3">
              {activeBot.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-gray-400">Min Investment</p>
                <p className="text-white font-semibold mt-1">{activeBot.min}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-gray-400">Max Investment</p>
                <p className="text-white font-semibold mt-1">{activeBot.max}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
          <h2 className="text-xl font-semibold text-white">Subscribe to Bot</h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-300 mb-2">Investment Amount</p>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-2">
                <span className="text-gray-500">$</span>
                <input
                  className="bg-transparent outline-none text-gray-200 w-full"
                  placeholder=""
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Min: $100 - Max: $15,000</p>
            </div>

            <div>
              <p className="text-sm text-gray-300 mb-2">Duration</p>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200 outline-none"
                  defaultValue="1 Day"
                >
                  <option className="bg-slate-900 text-white" value="1 Day">1 Day</option>
                  <option className="bg-slate-900 text-white" value="2 Days">2 Days</option>
                  <option className="bg-slate-900 text-white" value="3 Days">3 Days</option>
                  <option className="bg-slate-900 text-white" value="4 Days">4 Days</option>
                  <option className="bg-slate-900 text-white" value="5 Days">5 Days</option>
                  <option className="bg-slate-900 text-white" value="6 Days">6 Days</option>
                  <option className="bg-slate-900 text-white" value="7 Days">7 Days</option>
                  <option className="bg-slate-900 text-white" value="30 Days">30 Days</option>
                  <option className="bg-slate-900 text-white" value="60 Days">60 Days</option>
                  <option className="bg-slate-900 text-white" value="90 Days">90 Days</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 mt-0.5" />
                <p>
                  Your funds will be automatically traded by the bot. You can cancel anytime and receive your investment +
                  current profit.
                </p>
              </div>
            </div>

            <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotDetail;
