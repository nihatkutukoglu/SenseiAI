import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { BURNOUT_DATA, WORKFORCE_DATA } from '../../services/mockData';

const NeuralTalentGrid: React.FC = () => {
  return (
    <Card title="Neural Talent Grid" icon={<Users size={18} />} accent="crimson" className="row-span-1">
      <div className="flex h-full gap-4">
        {/* Left: List */}
        <div className="w-1/2 flex flex-col gap-2 overflow-y-auto pr-2">
            {WORKFORCE_DATA.map((node) => (
                <div key={node.id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded border border-white/5 text-xs">
                    <div>
                        <div className="font-bold text-slate-200">{node.name}</div>
                        <div className={`text-[10px] ${node.type === 'human' ? 'text-slate-400' : 'text-cyber'}`}>
                            {node.type.toUpperCase()}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`font-mono ${
                            node.status.includes('Risk') ? 'text-crimson animate-pulse' : 'text-neon'
                        }`}>
                            {node.metric}{node.type === 'agent' ? '%' : ''}
                        </div>
                        <div className="text-[9px] text-slate-500">{node.status}</div>
                    </div>
                </div>
            ))}
        </div>

        {/* Right: Radar */}
        <div className="w-1/2 relative min-h-[140px]">
            <div className="absolute top-0 right-0 text-[9px] text-crimson font-mono uppercase tracking-wider">Burnout Radar</div>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={BURNOUT_DATA}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8 }} />
                    <Radar
                        name="Team"
                        dataKey="A"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
      </div>
      <AiAction 
        label="Frontend Team bottleneck detected."
        actionText="Assign Udemy Course"
        variant="crimson"
      />
    </Card>
  );
};

export default NeuralTalentGrid;