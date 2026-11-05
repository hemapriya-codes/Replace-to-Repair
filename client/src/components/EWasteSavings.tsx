import React, { useState } from 'react';
import { EWasteImpactMetrics } from '../types';
import { 
  Leaf, 
  Recycle, 
  TreePine, 
  Droplet, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  ArrowRight, 
  IndianRupee,
  Share2,
  Check
} from 'lucide-react';
import { VIZAG_EWASTE_RECYCLERS } from '../mockData';
import confetti from 'canvas-confetti';

interface EWasteSavingsProps {
  metrics: EWasteImpactMetrics;
  onNewDiagnosisClick: () => void;
  userLocation: string;
}

export const EWasteSavings: React.FC<EWasteSavingsProps> = ({
  metrics,
  onNewDiagnosisClick,
  userLocation,
}) => {
  const [copied, setCopied] = useState(false);

  // Environmental Equivalencies calculation
  const treesEquivalent = Math.round(metrics.totalDivertedKg * 0.12);
  const toxicChemicalsPreventedKg = Math.round(metrics.totalDivertedKg * 0.08);
  const copperRecoveredKg = Math.round(metrics.totalDivertedKg * 0.045);

  const handleShare = () => {
    const text = `Project RRR has helped Visakhapatnam divert ${metrics.totalDivertedKg.toLocaleString('en-IN')} kg of e-waste and save ₹${metrics.totalSavedINR.toLocaleString('en-IN')}! Diagnose Smartly. Repair First. Replace Last.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 via-industrial-950 to-industrial-900 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800/80">
            <Leaf className="h-3.5 w-3.5" />
            <span>Ecological & Economic Impact Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            E-Waste Diversion & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Circularity Impact Dashboard
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Every appliance repaired in Visakhapatnam halts landfill leaching, preserves critical copper and aluminum ores, and keeps money inside families' bank accounts.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all active:scale-95"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              <span>{copied ? 'Impact Summary Copied!' : 'Share Community Impact'}</span>
            </button>
            <button
              onClick={onNewDiagnosisClick}
              className="flex items-center space-x-2 rounded-xl border border-industrial-700 bg-industrial-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span>Diagnose Another Appliance</span>
            </button>
          </div>
        </div>

        {/* Ambient lighting */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Impact Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cumulative E-Waste Saved */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase font-mono">Landfill Diversion</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Leaf className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-white font-mono">
              {metrics.totalDivertedKg.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-emerald-400 font-mono">kg</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Saved from municipal open dumps & landfills
          </p>
        </div>

        {/* Money Kept in Vizag Households */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase font-mono">Capital Retained</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-xs font-bold text-slate-400">₹</span>
            <span className="text-3xl font-black text-white font-mono">
              {metrics.totalSavedINR.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Consumer savings across middle-class families
          </p>
        </div>

        {/* Trees Equivalent */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase font-mono">Tree Sequestration</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
              <TreePine className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-white font-mono">
              {treesEquivalent.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-teal-400">trees</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            CO2 absorption offset equivalence
          </p>
        </div>

        {/* Toxic Leaching Prevented */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase font-mono">Toxics Blocked</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-white font-mono">
              {toxicChemicalsPreventedKg.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-sky-400 font-mono">kg</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Lead, cadmium & brominated fire retardants
          </p>
        </div>
      </div>

      {/* Regional Vizag Neighborhood Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">
                Visakhapatnam Zone Diversion Index
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Live Aggregate
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {[
              { locality: 'MVP Colony & Siripuram Hub', divertedKg: 1420, percent: 38, repairs: 165 },
              { locality: 'Madhurawada & IT SEZ Belt', divertedKg: 1050, percent: 28, repairs: 122 },
              { locality: 'Dwaraka Nagar & Asilmetta', divertedKg: 780, percent: 21, repairs: 89 },
              { locality: 'Gajuwaka Industrial Corridor', divertedKg: 595, percent: 13, repairs: 68 },
            ].map((zone, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-white">{zone.locality}</span>
                  <span className="text-emerald-400 font-bold">{zone.divertedKg} kg ({zone.repairs} machines)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-industrial-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-brand-400"
                    style={{ width: `${zone.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Recyclers Pickup Station */}
        <div className="lg:col-span-5 rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-industrial-800 pb-3">
            <Recycle className="h-5 w-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">APPCB Authorized Recyclers</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            When machines reach end of life (Red Viability Score &lt; 40), verified recyclers guarantee safe component disassembly and scrap payout.
          </p>

          <div className="space-y-3">
            {VIZAG_EWASTE_RECYCLERS.map((r) => (
              <div key={r.id} className="rounded-xl border border-industrial-800 bg-industrial-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{r.name}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {r.carbonCreditValuePerKg}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{r.address}</p>
                <a
                  href={`tel:${r.phone}`}
                  className="inline-flex items-center text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  <span>Call {r.phone} for Doorstep Pickup</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
