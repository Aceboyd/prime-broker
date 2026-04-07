import React from 'react';
import {
  ArrowDownUp,
  Crown,
  Search,
  ShieldCheck,
} from 'lucide-react';

export type StakingPlan = {
  cgId: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePositive: boolean;
  status: string;
  title: string;
  desc: string;
  apr: string;
  lock: string;
  range: string;
  rewards: string;
  penalty: string;
  autoCompound: string;
  badgeColor: string;
  marketCap: string;
};

export const stakingPlans: StakingPlan[] = [
  {
    cgId: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$89,465.00',
    change: '0.15%',
    changePositive: true,
    status: 'Active',
    title: 'Bitcoin 30-Day Stake',
    desc: 'Earn stable returns on your Bitcoin holdings with our 30-day fixed staking plan. Perfect for medium-term holders.',
    apr: '16.00%',
    lock: '7 Days',
    range: '$100 - $50,000',
    rewards: '5 Minutes',
    penalty: '10.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-orange-500',
    marketCap: '$1,787,058,167,882',
  },
  {
    cgId: 'avalanche-2',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: '$12.13',
    change: '-0.13%',
    changePositive: false,
    status: 'Active',
    title: 'Avalanche Premium',
    desc: 'High-performance staking for AVAX. Lock for 90 days and benefit from premium APR on this layer-1 token.',
    apr: '16.00%',
    lock: '90 Days',
    range: '$50 - $15,000',
    rewards: 'Daily',
    penalty: '15.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-rose-500',
    marketCap: '$4,892,334,112',
  },
  {
    cgId: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: '$127.29',
    change: '-0.81%',
    changePositive: false,
    status: 'Active',
    title: 'Solana High Yield',
    desc: 'Premium 180-day staking for Solana. Lock your SOL for half a year and enjoy industry-leading APR.',
    apr: '15.00%',
    lock: '180 Days',
    range: '$50 - $20,000',
    rewards: 'Daily',
    penalty: '20.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-gradient-to-br from-purple-500 to-teal-400',
    marketCap: '$58,421,334,221',
  },
  {
    cgId: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: '$0.36',
    change: '0.51%',
    changePositive: true,
    status: 'Active',
    title: 'Cardano Long Term',
    desc: 'Long-term staking plan for ADA enthusiasts. Lock for 180 days and maximize your Cardano earnings.',
    apr: '14.00%',
    lock: '180 Days',
    range: '$100 - $40,000',
    rewards: 'Daily',
    penalty: '18.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-blue-500',
    marketCap: '$12,458,911,900',
  },
  {
    cgId: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    price: '$1.00',
    change: '-0.02%',
    changePositive: false,
    status: 'Active',
    title: 'USDT Stable Earn',
    desc: 'High-yield staking for USDT with 90-day lock. Ideal for stable, predictable returns on your stablecoin holdings.',
    apr: '12.00%',
    lock: '90 Days',
    range: '$500 - $100,000',
    rewards: 'Daily',
    penalty: '15.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-emerald-500',
    marketCap: '$104,332,221,000',
  },
  {
    cgId: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: '$890.62',
    change: '0.50%',
    changePositive: true,
    status: 'Active',
    title: 'BNB Chain Stake',
    desc: 'Stake BNB for 90 days and earn competitive rewards. Great for BNB holders looking for passive income.',
    apr: '12.00%',
    lock: '90 Days',
    range: '$100 - $25,000',
    rewards: 'Daily',
    penalty: '12.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-yellow-500',
    marketCap: '$132,443,551,321',
  },
  {
    cgId: 'usd-coin',
    symbol: 'USDC',
    name: 'USDC',
    price: '$1.00',
    change: '0.00%',
    changePositive: false,
    status: 'Active',
    title: 'USDC Stable Plus',
    desc: 'Short-term 30-day stablecoin staking. Earn consistent returns on your USDC with minimal commitment.',
    apr: '11.00%',
    lock: '30 Days',
    range: '$500 - $100,000',
    rewards: 'Daily',
    penalty: '8.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-sky-500',
    marketCap: '$34,118,882,118',
  },
  {
    cgId: 'litecoin',
    symbol: 'LTC',
    name: 'Litecoin',
    price: '$67.88',
    change: '-0.15%',
    changePositive: false,
    status: 'Active',
    title: 'Litecoin Quick Stake',
    desc: 'Short 7-day staking plan for Litecoin. Perfect for testing staking or short-term holders.',
    apr: '9.00%',
    lock: '7 Days',
    range: '$100 - $30,000',
    rewards: 'Daily',
    penalty: '5.00% penalty',
    autoCompound: 'Available',
    badgeColor: 'bg-slate-500',
    marketCap: '$5,091,400,900',
  },
  {
    cgId: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: '$1.92',
    change: '-0.07%',
    changePositive: false,
    status: 'Active',
    title: 'Ripple Flexible Earn',
    desc: 'No lock period required. Stake XRP flexibly and withdraw anytime while earning steady rewards.',
    apr: '8.00%',
    lock: 'Flexible',
    range: '$200 - $50,000',
    rewards: 'Daily',
    penalty: '',
    autoCompound: 'Available',
    badgeColor: 'bg-white',
    marketCap: '$101,771,090,221',
  },
  {
    cgId: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,952.57',
    change: '0.18%',
    changePositive: true,
    status: 'Active',
    title: 'Ethereum Flexible Stake',
    desc: 'Flexible staking with no lock period. Withdraw anytime while earning competitive APR on your ETH.',
    apr: '5.50%',
    lock: 'Flexible',
    range: '$50 - $30,000',
    rewards: 'Daily',
    penalty: '',
    autoCompound: 'Available',
    badgeColor: 'bg-slate-600',
    marketCap: '$355,118,221,443',
  },
];

type CryptoStakingProps = {
  onViewDetails?: (plan: StakingPlan) => void;
};

const CryptoStaking = ({ onViewDetails }: CryptoStakingProps) => {
  const [prices, setPrices] = React.useState<Record<string, { usd?: number; usd_24h_change?: number }>>({});
  const [priceError, setPriceError] = React.useState<string | null>(null);
  const [durationFilter, setDurationFilter] = React.useState('All Durations');
  const coinIds = React.useMemo(() => stakingPlans.map((plan) => plan.cgId).join(','), []);
  const formatUsd = (value?: number) =>
    value !== undefined ? value.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) : null;

  React.useEffect(() => {
    let isMounted = true;
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        if (isMounted) {
          setPrices(data || {});
          setPriceError(null);
        }
      } catch (error) {
        if (isMounted) {
          setPriceError('Unable to load live prices right now.');
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [coinIds]);

  const filteredPlans =
    durationFilter === 'All Durations'
      ? stakingPlans
      : stakingPlans.filter((plan) => plan.lock === durationFilter);
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Crypto Staking</h1>
        <p className="text-gray-400 mt-2">Stake your crypto assets and earn passive rewards</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_auto_auto] gap-3 items-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              className="bg-transparent outline-none text-gray-200 w-full"
              placeholder="Search staking plans..."
            />
          </div>
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200"
            value={durationFilter}
            onChange={(event) => setDurationFilter(event.target.value)}
          >
            <option className="bg-slate-900">All Durations</option>
            <option className="bg-slate-900">7 Days</option>
            <option className="bg-slate-900">30 Days</option>
            <option className="bg-slate-900">60 Days</option>
            <option className="bg-slate-900">90 Days</option>
            <option className="bg-slate-900">180 Days</option>
            <option className="bg-slate-900">Flexible</option>
          </select>
          <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200">
            <option className="bg-slate-900">APR: High to Low</option>
            <option className="bg-slate-900">APR: Low to High</option>
            <option className="bg-slate-900">Duration: Short to Long</option>
            <option className="bg-slate-900">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white">
          <ShieldCheck className="w-4 h-4" />
          My Subscriptions
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400/90 text-slate-900">
          <Crown className="w-4 h-4" />
          Leaderboard
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => {
          const live = prices[plan.cgId];
          const livePrice = formatUsd(live?.usd) ?? plan.price;
          const liveChange =
            live?.usd_24h_change !== undefined
              ? `${live.usd_24h_change.toFixed(2)}%`
              : plan.change;
          const changePositive = live?.usd_24h_change !== undefined ? live.usd_24h_change >= 0 : plan.changePositive;
          return (
          <div key={plan.symbol} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${plan.badgeColor}`}>
                  {plan.symbol === 'SOL' ? 'S' : plan.symbol}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{plan.symbol}</p>
                  <p className="text-sm text-gray-400">{plan.name}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/30">
                {plan.status}
              </span>
            </div>

            <div className="p-5 border-b border-white/10">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Current Price</p>
                  <p className="text-xl font-semibold text-white mt-1">{livePrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">24h Change</p>
                  <p className={`text-lg font-semibold ${changePositive ? 'text-emerald-300' : 'text-rose-400'}`}>
                    {liveChange}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="text-white font-semibold text-lg">{plan.title}</p>
                <p className="text-sm text-gray-400 mt-2">{plan.desc}</p>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
                <p className="text-sm text-emerald-300">Annual Percentage Rate</p>
                <p className="text-3xl font-semibold text-emerald-300 mt-2">{plan.apr}</p>
                <p className="text-xs text-gray-400 mt-1">Fixed APR at subscription</p>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Lock Duration</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/30">
                    {plan.lock}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Stake Range</span>
                  <span className="text-white font-semibold">{plan.range}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rewards</span>
                  <span className="text-white font-semibold">{plan.rewards}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Early Withdrawal</span>
                  {plan.penalty ? (
                    <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs border border-rose-500/40">
                      {plan.penalty}
                    </span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-Compound</span>
                  <span className="inline-flex items-center gap-2 text-emerald-300">
                    <ArrowDownUp className="w-4 h-4" />
                    {plan.autoCompound}
                  </span>
                </div>
              </div>

              <button
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3"
                onClick={() => onViewDetails?.(plan)}
              >
                View Details & Stake
              </button>
            </div>
          </div>
          );
        })}
        {priceError && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-amber-200">
            {priceError}
          </div>
        )}
        {filteredPlans.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            No staking plans found
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoStaking;
