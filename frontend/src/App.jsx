import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, Settings, Layers, Briefcase, Zap, Activity, Triangle, Shield, Menu, X, ArrowRight, LogOut, BoxSelect, BarChart2, Brain, BookOpen } from 'lucide-react';
import Scanner from './pages/Scanner';
import HeikinAshi from './pages/HeikinAshi';
import BullishScanner from './pages/BullishScanner';
import BearishScanner from './pages/BearishScanner';
import ThirdWaveScanner from './pages/ThirdWaveScanner';
import EndingDiagonalScanner from './pages/EndingDiagonalScanner';
import TriangleScanner from './pages/TriangleScanner';
import SMMScanner from './pages/SMMScanner';
import BoxScanner from './pages/BoxScanner';
import IndicesScanner from './pages/IndicesScanner';
import CupHandleScanner from './pages/CupHandleScanner';
import TradingPsychology from './pages/TradingPsychology';
import Login from './pages/Login';
import Academy from './pages/Academy';

const Sidebar = ({ onLogout }) => {
    const location = useLocation();

    const getLinkClass = (path) => {
        const isActive = location.pathname === path || (path === '/box-scanner' && location.pathname === '/');
        return isActive
            ? "flex items-center gap-4 w-full bg-indigo-600 text-white font-black px-5 py-4 rounded-[1.25rem] transition-all shadow-lg shadow-indigo-100 scale-[1.02]"
            : "flex items-center gap-4 w-full text-gray-400 font-bold px-5 py-4 rounded-[1.25rem] hover:bg-gray-50 hover:text-gray-900 transition-all hover:translate-x-1";
    };

    return (
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col justify-between hidden lg:flex sticky top-0 h-screen overflow-hidden">
            <div className="p-8 h-full flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-3 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center">
                        <TrendingUp className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">BREAKOUT</h1>
                        <p className="text-[10px] font-black text-indigo-500 tracking-[0.2em] uppercase mt-1">Pro Terminal</p>
                    </div>
                </div>

                <nav className="space-y-2 font-sans">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-2">Market Intelligence</p>
                    <Link to="/indices" className={getLinkClass('/indices')}>
                        <BarChart2 className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Indices Trend</span>
                    </Link>
                    <Link to="/cup-handle" className={getLinkClass('/cup-handle')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cup-soda"><path d="m8 22 1-15" /><path d="m16 22-1-15" /><path d="M4 7c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4Z" /><path d="M12 2v5" /><path d="M7.1 22h9.8c.6 0 1.1-.4 1.2-1l1.6-14H4.3l1.6 14c.1.6.6 1 1.2 1Z" /></svg>
                        <span className="text-[11px] tracking-widest uppercase">Cup & Handle</span>
                    </Link>
                    <Link to="/box-scanner" className={getLinkClass('/box-scanner')}>
                        <BoxSelect className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Box Sniper</span>
                    </Link>
                    <Link to="/scanner" className={getLinkClass('/scanner')}>
                        <Layers className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">PAPA Scanner</span>
                    </Link>
                    <Link to="/bullish" className={getLinkClass('/bullish')}>
                        <Zap className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Bull Sniper</span>
                    </Link>
                    <Link to="/bearish" className={getLinkClass('/bearish')}>
                        <Zap className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Bear Sniper</span>
                    </Link>

                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 mt-8 px-2">Wave Analytics</p>
                    <Link to="/heikin-ashi" className={getLinkClass('/heikin-ashi')}>
                        <TrendingUp className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Trend Ride</span>
                    </Link>
                    <Link to="/third-wave" className={getLinkClass('/third-wave')}>
                        <Activity className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">3rd Wave</span>
                    </Link>
                    <Link to="/ending-diagonal" className={getLinkClass('/ending-diagonal')}>
                        <Triangle className="w-5 h-5 rotate-180" /> <span className="text-[11px] tracking-widest uppercase">Ending Diag</span>
                    </Link>
                    <Link to="/triangle" className={getLinkClass('/triangle')}>
                        <Triangle className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Triangle BO</span>
                    </Link>

                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 mt-8 px-2">Strategy Lab</p>
                    <Link to="/smm" className={getLinkClass('/smm')}>
                        <Shield className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Decision Sheet</span>
                    </Link>
                    <Link to="/mindset" className={getLinkClass('/mindset')}>
                        <Brain className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Pro Mindset</span>
                    </Link>
                    <Link to="/academy" className={getLinkClass('/academy')}>
                        <BookOpen className="w-5 h-5" /> <span className="text-[11px] tracking-widest uppercase">Academy</span>
                    </Link>
                </nav>
            </div>

            <div className="p-8 border-t border-gray-50 bg-gray-50/50">
                <div onClick={onLogout} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-rose-100 hover:bg-rose-50 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 border-2 border-white flex items-center justify-center font-black text-gray-500 uppercase">A</div>
                        <div>
                            <p className="text-xs font-black text-gray-900 leading-none">Aniket</p>
                            <p className="text-[9px] font-bold text-rose-500 mt-1 uppercase tracking-tighter">Exit Terminal</p>
                        </div>
                    </div>
                    <LogOut className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transform group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </div>
    );
};

const MobileNav = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/box-scanner', icon: BoxSelect, label: 'BOX', color: 'text-indigo-500' },
        { path: '/cup-handle', icon: Activity, label: 'CUP', color: 'text-fuchsia-500' },
        { path: '/indices', icon: BarChart2, label: 'SECTORS', color: 'text-amber-500' },
        { path: '/scanner', icon: Layers, label: 'PAPA', color: 'text-blue-500' },
        { path: '/bullish', icon: Zap, label: 'BULL', color: 'text-emerald-500' },
        { path: '/smm', icon: Shield, label: 'DECISION', color: 'text-purple-500' },
    ];

    const allItems = [
        { path: '/box-scanner', icon: BoxSelect, label: 'Box Sniper', color: 'bg-indigo-50 text-indigo-600', desc: 'Consolidation BO' },
        { path: '/cup-handle', icon: Activity, label: 'Cup Breakout', color: 'bg-fuchsia-50 text-fuchsia-600', desc: 'U-Base Reversal' },
        { path: '/scanner', icon: Layers, label: 'PAPA Scanner', color: 'bg-blue-50 text-blue-600', desc: 'AI Geometric Patterns' },
        { path: '/bullish', icon: Zap, label: 'Bull Sniper', color: 'bg-emerald-50 text-emerald-600', desc: 'Long Reversal Radar' },
        { path: '/bearish', icon: Zap, label: 'Bear Sniper', color: 'bg-rose-50 text-rose-600', desc: 'Short Risk Detection' },
        { path: '/heikin-ashi', icon: TrendingUp, label: 'HA Trend Ride', color: 'bg-green-50 text-green-600', desc: 'Continuity Analytics' },
        { path: '/third-wave', icon: Activity, label: '3rd Wave', color: 'bg-blue-50 text-blue-600', desc: 'Elliot Wave Impulse' },
        { path: '/ending-diagonal', icon: Triangle, label: 'Ending Diag', color: 'bg-orange-50 text-orange-600', desc: 'Terminal Pattern' },
        { path: '/triangle', icon: Triangle, label: 'Triangle BO', color: 'bg-cyan-50 text-cyan-600', desc: 'Symmetrical Wedge' },
        { path: '/smm', icon: Shield, label: 'SMM Sheet', color: 'bg-purple-50 text-purple-600', desc: 'Decision Matrix' },
        { path: '/mindset', icon: Brain, label: 'Pro Mindset', color: 'bg-amber-50 text-amber-600', desc: 'Risk & Psychology' },
        { path: '/academy', icon: BookOpen, label: 'Academy', color: 'bg-cyan-50 text-cyan-600', desc: 'Patterns & Basics' }
    ];

    return (
        <div className="lg:hidden">
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50 px-2 py-1 flex justify-around items-center">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path === '/scanner' && location.pathname === '/');
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1.5 flex-1 py-1 transition-all rounded-2xl ${isActive ? 'scale-110' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                        >
                            <div className={`${isActive ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'text-gray-400'} p-2 rounded-xl transition-all`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col items-center justify-center gap-1.5 flex-1 opacity-40 hover:opacity-100 transition-all"
                >
                    <div className="text-gray-400 p-2">
                        <Menu className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">All</span>
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xl z-[60] p-4 flex flex-col justify-end">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-500">
                        <div className="p-6 pb-4 border-b border-gray-50 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">TERMINAL</h2>
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Master Menu</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-2xl active:scale-90 transition-all">
                                <X className="w-6 h-6 text-gray-900" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                {allItems.map((item) => {
                                    const isActive = location.pathname === item.path || (item.path === '/scanner' && location.pathname === '/');
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-4 p-4 rounded-3xl border transition-all active:scale-95 ${isActive ? 'bg-gray-900 border-gray-900 shadow-xl' : 'bg-gray-50 border-gray-100 hover:border-indigo-100'}`}
                                        >
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-white/10 text-white' : item.color}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className={`text-sm font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                                                <p className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-gray-400' : 'text-gray-400'}`}>{item.desc}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-4 space-y-3">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Settings & Account</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                                        <Settings className="w-4 h-4 text-gray-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Config</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            onLogout();
                                        }}
                                        className="flex items-center justify-center gap-2 bg-rose-50 p-4 rounded-3xl border border-rose-100 text-rose-500 active:scale-95 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth') === 'true');

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuth', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuth');
    };

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Router>
            <div className="flex bg-[#fcfcfd] min-h-screen text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
                <Sidebar onLogout={handleLogout} />
                <div className="flex-1 w-full pb-20 lg:pb-0 overflow-x-hidden min-w-0">
                    <main className="max-w-full">
                        <Routes>
                            <Route path="/" element={<BoxScanner />} />
                            <Route path="/box-scanner" element={<BoxScanner />} />
                            <Route path="/cup-handle" element={<CupHandleScanner />} />
                            <Route path="/indices" element={<IndicesScanner />} />
                            <Route path="/scanner" element={<Scanner />} />
                            <Route path="/bullish" element={<BullishScanner />} />
                            <Route path="/bearish" element={<BearishScanner />} />
                            <Route path="/heikin-ashi" element={<HeikinAshi />} />
                            <Route path="/third-wave" element={<ThirdWaveScanner />} />
                            <Route path="/ending-diagonal" element={<EndingDiagonalScanner />} />
                            <Route path="/triangle" element={<TriangleScanner />} />
                            <Route path="/smm" element={<SMMScanner />} />
                            <Route path="/mindset" element={<TradingPsychology />} />
                            <Route path="/academy" element={<Academy />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
                <MobileNav onLogout={handleLogout} />
            </div>
        </Router>
    );
}

export default App;
