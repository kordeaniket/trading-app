import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Filter, BarChart2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-500'
                }`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <span className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-1">{title}</h3>
            <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
            {subtext && <p className="text-gray-400 text-xs mt-1 font-semibold">{subtext}</p>}
        </div>
    </div>
);

const SectorStockDetails = ({ sector }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStocks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/scan-sector-stocks?sector=${sector}`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to fetch sector stocks", error);
            }
            setLoading(false);
        };
        fetchStocks();
    }, [sector]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Activity className="w-5 h-5 text-indigo-500 animate-spin" />
                <span className="ml-2 text-sm font-bold text-gray-400">Scanning Constituents...</span>
            </div>
        );
    }

    if (!data) return null;

    const StockList = ({ title, stocks, type }) => (
        <div className="flex-1">
            <h4 className={`text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${type === 'out' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {type === 'out' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {title}
            </h4>
            <div className="space-y-2">
                {stocks.map(stock => (
                    <div key={stock.symbol} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{stock.symbol}</p>
                            <p className="text-[10px] font-bold text-gray-400">Rs.{stock.price}</p>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs font-black ${stock.alpha_1m > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stock.alpha_1m > 0 ? '+' : ''}{stock.alpha_1m}%
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">{stock.trend}</p>
                        </div>
                    </div>
                ))}
                {stocks.length === 0 && <p className="text-xs font-bold text-gray-400">No stocks found.</p>}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 mt-2 mb-4">
            <StockList title="Top 5 Outperforming" stocks={data.top_outperforming} type="out" />
            <StockList title="Top 5 Underperforming" stocks={data.top_underperforming} type="in" />
        </div>
    );
};

const IndicesScanner = () => {
    const [data, setData] = useState([]);
    const [benchmark, setBenchmark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, OUTPERFORMING, UNDERPERFORMING
    const [expandedSector, setExpandedSector] = useState(null);

    const fetchIndices = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/scan-indices?timeframe=1d`);
            if (response.ok) {
                const result = await response.json();
                setData(result.data);
                setBenchmark(result.benchmark);
            }
        } catch (error) {
            console.error('Failed to fetch indices data', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchIndices();
        const interval = setInterval(fetchIndices, 60000 * 5); // Refresh every 5 mins
        return () => clearInterval(interval);
    }, []);

    const filteredData = data.filter(item => {
        if (filter === 'ALL') return true;
        return item.status === filter;
    });

    const getStatusStyle = (status) => {
        if (status === 'OUTPERFORMING') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        return 'bg-rose-50 text-rose-600 border-rose-100';
    };

    const getTrendStyle = (trend) => {
        if (trend === 'BULLISH') return 'bg-emerald-50 text-emerald-600';
        if (trend === 'BEARISH') return 'bg-rose-50 text-rose-600';
        return 'bg-gray-50 text-gray-500';
    };

    return (
        <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Sectoral Indices</h1>
                        </div>
                        <p className="text-gray-400 font-semibold flex items-center gap-2">
                            Track Sector Outperformance vs NIFTY 50
                        </p>
                    </div>

                    <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto custom-scrollbar">
                        {['ALL', 'OUTPERFORMING', 'UNDERPERFORMING'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap outline-none ${filter === f
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Benchmark Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Benchmark"
                        value={benchmark?.name || 'NIFTY 50'}
                        subtext={`Current Price: Rs.${benchmark?.price || 0}`}
                        icon={Target}
                    />
                    <StatCard
                        title="Nifty 1W Return"
                        value={`${benchmark?.perf_1w > 0 ? '+' : ''}${benchmark?.perf_1w?.toFixed(2) || 0}%`}
                        icon={benchmark?.perf_1w > 0 ? TrendingUp : TrendingDown}
                        trend={benchmark?.perf_1w > 0 ? 'up' : 'down'}
                    />
                    <StatCard
                        title="Nifty 1M Return"
                        value={`${benchmark?.perf_1m > 0 ? '+' : ''}${benchmark?.perf_1m?.toFixed(2) || 0}%`}
                        icon={benchmark?.perf_1m > 0 ? TrendingUp : TrendingDown}
                        trend={benchmark?.perf_1m > 0 ? 'up' : 'down'}
                    />
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                    {loading ? (
                        <div className="flex justify-center items-center py-20 text-gray-400">
                            <Activity className="w-8 h-8 animate-spin" />
                            <span className="ml-3 font-bold">Analyzing Indices Data...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Index</th>
                                        <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status / Alpha (1M)</th>
                                        <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Trend</th>
                                        <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((idx, index) => (
                                        <React.Fragment key={idx.symbol}>
                                            <tr
                                                onClick={() => setExpandedSector(expandedSector === idx.symbol ? null : idx.symbol)}
                                                className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer ${expandedSector === idx.symbol ? 'bg-indigo-50/30' : ''}`}
                                            >
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${expandedSector === idx.symbol ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-white group-hover:shadow-sm'}`}>
                                                            {expandedSector === idx.symbol ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900">{idx.name}</h3>
                                                            <p className="text-xs text-gray-400 font-semibold">{idx.symbol}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col gap-1.5 items-start">
                                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(idx.status)}`}>
                                                            {idx.status}
                                                        </span>
                                                        <span className={`text-sm font-bold ${idx.alpha_1m > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                            Alpha: {idx.alpha_1m > 0 ? '+' : ''}{idx.alpha_1m}% vs Nifty
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4">
                                                    <span className={`flex items-center gap-1.5 w-max px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase ${getTrendStyle(idx.trend)}`}>
                                                        {idx.trend === 'BULLISH' ? <TrendingUp className="w-3.5 h-3.5" /> : idx.trend === 'BEARISH' ? <TrendingDown className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                                                        {idx.trend}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-4 text-right">
                                                    <div className="font-black text-gray-900">Rs.{idx.price}</div>
                                                    <div className={`text-xs font-bold ${idx.perf_1w > 0 ? 'text-emerald-500' : 'text-rose-500'} mt-0.5`}>
                                                        1W: {idx.perf_1w > 0 ? '+' : ''}{idx.perf_1w}%
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedSector === idx.symbol && (
                                                <tr>
                                                    <td colSpan="4" className="px-4 pb-4">
                                                        <SectorStockDetails sector={idx.symbol} />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}

                                    {filteredData.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center text-gray-400 font-bold">
                                                No indices found for the selected filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndicesScanner;
