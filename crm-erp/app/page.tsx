"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  Home as HomeIcon, 
  Briefcase, 
  Users, 
  MessageSquare,
  Grid,
  TrendingUp,
  Building2,
  LogOut,
  Settings,
  MoreHorizontal,
  MapPin,
  Lock,
  Key,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

// Components
import ForumModule from "./components/ForumModule";
import NeuralPulse from "./components/NeuralPulse";
import ERPDashboard from "./components/ERPDashboard";
import SuperDashboard from "./components/SuperDashboard"; // CRM Executive
import OperationalCRM from "./components/OperationalCRM";
import UserMap from "./components/UserMap";
import KanbanBoard from "./components/KanbanBoard";
import SenseiCopilot from "./components/SenseiCopilot";
import CommandPalette from "./components/CommandPalette";

// --- Types ---
type ViewMode = "feed" | "forum" | "crm" | "erp" | "map" | "kanban";

type UserRole = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  color: string;
};

const AVAILABLE_USERS: UserRole[] = [
  { id: 1, name: "Nihat KÜTÜKOĞLU", role: "Yönetici (CEO)", avatar: "https://i.pravatar.cc/150?u=nihat", color: "from-blue-600 to-indigo-600" },
  { id: 2, name: "Kaan Berke ERGÜDEN", role: "Yönetici (CTO)", avatar: "https://i.pravatar.cc/150?u=kaan", color: "from-purple-600 to-pink-600" },
  { id: 3, name: "İnsan Kaynakları Uzmanı", role: "HR Specialist", avatar: "https://i.pravatar.cc/150?u=hr", color: "from-emerald-600 to-teal-600" },
  { id: 4, name: "Muhasebe Uzmanı", role: "Financial Analyst", avatar: "https://i.pravatar.cc/150?u=acc", color: "from-amber-600 to-orange-600" },
  { id: 5, name: "ERP Uzmanı", role: "Resource Planner", avatar: "https://i.pravatar.cc/150?u=erp", color: "from-cyan-600 to-blue-600" },
  { id: 6, name: "CRM Uzmanı", role: "Customer Success", avatar: "https://i.pravatar.cc/150?u=crm", color: "from-rose-600 to-red-600" },
  { id: 7, name: "Proje Yöneticisi", role: "Project Manager", avatar: "https://i.pravatar.cc/150?u=pm", color: "from-violet-600 to-purple-600" },
];

// --- Login Modal Component ---
const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: UserRole) => void }) => {
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"select" | "auth">("select");

  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
      setPassword("");
      setStep("select");
    }
  }, [isOpen]);

  const handleUserSelect = (user: UserRole) => {
    setSelectedUser(user);
    setStep("auth");
  };

  const handleLogin = () => {
    if (selectedUser) {
      onLogin(selectedUser);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20"
      >
        <div className="flex h-full min-h-[500px]">
           {/* Left Side: Brand */}
           <div className="w-1/3 bg-gradient-to-br from-slate-900 to-black p-8 hidden md:flex flex-col justify-between border-r border-white/5">
              <div>
                <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sensei AI</h2>
                <p className="text-slate-500 text-sm">Kurumsal Yönetim Sistemi v3.0</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" /> Güvenli Giriş
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                   <Lock className="w-4 h-4 text-cyan-500" /> 256-bit Şifreleme
                </div>
              </div>
           </div>

           {/* Right Side: Form */}
           <div className="flex-1 p-8 bg-[#0a0a0a]">
              {step === "select" ? (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">Kim olarak giriş yapacaksınız?</h3>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                     {AVAILABLE_USERS.map((user) => (
                       <button
                         key={user.id}
                         onClick={() => handleUserSelect(user)}
                         className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group text-left"
                       >

                         <div className="flex-1">
                           <div className="font-bold text-slate-200 group-hover:text-white">{user.name}</div>
                           <div className="text-xs text-slate-500">{user.role}</div>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-500 transition-colors" />
                       </button>
                     ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col">
                   <button onClick={() => setStep("select")} className="text-xs text-slate-500 hover:text-white mb-6 flex items-center gap-1">
                      Start Back
                   </button>
                   
                   <div className="flex items-center gap-4 mb-8">

                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedUser?.name}</h3>
                        <p className="text-cyan-500 text-xs">{selectedUser?.role}</p>
                      </div>
                   </div>

                   <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Şifre Giriniz</label>
                        <div className="relative">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                           <input 
                             type="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             placeholder="••••••••"
                             className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                             autoFocus
                           />
                        </div>
                      </div>

                      <button 
                        onClick={handleLogin}
                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            password.length > 0 
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/50 hover:shadow-cyan-900/80 hover:scale-105" 
                            : "bg-white/5 text-slate-500 cursor-not-allowed"
                        }`}
                        disabled={password.length === 0}
                      >
                         <Key className="w-4 h-4" /> GÜVENLİ GİRİŞ YAP
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Landing Background Particles ---
const LandingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    width: string;
    height: string;
    left: string;
    top: string;
    x: number;
    y: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      width: Math.random() * 100 + 50 + "px",
      height: Math.random() * 100 + 50 + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/5 rounded-full"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
          }}
          animate={{
            x: [0, p.x],
            y: [0, p.y],
            opacity: [0.05, 0.15, 0.05],
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

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("forum");
  const [crmTab, setCrmTab] = useState<"executive" | "operational">("executive");
  
  // Login State
  const [currentUser, setCurrentUser] = useState<UserRole>(AVAILABLE_USERS[0]); // Default to first user or set null logic
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Theme Handler
  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };
  
  // Toggle Command Palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Set default to visitor or first user? 
  // User asked for "Giriş yap ekranı gelsin", implying we might start in a logged out state or just show the button.
  // The prompt says "bağlantı sayısı ve profil görüntüleme sayısı kalksın onun yerine giriş yap ekranı gelsin".
  // I will interpret this as the button replaces the stats.

  return (
    <main className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      <SenseiCopilot />
      <AnimatePresence>
        {isLoginOpen && (
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onLogin={(user) => setCurrentUser(user)} 
            />
        )}

      </AnimatePresence>

      <CommandPalette 
         isOpen={isCmdOpen} 
         onClose={() => setIsCmdOpen(false)}
         actions={{
            setView: (view) => setActiveView(view),
            setTheme: changeTheme
         }}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#020202]" />
         <LandingParticles />
      </div>

      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-50 px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView("forum")}>
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden md:block">
            SENSEI AI
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              onClick={() => setIsCmdOpen(true)}
              placeholder="Ara veya Komut Ver... (Ctrl + K)" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 md:gap-6">
          <NavIcon icon={HomeIcon} label="Ana Sayfa" active={activeView === "forum"} onClick={() => setActiveView("forum")} />

          
          <div className="w-px h-8 bg-white/10 mx-2 hidden md:block" />
          
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors group"
          >
            <img src={currentUser.avatar} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-cyan-500 transition-colors" alt="Profile" />
            <div className="text-xs text-left hidden lg:block">
              <div className="font-bold group-hover:text-cyan-400">{currentUser.name}</div>
              <div className="text-slate-500 truncate max-w-[100px]">{currentUser.role}</div>
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="pt-20 px-4 md:px-8 pb-8 flex justify-center gap-8 relative z-10 max-w-[1920px] mx-auto">
        
        {/* LEFT SIDEBAR (Sticky) - Always visible on desktop */}
        <aside className="w-64 hidden lg:flex flex-col gap-6 sticky top-24 h-[calc(100vh-8rem)]">
          {/* User Stats Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/50">
            <div className={`h-16 bg-gradient-to-r ${currentUser.color} opacity-80`} />
            <div className="px-6 pb-6 -mt-8 relative text-center">
              <img src={currentUser.avatar} className="w-16 h-16 rounded-full border-4 border-[#0a0a0a] mx-auto object-cover" alt="Profile" />
              <h2 className="text-white font-bold mt-2">{currentUser.name}</h2>
              <p className="text-slate-500 text-xs">{currentUser.role}</p>
              
              <div className="mt-6 pt-4 border-t border-white/5">
                 <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all border border-white/5 hover:border-cyan-500/50 flex items-center justify-center gap-2"
                 >
                    <LogOut className="w-3 h-3" /> Hesabı Değiştir
                 </button>
              </div>
            </div>
          </div>

          {/* BUSINESS SUITE (The Integrated Tools) */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-lg shadow-black/50 flex-1">
             <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 tracking-wider uppercase">
               <Grid className="w-3 h-3" /> Sensei Business Suite
             </div>
             
             <div className="space-y-2">

              <BusinessLink 
                  icon={MessageSquare} 
                  title="Kurumsal Forum" 
                  desc="İç İletişim & Destek"
                  active={activeView === "forum"}
                  onClick={() => setActiveView("forum")}
                  color="text-violet-400"
                  bgColor="bg-violet-500/10"
               />
               <BusinessLink 
                  icon={MapPin} 
                  title="Canlı Harita" 
                  desc="Operasyonel Takip"
                  active={activeView === "map"}
                  onClick={() => setActiveView("map")}
                  color="text-pink-400"
                  bgColor="bg-pink-500/10"
               />
               <BusinessLink 
                  icon={Grid} 
                  title="Proje Panosu" 
                  desc="Görev Yönetimi"
                  active={activeView === "kanban"}
                  onClick={() => setActiveView("kanban")}
                  color="text-orange-400"
                  bgColor="bg-orange-500/10"
               />
               <BusinessLink 
                  icon={TrendingUp} 
                  title="CRM Sistemi" 
                  desc="Satış & Müşteri"
                  active={activeView === "crm"}
                  onClick={() => setActiveView("crm")}
                  color="text-cyan-400"
                  bgColor="bg-cyan-500/10"
               />
               <BusinessLink 
                  icon={Building2} 
                  title="ERP Sistemi" 
                  desc="Kaynak Planlama"
                  active={activeView === "erp"}
                  onClick={() => setActiveView("erp")}
                  color="text-emerald-400"
                  bgColor="bg-emerald-500/10"
               />
               <div className="border-t border-white/5 my-2" />

               
               {/* Theme Swither */}
               <div className="p-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Settings className="w-3 h-3" /> Arayüz Teması
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <button onClick={() => changeTheme('default')} className={`p-2 rounded-lg text-xs font-bold border transition-all ${currentTheme === 'default' ? 'bg-white/10 border-cyan-500 text-white' : 'border-white/5 text-slate-400 hover:border-white/20'}`}>
                        Midnight
                     </button>
                     <button onClick={() => changeTheme('cyberpunk')} className={`p-2 rounded-lg text-xs font-bold border transition-all ${currentTheme === 'cyberpunk' ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'border-white/5 text-slate-400 hover:border-pink-500/50'}`}>
                        Cyberpunk
                     </button>
                     <button onClick={() => changeTheme('zen')} className={`p-2 rounded-lg text-xs font-bold border transition-all ${currentTheme === 'zen' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'border-white/5 text-slate-400 hover:border-emerald-500/50'}`}>
                        Zen Mode
                     </button>
                      <button onClick={() => changeTheme('matrix')} className={`p-2 rounded-lg text-xs font-bold border transition-all ${currentTheme === 'matrix' ? 'bg-green-500/10 border-green-500 text-green-400' : 'border-white/5 text-slate-400 hover:border-green-500/50'}`}>
                        Matrix
                     </button>
                  </div>
               </div>
             </div>
          </div>
        </aside>

        {/* CENTER CONTENT (Dynamic) */}
        <div className={`flex-1 transition-all duration-500 min-w-0 ${activeView === 'forum' ? 'max-w-4xl' : 'max-w-7xl'}`}>
          <AnimatePresence mode="wait">

            {activeView === "forum" && (
              <motion.div
                key="forum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                 <ForumModule />
              </motion.div>
            )}

            {activeView === "map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-[600px] shadow-2xl shadow-black/50 rounded-3xl"
              >
                 <UserMap />
              </motion.div>
            )}

            {activeView === "kanban" && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                 <KanbanBoard />
              </motion.div>
            )}

            {activeView === "crm" && (
              <motion.div
                key="crm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                 {/* CRM Sub-Navigation */}
                 <div className="flex items-center gap-4 mb-6 bg-[#0a0a0a] border border-white/10 p-2 rounded-xl inline-flex">
                    <button 
                      onClick={() => setCrmTab("executive")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${crmTab === "executive" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"}`}
                    >
                      YÖNETİCİ KOKPİTİ
                    </button>
                    <button 
                      onClick={() => setCrmTab("operational")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${crmTab === "operational" ? "bg-[var(--sage-green)]/20 text-[var(--sage-green)]" : "text-slate-400 hover:text-white"}`}
                    >
                      OPERASYONEL CRM
                    </button>
                 </div>
                 
                 {crmTab === "executive" ? <SuperDashboard /> : <OperationalCRM />}
              </motion.div>
            )}

             {activeView === "erp" && (
              <motion.div
                key="erp"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                 <ERPDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDEBAR (Hidden in Business Mode to allow full width) */}
        {activeView === "feed" && (
          <aside className="w-80 hidden xl:block sticky top-24 h-[calc(100vh-8rem)] space-y-6">
            <NeuralPulse />
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
              <h3 className="text-white font-bold text-sm mb-4">Gündemdekiler</h3>
              <div className="space-y-4">
                 {["#YapayZekaYasası", "#SenseiEnterprise", "Uzay Madenciliği", "Otonom Tedarik"].map(topic => (
                   <div key={topic} className="flex justify-between items-center group cursor-pointer">
                      <div>
                        <div className="text-slate-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">{topic}</div>
                        <div className="text-slate-500 text-xs">12.5k gönderi</div>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-slate-600" />
                   </div>
                 ))}
              </div>
              <button className="w-full mt-4 py-2 text-xs text-slate-400 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                 Daha Fazla Göster
              </button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

// --- Helper Components ---

const NavIcon = ({ icon: Icon, label, active, onClick }: { icon: any, label?: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] group ${active ? "text-white" : "text-slate-500 hover:text-white"}`}
  >
    <div className="relative">
      <Icon className={`w-6 h-6 ${active ? "fill-current" : ""}`} />
      {active && <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />}
    </div>
    {label && <span className="text-[10px] mt-1 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>}
  </button>
);

const BusinessLink = ({ icon: Icon, title, desc, active, onClick, color, bgColor }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border border-transparent ${active ? "bg-white/5 border-white/10" : "hover:bg-white/5 hover:border-white/5"}`}
  >
     <div className={`p-2 rounded-lg ${bgColor}`}>
        <Icon className={`w-5 h-5 ${color}`} />
     </div>
     <div className="flex-1">
       <div className={`text-sm font-bold ${active ? "text-white" : "text-slate-300"}`}>{title}</div>
       <div className="text-xs text-slate-500">{desc}</div>
     </div>
     {active && <div className={`w-1.5 h-1.5 rounded-full ${color.replace("text-", "bg-")}`} />}
  </div>
);
