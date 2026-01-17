"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Zap,
  CheckCircle,
  Edit3,
  Edit,
  Instagram,
  Linkedin,
  Twitter,
  Video,
  Atom,
  Settings,
  ArrowRight,
  Database,
  Wifi,
  X
} from "lucide-react";

// --- Mock Data ---

const platformStats = [
  { name: "Instagram", value: 40, color: "#E1306C", icon: Instagram },
  { name: "LinkedIn", value: 30, color: "#0A66C2", icon: Linkedin },
  { name: "Twitter / X", value: 20, color: "#1DA1F2", icon: Twitter },
  { name: "TikTok", value: 10, color: "#69C9D0", icon: Video }
];

const successData = [
  { name: "Direct Approval", value: 65, color: "#10b981" }, // Neon Green
  { name: "Minor Edit", value: 25, color: "#facc15" },    // Neon Yellow
  { name: "Heavy Edit", value: 10, color: "#ef4444" }     // Neon Red
];

// --- Components ---

const PanelHeader = ({ title, icon: Icon, colorClass }: { title: string, icon: any, colorClass: string }) => (
    <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-2">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">{title}</h3>
    </div>
);

// 1. Ecosystem Flow
const EcosystemFlow = () => {
    return (
        <div className="h-full flex flex-col">
            <PanelHeader title="Ekosistem Dağılımı" icon={Wifi} colorClass="text-pink-500" />
            <p className="text-[10px] text-slate-500 mb-4 h-8">
                Yapay zeka kaynaklarının hangi sosyal medya kanallarına harcandığını gösterir.
            </p>
            <div className="flex-1 flex gap-4">
                {/* brain node */}
                <div className="w-12 flex flex-col items-center justify-center relative">
                    <div className="w-1 m-auto h-full bg-gradient-to-b from-transparent via-pink-500/20 to-transparent absolute" />
                    <div className="relative z-10 w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <Cpu className="w-5 h-5 text-pink-400 animate-pulse" />
                    </div>
                </div>

                {/* Platforms */}
                <div className="flex-1 space-y-3 py-2">
                    {platformStats.map((platform, i) => (
                        <div key={platform.name} className="relative group">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                                <span className="flex items-center gap-1 group-hover:text-pink-300 transition-colors">
                                    <platform.icon className="w-3 h-3" /> {platform.name}
                                </span>
                                <span>{platform.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${platform.value}%` }}
                                    transition={{ duration: 1.2, delay: i * 0.1 }}
                                    className="h-full rounded-full relative"
                                    style={{ backgroundColor: platform.color }}
                                >
                                    <motion.div 
                                        className="absolute inset-0 bg-white/50"
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.2 }}
                                    />
                                </motion.div>
                            </div>
                            {/* Connection Line Visual (Optional Beam) */}
                            <svg className="absolute top-1/2 left-[-2rem] w-8 h-[2px] pointer-events-none opacity-20 hidden md:block">
                                <line x1="0" y1="0" x2="100%" y2="0" stroke={platform.color} strokeWidth="2" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
             <div className="mt-2 text-[10px] text-slate-500 font-mono">
                <span className="text-pink-500">{">>"}</span> Yapay zeka eforunun <span className="text-white">40%</span>'i Instagram düğümlerini besliyor.
            </div>
        </div>
    );
};

// 2. Token Reactor
const TokenReactor = () => {
    // Counter Animation
    const [count, setCount] = useState(0);
    const target = 850420;

    useEffect(() => {
        const controls = setInterval(() => {
            setCount(prev => {
                if(prev >= target) {
                    clearInterval(controls);
                    return target;
                }
                return prev + 12345;
            });
        }, 50);
        return () => clearInterval(controls);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <PanelHeader title="YZ İşlem Hacmi (Token)" icon={Zap} colorClass="text-cyan-400" />
            <p className="text-[10px] text-slate-500 mb-4 h-8 text-center">
                Anlık tüketilen işlem gücü ve içerik üretim kapasitesi.
            </p>
            
            <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Reactor Core Visual */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Outer Rotating Ring */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/20"
                    />
                     {/* Counter Rotation Ring */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-cyan-500/10"
                    />
                    
                    {/* Usage Arc (SVG) */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                         <circle
                            cx="80"
                            cy="80"
                            r="36"
                            stroke="#1f2937"
                            strokeWidth="6"
                            fill="none"
                         />
                         <motion.circle
                            initial={{ strokeDashoffset: 226 }}
                            animate={{ strokeDashoffset: 226 - (226 * 0.75) }} // 75% filled
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="80"
                            cy="80"
                            r="36"
                            stroke="#06b6d4"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="226"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                         />
                    </svg>

                    {/* Central Data */}
                    <div className="text-center z-10">
                        <div className="text-[10px] text-cyan-500/70 font-mono tracking-wider mb-1">TOKENS</div>
                        <div className="text-xl font-bold text-white font-mono tabular-nums">
                            {(count / 1000).toFixed(1)}k
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2 text-[10px] text-slate-500 font-mono text-center">
                <span className="text-cyan-500">{">>"}</span> Sistem dakikada ortalama <span className="text-white">~1.2k</span> token işliyor.
            </div>
        </div>
    );
};

// 3. Success Rate
const SuccessRateAnalysis = () => {
    return (
        <div className="h-full flex flex-col">
            <PanelHeader title="Otonom Başarı Oranı" icon={Database} colorClass="text-violet-500" />
            <p className="text-[10px] text-slate-500 mb-4 h-8 text-right">
                İnsan müdahalesi olmadan yayınlanan içeriklerin oranı.
            </p>
            
            <div className="flex-1 flex flex-col justify-center space-y-4 pr-2">
                 {successData.map((stat, i) => (
                     <div key={stat.name} className="flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>{stat.name}</span>
                                <span style={{ color: stat.color }}>{stat.value}%</span>
                          </div>
                          <div className="h-4 bg-slate-800/30 rounded-sm overflow-hidden border border-white/5 relative">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                    className="h-full relative"
                                    style={{ backgroundColor: stat.color }}
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                </motion.div>
                                {/* Grid lines inside bar for "tech" feel */}
                                <div className="absolute inset-0 flex">
                                    {[...Array(10)].map((_, j) => (
                                        <div key={j} className="flex-1 border-r border-black/20 h-full" />
                                    ))}
                                </div>
                          </div>
                     </div>
                 ))}
            </div>

             <div className="mt-2 text-[10px] text-slate-500 font-mono">
                <span className="text-violet-500">{">>>"}</span> İçeriklerin <span className="text-white">%65</span>'i Zero-Touch (insansız) yayınlandı.
            </div>
        </div>
    );
};

// --- Main Ecosystem Component ---

const NeuralPulse = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full relative mt-8 mb-12">
       {/* Background Grid Mesh */}
       <div className="absolute inset-0 bg-[#050505] rounded-3xl -z-10 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10" 
                 style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
       </div>

       <div className="p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-pink-500 blur-sm opacity-50 animate-pulse" />
                        <ActivityIcon className="relative w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-[0.2em] font-mono uppercase">Sistem Nabzı</h2>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            SİSTEM ÇEVRİMİÇİ // GECİKME: 12ms
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => setModalOpen(true)}
                  className="group relative flex items-center gap-3 px-5 py-2.5 bg-[#050505] border border-violet-500/30 hover:border-violet-500/80 rounded-none transition-all"
                >
                    <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors" />
                    {/* Corners */}
                    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-violet-500" />
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-violet-500" />
                    <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-violet-500" />
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-violet-500" />
                    
                    <Atom className="w-5 h-5 text-violet-400 animate-[spin_4s_linear_infinite]" />
                    <span className="text-xs font-bold text-violet-300 font-mono tracking-wider group-hover:text-white transition-colors">SENSEI OPTIMIZER</span>
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:border-r border-white/5 lg:pr-8">
                     <EcosystemFlow />
                 </div>
                 <div className="lg:border-r border-white/5 lg:px-8">
                     <TokenReactor />
                 </div>
                 <div className="lg:pl-8">
                     <SuccessRateAnalysis />
                 </div>
            </div>
       </div>

       {/* SENSEI OPTIMIZER MODAL */}
       <AnimatePresence>
            {modalOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono"
                    onClick={() => setModalOpen(false)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0a0a0a] border border-violet-500/30 w-full max-w-2xl relative shadow-[0_0_100px_rgba(139,92,246,0.1)]"
                    >
                        {/* Matrix Rain Decoration (Simplified) */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500" />
                        
                        <div className="p-8">
                             <div className="flex justify-between items-start mb-8">
                                 <div>
                                     <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                         <Atom className="w-6 h-6 text-violet-500" /> 
                                         Optimizasyon Çekirdeği
                                     </h3>
                                     <p className="text-slate-500 text-xs mt-1">Ekosistem verimlilik taraması yapılıyor...</p>
                                 </div>
                                 <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                             </div>

                             <div className="grid gap-6">
                                 {/* Diagnosis */}
                                 <div className="bg-slate-900/50 p-5 border-l-2 border-pink-500">
                                     <div className="flex items-center gap-2 text-pink-500 text-xs font-bold uppercase tracking-wider mb-2">
                                         <Settings className="w-3 h-3" /> Anomali Tespit Edildi
                                     </div>
                                     <p className="text-slate-300 text-sm">
                                         "Görsel modellerinde revizyon oranı <strong className="text-white">%40</strong>. Kullanıcılar mevcut Instagram stillerini beğenmiyor; ancak metin modelleri stabil."
                                     </p>
                                 </div>

                                 {/* Actions */}
                                 <div className="grid md:grid-cols-2 gap-4">
                                     <button className="flex flex-col gap-2 p-4 bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-900/30 hover:border-cyan-500/50 transition-all text-left group">
                                         <span className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                                             <Edit3 className="w-3 h-3" /> Acil Aksiyon
                                         </span>
                                         <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                                            Instagram için 'Minimalist' görsel modelini varsayılan yap.
                                         </span>
                                     </button>

                                     <button className="flex flex-col gap-2 p-4 bg-violet-950/20 border border-violet-500/20 hover:bg-violet-900/30 hover:border-violet-500/50 transition-all text-left group">
                                         <span className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase">
                                             <Zap className="w-3 h-3" /> Fırsat Önerisi
                                         </span>
                                         <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                                            LinkedIn performansı mükemmel. 'LinkedIn Ghostwriter' eklentisini teklif et.
                                         </span>
                                     </button>
                                 </div>
                             </div>

                             <div className="mt-8 flex justify-end">
                                 <button className="px-6 py-2 bg-white text-black font-bold text-xs hover:bg-slate-200 transition-colors uppercase tracking-widest flex items-center gap-2">
                                     Otomatik Optimize Et <ArrowRight className="w-3 h-3" />
                                 </button>
                             </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
       </AnimatePresence>
    </div>
  );
};

const ActivityIcon = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
)

export default NeuralPulse;
