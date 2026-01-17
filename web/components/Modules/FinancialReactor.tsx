import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Banknote } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { CLOUD_COST_DATA } from '../../services/mockData';

const FinancialReactor: React.FC = () => {
  return (
    <Card title="Financial Reactor" icon={<Banknote size={18} />} accent="solar" className="row-span-2">
      <div className="flex flex-col h-full gap-4">
        
        {/* Runway Gauge */}
        <div className="relative flex items-center justify-center py-4">
            <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90">
                <circle cx="50" cy="50" r="45" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                <circle 
                    cx="50" cy="50" r="45" 
                    stroke="#F59E0B" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray="283"
                    strokeDashoffset="70" 
                    className="animate-[pulse_4s_ease-in-out_infinite]"
                />
            </svg>
            <div className="absolute text-center">
                <div className="text-2xl font-mono font-bold text-white">14.3</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Months</div>
            </div>
        </div>

        {/* Unit Economics Cube (Simplified as Grid) */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-white/5">
            <div className="bg-slate-800/50 p-2 rounded">
                <div className="text-[10px] text-slate-400 mb-1">LTV</div>
                <div className="text-solar font-mono">$12k</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded">
                <div className="text-[10px] text-slate-400 mb-1">CAC</div>
                <div className="text-white font-mono">$1.4k</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded">
                <div className="text-[10px] text-slate-400 mb-1">MAGIC</div>
                <div className="text-neon font-mono">3.2x</div>
            </div>
        </div>

        {/* Cloud Cost Chart */}
        <div className="flex-1 min-h-[100px] relative">
            <h4 className="absolute top-0 left-0 text-[10px] text-slate-500 font-rajdhani uppercase">Cloud Anomaly Detection</h4>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CLOUD_COST_DATA}>
                    <defs>
                        <linearGradient id="colorOpenAi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="openai" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOpenAi)" />
                    <Area type="monotone" dataKey="aws" stroke="#3B82F6" strokeWidth={1} fill="transparent" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <AiAction 
            label="Spot Instance usage critically low."
            actionText="Switch to Spot & Save $4.2k"
            variant="solar"
        />
      </div>
    </Card>
  );
};

export default FinancialReactor;