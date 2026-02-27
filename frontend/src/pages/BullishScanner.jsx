import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, ShieldAlert, Target, Zap, Waves, Info, AlertCircle } from 'lucide-react';

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
        if (conf >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
        if (conf >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
        return 'text-blue-700 bg-blue-50 border-blue-200';
    };

    const getConfidenceBarColor = (conf) => {
        if (conf >= 85) return 'bg-emerald-500';
        if (conf >= 60) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen">
            <header className="mb-6 md:mb-10 flex flex-col xl:flex-row justify-between xl:items-end gap-6 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl transition-all duration-700"></div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-500 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-100/50">
                        <Zap className="text-white w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
                            Bull Sniper
                            <span className="bg-emerald-100 text-emerald-700 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest border border-emerald-200 flex items-center gap-1">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                Live AI
                            </span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">High-Precision Trend Reversal Detection</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10">
                    <div className="flex bg-gray-100/80 p-1 rounded-[1.25rem] border border-gray-200 backdrop-blur-sm flex-1 sm:flex-none">
                        {['1h', '1d', '1wk', '1mo'].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`flex-1 sm:flex-none px-3 md:px-6 py-2 md:py-3 rounded-xl font-black text-[10px] md:text-xs transition-all uppercase tracking-widest ${timeframe === tf ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] transition-all shadow-xl shadow-emerald-200 disabled:opacity-50 font-black text-sm md:text-base uppercase tracking-widest"
                    >
                        <RefreshCw className={`w-4 md:w-5 h-4 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Locking...' : 'Scan Market'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-rose-50 text-rose-600 p-5 rounded-2xl mb-8 border border-rose-100 font-bold flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">{error}</span>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 md:py-48 text-gray-500 text-center">
                    <div className="relative mb-6 md:mb-10">
                        <Waves className="w-20 h-20 md:w-32 md:h-32 text-emerald-100 animate-pulse" />
                        <Activity className="w-10 h-10 md:w-16 md:h-16 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-2xl md:text-4xl font-black text-emerald-900 tracking-tight">Locking Targets...</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px] md:text-xs">Analyzing 11-point validation criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                                {stock.score >= 9 && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-emerald-500 text-white text-[8px] font-black px-4 py-1.5 uppercase tracking-widest shadow-lg rounded-bl-2xl">Verified</div>
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                                    <div className="max-w-[65%]">
                                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter truncate group-hover:text-emerald-600 transition-colors uppercase">{stock.symbol}</h2>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className="text-gray-500 font-black text-xl md:text-2xl tracking-tight">₹{stock.price}</span>
                                            {stock.htf_alignment && (
                                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border border-blue-100">Aligned</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-2xl border-2 text-center shrink-0 ${getConfidenceColor(stock.confidence)}`}>
                                        <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">Score</p>
                                        <p className="text-xl md:text-2xl font-black leading-none">{stock.score}/11</p>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6 flex-grow relative z-10">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                                            <span>AI Confidence</span>
                                            <span>{stock.confidence}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${getConfidenceBarColor(stock.confidence)}`}
                                                style={{ width: `${stock.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 group-hover:border-emerald-100 transition-colors">
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Info className="w-3 md:w-4 h-3 md:h-4 text-emerald-500" /> Validation Engine
                                        </p>
                                        <div className="space-y-3">
                                            {stock.checklist?.slice(0, 5).map((item) => (
                                                <div key={item.id} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${item.status ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400 opacity-50'}`}>
                                                        {item.status ? '✓' : '•'}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className={`text-[11px] md:text-xs font-bold leading-tight truncate ${item.status ? 'text-gray-900' : 'text-gray-300 font-normal italic'}`}>{item.label}</span>
                                                        {item.status && <span className="text-[9px] md:text-[10px] text-emerald-600 font-black opacity-80 truncate">{item.detail}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4 mt-8 pt-6 border-t border-dashed border-gray-100 relative z-10">
                                    <div className="bg-rose-50/40 p-3 md:p-4 rounded-2xl border border-rose-100/50 text-center">
                                        <p className="text-[8px] md:text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Exit SL</p>
                                        <p className="text-base md:text-xl font-black text-rose-700">₹{stock.stop_loss.toFixed(1)}</p>
                                    </div>
                                    <div className="bg-emerald-50/40 p-3 md:p-4 rounded-2xl border border-emerald-100/50 text-center">
                                        <p className="text-[8px] md:text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Target</p>
                                        <p className="text-base md:text-xl font-black text-emerald-700">₹{stock.target.toFixed(1)}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 relative z-10">
                                    <div className="bg-gray-900 text-white px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs tracking-widest shadow-lg uppercase text-center flex items-center justify-center gap-2 group-hover:bg-emerald-600 transition-colors duration-500">
                                        <BarChart2 className="w-3 md:w-4 h-3 md:h-4 opacity-50" />
                                        RR Ratio: {stock.risk_reward} Potential
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 md:py-32 text-center bg-white rounded-[2rem] md:rounded-[4rem] border border-gray-100 shadow-sm flex flex-col items-center">
                            <Activity className="w-12 h-12 md:w-20 md:h-20 text-gray-100 mb-6 animate-pulse" />
                            <h3 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">No Setups Active</h3>
                            <p className="text-gray-400 font-bold mt-2 text-sm md:text-lg">Scanning next market cycle...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
