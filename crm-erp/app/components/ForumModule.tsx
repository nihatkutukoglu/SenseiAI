
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Hash, 
  Users, 
  Award, 
  CheckCircle2, 
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Tag,
  Filter,
  X,
  Clock,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";

// Types
type ForumCategory = "general" | "tech" | "hr" | "announcements" | "ideas" | "sales" | "social" | "management" | "education";

type UserRole = "admin" | "manager" | "developer" | "intern";

type ForumPost = {
  id: number;
  title: string;
  content: string;
  image?: string;
  author: {
    name: string;
    role: UserRole;
    avatar: string;
  };
  category: ForumCategory;
  tags: string[];
  likes: number;
  comments: number;
  isSolved: boolean;
  createdAt: string;
};

// Mock Data
const categories: { id: ForumCategory; label: string; icon: any; color: string }[] = [
  { id: "general", label: "Genel Sohbet", icon: Hash, color: "text-slate-400" },
  { id: "tech", label: "Teknik Destek & Kod", icon: MessageSquare, color: "text-cyan-400" },
  { id: "hr", label: "İnsan Kaynakları", icon: Users, color: "text-pink-400" },
  { id: "announcements", label: "Duyurular", icon: Award, color: "text-yellow-400" },
  { id: "sales", label: "Satış & Pazarlama", icon: TrendingUp, color: "text-green-400" },
  { id: "management", label: "Yönetim & Strateji", icon: Share2, color: "text-purple-400" },
  { id: "education", label: "Eğitim & Gelişim", icon: Calendar, color: "text-blue-400" },
  { id: "social", label: "Sosyal & Etkinlik", icon: MessageCircle, color: "text-orange-400" },
  { id: "ideas", label: "Fikir Kutusu", icon: Hash, color: "text-emerald-400" },
];

const initialPosts: ForumPost[] = [
  {
    id: 1,
    title: "Next.js 14 Server Actions ile ilgili sorun yaşıyorum",
    content: "Form submit işleminde 'hydration mismatch' hatası alıyorum. Background particles bileşeniyle çakışıyor olabilir mi? Yardımcı olabilecek var mı?",
    author: {
      name: "Ahmet Yılmaz",
      role: "intern",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    category: "tech",
    tags: ["nextjs", "bug", "frontend"],
    likes: 12,
    comments: 5,
    isSolved: false,
    createdAt: "2 saat önce",
  },
  {
    id: 2,
    title: "Ofis içi kahve makinesi yenilendi! ☕",
    content: "Arkadaşlar mutfaktaki kahve makinesi İtalyan bir espresso makinesi ile değiştirildi. Kullanım kılavuzu yanındaki panoda asılı. Keyifli çalışmalar!",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Elif Demir",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    category: "announcements",
    tags: ["ofis", "duyuru"],
    likes: 45,
    comments: 12,
    isSolved: false,
    createdAt: "5 saat önce",
  },
  {
    id: 3,
    title: "Yıllık izin talepleri hakkında güncelleme",
    content: "ERP sistemindeki İK modülü üzerinden izin taleplerinizi artık mobil cihazlardan da girebilirsiniz. Onay süreci 24 saate düşürüldü.",
    author: {
      name: "Caner Öztürk",
      role: "manager",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    category: "hr",
    tags: ["ik", "izin", "erp"],
    likes: 28,
    comments: 3,
    isSolved: true,
    createdAt: "1 gün önce",
  },
  {
    id: 4,
    title: "Yeni 'Neural Pulse' bileşeni için renk önerisi",
    content: "Dashboard'daki yapay zeka grafiklerinde mor yerine neon turkuaz kullansak daha fütüristik durmaz mı? Örnek bir tasarım hazırladım.",
    author: {
      name: "Selin Kaya",
      role: "developer",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    category: "ideas",
    tags: ["tasarım", "ui/ux"],
    likes: 34,
    comments: 15,
    isSolved: false,
    createdAt: "2 gün önce",
  },
  {
    id: 5,
    title: "Q4 Satış Hedefleri Hakkında Strateji Toplantısı",
    content: "Önümüzdeki çeyrek için belirlediğimiz agresif büyüme hedeflerini tartışmak üzere tüm satış ekibini Cuma günü toplantıya bekliyoruz. Detaylar e-postada.",
    author: {
      name: "Mehmet Yılmaz",
      role: "manager",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    category: "sales",
    tags: ["satış", "toplantı", "q4"],
    likes: 18,
    comments: 7,
    isSolved: false,
    createdAt: "3 saat önce",
  },
  {
    id: 6,
    title: "Yazılımcılar için İleri Seviye React Eğitimi",
    content: "Udemy for Business hesabımıza yeni eklenen 'Advanced React Patterns' serisini incelemenizi öneririm. Performans optimizasyonu konusunda harika ipuçları var.",
    author: {
      name: "Seda Yıldız",
      role: "developer",
      avatar: "https://i.pravatar.cc/150?u=6",
    },
    category: "education",
    tags: ["eğitim", "react", "frontend"],
    likes: 42,
    comments: 9,
    isSolved: false,
    createdAt: "4 saat önce",
  },
  {
    id: 7,
    title: "Ofis Dışı Cuma Etkinliği: Paintball! 🎨",
    content: "Bu ayın sosyal etkinliği olarak Paintball'a gidiyoruz! Katılmak isteyenler lütfen ismini yazdırsın. Servis saat 17:00'de kalkacak.",
    author: {
      name: "Zeynep Arslan",
      role: "hr",
      avatar: "https://i.pravatar.cc/150?u=7",
    },
    category: "social",
    tags: ["etkinlik", "sosyal", "fun"],
    likes: 56,
    comments: 23,
    isSolved: false,
    createdAt: "6 saat önce",
  },
  {
    id: 8,
    title: "Şirket İçi Mentorluk Programı Başlıyor",
    content: "Yönetici adayları ve deneyimli uzmanlarımızı bir araya getirecek mentorluk programımızın kayıtları açıldı. Gelişim fırsatını kaçırmayın.",
    author: {
      name: "Nihat Kütükoğlu",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?u=nihat",
    },
    category: "management",
    tags: ["kariyer", "mentorluk", "liderlik"],
    likes: 89,
    comments: 14,
    isSolved: false,
    createdAt: "1 gün önce",
  },
  {
    id: 9,
    title: "Yemek Kartı Sistemi Değişikliği - Sodexo'ya Geçiş",
    content: "Önümüzdeki aydan itibaren yemek kartı partnerimizi değiştiriyoruz. Mevcut bakiyeleriniz aktarılacak. Yeni kartlarınız Cuma günü masalarınıza bırakılacaktır.",
    author: {
      name: "İnsan Kaynakları",
      role: "hr",
      avatar: "https://i.pravatar.cc/150?u=hr_team",
    },
    category: "hr",
    tags: ["ik", "yan-haklar", "duyuru"],
    likes: 52,
    comments: 18,
    isSolved: false,
    createdAt: "3 gün önce",
  },
  {
    id: 10,
    title: "2025 Yıl Sonu Performans Değerlendirmeleri Başlıyor",
    content: "Yıl sonu yaklaşıyor! 360 derece performans değerlendirme formları sistem üzerinden tanımlandı. Lütfen 15 Ocak'a kadar tamamlayınız.",
    author: {
      name: "Selin Yılmaz",
      role: "manager",
      avatar: "https://i.pravatar.cc/150?u=selin",
    },
    category: "hr",
    tags: ["performans", "kariyer", "deadline"],
    likes: 24,
    comments: 5,
    isSolved: false,
    createdAt: "4 gün önce",
  },
  {
    id: 11,
    title: "Ofiste Sağlıklı Yaşam: Ergonomi Semineri",
    content: "Uzun süre masa başında çalışanlar için doğru oturuş ve egzersiz tekniklerini konuşacağımız seminerimiz Perşembe 14:00'te toplanma alanında.",
    author: {
      name: "Dr. Can Berk",
      role: "hr",
      avatar: "https://i.pravatar.cc/150?u=doctor",
    },
    category: "hr",
    tags: ["sağlık", "etkinlik", "wellbeing"],
    likes: 41,
    comments: 8,
    isSolved: false,
    createdAt: "5 gün önce",
  },
  {
    id: 12,
    title: "Git Flow Stratejisinde Güncelleme Önerisi",
    content: "Feature branch'lerin develop'a merge edilme sürecinde yaşanan konfliktleri azaltmak için rebase stratejisine geçmeyi öneriyorum. Düşünceleriniz?",
    author: {
      name: "Burak Kodlayan",
      role: "developer",
      avatar: "https://i.pravatar.cc/150?u=dev2",
    },
    category: "tech",
    tags: ["git", "workflow", "devops"],
    likes: 15,
    comments: 22,
    isSolved: false,
    createdAt: "1 hafta önce",
  },
  {
    id: 13,
    title: "Haftalık Yoga Dersleri Başlıyor! 🧘‍♀️",
    content: "Talepleriniz üzerine her Çarşamba iş çıkışı 18:30'da teras katında yoga dersleri başlayacaktır. Matınızı getirmeyi unutmayın!",
    author: {
      name: "Sosyal Kulüp",
      role: "intern",
      avatar: "https://i.pravatar.cc/150?u=yoga",
    },
    category: "general",
    tags: ["sosyal", "spor", "etkinlik"],
    likes: 67,
    comments: 34,
    isSolved: false,
    createdAt: "1 hafta önce",
  }
];

const RoleBadge = ({ role }: { role: UserRole }) => {
  const styles = {
    admin: "bg-red-500/20 text-red-300 border-red-500/30",
    manager: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    developer: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    intern: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  };

  const labels = {
    admin: "Yönetici",
    manager: "Müdür",
    developer: "Geliştirici",
    intern: "Stajyer",
  };

  return (
    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${styles[role]}`}>
      {labels[role]}
    </span>
  );
};

const UserHoverCard = ({ author }: { author: ForumPost['author'] }) => (
  <div className="absolute top-8 left-0 z-20 w-64 bg-[#111] border border-white/10 rounded-xl shadow-xl p-4 opacity-0 group-hover/author:opacity-100 translate-y-2 group-hover/author:translate-y-0 pointer-events-none group-hover/author:pointer-events-auto transition-all duration-300">
    <div className="flex items-start gap-3 mb-3">
      <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full border border-white/10" />
      <div>
        <div className="font-bold text-white">{author.name}</div>
        <RoleBadge role={author.role} />
      </div>
    </div>
    <div className="space-y-2 text-xs text-slate-400 mb-3">
      <div className="flex items-center gap-2">
        <MapPin className="w-3 h-3" /> İstanbul Ofisi
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-3 h-3" /> Katıldı: Ocak 2024
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/10">
      <div className="text-center">
        <div className="text-white font-bold">12</div>
        <div className="text-[10px] text-slate-500">Konu</div>
      </div>
      <div className="text-center">
        <div className="text-white font-bold">48</div>
        <div className="text-[10px] text-slate-500">Yanıt</div>
      </div>
      <div className="text-center">
        <div className="text-white font-bold">156</div>
        <div className="text-[10px] text-slate-500">Puan</div>
      </div>
    </div>
  </div>
);

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: -50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-24 right-8 z-50 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl shadow-lg shadow-green-900/20 flex items-center gap-3 backdrop-blur-md"
    >
      <div className="bg-green-500/20 p-1 rounded-full">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="font-medium text-sm">{message}</span>
    </motion.div>
  );
};

const ForumModule = () => {
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | "all">("all");
  const [posts, setPosts] = useState(initialPosts);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [toast, setToast] = useState<string | null>(null);

  // Form States
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<ForumCategory>("general");
  const [newTags, setNewTags] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: posts.length + 1,
      title: newTitle,
      content: newContent,
      author: {
        name: "Sen",
        role: "developer",
        avatar: "https://i.pravatar.cc/150?u=99",
      },
      category: newCategory,
      tags: newTags.split(',').filter(t => t.trim() !== "").map(t => t.trim()),
      likes: 0,
      comments: 0,
      isSolved: false,
      createdAt: "Az önce",
    };

    setPosts([newPost, ...posts]);
    setToast("Konu başarıyla yayınlandı! 🚀");
    setIsComposeOpen(false);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setNewCategory("general");
  };

  const filteredPosts = posts
    .filter(post => selectedCategory === "all" || post.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "popular") return b.likes - a.likes;
      // Mock date sorting (assuming higher ID is newer for this mock)
      return b.id - a.id;
    });

  return (
    <div className="flex h-full gap-6 max-w-7xl mx-auto">
      {/* Sidebar - Categories */}
      <div className="w-64 hidden md:flex flex-col gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-lg shadow-black/50 sticky top-24">
          <button 
            onClick={() => setIsComposeOpen(true)}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 mb-6 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            <Plus className="w-5 h-5" /> Yeni Konu Aç
          </button>

          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === "all" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Hash className="w-4 h-4" /> Tüm Konular
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <cat.icon className={`w-4 h-4 ${cat.color}`} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gamification / Stats */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Ayın Çalışanları</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-8 h-8 rounded-full border border-white/10" alt="User" />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                    {i}
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Kullanıcı {i}</div>
                  <div className="text-slate-500 text-xs">{150 - i * 20} Katkı Puanı</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 min-w-0">
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
             <input 
               type="text" 
               placeholder="Forumda ara (soru, hata kodu, konu)..." 
               className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
             />
          </div>
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-1">
             <button 
               onClick={() => setSortBy("newest")}
               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${sortBy === "newest" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
             >
               <Clock className="w-4 h-4" /> Yeniler
             </button>
             <button 
               onClick={() => setSortBy("popular")}
               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${sortBy === "popular" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
             >
               <TrendingUp className="w-4 h-4" /> Popüler
             </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group cursor-pointer shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 relative group/author">
                  <UserHoverCard author={post.author} />
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{post.author.name}</span>
                      <RoleBadge role={post.author.role} />
                    </div>
                    <span className="text-slate-500 text-xs">{post.createdAt}</span>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.content}
              </p>

              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden h-64 border border-white/10 relative group-hover:border-cyan-500/30 transition-colors">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 font-mono">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                    <MessageCircle className="w-4 h-4" /> {post.comments} Yanıt
                  </button>
                </div>

                {post.isSolved && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-xs font-bold">ÇÖZÜLDÜ</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isComposeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative"
            >
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Yeni Konu Başlat</h2>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Konu Başlığı</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Örn: React useEffect kullanımı hakkında..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Kategori</label>
                    <div className="relative">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ForumCategory)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                      >
                         {categories.map(cat => (
                           <option key={cat.id} value={cat.id} className="bg-black text-white">{cat.label}</option>
                         ))}
                      </select>
                      <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Etiketler</label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="virgül ile ayırın (örn: react, hook, bug)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">İçerik</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Sorunuzu veya düşüncenizi detaylıca açıklayın..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsComposeOpen(false)}
                    className="px-6 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Konuyu Yayınla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default ForumModule;
