import React, { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Repeat, Inbox } from "lucide-react";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("deposits");

  const deposits = [
    {
      amount: "$5009",
      paymentMode: "USDT",
      status: "Processed",
      date: "Mon, Mar 23, 2026 6:47 PM",
    },
    {
      amount: "$3000",
      paymentMode: "Bitcoin",
      status: "Processed",
      date: "Sat, Mar 21, 2026 10:28 AM",
    },
  ];

  const withdrawals: any[] = [];

  const others = [
    {
      amount: "$5000",
      type: "Investment capital",
      plan: "Basic Plan",
      date: "Mon, Mar 23, 2026 6:30 PM",
    },
    {
      amount: "$500",
      type: "Investment capital",
      plan: "Coca-Cola Beverage Stock",
      date: "Mon, Mar 23, 2026 4:25 PM",
    },
    {
      amount: "$5000",
      type: "Plan purchase",
      plan: "Basic Plan",
      date: "Mon, Mar 23, 2026 1:30 PM",
    },
    {
      amount: "$500",
      type: "Investment",
      plan: "Coca-Cola Beverage Stock",
      date: "Mon, Mar 23, 2026 11:23 AM",
    },
    {
      amount: "$600",
      type: "Copy Trading Profit",
      plan: "Copy Trading Profit: Sarah Johnson",
      date: "Mon, Mar 23, 2026 10:30 AM",
    },
    {
      amount: "$600",
      type: "Copy Trading Profit",
      plan: "Copy Trading Profit: Sarah Johnson",
      date: "Sun, Mar 22, 2026 10:30 AM",
    },
    {
      amount: "$1507.5",
      type: "Copy Trading Return",
      plan: "Copy Trading Cancelled: James Anderson",
      date: "Sun, Mar 22, 2026 9:04 AM",
    },
  ];

  const tabs = [
    { id: "deposits", label: "Deposits", Icon: ArrowDownToLine },
    { id: "withdrawals", label: "Withdrawals", Icon: ArrowUpFromLine },
    { id: "others", label: "Others", Icon: Repeat },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Transaction Records</h2>
        <p className="text-gray-400 text-sm mt-1">View all your financial activities</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-6 pt-6">
          <div className="flex flex-wrap gap-6">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 pb-4 border-b-2 transition ${
                  activeTab === id
                    ? "text-emerald-400 border-emerald-500"
                    : "text-gray-400 border-transparent hover:text-gray-200"
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeTab === id ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10" />

        {activeTab === "deposits" && (
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
              <div>Amount</div>
              <div>Payment Mode</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            <div className="divide-y divide-white/5">
              {deposits.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-200">
                  <div>{row.amount}</div>
                  <div>{row.paymentMode}</div>
                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300">
                      {row.status}
                    </span>
                  </div>
                  <div className="text-gray-400">{row.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "withdrawals" && (
          <div className="p-6">
            <div className="grid grid-cols-5 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
              <div>Amount</div>
              <div>Amount + Charges</div>
              <div>Payment Mode</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                <Inbox className="w-7 h-7" />
              </div>
              <p className="text-white font-medium mt-4">No withdrawals found</p>
              <p className="text-sm text-gray-400 mt-1">Your withdrawal history will appear here</p>
            </div>
          </div>
        )}

        {activeTab === "others" && (
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
              <div>Amount</div>
              <div>Type</div>
              <div>Plan/Narration</div>
              <div>Date</div>
            </div>
            <div className="divide-y divide-white/5">
              {others.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-200">
                  <div>{row.amount}</div>
                  <div>{row.type}</div>
                  <div>{row.plan}</div>
                  <div className="text-gray-400">{row.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
