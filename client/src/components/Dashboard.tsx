import React from 'react';
import { 
  EWasteImpactMetrics, 
  DiagnosisResult, 
  DeviceStatus 
} from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Wrench, 
  Recycle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Zap,
  IndianRupee
} from 'lucide-react';

interface DashboardProps {
  metrics: EWasteImpactMetrics;
  recentDiagnoses: DiagnosisResult[];
  onNewDiagnosisClick: () => void;
  onSelectDiagnosis: (diag: DiagnosisResult) => void;
  onViewHistoryClick: () => void;
  onViewEWasteClick: () => void;
  userLocation: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  metrics,
  recentDiagnoses,
  onNewDiagnosisClick,
  onSelectDiagnosis,
  onViewHistoryClick,
  onViewEWasteClick,
  userLocation,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-industrial-950 via-industrial-900 to-brand-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full bg-brand-950/90 px-3 py-1 text-xs font-semibold text-brand-300 border border-brand-800/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Project RRR • Visakhapatnam Pilot</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Diagnose Smartly. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
              Repair First. Replace Last.
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Combating premature appliance dumping in Visakhapatnam through mathematical viability scoring, computer vision fault isolation, and localized neighborhood technicians.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNewDiagnosisClick}
              className="flex items-center space-x-2 rounded-xl bg-brand-500 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-brand-500/30 hover:bg-brand-400 transition-all active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch AI Diagnosis</span>
            </button>
            <button
              onClick={onViewEWasteClick}
              className="flex items-center space-x-2 rounded-xl border border-industrial-700 bg-industrial-900/90 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-industrial-800 hover:text-white transition-all"
            >
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>View E-Waste Impact</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Metrics Ribbon (PRD Module 4) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Metric 1: E-Waste Diverted */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">E-Waste Diverted</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Leaf className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {metrics.totalDivertedKg.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-emerald-400">kg</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Solid appliances saved from Vizag landfills
          </p>
        </div>

        {/* Metric 2: Currency Saved */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Consumer Savings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-xs font-bold text-slate-400">₹</span>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {metrics.totalSavedINR.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Net capital retained by middle-class households
          </p>
        </div>

        {/* Metric 3: Repair Conversion Rate */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Repair Conversion</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {metrics.repairConversionRate}%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Users opting for DIY or local fix over buying new
          </p>
        </div>

        {/* Metric 4: Carbon Emissions Prevented */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">CO₂ Prevented</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
              <Recycle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {metrics.co2EquivalentPreventedKg.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-teal-400">kg</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Equivalent to planting ~410 coastal trees
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Diagnoses & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 8 cols: Recent Diagnoses */}
        <div className="lg:col-span-8 rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-industrial-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Machine Diagnostics</h3>
              <p className="text-xs text-slate-400">
                Log of recent evaluations, viability scores, and device statuses
              </p>
            </div>
            <button
              onClick={onViewHistoryClick}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1 transition-colors"
            >
              <span>View All Logs</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-industrial-800/80">
            {recentDiagnoses.slice(0, 4).map((record) => {
              const tierColor =
                record.viability.tier === 'green'
                  ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                  : record.viability.tier === 'yellow'
                  ? 'text-amber-400 bg-amber-950 border-amber-800'
                  : 'text-rose-400 bg-rose-950 border-rose-800';

              return (
                <div
                  key={record.id}
                  onClick={() => onSelectDiagnosis(record)}
                  className="py-3.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer group hover:bg-industrial-800/40 px-2 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-industrial-950 border border-industrial-800 shrink-0">
                      {record.imageUrl ? (
                        <img
                          src={record.imageUrl}
                          alt={record.machineLabel}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-600 font-mono text-xs">
                          RRR
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                        {record.machineLabel}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 max-w-md">
                        {record.symptoms}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {record.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        Viability Score
                      </div>
                      <div className="text-sm font-black font-mono text-white">
                        {record.viability.score} <span className="text-[10px] text-slate-500">/100</span>
                      </div>
                    </div>

                    <span className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold uppercase border ${tierColor}`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 cols: Community Impact Spotlight */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Actions Panel */}
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Operations
            </h3>
            <button
              onClick={onNewDiagnosisClick}
              className="w-full flex items-center justify-between rounded-xl bg-industrial-950 p-3 text-xs font-semibold text-white border border-industrial-800 hover:border-brand-500/50 hover:bg-industrial-800 transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <Sparkles className="h-4 w-4 text-brand-400" />
                <span>Upload New Appliance Photo</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
            </button>
            <button
              onClick={onViewEWasteClick}
              className="w-full flex items-center justify-between rounded-xl bg-industrial-950 p-3 text-xs font-semibold text-white border border-industrial-800 hover:border-emerald-500/50 hover:bg-industrial-800 transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <Recycle className="h-4 w-4 text-emerald-400" />
                <span>Vizag E-Waste Recycler Directory</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
            </button>
          </div>

          {/* Localized Vizag Hub Spotlight */}
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
            <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="h-4 w-4" />
              <span>Visakhapatnam Network</span>
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Serving MVP Colony, Madhurawada, Siripuram, Dwaraka Nagar, and Gajuwaka with vetted spare parts distributors and APPCB certified recyclers.
            </p>

            <div className="mt-4 rounded-xl border border-industrial-800 bg-industrial-950 p-3 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Active Certified Workshops:</span>
                <span className="text-emerald-400 font-bold">14 Stations</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>E-Waste Collection Nodes:</span>
                <span className="text-white font-bold">4 Hubs (Auto Nagar)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Avg Response Dispatch:</span>
                <span className="text-white font-bold">&lt; 3 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
