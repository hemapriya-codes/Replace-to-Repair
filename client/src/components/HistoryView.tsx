import React, { useState } from 'react';
import { DiagnosisResult, DeviceStatus, ViabilityTier } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Recycle, 
  ChevronRight,
  Sparkles,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

interface HistoryViewProps {
  history: DiagnosisResult[];
  onSelectRecord: (record: DiagnosisResult) => void;
  onUpdateStatus: (id: string, newStatus: DeviceStatus) => void;
  onNewDiagnosisClick: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectRecord,
  onUpdateStatus,
  onNewDiagnosisClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | DeviceStatus>('All');
  const [tierFilter, setTierFilter] = useState<'All' | ViabilityTier>('All');

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.machineLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productMetadata.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesTier = tierFilter === 'All' || item.viability.tier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-industrial-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            History & Diagnostic Archive
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Searchable repository logging past appliance checks, status trackers, and economic viability scores
          </p>
        </div>

        <button
          onClick={onNewDiagnosisClick}
          className="flex items-center space-x-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/30 hover:bg-brand-500 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span>New AI Diagnosis</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-industrial-800 bg-industrial-900/90 p-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by appliance, brand (e.g. LG, Samsung), or symptoms..."
            className="w-full rounded-xl border border-industrial-700 bg-industrial-950 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl border border-industrial-700 bg-industrial-950 px-3 py-2 text-xs font-semibold text-slate-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Repaired">Repaired</option>
            <option value="Recycled">Recycled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Viability Tier Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Viability:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="rounded-xl border border-industrial-700 bg-industrial-950 px-3 py-2 text-xs font-semibold text-slate-200 focus:border-brand-500 focus:outline-none"
          >
            <option value="All">All Tiers</option>
            <option value="green">Green (&gt; 65)</option>
            <option value="yellow">Yellow (40 - 65)</option>
            <option value="red">Red (&lt; 40)</option>
          </select>
        </div>
      </div>

      {/* Repository Records List */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/60 p-12 text-center text-slate-400">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-white">No diagnostic records matched your criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or run a new AI check.</p>
          </div>
        ) : (
          filteredHistory.map((record) => {
            const tierBadge =
              record.viability.tier === 'green'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80'
                : record.viability.tier === 'yellow'
                ? 'bg-amber-950/80 text-amber-400 border-amber-800/80'
                : 'bg-rose-950/80 text-rose-400 border-rose-800/80';

            return (
              <div
                key={record.id}
                className="group rounded-2xl border border-industrial-800 bg-industrial-900/90 p-4 transition-all hover:border-slate-700 hover:bg-industrial-900 shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Left Info */}
                  <div
                    onClick={() => onSelectRecord(record)}
                    className="flex items-center space-x-3.5 cursor-pointer flex-1 min-w-[280px]"
                  >
                    <div className="h-14 w-14 rounded-xl overflow-hidden bg-industrial-950 border border-industrial-800 shrink-0">
                      {record.imageUrl ? (
                        <img
                          src={record.imageUrl}
                          alt={record.machineLabel}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs font-mono text-slate-500">
                          {record.productMetadata.brand}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] text-slate-500">
                          {record.timestamp}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {record.productMetadata.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                        {record.machineLabel}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 italic">
                        "{record.symptoms}"
                      </p>
                    </div>
                  </div>

                  {/* Right Score & Status */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Viability score */}
                    <div className="text-right font-mono">
                      <div className="text-[10px] uppercase text-slate-400">Viability Index</div>
                      <div className="text-base font-black text-white">
                        {record.viability.score} <span className="text-[10px] text-slate-500">/100</span>
                      </div>
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[9px] font-bold uppercase border mt-0.5 ${tierBadge}`}>
                        {record.viability.tier.toUpperCase()} TIER
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase font-mono text-slate-400 mb-1">
                        Lifecycle Status
                      </span>
                      <select
                        value={record.status}
                        onChange={(e) => onUpdateStatus(record.id, e.target.value as DeviceStatus)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold font-mono uppercase focus:outline-none transition-colors border ${
                          record.status === 'Repaired'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : record.status === 'Recycled'
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        <option value="Repaired">Repaired</option>
                        <option value="Recycled">Recycled</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                    {/* Open Button */}
                    <button
                      onClick={() => onSelectRecord(record)}
                      className="rounded-xl border border-industrial-700 bg-industrial-950 p-2.5 text-slate-300 hover:text-brand-400 hover:border-brand-500 transition-colors"
                      title="Inspect full diagnostic telemetry"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
