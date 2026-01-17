"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Line,
  Bar
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Target, 
  Zap, 
  TrendingUp, 
  RefreshCcw, 
  Layers, 
  ShieldCheck,
  Globe,
  Smartphone,
  Video,
  Type,
  PieChart,
  DollarSign,
  Users,
  Briefcase,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Calculator
} from "lucide-react";

// --- Types ---
type StrategyMode = "awareness" | "conversion" | "community" | "viral";

interface SimulationState {
  budget: number; // 10k - 500k
  mode: StrategyMode;
  riskTolerance: number; // 1-10
}

const initialData = Array.from({ length: 12 }, (_, i) => ({
  month: `Ay ${i + 1}`,
  organic: 1000 + (i * 50) + (Math.random() * 20),
  conservative: 0,
  aggressive: 0,
  optimized: 0,
  revenue: 0
}));

const StrategicSimulator = () => {
    // --- State ---
    const [config, setConfig] = useState<SimulationState>({
        budget: 50, // $50k
        riskTolerance: 5,
        mode: "awareness"
    });

    const [data, setData] = useState(initialData);
    const [isCalculating, setIsCalculating] = useState(false);
    const [metrics, setMetrics] = useState({
        cac: 12.5, // Customer Acquisition Cost
        ltv: 450, // Lifetime Value
        roi: 240, // Return on Investment %
        marketShare: 3.2 // %
    });

    // --- Channel Logic (Coefficients) ---
    const channelSpecs = {
        instagram: { growth: 1.4, volatility: 0.3, cost: 1.2 },
        linkedin: { growth: 1.1, volatility: 0.1, cost: 2.5 }, // Expensive, stable, low growth
        twitter: { growth: 1.2, volatility: 0.4, cost: 0.8 },
        tiktok: { growth: 2.2, volatility: 0.9, cost: 1.0 } // High risk high reward
    };

    // --- Simulation Engine ---
    useEffect(() => {
        setIsCalculating(true);
        
        const timer = setTimeout(() => {
            // 1. Calculate Factors based on Strategy Mode
            // Each mode has a hidden "mix" flavor that affects the curve
            const modeSpecs = {
                awareness: { growth: 1.5, volatility: 0.2, cost: 0.8 }, // Cheap, high growth, low risk
                conversion: { growth: 1.1, volatility: 0.1, cost: 1.8 }, // Expensive, stable, revenue focus
                community: { growth: 1.2, volatility: 0.05, cost: 1.2 }, // Very stable, builds LTV
                viral: { growth: 2.5, volatility: 0.8, cost: 1.0 } // Wildcard
            };
            
            const spec = modeSpecs[config.mode];
            
            const totalGrowthFactor = spec.growth;
            const totalVolatility = spec.volatility;
            const weightedCost = spec.cost;

            // 2. Modifiers
            const budgetImpact = Math.log(config.budget + 10) / 2; // Logarithmic scale for budget
            const riskMultiplier = 1 + (config.riskTolerance / 20); // 1.05 - 1.5

            // 3. Generate Projections
            const newData = initialData.map((point, i) => {
                const timeDecay = Math.log(i + 2); // Growth slows over time naturally
                
                // Base calculation
                let projected = point.organic * budgetImpact * totalGrowthFactor * timeDecay;
                
                // Apply Risk/Volatility (Random Noise)
                const noise = (Math.random() - 0.5) * (totalVolatility * 1000) * riskMultiplier;
                
                // Scenarios
                const conservative = projected * 0.85;
                const aggressive = projected * 1.2 + Math.abs(noise * 2);
                const optimized = projected * 1.1 + (i * 200 * totalGrowthFactor); // AI optimization adds compounding interest

                // Revenue calculation (Mock)
                const rev = optimized * 0.15; // 15% conversion to revenue value

                return {
                    ...point,
                    conservative: Math.floor(conservative),
                    aggressive: Math.floor(aggressive),
                    optimized: Math.floor(optimized),
                    revenue: Math.floor(rev)
                };
            });

            setData(newData);

            // 4. Update Key Metrics
            setMetrics({
                cac: parseFloat((weightedCost * 15 / (budgetImpact)).toFixed(2)),
                ltv: Math.floor(450 * (config.mode === 'community' ? 1.5 : config.mode === 'conversion' ? 1.2 : 1.0)),
                roi: Math.floor(((newData[11].revenue * 12) - (config.budget * 12000)) / (config.budget * 100)), // Mock ROI
                marketShare: parseFloat((3.2 + (newData[11].optimized / 20000)).toFixed(2))
            });

            setIsCalculating(false);
        }, 600); // Cinematic delay

        return () => clearTimeout(timer);
    }, [config]);



    return (
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 z-10 relative gap-4">
                <div>
                   <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white font-[Rajdhani] uppercase tracking-wider">
                            Profesyonel Öngörü
                        </h2>
                   </div>
                   <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pl-12">
                       <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> ONLINE</span>
                       <span className="flex items-center gap-1"><Calculator className="w-3 h-3" /> MONTE CARLO MOTORU EŞLENDİ</span>
                   </div>
                </div>

                <div className="flex gap-2">
                     <div className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg">
                         <div className="text-[10px] text-slate-500 uppercase tracking-wider">Toplam Bütçe</div>
                         <div className="text-lg font-bold text-white font-mono">${config.budget}k</div>
                     </div>
                     <div className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg">
                         <div className="text-[10px] text-slate-500 uppercase tracking-wider">Tahmini ROI</div>
                         <div className={`text-lg font-bold font-mono ${metrics.roi > 0 ? "text-emerald-400" : "text-red-400"}`}>
                             %{metrics.roi}
                         </div>
                     </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 z-10 relative">
                
                {/* LEFT: Controls (The Cockpit) */}
                <div className="w-full lg:w-[320px] flex flex-col gap-6 bg-[#0f172a]/50 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    
                    {/* Module: Channel Mix */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-cyan-400" /> Stratejik Odak
                        </h3>
                        <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
                            Simülasyonun ana taktiğini belirleyin.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                             {[
                                 { id: 'awareness', label: 'Bilinirlik', desc: 'Markayı duyur, kitleyi genişlet.', icon: Globe, color: 'text-blue-400' },
                                 { id: 'conversion', label: 'Dönüşüm', desc: 'Satış odaklı, gelire oyna.', icon: DollarSign, color: 'text-emerald-400' },
                                 { id: 'community', label: 'Topluluk', desc: 'Sadık kitle oluştur, LTV artır.', icon: Users, color: 'text-violet-400' },
                                 { id: 'viral', label: 'Viral', desc: 'Risk al, patlama yap.', icon: Zap, color: 'text-pink-400' },
                             ].map((m) => (
                                 <button
                                    key={m.id}
                                    onClick={() => setConfig(prev => ({ ...prev, mode: m.id as any }))}
                                    className={`p-3 rounded-lg border text-left transition-all ${
                                        config.mode === m.id 
                                        ? "bg-white/10 border-white/30 shadow-lg" 
                                        : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10 text-slate-500"
                                    }`}
                                 >
                                     <m.icon className={`w-4 h-4 mb-2 ${config.mode === m.id ? m.color : "text-slate-600"}`} />
                                     <div>
                                         <span className={`block text-xs font-bold uppercase ${config.mode === m.id ? "text-white" : ""}`}>
                                             {m.label}
                                         </span>
                                         <span className="text-[9px] block mt-1 opacity-70 leading-tight">
                                             {m.desc}
                                         </span>
                                     </div>
                                 </button>
                             ))}
                        </div>
                    </div>

                    {/* Module: Global Parameters */}
                    <div>
                         <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/5 pb-2 mt-4">
                            <Activity className="w-4 h-4 text-amber-400" /> Global Parametreler
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Bütçe Çarpanı</span>
                                    <span className="text-white font-mono">${config.budget}k</span>
                                </div>
                                <input 
                                    type="range" min="10" max="250" 
                                    value={config.budget}
                                    onChange={(e) => setConfig(prev => ({ ...prev, budget: Number(e.target.value) }))}
                                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <div className="flex flex-col">
                                        <span>Risk Toleransı</span>
                                        <span className="text-[9px] text-slate-600 mt-0.5 max-w-[150px] leading-tight">
                                           Agresif büyüme için belirsizlik limitiniz. Yüksek risk = Yüksek kazanç potansiyeli.
                                        </span>
                                    </div>
                                    <span className={`font-bold ${config.riskTolerance > 7 ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {config.riskTolerance}/10
                                    </span>
                                </div>
                                <div className="flex gap-1 h-3">
                                     {[...Array(10)].map((_, i) => (
                                         <div 
                                            key={i} 
                                            onClick={() => setConfig(prev => ({ ...prev, riskTolerance: i + 1 }))}
                                            className={`flex-1 rounded-sm cursor-pointer transition-all ${
                                                i < config.riskTolerance 
                                                    ? (config.riskTolerance > 7 ? 'bg-red-500' : 'bg-emerald-500') 
                                                    : 'bg-slate-800 hover:bg-slate-700'
                                            }`}
                                         />
                                     ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CENTER: The Big Chart */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Chart Container */}
                    <div className="flex-1 min-h-[400px] bg-white/5 rounded-2xl border border-white/10 p-6 relative group">
                        {isCalculating && (
                            <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                                <div className="flex flex-col items-center gap-2">
                                    <RefreshCcw className="w-8 h-8 text-cyan-400 animate-spin" />
                                    <span className="text-xs font-mono text-cyan-300">SİMÜLASYON YENİLENİYOR...</span>
                                </div>
                            </div>
                        )}
                        
                        {/* Dynamic Header on top of Chart */}
                        <div className="absolute top-6 left-6 z-10 flex gap-6">
                             <div className="group/metric relative cursor-help">
                                 <div className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-dashed border-slate-700 inline-block">
                                     En İyi Senaryo
                                 </div>
                                 <div className="text-xl font-bold text-cyan-400 font-mono">
                                     {new Intl.NumberFormat('tr-TR', { notation: "compact", compactDisplay: "short" }).format(data[11].optimized)}
                                     <span className="text-xs align-top text-cyan-600 ml-1">hedef</span>
                                 </div>
                                 
                                 {/* Tooltip */}
                                 <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 p-2 rounded-lg text-[9px] text-slate-400 opacity-0 group-hover/metric:opacity-100 transition-opacity pointer-events-none">
                                     Mevcut stratejiyle yıl sonunda ulaşılması muhtemel maksimize edilmiş değer.
                                 </div>
                             </div>
                             <div className="group/metric relative cursor-help">
                                 <div className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-dashed border-slate-700 inline-block">
                                     Pazar Payı
                                 </div>
                                 <div className="text-xl font-bold text-white font-mono">
                                     %{metrics.marketShare}
                                 </div>
                                  {/* Tooltip */}
                                 <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 p-2 rounded-lg text-[9px] text-slate-400 opacity-0 group-hover/metric:opacity-100 transition-opacity pointer-events-none">
                                     Sektördeki toplam dijital hacimden aldığınız tahmini pay.
                                 </div>
                             </div>
                        </div>

                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 60, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                    </linearGradient>
                                     <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f472b6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis hide />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '12px', fontFamily: 'monospace', padding: '2px 0' }}
                                    formatter={(value: number) => [new Intl.NumberFormat('en-US').format(value), '']}
                                />
                                {/* Conservative Baseline */}
                                <Area 
                                    type="monotone" 
                                    dataKey="conservative" 
                                    stroke="#ec4899" 
                                    strokeWidth={1} 
                                    strokeDasharray="5 5" 
                                    fill="url(#colorAggressive)" 
                                    name="Agresif Aralık"
                                />
                                {/* Main Optimized Line */}
                                <Area 
                                    type="monotone" 
                                    dataKey="optimized" 
                                    stroke="#22d3ee" 
                                    strokeWidth={3} 
                                    fill="url(#colorOptimized)" 
                                    name="YZ Tahmini"
                                    animationDuration={1000}
                                />
                                {/* Revenue Points (Scatter-like effect using composed chart if needed, but Area is cleaner here) */}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bottom: KPI Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                             <div className="p-2 bg-pink-500/10 rounded-lg">
                                 <Users className="w-5 h-5 text-pink-400" />
                             </div>
                             <div>
                                 <div className="text-[10px] text-slate-500 uppercase">Tahmini CAC</div>
                                 <div className="text-lg font-bold text-white font-mono">${metrics.cac}</div>
                             </div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                             <div className="p-2 bg-blue-500/10 rounded-lg">
                                 <DollarSign className="w-5 h-5 text-blue-400" />
                             </div>
                             <div>
                                 <div className="text-[10px] text-slate-500 uppercase">LTV Beklentisi</div>
                                 <div className="text-lg font-bold text-white font-mono">${metrics.ltv}</div>
                             </div>
                        </div>
                         <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors group">
                             <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20">
                                 <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                             </div>
                             <div>
                                 <div className="text-[10px] text-slate-500 uppercase">Rapor Oluştur</div>
                                 <div className="text-xs font-bold text-emerald-400">PDF İndir</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategicSimulator;
