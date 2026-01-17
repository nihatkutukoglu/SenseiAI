import React from 'react';
import { Server, Leaf } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { GPU_FLEET } from '../../services/mockData';

const EcoComputeSynapse: React.FC = () => {
  return (
    <Card title="Eco-Compute Synapse" icon={<Server size={18} />} accent="neon" className="row-span-1">
      <div className="flex flex-col h-full gap-4">
        
        {/* GPU Grid */}
        <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-2 uppercase font-rajdhani">
                <span>Fleet Status</span>
                <span>H100 / A100 Mix</span>
            </div>
            <div className="grid grid-cols-8 gap-1">
                {GPU_FLEET.map((gpu) => (
                    <div 
                        key={gpu.id}
                        className={`h-6 rounded-sm transition-all duration-300 ${
                            gpu.status === 'active' ? 'bg-neon shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                            gpu.status === 'maintenance' ? 'bg-solar animate-pulse' :
                            'bg-slate-800 border border-slate-700'
                        }`}
                        title={`${gpu.type} - ${gpu.status}`}
                    />
                ))}
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-slate-800/30 p-3 rounded border border-white/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-neon">
                    <Leaf size={14} />
                    <span className="text-xs uppercase">Carbon</span>
                </div>
                <div className="text-2xl font-mono text-white">412<span className="text-sm text-slate-500">kg</span></div>
            </div>
            <div className="bg-slate-800/30 p-3 rounded border border-white/5 flex flex-col justify-between">
                 <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs uppercase">Zombie Lic.</span>
                </div>
                <div className="text-2xl font-mono text-white">12</div>
            </div>
        </div>

        <AiAction 
            label="Unused Figma licenses detected."
            actionText="Downgrade & Save $180"
            variant="neon"
        />
      </div>
    </Card>
  );
};

export default EcoComputeSynapse;