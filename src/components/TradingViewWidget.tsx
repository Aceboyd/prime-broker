import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const TradingViewWidget = ({ symbol, interval }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  // Mock OHLC data for each coin and timeframe
  const mockChartData = {
    BTCUSDT: {
      '1': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 60000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 100,
        high: 43500 + (Math.random() - 0.5) * 100,
        low: 42800 + (Math.random() - 0.5) * 100,
        close: 43250 + (Math.random() - 0.5) * 100,
      })).reverse(),
      '5': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 300000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 200,
        high: 43500 + (Math.random() - 0.5) * 200,
        low: 42800 + (Math.random() - 0.5) * 200,
        close: 43250 + (Math.random() - 0.5) * 200,
      })).reverse(),
      '15': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 900000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 300,
        high: 43500 + (Math.random() - 0.5) * 300,
        low: 42800 + (Math.random() - 0.5) * 300,
        close: 43250 + (Math.random() - 0.5) * 300,
      })).reverse(),
      '30': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 1800000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 400,
        high: 43500 + (Math.random() - 0.5) * 400,
        low: 42800 + (Math.random() - 0.5) * 400,
        close: 43250 + (Math.random() - 0.5) * 400,
      })).reverse(),
      '60': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 3600000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 500,
        high: 43500 + (Math.random() - 0.5) * 500,
        low: 42800 + (Math.random() - 0.5) * 500,
        close: 43250 + (Math.random() - 0.5) * 500,
      })).reverse(),
      '240': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 14400000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 600,
        high: 43500 + (Math.random() - 0.5) * 600,
        low: 42800 + (Math.random() - 0.5) * 600,
        close: 43250 + (Math.random() - 0.5) * 600,
      })).reverse(),
      'D': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 86400000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 1000,
        high: 43500 + (Math.random() - 0.5) * 1000,
        low: 42800 + (Math.random() - 0.5) * 1000,
        close: 43250 + (Math.random() - 0.5) * 1000,
      })).reverse(),
      'W': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 604800000) / 1000),
        open: 43250 + (Math.random() - 0.5) * 2000,
        high: 43500 + (Math.random() - 0.5) * 2000,
        low: 42800 + (Math.random() - 0.5) * 2000,
        close: 43250 + (Math.random() - 0.5) * 2000,
      })).reverse(),
    },
    ETHUSDT: {
      '1': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 60000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 20,
        high: 2920 + (Math.random() - 0.5) * 20,
        low: 2870 + (Math.random() - 0.5) * 20,
        close: 2900 + (Math.random() - 0.5) * 20,
      })).reverse(),
      '5': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 300000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 40,
        high: 2920 + (Math.random() - 0.5) * 40,
        low: 2870 + (Math.random() - 0.5) * 40,
        close: 2900 + (Math.random() - 0.5) * 40,
      })).reverse(),
      '15': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 900000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 60,
        high: 2920 + (Math.random() - 0.5) * 60,
        low: 2870 + (Math.random() - 0.5) * 60,
        close: 2900 + (Math.random() - 0.5) * 60,
      })).reverse(),
      '30': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 1800000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 80,
        high: 2920 + (Math.random() - 0.5) * 80,
        low: 2870 + (Math.random() - 0.5) * 80,
        close: 2900 + (Math.random() - 0.5) * 80,
      })).reverse(),
      '60': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 3600000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 100,
        high: 2920 + (Math.random() - 0.5) * 100,
        low: 2870 + (Math.random() - 0.5) * 100,
        close: 2900 + (Math.random() - 0.5) * 100,
      })).reverse(),
      '240': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 14400000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 120,
        high: 2920 + (Math.random() - 0.5) * 120,
        low: 2870 + (Math.random() - 0.5) * 120,
        close: 2900 + (Math.random() - 0.5) * 120,
      })).reverse(),
      'D': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 86400000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 200,
        high: 2920 + (Math.random() - 0.5) * 200,
        low: 2870 + (Math.random() - 0.5) * 200,
        close: 2900 + (Math.random() - 0.5) * 200,
      })).reverse(),
      'W': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 604800000) / 1000),
        open: 2900 + (Math.random() - 0.5) * 400,
        high: 2920 + (Math.random() - 0.5) * 400,
        low: 2870 + (Math.random() - 0.5) * 400,
        close: 2900 + (Math.random() - 0.5) * 400,
      })).reverse(),
    },
    USDTUSD: {
      '1': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 60000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      '5': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 300000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      '15': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 900000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      '30': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 1800000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      '60': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 3600000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      '240': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 14400000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      'D': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 86400000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
      'W': Array(20).fill().map((_, i) => ({
        time: Math.floor((Date.now() - i * 604800000) / 1000),
        open: 1.0 + (Math.random() - 0.5) * 0.01,
        high: 1.01 + (Math.random() - 0.5) * 0.01,
        low: 0.99 + (Math.random() - 0.5) * 0.01,
        close: 1.0 + (Math.random() - 0.5) * 0.01,
      })).reverse(),
    },
  };

  // Generate mock data for other coins
  Object.keys(mockChartData).forEach(key => {
    if (!['BTCUSDT', 'ETHUSDT', 'USDTUSD'].includes(key)) {
      mockChartData[key] = {
        '1': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 60000) / 1000),
          open: 100 + (Math.random() - 0.5) * 10,
          high: 110 + (Math.random() - 0.5) * 10,
          low: 90 + (Math.random() - 0.5) * 10,
          close: 100 + (Math.random() - 0.5) * 10,
        })).reverse(),
        '5': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 300000) / 1000),
          open: 100 + (Math.random() - 0.5) * 20,
          high: 110 + (Math.random() - 0.5) * 20,
          low: 90 + (Math.random() - 0.5) * 20,
          close: 100 + (Math.random() - 0.5) * 20,
        })).reverse(),
        '15': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 900000) / 1000),
          open: 100 + (Math.random() - 0.5) * 30,
          high: 110 + (Math.random() - 0.5) * 30,
          low: 90 + (Math.random() - 0.5) * 30,
          close: 100 + (Math.random() - 0.5) * 30,
        })).reverse(),
        '30': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 1800000) / 1000),
          open: 100 + (Math.random() - 0.5) * 40,
          high: 110 + (Math.random() - 0.5) * 40,
          low: 90 + (Math.random() - 0.5) * 40,
          close: 100 + (Math.random() - 0.5) * 40,
        })).reverse(),
        '60': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 3600000) / 1000),
          open: 100 + (Math.random() - 0.5) * 50,
          high: 110 + (Math.random() - 0.5) * 50,
          low: 90 + (Math.random() - 0.5) * 50,
          close: 100 + (Math.random() - 0.5) * 50,
        })).reverse(),
        '240': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 14400000) / 1000),
          open: 100 + (Math.random() - 0.5) * 60,
          high: 110 + (Math.random() - 0.5) * 60,
          low: 90 + (Math.random() - 0.5) * 60,
          close: 100 + (Math.random() - 0.5) * 60,
        })).reverse(),
        'D': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 86400000) / 1000),
          open: 100 + (Math.random() - 0.5) * 100,
          high: 110 + (Math.random() - 0.5) * 100,
          low: 90 + (Math.random() - 0.5) * 100,
          close: 100 + (Math.random() - 0.5) * 100,
        })).reverse(),
        'W': Array(20).fill().map((_, i) => ({
          time: Math.floor((Date.now() - i * 604800000) / 1000),
          open: 100 + (Math.random() - 0.5) * 200,
          high: 110 + (Math.random() - 0.5) * 200,
          low: 90 + (Math.random() - 0.5) * 200,
          close: 100 + (Math.random() - 0.5) * 200,
        })).reverse(),
      };
    }
  });

  useEffect(() => {
    if (chartContainerRef.current) {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      try {
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 400,
          layout: {
            background: { type: ColorType.Solid, color: '#1F2937' },
            textColor: '#D1D5DB',
          },
          grid: {
            vertLines: { color: '#374151' },
            horzLines: { color: '#374151' },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: interval === '1' || interval === '5' || interval === '15',
          },
        });

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#22C55E',
          downColor: '#EF4444',
          borderVisible: false,
          wickUpColor: '#22C55E',
          wickDownColor: '#EF4444',
        });

        const data = mockChartData[symbol]?.[interval] || mockChartData.BTCUSDT['30'];
        candlestickSeries.setData(data);
        chart.timeScale().fitContent();

        chartRef.current = chart;

        const handleResize = () => {
          if (chartRef.current) {
            chartRef.current.resize(chartContainerRef.current.clientWidth, 400);
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
          }
        };
      } catch (err) {
        console.error('Error initializing chart:', err);
      }
    }
  }, [symbol, interval]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};

export default TradingViewWidget;