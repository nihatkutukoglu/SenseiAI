import React, { useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface AiActionProps {
  label: string;
  actionText: string;
  variant?: 'solar' | 'crimson' | 'cyber' | 'neon';
}

const AiAction: React.FC<AiActionProps> = ({ label, actionText, variant = 'cyber' }) => {
  const [executed, setExecuted] = useState(false);

  const colors = {
    solar: 'text-solar border-solar/30 hover:bg-solar/10',
    crimson: 'text-crimson border-crimson/30 hover:bg-crimson/10',
    cyber: 'text-cyber border-cyber/30 hover:bg-cyber/10',
    neon: 'text-neon border-neon/30 hover:bg-neon/10',
  };

  const handleExecute = () => {
    setExecuted(true);
    setTimeout(() => setExecuted(false), 3000);
  };

  return (
    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
      <div className="flex items-start gap-3 text-xs mb-2">
        <Sparkles size={14} className={colors[variant].split(' ')[0]} />
        <span className="text-slate-400 font-mono leading-relaxed">
          {label}
        </span>
      </div>
      <button
        onClick={handleExecute}
        disabled={executed}
        className={`w-full group relative overflow-hidden font-rajdhani font-bold uppercase tracking-wider text-xs py-2 px-4 border rounded transition-all duration-300 ${colors[variant]}`}
      >
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
        <span className="flex items-center justify-center gap-2">
          {executed ? 'EXECUTING PROTOCOL...' : (
            <>
              <Terminal size={12} />
              [{actionText}]
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default AiAction;