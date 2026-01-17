"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Building2,
  Users,
  Activity,
  Briefcase,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Landmark
} from "lucide-react";

// --- Mock Data: EXECUTIVE LEVEL ---

const valuationHistory = [
  { month: 'Q1', value: 1.2, operational: 1.1, projected: 1.3 },
  { month: 'Q2', value: 1.4, operational: 1.3, projected: 1.5 },
  { month: 'Q3', value: 1.8, operational: 1.5, projected: 2.1 },
  { month: 'Q4', value: 2.2, operational: 1.8, projected: 2.5 }, // Current
  { month: 'Q1 (E)', value: 2.8, operational: 2.1, projected: 3.2 },
  { month: 'Q2 (E)', value: 3.5, operational: 2.4, projected: 4.0 },
];

const regionalGrowth = [
  { region: "Kuzey Amerika", share: 35, growth: 12, color: "#8b5cf6" }, // Violet
  { region: "EMEA", share: 45, growth: 18, color: "#06b6d4" }, // Cyan
  { region: "APAC", share: 15, growth: 42, color: "#10b981" }, // Emerald (High growth)
  { region: "LATAM", share: 5, growth: 8, color: "#f59e0b" }, // Amber
];

const financialMetrics = [
  { label: "Aylık Yanma Hızı (Burn Rate)", value: "$450k", status: "safe", trend: "-%5" },
  { label: "Nakit Ömrü (Runway)", value: "18 Ay", status: "safe", trend: "Stabil" },
  { label: "ARPU (Kullanıcı Başı Gelir)", value: "$1.24", status: "warning", trend: "+%2" },
  { label: "CAC (Müşteri Edinme Maliyeti)", value: "$0.45", status: "good", trend: "-%12" },
];

const reputationData = [
  { subject: 'Yatırımcı Güveni', A: 95, fullMark: 100 },
  { subject: 'Medya Algısı', A: 70, fullMark: 100 },
  { subject: 'Regülasyon Uyumu', A: 85, fullMark: 100 },
  { subject: 'Kullanıcı Sadakati', A: 90, fullMark: 100 },
  { subject: 'Yetenek Çekimi', A: 80, fullMark: 100 },
];

// --- Components ---

const MetricCard = ({ label, value, trend, status, icon: Icon }: any) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-lg ${status === 'good' || status === 'safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded full ${trend.startsWith('-') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-300'}`}>
                {trend}
            </span>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{label}</p>
        </div>
    </div>
);

const ValuationSimulator = () => {
    return (
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl col-span-1 lg:col-span-2">
            <div className="flex justify-between items-start mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-white font-[Rajdhani] uppercase tracking-wider flex items-center gap-2">
                       <Landmark className="w-6 h-6 text-violet-400" />
                       Gelecek Değer Projeksiyonu
                   </h2>
                   <p className="text-sm text-slate-500 mt-1">Seri B Turu Projeksiyonu & Mevcut MRR Çarpanı</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-white font-mono">$2.2B</div>
                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +%22.4 YoY
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valuationHistory}>
                        <defs>
                            <linearGradient id="valGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                            itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                        />
                        <Area type="monotone" dataKey="projected" stroke="#8b5cf6" strokeWidth={2} fill="url(#valGradient)" strokeDasharray="5 5" name="Projeksiyon (Bull Case)" />
                        <Area type="monotone" dataKey="value" stroke="#fff" strokeWidth={3} fillOpacity={0} name="Gerçekleşen Değer" />
                        <Area type="monotone" dataKey="operational" stroke="#10b981" strokeWidth={2} fillOpacity={0} name="Operasyonel Taban" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-violet-900/10 border border-violet-500/20 p-4 rounded-xl">
                    <div className="text-xs text-violet-300 uppercase tracking-wider mb-1">Hedef Seri C</div>
                    <div className="text-lg font-bold text-white">$4.5 Milyar</div>
                </div>
                <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl">
                    <div className="text-xs text-emerald-300 uppercase tracking-wider mb-1">Mevcut Çarpan</div>
                    <div className="text-lg font-bold text-white">18x ARR</div>
                </div>
                <div className="bg-slate-800/20 border border-white/5 p-4 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Sektör Ort.</div>
                    <div className="text-lg font-bold text-white">12x ARR</div>
                </div>
            </div>
        </div>
    )
}

const GlobalSnapshot = () => {
    return (
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 relative flex flex-col h-full col-span-1">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-[Rajdhani] uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Küresel Penetrasyon
                </h2>
             </div>

             <div className="flex-1 flex flex-col gap-4">
                 <div className="h-[200px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={regionalGrowth}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="share"
                            >
                                {regionalGrowth.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <RechartsTooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }} />
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                         <span className="text-3xl font-bold text-white">45M</span>
                         <span className="text-[10px] text-slate-500 uppercase">Aktif Kullanıcı</span>
                     </div>
                 </div>

                 <div className="space-y-3">
                     {regionalGrowth.map(region => (
                         <div key={region.region} className="flex items-center justify-between group cursor-default">
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                                 <span className="text-sm text-slate-300 font-medium">{region.region}</span>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                     <div className="h-full rounded-full" style={{ width: `${region.share}%`, backgroundColor: region.color }} />
                                 </div>
                                 <span className="text-xs text-emerald-400 font-mono w-8 text-right">+{region.growth}%</span>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    )
}

const SuperDashboard = () => {
  return (
    <div className="w-full p-4 md:p-8 space-y-8 bg-[#020202] min-h-screen font-sans text-slate-200">
        
       {/* Top Header Area */}
       <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 border-b border-white/5 pb-6">
           <div>
               <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 font-[Rajdhani] uppercase tracking-tighter">
                   YÖNETİM KURULU KOKPİTİ
               </h1>
               <p className="text-slate-500 font-mono text-xs mt-2 tracking-widest flex items-center gap-2">
                   <Briefcase className="w-3 h-3 text-emerald-500" />
                   SENSEI INC. // Q3 FY2025 // YATIRIMCI İLİŞKİLERİ MODU
               </p>
           </div>
           
           <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Piyasalar Açık
               </div>
           </div>
       </header>

       {/* Module 1: Finance Ticker */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {financialMetrics.map((m, i) => (
               <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} status={m.status} icon={DollarSign} />
           ))}
       </div>

       {/* Module 2: Valuation & Global Reach */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <ValuationSimulator />
           <GlobalSnapshot />
       </div>

       {/* Module 3: Strategic Risk Matrix */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 lg:col-span-1">
                 <h2 className="text-lg font-bold text-white font-[Rajdhani] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                    İtibar & Risk Matrisi
                </h2>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={reputationData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Sensei"
                                dataKey="A"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="#10b981"
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-400">
                    <strong className="text-white block mb-1">Kurul Özeti:</strong>
                    "Medya algısı ılımlı seyrediyor, ancak regülasyon uyumu (GDPR/KVKK) konusunda hukuk ekibinin bütçe artışı talebi var. Yatırımcı güveni tarihi zirvede."
                </div>
            </div>

            <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 lg:col-span-2 flex flex-col justify-between">
                <div>
                     <h2 className="text-lg font-bold text-white font-[Rajdhani] uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-slate-400" />
                        Finansal Projeksiyon & Sürdürülebilirlik
                    </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-slate-500 text-xs mb-1">EBITDA Marjı</div>
                            <div className="text-2xl font-bold text-white">%12.4</div>
                            <div className="text-emerald-400 text-xs mt-1">+2.1 bps</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-slate-500 text-xs mb-1">Brüt Kar Marjı</div>
                            <div className="text-2xl font-bold text-white">%78.2</div>
                            <div className="text-slate-400 text-xs mt-1">Yazılım sektörü ort. üstü</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                             <div className="text-slate-500 text-xs mb-1">Yıllık Tekrar Gelir (ARR)</div>
                            <div className="text-2xl font-bold text-white">$45.2M</div>
                            <div className="text-emerald-400 text-xs mt-1">Hedef: $50M</div>
                        </div>
                     </div>
                </div>

                <div className="flex items-center gap-4 p-4 border-t border-white/5 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-white">Yıllık Genel Kurul Toplantısı</div>
                        <div className="text-xs text-slate-500">24 Eylül 2025 • Londra Merkez Ofis</div>
                    </div>
                    <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded hover:bg-slate-200 transition-colors">
                        Gündemi İndir
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
};

export default SuperDashboard;
