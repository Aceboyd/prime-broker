import React from "react";
import { TrendingUp, TrendingDown, Wallet, Gift, ChevronRight } from "lucide-react";

type StockTradingPortfolioProps = {
  portfolioValue: string;
  totalInvested: string;
  profitLoss: string;
  holdings: string;
};

const StockTradingPortfolio = ({ portfolioValue, totalInvested, profitLoss, holdings }: StockTradingPortfolioProps) => {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-semibold">Stock Trading Portfolio</h3>
        </div>
        <button className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
          View Trading
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white/5 p-5">
          <div className="flex items-center gap-3 text-gray-300">
            <Wallet className="w-5 h-5 text-emerald-400" />
            Portfolio Value
          </div>
          <p className="text-xl font-semibold mt-3">{portfolioValue}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-5">
          <div className="flex items-center gap-3 text-gray-300">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Total Invested
          </div>
          <p className="text-xl font-semibold mt-3">{totalInvested}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-5">
          <div className="flex items-center gap-3 text-gray-300">
            <TrendingDown className="w-5 h-5 text-red-400" />
            Profit/Loss
          </div>
          <p className="text-xl font-semibold mt-3 text-red-400">{profitLoss}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-5">
          <div className="flex items-center gap-3 text-gray-300">
            <Gift className="w-5 h-5 text-emerald-400" />
            Holdings
          </div>
          <p className="text-xl font-semibold mt-3">{holdings}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-base font-semibold mb-4">Top Holdings</h4>
        <div className="rounded-2xl bg-white/5 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-lg font-semibold">
              
            </div>
            <div>
              <p className="text-base font-semibold">AAPL</p>
              <p className="text-gray-400 text-xs">22.00 shares</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{portfolioValue}</p>
            <p className="text-red-400 text-xs">-0.35%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTradingPortfolio;
