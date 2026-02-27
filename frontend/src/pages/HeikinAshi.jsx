import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, Activity, Crosshair, Clock, Info, AlertCircle } from 'lucide-react';

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
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-gray-900 font-sans min-h-screen">
            <header className="mb-6 md:mb-10 flex flex-col xl:flex-row justify-between xl:items-end gap-6 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl transition-all duration-700"></div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-xl shadow-indigo-100/50">
                        <TrendingUp className="text-white w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
                            Heikin-Ashi
                            <span className="bg-purple-100 text-purple-700 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest border border-purple-200">Trend Ride</span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Continuity Scanner & RSI Analytics</p>
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
                                <option value="30m">30m</option>
                                <option value="1h">1h</option>
                                <option value="1d">1d</option>
                                <option value="1wk">1w</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={fetchSetups}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 font-black text-sm md:text-base uppercase tracking-widest"
                    >
                        <RefreshCw className={`w-4 md:w-5 h-4 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Analyzing' : 'Scan Market'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-rose-50 text-rose-600 p-5 rounded-2xl mb-8 border border-rose-100 font-bold flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">{error}</span>
                </div>
            )}

            <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 mb-8 flex items-start gap-4 md:gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="bg-indigo-600 p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0 shadow-lg shadow-indigo-200">
                    <Info className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-indigo-900 text-xs md:text-base font-medium relative z-10 leading-relaxed md:leading-loose">
                    <p className="mb-2 md:mb-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <span className="bg-indigo-200/50 text-indigo-700 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest w-fit">Bullish</span>
                        <span>EMA(20) upward, Green HA (No Low Wick), RSI &gt; 50.</span>
                    </p>
                    <p className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <span className="bg-indigo-200/50 text-indigo-700 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest w-fit">Bearish</span>
                        <span>EMA(20) downward, Red HA (No Upper Wick), RSI &lt; 50.</span>
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 md:py-48 text-gray-500 text-center">
                    <Activity className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-10 animate-bounce text-indigo-600" />
                    <p className="text-2xl md:text-4xl font-black text-indigo-900 tracking-tight">Processing Waves...</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px] md:text-xs">Crunching HA Moving Averages</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {setups.length > 0 ? (
                        setups.map((stock, idx) => (
                            <div key={idx} className={`bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border ${stock.trend === 'BULLISH' ? 'border-emerald-100/50 hover:border-emerald-300' : 'border-rose-100/50 hover:border-rose-300'} p-6 md:p-8 transition-all group relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 duration-500`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${stock.trend === 'BULLISH' ? 'bg-emerald-50' : 'bg-rose-50'} opacity-40 blur-2xl group-hover:scale-125 transition-transform duration-700`}></div>

                                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                                    <div className="max-w-[65%]">
                                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter truncate">{stock.symbol}</h2>
                                        <span className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full mt-2 inline-block uppercase tracking-widest border shrink-0 ${stock.trend === 'BULLISH' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                            {stock.trend}
                                        </span>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className={`text-2xl md:text-4xl font-black tracking-tighter ${stock.trend === 'BULLISH' ? 'text-emerald-600' : 'text-rose-600'}`}>₹{stock.close}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6 relative z-10 flex-grow">
                                    <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 group-hover:border-indigo-100 transition-colors">
                                        <div className="flex justify-between items-center text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
                                            <span className="text-gray-400 flex items-center gap-2">
                                                <Crosshair className="w-3.5 h-3.5 text-indigo-500" /> RSI Analysis
                                            </span>
                                            <span className={`px-3 py-1 rounded-full ${stock.trend === 'BULLISH' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                                {stock.ai_score}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                                <p className="text-[8px] md:text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1 italic">Stop Loss</p>
                                                <p className="text-sm md:text-base font-black text-rose-700 break-all">₹{stock.stop_loss}</p>
                                            </div>
                                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                                <p className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Take Profit</p>
                                                <p className="text-[10px] md:text-xs font-black text-indigo-700 leading-tight break-words">{stock.take_profit}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900/95 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-800 shadow-xl">
                                        <p className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">AI Technical Verdict</p>
                                        <p className="text-white text-xs md:text-sm font-bold leading-relaxed tracking-tight group-hover:text-indigo-200 transition-colors">
                                            "{stock.message}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 md:p-24 rounded-[2rem] md:rounded-[4rem] border border-gray-100 text-center shadow-sm flex flex-col items-center">
                            <TrendingUp className="w-12 h-12 md:w-20 md:h-20 text-gray-100 mb-6 md:mb-10 animate-pulse" />
                            <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">No HA Setups Active</h3>
                            <p className="text-gray-500 font-bold max-w-sm mx-auto leading-relaxed text-sm md:text-lg">None of the monitored stocks meet the strict Heikin-Ashi Trend Continuation criteria right now on the <span className="font-bold">{timeframe}</span> timeframe.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
