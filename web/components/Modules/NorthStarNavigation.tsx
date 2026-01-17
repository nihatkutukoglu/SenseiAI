import React from 'react';
import { Compass, Link2 } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';

const NorthStarNavigation: React.FC = () => {
  return (
    <Card title="North Star Navigation" icon={<Compass size={18} />} accent="neon" className="md:col-span-2 row-span-1">
      <div className="flex items-center h-full gap-8 p-2">
        
        {/* Abstract Solar System for Goals */}
        <div className="relative flex-1 h-full flex items-center justify-center">
            {/* Sun (Main Goal) */}
            <div className="relative z-10 flex flex-col items-center justify-center w-20 h-20 bg-solar/20 rounded-full border border-solar/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <span className="text-[10px] text-solar font-bold">$10M</span>
                <span className="text-[8px] text-white uppercase">ARR</span>
            </div>

            {/* Orbiting Planets (Key Results) */}
            <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 bg-cyber/30 rounded-full border border-cyber text-[8px] flex items-center justify-center text-white">
                    Prod
                </div>
            </div>
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                <div className="absolute bottom-4 left-1/4 w-6 h-6 bg-neon/30 rounded-full border border-neon text-[8px] flex items-center justify-center text-white">
                    Team
                </div>
            </div>
        </div>

        {/* Alignment Chain */}
        <div className="w-1/2 space-y-2">
            <h4 className="text-[10px] uppercase text-slate-500">Alignment Health</h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Link2 size={12} className="text-neon" />
                    <span>Engineering</span>
                    <div className="h-[1px] flex-1 bg-slate-700"></div>
                    <span className="font-mono text-neon">100%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Link2 size={12} className="text-neon" />
                    <span>Sales</span>
                    <div className="h-[1px] flex-1 bg-slate-700"></div>
                    <span className="font-mono text-neon">94%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Link2 size={12} className="text-crimson animate-pulse" />
                    <span>Marketing</span>
                    <div className="h-[1px] flex-1 border-b border-dashed border-crimson/50"></div>
                    <span className="font-mono text-crimson">LAGGING</span>
                </div>
            </div>

            <AiAction 
                label="Q3 Mobile Launch detected lagging."
                actionText="Cut Scope & Focus"
                variant="neon"
            />
        </div>
      </div>
    </Card>
  );
};

export default NorthStarNavigation;