import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Shield, AlertCircle, Activity, CheckCircle2, TrendingUp, TrendingDown, Clock, BarChart2 } from 'lucide-react';

export default function SMMScanner() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/smm-scanner?timeframe=${timeframe}`);
            if (response.data.status === 'success') {
                setSetups(response.data.data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch SMM setups. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetups();
    }, [timeframe]);

    return (
        <div className="p-6 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen bg-gray-50/50">
            <header className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-5">
                    <div className="bg-gradient-to-br from-indigo-700 to-purple-600 p-4 rounded-2xl shadow-lg shadow-indigo-100">
                        <Shield className="text-white w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            SMM Pro Scanner
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-purple-200">Double Screen System</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">High Accuracy Trend Alignment Engine</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm">
                        <div className="flex items-center px-4 py-2">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-bold text-sm text-gray-800 outline-none cursor-pointer"
                            >
                                <option value="15m">15m</option>
                                <option value="1h">1h</option>
                                <option value="1d">Daily</option>
                                <option value="1wk">Weekly</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 font-black"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing Trends...' : 'Scan Market'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-rose-50 text-rose-600 p-5 rounded-2xl mb-8 border border-rose-100 font-bold flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 text-gray-500 text-center">
                    <Activity className="w-24 h-24 mb-6 animate-pulse text-indigo-500" />
                    <p className="text-2xl font-black text-indigo-900">Validating Double Screen Conditions...</p>
                    <p className="text-gray-400 font-bold mt-2">Checking Tide (HTF) vs Wave (Current TF)</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                {stock.type === 'SMM_BULL_HAT' ? (
                                    <div className="absolute top-0 right-0 p-4">
                                        <TrendingUp className="w-12 h-12 text-emerald-100/50" />
                                    </div>
                                ) : (
                                    <div className="absolute top-0 right-0 p-4">
                                        <TrendingDown className="w-12 h-12 text-rose-100/50" />
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6 relative">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{stock.symbol}</h2>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${stock.type === 'SMM_BULL_HAT' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                {stock.type === 'SMM_BULL_HAT' ? 'Bull Hat' : 'Bear Hat'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs font-bold mt-1 tracking-widest uppercase">{stock.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{stock.price}</p>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic font-serif">SMM Accuracy: {stock.score}/5</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Decision Matrix</p>
                                        <div className="space-y-3">
                                            {stock.checklist.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className={`text-xs font-bold ${item.status ? 'text-gray-800' : 'text-gray-400 font-normal italic'}`}>{item.label}</span>
                                                    {item.status ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-3xl border ${stock.type === 'SMM_BULL_HAT' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${stock.type === 'SMM_BULL_HAT' ? 'text-emerald-600' : 'text-rose-600'}`}>Stop Loss</p>
                                            <p className="text-lg font-black text-gray-900">₹{parseFloat(stock.stop_loss).toFixed(1)}</p>
                                        </div>
                                        <div className="bg-gray-100/50 p-4 rounded-3xl border border-gray-200">
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Target</p>
                                            <p className="text-lg font-black text-gray-900">₹{parseFloat(stock.target).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest pt-5 border-t border-gray-100 font-sans">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-5 h-5 text-indigo-500" />
                                        <span>Vol: {(stock.volume / stock.avg_volume).toFixed(1)}x</span>
                                    </div>
                                    <div className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                        Double Confirmation
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-24 rounded-[3rem] border border-gray-100 text-center shadow-xl shadow-gray-100/50 flex flex-col items-center">
                            <Shield className="w-20 h-20 text-gray-100 mb-6" />
                            <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter uppercase font-serif italic">Analyzing Market Tides...</h3>
                            <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">The AI is currently scanning NIFTY for Tide and Wave alignment using the 13-point Decision Sheet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
