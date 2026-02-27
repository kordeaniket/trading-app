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
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/scan?timeframe=${timeframe}&category=${category}`);
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
            return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
        }
        return 'bg-rose-50 text-rose-700 border-rose-100/50';
    };

    const getTypeName = (type) => {
        const cat = PAPA_CATEGORIES.find(c => c.id === type);
        return cat ? cat.name : type.replace(/_/g, ' ');
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen bg-transparent">
            <header className="mb-6 md:mb-10 flex flex-col xl:flex-row justify-between xl:items-end gap-6 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl transition-all duration-700"></div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl shadow-indigo-100/50">
                        <Shield className="text-white w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
                            PAPA Scanner
                            <span className="bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest border border-amber-200">AI Engine</span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Geometric Pattern Recognition</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10">
                    <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm flex-1 sm:flex-none">
                        <div className="flex items-center px-2 md:px-4 py-2 border-r border-gray-300 flex-1 sm:flex-none">
                            <Clock className="w-3 md:w-4 h-3 md:h-4 text-gray-500 mr-2" />
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent font-black text-xs md:text-sm text-gray-800 outline-none cursor-pointer w-full"
                            >
                                <option value="1h">1H</option>
                                <option value="1d">1D</option>
                                <option value="1wk">1W</option>
                                <option value="1mo">1M</option>
                            </select>
                        </div>
                        <div className="flex items-center px-2 md:px-4 py-2 flex-1 sm:flex-none">
                            <Filter className="w-3 md:w-4 h-3 md:h-4 text-gray-500 mr-2" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-transparent font-black text-xs md:text-sm text-gray-800 outline-none cursor-pointer"
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
                        className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] transition-all shadow-xl shadow-gray-200 disabled:opacity-50 font-black text-sm md:text-base uppercase tracking-widest"
                    >
                        <RefreshCw className={`w-4 md:w-5 h-4 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing' : 'Scan market'}
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
                    <Activity className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-10 animate-bounce text-indigo-600" />
                    <p className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Detecting Geometry...</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px] md:text-xs">Analyzing {timeframe} trends across NIFTY50</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {breakouts.length > 0 ? (
                        breakouts.map((stock, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                                <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-125 ${stock.type.includes('BULL') || stock.type.includes('BO') ? 'bg-emerald-50' : 'bg-rose-50'}`}></div>

                                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                                    <div className="max-w-[65%]">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter truncate uppercase">{stock.symbol}</h2>
                                        </div>
                                        <div className={`mt-2 text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full border inline-block uppercase tracking-widest ${getBadgeColor(stock.type)}`}>
                                            {getTypeName(stock.type)}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">₹{stock.close}</p>
                                        <p className="text-[9px] md:text-[10px] font-black text-indigo-500 mt-1 uppercase tracking-widest">{stock.date}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6 flex-grow relative z-10">
                                    <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 group-hover:border-indigo-100 transition-colors">
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Shield className="w-3.5 h-3.5 text-indigo-500" /> AI Insights
                                        </p>
                                        <p className="text-xs md:text-sm font-bold text-gray-700 italic leading-relaxed md:leading-loose">
                                            "{stock.message}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <div className="bg-rose-50/40 p-3 md:p-4 rounded-2xl border border-rose-100/50 flex flex-col items-center text-center">
                                            <p className="text-[8px] md:text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1 italic">Stop Loss</p>
                                            <p className="text-sm md:text-base font-black text-rose-700">₹{parseFloat(stock.stop_loss).toFixed(1)}</p>
                                        </div>
                                        <div className="bg-emerald-50/40 p-3 md:p-4 rounded-2xl border border-emerald-100/50 flex flex-col items-center text-center">
                                            <p className="text-[8px] md:text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">Target</p>
                                            <p className="text-sm md:text-base font-black text-emerald-700">₹{parseFloat(stock.target).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] pt-5 md:pt-8 border-t border-gray-50 relative z-10 mt-6 md:mt-8">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50">
                                        <BarChart2 className="w-4 h-4 text-indigo-400" />
                                        <span>Vol: {(stock.volume / stock.avg_volume).toFixed(1)}x</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-indigo-50/50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100/50">
                                        <Activity className="w-4 h-4" />
                                        <span>R: ₹{stock.resistance}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 md:p-24 rounded-[2rem] md:rounded-[4rem] border border-gray-100 text-center shadow-sm flex flex-col items-center">
                            <Filter className="w-12 h-12 md:w-20 md:h-20 text-gray-100 mb-6 md:mb-10 animate-pulse" />
                            <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">No Active {category === 'ALL' ? 'Patterns' : getTypeName(category)}</h3>
                            <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed text-sm md:text-lg">No clear geometric patterns found for this setup on the {timeframe} timeframe.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
