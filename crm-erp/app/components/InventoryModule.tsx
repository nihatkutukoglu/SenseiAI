"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Server, 
  Cpu, 
  Cloud, 
  AlertTriangle, 
  Search, 
  Filter, 
  CreditCard,
  Plus, 
  Activity,
  HardDrive,
  Monitor,
  Wifi,
  Lock,
  MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Morphing Number Component
const MorphingNumber = ({ value, prefix = "", suffix = "" }: { value: number | string, prefix?: string, suffix?: string }) => {
  return (
    <motion.span
      key={`${value}`}
      initial={{ opacity: 0, y: 10, filter: "blur(5px)", scale: 0.95 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -10, filter: "blur(5px)", scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="inline-block"
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
};

// Glitch Text Component
const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={`relative inline-block ${className} group`}>
      <span className="relative z-10">{text}</span>
      <motion.span 
        className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-cyan-400 opacity-0 group-hover:opacity-70"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
      >
        {text}
      </motion.span>
      <motion.span 
        className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-cyan-400 opacity-0 group-hover:opacity-70"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.15 }}
      >
        {text}
      </motion.span>
    </span>
  );
};

// Background Particles Component
const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; duration: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan-400/40 rounded-full"
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

const InventoryModule = () => {
  const [selectedView, setSelectedView] = useState<"overview" | "assets" | "servers" | "alerts">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [realTimeStats, setRealTimeStats] = useState({
    totalData: 215,
    expiringLicenses: 3,
    serverLoad: 92,
    monthlyCost: 14500
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        totalData: prev.totalData + (Math.random() > 0.8 ? 0.1 : 0),
        expiringLicenses: prev.expiringLicenses,
        serverLoad: Math.min(100, Math.max(40, prev.serverLoad + (Math.random() * 4 - 2))),
        monthlyCost: prev.monthlyCost + (Math.random() > 0.9 ? 50 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  const assets = [
    { id: "SW-001", name: "Adobe Creative Cloud", type: "Lisans", user: "Tasarım Ekibi", status: "active", cost: "$550/ay", renew: "12 Gün" },
    { id: "HW-023", name: "MacBook Pro M3 Max", type: "Donanım", user: "Kaan Berke", status: "active", cost: "$4,200", renew: "-" },
    { id: "SW-004", name: "Midjourney Pro", type: "Yapay Zeka", user: "Nihat K.", status: "expiring", cost: "$60/ay", renew: "3 Gün" },
    { id: "SRV-009", name: "AWS EC2 Instance (L)", type: "Sunucu", user: "Backend", status: "alert", cost: "$1,200/ay", renew: "Otomatik" },
    { id: "HW-045", name: "Sony A7S III", type: "Donanım", user: "Medya Ekibi", status: "maintenance", cost: "$3,500", renew: "-" },
    { id: "SW-012", name: "Vercel Enterprise", type: "Hosting", user: "DevOps", status: "active", cost: "$400/ay", renew: "25 Gün" },
  ];

  const servers = [
    { id: 1, name: "Main Cluster (US-East)", region: "N. Virginia", capacity: "100 TB", usage: 85, status: "active", uptime: "99.9%" },
    { id: 2, name: "Media CDN (EU-West)", region: "Frankfurt", capacity: "500 TB", usage: 42, status: "active", uptime: "99.9%" },
    { id: 3, name: "Backup Vault (Cold)", region: "Istanbul", capacity: "1 PB", usage: 12, status: "sleep", uptime: "100%" },
    { id: 4, name: "AI Training Node", region: "Ireland", capacity: "50 TB", usage: 98, status: "warning", uptime: "98.5%" },
  ];

  const cloudUsage = [
    { month: "May", storage: 120, bandwidth: 450 },
    { month: "Haz", storage: 140, bandwidth: 520 },
    { month: "Tem", storage: 155, bandwidth: 680 },
    { month: "Ağu", storage: 180, bandwidth: 800 },
    { month: "Eyl", storage: 195, bandwidth: 750 },
    { month: "Eki", storage: 215, bandwidth: 920 },
  ];

  const costDistribution = [
    { name: "Yapay Zeka", value: 4500, color: "#a855f7" }, // Purple
    { name: "Sunucular", value: 3200, color: "#06b6d4" }, // Cyan
    { name: "Lisanslar", value: 2100, color: "#10b981" }, // Emerald
    { name: "Donanım", value: 4700, color: "#f59e0b" }, // Amber
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "emerald";
      case "expiring": return "orange";
      case "alert": return "red";
      case "maintenance": return "yellow";
      default: return "slate";
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Background Effects */}
      <BackgroundParticles />

      {/* Header with View Selector */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 font-mono tracking-tight">
             <span className="text-cyan-500 mr-2">/</span>
             <GlitchText text="TECH_ENVANTERİ" />
          </h2>
          <p className="text-slate-400 text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Dijital Varlıklar & Altyapı Takibi
          </p>
        </div>
        
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: "overview", label: "Genel Bakış" },
            { id: "assets", label: "Varlıklar" },
            { id: "servers", label: "Sunucular" },
            { id: "alerts", label: "Uyarılar" }
          ].map((view, idx) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all border ${
                selectedView === view.id
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                  : "bg-black/40 text-slate-500 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {view.label}
            </button>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Overview View */}
      {selectedView === "overview" && (
        <>
          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
            initial="hidden"
            animate="show"
            variants={{
                show: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Metric 1 */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl group hover:border-cyan-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                        <Database className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Veri Arşivi</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">
                    <MorphingNumber value={realTimeStats.totalData.toFixed(1)} suffix=" TB" />
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Canlı Veri Akışı
                </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl group hover:border-orange-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Lisans Durumu</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">
                    <MorphingNumber value={realTimeStats.expiringLicenses} />
                </div>
                <div className="text-xs text-orange-400">Süresi Yaklaşan</div>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl group hover:border-red-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-500/10 rounded-xl text-red-400 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Sunucu Yükü</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">
                    <MorphingNumber value={Math.round(realTimeStats.serverLoad)} suffix="%" />
                </div>
                <div className="text-xs text-red-400 animate-pulse">Kritik Seviye</div>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl group hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Aylık Maliyet</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">
                    $<MorphingNumber value={realTimeStats.monthlyCost.toLocaleString()} />
                </div>
                <div className="text-xs text-purple-400">+%12 Artış</div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cloud Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                 <Cloud className="w-4 h-4 text-cyan-400" /> Bulut Kullanımı (TB)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cloudUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "8px" }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                  <Bar dataKey="storage" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Depolama" />
                  <Bar dataKey="bandwidth" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Trafik" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Cost Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6 relative"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                 <CreditCard className="w-4 h-4 text-purple-400" /> Gider Dağılımı
              </h3>
              <div className="h-[200px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={costDistribution} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value"
                        >
                            {costDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "8px", fontSize: "12px" }} />
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                     <span className="text-2xl font-bold text-white font-mono">$14.5k</span>
                     <span className="text-[10px] text-slate-500 uppercase">Toplam</span>
                 </div>
              </div>
              
              <div className="mt-4 space-y-2">
                 {costDistribution.map(item => (
                     <div key={item.name} className="flex items-center justify-between text-xs">
                         <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                             <span className="text-slate-300">{item.name}</span>
                         </div>
                         <span className="text-white font-mono">${item.value}</span>
                     </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Assets List View */}
      {selectedView === "assets" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Varlık Listesi</h3>
              <button className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-cyan-500/20 transition-all">
                  <Plus className="w-4 h-4" /> Yeni Varlık Ekle
              </button>
          </div>
          
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="text-xs text-slate-500 border-b border-white/10">
                   <th className="py-3 pl-4 font-normal uppercase tracking-wider">ID</th>
                   <th className="py-3 font-normal uppercase tracking-wider">Varlık Adı</th>
                   <th className="py-3 font-normal uppercase tracking-wider">Tür</th>
                   <th className="py-3 font-normal uppercase tracking-wider">Kullanan</th>
                   <th className="py-3 font-normal uppercase tracking-wider">Durum</th>
                   <th className="py-3 pr-4 text-right font-normal uppercase tracking-wider">Maliyet</th>
                </tr>
             </thead>
             <tbody className="text-sm">
                {assets.map((asset, i) => (
                   <motion.tr 
                     key={asset.id} 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                   >
                      <td className="py-4 pl-4 font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">{asset.id}</td>
                      <td className="py-4 font-bold text-white">{asset.name}</td>
                      <td className="py-4 text-slate-300">
                          <span className="bg-white/5 px-2 py-1 rounded text-xs">{asset.type}</span>
                      </td>
                      <td className="py-4 text-slate-400 font-mono text-xs">{asset.user}</td>
                      <td className="py-4">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider bg-${getStatusColor(asset.status)}-500/10 text-${getStatusColor(asset.status)}-400 border border-${getStatusColor(asset.status)}-500/20`}>
                             {asset.status === 'expiring' ? 'Süre Bitiyor' : asset.status === 'alert' ? 'Uyarı' : 'Aktif'}
                          </span>
                      </td>
                      <td className="py-4 pr-4 text-right font-mono text-white">{asset.cost}</td>
                   </motion.tr>
                ))}
             </tbody>
          </table>
        </motion.div>
      )}
      
       {/* Servers View */}
      {selectedView === "servers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servers.map((server, i) => (
                <motion.div 
                    key={server.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <Server className={`w-8 h-8 p-1.5 rounded-lg ${server.usage > 90 ? 'bg-red-500/10 text-red-500' : 'bg-cyan-500/10 text-cyan-500'}`} />
                            <div>
                                <h4 className="font-bold text-white">{server.name}</h4>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MapPin className="w-3 h-3" /> {server.region}
                                </div>
                            </div>
                        </div>
                        <div className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${server.status === 'active' ? 'border-emerald-500/30 text-emerald-500' : 'border-red-500/30 text-red-500'}`}>
                            {server.uptime} UP
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">CPU Kullanımı</span>
                                <span className={server.usage > 90 ? "text-red-400" : "text-white"}>{server.usage}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${server.usage}%` }}
                                    className={`h-full rounded-full ${server.usage > 90 ? 'bg-red-500' : 'bg-cyan-500'}`}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                            <span className="text-slate-500">Kapasite: <span className="text-white">{server.capacity}</span></span>
                            <button className="text-cyan-400 hover:text-white transition-colors">Yönet</button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default InventoryModule;
