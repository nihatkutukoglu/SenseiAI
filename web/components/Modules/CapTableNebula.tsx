import React, { useState } from 'react';
import { PieChart as ChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { EQUITY_DATA } from '../../services/mockData';

const CapTableNebula: React.FC = () => {
  const [dilution, setDilution] = useState(0);

  return (
    <Card title="Cap Table Nebula" icon={<ChartIcon size={18} />} accent="cyber" className="row-span-1">
      <div className="flex h-full gap-4">
        {/* Sunburst Chart */}
        <div className="w-1/2 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={EQUITY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {EQUITY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                        ))}
                    </Pie>
                    <Tooltip 
                         contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: '12px' }}
                         itemStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Dilution Control */}
        <div className="w-1/2 flex flex-col justify-center gap-3">
            <div className="text-[10px] uppercase text-slate-400">Series A Simulator</div>
            <div className="flex items-center gap-2">
                 <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    value={dilution} 
                    onChange={(e) => setDilution(Number(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyber"
                />
            </div>
            <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-500">Dilution</span>
                <span className="text-cyber">-{dilution}%</span>
            </div>
             <AiAction 
                label="Runway < 6mo detected."
                actionText="Update Pitch Deck"
                variant="cyber"
            />
        </div>
      </div>
    </Card>
  );
};

export default CapTableNebula;