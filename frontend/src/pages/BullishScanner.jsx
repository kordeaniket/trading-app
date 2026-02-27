import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, ShieldAlert, Target, Zap, Waves, Info } from 'lucide-react';

export default function BullishScanner() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/scan-bullish?timeframe=${timeframe}`);
            if (response.data.status === 'success') {
                const sorted = response.data.data.sort((a, b) => b.score - a.score);
                setSetups(sorted);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch bullish setups. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetups();
    }, [timeframe]);

    const getConfidenceColor = (conf) => {
        if (conf >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        if (conf >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
        return 'text-blue-600 bg-blue-50 border-blue-100';
    };

    const getConfidenceBarColor = (conf) => {
        if (conf >= 85) return 'bg-emerald-500';
        if (conf >= 60) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-gray-900 font-sans">
            <header className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-8 bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl shadow-emerald-100/50 border border-white">
                <div className="flex items-center gap-6">
                    <div className="bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-5 rounded-[2rem] shadow-2xl shadow-emerald-200">
                        <Zap className="text-white w-10 h-10 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Bullish Sniper
                        </h1>
                        <p className="text-gray-400 font-bold mt-2 flex items-center gap-3 tracking-widest text-xs uppercase">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                            AI-Driven 11-Point Accuracy Scan
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                        {['1h', '1d', '1wk', '1mo'].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`px-4 py-2.5 rounded-xl font-black text-sm transition-all ${timeframe === tf ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tf === '1wk' ? 'Weekly' : tf === '1mo' ? 'Monthly' : tf.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="group relative flex items-center justify-center gap-4 bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] transition-all shadow-2xl shadow-gray-200 disabled:opacity-50 font-black text-xl overflow-hidden"
                    >
                        <RefreshCw className={`w-7 h-7 ${loading ? 'animate-spin' : ''}`} />
                        <span>{loading ? 'Analyzing...' : 'Scan Market'}</span>
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-8 border border-red-100 font-bold flex items-center gap-3 animate-pulse">
                    <ShieldAlert className="w-6 h-6" /> {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 text-gray-500">
                    <div className="relative mb-10">
                        <Waves className="w-24 h-24 text-emerald-100 animate-[ping_2s_infinite]" />
                        <Activity className="w-12 h-12 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="text-2xl font-black text-gray-800 tracking-tight">Focusing on Checklist Accuracy...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[3rem] border border-gray-100 p-8 hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all group relative overflow-hidden flex flex-col h-full">
                                {stock.score >= 9 && (
                                    <div className="absolute -right-12 -top-12 bg-emerald-500 text-white w-28 h-28 flex items-end justify-center pb-4 rotate-45 font-black text-[10px] uppercase tracking-tighter shadow-xl">
                                        High Accuracy
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter group-hover:text-emerald-600 transition-colors uppercase">{stock.symbol}</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-gray-400 font-bold text-sm tracking-tight text-lg">₹{stock.price}</span>
                                            {stock.htf_alignment && (
                                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border border-blue-100">
                                                    Trend Confirmed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-2xl border-2 text-center shadow-sm ${getConfidenceColor(stock.confidence)}`}>
                                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Score</p>
                                        <p className="text-2xl font-black leading-none">{stock.score}/11</p>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-grow">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                            <span>AI Confidence Metric</span>
                                            <span>{stock.confidence}% Accuracy</span>
                                        </div>
                                        <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <div
                                                className={`h-full transition-all duration-1000 ${getConfidenceBarColor(stock.confidence)} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
                                                style={{ width: `${stock.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Info className="w-4 h-4" /> 11-Point Verification
                                        </p>
                                        <div className="space-y-3">
                                            {stock.checklist?.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] shadow-sm ${item.status ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                        {item.status ? '✓' : '•'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs font-bold leading-tight ${item.status ? 'text-gray-900' : 'text-gray-300'}`}>{item.label}</span>
                                                        {item.status && <span className="text-[10px] text-emerald-600 font-bold opacity-80">{item.detail}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-dashed border-gray-100">
                                    <div className="bg-red-50/30 p-4 rounded-2xl border border-red-50 text-center">
                                        <p className="text-[10px] font-extrabold text-red-400 uppercase tracking-tighter">Exit SL</p>
                                        <p className="text-xl font-black text-red-600 tracking-tighter">₹{stock.stop_loss.toFixed(1)}</p>
                                    </div>
                                    <div className="bg-emerald-50/30 p-4 rounded-2xl border border-emerald-50 text-center">
                                        <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-tighter">Target (AI)</p>
                                        <p className="text-xl font-black text-emerald-600 tracking-tighter">₹{stock.target.toFixed(1)}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-center">
                                    <div className="bg-gray-900 text-white px-6 py-2 rounded-xl font-black text-xs tracking-widest shadow-lg uppercase">
                                        RR {stock.risk_reward} Potential
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border border-dashed border-gray-200">
                            <Activity className="w-20 h-20 mx-auto text-gray-100 mb-6" />
                            <h3 className="text-3xl font-black text-gray-300 uppercase tracking-tighter">No Setups Detected</h3>
                            <p className="text-gray-400 font-bold mt-2">Checking next rotation...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
