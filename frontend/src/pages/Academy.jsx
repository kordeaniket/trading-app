import React, { useState } from 'react';
import { BookOpen, LineChart, TrendingUp, TrendingDown, Maximize2, MoveVertical, BarChart2, Target, FileText, BarChart, ArrowLeft } from 'lucide-react';

const Academy = () => {
    const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'candlesticks', 'patterns'
    const [selectedConcept, setSelectedConcept] = useState(null);

    return (
        <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-cyan-50 text-cyan-600 p-2 rounded-xl border border-cyan-100">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Trading Academy</h1>
                        </div>
                        <p className="text-gray-400 font-semibold flex items-center gap-2 text-sm">
                            <Target className="w-4 h-4 text-emerald-500" /> Master Market Structure, Candlesticks, and Geometrics
                        </p>
                    </div>

                    <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto custom-scrollbar">
                        {[
                            { id: 'theory', label: 'Market Theory', icon: FileText },
                            { id: 'candlesticks', label: 'Candlesticks', icon: BarChart },
                            { id: 'patterns', label: 'Chart Patterns', icon: LineChart }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap outline-none flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-white text-cyan-600 shadow-sm'
                                    : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theory Tab */}
                {activeTab === 'theory' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            {selectedConcept ? (
                                <TheoryDetail
                                    concept={selectedConcept}
                                    onBack={() => setSelectedConcept(null)}
                                />
                            ) : (
                                <>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-6">Market Structure Basics</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {theoryConcepts.map((concept, idx) => (
                                            <ConceptCard
                                                key={idx}
                                                title={concept.title}
                                                desc={concept.shortDesc}
                                                icon={concept.icon}
                                                bg={concept.bg}
                                                onClick={() => setSelectedConcept(concept)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Candlesticks Tab */}
                {activeTab === 'candlesticks' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        {/* Anatomy Intro */}
                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-white tracking-tighter mb-4">Anatomy of a Candle</h3>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    A Japanese candlestick tells a story of the war between institutional buyers and sellers during a specific time period. The "Body" shows where value was established (Open to Close). The "Wicks" (or tails) show price rejection and liquidity hunting.
                                </p>
                            </div>
                            <div className="flex gap-12 justify-center items-center">
                                {/* Bullish Candle SVG */}
                                <div className="text-center">
                                    <svg width="60" height="140" viewBox="0 0 60 140" className="mx-auto mb-2">
                                        <line x1="30" y1="10" x2="30" y2="130" stroke="#10b981" strokeWidth="4" />
                                        <rect x="15" y="40" width="30" height="60" fill="#10b981" rx="4" />
                                        <text x="70" y="15" fill="#9ca3af" fontSize="10" dominantBaseline="middle">High</text>
                                        <text x="-15" y="40" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Close</text>
                                        <text x="-15" y="100" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Open</text>
                                        <text x="70" y="130" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Low</text>
                                    </svg>
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Bullish</span>
                                </div>
                                {/* Bearish Candle SVG */}
                                <div className="text-center">
                                    <svg width="60" height="140" viewBox="0 0 60 140" className="mx-auto mb-2">
                                        <line x1="30" y1="10" x2="30" y2="130" stroke="#f43f5e" strokeWidth="4" />
                                        <rect x="15" y="40" width="30" height="60" fill="#f43f5e" rx="4" />
                                        <text x="70" y="15" fill="#9ca3af" fontSize="10" dominantBaseline="middle">High</text>
                                        <text x="-15" y="40" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Open</text>
                                        <text x="-15" y="100" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Close</text>
                                        <text x="70" y="130" fill="#9ca3af" fontSize="10" dominantBaseline="middle">Low</text>
                                    </svg>
                                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Bearish</span>
                                </div>
                            </div>
                        </div>

                        {/* List of Patterns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CandleCard
                                name="Bullish Engulfing"
                                type="Reversal (Bottom)"
                                desc="A small red candle is completely swallowed by a massive green candle. This indicates aggressive institutional buying stepping in to trap retail short sellers."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="25" y1="25" x2="25" y2="55" stroke="#f43f5e" strokeWidth="3" />
                                        <rect x="17" y="30" width="16" height="20" fill="#f43f5e" rx="2" />
                                        <line x1="55" y1="10" x2="55" y2="70" stroke="#10b981" strokeWidth="3" />
                                        <rect x="47" y="15" width="16" height="50" fill="#10b981" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Hammer / Pin Bar"
                                type="Reversal (Bottom)"
                                desc="A long lower wick with a small body at the top. The market dropped hard, but buyers violently rejected the lows and pushed price all the way back up."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="40" y1="20" x2="40" y2="70" stroke="#10b981" strokeWidth="3" />
                                        <rect x="32" y="25" width="16" height="15" fill="#10b981" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Shooting Star"
                                type="Reversal (Top)"
                                desc="A long upper wick with a small green or red body at the bottom. Buyers tried to push highs but were met with heavy supply, pushing the close near the open."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="40" y1="10" x2="40" y2="60" stroke="#f43f5e" strokeWidth="3" />
                                        <rect x="32" y="45" width="16" height="15" fill="#f43f5e" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Bearish Engulfing"
                                type="Reversal (Top)"
                                desc="A small green candle followed by a massive red candle that engulfs it. Signifies complete transition of power from buyers to aggressive sellers."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="25" y1="20" x2="25" y2="50" stroke="#10b981" strokeWidth="3" />
                                        <rect x="17" y="25" width="16" height="20" fill="#10b981" rx="2" />
                                        <line x1="55" y1="15" x2="55" y2="75" stroke="#f43f5e" strokeWidth="3" />
                                        <rect x="47" y="20" width="16" height="50" fill="#f43f5e" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Morning Star"
                                type="Reversal (Bottom)"
                                desc="3-candle setup: Large red, followed by a gap down doji (indecision), followed by a massive green candle driving back into the first red's territory."
                                svg={(
                                    <svg width="100" height="80" viewBox="0 0 100 80">
                                        <rect x="15" y="20" width="14" height="35" fill="#f43f5e" rx="2" />
                                        <line x1="50" y1="55" x2="50" y2="75" stroke="#9ca3af" strokeWidth="2" />
                                        <rect x="45" y="62" width="10" height="6" fill="#9ca3af" rx="1" />
                                        <rect x="71" y="25" width="14" height="30" fill="#10b981" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Doji"
                                type="Indecision"
                                desc="Open and close are virtually identical. Indicates equilibrium between buyers and sellers. Often precedes a violent breakout in either direction."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="40" y1="15" x2="40" y2="65" stroke="#9ca3af" strokeWidth="3" />
                                        <rect x="30" y="38" width="20" height="4" fill="#9ca3af" rx="1" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Inverted Hammer"
                                type="Reversal (Bottom)"
                                desc="Found at the bottom of a downtrend. A long upper wick showing buyers attempting to take control, though sellers pushed it back down. A warning sign the downtrend is weakening."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="40" y1="10" x2="40" y2="60" stroke="#10b981" strokeWidth="3" />
                                        <rect x="32" y="45" width="16" height="15" fill="#10b981" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Tweezer Bottom"
                                type="Reversal (Bottom)"
                                desc="Two candles side-by-side with almost identical low points. The first is red, the second is green. Shows sellers hit a brick wall of demand that they cannot penetrate."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="25" y1="15" x2="25" y2="65" stroke="#f43f5e" strokeWidth="3" />
                                        <rect x="17" y="18" width="16" height="40" fill="#f43f5e" rx="2" />
                                        <line x1="55" y1="35" x2="55" y2="65" stroke="#10b981" strokeWidth="3" />
                                        <rect x="47" y="38" width="16" height="20" fill="#10b981" rx="2" />
                                    </svg>
                                )}
                            />
                            <CandleCard
                                name="Bearish Harami"
                                type="Reversal (Top)"
                                desc="A massive green candle followed by a tiny red candle 'pregnant' inside the green body. Highlights that buyer momentum has suddenly died at the top."
                                svg={(
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <line x1="25" y1="10" x2="25" y2="70" stroke="#10b981" strokeWidth="3" />
                                        <rect x="17" y="15" width="16" height="50" fill="#10b981" rx="2" />
                                        <line x1="55" y1="35" x2="55" y2="55" stroke="#f43f5e" strokeWidth="3" />
                                        <rect x="47" y="40" width="16" height="10" fill="#f43f5e" rx="2" />
                                    </svg>
                                )}
                            />
                        </div>
                    </div>
                )}

                {/* Patterns Tab */}
                {activeTab === 'patterns' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <PatternCard
                                name="Head & Shoulders"
                                type="Bearish Reversal Pattern"
                                desc="Consists of three peaks. The middle peak is highest (Head), flanked by two lower peaks (Shoulders). Breaking below the 'Neckline' validates the severe drop."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Neckline */}
                                        <line x1="20" y1="90" x2="180" y2="90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 10 110 L 40 50 L 60 85 L 100 20 L 140 85 L 160 50 L 190 110" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                        <circle cx="40" cy="50" r="4" fill="#1e1b4b" />
                                        <circle cx="100" cy="20" r="4" fill="#1e1b4b" />
                                        <circle cx="160" cy="50" r="4" fill="#1e1b4b" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Double Bottom (W Pattern)"
                                type="Bullish Reversal Pattern"
                                desc="Price drops to a level of support, bounces up, drops back to the exact same support level, and bounces again. A break above the middle peak signals massive buying."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Resistance Line */}
                                        <line x1="20" y1="40" x2="180" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 10 20 L 60 90 L 100 45 L 140 90 L 190 20" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                        <circle cx="60" cy="90" r="4" fill="#1e1b4b" />
                                        <circle cx="140" cy="90" r="4" fill="#1e1b4b" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Cup & Handle Breakout"
                                type="Bullish Continuation / Accumulation"
                                desc="A U-shaped curve resembling a cup, followed by a slight downward drift (handle). This signifies institutional accumulation. The breakout is highly aggressive."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Resistance Line */}
                                        <line x1="20" y1="40" x2="180" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 10 30 Q 70 140 130 35 L 150 60 L 180 20" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Bull Flag"
                                type="Bullish Continuation"
                                desc="A steep, sharp upward burst of volume (the flagpole) followed by a slow, tight downward consolidation channel (flag). A break out of the top of the flag yields massive gains."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Flag lines */}
                                        <line x1="80" y1="30" x2="140" y2="70" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
                                        <line x1="90" y1="50" x2="150" y2="90" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 20 110 L 80 20 L 100 50 L 120 35 L 140 65 L 170 15" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Inverse Head & Shoulders"
                                type="Bullish Reversal Pattern"
                                desc="Three valleys. The middle trough is lowest (Head), with two shallower troughs (Shoulders) on either side. Breaking ABOVE the neckline validates a massive reversal upwards."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Neckline */}
                                        <line x1="20" y1="30" x2="180" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 10 10 L 40 70 L 60 35 L 100 100 L 140 35 L 160 70 L 190 10" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                        <circle cx="40" cy="70" r="4" fill="#1e1b4b" />
                                        <circle cx="100" cy="100" r="4" fill="#1e1b4b" />
                                        <circle cx="160" cy="70" r="4" fill="#1e1b4b" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Double Top (M Pattern)"
                                type="Bearish Reversal Pattern"
                                desc="Price spikes to a high, pulls back, retests the exact same high, and fails. Breaking below the middle trough 'neckline' triggers a major institutional sell-off."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Support Line */}
                                        <line x1="20" y1="80" x2="180" y2="80" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 10 100 L 60 30 L 100 75 L 140 30 L 190 100" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                        <circle cx="60" cy="30" r="4" fill="#1e1b4b" />
                                        <circle cx="140" cy="30" r="4" fill="#1e1b4b" />
                                    </svg>
                                )}
                            />

                            <PatternCard
                                name="Symmetrical Triangle Breakout"
                                type="Bilateral Breakout (Wait & See)"
                                desc="Price forms lower highs and higher lows, squeezing into an apex. Volatility dies out completely. When the squeeze pops (either up or down), a major trend is born."
                                svg={(
                                    <svg width="100%" height="120" viewBox="0 0 200 120" preserveAspectRatio="none">
                                        {/* Triangle lines */}
                                        <line x1="20" y1="100" x2="180" y2="60" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
                                        <line x1="30" y1="20" x2="180" y2="60" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
                                        {/* Chart Path */}
                                        <path d="M 20 10 L 40 85 L 70 35 L 100 70 L 120 50 L 160 20" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
                                    </svg>
                                )}
                            />

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ConceptCard = ({ title, desc, icon, bg, onClick }) => (
    <div
        onClick={onClick}
        className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
    >
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl mb-4 group-hover:scale-110 transition-transform ${bg}`}>
            {icon}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">{title}</h3>
        <p className="text-gray-500 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
);

const TheoryDetail = ({ concept, onBack }) => (
    <div className="animate-in slide-in-from-right-4 duration-300">
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-sm mb-6 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Grid
        </button>

        <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 flex items-center justify-center rounded-3xl ${concept.bg}`}>
                {concept.icon}
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{concept.title}</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Deep Dive Framework</p>
            </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 mb-8 flex justify-center items-center shadow-xl border border-slate-800">
            {concept.svg}
        </div>

        <div className="space-y-6">
            {concept.paragraphs.map((p, idx) => (
                <p key={idx} className="text-gray-600 font-medium leading-loose text-lg">
                    {p}
                </p>
            ))}
        </div>

        {concept.bulletPoints && (
            <div className="mt-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h4 className="text-gray-900 font-black mb-4">Core Principles:</h4>
                <ul className="space-y-4">
                    {concept.bulletPoints.map((bp, idx) => (
                        <li key={idx} className="flex gap-4 items-start text-gray-600 font-medium">
                            <span className="bg-white px-2 py-0.5 rounded-lg text-cyan-600 font-black shadow-sm border border-gray-100 text-sm mt-0.5">{idx + 1}</span>
                            {bp}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const CandleCard = ({ name, type, desc, svg }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-cyan-100 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-lg font-black text-gray-900 leading-none">{name}</h4>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${type.includes('Bullish') || type.includes('Bottom') ? 'text-emerald-500' : type.includes('Top') ? 'text-rose-500' : 'text-gray-400'}`}>
                    {type}
                </p>
            </div>
        </div>
        <div className="bg-gray-50 rounded-2xl h-32 flex items-center justify-center mb-4 border border-gray-100 mx-auto">
            {svg}
        </div>
        <p className="text-gray-500 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
);

const PatternCard = ({ name, type, desc, svg }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl font-black text-gray-900 mb-1">{name}</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{type}</p>

        <div className="bg-gray-50 rounded-[1.5rem] p-4 flex items-center justify-center mb-6 border border-gray-100">
            {svg}
        </div>

        <p className="text-gray-600 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
);

const theoryConcepts = [
    {
        title: "Support & Resistance",
        shortDesc: "These are not exact numbers, they are ZONES. Support is where institutional demand overwhelms retail selling. Resistance is where institutional supply overwhelms retail buying.",
        icon: <MoveVertical className="w-6 h-6 text-indigo-500" />,
        bg: "bg-indigo-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                <rect width="400" height="40" y="20" fill="#f43f5e" opacity="0.1" />
                <rect width="400" height="40" y="140" fill="#10b981" opacity="0.1" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5" />
                <line x1="0" y1="160" x2="400" y2="160" stroke="#10b981" strokeWidth="2" strokeDasharray="5" />
                <text x="10" y="32" fill="#f43f5e" fontSize="12" fontWeight="bold">Resistance Zone (Supply)</text>
                <text x="10" y="152" fill="#10b981" fontSize="12" fontWeight="bold">Support Zone (Demand)</text>
                <path d="M 0 100 L 40 160 L 100 40 L 160 160 L 220 80 L 280 160 L 340 40 L 400 120" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        ),
        paragraphs: [
            "Support and resistance are the fundamental building blocks of technical analysis. The biggest mistake amateur traders make is treating these as exact, single-dollar numbers. They are not. They are zones or 'bands' where major institutional imbalances between supply and demand occur.",
            "Support (Demand): Think of this as a floor. As price drops to this historically cheap level, major buy orders from large funds trigger, creating a wall of demand that absorbs the selling pressure, eventually bouncing the price back up.",
            "Resistance (Supply): Think of this as a ceiling. As price peaks at a historically expensive level, large players begin taking profits or initiating short positions. This wall of supply absorbs the buying pressure, forcing the price back down.",
            "Memory of the Market: The more times a zone is tested without breaking, the stronger it is perceived to be. However, every time a support is struck, it absorbs some of the buy orders. Eventually, if hammered enough, the floor mathematically has to break."
        ],
        bulletPoints: [
            "Always draw support and resistance as wide rectangles, not single thin lines.",
            "Old resistance, once broken, often becomes new support (and vice versa).",
            "Higher timeframes (Daily/Weekly) hold significantly more weight than lower timeframes (1m/5m)."
        ]
    },
    {
        title: "Trend Construction",
        shortDesc: "An Uptrend consists of Higher Highs (HH) and Higher Lows (HL). A Downtrend consists of Lower Highs (LH) and Lower Lows (LL). Do not trade against the trend until structure breaks.",
        icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
        bg: "bg-emerald-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M 20 180 L 80 100 L 140 140 L 220 60 L 280 100 L 360 20" fill="none" stroke="#10b981" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="80" cy="100" r="4" fill="#10b981" />
                <text x="80" y="90" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">High</text>
                <circle cx="140" cy="140" r="4" fill="#10b981" />
                <text x="140" y="155" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Low</text>

                <circle cx="220" cy="60" r="4" fill="#10b981" />
                <text x="220" y="50" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Higher High (HH)</text>
                <circle cx="280" cy="100" r="4" fill="#10b981" />
                <text x="280" y="115" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Higher Low (HL)</text>

                <circle cx="360" cy="20" r="4" fill="#10b981" />
                <text x="360" y="10" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">HH</text>
            </svg>
        ),
        paragraphs: [
            "Markets never move in straight lines; they move in waves. To successfully identify the direction of the market, you must map the peaks and troughs of these waves to establish the true market structure.",
            "An Uptrend requires two conditions to be met simultaneously: it must make a Higher High than the previous peak, AND it must make a Higher Low than the previous trough. As long as these two rules hold true, the trend is up and you should purely be looking for buy setups on the pullbacks (the Higher Lows).",
            "A Downtrend is the exact opposite. It creates Lower Lows and Lower Highs. In this structure, support floors are routinely failing, and sellers are asserting dominance.",
            "Change of Character (CHoCH): A trend officially dies when its structure is broken. For an uptrend, the moment the price closes below the previous Higher Low, the uptrend is immediately invalidated."
        ],
        bulletPoints: [
            "Never try to catch a falling knife. Wait for the downtrend to break before buying.",
            "The safest entry point in an uptrend is right after a Higher Low is established.",
            "Trends exist on multiple timeframes; the 5-minute chart might be in a downtrend while the Daily chart is still in a massive uptrend."
        ]
    },
    {
        title: "Volume Validation",
        shortDesc: "Volume is the truth serum of the market. A successful breakout MUST be accompanied by high volume relative to the average. Low volume breakouts are often traps.",
        icon: <BarChart2 className="w-6 h-6 text-amber-500" />,
        bg: "bg-amber-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Breakout Line */}
                <line x1="0" y1="80" x2="400" y2="80" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5" />
                <text x="10" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold">Key Resistance</text>

                {/* Price Line */}
                <path d="M 0 160 L 100 100 L 200 140 L 240 80 L 250 40 L 280 20 L 320 60 L 400 30" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinejoin="round" />

                {/* Highlight breakout point */}
                <circle cx="240" cy="80" r="8" fill="none" stroke="#facc15" strokeWidth="2" />

                {/* Volume Bars */}
                <rect x="20" y="170" width="10" height="20" fill="#334155" />
                <rect x="60" y="160" width="10" height="30" fill="#334155" />
                <rect x="100" y="150" width="10" height="40" fill="#334155" />
                <rect x="140" y="175" width="10" height="15" fill="#334155" />
                <rect x="180" y="180" width="10" height="10" fill="#334155" />

                {/* The Breakout Volume */}
                <rect x="235" y="120" width="15" height="70" fill="#10b981" />
                <text x="242" y="110" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Institutional Buying</text>

                <rect x="280" y="140" width="10" height="50" fill="#334155" />
                <rect x="320" y="160" width="10" height="30" fill="#334155" />
                <rect x="360" y="150" width="10" height="40" fill="#334155" />
            </svg>
        ),
        paragraphs: [
            "Price data can easily be manipulated by market makers. They routinely throw 'fakeouts' past resistance levels just to trap retail buyers and liquidate them. Volume is the only metric that cannot be hidden or faked.",
            "Volume represents the actual number of shares or contracts physically changing hands. If a stock attempts to break over a massive resistance level, but the volume bars at the bottom of the screen are low and weak, there is no real conviction behind the move. It is almost certainly a trap.",
            "A genuine, valid breakout will always be visually confirmed by a massive spike in volume at the exact moment of the break. This proves that vast amounts of institutional capital stepped in to tear down the supply wall.",
            "Relative volume is what matters. You are looking for a volume bar that is 2x, 3x, or 4x higher than the average volume bars of the preceding days."
        ],
        bulletPoints: [
            "High Volume + Breakout = High Probability Trade.",
            "Low Volume + Breakout = High Probability Fakeout (Bull Trap).",
            "When prices are consolidating tightly, volume should dry up heavily. That signals pressure building."
        ]
    },
    {
        title: "Multi-Timeframe Analysis",
        shortDesc: "Never trade purely on one timeframe. Use the Weekly/Daily to determine the overall trend. Use the 1-Hour to identify structure shifts, and the 15-Min to pinpoint precise entries.",
        icon: <Maximize2 className="w-6 h-6 text-fuchsia-500" />,
        bg: "bg-fuchsia-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Daily Trend (Macro) */}
                <path d="M 20 180 C 100 100, 200 160, 380 40" fill="none" stroke="#475569" strokeWidth="6" strokeDasharray="8" />
                <text x="50" y="140" fill="#9ca3af" fontSize="12" fontWeight="bold">Daily Chart (Macro Trend)</text>

                {/* 1 Hour Trend (Micro) riding inside it */}
                <path d="M 20 180 L 60 120 L 100 140 L 160 80 L 190 120 L 260 60 L 300 100 L 380 40" fill="none" stroke="#d946ef" strokeWidth="3" />
                <circle cx="300" cy="100" r="6" fill="#d946ef" />
                <text x="290" y="120" fill="#d946ef" fontSize="12" fontWeight="bold">15M Entry Core</text>
            </svg>
        ),
        paragraphs: [
            "Amateur traders make the fatal error of getting 'tunnel vision' on a single timeframe, like the 5-minute chart. They see a massive breakout occurring, buy in, and get instantly rejected—unaware that on the Daily chart, they just bought straight into a major macro resistance level.",
            "Top-Down Analysis is mandatory. You must start at the macro level (Weekly or Daily chart) to establish the true bias. Where are the massive historic support and resistance zones? What is the overarching direction over the last 6 months?",
            "Once you establish the Daily bias, you drop down to the 1-Hour chart to look for structure shifts and patterns aligning with the Daily bias. Finally, you execute the trade on the 15-minute or 5-minute chart to get a highly refined, low-risk entry, minimizing your stop-loss distance.",
            "Rule of Thumb: If the Daily chart is bearish, only look for short setups on the lower timeframes. Do not swim against the macro tide."
        ],
        bulletPoints: [
            "Macro trend dictates the 'What'. Micro trend dictates the 'When'.",
            "Always align your lower timeframe entries with the higher timeframe directional bias.",
            "Use a multiple of 4-6x for your timeframes (e.g., Daily -> 4 Hour -> 1 Hour)."
        ]
    },
    {
        title: "Dow Theory Basics",
        shortDesc: "The market has 3 main phases: Accumulation (institutional buying quietly), Public Participation (trend followers jump in), and Distribution (institutions quietly selling).",
        icon: <TrendingDown className="w-6 h-6 text-rose-500" />,
        bg: "bg-rose-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Three Phases Backgrounds */}
                <rect x="0" y="0" width="133" height="200" fill="#10b981" opacity="0.05" />
                <rect x="133" y="0" width="133" height="200" fill="#38bdf8" opacity="0.05" />
                <rect x="266" y="0" width="134" height="200" fill="#f43f5e" opacity="0.05" />

                {/* Labels */}
                <text x="66" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">1. Accumulation</text>
                <text x="200" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. Participation</text>
                <text x="333" y="20" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">3. Distribution</text>

                {/* Chart Path */}
                <path d="M 10 160 L 40 140 L 80 160 L 120 140 C 160 140, 200 60, 260 40 L 300 60 L 340 40 L 390 100" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        ),
        paragraphs: [
            "Charles Dow framed the market as having three distinct psychological phases. Understanding where you are in this cycle is critical to knowing who holds the leverage.",
            "Phase 1: Accumulation. The market just crashed and the news is terrifying. Retail traders have capitulated and sold everything. Here, 'smart money' (institutions) begin quietly buying shares at severe discounts. The chart looks like an endless, boring, sideways chop.",
            "Phase 2: Public Participation. The price finally breaks out of the sideways chop. Momentum algorithms fire, trend-followers enter, and positive news returns to the media. The price action is rapid, upward, and aggressive. This is the markup phase, yielding the easiest profits.",
            "Phase 3: Distribution. The price has skyrocketed. Euphoria is everywhere, and amateur retail traders are mortgaging their houses to buy the top. Smart money realizes the asset is critically overvalued and begins quietly selling off their massive positions to the eager retail buyers. A new sideways ceiling forms, preceding the inevitable crash."
        ],
        bulletPoints: [
            "The best risk/reward trades are found entering at the very end of Accumulation.",
            "If the news is universally amazing and your neighbor is buying, you are likely in Distribution.",
            "Institutional money requires massive liquidity to enter/exit, forcing these exact phases to occur repeatedly."
        ]
    },
    {
        title: "The Break & Retest",
        shortDesc: "A true breakout is rarely a straight line. Often, price will break out, come back down to touch the previous resistance line, and bounce harder. This is the safest entry.",
        icon: <Target className="w-6 h-6 text-cyan-500" />,
        bg: "bg-cyan-50",
        svg: (
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Resistance / Support Line */}
                <line x1="0" y1="120" x2="400" y2="120" stroke="#64748b" strokeWidth="2" strokeDasharray="5" />
                <text x="10" y="110" fill="#64748b" fontSize="12" fontWeight="bold">Key Level (R turns to S)</text>

                {/* Chart Path */}
                <path d="M 20 180 L 80 130 L 140 160 L 200 60" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 200 60 L 250 120 L 360 20" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinejoin="round" />

                {/* The Entry Signal */}
                <circle cx="250" cy="120" r="8" fill="#f43f5e" />
                <circle cx="250" cy="120" r="16" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" className="animate-[spin_4s_linear_infinite]" />
                <text x="250" y="145" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">THE RETEST (Safest Entry)</text>
            </svg>
        ),
        paragraphs: [
            "FOMO (Fear Of Missing Out) destroys more accounts than anything else. When a stock violently breaks through a major resistance level, amateur traders panic-buy the absolute peak, terrified the train is leaving without them.",
            "Professional traders do the exact opposite. They wait. In standard harmonic market structure, over 70% of major breakouts will retrace back down to the exact resistance line they just broke over.",
            "Because of the polarity principle (old resistance becomes new support), this line is heavily defended by buyers. This 'retest' of the line provides a mathematically perfect entry: you enter exactly on support, and place your stop-loss directly below it, giving you minimal risk for maximum upside.",
            "If the breakout was fake, the price will simply crash back below the line, and you avoided a catastrophic loss because you waited to see if the retest would hold."
        ],
        bulletPoints: [
            "Never chase a vertical green candle right after a breakout.",
            "Let the price pull back to the breakout zone. If it bounces cleanly off the line, buy.",
            "A breakout without a retest is acceptable to miss; protecting capital is better than chasing FOMO."
        ]
    }
];

export default Academy;
