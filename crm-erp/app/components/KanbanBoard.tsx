
"use client";

import React, { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Paperclip, 
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
  id: string;
  title: string;
  tag: string;
  date: string;
  members: string[]; // Avatar URLs
  comments: number;
  priority: "low" | "medium" | "high";
};

const initialTasks: Record<TaskStatus, Task[]> = {
  todo: [
    { id: "1", title: "Kahve Makinesi Bakımı", tag: "Ofis", date: "Yarın", members: ["https://i.pravatar.cc/150?u=1"], comments: 2, priority: "low" },
    { id: "2", title: "Next.js 14 Migrasyonu", tag: "Teknik", date: "2 Gün", members: ["https://i.pravatar.cc/150?u=4", "https://github.com/shadcn.png"], comments: 12, priority: "high" },
    { id: "5", title: "Q3 Finansal Rapor Hazırlığı", tag: "Finans", date: "Haftaya", members: ["https://i.pravatar.cc/150?u=5"], comments: 5, priority: "high" },
    { id: "6", title: "Yeni Stajyer Alım İlanı", tag: "İK", date: "3 Gün", members: ["https://i.pravatar.cc/150?u=3"], comments: 1, priority: "medium" },
    { id: "7", title: "Sunucu Güvenlik Güncellemesi", tag: "DevOps", date: "Acil", members: ["https://i.pravatar.cc/150?u=2"], comments: 8, priority: "high" },
    { id: "8", title: "AI Etik Kurul Toplantısı", tag: "Yönetim", date: "Cuma", members: ["https://i.pravatar.cc/150?u=nihat"], comments: 0, priority: "low" },
  ],
  "in-progress": [
    { id: "3", title: "Yıllık İzinler Raporu", tag: "İK", date: "Bugün", members: ["https://i.pravatar.cc/150?u=3"], comments: 4, priority: "medium" },
    { id: "9", title: "Mobil Uygulama Beta Testi", tag: "Ürün", date: "Sürüyor", members: ["https://i.pravatar.cc/150?u=6", "https://i.pravatar.cc/150?u=7"], comments: 15, priority: "high" },
    { id: "10", title: "Müşteri Geri Bildirim Analizi", tag: "Destek", date: "Bugün", members: ["https://i.pravatar.cc/150?u=crm"], comments: 3, priority: "medium" },
    { id: "11", title: "Veritabanı Optimizasyonu", tag: "Teknik", date: "2 Gün", members: ["https://i.pravatar.cc/150?u=kaan"], comments: 6, priority: "high" },
  ],
  done: [
    { id: "4", title: "Forum Modülü Tasarımı", tag: "UI", date: "Dün", members: ["https://github.com/shadcn.png"], comments: 8, priority: "high" },
    { id: "12", title: "Ofis İçi Network Yenileme", tag: "IT", date: "Tamamlandı", members: ["https://i.pravatar.cc/150?u=2"], comments: 1, priority: "high" },
    { id: "13", title: "Çalışan Memnuniyet Anketi", tag: "İK", date: "Geçen Hafta", members: ["https://i.pravatar.cc/150?u=3", "https://i.pravatar.cc/150?u=hr"], comments: 24, priority: "medium" },
    { id: "14", title: "Logo Tasarım Yenilemesi", tag: "Tasarım", date: "Bitti", members: ["https://i.pravatar.cc/150?u=8"], comments: 10, priority: "medium" },
  ]
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialTasks);

  const moveTask = (taskId: string, currentStatus: TaskStatus, direction: "next" | "prev") => {
    const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= statusOrder.length) return;

    const nextStatus = statusOrder[nextIndex];
    const taskToMove = columns[currentStatus].find(t => t.id === taskId);
    
    if (!taskToMove) return;

    setColumns(prev => ({
      ...prev,
      [currentStatus]: prev[currentStatus].filter(t => t.id !== taskId),
      [nextStatus]: [...prev[nextStatus], taskToMove]
    }));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "Yeni Görev",
      tag: "Genel",
      date: "Bugün",
      members: ["https://github.com/shadcn.png"],
      comments: 0,
      priority: "medium"
    };

    setColumns(prev => ({
      ...prev,
      todo: [newTask, ...prev.todo]
    }));
  };

  const deleteTask = (taskId: string, status: TaskStatus) => {
    setColumns(prev => ({
      ...prev,
      [status]: prev[status].filter(t => t.id !== taskId)
    }));
  };

  return (
    <div className="h-full flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center mb-6 px-2">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Proje Panosu</h2>
            <p className="text-xs text-slate-500">Forum tartışmalarından dönüştürülen görevler.</p>
          </div>
          <button 
            onClick={addTask}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
             <Plus className="w-4 h-4" /> Yeni Görev
          </button>
       </div>

       {/* Board */}
       <div className="flex-1 overflow-x-auto">
          <div className="flex gap-6 min-w-[900px] h-full pb-4">
             <KanbanColumn 
                status="todo" 
                title="Yapılacaklar" 
                tasks={columns.todo} 
                color="bg-slate-500" 
                onMove={moveTask}
                onDelete={deleteTask}
             />
             <KanbanColumn 
                status="in-progress" 
                title="Sürüyor" 
                tasks={columns["in-progress"]} 
                color="bg-cyan-500" 
                onMove={moveTask}
                onDelete={deleteTask}
             />
             <KanbanColumn 
                status="done" 
                title="Tamamlandı" 
                tasks={columns.done} 
                color="bg-emerald-500" 
                onMove={moveTask}
                onDelete={deleteTask}
             />
          </div>
       </div>
    </div>
  );
};

const KanbanColumn = ({ status, title, tasks, color, onMove, onDelete }: { status: TaskStatus; title: string; tasks: Task[]; color: string; onMove: any; onDelete: any }) => {
  return (
    <div className="flex-1 min-w-[280px] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${color}`} />
             <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{title}</h3>
             <span className="bg-white/10 text-slate-400 text-xs px-2 py-0.5 rounded-full">{tasks.length}</span>
          </div>
          <button className="text-slate-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
       </div>

       <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
               <TaskCard 
                  key={task.id} 
                  task={task} 
                  status={status}
                  onMove={onMove}
                  onDelete={onDelete}
               />
            ))}
          </AnimatePresence>
          <button className="w-full py-3 border border-dashed border-white/10 rounded-xl text-slate-500 text-sm hover:text-cyan-400 hover:border-cyan-500/30 transition-colors flex items-center justify-center gap-2">
             <Plus className="w-4 h-4" /> Kart Ekle
          </button>
       </div>
    </div>
  );
};

const TaskCard = ({ task, status, onMove, onDelete }: { task: Task; status: TaskStatus; onMove: any; onDelete: any }) => {
  const priorityColor = task.priority === "high" ? "text-red-400 bg-red-500/10 border-red-500/20" : task.priority === "medium" ? "text-orange-400 bg-orange-500/10 border-orange-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layoutId={task.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-[#111] border border-white/5 p-4 rounded-xl cursor-default group relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick Actions Overlay on Hover */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2 flex gap-1 z-10"
          >
             {status !== "todo" && (
               <button 
                  onClick={() => onMove(task.id, status, "prev")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-slate-300 hover:text-white transition-colors"
                  title="Geri Taşı"
               >
                 ←
               </button>
             )}
             <button 
                onClick={() => onDelete(task.id, status)}
                className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                title="Sil"
             >
               ×
             </button>
             {status !== "done" && (
               <button 
                  onClick={() => onMove(task.id, status, "next")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-slate-300 hover:text-white transition-colors"
                  title="İleri Taşı"
               >
                 →
               </button>
             )}
          </motion.div>
        )}

        <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityColor} uppercase`}>
                {task.tag}
            </span>
        </div>

        <h4 className="text-white font-semibold text-sm mb-3 leading-snug pr-8">{task.title}</h4>

        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
            <div className="flex -space-x-2">
                {task.members.map((m, i) => (
                    <img key={i} src={m} className="w-6 h-6 rounded-full border border-[#111]" alt="Member" />
                ))}
            </div>
            
            <div className="flex items-center gap-3 text-slate-500 text-xs">
                <span className="flex items-center gap-1 hover:text-cyan-400">
                    <Paperclip className="w-3 h-3" /> 2
                </span>
                <span className="flex items-center gap-1 hover:text-cyan-400">
                    <MessageSquare className="w-3 h-3" /> {task.comments}
                </span>
            </div>
        </div>
    </motion.div>
  );
};

export default KanbanBoard;
