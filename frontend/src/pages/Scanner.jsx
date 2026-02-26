import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, Filter, Clock } from 'lucide-react';

export default function Scanner() {
    const [breakouts, setBreakouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');
    const [category, setCategory] = useState('ALL');

    const fetchBreakouts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/scan?timeframe=${timeframe}&category=${category}`);
            if (response.data.status === 'success') {
                setBreakouts(response.data.data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch breakout data. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBreakouts();
    }, [timeframe, category]);

    const getBadgeColor = (type) => {
        switch (type) {
            case 'FLAT_BREAKOUT': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'FLAT_BREAKDOWN': return 'bg-red-100 text-red-700 border-red-200';
            case 'DOUBLE_TOP_BREAKOUT': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'DOUBLE_BOTTOM_BREAKDOWN': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'FLAG_POLE_BREAKOUT': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'FLAG_POLE_BREAKDOWN': return 'bg-red-50 text-red-600 border-red-100';
            case 'FAKE_BREAKOUT_DOWN': return 'bg-red-200 text-red-800 border-red-300';
            case 'BULLISH_REVERSAL': return 'bg-teal-100 text-teal-700 border-teal-200';
            case 'BEARISH_REVERSAL': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getTypeName = (type) => {
        return type.replace(/_/g, ' ');
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-gray-900 font-sans">
            <header className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-inner shadow-indigo-300">
                        <TrendingUp className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Breakout Scanner Pro
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Nifty Top 100 Multipattern AI Detector</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                        <div className="flex items-center px-4 py-2 border-r border-gray-200">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-medium text-sm text-gray-700 outline-none cursor-pointer"
                            >
                                <option value="15m">15 Minute</option>
                                <option value="1h">1 Hour</option>
                                <option value="1d">Daily (1D)</option>
                                <option value="1wk">Weekly (1W)</option>
                                <option value="1mo">Monthly (1M)</option>
                            </select>
                        </div>
                        <div className="flex items-center px-4 py-2">
                            <Filter className="w-4 h-4 text-gray-400 mr-2" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-transparent font-medium text-sm text-gray-700 outline-none cursor-pointer"
                            >
                                <option value="ALL">All Breakouts & Breakdowns</option>
                                <option value="FLAT_BREAKOUT">Flat Range Breakout</option>
                                <option value="FLAT_BREAKDOWN">Flat Range Breakdown</option>
                                <option value="DOUBLE_TOP_BREAKOUT">Double Top Breakout</option>
                                <option value="DOUBLE_BOTTOM_BREAKDOWN">Double Bottom Breakdown</option>
                                <option value="FLAG_POLE_BREAKOUT">Flag & Pole Breakout</option>
                                <option value="FLAG_POLE_BREAKDOWN">Flag & Pole Breakdown</option>
                                <option value="FAKE_BREAKOUT_DOWN">Fakeout (Bearish Trap)</option>
                                <option value="BULLISH_REVERSAL">Bullish Reversal (Equal Lows)</option>
                                <option value="BEARISH_REVERSAL">Bearish Reversal (Equal Highs)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchBreakouts}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-3 rounded-xl transition-all shadow-md shadow-gray-200 disabled:opacity-50 font-semibold"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Scanning...' : 'Scan Now'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium tracking-wide">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                    <Activity className="w-16 h-16 mb-6 animate-[bounce_1s_infinite] text-indigo-500" />
                    <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Analyzing Top Indian Stocks...</p>
                    <p className="text-sm mt-2 text-gray-400 font-medium">Downloading {timeframe} OHLC history and calculating pattern geometries</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {breakouts.length > 0 ? (
                        breakouts.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all group relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full ${(stock.type.includes('DOWN') || stock.type.includes('BEARISH')) ? 'bg-red-50' : 'bg-green-50'} opacity-50`}></div>

                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{stock.symbol}</h2>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border mt-2 inline-block uppercase tracking-wider ${getBadgeColor(stock.type)}`}>
                                            {getTypeName(stock.type)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-2xl font-bold ${(stock.type.includes('DOWN') || stock.type.includes('BEARISH')) ? 'text-red-500' : 'text-green-500'}`}>₹{stock.close}</p>
                                        <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-wide">{stock.date}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 font-medium">Key Level / Res</span>
                                        <span className="font-bold text-gray-800">₹{stock.resistance}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 font-medium flex items-center gap-1">
                                            <BarChart2 className="w-4 h-4" /> Vol Spike
                                        </span>
                                        <span className="font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded text-xs border border-gray-100">
                                            {(stock.volume / stock.avg_volume).toFixed(1)}x Avg
                                        </span>
                                    </div>

                                    {stock.range_pct && (
                                        <div className="flex justify-between items-center text-[13px] pt-1">
                                            <span className="text-gray-500 font-medium">Compression</span>
                                            <span className="font-semibold text-gray-600">{stock.range_pct}%</span>
                                        </div>
                                    )}

                                    {stock.message && (
                                        <div className="mt-4 pt-3 border-t border-gray-50">
                                            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-1">AI Indicator</p>
                                            <p className="text-xs font-semibold text-gray-700 leading-relaxed bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50 italic">
                                                "{stock.message}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
                            <Filter className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-600 mb-2 mt-4">No Patterns Found</h3>
                            <p className="text-gray-500 font-medium max-w-md mx-auto">No Top 100 stocks match the <b>{getTypeName(category)}</b> criteria on the <b>{timeframe}</b> timeframe right now.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
