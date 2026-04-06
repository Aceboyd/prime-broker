import React from "react";
import { ShieldCheck } from "lucide-react";

type DashboardHeaderProps = {
  displayName: string;
  formattedDate: string;
  onKyc: () => void;
};

const DashboardHeader = ({ displayName, formattedDate, onKyc }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">Welcome back, {displayName}!</h1>
        <p className="text-emerald-400 mt-1 text-sm">{formattedDate}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition text-white text-sm font-medium"
          onClick={onKyc}
        >
          <ShieldCheck className="w-5 h-5" />
          Verify KYC
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
