import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, Crosshair, Clock, Info } from 'lucide-react';

export default function HeikinAshi() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/scan-ha?timeframe=${timeframe}`);
            if (response.data.status === 'success') {
                setSetups(response.data.data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch Heikin-Ashi data. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetups();
    }, [timeframe]);

    return (
        <div className="p-6 max-w-7xl mx-auto text-gray-900 font-sans">
            <header className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-inner shadow-indigo-300">
                        <TrendingUp className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Heikin-Ashi Trend Ride
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">AI-Powered Continuity Scanner & RSI Analytics</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                        <div className="flex items-center px-4 py-2">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-medium text-sm text-gray-700 outline-none cursor-pointer"
                            >
                                <option value="30m">30 Minute</option>
                                <option value="1h">1 Hour</option>
                                <option value="1d">Daily (1D)</option>
                                <option value="1wk">Weekly (1W)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-3 rounded-xl transition-all shadow-md shadow-gray-200 disabled:opacity-50 font-semibold"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing...' : 'Analyze Market'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium tracking-wide">
                    {error}
                </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-blue-900 text-sm font-medium">
                    <p className="mb-1"><span className="font-bold">Buy Strategy:</span> Target EMA(20) upward slopes where HA candles shift Green & the latest Green body has zero lower wick. Verified by RSI &gt; 50.</p>
                    <p><span className="font-bold">Sell Strategy:</span> Target EMA(20) downward slopes where HA candles shift Red & the latest Red body has zero upper wick. Verified by RSI &lt; 50.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                    <Activity className="w-16 h-16 mb-6 animate-[bounce_1s_infinite] text-indigo-500" />
                    <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Calculating Moving Averages & HA Sets...</p>
                    <p className="text-sm mt-2 text-gray-400 font-medium">Crunching geometric momentum equations for top Nifty stocks</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className={`bg-white rounded-2xl shadow-sm border ${stock.trend === 'BULLISH' ? 'border-green-100 hover:border-green-300' : 'border-red-100 hover:border-red-300'} p-6 transition-all group relative overflow-hidden`}>
                                <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${stock.trend === 'BULLISH' ? 'bg-green-50' : 'bg-red-50'} opacity-50`}></div>

                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{stock.symbol}</h2>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border mt-2 inline-block uppercase tracking-wider ${stock.trend === 'BULLISH' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {stock.trend} CONFIRMED
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-3xl font-bold ${stock.trend === 'BULLISH' ? 'text-green-500' : 'text-red-500'}`}>₹{stock.close}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 font-medium flex items-center gap-1">
                                            <Crosshair className="w-4 h-4" /> RSI Score
                                        </span>
                                        <span className={`font-bold px-2 py-1 rounded text-xs ${stock.trend === 'BULLISH' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {stock.ai_score}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                                            <p className="text-[10px] text-red-400 font-bold uppercase">Stop Loss</p>
                                            <p className="text-sm font-black text-red-700">₹{stock.stop_loss}</p>
                                        </div>
                                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                                            <p className="text-[10px] text-blue-400 font-bold uppercase">Target</p>
                                            <p className="text-[11px] font-bold text-blue-700 leading-tight">{stock.take_profit}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm pt-1">
                                        <p className="text-gray-500 font-medium mb-1">AI Analytical Trigger:</p>
                                        <p className="text-gray-800 font-semibold bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            {stock.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
                            <TrendingUp className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-600 mb-2 mt-4">No Setups Active</h3>
                            <p className="text-gray-500 font-medium max-w-md mx-auto">None of the monitored stocks meet the strict Heikin-Ashi Trend Continuation criteria right now on the <span className="font-bold">{timeframe}</span> timeframe.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
