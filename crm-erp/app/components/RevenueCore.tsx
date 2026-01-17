"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  CartesianGrid
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Target,
  ShieldCheck,
  X
} from "lucide-react";

// --- Mock Data ---

const channelData = [
  { name: "Product Hunt", value: 45, color: "#8b5cf6" }, // Violet
  { name: "LinkedIn", value: 25, color: "#3b82f6" },     // Blue
  { name: "Twitter / X", value: 20, color: "#06b6d4" },  // Cyan
  { name: "Organic", value: 10, color: "#10b981" }       // Emerald
];

const planData = [
  { name: "Enterprise", value: 40, fill: "#eab308" }, // Yellow
  { name: "Pro Sensei", value: 35, fill: "#8b5cf6" }, // Violet
  { name: "Creator", value: 20, fill: "#3b82f6" },    // Blue
  { name: "Starter", value: 5, fill: "#94a3b8" }      // Slate
];

const mrrData = [
  { month: "Jan", retained: 4000, new: 1500 },
  { month: "Feb", retained: 4200, new: 1800 },
  { month: "Mar", retained: 4500, new: 1200 },
  { month: "Apr", retained: 4800, new: 2200 },
  { month: "May", retained: 5100, new: 2400 },
  { month: "Jun", retained: 5500, new: 3100 },
];

// --- Components ---

const PanelHeader = ({ title, icon: Icon, colorClass, subtitle }: { title: string, icon: any, colorClass: string, subtitle?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
            <div className={`p-2 rounded-lg bg-opacity-20 ${colorClass.replace("text-", "bg-")}`}>
                <Icon className={`w-5 h-5 ${colorClass}`} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-slate-300 uppercase">{title}</h3>
        </div>
        {subtitle && <p className="text-[10px] text-slate-500 ml-12">{subtitle}</p>}
    </div>
);

const AcquisitionFlow = () => {
    const topChannel = channelData.reduce((prev, current) => (prev.value > current.value) ? prev : current);

    return (
        <div className="h-full flex flex-col justify-between">
            <PanelHeader 
                title="Kazanım Akışı" 
                icon={Users} 
                colorClass="text-cyan-400" 
                subtitle="Kullanıcıların hangi kanallardan Sensei'ye katıldığını gösterir."
            />
            
            <div className="space-y-5">
                {channelData.map((channel, index) => (
                    <div key={channel.name} className="relative group">
                        <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
                            <span className="group-hover:text-white transition-colors">{channel.name}</span>
                            <span>%{channel.value}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${channel.value}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full rounded-full relative"
                                style={{ backgroundColor: channel.color }}
                             >
                                {channel.name === topChannel.name && (
                                    <motion.div 
                                        className="absolute inset-0 bg-white opacity-30"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    />
                                )}
                             </motion.div>
                             {/* Glow for top channel */}
                             {channel.name === topChannel.name && (
                                 <div className="absolute inset-0 rounded-full blur-[4px]" style={{ backgroundColor: channel.color, opacity: 0.5 }} />
                             )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-cyan-400 font-bold">İÇGÖRÜ:</span> Trafiğin <span className="text-white">%{topChannel.value}</span>'i <span className="text-white">{topChannel.name}</span> üzerinden akıyor ve en yüksek dönüşüm burada.
            </div>
        </div>
    );
};

const RevenueTiers = () => {
    const totalRevenue = 156.400; // Mock total
    const topPlan = planData[0];

    return (
        <div className="h-full flex flex-col justify-between">
             <PanelHeader 
                title="Üyelik Dağılımı" 
                icon={CreditCard} 
                colorClass="text-purple-400"
                subtitle="Platformdaki aktif kullanıcıların paket tercihlerini analiz eder." 
             />
             
             <div className="flex-1 min-h-[180px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                        cx="50%" 
                        cy="50%" 
                        innerRadius="30%" 
                        outerRadius="100%" 
                        barSize={12} 
                        data={planData}
                        startAngle={180} 
                        endAngle={0}
                    >
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff', fontSize: '10px' }}
                            background={{ fill: '#1e293b' }}
                            dataKey="value"
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 pointer-events-none">
                      <span className="text-xs text-slate-500">Toplam MRR</span>
                      <span className="text-2xl font-bold text-white">$156k</span>
                  </div>
             </div>

             <div className="grid grid-cols-2 gap-2 mt-4">
                 {planData.map((plan) => (
                     <div key={plan.name} className="flex items-center gap-2 text-xs">
                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.fill }}></span>
                         <span className="text-slate-300">{plan.name}</span>
                     </div>
                 ))}
             </div>
             
             <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-purple-400 font-bold">İÇGÖRÜ:</span> <span className="text-white">{topPlan.name}</span> abonelikleri, toplam gelirin lokomotifi (%{topPlan.value}).
            </div>
        </div>
    )
}

const RevenueQuality = () => {
    // Calculate growth of new MRR
    const lastMonth = mrrData[mrrData.length - 1];
    const newMrrPerc = Math.round((lastMonth.new / (lastMonth.new + lastMonth.retained)) * 100);

    return (
        <div className="h-full flex flex-col justify-between">
            <PanelHeader 
                title="Büyüme Kalitesi" 
                icon={TrendingUp} 
                colorClass="text-emerald-400" 
                subtitle="Yeni gelen vs. mevcut kullanıcıların gelir katkısını kıyaslar."
            />

            <div className="flex-1 min-h-[160px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mrrData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorRetained" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '5px' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="new" 
                            stackId="1" 
                            stroke="#06b6d4" 
                            fill="url(#colorNew)" 
                            name="Yeni MRR"
                        />
                         <Area 
                            type="monotone" 
                            dataKey="retained" 
                            stackId="1" 
                            stroke="#d946ef" 
                            fill="url(#colorRetained)" 
                            name="Mevcut"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">İÇGÖRÜ:</span> Büyüme motoru <span className="text-white">%{newMrrPerc}</span> oranında yeni müşteri kaynaklı.
            </div>
        </div>
    )
}

// --- Main Revenue Core Component ---

const RevenueCore = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full relative">
       {/* Section Header */}
       <div className="flex items-end justify-between mb-6 px-2">
           <div>
               <h2 className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-3">
                   <Cpu className="w-6 h-6 text-indigo-500 animate-pulse" />
                   Gelir Çekirdeği
               </h2>
               <p className="text-slate-400 text-xs mt-1">Gerçek Zamanlı Finansal Sinir Ağı</p>
           </div>
           
           <button 
                onClick={() => setModalOpen(true)}
                className="group relative flex items-center gap-2 px-4 py-2 bg-[#0B0F19] border border-indigo-500/30 hover:border-indigo-400 rounded-lg transition-all shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]"
           >
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
               <span className="text-xs font-bold text-indigo-300 group-hover:text-indigo-200">SENSEI STRATEJİST</span>
           </button>
       </div>

       {/* Grid Layout */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Card 1: Acquisition */}
           <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#0B0F19]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
               <AcquisitionFlow />
           </motion.div>

           {/* Card 2: Revenue Tiers */}
           <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0B0F19]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
               <RevenueTiers />
           </motion.div>

           {/* Card 3: Quality */}
           <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0B0F19]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
               <RevenueQuality />
           </motion.div>

       </div>

       {/* SENSEI STRATEGIST MODAL */}
       <AnimatePresence>
            {modalOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setModalOpen(false)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0F172A] border border-indigo-500/30 rounded-2xl shadow-[0_0_50px_rgba(79,70,229,0.2)] max-w-2xl w-full relative overflow-hidden"
                    >
                        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
                        
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                                        <Cpu className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-wide">STRATEJİ ANALİZİ</h3>
                                        <p className="text-indigo-300 text-xs uppercase tracking-widest mt-1">SaaS Metrikleri İşleniyor...</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="space-y-6">
                                {/* Insight Box */}
                                <div className="bg-slate-900/50 p-4 rounded-xl border-l-4 border-yellow-500">
                                    <h4 className="flex items-center gap-2 text-yellow-400 font-bold mb-1">
                                        <Target className="w-4 h-4" /> 
                                        Kritik Tespit
                                    </h4>
                                    <p className="text-slate-300 text-sm">
                                        "Düşük segmentte (<span className="text-white font-semibold">Creator Plan</span>) kullanım düşüyor, churn riski <span className="text-red-400 font-bold">%12</span> arttı."
                                    </p>
                                </div>

                                {/* Action Plan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                                        <h4 className="flex items-center gap-2 text-indigo-300 font-bold mb-2 text-sm">
                                            <ShieldCheck className="w-4 h-4" /> Tutundurma Protokolü
                                        </h4>
                                        <p className="text-slate-400 text-xs mb-3 group-hover:text-slate-200 transition-colors">
                                            Creator paketi için yıllık ödemede %20 indirim teklifi sun.
                                        </p>
                                        <div 
                                            onClick={() => {
                                                setModalOpen(false);
                                                // Could add a toast here in a real app
                                            }}
                                            className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors"
                                        >
                                            Uygula <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-colors group cursor-pointer">
                                        <h4 className="flex items-center gap-2 text-cyan-300 font-bold mb-2 text-sm">
                                            <Zap className="w-4 h-4" /> Büyüme Hilesi
                                        </h4>
                                        <p className="text-slate-400 text-xs mb-3 group-hover:text-slate-200 transition-colors">
                                            Product Hunt kullanıcılarına özel '3 gün sınırsız token' kampanyası.
                                        </p>
                                        <div 
                                            onClick={() => {
                                                setModalOpen(false);
                                            }}
                                            className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors"
                                        >
                                            Başlat <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                             <div className="grid grid-cols-4 gap-1">
                                 {[...Array(16)].map((_, i) => (
                                     <div key={i} className="w-1 h-1 bg-white rounded-full" />
                                 ))}
                             </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
       </AnimatePresence>
    </div>
  );
};

export default RevenueCore;
