import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, Settings, Layers, Briefcase, Zap, Activity, Triangle, Shield } from 'lucide-react';
import Scanner from './pages/Scanner';
import HeikinAshi from './pages/HeikinAshi';
import BullishScanner from './pages/BullishScanner';
import BearishScanner from './pages/BearishScanner';
import ThirdWaveScanner from './pages/ThirdWaveScanner';
import EndingDiagonalScanner from './pages/EndingDiagonalScanner';
import TriangleScanner from './pages/TriangleScanner';
import SMMScanner from './pages/SMMScanner';

const Sidebar = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname === path
            ? "flex items-center gap-3 w-full bg-indigo-50 text-indigo-700 font-bold px-4 py-3 rounded-xl transition-all"
            : "flex items-center gap-3 w-full text-gray-500 font-medium px-4 py-3 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all";
    };

    return (
        <div className="w-72 bg-white border-r border-gray-100 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10 px-2 py-1">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Breakout Pro</h1>
                </div>

                <nav className="space-y-2">
                    <Link to="/scanner" className={getLinkClass('/scanner')}>
                        <Layers className="w-5 h-5" /> AI SCANNER
                    </Link>
                    <Link to="/bullish" className={getLinkClass('/bullish')}>
                        <Zap className="w-5 h-5 text-emerald-500" /> BULLISH SNIPER
                    </Link>
                    <Link to="/bearish" className={getLinkClass('/bearish')}>
                        <Zap className="w-5 h-5 text-red-500" /> BEARISH SNIPER
                    </Link>
                    <Link to="/heikin-ashi" className={getLinkClass('/heikin-ashi')}>
                        <TrendingUp className="w-5 h-5 text-green-500" /> HA TREND RIDE
                    </Link>
                    <Link to="/third-wave" className={getLinkClass('/third-wave')}>
                        <Activity className="w-5 h-5 text-indigo-500" /> 3rd WAVE STRATEGY
                    </Link>
                    <Link to="/ending-diagonal" className={getLinkClass('/ending-diagonal')}>
                        <Triangle className="w-5 h-5 text-rose-500 rotate-180" /> ENDING DIAGONAL
                    </Link>
                    <Link to="/triangle" className={getLinkClass('/triangle')}>
                        <TrendingUp className="w-5 h-5 text-blue-500" /> TRIANGLE BREAKOUT
                    </Link>
                    <Link to="/smm" className={getLinkClass('/smm')}>
                        <Shield className="w-5 h-5 text-indigo-500" /> SMM DECISION SHEET
                    </Link>
                </nav>
            </div>

            <div className="p-6 border-t border-gray-50">
                <button className="flex items-center gap-3 w-full text-gray-500 font-medium px-4 py-3 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all">
                    <Settings className="w-5 h-5" /> Settings
                </button>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <div className="flex bg-gray-50 min-h-screen text-gray-900 font-sans">
                <Sidebar />
                <div className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Scanner />} />
                        <Route path="/scanner" element={<Scanner />} />
                        <Route path="/bullish" element={<BullishScanner />} />
                        <Route path="/bearish" element={<BearishScanner />} />
                        <Route path="/heikin-ashi" element={<HeikinAshi />} />
                        <Route path="/third-wave" element={<ThirdWaveScanner />} />
                        <Route path="/ending-diagonal" element={<EndingDiagonalScanner />} />
                        <Route path="/triangle" element={<TriangleScanner />} />
                        <Route path="/smm" element={<SMMScanner />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
