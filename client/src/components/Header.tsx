import React from 'react';
import { 
  Wrench, 
  MapPin, 
  Bell, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown 
} from 'lucide-react';

interface HeaderProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  onNewDiagnosisClick: () => void;
  unreadNotifications: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onLocationChange,
  onNewDiagnosisClick,
  unreadNotifications,
}) => {
  const [showLocationMenu, setShowLocationMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const vizagLocalities = [
    'Visakhapatnam, IN (All Regions)',
    'MVP Colony, Visakhapatnam',
    'Madhurawada, Visakhapatnam',
    'Siripuram, Visakhapatnam',
    'Dwaraka Nagar, Visakhapatnam',
    'Gajuwaka, Visakhapatnam',
    'Rushikonda, Visakhapatnam'
  ];

  const notifications = [
    {
      id: 1,
      title: 'E-Waste Milestone Achieved!',
      desc: 'Vizag community crossed 3,800 kg of appliances diverted from landfills.',
      time: '10m ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'Local Partner Added',
      desc: 'Sri Balaji Appliance Care (MVP Colony) verified for same-day motor rewinds.',
      time: '2h ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Pending Diagnosis Follow-up',
      desc: 'Voltas 1.5T AC in Dwaraka Nagar is awaiting DIY capacitor verification.',
      time: '1d ago',
      type: 'warning'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-industrial-800 bg-industrial-950/80 px-6 py-3.5 backdrop-blur-md">
      {/* Brand & Motto */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-emerald-700 shadow-lg shadow-brand-500/20">
          <Wrench className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-tight text-white">
              PROJECT <span className="text-brand-400">RRR</span>
            </span>
            <span className="rounded-full bg-brand-950/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400 border border-brand-800/60">
              v2.0 Spec
            </span>
          </div>
          <p className="hidden text-xs text-slate-400 sm:block">
            Repair First, Replace Last • <span className="italic font-mono text-[11px] text-slate-500">Quantum Four</span>
          </p>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            className="flex items-center space-x-2 rounded-lg border border-industrial-800 bg-industrial-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <MapPin className="h-3.5 w-3.5 text-brand-400" />
            <span className="max-w-[130px] truncate sm:max-w-[180px]">{currentLocation}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showLocationMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-industrial-700 bg-industrial-900 p-1.5 shadow-2xl z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-industrial-800">
                Select Service Zone
              </div>
              {vizagLocalities.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onLocationChange(loc);
                    setShowLocationMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    currentLocation === loc
                      ? 'bg-brand-950 text-brand-300 font-medium border border-brand-800/40'
                      : 'text-slate-300 hover:bg-industrial-800 hover:text-white'
                  }`}
                >
                  <span className="truncate">{loc}</span>
                  {currentLocation === loc && <CheckCircle2 className="h-3.5 w-3.5 text-brand-400 ml-1 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Menu */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg border border-industrial-800 bg-industrial-900 p-2 text-slate-400 hover:border-slate-700 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-black">
                {unreadNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-industrial-700 bg-industrial-900 p-2 shadow-2xl z-50">
              <div className="flex items-center justify-between px-3 py-2 border-b border-industrial-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Notification Center
                </span>
                <span className="text-[10px] text-brand-400 bg-brand-950/80 px-1.5 py-0.5 rounded border border-brand-800/60 font-mono">
                  Live Dispatch
                </span>
              </div>
              <div className="divide-y divide-industrial-800 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 hover:bg-industrial-800/60 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button: New Diagnosis */}
        <button
          onClick={onNewDiagnosisClick}
          className="flex items-center space-x-2 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 hover:shadow-brand-500/40 transition-all active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">New Diagnosis</span>
          <span className="sm:hidden">Scan</span>
        </button>
      </div>
    </header>
  );
};
