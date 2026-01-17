"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  TrendingUp,
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Activity,
  AlertCircle
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
        className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-green-400 opacity-0 group-hover:opacity-70"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
      >
        {text}
      </motion.span>
    </div>
  );
};

// Background Particles Component
const BackgroundParticles = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const ProcurementModule = () => {
  const [selectedView, setSelectedView] = useState<"overview" | "orders" | "suppliers" | "requests">("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Real-time data state
  const [realTimeStats, setRealTimeStats] = useState({
    activeOrders: 45,
    pendingApproval: 12,
    totalSuppliers: 38,
    monthlySpend: 1200000
  });

  // Update real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeOrders: Math.max(40, prev.activeOrders + (Math.random() > 0.5 ? 1 : -1)),
        pendingApproval: Math.max(8, Math.min(20, prev.pendingApproval + (Math.random() > 0.6 ? 1 : -1))),
        totalSuppliers: prev.totalSuppliers + (Math.random() > 0.98 ? 1 : 0),
        monthlySpend: prev.monthlySpend + Math.floor(Math.random() * 10000 - 5000)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  const procurementStats = {
    activeOrders: 45,
    pendingApproval: 12,
    totalSuppliers: 38,
    monthlySpend: "₺1.2M"
  };

  const purchaseOrders = [
    { id: "PO-2024-1245", supplier: "TechSupply A.Ş.", items: 15, amount: 125000, status: "Onaylandı", date: "15.12.2024", delivery: "20.12.2024" },
    { id: "PO-2024-1246", supplier: "Mobilya Dünyası", items: 8, amount: 42000, status: "Beklemede", date: "16.12.2024", delivery: "25.12.2024" },
    { id: "PO-2024-1247", supplier: "Office Supplies Ltd", items: 120, amount: 8500, status: "Teslim Edildi", date: "10.12.2024", delivery: "14.12.2024" },
    { id: "PO-2024-1248", supplier: "Elektronik Merkez", items: 25, amount: 185000, status: "Onaylandı", date: "17.12.2024", delivery: "22.12.2024" },
    { id: "PO-2024-1249", supplier: "İnşaat Malzeme", items: 45, amount: 95000, status: "İptal", date: "12.12.2024", delivery: "-" },
  ];

  const suppliers = [
    { 
      id: 1, 
      name: "TechSupply A.Ş.", 
      category: "Elektronik", 
      rating: 4.8, 
      orders: 145, 
      reliability: 98,
      contact: "info@techsupply.com",
      phone: "+90 212 555 0001",
      location: "İstanbul"
    },
    { 
      id: 2, 
      name: "Mobilya Dünyası", 
      category: "Mobilya", 
      rating: 4.5, 
      orders: 89, 
      reliability: 95,
      contact: "satis@mobilyadunyasi.com",
      phone: "+90 312 555 0002",
      location: "Ankara"
    },
    { 
      id: 3, 
      name: "Office Supplies Ltd", 
      category: "Kırtasiye", 
      rating: 4.7, 
      orders: 234, 
      reliability: 97,
      contact: "orders@officesupplies.com",
      phone: "+90 216 555 0003",
      location: "İstanbul"
    },
    { 
      id: 4, 
      name: "Elektronik Merkez", 
      category: "Elektronik", 
      rating: 4.6, 
      orders: 167, 
      reliability: 96,
      contact: "info@elektronikmerkez.com",
      phone: "+90 232 555 0004",
      location: "İzmir"
    },
  ];

  const purchaseRequests = [
    { id: "PR-2024-0892", requestedBy: "Ahmet Yılmaz", department: "IT", items: 5, estimatedCost: 75000, priority: "Yüksek", status: "Beklemede", date: "18.12.2024" },
    { id: "PR-2024-0893", requestedBy: "Elif Kaya", department: "HR", items: 3, estimatedCost: 12000, priority: "Normal", status: "Onaylandı", date: "17.12.2024" },
    { id: "PR-2024-0894", requestedBy: "Mehmet Demir", department: "Satış", items: 12, estimatedCost: 28000, priority: "Düşük", status: "Beklemede", date: "16.12.2024" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Onaylandı": return { bg: "green-500/20", text: "green-400" };
      case "Beklemede": return { bg: "orange-500/20", text: "orange-400" };
      case "Teslim Edildi": return { bg: "blue-500/20", text: "blue-400" };
      case "İptal": return { bg: "red-500/20", text: "red-400" };
      default: return { bg: "slate-500/20", text: "slate-400" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Yüksek": return { bg: "red-500/20", text: "red-400" };
      case "Normal": return { bg: "blue-500/20", text: "blue-400" };
      case "Düşük": return { bg: "slate-500/20", text: "slate-400" };
      default: return { bg: "slate-500/20", text: "slate-400" };
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
          <h2 className="text-3xl font-bold text-white mb-2">
            <GlitchText text="Satın Alma Yönetimi" />
          </h2>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tedarikçi ve sipariş takibi
          </motion.p>
        </div>
        
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: "overview", label: "Genel" },
            { id: "orders", label: "Siparişler" },
            { id: "suppliers", label: "Tedarikçiler" },
            { id: "requests", label: "Talepler" }
          ].map((view, idx) => (
            <motion.button
              key={view.id}
              onClick={() => setSelectedView(view.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden ${
                selectedView === view.id
                  ? "bg-green-500 text-black"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <AnimatePresence>
                {selectedView === view.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-green-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderRadius: 8 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">{view.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Overview View */}
      {selectedView === "overview" && (
        <>
          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredCard("orders")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "orders" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-green-400 rounded-2xl"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mb-3 relative z-10">
                <motion.div 
                  className="p-2 bg-green-500/20 rounded-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ShoppingCart className="w-6 h-6 text-green-400" />
                </motion.div>
                <motion.span 
                  className="text-xs text-green-400 font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ↑ 8 yeni
                </motion.span>
              </div>
              <div className="text-2xl font-bold text-white mb-1 relative z-10">
                <AnimatePresence mode="wait">
                  <MorphingNumber value={realTimeStats.activeOrders} />
                </AnimatePresence>
              </div>
              <div className="text-sm text-slate-400 relative z-10">Aktif Sipariş</div>
              
              <motion.div
                className="flex items-center gap-1 mt-2 text-xs text-green-400 relative z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Activity className="w-3 h-3" />
                <span>Canlı</span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredCard("pending")}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 16 }}
              />
              
              <AnimatePresence>
                {hoveredCard === "pending" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-orange-400 rounded-2xl"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mb-3 relative z-10">
                <motion.div 
                  className="p-2 bg-orange-500/20 rounded-lg"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Clock className="w-6 h-6 text-orange-400" />
                </motion.div>
                <motion.span 
                  className="text-xs text-orange-400 font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Onay Bekliyor
                </motion.span>
              </div>
              <div className="text-2xl font-bold text-white mb-1 relative z-10">
                <AnimatePresence mode="wait">
                  <MorphingNumber value={realTimeStats.pendingApproval} />
                </AnimatePresence>
              </div>
              <div className="text-sm text-slate-400 relative z-10">Onay Bekleyen</div>
              
              <motion.div
                className="flex items-center gap-1 mt-2 text-xs text-orange-400 relative z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <AlertCircle className="w-3 h-3" />
                <span>Beklemede</span>
              </motion.div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-blue-400 font-semibold">+3 bu ay</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{procurementStats.totalSuppliers}</div>
              <div className="text-sm text-slate-400">Aktif Tedarikçi</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-purple-400 font-semibold">↓ 5% tasarruf</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{procurementStats.monthlySpend}</div>
              <div className="text-sm text-slate-400">Aylık Harcama</div>
            </motion.div>
          </motion.div>

          {/* Recent Orders Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Son Siparişler</h3>
            <div className="space-y-3">
              {purchaseOrders.slice(0, 3).map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FileText className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-semibold">{order.id}</div>
                      <div className="text-xs text-slate-400">{order.supplier}</div>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <div className="text-sm text-white font-semibold">₺{order.amount.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{order.items} ürün</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(order.status).bg} text-${getStatusColor(order.status).text}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Orders View */}
      {selectedView === "orders" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Satın Alma Siparişleri</h3>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Sipariş
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Sipariş No</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Tedarikçi</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Ürün Sayısı</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Tutar</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Tarih</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Teslimat</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Durum</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-slate-400 font-mono">{order.id}</td>
                    <td className="py-4 px-4 text-sm text-white font-semibold">{order.supplier}</td>
                    <td className="py-4 px-4 text-sm text-center text-slate-300">{order.items}</td>
                    <td className="py-4 px-4 text-sm text-right text-white font-semibold">₺{order.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-slate-400">{order.date}</td>
                    <td className="py-4 px-4 text-sm text-slate-400">{order.delivery}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(order.status).bg} text-${getStatusColor(order.status).text}`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Suppliers View */}
      {selectedView === "suppliers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{supplier.name}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold">
                    {supplier.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    <span className="text-lg font-bold">★</span>
                    <span className="text-sm font-semibold">{supplier.rating}</span>
                  </div>
                  <div className="text-xs text-slate-400">{supplier.orders} sipariş</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {supplier.contact}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {supplier.location}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Güvenilirlik</span>
                  <span className="text-white font-semibold">{supplier.reliability}%</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${supplier.reliability}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Requests View */}
      {selectedView === "requests" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Satın Alma Talepleri</h3>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold">
              {purchaseRequests.filter(r => r.status === "Beklemede").length} Onay Bekliyor
            </span>
          </div>

          <div className="space-y-4">
            {purchaseRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-semibold font-mono">{request.id}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold bg-${getPriorityColor(request.priority).bg} text-${getPriorityColor(request.priority).text}`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300">
                      <span className="font-semibold">{request.requestedBy}</span> • {request.department}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === "Onaylandı" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-orange-500/20 text-orange-400"
                  }`}>
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Ürün Sayısı</div>
                    <div className="text-lg font-bold text-white">{request.items}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Tahmini Maliyet</div>
                    <div className="text-lg font-bold text-white">₺{request.estimatedCost.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Talep Tarihi</div>
                    <div className="text-sm font-semibold text-white">{request.date}</div>
                  </div>
                </div>

                {request.status === "Beklemede" && (
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Onayla
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reddet
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProcurementModule;
