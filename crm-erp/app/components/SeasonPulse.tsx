"use client";

import React, { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, TrendingUp, TrendingDown, Zap } from "lucide-react";

// --- Mock Data Generator ---
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Verimlilik Puanı (Occupancy yerine)
    const occupancy = Math.floor(Math.random() * (95 - 30 + 1)) + 30;
    
    // Yaratıcı Çıktı (Revenue yerine) - Token/Kelime/Eser sayısı
    const revenue = occupancy * 150 + Math.floor(Math.random() * 2000);

    let comment = "Standart akış.";
    if (occupancy > 85) comment = "Yüksek yaratıcılık modu!";
    if (occupancy < 40) comment = "Düşük verim günü.";
    const day = date.getDay();
    if (day === 0 || day === 6) comment = "Hafta sonu derinleşmesi.";

    data.push({
      date: date.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }),
      fullDate: date.toISOString(),
      occupancy,
      revenue,
      comment,
    });
  }
  return data;
};

// --- Types ---
type DataPoint = {
  date: string;
  fullDate: string;
  occupancy: number;
  revenue: number;
  comment: string;
};

// --- Main Component ---
const SeasonPulse = () => {
  const [data] = useState<DataPoint[]>(generateMockData());
  const [activeMode, setActiveMode] = useState<"Standard" | "Zen" | "Flow">("Standard");

  // --- Calculations for Storytelling ---
  const stats = useMemo(() => {
    if (!data.length) return { trend: "sabit", maxDate: "", avgOccupancy: 0 };

    const firstHalfAvg = data.slice(0, 15).reduce((acc, curr) => acc + curr.occupancy, 0) / 15;
    const secondHalfAvg = data.slice(15).reduce((acc, curr) => acc + curr.occupancy, 0) / 15;
    const trend = secondHalfAvg > firstHalfAvg ? "yükselen bir ivmeyle" : "düşüş eğiliminde";
    const overallAvg = data.reduce((acc, curr) => acc + curr.occupancy, 0) / data.length;

    const maxOccupancyPoint = data.reduce((prev, current) => 
      (prev.occupancy > current.occupancy) ? prev : current
    );

    return { 
      trend, 
      maxDate: maxOccupancyPoint.date, 
      avgOccupancy: overallAvg 
    };
  }, [data]);

  // --- AI Logic ---
  const aiSuggestion = useMemo(() => {
    if (stats.avgOccupancy < 50) {
      return {
        type: "Düşük Odak",
        title: "Odaklanma Desteği Gerekli",
        message: "Hafta içi derin çalışma süreleri kritik seviyenin altında (%50).",
        action: "'Pomodoro Zen' Modunu Öner",
        color: "text-blue-300",
        btnColor: "bg-blue-500 hover:bg-blue-600",
        targetMode: "Zen" as const
      };
    } else {
      return {
        type: "Yüksek Akış",
        title: "Yaratıcılık Zirvede",
        message: "Kullanıcılar 'Flow' durumunda (%75+ verim).",
        action: "Zorluk Seviyesini %15 Artır (Gamification)",
        color: "text-emerald-300",
        btnColor: "bg-emerald-500 hover:bg-emerald-600",
        targetMode: "Flow" as const
      };
    }
  }, [stats.avgOccupancy]);

  const modeStyles = {
    Standard: "border-white/10 bg-[#0F172A]/80",
    Zen: "border-blue-400/50 bg-[#0f172a] shadow-[0_0_40px_rgba(96,165,250,0.2)]",
    Flow: "border-emerald-400/50 bg-[#0f172a] shadow-[0_0_40px_rgba(52,211,153,0.2)]"
  };

  const modeLabels = {
    Standard: null,
    Zen: { icon: Sparkles, text: "ZEN MODU AKTİF", color: "text-blue-400" },
    Flow: { icon: Zap, text: "FLOW MODU AKTİF", color: "text-emerald-400" }
  };

  return (
    <div className="w-full p-6 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-1000 ${modeStyles[activeMode]}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                   <h2 className="text-xl font-bold tracking-tight text-white">Sezon Nabzı</h2>
                   <div className="flex items-center gap-2">
                     <p className="text-sm text-slate-400">30 Günlük Yaratıcılık & Verim Analizi</p>
                     {activeMode !== "Standard" && (
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current ${modeLabels[activeMode]?.color}`}
                        >
                            {modeLabels[activeMode]?.text}
                        </motion.span>
                     )}
                   </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs font-medium">
                     <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                     <span className="text-slate-300">Verim (%)</span>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-medium">
                     <span className="w-3 h-3 rounded-full bg-indigo-500" />
                     <span className="text-slate-300">Üretim Puanı</span>
                 </div>
            </div>
        </div>

        {/* Chart Area */}
        <div className="h-[400px] w-full p-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                {/* Neon Glow Filter */}
                <filter id="neonGlow" height="200%" width="200%" x="-50%" y="-50%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
              </defs>
              <CartesianGrid vertical={true} horizontal={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#34d399" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#34d399' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#818cf8" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1e293b]/90 border border-white/10 p-4 rounded-xl backdrop-blur-md shadow-2xl min-w-[200px]">
                        <p className="text-slate-400 text-xs mb-2">{label}</p>
                        <div className="space-y-2">
                           <div className="flex justify-between items-center text-emerald-400 font-bold">
                               <span>Verim:</span>
                               <span>%{payload[1].value}</span>
                           </div>
                           <div className="flex justify-between items-center text-indigo-400 font-bold">
                               <span>Üretim Puanı:</span>
                               <span>{payload[0].value.toLocaleString()}</span>
                           </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/5 text-xs italic text-slate-300">
                           "{payload[0].payload.comment}"
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="occupancy"
                stroke="#34d399"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: "#34d399" }}
                activeDot={{ r: 8, strokeWidth: 0, fill: "#fff" }}
                style={{ filter: "url(#neonGlow)" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Footer & Storytelling */}
        <div className="bg-white/5 border-t border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg shrink-0">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-1">Sensei Veri Hikayesi</h3>
                    <p className="text-lg text-slate-200 font-light leading-relaxed">
                        Seçilen dönem boyunca yaratıcı verim <strong className="text-white font-medium">{stats.trend}</strong> seyretmiştir. 
                        En yüksek yaratıcı akış <strong className="text-emerald-400">{stats.maxDate}</strong> tarihinde gerçekleşmiştir.
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SeasonPulse;
