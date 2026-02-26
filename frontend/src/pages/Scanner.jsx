import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, BarChart2, Filter, Clock, Shield, Target, AlertCircle } from 'lucide-react';

export default function Scanner() {
    const [breakouts, setBreakouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('1d');
    const [category, setCategory] = useState('ALL');

    const PAPA_CATEGORIES = [
        { id: 'ALL', name: 'All PAPA Patterns' },
        { id: 'DOUBLE_TOP', name: '1. Double Top' },
        { id: 'DOUBLE_BOTTOM', name: '2. Double Bottom' },
        { id: 'THREE_WHITE_SOLDIERS', name: '3. Three White Soldiers' },
        { id: 'THREE_BLACK_CROWS', name: '4. Three Black Crows' },
        { id: 'BULLS_COUNTER_ATTACK', name: '5. Bulls Counter Attack' },
        { id: 'BEARS_COUNTER_ATTACK', name: '6. Bears Counter Attack' },
        { id: 'SANDWICH_PATTERN', name: '7. Sandwich Pattern' },
        { id: 'ROUNDING_BOTTOM', name: '8. Rounding Bottom' },
        { id: 'ROUNDING_TOP', name: '9. Rounding Top' },
        { id: 'GENUINE_BO', name: '10. Genuine BO' },
        { id: 'GENUINE_BD', name: '11. Genuine BD' },
        { id: 'FAKE_BO', name: '12. Fake BO' },
        { id: 'FAKE_BD', name: '13. Fake BD' },
        { id: 'GAP_UP', name: '14. Gap Up' },
        { id: 'GAP_DOWN', name: '15. Gap Down' }
    ];

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
            setError('Failed to fetch PAPA patterns. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBreakouts();
    }, [timeframe, category]);

    const getBadgeColor = (type) => {
        if (type.includes('BULL') || type.includes('BOTTOM') || type.includes('WHITE') || type.includes('BO') || type.includes('GAP_UP')) {
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        }
        return 'bg-rose-100 text-rose-700 border-rose-200';
    };

    const getTypeName = (type) => {
        const cat = PAPA_CATEGORIES.find(c => c.id === type);
        return cat ? cat.name : type.replace(/_/g, ' ');
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen bg-gray-50/50">
            <header className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-5">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-4 rounded-2xl shadow-lg shadow-indigo-100">
                        <Shield className="text-white w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            PAPA Decision Scanner
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-amber-200">Pro AI</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Deep Pattern Analysis based on PAPA Decision Sheets</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm">
                        <div className="flex items-center px-4 py-2 border-r border-gray-300">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-bold text-sm text-gray-800 outline-none cursor-pointer"
                            >
                                <option value="1h">1 Hour</option>
                                <option value="1d">Daily</option>
                                <option value="1wk">Weekly</option>
                                <option value="1mo">Monthly</option>
                            </select>
                        </div>
                        <div className="flex items-center px-4 py-2">
                            <Filter className="w-4 h-4 text-gray-500 mr-2" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-transparent font-bold text-sm text-gray-800 outline-none cursor-pointer max-w-[200px]"
                            >
                                {PAPA_CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchBreakouts}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-gray-200 disabled:opacity-50 font-black"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing...' : 'Deep Scan'}
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
                    <div className="relative">
                        <Activity className="w-20 h-20 mb-8 animate-pulse text-indigo-600" />
                        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
                    </div>
                    <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Deep Scanning Market Geometry...</p>
                    <p className="text-sm mt-3 text-gray-400 font-bold uppercase tracking-widest tracking-widest">Searching {timeframe} patterns on Nifty Top Stocks</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {breakouts.length > 0 ? (
                        breakouts.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                {/* Subtle Background Gradient */}
                                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 ${stock.type.includes('BULL') || stock.type.includes('BO') ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{stock.symbol}</h2>
                                            <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-gray-200">NSE</span>
                                        </div>
                                        <div className={`mt-3 text-[11px] font-black px-3 py-1.5 rounded-xl border inline-block uppercase tracking-wider ${getBadgeColor(stock.type)} shadow-sm`}>
                                            {getTypeName(stock.type)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{stock.close}</p>
                                        <p className="text-[10px] font-black text-indigo-500 mt-2 uppercase tracking-widest">{stock.date}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 group-hover:border-indigo-100/50 transition-colors">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> PAPA Observation
                                        </p>
                                        <p className="text-[13px] font-bold text-gray-700 leading-relaxed italic">
                                            "{stock.message}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100/50">
                                            <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                                <Target className="w-3 h-3" /> Stop Loss
                                            </p>
                                            <p className="text-sm font-black text-rose-700">₹{parseFloat(stock.stop_loss).toFixed(1)}</p>
                                        </div>
                                        <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/50">
                                            <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" /> Target
                                            </p>
                                            <p className="text-sm font-black text-emerald-700">₹{parseFloat(stock.target).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest pt-2 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-3 h-3" />
                                        <span>Vol: {(stock.volume / stock.avg_volume).toFixed(1)}x</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3 h-3" />
                                        <span>R: ₹{stock.resistance}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-24 rounded-[3rem] border border-gray-100 text-center shadow-xl shadow-gray-100/50 flex flex-col items-center">
                            <div className="bg-gray-50 p-6 rounded-3xl mb-6">
                                <Filter className="w-16 h-16 text-gray-200" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">No Active {category === 'ALL' ? 'Patterns' : getTypeName(category)}</h3>
                            <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed">The AI has analyzed 80+ stocks but can't find clear geometric patterns for this setup on the {timeframe} timeframe right now.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
