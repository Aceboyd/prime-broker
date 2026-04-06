import React from "react";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  Eye,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
} from "lucide-react";

type UserData = {
  total_balance: number;
  total_deposit: number;
  total_profit: number;
};

type StatsGridProps = {
  userData: UserData;
  showBalance: boolean;
  onToggleBalance: () => void;
  formattedDate: string;
  formatMoney: (value: number) => string;
};

const StatsGrid = ({ userData, showBalance, onToggleBalance, formattedDate, formatMoney }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8">
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-semibold">Account Balance</p>
              <p className="text-xs text-gray-400">Your current available balance</p>
            </div>
          </div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-300 transition"
            onClick={onToggleBalance}
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            <Eye className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-3xl sm:text-4xl font-semibold">
            {showBalance ? formatMoney(userData.total_balance) : "••••••"}
          </p>
          <span className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
            <TrendingUp className="w-4 h-4" />
            Available for Withdrawal
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-5">Last updated: {formattedDate}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition py-2.5 text-sm font-medium">
            <ArrowDownToLine className="w-5 h-5" />
            Deposit
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition py-2.5 text-sm font-medium">
            <ArrowUpFromLine className="w-5 h-5" />
            Withdraw
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Total Profit</p>
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-xl font-semibold mt-4">{formatMoney(userData.total_profit)}</p>
          <p className="text-xs text-emerald-400 mt-2">+100.0% Last 7 days</p>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Bonus</p>
            <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center">
              <Gift className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-xl font-semibold mt-4">$0.00</p>
          <p className="text-xs text-yellow-400 mt-2">Rewards & Promotions</p>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Total Deposit</p>
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <ArrowDownToLine className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-xl font-semibold mt-4">{formatMoney(userData.total_deposit)}</p>
          <p className="text-xs text-emerald-400 mt-2">All time</p>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Total Withdrawal</p>
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <ArrowUpFromLine className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-xl font-semibold mt-4">$0.00</p>
          <p className="text-xs text-emerald-400 mt-2">All time</p>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
