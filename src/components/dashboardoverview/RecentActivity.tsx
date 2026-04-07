import React from "react";
import { ArrowDownToLine, ArrowUpFromLine, Repeat } from "lucide-react";

type Activity = {
  action: string;
  amount: string;
  time: string;
  status: "completed" | "pending";
};

type RecentActivityProps = {
  activities: Activity[];
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const iconFor = (action: string) => {
    const lower = action.toLowerCase();
    if (lower.includes("deposit") || lower.includes("buy")) return ArrowDownToLine;
    if (lower.includes("withdraw") || lower.includes("sell")) return ArrowUpFromLine;
    return Repeat;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-gray-400 mt-1">Latest account actions and transactions</p>
        </div>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>

      <div className="mt-6 space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
        {activities.map((activity, index) => {
          const Icon = iconFor(activity.action);
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === "completed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{activity.amount}</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.status === "completed"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
