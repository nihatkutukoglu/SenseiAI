
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MapPin, Wifi, Battery, Search } from "lucide-react";

// Types
type UserLocation = {
  id: number;
  name: string;
  role: string;
  coords: { x: number; y: number }; // Percentage 0-100
  status: "online" | "idle" | "offline";
  avatar: string;
  locationName: string;
};

// Mock Data
const users: UserLocation[] = [
  { id: 1, name: "Neo Anderson", role: "AI Architect", coords: { x: 72, y: 35 }, status: "online", avatar: "https://github.com/shadcn.png", locationName: "Tokyo HQ" },
  { id: 2, name: "Trinity", role: "Ops Lead", coords: { x: 25, y: 42 }, status: "online", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", locationName: "San Francisco" },
  { id: 3, name: "Morpheus", role: "Strategist", coords: { x: 48, y: 30 }, status: "idle", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", locationName: "London Hub" },
  { id: 4, name: "Cypher", role: "Analyst", coords: { x: 85, y: 75 }, status: "offline", avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d", locationName: "Sydney Ops" },
  { id: 5, name: "Oracle", role: "Data Seer", coords: { x: 60, y: 55 }, status: "online", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", locationName: "Dubai Nexus" },
];

const UserMap = () => {
  const [activeUser, setActiveUser] = useState<UserLocation | null>(null);

  return (
    <div className="w-full h-full min-h-[600px] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden relative">
      {/* Header / Search */}
      <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-80">
        <h2 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
            <MapPin className="text-cyan-400 w-5 h-5" /> Canlı Operasyon Haritası
        </h2>
        <p className="text-xs text-slate-400 mb-4">Küresel ekip dağılımı ve aktif bağlantılar.</p>
        
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
                type="text" 
                placeholder="Personel veya lokasyon ara..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:border-cyan-500/50 outline-none"
            />
        </div>
      </div>

      {/* Styled World Map Background */}
      <div className="absolute inset-0 opacity-40">
        {/* Simple SVG World Map Outline for visual context */}
        <svg viewBox="0 0 1000 500" className="w-full h-full fill-[var(--slate-800)] stroke-[var(--slate-700)]">
           <path d="M50,150 Q150,50 250,150 T450,150 T650,150 T850,150" fill="none" strokeWidth="2" strokeDasharray="5,5" className="opacity-10" />
           {/* Abstract continents mesh */}
           <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
           <motion.path 
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 3, ease: "easeInOut" }}
             d="M100,100 L200,120 L180,200 L120,220 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" 
           /> {/* NA */}
           <path d="M420,80 L520,90 L500,180 L440,160 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" /> {/* EU */}
           <path d="M650,100 L800,110 L780,250 L630,220 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" /> {/* Asia */}
           <path d="M250,300 L350,310 L330,420 L270,400 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" /> {/* SA */}
           <path d="M450,220 L550,230 L530,350 L470,330 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" /> {/* Africa */}
           <path d="M750,350 L850,360 L830,420 L770,400 Z" fill="rgba(255,255,255,0.05)" className="stroke-white/10" /> {/* Aus */}
        </svg>

        {/* Global Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {users.map((u, i) => (
             i < users.length - 1 && (
                 <motion.line 
                    key={i}
                    x1={`${u.coords.x}%`} 
                    y1={`${u.coords.y}%`} 
                    x2={`${users[i+1].coords.x}%`} 
                    y2={`${users[i+1].coords.y}%`} 
                    stroke="url(#gradient-line)" 
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                 />
             )
          ))}
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
      </svg>

      {/* User Nodes */}
      {users.map((u) => (
        <motion.div
            key={u.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${u.coords.x}%`, top: `${u.coords.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: Math.random() * 1 }}
            onClick={() => setActiveUser(u)}
        >
            {/* Ripple Effect */}
            <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${u.status === 'online' ? 'bg-cyan-500' : 'bg-slate-500'}`} />
            
            {/* Avatar */}
            <div className={`relative w-10 h-10 rounded-full border-2 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-125 ${
                activeUser?.id === u.id 
                    ? "border-cyan-400 scale-125 z-50" 
                    : u.status === 'online' ? "border-cyan-500/50" : "border-slate-600"
            }`}>
                <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
            </div>

            {/* Label (Only active or hovered) */}
            <div className={`absolute top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-white/20 whitespace-nowrap px-3 py-1.5 rounded-lg pointer-events-none transition-all ${
                activeUser?.id === u.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 group-hover:opacity-100"
            }`}>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">{u.name}</div>
                <div className="text-[8px] text-cyan-400">{u.role}</div>
            </div>
        </motion.div>
      ))}

      {/* Detail Panel */}
      <AnimatePresence>
        {activeUser && (
            <motion.div 
               className="absolute bottom-6 left-6 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border border-cyan-500/30 w-72 rounded-2xl p-4 shadow-2xl"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <img src={activeUser.avatar} className="w-12 h-12 rounded-full border border-white/10" />
                        <div>
                            <h3 className="text-white font-bold">{activeUser.name}</h3>
                            <div className="text-xs text-cyan-400">{activeUser.role}</div>
                        </div>
                    </div>
                    <button onClick={() => setActiveUser(null)} className="text-slate-500 hover:text-white"><User className="w-4 h-4" /></button>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-slate-400 flex items-center gap-2"><MapPin className="w-3 h-3" /> Lokasyon</span>
                        <span className="text-white">{activeUser.locationName}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-slate-400 flex items-center gap-2"><Wifi className="w-3 h-3" /> Bağlantı</span>
                        <span className="text-emerald-400 font-mono">1.2 Gbps</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-slate-400 flex items-center gap-2"><Battery className="w-3 h-3" /> Nöral Yük</span>
                        <span className="text-yellow-400 font-mono">54%</span>
                    </div>
                </div>

                <button className="w-full mt-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors">
                    Mesaj Gönder
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMap;
