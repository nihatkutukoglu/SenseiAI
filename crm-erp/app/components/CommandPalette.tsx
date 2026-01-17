"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Command, 
  CreditCard, 
  Settings, 
  User, 
  Map, 
  BarChart2, 
  Globe 
} from "lucide-react";

type CommandItem = {
  id: string;
  icon: any;
  label: string;
  action: () => void;
  shortcut?: string[];
  category: "Navigation" | "Actions" | "Settings";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  actions: {
    setView: (view: any) => void;
    setTheme: (theme: string) => void;
  };
};

const CommandPalette = ({ isOpen, onClose, actions }: Props) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandList: CommandItem[] = [
    { id: "nav-forum", icon: Command, label: "Ana Sayfa / Forum", category: "Navigation", action: () => actions.setView("forum"), shortcut: ["G", "H"] },
    { id: "nav-crm", icon: BarChart2, label: "CRM Paneli", category: "Navigation", action: () => actions.setView("crm"), shortcut: ["G", "C"] },
    { id: "nav-erp", icon: CreditCard, label: "ERP Finans", category: "Navigation", action: () => actions.setView("erp"), shortcut: ["G", "E"] },
    { id: "nav-map", icon: Map, label: "Canlı Harita", category: "Navigation", action: () => actions.setView("map"), shortcut: ["G", "M"] },
    
    { id: "theme-cyberpunk", icon: Settings, label: "Tema: Cyberpunk", category: "Settings", action: () => actions.setTheme("cyberpunk") },
    { id: "theme-zen", icon: Globe, label: "Tema: Zen Modu", category: "Settings", action: () => actions.setTheme("zen") },
    { id: "theme-matrix", icon: Settings, label: "Tema: Matrix", category: "Settings", action: () => actions.setTheme("matrix") },
  ];

  // Filter commands
  const filteredCommands = commandList.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
         if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            // This is handled in parent mostly, but we can do it here too if we passed setIsOpen
         }
         return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
           filteredCommands[selectedIndex].action();
           onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4">
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         onClick={onClose}
         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
       />
       
       <motion.div 
         initial={{ scale: 0.9, opacity: 0, y: -20 }}
         animate={{ scale: 1, opacity: 1, y: 0 }}
         exit={{ scale: 0.9, opacity: 0, y: -20 }}
         transition={{ type: "spring", damping: 25, stiffness: 300 }}
         className="relative z-10 w-full max-w-xl bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
         onClick={(e) => e.stopPropagation()}
       >
          {/* Input */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
             <Search className="w-5 h-5 text-slate-500" />
             <input 
               autoFocus
               value={query}
               onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
               placeholder="Bir komut yazın veya arayın..."
               className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
             />
             <div className="text-xs text-slate-500 border border-white/10 rounded px-2 py-1 bg-white/5">
                ESC
             </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto p-2 custom-scrollbar">
             {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                   Sonuç bulunamadı.
                </div>
             ) : (
                <div className="space-y-1">
                   {filteredCommands.map((cmd, index) => (
                      <button
                        key={cmd.id}
                        onClick={() => { cmd.action(); onClose(); }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all group ${
                           index === selectedIndex ? 'bg-cyan-500/20 text-cyan-50' : 'text-slate-400 hover:bg-white/5'
                        }`}
                      >
                         <div className="flex items-center gap-3">
                            <div className={`${index === selectedIndex ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                               <cmd.icon className="w-5 h-5" />
                            </div>
                            <span className={index === selectedIndex ? 'font-bold' : ''}>{cmd.label}</span>
                         </div>
                         
                         {cmd.shortcut && (
                            <div className="flex gap-1">
                               {cmd.shortcut.map(key => (
                                  <span key={key} className="text-[10px] bg-white/10 border border-white/5 rounded px-1.5 py-0.5 text-slate-400">
                                     {key}
                                  </span>
                               ))}
                            </div>
                         )}
                         
                         {index === selectedIndex && (
                            <ArrowRight className="w-4 h-4 text-cyan-400 md:hidden" />
                         )}
                      </button>
                   ))}
                </div>
             )}
          </div>
          
          <div className="p-2 border-t border-white/10 bg-white/5 text-[10px] text-slate-500 flex justify-between px-4">
             <span>Sensei Command OS v1.0</span>
             <span className="flex items-center gap-2">Seçmek için <span className="text-white">↵ Enter</span></span>
          </div>
       </motion.div>
    </div>
  );
};

export default CommandPalette;
