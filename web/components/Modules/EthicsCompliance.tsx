import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';

const data = [
  { name: 'Safe', value: 85 },
  { name: 'Bias', value: 15 },
];
const COLORS = ['#3B82F6', '#F59E0B'];

const EthicsCompliance: React.FC = () => {
  return (
    <Card title="Ethics & Compliance" icon={<Scale size={18} />} accent="solar" className="row-span-1">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4 flex-1">
            {/* Bias Meter */}
            <div className="w-1/2 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-0 w-full text-center pb-2">
                    <span className="text-xs text-slate-400 uppercase">Bias Score</span>
                    <div className="text-xl font-mono text-white">15%</div>
                </div>
            </div>

            {/* Copyright Heatmap (Visual only) */}
            <div className="w-1/2 flex flex-col items-center">
                <div className="grid grid-cols-4 gap-1 mb-2">
                    {Array.from({length: 16}).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${i === 5 || i === 10 ? 'bg-crimson animate-pulse' : 'bg-slate-700'}`} />
                    ))}
                </div>
                <div className="text-[10px] text-crimson flex items-center gap-1">
                    <AlertTriangle size={10} />
                    Copyright Risk
                </div>
            </div>
        </div>

        <AiAction 
            label="Generative similarity > 80% (Disney)."
            actionText="Inject Negative Prompts"
            variant="solar"
        />
      </div>
    </Card>
  );
};

export default EthicsCompliance;