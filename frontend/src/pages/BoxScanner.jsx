import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    RefreshCw, Layout, Activity, BarChart2, Target, Zap,
    Waves, AlertCircle, TrendingUp, ShieldCheck, BoxSelect,
    ArrowUpRight, ArrowDownRight, Info, CheckCircle2
} from 'lucide-react';

const safe = (val, decimals = 2, fallback = '--') => {
    if (val === undefined || val === null || isNaN(val)) return fallback;
    return typeof val === 'number' ? val.toFixed(decimals) : val;
};

export default function BoxScanner() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/scan-box?timeframe=${timeframe}&limit=80`
            );
            if (response.data.status === 'success') {
                setSetups(response.data.data || []);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch Box Breakout setups. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSetups(); }, [timeframe]);

    const getConfidenceColor = (conf) => {
        if (conf >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
        if (conf >= 75) return 'text-amber-700 bg-amber-50 border-amber-200';
        return 'text-blue-700 bg-blue-50 border-blue-200';
    };

    const isBull = (setup) => setup.type?.includes('BULLISH');

    // ✅ Fixed: correctly reads new API response structure
    const getPrice = (setup) => {
        const details = isBull(setup) ? setup.breakout_details : setup.breakdown_details;
        return details?.price ?? null;
    };

    const getVolRatio = (setup) => {
        const details = isBull(setup) ? setup.breakout_details : setup.breakdown_details;
        return details?.volume_ratio ?? null;
    };

    const getRSI = (setup) => {
        const details = isBull(setup) ? setup.breakout_details : setup.breakdown_details;
        return details?.rsi ?? null;
    };

    const getMovePercent = (setup) => {
        const details = isBull(setup) ? setup.breakout_details : setup.breakdown_details;
        return details?.breakout_percent ?? details?.breakdown_percent ?? '--';
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen">
            {/* Header */}
            <header className="mb-6 md:mb-10 flex flex-col xl:flex-row justify-between xl:items-end gap-6 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl transition-all duration-700"></div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-500 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl shadow-indigo-100/50">
                        <BoxSelect className="text-white w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
                            Box Sniper
                            <span className="bg-indigo-100 text-indigo-700 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest border border-indigo-200 flex items-center gap-1">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                Precision AI
                            </span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mt-1 uppercase tracking-widest">NSE Price Action Consolidation Radar</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10">
                    <div className="flex bg-gray-100/80 p-1 rounded-[1.25rem] border border-gray-200 backdrop-blur-sm flex-1 sm:flex-none overflow-x-auto">
                        {['5m', '15m', '1h', '1d', '1wk', '1mo'].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`flex-shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-xl font-black text-[10px] md:text-xs transition-all uppercase tracking-widest ${timeframe === tf ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] transition-all shadow-xl shadow-gray-200 disabled:opacity-50 font-black text-sm md:text-base uppercase tracking-widest"
                    >
                        <RefreshCw className={`w-4 md:w-5 h-4 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Scanning...' : 'Scan Box'}
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
                        <Waves className="w-20 h-20 md:w-32 md:h-32 text-indigo-100 animate-pulse" />
                        <Layout className="w-10 h-10 md:w-16 md:h-16 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Calculating Market Force...</h3>
                    <p className="text-xs md:text-sm font-medium text-gray-400 max-w-xs uppercase tracking-widest">Scanning NSE symbols for box breakouts & breakdowns</p>
                </div>
            ) : setups.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 md:py-48 bg-white rounded-[2rem] border border-dashed border-gray-200">
                    <div className="bg-gray-50 p-6 md:p-8 rounded-[2rem] mb-6 md:mb-8 text-gray-300">
                        <BoxSelect className="w-12 h-12 md:w-20 md:h-20" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">No Active Boxes</h3>
                    <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest px-6 text-center">Market is currently trending. Consolidation patterns may emerge later.</p>
                </div>
            ) : (
                <>
                    {/* Summary Bar */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3 flex items-center gap-2">
                            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                                {setups.filter(s => s.type?.includes('BULLISH')).length} Breakouts
                            </span>
                        </div>
                        <div className="bg-rose-50 border border-rose-100 rounded-2xl px-5 py-3 flex items-center gap-2">
                            <ArrowDownRight className="w-4 h-4 text-rose-600" />
                            <span className="text-xs font-black text-rose-700 uppercase tracking-widest">
                                {setups.filter(s => s.type?.includes('BEARISH')).length} Breakdowns
                            </span>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-3 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">
                                {setups.length} Total · {timeframe.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom duration-700">
                        {setups.map((setup, idx) => {
                            const bull = isBull(setup);
                            const price = getPrice(setup);
                            const volRatio = getVolRatio(setup);
                            const rsi = getRSI(setup);
                            const movePercent = getMovePercent(setup);
                            const box = setup.box_details || {};
                            const plan = setup.trade_plan || {};

                            return (
                                <div key={idx} className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 flex flex-col group overflow-hidden">
                                    {/* Banner */}
                                    <div className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-between ${bull ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        <span className="flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            {bull ? '🚀 Bullish Breakout' : '🔻 Bearish Breakdown'}
                                        </span>
                                        <span className="opacity-60">#{setup.symbol}</span>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        {/* Title Row */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">{setup.symbol}</h2>
                                                    {bull
                                                        ? <ArrowUpRight className="text-emerald-500 w-8 h-8" />
                                                        : <ArrowDownRight className="text-rose-500 w-8 h-8" />
                                                    }
                                                </div>
                                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">NSE INDIA • {timeframe} INTERVAL</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-2xl border font-black text-[10px] uppercase tracking-widest ${getConfidenceColor(setup.confidence)} shadow-sm`}>
                                                {setup.confidence}% Conf
                                            </div>
                                        </div>

                                        <div className="space-y-5 flex-1">
                                            {/* Price + Width */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100/50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                                        {bull ? 'Breakout Price' : 'Breakdown Price'}
                                                    </p>
                                                    <div className="flex items-baseline gap-1">
                                                        <p className="text-xl font-black text-gray-900 tracking-tighter">
                                                            ₹{price !== null ? safe(price, 1) : '--'}
                                                        </p>
                                                        <span className="text-[10px] font-bold text-gray-400">INR</span>
                                                    </div>
                                                    <p className={`text-[10px] font-black mt-1 ${bull ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                        {movePercent}
                                                    </p>
                                                </div>
                                                <div className="bg-indigo-50/30 p-4 rounded-3xl border border-indigo-100/30">
                                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Box Width</p>
                                                    <div className="flex items-baseline gap-1">
                                                        <p className="text-xl font-black text-indigo-600 tracking-tighter">
                                                            {safe(box.width_percent, 1)}%
                                                        </p>
                                                        <span className="text-[10px] font-bold text-indigo-400">RANGE</span>
                                                    </div>
                                                    <p className="text-[10px] font-black text-indigo-400 mt-1">
                                                        Score: {box.quality_score ?? '--'}/10
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Box Stats */}
                                            <div className="bg-gray-900 p-5 rounded-[1.75rem] shadow-xl text-white">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Info className="w-4 h-4 text-indigo-400" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Box Analysis</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Resistance</p>
                                                        <p className="text-sm font-black text-emerald-400">₹{safe(box.resistance, 1)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Support</p>
                                                        <p className="text-sm font-black text-rose-400">₹{safe(box.support, 1)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Touches</p>
                                                        <p className="text-sm font-black text-gray-300">
                                                            R:{box.resistance_touches ?? '--'} / S:{box.support_touches ?? '--'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Inside %</p>
                                                        <p className="text-sm font-black text-gray-300">
                                                            {box.inside_percent !== undefined ? `${box.inside_percent}%` : '--'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Trade Plan */}
                                            <div className="space-y-2.5 pt-2">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Target className="w-4 h-4 text-gray-900" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Trade Plan</p>
                                                </div>
                                                <div className="flex justify-between items-center bg-emerald-50/60 px-5 py-3 rounded-2xl border border-emerald-100/50">
                                                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Entry Zone</span>
                                                    <span className="text-xs font-black text-emerald-800 tracking-tight">{plan.entry_zone ?? '--'}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-rose-50/60 px-5 py-3 rounded-2xl border border-rose-100/50">
                                                    <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Stop Loss</span>
                                                    <span className="text-xs font-black text-rose-800 tracking-tight">
                                                        ₹{safe(plan.stop_loss, 1)} ({plan.stop_loss_percent ?? '--'})
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center bg-indigo-50/60 px-5 py-3 rounded-2xl border border-indigo-100/50">
                                                    <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Target 1</span>
                                                    <span className="text-xs font-black text-indigo-800 tracking-tight">₹{safe(plan.target_1, 1)}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-violet-50/60 px-5 py-3 rounded-2xl border border-violet-100/50">
                                                    <span className="text-[10px] font-black text-violet-700 uppercase tracking-widest">Target 2</span>
                                                    <span className="text-xs font-black text-violet-800 tracking-tight">₹{safe(plan.target_2, 1)}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-amber-50/60 px-5 py-3 rounded-2xl border border-amber-100/50">
                                                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">R:R Ratio</span>
                                                    <span className="text-xs font-black text-amber-800 tracking-tight">
                                                        {plan.risk_reward_1 ?? '--'}:1 · {plan.expected_holding ?? '--'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${volRatio !== null && volRatio >= 1.5 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                    Vol: {volRatio !== null ? `${safe(volRatio, 1)}x` : '--'} | RSI: {rsi !== null ? safe(rsi, 0) : '--'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200 cursor-pointer active:scale-95 transition-all">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Monitor
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Footer */}
            <footer className="mt-20 py-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
                <div className="flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Institutional Grade Analytics</p>
                </div>
                <p className="text-[10px] font-bold text-gray-400 text-center md:text-right max-w-sm">NSE Price Action Box Scanner uses AI-driven geometry to identify institutional consolidation zones. Not financial advice.</p>
            </footer>
        </div>
    );
}
