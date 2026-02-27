import React from 'react';
import { Activity, Zap, Shield, ChevronRight, BarChart3, Globe, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-10">
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Intelligence Hub</h1>
                    <p className="text-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-widest mt-1 md:mt-2">Real-time algorithmic surveillance active</p>
                </div>
                <div className="hidden sm:flex bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">System Live</span>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all duration-500 group">
                    <div className="p-4 md:p-5 bg-indigo-50 rounded-2xl md:rounded-3xl group-hover:scale-110 transition-transform">
                        <Activity className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 md:mb-2">AI Engines</p>
                        <p className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter">Operational</p>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all duration-500 group">
                    <div className="p-4 md:p-5 bg-emerald-50 rounded-2xl md:rounded-3xl group-hover:scale-110 transition-transform">
                        <Layers className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 md:mb-2">Market Data</p>
                        <p className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter">80 Assets Locked</p>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all duration-500 group sm:col-span-2 lg:col-span-1">
                    <div className="p-4 md:p-5 bg-violet-50 rounded-2xl md:rounded-3xl group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8 md:w-10 md:h-10 text-violet-600" />
                    </div>
                    <div>
                        <p className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 md:mb-2">Neural Security</p>
                        <p className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter">Encrypted</p>
                    </div>
                </div>
            </div>

            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 bg-indigo-500 opacity-[0.08] group-hover:opacity-[0.12] w-80 h-80 rounded-full blur-3xl transition-opacity duration-700"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 bg-emerald-500 opacity-[0.05] w-64 h-64 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter leading-tight">Elite Algorithmic Precision Scanner</h2>
                    <p className="text-gray-400 text-sm md:text-xl font-medium mb-8 md:mb-12 leading-relaxed">
                        Identify institutional footprints with surgical accuracy across multiple timeframes. Detect Flat Breakouts, Double Bottoms, and Flag-And-Pole structures before the retail crowd.
                    </p>
                    <button
                        onClick={() => navigate('/scanners')}
                        className="bg-white text-gray-900 px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] font-black shadow-xl hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-widest text-xs md:text-base group"
                    >
                        Launch All Scanners <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <Zap className="w-5 h-5 md:w-7 md:h-7 text-amber-500" />
                        <h3 className="text-xl md:text-2xl font-black tracking-tight">Rapid Alert System</h3>
                    </div>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed">
                        Our real-time neural networks scan the Nifty50 universe every minute, flagging breakout symbols instantly to your dashboard. High accuracy, low noise.
                    </p>
                </div>
                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <Globe className="w-5 h-5 md:w-7 md:h-7 text-indigo-500" />
                        <h3 className="text-xl md:text-2xl font-black tracking-tight">HTF Trend Aligner</h3>
                    </div>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed">
                        The SMM engine ensures you never trade against the major trend. It aligns High Time Frame tides with current patterns for maximum win rates.
                    </p>
                </div>
            </div>
        </div>
    );
}
