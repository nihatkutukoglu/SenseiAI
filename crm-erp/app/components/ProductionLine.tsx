"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Cpu, 
  Feather, 
  Radio, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  Sparkles,
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";

// --- Mock Data ---
const stages = [
  { 
    id: "draft", 
    label: "Ham Fikir", 
    count: 12, 
    capacity: 20,
    icon: Lightbulb, 
    color: "text-amber-400", 
    bg: "bg-amber-400/10", 
    border: "border-amber-400/20" 
  },
  { 
    id: "ai_processing", 
    label: "YZ İşleme", 
    count: 5, 
    capacity: 8,
    icon: Cpu, 
    color: "text-violet-400", 
    bg: "bg-violet-400/10", 
    border: "border-violet-400/20" 
  },
  { 
    id: "review", 
    label: "Son Kontrol", 
    count: 3, 
    capacity: 10,
    icon: Feather, 
    color: "text-pink-400", 
    bg: "bg-pink-400/10", 
    border: "border-pink-400/20" 
  },
  { 
    id: "published", 
    label: "Yayında", 
    count: 156, 
    capacity: null,
    icon: Radio, 
    color: "text-emerald-400", 
    bg: "bg-emerald-400/10", 
    border: "border-emerald-400/20" 
  }
];

const recentActivities = [
    { id: 1, text: "Blog: 'Yapay Zeka Etiği 2025'", time: "2dk önce", status: "Tamamlandı" },
    { id: 2, text: "Tweet Zinciri: 'Neuro-Marketing'", time: "5dk önce", status: "İşleniyor" },
    { id: 3, text: "Makale: 'Dijital Minimalizm'", time: "12dk önce", status: "Taslak" },
];

const ProductionLine = () => {
    // Animation tick for "moving" particles
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mt-6 bg-[#0a192f] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
             />

            {/* Header */}
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-widest uppercase font-mono">İçerik Üretim Hattı</h2>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            HAT AKTİF // KAPASİTE: %85
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4 text-right">
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">1.2s</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Ort. Çıktı Süresi</div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div>
                        <div className="text-2xl font-bold text-emerald-400 font-mono">%99.8</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Kalite Skoru</div>
                    </div>
                </div>
            </div>

            {/* PIPELINE VISUALIZATION */}
            <div className="relative mb-12">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-gradient-to-r from-amber-400 via-violet-500 to-emerald-400 opacity-30"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     />
                </div>

                <div className="grid grid-cols-4 gap-4 relative z-10">
                    {stages.map((stage, i) => (
                        <div key={stage.id} className="flex flex-col items-center">
                            {/* Node */}
                            <div className={`w-16 h-16 rounded-2xl ${stage.bg} ${stage.border} border flex items-center justify-center mb-4 relative group transition-all hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                                <stage.icon className={`w-8 h-8 ${stage.color} transition-transform group-hover:rotate-12`} />
                                
                                {/* Badge count */}
                                <div className="absolute -top-2 -right-2 bg-[#020202] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 shadow-lg">
                                    {stage.count}
                                </div>
                                
                                {/* Active Particle Animation */}
                                {i < stages.length - 1 && (
                                    <motion.div 
                                        className={`absolute top-1/2 -right-1/2 w-4 h-4 rounded-full ${stage.bg} blur-sm`}
                                        animate={{ x: [0, 100], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                                    />
                                )}
                            </div>
                            
                            {/* Label */}
                            <div className="text-center">
                                <h4 className={`text-sm font-bold ${stage.color}`}>{stage.label}</h4>
                                {stage.capacity && (
                                    <div className="mt-1 w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${stage.color.replace('text', 'bg')}`} 
                                            style={{ width: `${(stage.count / stage.capacity) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LOWER DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Items List */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" /> Son Üretimler
                    </h3>
                    <div className="space-y-3">
                        {recentActivities.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                                    <span className="text-sm text-slate-300 font-medium">{item.text}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-500">{item.time}</span>
                                    <span className="text-[10px] font-bold text-emerald-400">{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Efficiency Metric */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="w-24 h-24 text-emerald-500" />
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">Dönüşüm Verimi</h3>
                        <p className="text-xs text-slate-500">Ham fikirden yayına geçiş oranı.</p>
                    </div>

                    <div className="flex items-end gap-2 mt-6">
                        <span className="text-4xl font-bold text-white tracking-tighter">94%</span>
                        <span className="text-sm text-emerald-400 font-bold mb-1 flex items-center">
                            <ArrowRight className="w-4 h-4 rotate-[-45deg]" /> +2.4%
                        </span>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-emerald-300 leading-relaxed">
                                "Sistem, son 1 saatte <strong>156 içerik</strong> işledi. Editör darboğazı %12 azaldı."
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductionLine;
