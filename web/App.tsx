import React from 'react';
import FinancialReactor from './components/Modules/FinancialReactor';
import NeuralTalentGrid from './components/Modules/NeuralTalentGrid';
import EcoComputeSynapse from './components/Modules/EcoComputeSynapse';
import SentinelShield from './components/Modules/SentinelShield';
import EthicsCompliance from './components/Modules/EthicsCompliance';
import CapTableNebula from './components/Modules/CapTableNebula';
import MarketWarRoom from './components/Modules/MarketWarRoom';
import NorthStarNavigation from './components/Modules/NorthStarNavigation';
import { Activity, Command } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-space text-slate-300 font-body relative overflow-x-hidden selection:bg-cyber/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber/50 to-transparent opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-cyber/20 rounded border border-cyber flex items-center justify-center text-cyber shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Command size={18} />
              </div>
              <h1 className="text-3xl font-rajdhani font-bold text-white tracking-widest uppercase">
                Sensei <span className="text-cyber">Core OS</span> v3.0
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-500 pl-11">
              SYSTEM_STATUS: <span className="text-neon">OPTIMAL</span> | LAST_SYNC: 14ms ago
            </p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Burn Rate</span>
                <span className="font-mono text-solar font-bold">$42.8k/mo</span>
             </div>
             <div className="w-[1px] h-8 bg-white/10"></div>
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active Users</span>
                <span className="font-mono text-neon font-bold">8,942</span>
             </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(240px,auto)]">
          {/* Row 1 */}
          <FinancialReactor />
          <NeuralTalentGrid />
          <EcoComputeSynapse />
          <SentinelShield />

          {/* Row 2 */}
          <EthicsCompliance />
          <CapTableNebula />
          <MarketWarRoom />
          <NorthStarNavigation />
        </div>
        
        <footer className="mt-12 text-center text-[10px] text-slate-600 font-mono">
          SECURE CONNECTION ESTABLISHED // ENCRYPTION: AES-256-GCM // SENSEI CORP © 2024
        </footer>
      </div>
    </div>
  );
};

export default App;