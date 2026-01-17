import React from 'react';
import { ShieldAlert } from 'lucide-react';
import Card from '../UI/Card';
import AiAction from '../UI/AiAction';
import { THREAT_LOGS } from '../../services/mockData';

const SentinelShield: React.FC = () => {
  return (
    <Card title="Sentinel Shield" icon={<ShieldAlert size={18} />} accent="crimson" className="md:col-span-2 row-span-1">
      <div className="flex h-full gap-4">
        
        {/* Simplified Vector Map Representation */}
        <div className="w-1/2 relative bg-slate-900/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
             <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 opacity-20">
                {Array.from({length: 24}).map((_, i) => (
                    <div key={i} className="border border-cyber/30"></div>
                ))}
             </div>
             {/* Abstract Globe */}
             <div className="w-32 h-32 rounded-full border border-cyber/50 relative animate-spin-slow">
                <div className="absolute inset-2 border border-dashed border-cyber/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-cyber/20 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 h-full w-[1px] bg-cyber/20 -translate-y-1/2"></div>
             </div>
             
             {/* Threat Blips */}
             <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-crimson rounded-full animate-ping"></div>
             <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-solar rounded-full animate-ping animation-delay-500"></div>
             
             <div className="absolute bottom-2 left-2 text-[10px] text-cyber font-mono">
                DEFCON: 4
             </div>
        </div>

        {/* Logs */}
        <div className="w-1/2 flex flex-col gap-2">
            <h4 className="text-[10px] uppercase text-slate-500 font-bold">God Mode Logs</h4>
            <div className="flex-1 overflow-hidden font-mono text-[10px] space-y-1">
                {THREAT_LOGS.map((log) => (
                    <div key={log.id} className="flex gap-2 items-center text-slate-300">
                        <span className="text-slate-600">[{log.timestamp}]</span>
                        <span className={log.status === 'blocked' ? 'text-neon' : log.status === 'warning' ? 'text-solar' : 'text-crimson'}>
                            {log.type.toUpperCase()}
                        </span>
                        <span className="truncate opacity-50">from {log.origin}</span>
                    </div>
                ))}
                <div className="animate-pulse text-cyber">_waiting for stream...</div>
            </div>

            <AiAction 
                label="Impossible Travel (Berlin/NY)."
                actionText="Lock User Account"
                variant="crimson"
            />
        </div>
      </div>
    </Card>
  );
};

export default SentinelShield;