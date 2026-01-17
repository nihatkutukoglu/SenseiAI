"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  UserPlus,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Activity,
  Zap,
  Heart,
  Star
} from "lucide-react";

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
        className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-blue-400 opacity-0 group-hover:opacity-70"
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
    </div>
  );
};

// Background Particles
const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 25 + 20
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-blue-400/30 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
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

const HRModule = () => {
  const [selectedView, setSelectedView] = useState<"overview" | "employees" | "leaves" | "performance">("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [realTimeStats, setRealTimeStats] = useState({
    totalEmployees: 142,
    newHires: 8,
    pendingLeaves: 12,
    avgSatisfaction: 4.2
  });

  // Real-time stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        totalEmployees: prev.totalEmployees + (Math.random() > 0.7 ? 1 : 0),
        newHires: Math.max(0, prev.newHires + (Math.random() > 0.8 ? 1 : -1)),
        pendingLeaves: Math.max(0, prev.pendingLeaves + (Math.random() > 0.6 ? 1 : -1)),
        avgSatisfaction: Math.min(5, Math.max(3, prev.avgSatisfaction + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  const hrStats = {
    totalEmployees: 142,
    newHires: 8,
    pendingLeaves: 12,
    avgSatisfaction: 4.2
  };

  const employees = [
    { id: 1, name: "Ahmet Yılmaz", role: "Yazılım Geliştirici", department: "IT", status: "Aktif", startDate: "01.03.2022", salary: 25000, email: "ahmet@company.com" },
    { id: 2, name: "Elif Kaya", role: "Ürün Yöneticisi", department: "Ürün", status: "Aktif", startDate: "15.06.2021", salary: 30000, email: "elif@company.com" },
    { id: 3, name: "Mehmet Demir", role: "Satış Müdürü", department: "Satış", status: "Aktif", startDate: "10.01.2020", salary: 35000, email: "mehmet@company.com" },
    { id: 4, name: "Ayşe Şahin", role: "Muhasebe Uzmanı", department: "Finans", status: "İzinde", startDate: "22.08.2022", salary: 22000, email: "ayse@company.com" },
    { id: 5, name: "Can Öztürk", role: "UI/UX Tasarımcı", department: "Tasarım", status: "Aktif", startDate: "05.11.2023", salary: 23000, email: "can@company.com" },
  ];

  const leaveRequests = [
    { id: 1, employee: "Ayşe Şahin", type: "Yıllık İzin", startDate: "20.12.2024", endDate: "27.12.2024", days: 7, status: "Onaylandı" },
    { id: 2, employee: "Mehmet Demir", type: "Hastalık", startDate: "18.12.2024", endDate: "19.12.2024", days: 2, status: "Beklemede" },
    { id: 3, employee: "Can Öztürk", type: "Yıllık İzin", startDate: "24.12.2024", endDate: "31.12.2024", days: 7, status: "Beklemede" },
    { id: 4, employee: "Elif Kaya", type: "Mazeret", startDate: "16.12.2024", endDate: "16.12.2024", days: 1, status: "Reddedildi" },
  ];

  const performanceData = [
    { employee: "Ahmet Yılmaz", score: 4.5, completed: 28, target: 30, growth: "+15%" },
    { employee: "Elif Kaya", score: 4.8, completed: 32, target: 30, growth: "+22%" },
    { employee: "Mehmet Demir", score: 4.2, completed: 45, target: 50, growth: "+8%" },
    { employee: "Ayşe Şahin", score: 4.0, completed: 18, target: 20, growth: "+5%" },
    { employee: "Can Öztürk", score: 4.6, completed: 24, target: 25, growth: "+18%" },
  ];

  const departments = [
    { name: "IT", count: 35, color: "blue" },
    { name: "Satış", count: 28, color: "green" },
    { name: "Finans", count: 22, color: "yellow" },
    { name: "Tasarım", count: 18, color: "purple" },
    { name: "HR", count: 12, color: "pink" },
    { name: "Diğer", count: 27, color: "slate" },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Background Effects */}
      <BackgroundParticles />
      
      {/* Header with View Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <GlitchText text="İnsan Kaynakları" className="text-white" />
          </h2>
          <motion.p 
            className="text-slate-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Çalışan yönetimi ve performans takibi
          </motion.p>
        </div>
        
        <div className="flex gap-2">
          {[
            { id: "overview", label: "Genel" },
            { id: "employees", label: "Çalışanlar" },
            { id: "leaves", label: "İzinler" },
            { id: "performance", label: "Performans" }
          ].map((view) => (
            <motion.button
              key={view.id}
              onClick={() => setSelectedView(view.id as any)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden ${
                selectedView === view.id
                  ? "bg-blue-500 text-black"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {selectedView === view.id && (
                <motion.div
                  layoutId="hrViewSelector"
                  className="absolute inset-0 bg-blue-500"
                  style={{ borderRadius: 8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{view.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Overview View */}
      {selectedView === "overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredCard("employees")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "employees" && (
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
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <motion.span 
                    className="text-xs text-blue-400 font-semibold flex items-center gap-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +8 bu ay
                  </motion.span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatePresence mode="wait">
                    <MorphingNumber value={realTimeStats.totalEmployees} />
                  </AnimatePresence>
                </div>
                <div className="text-sm text-slate-400">Toplam Çalışan</div>
                
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
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredCard("hires")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "hires" && (
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
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserPlus className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <motion.span 
                    className="text-xs text-green-400 font-semibold flex items-center gap-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-3 h-3" />
                    ↑ 12%
                  </motion.span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatePresence mode="wait">
                    <MorphingNumber value={realTimeStats.newHires} />
                  </AnimatePresence>
                </div>
                <div className="text-sm text-slate-400">Yeni İşe Alım</div>
                
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
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredCard("leaves")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "leaves" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-orange-400 rounded-2xl"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div 
                    className="p-2 bg-orange-500/20 rounded-lg"
                    whileHover={{ rotate: -360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="w-6 h-6 text-orange-400" />
                  </motion.div>
                  <motion.span 
                    className="text-xs text-orange-400 font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Onay bekliyor
                  </motion.span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatePresence mode="wait">
                    <MorphingNumber value={realTimeStats.pendingLeaves} />
                  </AnimatePresence>
                </div>
                <div className="text-sm text-slate-400">İzin Talebi</div>
                
                <motion.div
                  className="flex items-center gap-1 mt-2 text-xs text-orange-400"
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
              onHoverStart={() => setHoveredCard("satisfaction")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "satisfaction" && (
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
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <motion.span 
                    className="text-xs text-purple-400 font-semibold flex items-center gap-1"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-3 h-3 fill-current" />
                    5 üzerinden
                  </motion.span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatePresence mode="wait">
                    <MorphingNumber value={realTimeStats.avgSatisfaction.toFixed(1)} />
                  </AnimatePresence>
                </div>
                <div className="text-sm text-slate-400">Ortalama Memnuniyet</div>
                
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

          {/* Departments Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-6">Departman Dağılımı</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`bg-${dept.color}-500/10 border border-${dept.color}-500/20 rounded-xl p-4 text-center`}
                >
                  <div className={`text-2xl font-bold text-${dept.color}-400 mb-1`}>{dept.count}</div>
                  <div className="text-sm text-slate-400">{dept.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Employees View */}
      {selectedView === "employees" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Çalışan Listesi</h3>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Yeni Çalışan Ekle
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Ad Soyad</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Pozisyon</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Departman</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Başlangıç</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Maaş</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Durum</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm text-white font-semibold">{employee.name}</div>
                          <div className="text-xs text-slate-400">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-300">{employee.role}</td>
                    <td className="py-4 px-4 text-sm text-slate-300">{employee.department}</td>
                    <td className="py-4 px-4 text-sm text-slate-400">{employee.startDate}</td>
                    <td className="py-4 px-4 text-sm text-right text-white font-semibold">₺{employee.salary.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === "Aktif" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-orange-500/20 text-orange-400"
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="text-slate-400 hover:text-white transition-colors">
                        Detay →
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Leaves View */}
      {selectedView === "leaves" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">İzin Talepleri</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold">
                {leaveRequests.filter(l => l.status === "Beklemede").length} Bekliyor
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {leaveRequests.map((leave, index) => (
              <motion.div
                key={leave.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-semibold">{leave.employee}</span>
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                          {leave.type}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {leave.startDate} - {leave.endDate} ({leave.days} gün)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      leave.status === "Onaylandı" 
                        ? "bg-green-500/20 text-green-400" 
                        : leave.status === "Beklemede"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {leave.status}
                    </span>
                    {leave.status === "Beklemede" && (
                      <div className="flex gap-2">
                        <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </button>
                        <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                          <XCircle className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Performance View */}
      {selectedView === "performance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Performans Değerlendirme</h3>
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 font-semibold rounded-lg transition-colors">
              Rapor İndir
            </button>
          </div>

          <div className="space-y-4">
            {performanceData.map((perf, index) => (
              <motion.div
                key={perf.employee}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {perf.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{perf.employee}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">{perf.score}/5.0</span>
                        <span className="text-green-400 text-sm">{perf.growth}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400 mb-1">Görev Tamamlama</div>
                    <div className="text-xl font-bold text-white">{perf.completed}/{perf.target}</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(perf.completed / perf.target) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HRModule;
