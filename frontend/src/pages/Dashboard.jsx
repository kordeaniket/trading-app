import React from 'react';
import { Activity, Zap, Shield, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trading Portal Overview</h1>
                <p className="text-gray-500 font-medium mt-1">Welcome back. Here is your system status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-indigo-50 rounded-xl">
                        <Activity className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">AI Engines</p>
                        <p className="text-2xl font-black text-gray-900">Online</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                        <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Nifty Stocks</p>
                        <p className="text-2xl font-black text-gray-900">80 Canned</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-purple-50 rounded-xl">
                        <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">System Security</p>
                        <p className="text-2xl font-black text-gray-900">Secured</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-white opacity-5 w-64 h-64 rounded-full blur-3xl"></div>
                <h2 className="text-2xl font-bold mb-2 relative z-10">Advanced AI Scanner Active</h2>
                <p className="text-gray-300 max-w-xl mb-6 relative z-10">
                    Your machine learning multi-timeframe scanner is ready. Navigate to the Scanner module to identify exact entry points for Flat Breakouts, Double Bottoms, and Flag-And-Pole structures.
                </p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2 relative z-10">
                    Open Scanner <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
