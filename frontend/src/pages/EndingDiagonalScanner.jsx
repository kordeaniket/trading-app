import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, CheckCircle2, Clock, Shield, Target, AlertCircle, Triangle } from 'lucide-react';

export default function EndingDiagonalScanner() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/ending-diagonal?timeframe=${timeframe}`);
            if (response.data.status === 'success') {
                setSetups(response.data.data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch Ending Diagonal setups. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetups();
    }, [timeframe]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen">
            <header className="mb-6 md:mb-10 flex flex-col xl:flex-row justify-between xl:items-end gap-6 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl"></div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-amber-600 to-rose-600 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl shadow-amber-100/50">
                        <Triangle className="text-white w-8 h-8 md:w-10 md:h-10 rotate-180" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
                            Ending Diagonal
                            <span className="bg-rose-100 text-rose-700 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest border border-rose-200">Reversal</span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Fifth Wave / C-Wave Exhaustion Detection</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10">
                    <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm flex-1 sm:flex-none">
                        <div className="flex items-center px-2 md:px-4 py-2 flex-1 sm:flex-none">
                            <Clock className="w-3 md:w-4 h-3 md:h-4 text-gray-500 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-black text-xs md:text-sm text-gray-800 outline-none cursor-pointer w-full"
                            >
                                <option value="15m">15m</option>
                                <option value="1h">1h</option>
                                <option value="1d">1d</option>
                                <option value="1wk">1w</option>
                                <option value="1mo">1m</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] transition-all shadow-xl shadow-rose-200 disabled:opacity-50 font-black text-sm md:text-base uppercase tracking-widest"
                    >
                        <RefreshCw className={`w-4 md:w-5 h-4 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing' : 'Scan Reversals'}
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
                    <Activity className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-10 animate-pulse text-rose-600" />
                    <p className="text-2xl md:text-4xl font-black text-rose-900 tracking-tight">Analyzing Exhaustion...</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px] md:text-xs">Checking RSI Divergence & Macro Geometry</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                                    <div className="max-w-[65%]">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter truncate">{stock.symbol}</h2>
                                            <span className={`text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border shrink-0 ${stock.type.includes('BULL') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                {stock.type.includes('BULL') ? 'BO' : 'BD'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-[9px] md:text-[10px] font-black mt-2 tracking-widest uppercase">{stock.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter break-all">₹{stock.price}</p>
                                        <span className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-widest block mt-1">Score: {stock.score}/5</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6 md:mb-8 flex-grow relative z-10">
                                    <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 group-hover:border-rose-100 transition-colors">
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Reversal Checklist
                                        </p>
                                        <div className="space-y-2 md:space-y-3">
                                            {stock.checklist?.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between gap-4">
                                                    <span className={`text-[11px] md:text-xs font-bold truncate ${item.status ? 'text-gray-900' : 'text-gray-300 font-normal italic'}`}>{item.label}</span>
                                                    {item.status ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    ) : (
                                                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-gray-100 shrink-0"></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <div className="bg-rose-50/40 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-rose-100/50 flex flex-col items-center text-center">
                                            <p className="text-[8px] md:text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Stop Loss</p>
                                            <p className="text-base md:text-xl font-black text-rose-700 break-all">₹{parseFloat(stock.stop_loss).toFixed(1)}</p>
                                        </div>
                                        <div className="bg-emerald-50/40 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-emerald-100/50 flex flex-col items-center text-center">
                                            <p className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Target</p>
                                            <p className="text-base md:text-xl font-black text-emerald-700 break-all">₹{parseFloat(stock.target).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest pt-4 md:pt-6 border-t border-gray-50 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-indigo-500 opacity-50 transition-transform group-hover:scale-110" />
                                        <span>Vol: {(stock.volume / stock.avg_volume).toFixed(1)}x</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-rose-50/50 text-rose-600 px-3 py-1 rounded-full border border-rose-100/30">
                                        <Activity className="w-3 md:w-4 h-3 md:h-4 animate-pulse" />
                                        <span>Trend Exhaustion</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 md:p-24 rounded-[2rem] md:rounded-[4rem] border border-gray-100 text-center shadow-sm flex flex-col items-center">
                            <div className="bg-gray-50 p-6 md:p-10 rounded-full mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                                <Triangle className="w-12 h-12 md:w-20 md:h-20 text-gray-200 rotate-180" />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">No Ending Diagonals</h3>
                            <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed text-sm md:text-lg">The AI is searching for wedge-shaped exhaustion patterns. No clear reversals detected on the {timeframe} timeframe.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
