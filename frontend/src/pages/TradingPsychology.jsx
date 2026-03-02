import React, { useState } from 'react';
import { Brain, ShieldAlert, Target, BookOpen, Award, TrendingUp, AlertTriangle, Crosshair, Anchor, Compass, CheckCircle2 } from 'lucide-react';

const TradingPsychology = () => {
    const [activeTab, setActiveTab] = useState('psychology'); // 'psychology', 'risk', 'truths'

    return (
        <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl border border-indigo-100">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Pro Trader Mindset</h1>
                        </div>
                        <p className="text-gray-400 font-semibold flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-amber-500" /> Wisdom & Rules from 20+ Years of Institutional Trading
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto custom-scrollbar">
                        {[
                            { id: 'psychology', label: 'Psychology', icon: Brain },
                            { id: 'risk', label: 'Risk Management', icon: ShieldAlert },
                            { id: 'truths', label: 'Market Truths', icon: Compass }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap outline-none flex items-center gap-2 ${activeTab === tab.id
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                {activeTab === 'psychology' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        <PsychCard
                            icon={Anchor}
                            color="text-blue-500"
                            bg="bg-blue-50"
                            title="Accepting the Loss (The Entry Fee)"
                            description="Amateurs view a stop-loss hit as a personal failure. Pros view it as a perfectly normal business expense. If you run a restaurant, you pay for electricity. In trading, you pay for data and you pay your stops. Never freeze when price hits your line. Click the button."
                        />
                        <PsychCard
                            icon={AlertTriangle}
                            color="text-rose-500"
                            bg="bg-rose-50"
                            title="Revenge Trading & Full Tilt"
                            description="The most money is lost immediately after taking a massive loss, or missing a massive winner. Your brain shifts from analytical mode to a casino 'chasing' mentality. If you feel anger or desperation, close the terminal immediately. Walk away for 24 hours."
                        />
                        <PsychCard
                            icon={Crosshair}
                            color="text-emerald-500"
                            bg="bg-emerald-50"
                            title="The Illusion of Control"
                            description="You do not control the market. You only control your entry, your position size, and your exit. The moment you place the trade, surrender control. If you sit staring at PnL, praying for the candle to turn green, the trade is too large."
                        />
                        <PsychCard
                            icon={Target}
                            color="text-fuchsia-500"
                            bg="bg-fuchsia-50"
                            title="Patience & The Sniper Mentality"
                            description="A sniper can wait 3 days in the mud for 1 shot. Amateurs use a machine gun in all directions. Cash is a position. Often, the best trade of the week is doing nothing at all. Wait for all criteria to align. Never force a setup out of boredom."
                        />
                    </div>
                )}

                {activeTab === 'risk' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                            <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-6 flex items-center gap-3">
                                <ShieldAlert className="w-8 h-8 text-rose-500" /> Capital Preservation First
                            </h2>
                            <p className="text-gray-600 font-medium mb-8 leading-relaxed max-w-4xl">
                                Job #1 is not making money. Job #1 is not losing your account. If you lose your capital, you lose your ability to play the game when the perfect institutional setup finally arrives.
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <RuleCard
                                    number="01"
                                    title="The 1-2% Golden Rule"
                                    text="Never risk more than 1% to 2% of your TOTAL trading capital on a single trade. If you have ₹1,00,000, your maximum allowed loss per trade is ₹1,000 to ₹2,000. Not your trade size, your max loss amount."
                                />
                                <RuleCard
                                    number="02"
                                    title="Risk to Reward (R:R)"
                                    text="Never enter a trade unless the potential reward is at least twice the potential risk (1:2 R:R min). If you risk ₹1,000, your target must yield at least ₹2,000. This ensures you can be wrong 50% of the time and still be wildly profitable."
                                />
                                <RuleCard
                                    number="03"
                                    title="Position Sizing Math"
                                    text="Position Size = (Total Capital * Risk %) / (Entry Price - Stop Loss Price). If you do not calculate this BEFORE every single trade, you are gambling, not trading."
                                />
                                <RuleCard
                                    number="04"
                                    title="Max Daily Drawdown"
                                    text="Set a hard Daily Loss Limit. If your account drops by x% in a single day (e.g., you lose 3 trades in a row), shut down the terminal. The market condition is either poor, or your mental condition is compromised."
                                />
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
                            <h3 className="text-xl font-black tracking-tight mb-4 text-emerald-400">The Power of Asymmetry</h3>
                            <div className="space-y-4">
                                <ProgressBar label="Win Rate Needed at 1:1 R:R" value={51} />
                                <ProgressBar label="Win Rate Needed at 1:2 R:R" value={34} />
                                <ProgressBar label="Win Rate Needed at 1:3 R:R" value={26} />
                            </div>
                            <p className="text-xs text-gray-400 mt-6 font-bold uppercase tracking-widest">
                                Conclusion: You don't need to be right often to be extremely rich. You just need to cut losers fast and let winners run.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'truths' && (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Brutal Market TRUTHS</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Written in blood and blown accounts</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                "The market does not know you exist. It is not out to get you. It is a neutral mechanism transferring wealth from the impatient to the patient.",
                                "A high win-rate is an ego metric. Professionals prefer a 40% win rate where the winners are massive and the losers are paper cuts.",
                                "Price Action is King. News, Twitter, TV Anchors, and 'tips' are noise designed to provide liquidity for Institutional exits. If the chart says sell, but the news says buy, you SELL.",
                                "Your strategy only matters 20%. Your psychology and risk management matter 80%. A mediocre strategy with perfect risk management will make money. A perfect strategy with reckless sizing will blow up.",
                                "Averaging down a losing trade is financial suicide. Never add to a loser. Institutions add to winners.",
                                "Trading is the hardest way to make easy money. Treat it like a high-performance sport. Sleep, routine, and emotional baseline dictate your PnL.",
                                "Every trade requires a Stop Loss. If you enter without one, you have consented to losing your entire account.",
                                "Don't predict, React. Amateurs try to catch falling knives and guess the top. Pros wait for the trend to confirm before stepping in."
                            ].map((truth, idx) => (
                                <div key={idx} className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-2xl transition-all">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{truth}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PsychCard = ({ icon: Icon, color, bg, title, description }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${bg} ${color} transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-3 leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">{description}</p>
    </div>
);

const RuleCard = ({ number, title, text }) => (
    <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100 hover:border-gray-200 transition-colors">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black text-gray-200 uppercase tracking-tighter">{number}</span>
            <h4 className="text-lg font-bold text-gray-900 leading-none">{title}</h4>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed font-medium">{text}</p>
    </div>
);

const ProgressBar = ({ label, value }) => (
    <div>
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
            <span>{label}</span>
            <span className="text-white">{value}%</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

export default TradingPsychology;
