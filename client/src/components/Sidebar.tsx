import React from 'react';
import { 
  LayoutDashboard, 
  ScanSearch, 
  History, 
  Leaf, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

export type NavTab = 'dashboard' | 'new-diagnosis' | 'history' | 'ewaste' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingChecksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  pendingChecksCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & impact summary',
    },
    {
      id: 'new-diagnosis' as NavTab,
      label: 'New Diagnosis',
      icon: ScanSearch,
      description: 'Run multimodal AI scan',
      highlight: true,
    },
    {
      id: 'history' as NavTab,
      label: 'History & Checks',
      icon: History,
      description: 'Saved diagnostic logs',
      badge: pendingChecksCount > 0 ? pendingChecksCount : undefined,
    },
    {
      id: 'ewaste' as NavTab,
      label: 'E-Waste Savings',
      icon: Leaf,
      description: 'Landfill diversion & metrics',
    },
    {
      id: 'settings' as NavTab,
      label: 'Settings',
      icon: Settings,
      description: 'API keys & preferences',
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-industrial-800 bg-industrial-950 flex flex-col justify-between hidden md:flex">
      {/* Navigation Links */}
      <div className="p-4 space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3">
            Core Modules
          </span>
          <nav className="mt-2 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-950/80 text-brand-300 border border-brand-700/50 shadow-md shadow-brand-950/50'
                      : 'text-slate-400 hover:bg-industrial-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <div className="text-left">
                      <div className="leading-none">{item.label}</div>
                      <div className="text-[10px] font-normal text-slate-500 mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge !== undefined && (
                    <span className="ml-2 rounded-full bg-industrial-800 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-300">
                      {item.badge}
                    </span>
                  )}

                  {item.highlight && !isActive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Economic Formula Teaser Card */}
        <div className="rounded-xl border border-industrial-800 bg-industrial-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-brand-400">
            <Cpu className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wide uppercase">The Economic Brain</span>
          </div>
          <p className="mt-2 font-mono text-[10px] text-slate-400 leading-relaxed bg-industrial-950/80 p-2 rounded border border-industrial-800/80">
            Score = 100 - [ (Cost / Price) × 100 × (1 + Age/Life) ]
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span className="text-emerald-400 font-semibold">&gt;65 Green</span>
            <span className="text-amber-400 font-semibold">40-65 Yellow</span>
            <span className="text-rose-400 font-semibold">&lt;40 Red</span>
          </div>
        </div>
      </div>

      {/* Footer Info & Team Signature */}
      <div className="p-4 border-t border-industrial-900 bg-industrial-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-brand-400" />
            <div>
              <div className="text-[11px] font-semibold text-slate-300">Team Quantum Four</div>
              <div className="text-[10px] text-slate-500">Visakhapatnam, AP, India</div>
            </div>
          </div>
          <span className="rounded bg-industrial-900 px-1.5 py-0.5 font-mono text-[9px] text-slate-400 border border-industrial-800">
            v2.0
          </span>
        </div>
      </div>
    </aside>
  );
};
