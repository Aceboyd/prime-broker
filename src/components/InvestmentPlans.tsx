import React, { useState } from 'react';
import { Wallet, LineChart, ShieldCheck, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const plans = [
  {
    name: 'Children Scholarship...',
    min: '$100,000',
    roi: '50% - 50%',
    tag: 'Min: $100,000',
    tag2: 'Max: $1,000,000',
    tag3: '50% - 50% ROI',
    accent: 'from-emerald-500 to-emerald-600',
    active: true,
    duration: '20 Days',
    rate: '50% Daily',
    bonus: '$0',
  },
  {
    name: 'Fixed plan',
    min: '$50,000',
    roi: '80% - 80%',
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Standard Plan',
    min: '$30,000',
    roi: '3% - 3%',
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Basic Plan',
    min: '$200',
    roi: '2% - 3%',
    accent: 'from-emerald-500 to-emerald-600',
  },
];

const faqs = [
  {
    q: 'How are returns calculated?',
    a: 'Returns are calculated based on the performance of underlying assets and market conditions. Each plan has a specified return rate, which may be fixed or variable depending on the plan you choose.',
  },
  {
    q: 'How secure are my investments?',
    a: 'Your investments are protected by our robust security measures and risk management strategies. We employ diversification, market hedging, and liquidity reserves to ensure your capital is safeguarded.',
  },
  {
    q: 'Can I withdraw before the term ends?',
    a: 'Yes, most of our plans allow early withdrawals. However, early withdrawal may affect your returns. Please check the specific terms of each investment plan for details on withdrawal policies.',
  },
];

const quickAmounts = ['$100', '$250', '$500', '$1K', '$2K', '$5K'];

const InvestmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [amount, setAmount] = useState('0');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Hero */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0f2027] via-[#162a2f] to-[#0e2b25] p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Investment Hub</h1>
            <p className="text-gray-300 mt-2">
              Grow your wealth with our curated investment plans
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-5 py-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Your Balance</p>
              <p className="text-xl font-semibold text-white">$207</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left main */}
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <LineChart className="w-6 h-6 text-emerald-300" />
                <h3 className="text-lg font-semibold text-white">Curated Investment Plans</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Markets active
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => {
                  const isActive = selectedPlan.name === plan.name;
                  return (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan)}
                      className={`text-left rounded-2xl border transition-all duration-200 p-4 ${
                        isActive
                          ? 'border-emerald-500/60 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]'
                          : 'border-white/10 bg-white/5 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-4">
                        <LineChart className="w-6 h-6 text-emerald-300" />
                      </div>
                      <p className="text-white font-semibold">{plan.name}</p>
                      <p className="text-sm text-gray-400 mt-2">From {plan.min}</p>
                      <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 text-xs">
                        {plan.roi}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{selectedPlan.name} Plan</p>
                    <p className="text-sm text-gray-400 mt-1">20 Days plan with 50% Daily returns</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 text-xs">
                      {selectedPlan.tag || 'Min: $100,000'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 text-xs">
                      {selectedPlan.tag2 || 'Max: $1,000,000'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 text-xs">
                      {selectedPlan.tag3 || '50% - 50% ROI'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-semibold">{selectedPlan.duration || '20 Days'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <LineChart className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Return Rate</p>
                      <p className="text-white font-semibold">{selectedPlan.rate || '50% Daily'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bonus</p>
                      <p className="text-white font-semibold">{selectedPlan.bonus || '$0'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white font-semibold">Quick Amount Selection</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {quickAmounts.map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.replace('$', ''))}
                    className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white py-3 text-sm"
                  >
                    {val}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-white font-semibold">Or Enter Custom Amount</p>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-400">$</span>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent outline-none text-white w-full"
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                  <span>$100,000</span>
                  <span>$1,000,000</span>
                </div>
                <div className="h-1 rounded-full bg-white/10 mt-2">
                  <div className="h-1 rounded-full bg-emerald-500 w-1/3" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <p className="text-white font-semibold">Payment Method</p>
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-emerald-200" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Account Balance</p>
                    <p className="text-sm text-gray-300">$206.59 available</p>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white font-semibold">Investment Summary</p>
                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Selected Plan:</span>
                    <span className="text-white font-semibold">{selectedPlan.name} Plan</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Investment Amount:</span>
                    <span className="text-white font-semibold">${Number(amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Method:</span>
                    <span className="text-white font-semibold">Account Balance</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="text-white font-semibold">{selectedPlan.duration || '20 Days'}</span>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Confirm & Invest Now
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="w-5 h-5 text-emerald-300" />
              <p className="text-white font-semibold">Investment Insights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-white font-semibold mt-4">Performance</p>
                <p className="text-sm text-gray-300 mt-2">
                  Our investment plans have consistently outperformed market benchmarks.
                </p>
                <p className="text-emerald-300 text-2xl font-bold mt-4">+18.7%</p>
                <p className="text-xs text-gray-400">avg. annual return</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-300" />
                </div>
                <p className="text-white font-semibold mt-4">Risk Management</p>
                <p className="text-sm text-gray-300 mt-2">
                  Our diversified approach minimizes risk while maximizing returns.
                </p>
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-sky-400 w-2/3" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-300" />
                </div>
                <p className="text-white font-semibold mt-4">Liquidity</p>
                <p className="text-sm text-gray-300 mt-2">
                  Access your funds on your terms with flexible withdrawal options.
                </p>
              
              </div>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <ArrowUpRight className="w-5 h-5 text-emerald-300" />
              <p className="text-white font-semibold">Your Investment Journey</p>
            </div>
            <div className="p-6 space-y-6">
              {[
                {
                  step: '1',
                  title: 'Choose Your Plan',
                  desc: 'Select from our range of carefully crafted investment plans that align with your financial goals and risk tolerance.',
                },
                {
                  step: '2',
                  title: 'Fund Your Investment',
                  desc: 'Deposit funds into your selected plan using our secure payment methods. Start with as little as $100.',
                },
                {
                  step: '3',
                  title: 'Track & Grow',
                  desc: "Monitor your portfolio's performance in real-time and watch your wealth grow with our competitive returns.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-sm font-semibold">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <p className="text-white font-semibold">Common Questions</p>
            </div>
            <div className="p-6 space-y-4">
              {faqs.map((item, index) => (
                <div key={item.q} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex((prev) => (prev === index ? -1 : index))
                    }
                    className="w-full flex items-start justify-between gap-3 text-left"
                  >
                    <p className="text-white font-semibold">{item.q}</p>
                    <span className="text-gray-400 text-lg">
                      {openFaqIndex === index ? '˄' : '˅'}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <p className="text-sm text-gray-300 mt-2">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlans;
