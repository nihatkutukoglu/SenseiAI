"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 

  Heart, 
  Users, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  Menu, 
  Clock,
  Calendar,
  Layers,
  Activity,
  Globe,
  Brain,
  Droplet,
  Anchor,
  Sparkles,
  Wind
} from "lucide-react";
import SeasonPulse from "./SeasonPulse";
import RevenueCore from "./RevenueCore";
import ProductionLine from "./ProductionLine";

// --- Data Types from page.tsx (Replicated) ---
type TimeRange = "live" | "week" | "month" | "year" | "custom";
type KPIDataPoint = {
  value: string;
  numericValue: number;
  trend: string;
  story: string;
  subtext: string;
  status: "good" | "neutral" | "warning";
};
type KPI = {
  id: string;
  title: string;
  icon: React.ReactNode;
  graphType: "wave" | "bar" | "scatter" | "line" | "circle";
  data: Record<TimeRange, KPIDataPoint>;
};

// --- Mock Data: SOCIAL MEDIA OPS ---
const kpiDataBase: KPI[] = [
  {
    id: "active_users",
    title: "Anlık Aktif (DAU)",
    icon: <Users className="w-5 h-5" />,
    graphType: "wave",
    data: {
      live: { value: "842.5K", numericValue: 842500, trend: "+12k son 10dk", story: "Prime-Time Yoğunluğu", subtext: "İstanbul ve Berlin sunucuları pik yapıyor.", status: "good" },
      week: { value: "4.2M", numericValue: 4200000, trend: "+%5 WoW", story: "Organik Büyüme", subtext: "Viral içerikler yeni kullanıcı çekti.", status: "good" },
      month: { value: "12.8M", numericValue: 12800000, trend: "+%15 MoM", story: "Rekor Katılım", subtext: "Yaz kampanyası etkili oldu.", status: "good" },
      year: { value: "45M", numericValue: 45000000, trend: "+%40 YoY", story: "Pazar Liderliği", subtext: "Gen-Z penetrasyonu %65.", status: "good" },
      custom: { value: "---", numericValue: 0, trend: "---", story: "Hesaplanıyor...", subtext: "...", status: "neutral" },
    }
  },
  {
    id: "engagement",
    title: "Etkileşim Hızı",
    icon: <Heart className="w-5 h-5" />,
    graphType: "bar",
    data: {
      live: { value: "145k/dk", numericValue: 145000, trend: "🔥 Viral", story: "Etkileşim Patlaması", subtext: "#Finaller etiketi trendlerde 1 numara.", status: "good" },
      week: { value: "85M", numericValue: 85000000, trend: "+%8", story: "Yüksek Tutundurma", subtext: "Kullanıcı başı ortalama süre 52dk.", status: "good" },
      month: { value: "320M", numericValue: 320000000, trend: "Stabil", story: "Sadık Taban", subtext: "Like/View oranı %12 (Sektör ort: %8).", status: "neutral" },
      year: { value: "4.2B", numericValue: 4200000000, trend: "+%120", story: "Kültürel Dominasyon", subtext: "Platform pop kültürünü belirliyor.", status: "good" },
      custom: { value: "---", numericValue: 0, trend: "---", story: "...", subtext: "...", status: "neutral" },
    }
  },
  {
      id: "velocity",
      title: "İçerik Akışı",
      icon: <Zap className="w-5 h-5" />,
      graphType: "scatter",
      data: {
        live: { value: "2.4k Post/sn", numericValue: 2400, trend: "Yüksek", story: "Video Upload Artışı", subtext: "Video işleme sunucuları %78 yükte.", status: "warning" },
        week: { value: "15M Post", numericValue: 15000000, trend: "+%3", story: "Video Dominasyonu", subtext: "İçeriklerin %60'ı dikey video.", status: "good" },
        month: { value: "65M Post", numericValue: 65000000, trend: "+%12", story: "Yaratıcı Patlama", subtext: "Yeni filtreler kullanımı artırdı.", status: "good" },
        year: { value: "850M", numericValue: 850000000, trend: "x2", story: "Devasa Arşiv", subtext: "Veri depolama maliyetleri optimize edilmeli.", status: "neutral" },
        custom: { value: "---", numericValue: 0, trend: "---", story: "...", subtext: "...", status: "neutral" },
      }
    },
    {
      id: "revenue",
      title: "Reklam Geliri",
      icon: <DollarSign className="w-5 h-5" />,
      graphType: "line",
      data: {
        live: { value: "$4,250/sa", numericValue: 4250, trend: "+%12", story: "Yüksek CPM", subtext: "Otomotiv markaları şu an agresif teklif veriyor.", status: "good" },
        week: { value: "$850k", numericValue: 850000, trend: "+%5", story: "Hedefin Üstünde", subtext: "Video reklam doluluk oranı %98.", status: "good" },
        month: { value: "$3.2M", numericValue: 3200000, trend: "+%8", story: "Karlı Dönem", subtext: "Q3 hedefleri erkenden tutturuldu.", status: "good" },
        year: { value: "$42M", numericValue: 42000000, trend: "+%25", story: "Unicorn Yolu", subtext: "Yatırımcı raporu için hazır.", status: "good" },
        custom: { value: "---", numericValue: 0, trend: "---", story: "---", subtext: "---", status: "neutral" },
      }
    },
    {
      id: "trust",
      title: "Güven Skoru",
      icon: <ShieldAlert className="w-5 h-5" />,
      graphType: "circle",
      data: {
        live: { value: "92/100", numericValue: 92, trend: "Stabil", story: "Temiz Akış", subtext: "Otomatik mod. başarı oranı %99.9.", status: "good" },
        week: { value: "88/100", numericValue: 88, trend: "-2 puan", story: "Küçük Spam Dalgası", subtext: "DM spam filtreleri güncellendi.", status: "neutral" },
        month: { value: "94/100", numericValue: 94, trend: "Yüksek Güven", subtext: "Marka güvenliği skoru A+.", story: "Advertiser Friendly", status: "good" },
        year: { value: "90/100", numericValue: 90, trend: "Stabil", story: "Endüstri Standardı", subtext: "Güvenli liman imajı korundu.", status: "good" },
        custom: { value: "---", numericValue: 0, trend: "---", story: "---", subtext: "---", status: "neutral" },
      }
    },
    {
      id: "bots",
      title: "Bot Aktivitesi",
      icon: <Activity className="w-5 h-5" />,
      graphType: "line",
      data: {
        live: { value: "%1.2", numericValue: 1.2, trend: "Normal", story: "Rutin Tarama", subtext: "IP bloklama aktif.", status: "good" },
        week: { value: "%4.5", numericValue: 4.5, trend: "⚠️ Yükseliş", story: "Saldırı Girişimi", subtext: "Kripto botları yorumlara saldırıyor.", status: "warning" },
        month: { value: "%2.1", numericValue: 2.1, trend: "-%1", story: "Kontrol Altında", subtext: "Yeni captcha sistemi başarılı.", status: "good" },
        year: { value: "%3.0", numericValue: 3.0, trend: "Sektör Ort.", story: "Sürekli Savaş", subtext: "Bot teknolojileri gelişiyor, biz de.", status: "neutral" },
        custom: { value: "---", numericValue: 0, trend: "---", story: "---", subtext: "---", status: "warning" },
      }
    }
];

const periodInsights: Record<TimeRange, { summary: string; bullets: string[]; action: string }> = {
  live: {
    summary: "Şu an trafik 'Prime-Time' seviyesinde. #Finaller ve #YazTatili etiketleri viral oluyor.",
    bullets: [
      "Video işleme sunucularında yük %85 seviyesine ulaştı. Ölçekleme önerilir.",
      "Anlık etkileşim hızı rekora gidiyor (145k/dk).",
      "Güney Amerika bölgesinden şüpheli giriş denemeleri bloklandı."
    ],
    action: "CDN kapasitesini %20 artır ve Trend algoritmasını güncelle."
  },
  week: {
    summary: "Haftalık büyüme, viral bir video challange sayesinde beklentinin %15 üzerinde gerçekleşti.",
    bullets: [
      "Yeni kullanıcıların %40'ı davet (referral) ile geldi.",
      "Reklam veren harcamaları Çarşamba günü zirve yaptı.",
      "DM üzerinden gelen spam şikayetleri %12 arttı."
    ],
    action: "Spam filtrelerini sıkılaştır ve viral içeriği öne çıkar."
  },
  month: {
    summary: "Son 1 ayda 'Video First' stratejisi meyvelerini verdi; izlenme süreleri %30 arttı.",
    bullets: [
      "Aylık Aktif Kullanıcı (MAU) 12.8 Milyon'a ulaştı.",
      "Premium abonelik iptalleri %5 azaldı.",
      "Marka işbirlikleri geliri %20 artırdı."
    ],
    action: "En çok izlenen içerik üreticilere 'Teşekkür Bonusu' dağıt."
  },
  year: {
    summary: "Yıllık raporda 'Global Oyuncu' statüsüne geçiş netleşti. Büyüme hızı stabil.",
    bullets: [
      "Toplam kullanıcı tabanı 45 Milyonu aştı.",
      "Yıllık reklam geliri 42 Milyon Dolar barajını geçti.",
      "Altyapı maliyetleri %15 optimize edildi."
    ],
    action: "Yatırımcı sunumunu hazırla ve 2.0 Versiyon lansmanını planla."
  },
  custom: {
    summary: "Özel tarih aralığı için veri madenciliği yapılıyor...",
    bullets: [
      "Loglar taranıyor.",
      "Kohort analizi yapılıyor.",
      "Gelir attribution modelleri çalıştırılıyor."
    ],
    action: "Rapor bittiğinde e-posta gönder."
  }
};

const tickerItems = [
  "Tokyo'dan bir Sensei 'Sürdürülebilir Mimari' projesini tamamladı...",
  "Premium üyeler ortalama 2.5 saatlik derin çalışma yaptı...",
  "Yeni 'Deep Focus' modu 1200 kullanıcı tarafından aktif edildi...",
  "Sistem: Tüm yaratıcılık algoritmaları optimal çalışıyor...",
  "New York: 'Sensei Akademi' topluluk etkileşimi %12 yükselişte..."
];

// --- Sub-Components (Replicated from page.tsx) ---

const MorphingNumber = ({ value, numericValue }: { value: string, numericValue: number }) => {
    return (
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="inline-block"
      >
        {value}
      </motion.div>
    );
};

const TimeLens = ({ activeRange, onChange }: { activeRange: TimeRange; onChange: (r: TimeRange) => void }) => {
  const options: { id: TimeRange; label: string; icon: React.ReactNode }[] = [
    { id: "live", label: "Canlı Akış", icon: <Zap className="w-3 h-3" /> },
    { id: "week", label: "Haftalık", icon: <Clock className="w-3 h-3" /> },
    { id: "month", label: "Aylık", icon: <Calendar className="w-3 h-3" /> },
    { id: "year", label: "Yıllık", icon: <Layers className="w-3 h-3" /> },
    { id: "custom", label: "Özel", icon: <Menu className="w-3 h-3" /> },
  ];

  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="flex bg-white/5 backdrop-blur-md rounded-full border border-white/10 p-1 relative">
        {options.map((opt) => {
          const isActive = activeRange === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`relative px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 z-10 flex items-center gap-2 ${
                isActive ? "text-[#0a192f] font-bold" : "text-[var(--silver-dim)] hover:text-white"
              }`}
            >
              <span className="opacity-70">{opt.icon}</span>
              {opt.label}
              {isActive && (
                <motion.div
                  layoutId="activeTimeLens"
                  className="absolute inset-0 bg-[var(--sage-green)] rounded-full -z-10 shadow-[0_0_20px_rgba(132,169,140,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PeriodInsight = ({ range }: { range: TimeRange }) => {
    return (
        <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={range}
        >
            <div className="flex items-center gap-3 px-6 py-2 bg-[var(--sage-green)]/10 border border-[var(--sage-green)]/20 rounded-full backdrop-blur-md">
                <Brain className="w-4 h-4 text-[var(--sage-green)]" />
                <span className="text-xs md:text-sm text-[var(--silver-grey)]">
                    <strong className="text-[var(--sage-green)] mr-1">Sensei Özeti:</strong> 
                    {periodInsights[range].summary}
                </span>
            </div>
        </motion.div>
    )
}

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-[var(--sage-dim)]/20 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

const KPIGraph = ({ type, status, timeRange }: { type: KPI["graphType"]; status: KPIDataPoint["status"]; timeRange: TimeRange }) => {
  const colorClass = 
    status === "warning" ? "stroke-orange-400" :
    status === "good" ? "stroke-[var(--sage-green)]" : "stroke-blue-300";

  const fillClass =
    status === "warning" ? "fill-orange-400/20" :
    status === "good" ? "fill-[var(--sage-green)]/20" : "fill-blue-300/20";
    
  const key = `${type}-${timeRange}-${status}`;

  if (type === "wave") {
    return (
      <svg key={key} viewBox="0 0 100 40" className="w-full h-16 mt-4 overflow-visible">
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0,30 Q25,10 50,30 T100,30 L100,40 L0,40 Z" 
          className={`${fillClass} stroke-none`} 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0,30 Q25,10 50,30 T100,30" 
          fill="none" 
          className={`${colorClass} stroke-2`} 
        />
      </svg>
    );
  }
  return (
      <div key={key} className="w-full h-16 mt-4 flex items-end gap-1">
         {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i}
               initial={{ height: 0 }}
               animate={{ height: `${Math.random() * 100}%` }}
               transition={{ duration: 0.5, delay: i * 0.02 }}
               className={`w-1 rounded-t-sm ${status === "warning" ? "bg-orange-400/50" : "bg-[var(--sage-green)]/50"}`}
             />
         ))}
      </div>
  );
};

const KPICard = ({ data, timeRange }: { data: KPI; timeRange: TimeRange }) => {
  const currentData = data.data[timeRange];
  
  return (
    <GlassCard className="p-6 flex flex-col justify-between group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-[var(--silver-dim)] text-sm font-medium tracking-wider">
          <div className={`p-1.5 rounded-md bg-white/5 ${currentData.status === "warning" ? "text-orange-300" : "text-[var(--silver-grey)]"}`}>
             {data.icon}
          </div>
          {data.title.toUpperCase()}
        </div>
        <motion.span 
            key={currentData.trend}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xs font-bold px-2 py-1 rounded-full ${
                currentData.status === "warning" ? "bg-orange-500/20 text-orange-200" : 
                currentData.status === "good" ? "bg-[var(--sage-green)]/20 text-[var(--sage-green)]" : 
                "bg-blue-500/20 text-blue-200"
        }`}>
            {currentData.trend}
        </motion.span>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-light text-white tracking-tight">
           <MorphingNumber value={currentData.value} numericValue={currentData.numericValue} />
        </h3>
      </div>

      <KPIGraph type={data.graphType} status={currentData.status} timeRange={timeRange} />

      <div className="mt-4 pt-4 border-t border-white/5">
        <motion.p 
            key={currentData.story}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm font-medium ${currentData.status === "warning" ? "text-orange-200" : "text-[var(--silver-grey)]"}`}
        >
          "{currentData.story}"
        </motion.p>
        <motion.p 
            key={currentData.subtext}
             initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs text-[var(--silver-dim)] mt-1 opacity-70"
        >
          {currentData.subtext}
        </motion.p>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl ${
           currentData.status === "warning" ? "bg-orange-500" : "bg-[var(--sage-green)]"
      }`} style={{ zIndex: -1 }} />
    </GlassCard>
  );
};

// --- MAIN CRM COMPONENT ---

const OperationalCRM = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [insightActive, setInsightActive] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a192f] p-4 font-sans">
      
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-4 pb-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--sage-green)] opacity-80" /> 
          <h1 className="text-xl font-light tracking-widest hidden md:block">
            <span className="font-bold text-white">SENSEI AI</span> <span className="opacity-50 mx-2">|</span> OPERASYON MERKEZİ
          </h1>
        </div>
      </header>

      {/* The Global Time Engine */}
      <div className="relative z-30 mt-4">
          <TimeLens activeRange={timeRange} onChange={setTimeRange} />
          <PeriodInsight range={timeRange} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 p-4 gap-8 h-full overflow-hidden">
        
        {/* Main Left Column (KPIs + SeasonPulse) */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {/* The Hexagon of Insight (Main Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiDataBase.map((kpi) => (
                <motion.div
                  key={kpi.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                    <KPICard data={kpi} timeRange={timeRange} />
                </motion.div>
              ))}
            </div>

            {/* Season Pulse - Deep Dive */}
             <SeasonPulse />

             {/* Revenue Core Analysis */}
             <div className="mt-6">
                <RevenueCore />
             </div>

             {/* Content Production Pipeline */}
             <ProductionLine />
        </div>

        {/* The Oracle (Right Panel) */}
        <div className="w-[320px] hidden xl:flex flex-col gap-6">
           <button 
             onClick={() => setInsightActive(true)}
             className="relative flex items-center justify-center w-full h-full min-h-[400px] rounded-2xl overflow-hidden group cursor-pointer transition-all hover:scale-105 active:scale-95"
           >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md z-10 rounded-2xl border border-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                   animate={{
                     scale: timeRange === 'live' ? [1, 1.4, 1] : [1, 1.1, 1], 
                     opacity: [0.1, 0.3, 0.1],
                   }}
                   transition={{
                     duration: timeRange === 'live' ? 1 : 4,
                     repeat: Infinity,
                     ease: "easeInOut",
                   }}
                   className="w-48 h-48 rounded-full bg-[var(--sage-green)] blur-[80px]"
                />
              </div>

              <div className="relative z-20 flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border border-[var(--sage-green)]/30 flex items-center justify-center bg-[#0a192f]/50 backdrop-blur-xl">
                    <Brain className="w-10 h-10 text-[var(--sage-green)]" />
                  </div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-t-2 border-[var(--sage-green)] rounded-full"
                   />
                </div>
                
                <div>
                  <h2 className="text-2xl font-light text-white tracking-widest mb-2">SENSEI İÇGÖRÜ</h2>
                  <p className="text-sm text-[var(--sage-dim)]">YZ Çekirdek Analizi</p>
                </div>
              </div>
           </button>
        </div>
      </div>
      
      {/* Insight Modal */}
      <AnimatePresence>
        {insightActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--deep-ocean)]/80 backdrop-blur-xl p-8 cursor-pointer"
            onClick={() => setInsightActive(false)}
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-[#112240] border border-[var(--sage-green)]/30 p-12 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden cursor-default"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-start gap-6">
                 <div>
                   <h3 className="text-2xl font-light text-white mb-6">Stratejik Sentez: {timeRange.toUpperCase()}</h3>
                   
                   <div className="space-y-6 text-[var(--silver-grey)]">
                     <p className="text-lg leading-relaxed font-light border-l-4 border-[var(--sage-green)] pl-4">
                       {periodInsights[timeRange].summary}
                     </p>
                     
                     <div className="bg-white/5 p-6 rounded-xl">
                        <h4 className="text-sm font-bold text-[var(--sage-green)] tracking-widest uppercase mb-4">Tespit Edilen Desenler</h4>
                        <ul className="space-y-3">
                            {periodInsights[timeRange].bullets.map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                     </div>

                     <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Zap className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase">Önerilen Aksiyon</h4>
                            <p className="text-white font-medium">{periodInsights[timeRange].action}</p>
                        </div>
                     </div>
                   </div>

                   <button className="mt-8 w-full py-3 bg-[var(--sage-green)]/10 hover:bg-[var(--sage-green)]/20 text-[var(--sage-green)] border border-[var(--sage-green)]/30 rounded-lg transition-colors font-bold tracking-widest uppercase text-sm" onClick={() => setInsightActive(false)}>
                        Raporu Kapat
                   </button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Ticker */}
      <div className="relative z-20 h-10 border-t border-white/5 bg-[#0a192f]/80 backdrop-blur flex items-center overflow-hidden">
         <div className="px-4 text-xs font-bold text-[var(--sage-green)] uppercase tracking-wider shrink-0 bg-[#0a192f] z-10 h-full flex items-center pr-6 shadow-xl shadow-[#0a192f]">
           Canlı Akış
         </div>
         <motion.div 
           className="flex gap-16 whitespace-nowrap text-xs text-[var(--silver-dim)]"
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         >
           {[...tickerItems, ...tickerItems].map((item, i) => (
             <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[var(--sage-green)] rounded-full" />
                {item}
             </span>
           ))}
         </motion.div>
      </div>
    </div>
  );
};

export default OperationalCRM;
