import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Activity, Filter, BarChart2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const CupHandleScanner = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('1d'); // 1d, 1wk, 1mo

    const fetchCupHandles = async (selectedTF) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/scan-cup-handle?timeframe=${selectedTF}`);
            if (response.ok) {
                const result = await response.json();
                setData(result.data || []);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Failed to fetch cup & handle data', error);
            setData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCupHandles(timeframe);
    }, [timeframe]);

    return (
        <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-fuchsia-50 text-fuchsia-600 p-2 rounded-xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Cup & Handle Breakout</h1>
                        </div>
                        <p className="text-gray-400 font-semibold flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PRO Scanner: Detects classic accumulation bases & high-probability breakouts
                        </p>
                    </div>

                    <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto custom-scrollbar">
                        {[
                            { id: '1d', label: '1D Swing' },
                            { id: '1wk', label: '1W Positional' },
                            { id: '1mo', label: '1M Multibagger' }
                        ].map((tf) => (
                            <button
                                key={tf.id}
                                onClick={() => setTimeframe(tf.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap outline-none ${timeframe === tf.id
                                        ? 'bg-white text-fuchsia-600 shadow-sm'
                                        : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-white rounded-3xl p-4 px-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-sm font-bold text-gray-400">
                        Found <span className="text-gray-900 mx-1">{data.length}</span> verified setups on {timeframe.toUpperCase()} timeframe
                    </p>
                    <button
                        onClick={() => fetchCupHandles(timeframe)}
                        disabled={loading}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Scan Market
                    </button>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <Activity className="w-10 h-10 text-fuchsia-500 animate-spin mb-4" />
                        <span className="font-black text-gray-900 uppercase tracking-widest">Scanning {timeframe}...</span>
                        <p className="text-xs text-gray-400 font-bold mt-2">Checking massive historical arrays...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <Filter className="w-10 h-10 text-gray-300 mb-4" />
                        <span className="font-black text-gray-900 uppercase tracking-widest">No Breakouts Detected</span>
                        <p className="text-xs text-gray-400 font-bold mt-2">The strict institutional criteria filtered out invalid patterns.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-fuchsia-100 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{stock.symbol}</h3>
                                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                Active
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-400">{stock.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-gray-900">Rs.{stock.price}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-1 flex items-center justify-end gap-1">
                                            <TrendingUp className="w-3 h-3" /> Breakout
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Resistance</p>
                                            <p className="text-sm font-bold text-gray-900">Rs.{stock.resistance}</p>
                                        </div>
                                        <div className="bg-fuchsia-50 p-3 rounded-2xl border border-fuchsia-100">
                                            <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-1">Vol Multiplier</p>
                                            <p className="text-sm font-bold text-fuchsia-600">{stock.volumeMultiplier}x Spike</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 font-semibold">Cup Depth</span>
                                            <span className="font-bold text-gray-900">{stock.cupDepthPct}%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 font-semibold">Handle Pullback</span>
                                            <span className="font-bold text-gray-900">{stock.handleRetracement}%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 font-semibold">Breakout RSI</span>
                                            <span className="font-bold text-gray-900">{stock.rsi}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CupHandleScanner;
