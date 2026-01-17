"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  Factory,
  TrendingUp,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Activity,
  Zap,
  AlertCircle
} from "lucide-react";
import FinanceModule from "./FinanceModule";
import HRModule from "./HRModule";
import InventoryModule from "./InventoryModule";
import ProcurementModule from "./ProcurementModule";
import ProductionModule from "./ProductionModule";
import SalesModule from "./SalesModule";

type ERPModule = "overview" | "finance" | "hr" | "inventory" | "procurement" | "production" | "sales";

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
        className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-emerald-400 opacity-0 group-hover:opacity-70"
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
// Background Particles
const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; duration: number; x: number; y: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-emerald-400/40 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.x, 0],
            y: [0, p.y, 0],
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


const modules = [
  {
    id: "finance" as ERPModule,
    name: "Finans",
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    description: "Muhasebe & Mali Raporlar",
    stats: { value: "₺2.4M", label: "Aylık Ciro" }
  },
  {
    id: "hr" as ERPModule,
    name: "İnsan Kaynakları",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    description: "Çalışan Yönetimi",
    stats: { value: "142", label: "Aktif Çalışan" }
  },
  {
    id: "inventory" as ERPModule,
    name: "Envanter",
    icon: <Package className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    description: "Stok & Depo",
    stats: { value: "3,284", label: "Ürün Çeşidi" }
  },
  {
    id: "procurement" as ERPModule,
    name: "Satın Alma",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    description: "Tedarik & Sipariş",
    stats: { value: "45", label: "Aktif Tedarikçi" }
  },
  {
    id: "production" as ERPModule,
    name: "Üretim",
    icon: <Factory className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    description: "Üretim Hattı",
    stats: { value: "94%", label: "Kapasite" }
  },
  {
    id: "sales" as ERPModule,
    name: "Satış & CRM",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    description: "Müşteri İlişkileri",
    stats: { value: "1,245", label: "Aktif Müşteri" }
  }
];

// Overview Dashboard Content Component
const OverviewContent = ({ 
  realTimeData, 
  hoveredModule, 
  setHoveredModule, 
  setActiveModule 
}: { 
  realTimeData: any, 
  hoveredModule: string | null, 
  setHoveredModule: (id: string | null) => void, 
  setActiveModule: (id: ERPModule) => void 
}) => (
  <div className="space-y-6 relative">
    {/* Background Effects */}
    <BackgroundParticles />
    
    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setHoveredModule("revenue")}
        onHoverEnd={() => setHoveredModule(null)}
        className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderRadius: 16 }}
        />
        
        <AnimatePresence>
          {hoveredModule === "revenue" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 border-2 border-emerald-400 rounded-2xl"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Toplam Gelir (Aylık)</span>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-emerald-400 mb-1">
            <AnimatePresence mode="wait">
              <MorphingNumber value={`₺${(realTimeData.revenue / 1000000).toFixed(1)}M`} />
            </AnimatePresence>
          </div>
          <div className="text-sm text-emerald-300">↑ 12% geçen aya göre</div>
          
          <motion.div
            className="flex items-center gap-1 mt-2 text-xs text-emerald-400"
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
        onHoverStart={() => setHoveredModule("orders")}
        onHoverEnd={() => setHoveredModule(null)}
        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderRadius: 16 }}
        />
        
        <AnimatePresence>
          {hoveredModule === "orders" && (
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
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Aktif Siparişler</span>
            <motion.div
              whileHover={{ rotate: -360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FileText className="w-5 h-5 text-blue-400" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            <AnimatePresence mode="wait">
              <MorphingNumber value={realTimeData.orders} />
            </AnimatePresence>
          </div>
          <div className="text-sm text-blue-300">124 beklemede, 218 işlemde</div>
          
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
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setHoveredModule("alerts")}
        onHoverEnd={() => setHoveredModule(null)}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderRadius: 16 }}
        />
        
        <AnimatePresence>
          {hoveredModule === "alerts" && (
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
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Kritik Stok Uyarısı</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-5 h-5 text-purple-400 animate-pulse" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-1">
            <AnimatePresence mode="wait">
              <MorphingNumber value={realTimeData.alerts} />
            </AnimatePresence>
          </div>
          <div className="text-sm text-purple-300">Ürün minimum seviyede</div>
          
          <motion.div
            className="flex items-center gap-1 mt-2 text-xs text-purple-400"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertCircle className="w-3 h-3" />
            <span>Acil</span>
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Module Grid */}
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
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
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          layoutId={`module-${module.id}`}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            show: { opacity: 1, scale: 1, y: 0 }
          }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveModule(module.id)}
          onHoverStart={() => setHoveredModule(module.id)}
          onHoverEnd={() => setHoveredModule(null)}
          className="group cursor-pointer"
        >
          <div className={`relative bg-gradient-to-br ${module.color}/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 overflow-hidden`}>
            {/* Hover Glow Effect */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              style={{ borderRadius: 16 }}
            />
            
            {/* Ripple Effect */}
            <AnimatePresence>
              {hoveredModule === module.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 border-2 border-emerald-400 rounded-2xl pointer-events-none"
                />
              )}
            </AnimatePresence>
            
            {/* Icon */}
            <motion.div 
              className={`inline-flex p-3 bg-gradient-to-br ${module.color} rounded-xl mb-4 text-white relative z-10`}
              whileHover={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  rotate: hoveredModule === module.id ? 360 : 0 
                }}
                transition={{ duration: 0.6 }}
              >
                {module.icon}
              </motion.div>
            </motion.div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-emerald-400 transition-colors duration-300">
              <GlitchText text={module.name} />
            </h3>
            <p className="text-slate-400 text-sm mb-4 relative z-10 group-hover:text-slate-300 transition-colors duration-300">{module.description}</p>

            {/* Stats */}
            <div className="flex items-end justify-between relative z-10">
              <div>
                <motion.div 
                  className="text-2xl font-bold text-white"
                  animate={{ 
                    scale: hoveredModule === module.id ? [1, 1.05, 1] : 1 
                  }}
                  transition={{ duration: 0.8, repeat: hoveredModule === module.id ? Infinity : 0 }}
                >
                  <AnimatePresence mode="wait">
                    <MorphingNumber value={module.stats.value} />
                  </AnimatePresence>
                </motion.div>
                <div className="text-xs text-slate-400">{module.stats.label}</div>
              </div>
              <motion.div
                className="text-slate-400 group-hover:text-emerald-400 transition-colors text-2xl font-bold"
                animate={{ x: hoveredModule === module.id ? [0, 5, 0] : 0 }}
                transition={{ duration: 1.5, repeat: hoveredModule === module.id ? Infinity : 0 }}
              >
                →
              </motion.div>
            </div>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 0.2, scale: 1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-bl ${module.color} rounded-bl-full`} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Recent Activities */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Son Aktiviteler</h3>
        <BarChart3 className="w-5 h-5 text-slate-400" />
      </div>
      <div className="space-y-3">
        {[
          { time: "5 dk önce", text: "Yeni satın alma siparişi oluşturuldu", type: "procurement" },
          { time: "12 dk önce", text: "Envanter güncellemesi: 24 ürün eklendi", type: "inventory" },
          { time: "25 dk önce", text: "Fatura #4521 ödendi", type: "finance" },
          { time: "1 saat önce", text: "3 yeni çalışan kaydı tamamlandı", type: "hr" },
          { time: "2 saat önce", text: "Üretim hattı bakımı tamamlandı", type: "production" },
        ].map((activity, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-white">{activity.text}</p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const ERPDashboard = () => {
  const [activeModule, setActiveModule] = useState<ERPModule>("overview");
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    revenue: 2400000,
    orders: 342,
    alerts: 8,
    employees: 142
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 5000 - 2500),
        orders: Math.max(300, prev.orders + (Math.random() > 0.5 ? 1 : -1)),
        alerts: Math.max(0, prev.alerts + (Math.random() > 0.7 ? 1 : -1)),
        employees: prev.employees + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      {activeModule !== "overview" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => setActiveModule("overview")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
          >
            ← Modüllere Dön
          </button>
        </motion.div>
      )}

      {/* Content Switcher */}
      <AnimatePresence mode="wait">
        {activeModule === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OverviewContent 
              realTimeData={realTimeData}
              hoveredModule={hoveredModule}
              setHoveredModule={setHoveredModule}
              setActiveModule={setActiveModule}
            />
          </motion.div>
        )}

        {activeModule === "finance" && (
          <motion.div
            key="finance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FinanceModule />
          </motion.div>
        )}

        {activeModule === "hr" && (
          <motion.div
            key="hr"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HRModule />
          </motion.div>
        )}

        {activeModule === "inventory" && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <InventoryModule />
          </motion.div>
        )}

        {activeModule === "procurement" && (
          <motion.div
            key="procurement"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProcurementModule />
          </motion.div>
        )}

        {activeModule === "production" && (
          <motion.div
            key="production"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductionModule />
          </motion.div>
        )}

        {activeModule === "sales" && (
          <motion.div
            key="sales"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SalesModule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ERPDashboard;
