
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Smile, 
  Send 
} from "lucide-react";

const posts = [
  {
    id: 1,
    author: "Sarah Connor",
    role: "Chief Strategy Officer @ Cyberdyne",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    time: "2 saat önce",
    content: "Yapay zeka etiği üzerine yaptığımız son çalışma, endüstride yeni bir standart belirliyor. Sensei AI modüllerini kullanarak verimliliğimizi %400 artırdık. #AI #Ethics #FutureOfWork",
    likes: 1240,
    comments: 45,
    shares: 12,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    author: "Sensei AI Official",
    role: "Platform Announcement",
    avatar: "https://github.com/shadcn.png",
    time: "5 saat önce",
    content: "Yeni 'Neural Enterprise' güncellemesi yayında! Artık CRM ve ERP modülleri, sosyal grafiğinizle doğrudan etkileşime geçebiliyor. İş dünyasının geleceği burada.",
    likes: 8500,
    comments: 1202,
    shares: 5040,
    image: null
  },
  {
    id: 3,
    author: "David Bowman",
    role: "Mission Commander @ Discovery One",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    time: "1 gün önce",
    content: "Uzay madenciliği operasyonlarımız için ERP sistemini entegre ettik. Sonuçlar inanılmaz. Stok yönetimi hiç bu kadar otonom olmamıştı.",
    likes: 892,
    comments: 24,
    shares: 5,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  }
];

const SocialFeed = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Create Post Widget */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0" />
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Ne düşünüyorsun? (Sensei AI ile optimize et...)" 
              className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none mb-4"
            />
            <div className="flex justify-between items-center border-t border-white/5 pt-3">
              <div className="flex gap-2 text-cyan-500">
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><ImageIcon className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
              </div>
              <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                Paylaş <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-4 flex justify-between items-start">
            <div className="flex gap-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-white/10" />
              <div>
                <h3 className="text-white font-semibold text-sm hover:underline cursor-pointer">{post.author}</h3>
                <p className="text-slate-500 text-xs">{post.role}</p>
                <p className="text-slate-600 text-[10px] mt-0.5">{post.time}</p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-2">
            <p className="text-slate-200 text-sm leading-relaxed">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="mt-3 relative aspect-video w-full overflow-hidden bg-black">
               <img src={post.image} alt="Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          )}

          {/* Engagement Bar */}
          <div className="p-4 border-t border-white/5 mt-2">
             <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
                <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} Beğeni</span>
                <div className="flex gap-3">
                    <span>{post.comments} Yorum</span>
                    <span>{post.shares} Paylaşım</span>
                </div>
             </div>
             
             <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${likedPosts.includes(post.id) ? 'text-pink-500 bg-pink-500/10' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                  <span>Beğen</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Yorum Yap</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Paylaş</span>
                </button>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialFeed;
