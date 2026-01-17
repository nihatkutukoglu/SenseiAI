"use client";

import React from "react";
import ProductionLine from "./ProductionLine";

const ProductionModule = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Üretim Yönetimi</h2>
        <p className="text-slate-400">Üretim hattı takibi ve performans analizi</p>
      </div>

      {/* Production Line Component */}
      <ProductionLine />

      {/* Additional Production Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="text-sm text-slate-400 mb-2">Günlük Üretim</div>
          <div className="text-3xl font-bold text-white mb-1">24 İçerik</div>
          <div className="text-sm text-green-400">↑ 12% geçen güne göre</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
          <div className="text-sm text-slate-400 mb-2">Kapasite Kullanımı</div>
          <div className="text-3xl font-bold text-white mb-1">85%</div>
          <div className="text-sm text-blue-400">Optimal seviyede</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="text-sm text-slate-400 mb-2">Kalite Skoru</div>
          <div className="text-3xl font-bold text-white mb-1">4.8/5.0</div>
          <div className="text-sm text-green-400">Yüksek kalite</div>
        </div>
      </div>
    </div>
  );
};

export default ProductionModule;
