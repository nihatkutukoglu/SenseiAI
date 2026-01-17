import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  accent?: 'solar' | 'crimson' | 'cyber' | 'neon';
}

const Card: React.FC<CardProps> = ({ title, children, className = '', icon, accent = 'cyber' }) => {
  const accentColors = {
    solar: 'border-solar/20 text-solar',
    crimson: 'border-crimson/20 text-crimson',
    cyber: 'border-cyber/20 text-cyber',
    neon: 'border-neon/20 text-neon',
  };

  return (
    <div className={`relative flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden group hover:border-white/10 transition-colors duration-500 ${className}`}>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-white/5 ${accentColors[accent].split(' ')[0]}`}>
        <div className="flex items-center gap-2">
          {icon && <span className={accentColors[accent].split(' ')[1]}>{icon}</span>}
          <h3 className="font-rajdhani font-semibold uppercase tracking-widest text-sm text-slate-300">
            {title}
          </h3>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className={`w-1 h-1 rounded-full animate-pulse ${accentColors[accent].split(' ')[1].replace('text-', 'bg-')}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Card;