import React from "react";
import { TrendingUp, Users, CheckCircle2, ChevronRight } from "lucide-react";

type Trader = {
  name: string;
  risk: string;
  tag: string;
  roi: string;
  win: string;
  trades: string;
  followers: string;
  slots: string;
  status: "copy" | "copying";
};

type FeaturedTradersProps = {
  traders: Trader[];
};

const FeaturedTraders = ({ traders }: FeaturedTradersProps) => {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-semibold">Featured Expert Traders</h3>
          </div>
          <p className="text-gray-400 mt-1 text-sm">Copy profitable traders automatically</p>
        </div>
        <button className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
          View all
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {traders.map((trader) => (
          <div key={trader.name} className="rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-slate-900 font-semibold">
                {trader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-base font-semibold">{trader.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-300 text-xs">
                    {trader.risk}
                  </span>
                  {trader.tag && (
                    <span className="px-2 py-1 rounded-md bg-blue-500/15 text-blue-300 text-xs">
                      {trader.tag}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <p className="text-xs text-gray-400">ROI</p>
                <p className="text-emerald-300 font-semibold text-sm">{trader.roi}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <p className="text-xs text-gray-400">Win Rate</p>
                <p className="text-blue-300 font-semibold text-sm">{trader.win}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <p className="text-xs text-gray-400">Trades</p>
                <p className="text-white font-semibold text-sm">{trader.trades}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>{trader.followers} followers</span>
              <span>{trader.slots} slots left</span>
            </div>

            {trader.status === "copying" ? (
              <button className="mt-4 w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2.5 text-emerald-300 text-sm font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Currently Copying
              </button>
            ) : (
              <button className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Copy Trader
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <p className="font-semibold text-sm">Automated Copy Trading</p>
            <p className="text-xs text-emerald-200/80 mt-1">
              These expert traders have automatic profit distribution enabled. Your investment will earn returns based on their trading performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTraders;
