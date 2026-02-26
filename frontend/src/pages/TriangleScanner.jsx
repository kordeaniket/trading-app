import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, CheckCircle2, Clock, Shield, Target, AlertCircle, Zap } from 'lucide-react';

export default function TriangleScanner() {
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');

    const fetchSetups = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/triangle-breakout?timeframe=${timeframe}`);
            if (response.data.status === 'success') {
                setSetups(response.data.data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch Triangle setups. Ensure backend is running.');
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
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-100">
                        <TrendingUp className="text-white w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            Triangle Breakout
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-200">Impulse setup</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Symmetrical Compression & Thrust Engine</p>
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
                                <option value="1mo">Monthly</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-blue-200 disabled:opacity-50 font-black"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing Geometry...' : 'Scan Triangles'}
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
                <div className="flex flex-col items-center justify-center py-40 text-gray-500">
                    <Activity className="w-20 h-20 mb-8 animate-pulse text-blue-600" />
                    <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Detecting Volatility Compression...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{stock.symbol}</h2>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${stock.type.includes('BULL') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                {stock.type.includes('BULL') ? 'Bullish BO' : 'Bearish BD'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">{stock.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{stock.price}</p>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Score: {stock.score}/5</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 transition-colors">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Entry Checklist
                                        </p>
                                        <div className="space-y-2">
                                            {stock.checklist.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className={`text-[12px] font-bold ${item.status ? 'text-gray-700' : 'text-gray-400'}`}>{item.label}</span>
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
                                        <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100/50 text-center">
                                            <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Stop Loss</p>
                                            <p className="text-sm font-black text-rose-700">₹{parseFloat(stock.stop_loss).toFixed(1)}</p>
                                        </div>
                                        <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/50 text-center">
                                            <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Target</p>
                                            <p className="text-sm font-black text-emerald-700">₹{parseFloat(stock.target).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-blue-500" />
                                        <span>Vol: {(stock.volume / stock.avg_volume).toFixed(1)}x</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <Zap className="w-4 h-4" />
                                        <span>Thrust Phase</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-24 rounded-[3rem] border border-gray-100 text-center shadow-xl shadow-gray-100/50 flex flex-col items-center">
                            <TrendingUp className="w-16 h-16 text-gray-200 mb-6" />
                            <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">No Triangle Breakouts</h3>
                            <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed">The AI is monitoring stock consolidations. No major asymmetrical compression released on {timeframe}.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
