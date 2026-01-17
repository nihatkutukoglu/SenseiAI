
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  Bot, 
  Minimize2, 
  Maximize2,
  Cpu
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "system";
  content: string;
  timestamp: string;
};

const SenseiCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "system",
      content: "Merhaba Neo. Ben Sensei Copilot. Sistem verileri, operasyonel metrikler veya forum özetleri hakkında bana soru sorabilirsin.",
      timestamp: "Şimdi"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI Response Logic
    setTimeout(() => {
      let responseText = "Bunu şu an analiz edemiyorum.";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("stok") || lowerInput.includes("envanter")) {
        responseText = "Envanter raporlarına göre 'Yüksek Teknoloji Çipleri' stoğu kritik seviyenin (%15) altına inmek üzere. Yeni sipariş oluşturulmasını öneririm.";
      } else if (lowerInput.includes("satış") || lowerInput.includes("ciro")) {
        responseText = "Bu ayki toplam ciro hedefin %12 üzerinde seyrediyor. Özellikle 'Kurumsal Lisans' satışlarında geçen haftaya göre %40 artış var.";
      } else if (lowerInput.includes("forum") || lowerInput.includes("özet")) {
        responseText = "Forumda bugün en çok konuşulan konu 'Ofis Kahve Makinesi' ile ilgili. Ayrıca 'Next.js 14' teknik sorunu için 3 farklı çözüm önerisi sunulmuş.";
      } else if (lowerInput.includes("merhaba") || lowerInput.includes("selam")) {
        responseText = "Tekrar merhaba! Bugün sana nasıl yardımcı olabilirim? Operasyonel raporları hazırlayabilirim.";
      } else if (lowerInput.includes("harita") || lowerInput.includes("konum") || lowerInput.includes("nerede")) {
        responseText = "Canlı Operasyon Haritası aktif. 'Neo Anderson' şu an Tokyo HQ lokasyonunda ve sinyal gücü %98. İstanbul'daki ekip ise toplantıda görünüyor.";
      } else if (lowerInput.includes("pano") || lowerInput.includes("görev") || lowerInput.includes("proje")) {
        responseText = "Proje Panosu güncel. 'Next.js 14 Migrasyonu' görevi yüksek öncelikli olarak 'Yapılacaklar' listesinde bekliyor. İsterseniz görev ataması yapabilirim.";
      }

      const systemMsg: Message = {
        id: Date.now() + 1,
        role: "system",
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, systemMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[450px] bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-900/20 pointer-events-auto overflow-hidden flex flex-col relative"
            style={{ height: "600px", maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Decorative Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20">
               <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent" />
            </div>

            {/* Header */}
            <div className="shrink-0 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold tracking-wider font-mono">SENSEI COPILOT</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-black/40">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-cyan-600 text-white rounded-br-none" 
                        : "bg-white/10 text-slate-200 rounded-bl-none border border-white/5"
                    }`}
                  >
                    {msg.role === "system" && (
                      <div className="flex items-center gap-2 mb-1 text-xs text-cyan-400 font-bold opacity-80">
                        <Bot className="w-3 h-3" /> Sensei
                      </div>
                    )}
                    {msg.content}
                    <div className={`text-[10px] mt-1 opacity-50 ${msg.role === "user" ? "text-cyan-100" : "text-slate-400"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/5 rounded-2xl rounded-bl-none p-3 border border-white/5 flex gap-1">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 p-3 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Sensei'ye sor..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all ${
          isOpen 
            ? "bg-white text-black rotate-180" 
            : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white animate-pulse-slow border border-white/20"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Cpu className="w-7 h-7" />}
      </motion.button>
    </div>
  );
};

export default SenseiCopilot;
