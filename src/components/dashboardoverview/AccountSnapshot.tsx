import React from "react";
import { CheckCircle2, ArrowDownToLine, ArrowUpRight } from "lucide-react";

type AccountSnapshotProps = {
  totalBalance: string;
};

const AccountSnapshot = ({ totalBalance }: AccountSnapshotProps) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/5">
      <div className="bg-gradient-to-r from-emerald-700/40 to-emerald-500/30 p-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl font-semibold">
          re
        </div>
        <p className="mt-4 text-xl font-semibold">real ana</p>
        <p className="text-gray-200/80 mt-1 text-sm">Member since Jan 2026</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-300">
            <span className="text-sm">Account Balance</span>
            <span className="text-white font-semibold text-sm">{totalBalance}</span>
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <span className="text-sm">Bonus</span>
            <span className="text-white font-semibold text-sm">$0.00</span>
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <span className="text-sm">Referral Bonus</span>
            <span className="text-white font-semibold text-sm">$0.00</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-sm font-medium">
            <ArrowDownToLine className="w-5 h-5" />
            Deposit
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-sm font-medium">
            <ArrowUpRight className="w-5 h-5" />
            Withdraw
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-gray-400 text-sm">Account Status</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4" />
            Unverified
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSnapshot;
