import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

const stockPlans = [
  {
    symbol: 'NYSE:BRK.B',
    name: 'Berkshire Hathaway Inc.',
    short: 'Berkshire Investment Stock',
    desc: "Warren Buffett's holding company with diversified investments and strong fundamentals.",
    min: '$1,000',
    max: '$100,000',
    ret: '14%',
    duration: '12 Months',
  },
  {
    symbol: 'NYSE:WMT',
    name: 'Walmart Inc.',
    short: 'Walmart Retail Stock',
    desc: "World's largest retailer with strong e-commerce growth and stable returns.",
    min: '$350',
    max: '$35,000',
    ret: '9.5%',
    duration: '9 Months',
  },
  {
    symbol: 'NYSE:BA',
    name: 'The Boeing Company',
    short: 'Boeing Aerospace Stock',
    desc: 'Leading aerospace manufacturer with commercial and defense contracts.',
    min: '$400',
    max: '$40,000',
    ret: '15%',
    duration: '6 Months',
  },
  {
    symbol: 'NYSE:JPM',
    name: 'JPMorgan Chase & Co.',
    short: 'JPMorgan Banking Stock',
    desc: 'Largest U.S. bank with diversified financial services and strong balance sheet.',
    min: '$700',
    max: '$70,000',
    ret: '11%',
    duration: '12 Months',
  },
  {
    symbol: 'NYSE:MA',
    name: 'Mastercard Inc.',
    short: 'Mastercard Finance Stock',
    desc: 'Leading payment processing network with expanding digital services.',
    min: '$550',
    max: '$55,000',
    ret: '12.5%',
    duration: '6 Months',
  },
  {
    symbol: 'NYSE:V',
    name: 'Visa Inc.',
    short: 'Visa Payment Stock',
    desc: 'Global payment technology company with strong transaction growth.',
    min: '$600',
    max: '$60,000',
    ret: '13%',
    duration: '6 Months',
  },
  {
    symbol: 'NYSE:MCD',
    name: "McDonald's Corporation",
    short: "McDonald's Food Stock",
    desc: 'Global fast-food leader with consistent performance and dividends.',
    min: '$250',
    max: '$25,000',
    ret: '9%',
    duration: '9 Months',
  },
  {
    symbol: 'NYSE:NKE',
    name: 'Nike Inc.',
    short: 'Nike Sportswear Stock',
    desc: 'Leading athletic footwear and apparel brand with global reach.',
    min: '$300',
    max: '$30,000',
    ret: '8%',
    duration: '6 Months',
  },
  {
    symbol: 'NYSE:KO',
    name: 'The Coca-Cola Company',
    short: 'Coca-Cola Beverage Stock',
    desc: "World's largest beverage company with stable dividend history.",
    min: '$150',
    max: '$15,000',
    ret: '4%',
    duration: '5 Hours',
  },
  {
    symbol: 'NYSE:DIS',
    name: 'The Walt Disney Company',
    short: 'Disney Entertainment Stock',
    desc: 'Global entertainment and media conglomerate with iconic brands.',
    min: '$450',
    max: '$45,000',
    ret: '11%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:INTC',
    name: 'Intel Corporation',
    short: 'Intel Chip Stock',
    desc: 'Established semiconductor manufacturer with strong market presence.',
    min: '$200',
    max: '$20,000',
    ret: '9%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:AMD',
    name: 'Advanced Micro Devices Inc.',
    short: 'AMD Processor Stock',
    desc: 'High-performance computing and graphics technology leader.',
    min: '$350',
    max: '$35,000',
    ret: '17%',
    duration: '3 Months',
  },
  {
    symbol: 'NASDAQ:NVDA',
    name: 'NVIDIA Corporation',
    short: 'NVIDIA AI Stock',
    desc: 'Leading GPU manufacturer powering AI and gaming revolution.',
    min: '$1,500',
    max: '$200,000',
    ret: '22%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:NFLX',
    name: 'Netflix Inc.',
    short: 'Netflix Streaming Stock',
    desc: 'Premier streaming entertainment service with global subscriber base.',
    min: '$300',
    max: '$30,000',
    ret: '12%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:META',
    name: 'Meta Platforms Inc.',
    short: 'Meta Social Stock',
    desc: 'Leading social media and metaverse technology company.',
    min: '$400',
    max: '$40,000',
    ret: '14%',
    duration: '3 Months',
  },
  {
    symbol: 'NASDAQ:AAPL',
    name: 'Apple Inc.',
    short: 'Apple Consumer Tech Stock',
    desc: 'Iconic consumer tech company with strong ecosystem and cash flow.',
    min: '$500',
    max: '$50,000',
    ret: '10%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:MSFT',
    name: 'Microsoft Corporation',
    short: 'Microsoft Cloud Stock',
    desc: 'Cloud and software leader with durable enterprise demand.',
    min: '$600',
    max: '$60,000',
    ret: '11%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:GOOGL',
    name: 'Alphabet Inc.',
    short: 'Alphabet Growth Stock',
    desc: 'Search and advertising powerhouse with AI-driven growth.',
    min: '$700',
    max: '$70,000',
    ret: '12%',
    duration: '6 Months',
  },
  {
    symbol: 'NASDAQ:TSLA',
    name: 'Tesla Inc.',
    short: 'Tesla EV Stock',
    desc: 'EV leader with energy innovation and global manufacturing scale.',
    min: '$900',
    max: '$90,000',
    ret: '16%',
    duration: '4 Months',
  },
  {
    symbol: 'NYSE:GS',
    name: 'Goldman Sachs Group',
    short: 'Goldman Investment Stock',
    desc: 'Global investment bank with strong capital markets presence.',
    min: '$800',
    max: '$80,000',
    ret: '10.5%',
    duration: '9 Months',
  },
];

const VunelixTicker = ({ symbol }: { symbol: string }) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const existing = document.querySelector(
      'script[data-vunelix-ticker="true"]'
    ) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement('script');
      script.src =
        'https://vunelix.com/assets/bundles/js/widgets/ticker/vunelix-ticker.js';
      script.type = 'module';
      script.setAttribute('data-vunelix-ticker', 'true');
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.setAttribute('data-symbols', symbol);
  }, [symbol]);

  return (
    <div className="rounded-2xl bg-white p-3 shadow-inner">
      {/* Vunelix custom element */}
      <vunelix-ticker
        ref={elementRef as React.RefObject<HTMLElement>}
        data-theme="light"
      />
    </div>
  );
};

const StockInvestmentPlans = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stockPlans.slice(0, 20);
    return stockPlans
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.symbol.toLowerCase().includes(q) ||
          item.short.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query]);

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Stock Investment Plans</h1>
        <p className="text-gray-400 mt-2">
          Invest in top global stocks with guaranteed returns
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks by company name or symbol..."
          className="bg-transparent outline-none text-gray-200 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((stock) => (
          <div
            key={stock.symbol}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <div className="p-4 bg-gradient-to-b from-emerald-500/10 to-transparent">
              <VunelixTicker symbol={stock.symbol} />
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-5 text-white">
              <p className="text-lg font-semibold">{stock.name}</p>
              <p className="text-sm text-emerald-100">{stock.symbol}</p>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="text-white font-semibold">{stock.short}</p>
                <p className="text-sm text-gray-400 mt-1">{stock.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-xs text-emerald-200">Minimum</p>
                  <p className="text-emerald-200 font-semibold">{stock.min}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-xs text-emerald-200">Maximum</p>
                  <p className="text-emerald-200 font-semibold">{stock.max}</p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center justify-between text-sm text-emerald-100">
                  <span>Expected Return</span>
                  <span className="font-semibold text-emerald-200">{stock.ret}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-emerald-100 mt-2">
                  <span>Duration</span>
                  <span className="font-semibold text-white">{stock.duration}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2">Investment Amount</p>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2">
                  <span className="text-gray-400">$</span>
                  <input
                    className="bg-transparent outline-none text-gray-200 w-full"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Purchase Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockInvestmentPlans;
