import React, { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';
import { Download } from 'lucide-react';

const STOCKS = [
  { symbol: 'NYSE:BRK.B', name: 'Berkshire Hathaway', price: 477.35, change: -0.24, high: 481.2, low: 474.1, volume: 3200000, marketCap: 880000 },
  { symbol: 'NYSE:WMT', name: 'Walmart', price: 208.22, change: 0.43, high: 210.1, low: 205.4, volume: 5100000, marketCap: 650000 },
  { symbol: 'NYSE:BA', name: 'Boeing', price: 208.22, change: 0.43, high: 209.4, low: 204.9, volume: 4200000, marketCap: 120000 },
  { symbol: 'NYSE:JPM', name: 'JPMorgan', price: 294.6, change: -0.26, high: 299.2, low: 292.1, volume: 3800000, marketCap: 460000 },
  { symbol: 'NYSE:MA', name: 'Mastercard', price: 493.44, change: 0.36, high: 498.1, low: 489.3, volume: 2100000, marketCap: 470000 },
  { symbol: 'NYSE:V', name: 'Visa', price: 300.8, change: 0.77, high: 303.4, low: 298.6, volume: 2900000, marketCap: 620000 },
  { symbol: 'NYSE:MCD', name: "McDonald's", price: 307.14, change: -0.05, high: 309.5, low: 304.8, volume: 1800000, marketCap: 220000 },
  { symbol: 'NYSE:NKE', name: 'Nike', price: 44.19, change: -0.99, high: 45.1, low: 43.7, volume: 5400000, marketCap: 110000 },
  { symbol: 'NYSE:KO', name: 'Coca-Cola', price: 76.72, change: 0.84, high: 77.4, low: 75.8, volume: 4100000, marketCap: 330000 },
  { symbol: 'NYSE:DIS', name: 'Disney', price: 96.61, change: 0.05, high: 98.2, low: 95.4, volume: 3600000, marketCap: 180000 },
  { symbol: 'NASDAQ:INTC', name: 'Intel', price: 50.38, change: 4.89, high: 52.0, low: 49.1, volume: 7200000, marketCap: 210000 },
  { symbol: 'NASDAQ:AMD', name: 'AMD', price: 217.5, change: 3.47, high: 221.8, low: 213.9, volume: 6900000, marketCap: 350000 },
  { symbol: 'NASDAQ:NVDA', name: 'NVIDIA', price: 177.39, change: 0.93, high: 180.2, low: 174.6, volume: 8400000, marketCap: 2000000 },
  { symbol: 'NASDAQ:NFLX', name: 'Netflix', price: 98.66, change: 3.25, high: 101.2, low: 96.4, volume: 2600000, marketCap: 240000 },
  { symbol: 'NASDAQ:META', name: 'Meta', price: 574.46, change: -0.82, high: 582.3, low: 569.1, volume: 4700000, marketCap: 1400000 },
];

const MarketTrades = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(STOCKS[0].symbol);
  const [timeframe, setTimeframe] = useState('30');

  const selected = STOCKS.find((s) => s.symbol === selectedSymbol) || STOCKS[0];

  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-white">Stock Trading</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1"
          >
            <option value="1">1m</option>
            <option value="5">5m</option>
            <option value="15">15m</option>
            <option value="30">30m</option>
            <option value="60">1h</option>
            <option value="240">4h</option>
            <option value="D">1D</option>
            <option value="W">1W</option>
          </select>
          <button className="text-white bg-green-600 px-3 py-1 rounded flex items-center gap-1">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stocks list ? horizontal scroll on mobile */}
      <div className="overflow-x-auto custom-scroll lg:overflow-visible">
        <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0 bg-gray-800 p-3 rounded-lg">
          {STOCKS.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => setSelectedSymbol(stock.symbol)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
                selectedSymbol === stock.symbol ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{stock.symbol}</span>
              </div>
              <span className={`text-sm ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Detail */}
      {selected && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-lg md:text-xl font-bold">
                {selected.name} ({selected.symbol})
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white text-xl md:text-2xl font-bold">
                ${selected.price.toLocaleString()}
              </p>
              <p className={`text-sm ${selected.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selected.change.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
            <div><p className="text-gray-400">High</p><p className="text-white">${selected.high.toLocaleString()}</p></div>
            <div><p className="text-gray-400">Low</p><p className="text-white">${selected.low.toLocaleString()}</p></div>
            <div><p className="text-gray-400">Volume</p><p className="text-white">{(selected.volume / 1e6).toFixed(2)}M</p></div>
            <div><p className="text-gray-400">Market Cap</p><p className="text-white">${(selected.marketCap / 1e3).toFixed(2)}B</p></div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-gray-800 p-2 sm:p-4 rounded-lg">
        <div className="h-[300px] md:h-[500px]">
          <TradingViewWidget symbol={selected.symbol} interval={timeframe} />
        </div>
      </div>
    </div>
  );
};

export default MarketTrades;
