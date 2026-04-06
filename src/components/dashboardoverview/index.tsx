import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import FeaturedTraders from "./FeaturedTraders";
import AccountSnapshot from "./AccountSnapshot";
import StockTradingPortfolio from "./StockTradingPortfolio";
import PortfolioAndCryptos from "./PortfolioAndCryptos";
import RecentActivity from "./RecentActivity";

const DashboardOverview = ({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState({
    total_balance: 0,
    total_deposit: 0,
    total_profit: 0,
    first_name: "",
    last_name: "",
  });
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);

  const activities = [
    { action: "Bought Bitcoin", amount: "0.05 BTC", time: "2 hours ago", status: "completed" as const },
    { action: "Sold Ethereum", amount: "1.2 ETH", time: "5 hours ago", status: "completed" as const },
    { action: "Deposit USD", amount: "$5,000", time: "1 day ago", status: "pending" as const },
    { action: "Referral Bonus", amount: "$50", time: "2 days ago", status: "completed" as const },
  ];

  const featuredTraders = [
    {
      name: "James Anderson",
      risk: "Low",
      tag: "Top",
      roi: "70.0%",
      win: "82%",
      trades: "35",
      followers: "93",
      slots: "79",
      status: "copy" as const,
    },
    {
      name: "Sarah Johnson",
      risk: "Low",
      tag: "",
      roi: "60.0%",
      win: "72%",
      trades: "25",
      followers: "166",
      slots: "48",
      status: "copying" as const,
    },
    {
      name: "Emily Wong",
      risk: "Low",
      tag: "Top",
      roi: "50.0%",
      win: "77%",
      trades: "18",
      followers: "226",
      slots: "148",
      status: "copy" as const,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const profileRes = await axios.get("https://prime-api-gm2o.onrender.com/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { total_balance, total_deposit, total_profit, first_name, last_name } = profileRes.data.data;
        setUserData({ total_balance, total_deposit, total_profit, first_name, last_name });

        const chartData = Array.from({ length: 7 }, (_, i) => ({
          name: `Day ${i + 1}`,
          value: total_balance - 50 + Math.random() * 100,
        }));
        setPortfolioData(chartData);

        const cryptoRes = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 5,
            page: 1,
            sparkline: false,
          },
        });
        setCryptoData(cryptoRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Loading dashboard...
      </div>
    );
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const displayName = userData.first_name
    ? `${userData.first_name} ${userData.last_name}`.trim()
    : "there";
  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      <style>
        {`
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
            border-radius: 9999px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #111827;
            border-radius: 9999px;
          }
        `}
      </style>

      <DashboardHeader
        displayName={displayName}
        formattedDate={formattedDate}
        onKyc={() => setActiveTab?.("kyc")}
      />

      <StatsGrid
        userData={userData}
        showBalance={showBalance}
        onToggleBalance={() => setShowBalance((prev) => !prev)}
        formattedDate={formattedDate}
        formatMoney={formatMoney}
      />

      <FeaturedTraders traders={featuredTraders} />

      <AccountSnapshot totalBalance={formatMoney(userData.total_balance)} />

      <StockTradingPortfolio
        portfolioValue="$5,465.90"
        totalInvested="$5,485.03"
        profitLoss="-$19.13"
        holdings="1"
      />

      <PortfolioAndCryptos portfolioData={portfolioData} cryptoData={cryptoData} />

      <RecentActivity activities={activities} />
    </div>
  );
};

export default DashboardOverview;
