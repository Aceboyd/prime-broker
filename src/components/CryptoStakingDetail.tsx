import React from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Coins,
  DollarSign,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { stakingPlans, StakingPlan } from './CryptoStaking';

const parseRange = (range: string) => {
  const numbers = range.replace(/\$/g, '').replace(/,/g, '').split('-').map((part) => Number(part.trim()));
  return { min: numbers[0] || 0, max: numbers[1] || 0 };
};

const formatMoney = (value: number) =>
  value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const parseApr = (apr: string) => Number(apr.replace('%', '')) / 100;
const parseLockDays = (lock: string) => {
  const match = lock.match(/\d+/);
  if (match) return Number(match[0]);
  return 30;
};

type CryptoStakingDetailProps = {
  plan?: StakingPlan | null;
  onBack?: () => void;
};

const CryptoStakingDetail = ({ plan, onBack }: CryptoStakingDetailProps) => {
  const activePlan = plan ?? stakingPlans[0];
  const { min, max } = parseRange(activePlan.range);
  const [stakeAmount, setStakeAmount] = React.useState(min || 100);
  const [autoCompound, setAutoCompound] = React.useState(true);
  const lockDays = parseLockDays(activePlan.lock);
  const [stakingDays, setStakingDays] = React.useState(lockDays);
  const [balance, setBalance] = React.useState(206.59);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [stakeStatus, setStakeStatus] = React.useState<'idle' | 'processing' | 'completed'>('idle');
  const [liveData, setLiveData] = React.useState<{ price?: number; change24h?: number; marketCap?: number }>({});
  const [liveError, setLiveError] = React.useState<string | null>(null);

  const aprRate = parseApr(activePlan.apr);
  const dailyRewards = stakeAmount * aprRate / 365;
  const totalRewards = dailyRewards * stakingDays;
  const totalReturn = stakeAmount + totalRewards;
  const roiPct = stakeAmount > 0 ? (totalRewards / stakeAmount) * 100 : 0;
  const canStake = stakeAmount >= min && stakeAmount <= max && stakeAmount <= balance;
  const balanceDisplay = formatMoney(balance);

  React.useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${activePlan.cgId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
        );
        if (!response.ok) throw new Error('Failed to fetch live data');
        const data = await response.json();
        const coin = data?.[activePlan.cgId];
        if (isMounted) {
          setLiveData({
            price: coin?.usd,
            change24h: coin?.usd_24h_change,
            marketCap: coin?.usd_market_cap,
          });
          setLiveError(null);
        }
      } catch (error) {
        if (isMounted) setLiveError('Live market data unavailable.');
      }
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activePlan.cgId]);

  const livePrice = liveData.price !== undefined ? formatMoney(liveData.price) : activePlan.price;
  const liveChange =
    liveData.change24h !== undefined ? `${liveData.change24h.toFixed(2)}%` : activePlan.change;
  const changePositive = liveData.change24h !== undefined ? liveData.change24h >= 0 : activePlan.changePositive;
  const liveMarketCap =
    liveData.marketCap !== undefined ? formatMoney(liveData.marketCap) : activePlan.marketCap;

  const handleStake = () => {
    setStakeStatus('idle');
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setStakeStatus('processing');
    setTimeout(() => {
      setBalance((prev) => Math.max(prev - stakeAmount, 0));
      setStakeStatus('completed');
    }, 1200);
  };

  const handleClose = () => {
    setModalOpen(false);
    setStakeStatus('idle');
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <button
        className="inline-flex items-center gap-2 text-sky-300 hover:text-white"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Staking Plans
      </button>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-semibold ${activePlan.badgeColor}`}>
              {activePlan.symbol === 'SOL' ? 'S' : activePlan.symbol}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{activePlan.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-400 mt-2">
                <span className="text-base">{activePlan.symbol} - {activePlan.name}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/30">
                  {activePlan.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mt-5 max-w-3xl">{activePlan.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">Current Price</p>
            <p className="text-xl font-semibold text-white mt-2">{livePrice}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">24h Change</p>
            <p className={`text-xl font-semibold mt-2 ${changePositive ? 'text-emerald-300' : 'text-rose-400'}`}>
              {liveChange}
            </p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-xl font-semibold text-white mt-2">{liveMarketCap}</p>
          </div>
        </div>
        {liveError && (
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3 text-xs text-amber-200">
            {liveError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-semibold text-emerald-300">{activePlan.apr}</p>
              <p className="text-sm text-gray-400 mt-1">APR</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-semibold text-white">{activePlan.lock}</p>
              <p className="text-sm text-gray-400 mt-1">Lock Period</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-semibold text-white">{activePlan.rewards}</p>
              <p className="text-sm text-gray-400 mt-1">Rewards</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-semibold text-emerald-300">0</p>
              <p className="text-sm text-gray-400 mt-1">Stakers</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white font-semibold text-lg">
              <Coins className="w-5 h-5" />
              Staking Calculator
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-400">Stake Amount ($)</label>
              <input
                className="mt-3 w-full"
                type="range"
                min={min || 0}
                max={max || 50000}
                value={stakeAmount}
                onChange={(event) => setStakeAmount(Number(event.target.value))}
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>{formatMoney(min)}</span>
                <span>{formatMoney(max)}</span>
              </div>
              <div className="mt-4 w-40 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-center text-white">
                {formatMoney(stakeAmount)}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-400">Staking Period</label>
              <input
                className="mt-3 w-full"
                type="range"
                min={1}
                max={lockDays}
                value={stakingDays}
                onChange={(event) => setStakingDays(Number(event.target.value))}
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>1 day</span>
                <span>{lockDays} days</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <div>
                <p className="text-white font-semibold">Auto-Compound Rewards</p>
                <p className="text-sm text-gray-400">Automatically restake rewards for higher returns</p>
              </div>
              <button
                className={`w-12 h-6 rounded-full flex items-center ${autoCompound ? 'bg-emerald-500/70' : 'bg-white/10'}`}
                onClick={() => setAutoCompound((prev) => !prev)}
              >
                <span className={`w-5 h-5 rounded-full bg-white transition-transform ${autoCompound ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5">
              <p className="text-white font-semibold">Estimated Returns</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400">Daily Rewards</p>
                  <p className="text-emerald-300 text-xl font-semibold">{formatMoney(dailyRewards)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Rewards</p>
                  <p className="text-emerald-300 text-xl font-semibold">{formatMoney(totalRewards)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Return</p>
                  <p className="text-white text-xl font-semibold">{formatMoney(totalReturn)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">ROI</p>
                  <p className="text-amber-300 text-xl font-semibold">{roiPct.toFixed(2)}%</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">* Estimates based on {activePlan.apr} APR. Actual returns may vary.</p>
            </div>
          </div>

          {activePlan.penalty && (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-rose-200">
              <div className="flex items-center gap-3 font-semibold">
                <ShieldCheck className="w-5 h-5" />
                Early Withdrawal Penalty
              </div>
              <p className="text-sm mt-2">
                If you cancel your stake before {activePlan.lock}, a {activePlan.penalty} will be applied to your accumulated rewards.
                Your principal amount is always returned in full.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white font-semibold text-lg">Start Staking</p>
            <label className="text-sm text-gray-400 mt-4 block">Stake Amount *</label>
            <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <input
                className="bg-transparent outline-none text-gray-200 w-full"
                value={stakeAmount}
                onChange={(event) => setStakeAmount(Number(event.target.value) || min)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Min: {formatMoney(min)} | Max: {formatMoney(max)}</p>

            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between text-white">
              <span>Your Balance</span>
              <span className="font-semibold">{balanceDisplay}</span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
              <input type="checkbox" checked={autoCompound} onChange={() => setAutoCompound((prev) => !prev)} />
              <div>
                <p className="text-white font-semibold">Enable Auto-Compound</p>
                <p className="text-xs text-gray-400">Automatically restake rewards for maximum returns</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Plan Capacity</span>
                <span>0.5% filled</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-emerald-400" style={{ width: '0.5%' }} />
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>Lock Duration</span>
                <span className="text-white font-semibold">{activePlan.lock}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Fixed APR</span>
                <span className="text-emerald-300 font-semibold">{activePlan.apr}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Reward Interval</span>
                <span className="text-white font-semibold">{activePlan.rewards}</span>
              </div>
            </div>

            <button
              className={`mt-6 w-full rounded-xl text-white font-semibold py-3 flex items-center justify-center gap-2 ${
                canStake ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-600/40 cursor-not-allowed'
              }`}
              onClick={handleStake}
              disabled={!canStake}
            >
              <Lock className="w-4 h-4" />
              Stake Now
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              By staking, you agree that your APR rate ({activePlan.apr}) will be locked at subscription.
            </p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={stakeStatus === 'processing' ? undefined : handleClose}
          />
          <div className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1f2937] to-[#111827] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Confirm Stake</h3>
              <p className="text-sm text-gray-400 mt-2">Review your staking details before confirming.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Plan</span>
                  <span className="text-white font-semibold">{activePlan.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amount</span>
                  <span className="text-white font-semibold">{formatMoney(stakeAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <span className="text-white font-semibold">{stakingDays} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>APR</span>
                  <span className="text-emerald-300 font-semibold">{activePlan.apr}</span>
                </div>
              </div>

              {stakeStatus === 'processing' && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
                  Processing your stake...
                </div>
              )}

              {stakeStatus === 'completed' && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Stake completed successfully.
                </div>
              )}
            </div>
            <div className="p-6 pt-0 space-y-3">
              {stakeStatus === 'idle' && (
                <button
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3"
                  onClick={handleConfirm}
                >
                  Confirm Stake
                </button>
              )}
              {stakeStatus !== 'processing' && (
                <button
                  className="w-full rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-medium py-3"
                  onClick={handleClose}
                >
                  {stakeStatus === 'completed' ? 'Close' : 'Cancel'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoStakingDetail;
