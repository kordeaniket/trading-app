import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, Settings, Layers, Briefcase } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import HeikinAshi from './pages/HeikinAshi';

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
                    <Link to="/" className={getLinkClass('/')}>
                        <LayoutDashboard className="w-5 h-5" /> OVERVIEW
                    </Link>
                    <Link to="/scanner" className={getLinkClass('/scanner')}>
                        <Layers className="w-5 h-5" /> AI SCANNER
                    </Link>
                    <Link to="/heikin-ashi" className={getLinkClass('/heikin-ashi')}>
                        <TrendingUp className="w-5 h-5 text-green-500" /> HA TREND RIDE
                    </Link>
                    <button className={getLinkClass('/portfolio')}>
                        <Briefcase className="w-5 h-5" /> PORTFOLIO
                        <span className="ml-auto bg-gray-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded text-gray-400">Soon</span>
                    </button>
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
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/scanner" element={<Scanner />} />
                        <Route path="/heikin-ashi" element={<HeikinAshi />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
