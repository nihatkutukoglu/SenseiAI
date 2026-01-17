"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  FileText,
  PieChart,
  Calendar,
  Download,
  Filter,
  Receipt,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Activity,
  AlertCircle
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

// Morphing Number Component
const MorphingNumber = ({ value, prefix = "", suffix = "" }: { value: number | string, prefix?: string, suffix?: string }) => {
  return (
    <motion.div
      key={`${value}`}
      initial={{ opacity: 0, y: 10, filter: "blur(5px)", scale: 0.95 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -10, filter: "blur(5px)", scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="inline-block"
    >
      {prefix}{value}{suffix}
    </motion.div>
  );
};

// Glitch Text Component
const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block ${className} group`}>
      <span className="relative z-10">{text}</span>
      <motion.span 
        className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-yellow-400 opacity-0 group-hover:opacity-70"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
      >
        {text}
      </motion.span>
      <motion.span 
        className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-green-400 opacity-0 group-hover:opacity-70"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.15 }}
      >
        {text}
      </motion.span>
    </div>
  );
};

// Background Particles
const BackgroundParticles = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-yellow-400/30 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FinanceModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "quarter" | "year">("month");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [realTimeValues, setRealTimeValues] = useState({
    revenue: 2400000,
    expenses: 1500000,
    profit: 900000,
    pending: 450000
  });

  // Real-time value simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeValues(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 500),
        expenses: prev.expenses + Math.floor(Math.random() * 500 - 250),
        profit: prev.profit + Math.floor(Math.random() * 750 - 375),
        pending: prev.pending + Math.floor(Math.random() * 300 - 150),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  const revenueData = [
    { month: "Oca", gelir: 180000, gider: 120000, kar: 60000 },
    { month: "Şub", gelir: 195000, gider: 125000, kar: 70000 },
    { month: "Mar", gelir: 210000, gider: 135000, kar: 75000 },
    { month: "Nis", gelir: 220000, gider: 140000, kar: 80000 },
    { month: "May", gelir: 235000, gider: 145000, kar: 90000 },
    { month: "Haz", gelir: 240000, gider: 150000, kar: 90000 },
  ];

  const expenseDistribution = [
    { name: "Personel", value: 45, amount: 67500 },
    { name: "Üretim", value: 25, amount: 37500 },
    { name: "Pazarlama", value: 15, amount: 22500 },
    { name: "Operasyon", value: 10, amount: 15000 },
    { name: "Diğer", value: 5, amount: 7500 },
  ];

  const recentTransactions = [
    { id: "INV-2024-1245", type: "Gelir", amount: 45000, status: "Ödendi", date: "15 Ara 2024", client: "ABC Corp" },
    { id: "EXP-2024-0892", type: "Gider", amount: -12500, status: "Ödendi", date: "14 Ara 2024", client: "Tedarikçi A" },
    { id: "INV-2024-1244", type: "Gelir", amount: 32000, status: "Beklemede", date: "13 Ara 2024", client: "XYZ Ltd" },
    { id: "EXP-2024-0891", type: "Gider", amount: -8900, status: "Ödendi", date: "12 Ara 2024", client: "Kira Ödemesi" },
    { id: "INV-2024-1243", type: "Gelir", amount: 28000, status: "Ödendi", date: "11 Ara 2024", client: "DEF Inc" },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-6 relative">
      {/* Background Effects */}
      <BackgroundParticles />
      
      {/* Header with Period Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <GlitchText text="Finans & Muhasebe" className="text-white" />
          </h2>
          <motion.p 
            className="text-slate-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Mali durum ve finansal raporlar
          </motion.p>
        </div>
        
        <div className="flex gap-2">
          {(["month", "quarter", "year"] as const).map((period) => (
            <motion.button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden ${
                selectedPeriod === period
                  ? "bg-yellow-500 text-black"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {selectedPeriod === period && (
                <motion.div
                  layoutId="periodSelector"
                  className="absolute inset-0 bg-yellow-500"
                  style={{ borderRadius: 8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                {period === "month" ? "Aylık" : period === "quarter" ? "Çeyrek" : "Yıllık"}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard("revenue")}
          onHoverEnd={() => setHoveredCard(null)}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
          {/* Hover gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderRadius: 16 }}
          />
          
          {/* Pulse effect on hover */}
          <AnimatePresence>
            {hoveredCard === "revenue" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 border-2 border-green-400 rounded-2xl"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="p-2 bg-green-500/20 rounded-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="w-6 h-6 text-green-400" />
              </motion.div>
              <motion.span 
                className="text-xs text-green-400 font-semibold flex items-center gap-1"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-3 h-3" />
                ↑ 12.5%
              </motion.span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatePresence mode="wait">
                <MorphingNumber value={`₺${(realTimeValues.revenue / 1000000).toFixed(1)}M`} />
              </AnimatePresence>
            </div>
            <div className="text-sm text-slate-400">Toplam Gelir</div>
            
            {/* Real-time indicator */}
            <motion.div
              className="flex items-center gap-1 mt-2 text-xs text-green-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-3 h-3" />
              <span>Canlı</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard("expenses")}
          onHoverEnd={() => setHoveredCard(null)}
          className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderRadius: 16 }}
          />
          
          <AnimatePresence>
            {hoveredCard === "expenses" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 border-2 border-red-400 rounded-2xl"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="p-2 bg-red-500/20 rounded-lg"
                whileHover={{ rotate: -360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingDown className="w-6 h-6 text-red-400" />
              </motion.div>
              <span className="text-xs text-red-400 font-semibold">↓ 3.2%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatePresence mode="wait">
                <MorphingNumber value={`₺${(realTimeValues.expenses / 1000000).toFixed(1)}M`} />
              </AnimatePresence>
            </div>
            <div className="text-sm text-slate-400">Toplam Gider</div>
            
            <motion.div
              className="flex items-center gap-1 mt-2 text-xs text-red-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-3 h-3" />
              <span>Canlı</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard("profit")}
          onHoverEnd={() => setHoveredCard(null)}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderRadius: 16 }}
          />
          
          <AnimatePresence>
            {hoveredCard === "profit" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 border-2 border-blue-400 rounded-2xl"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="p-2 bg-blue-500/20 rounded-lg"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Wallet className="w-6 h-6 text-blue-400" />
              </motion.div>
              <span className="text-xs text-blue-400 font-semibold">↑ 18.7%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatePresence mode="wait">
                <MorphingNumber value={`₺${(realTimeValues.profit / 1000).toFixed(0)}K`} />
              </AnimatePresence>
            </div>
            <div className="text-sm text-slate-400">Net Kar</div>
            
            <motion.div
              className="flex items-center gap-1 mt-2 text-xs text-blue-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-3 h-3" />
              <span>Canlı</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard("pending")}
          onHoverEnd={() => setHoveredCard(null)}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderRadius: 16 }}
          />
          
          <AnimatePresence>
            {hoveredCard === "pending" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 border-2 border-purple-400 rounded-2xl"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="p-2 bg-purple-500/20 rounded-lg"
                whileHover={{ rotate: -180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Receipt className="w-6 h-6 text-purple-400" />
              </motion.div>
              <motion.span 
                className="text-xs text-purple-400 font-semibold flex items-center gap-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-3 h-3" />
                28 Bekliyor
              </motion.span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              <AnimatePresence mode="wait">
                <MorphingNumber value={`₺${(realTimeValues.pending / 1000).toFixed(0)}K`} />
              </AnimatePresence>
            </div>
            <div className="text-sm text-slate-400">Bekleyen Ödemeler</div>
            
            <motion.div
              className="flex items-center gap-1 mt-2 text-xs text-purple-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-3 h-3" />
              <span>Canlı</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
        >
          {/* Animated border on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-lg font-bold">
              <GlitchText text="Gelir & Gider Trendi" className="text-white" />
            </h3>
            <motion.button 
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-4 h-4 text-slate-400" />
            </motion.button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorKar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  border: "1px solid #334155", 
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                }}
                labelStyle={{ color: "#cbd5e1", fontWeight: "bold" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
              />
              <Area 
                type="monotone" 
                dataKey="gelir" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGelir)"
                name="Gelir"
                animationDuration={2000}
              />
              <Area 
                type="monotone" 
                dataKey="gider" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGider)"
                name="Gider"
                animationDuration={2000}
                animationBegin={300}
              />
              <Area 
                type="monotone" 
                dataKey="kar" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorKar)"
                name="Kar"
                animationDuration={2000}
                animationBegin={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Gider Dağılımı</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={expenseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
            </RePieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {expenseDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-white font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Son İşlemler</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">İşlem No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Tip</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Müşteri/Tedarikçi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Tarih</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Tutar</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-slate-300 font-mono">{transaction.id}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 text-sm ${
                      transaction.type === "Gelir" ? "text-green-400" : "text-red-400"
                    }`}>
                      {transaction.type === "Gelir" ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-white">{transaction.client}</td>
                  <td className="py-4 px-4 text-sm text-slate-400">{transaction.date}</td>
                  <td className={`py-4 px-4 text-sm text-right font-semibold ${
                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}₺{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === "Ödendi" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-xl p-4 hover:border-green-500/40 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-white font-semibold">Yeni Fatura Oluştur</span>
          </div>
        </button>

        <button className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4 hover:border-blue-500/40 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <PieChart className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-white font-semibold">Mali Rapor Al</span>
          </div>
        </button>

        <button className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-white font-semibold">Ödeme Yap</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FinanceModule;
