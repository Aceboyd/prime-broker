import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TradingViewWidget from './TradingViewWidget';
import { Download } from 'lucide-react';

const COINS = [
  'bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin', 'binancecoin',
  'polkadot', 'litecoin', 'chainlink', 'tron', 'polygon', 'avalanche-2',
  'uniswap', 'cosmos', 'stellar', 'vechain', 'aptos', 'arbitrum',
  'internet-computer', 'maker'
];

const MarketTrades = () => {
  const [marketData, setMarketData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [favorites, setFavorites] = useState(['bitcoin']);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [timeframe, setTimeframe] = useState('30');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ fetchers unchanged … (keeping your axios logic)
  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', ids: COINS.join(','), price_change_percentage: '24h' }
      });
      setMarketData(data);
    } catch (err) {
      console.error('Failed to fetch market data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBinanceData = async (id) => {
    try {
      const selected = marketData.find(c => c.id === id);
      if (!selected) return;
      const symbol = selected.symbol.toUpperCase();
      const binanceSymbol = symbol + (id === 'tether' ? 'USD' : 'USDT');

      const [depthRes, tradesRes] = await Promise.all([
        axios.get(`https://api.binance.com/api/v3/depth?symbol=${binanceSymbol}&limit=5`),
        axios.get(`https://api.binance.com/api/v3/trades?symbol=${binanceSymbol}&limit=8`)
      ]);

      setOrderBook({
        bids: depthRes.data.bids.map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) })),
        asks: depthRes.data.asks.map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) }))
      });

      setRecentTrades(
        tradesRes.data.map(t => ({
          price: parseFloat(t.price),
          qty: parseFloat(t.qty),
          time: new Date(t.time).toLocaleTimeString(),
          isBuyerMaker: t.isBuyerMaker,
        }))
      );
    } catch (err) {
      console.error('Binance error', err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBinanceData(selectedCoin);
  }, [selectedCoin, marketData]);

  const selected = marketData.find(c => c.id === selectedCoin) || {};

  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-white">Market Trades</h2>
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

      {/* Markets list → horizontal scroll on mobile */}
              <div className="overflow-x-auto custom-scroll lg:overflow-visible">
                <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0 bg-gray-800 p-3 rounded-lg">

          {marketData.map(coin => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
                selectedCoin === coin.id ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <img src={coin.image} alt="logo" className="w-5 h-5" />
                <span className="text-white text-sm font-medium">
                  {coin.symbol.toUpperCase()}{coin.id === 'tether' ? '/USD' : '/USDT'}
                </span>
              </div>
              <span className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coin Detail */}
      {selected && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <img src={selected.image} className="w-6 h-6" alt="icon" />
              <h3 className="text-white text-lg md:text-xl font-bold">{selected.name} ({selected.symbol?.toUpperCase()})</h3>
            </div>
            <div className="text-right">
              <p className="text-white text-xl md:text-2xl font-bold">${selected.current_price?.toLocaleString() || 'N/A'}</p>
              <p className={`text-sm ${selected.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selected.price_change_percentage_24h?.toFixed(2) || '0.00'}%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
            <div><p className="text-gray-400">High</p><p className="text-white">${selected.high_24h?.toLocaleString()}</p></div>
            <div><p className="text-gray-400">Low</p><p className="text-white">${selected.low_24h?.toLocaleString()}</p></div>
            <div><p className="text-gray-400">Volume</p><p className="text-white">${(selected.total_volume / 1e6)?.toFixed(2)}M</p></div>
            <div><p className="text-gray-400">Market Cap</p><p className="text-white">${(selected.market_cap / 1e9)?.toFixed(2)}B</p></div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-gray-800 p-2 sm:p-4 rounded-lg">
        <div className="h-[300px] md:h-[500px]">
          <TradingViewWidget symbol={`${selected?.symbol?.toUpperCase()}${selectedCoin === 'tether' ? 'USD' : 'USDT'}`} interval={timeframe} />
        </div>
      </div>

      {/* Buy/Sell buttons */}
      <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-3 w-full">🔻 Sell Market</button>
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 w-full">🔺 Buy Market</button>
      </div>

      {/* Order Book + Trades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order Book */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <h3 className="text-white mb-2">Order Book</h3>
          <h4 className="text-red-400 mb-1 text-sm">Asks</h4>
          {orderBook.asks.map((a, i) => (
            <div key={i} className="flex justify-between text-sm text-red-400">
              <span>${a.price.toFixed(2)}</span><span>{a.qty.toFixed(4)}</span>
            </div>
          ))}
          <div className="text-center text-white py-2 border-y border-gray-700 my-2 text-sm">Spread</div>
          <h4 className="text-green-400 mb-1 text-sm">Bids</h4>
          {orderBook.bids.map((b, i) => (
            <div key={i} className="flex justify-between text-sm text-green-400">
              <span>${b.price.toFixed(2)}</span><span>{b.qty.toFixed(4)}</span>
            </div>
          ))}
        </div>

        {/* Recent Trades */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <h3 className="text-white mb-2">Recent Trades</h3>
          <div className="space-y-1">
            {recentTrades.map((t, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className={t.isBuyerMaker ? 'text-red-400' : 'text-green-400'}>${t.price.toFixed(2)}</span>
                <span className="text-gray-400">{t.qty.toFixed(4)}</span>
                <span className="text-gray-500">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrades;
