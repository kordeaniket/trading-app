import React, { useState } from 'react';
import { Smartphone, Lock, ArrowRight, ShieldCheck, Zap, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

export default function Login({ onLogin }) {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (mobile === '8806689125' && password === 'password') {
                onLogin();
            } else {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full -mr-64 -mt-64 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full -ml-64 -mb-64 blur-[120px] animate-pulse delay-700"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-top duration-700">
                    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-4 rounded-[2rem] shadow-2xl shadow-indigo-500/20 mb-6">
                        <TrendingUp className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">BREAKOUT</h1>
                    <div className="flex items-center gap-2">
                        <span className="h-[1px] w-8 bg-indigo-500/50"></span>
                        <p className="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase">Pro Trading Terminal</p>
                        <span className="h-[1px] w-8 bg-indigo-500/50"></span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-[#121216] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-3xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-sm text-gray-400">Enter your credentials to access the scanner</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Smartphone className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold"
                                    placeholder="8806689125"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-bold"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <span className="tracking-widest uppercase text-sm">Authorize Access</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-8 border-t border-white/5 pt-8 opacity-40">
                        <div className="flex flex-col items-center gap-1">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" />
                            <span className="text-[8px] font-black uppercase text-gray-400">Encrypted</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <span className="text-[8px] font-black uppercase text-gray-400">High Speed</span>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-8 text-gray-600 text-xs font-bold uppercase tracking-widest">
                    Authorized Personnel Only
                </p>
            </div>

            {/* Design Footer for Premium Feel */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20">
                <span className="text-[10px] font-black text-white">SYSTEM v4.2</span>
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <span className="text-[10px] font-black text-white px-2 py-0.5 rounded border border-white italic">PRO</span>
            </div>
        </div>
    );
}
