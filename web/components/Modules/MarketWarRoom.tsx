import React from 'react';
import { Crosshair } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { COMPETITORS } from '../../services/mockData';

const MarketWarRoom: React.FC = () => {
  return (
    <Card title="Market War Room" icon={<Crosshair size={18} />} accent="crimson" className="row-span-1">
      <div className="relative h-48 w-full flex items-center justify-center overflow-hidden bg-slate-900/50 rounded-lg border border-white/5">
         
         {/* Radar Grid */}
         <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-40 h-40 border border-slate-500 rounded-full"></div>
            <div className="w-24 h-24 border border-slate-500 rounded-full absolute"></div>
            <div className="w-full h-[1px] bg-slate-500 absolute"></div>
            <div className="h-full w-[1px] bg-slate-500 absolute"></div>
         </div>

         {/* Scanning Line */}
         <div className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left border-l border-crimson/50 bg-gradient-to-r from-crimson/20 to-transparent animate-spin-slow" style={{ animationDuration: '4s' }}></div>

         {/* Competitor Blips */}
         {COMPETITORS.map((comp, i) => {
             // Basic polar to cartesian conversion for demo
             const r = (100 - comp.distance) * 0.8; 
             const theta = comp.angle * (Math.PI / 180);
             const x = r * Math.cos(theta);
             const y = r * Math.sin(theta);
             
             return (
                 <div 
                    key={i}
                    className="absolute group"
                    style={{ transform: `translate(${x}px, ${y}px)`}}
                 >
                     <div className={`w-2 h-2 rounded-full ${comp.change === 'up' ? 'bg-crimson animate-ping' : 'bg-slate-400'}`}></div>
                     <div className="w-2 h-2 rounded-full bg-white absolute top-0 left-0"></div>
                     <div className="absolute left-3 top-0 text-[9px] text-white bg-black/80 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                        {comp.name}
                     </div>
                 </div>
             )
         })}
      </div>
      <div className="mt-4">
        <AiAction 
            label="Competitor price drop (-20%)."
            actionText="Offer Loyalty Discount"
            variant="crimson"
        />
      </div>
    </Card>
  );
};

export default MarketWarRoom;