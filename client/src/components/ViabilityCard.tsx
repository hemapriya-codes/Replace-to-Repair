import React, { useState } from 'react';
import { 
  ViabilityCalculation, 
  ProductMetadata 
} from '../types';
import { 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sliders, 
  ArrowRight, 
  IndianRupee, 
  TrendingUp, 
  RotateCcw 
} from 'lucide-react';
import { calculateViabilityScore } from '../mockData';

interface ViabilityCardProps {
  viability: ViabilityCalculation;
  productMetadata: ProductMetadata;
  onNavigateRecyclers?: () => void;
  onNavigateShops?: () => void;
}

export const ViabilityCard: React.FC<ViabilityCardProps> = ({
  viability: initialViability,
  productMetadata,
  onNavigateRecyclers,
  onNavigateShops,
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  // Interactive slider overrides
  const [estCost, setEstCost] = useState(initialViability.estRepairCostINR);
  const [currentAge, setCurrentAge] = useState(initialViability.currentAgeYears);
  const [newPrice, setNewPrice] = useState(productMetadata.newEquivalentPriceINR || 25000);
  const [lifespan, setLifespan] = useState(productMetadata.expectedLifespanYears || 10);

  // Compute live when interactive
  const currentViability = isInteractive
    ? calculateViabilityScore(estCost, newPrice, currentAge, lifespan)
    : {
        score: initialViability.score,
        tier: initialViability.tier,
        netSavingsINR: initialViability.netSavingsINR,
        summaryRecommendation: initialViability.summaryRecommendation,
        formulaDetails: initialViability.formulaDetails,
      };

  const getTierStyles = (tier: 'green' | 'yellow' | 'red') => {
    switch (tier) {
      case 'green':
        return {
          bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          accent: 'text-emerald-400',
          icon: CheckCircle2,
          label: 'HIGH REPAIR VIABILITY',
          decision: 'Repair First',
          barColor: 'from-emerald-500 to-brand-400',
        };
      case 'yellow':
        return {
          bg: 'bg-amber-950/40 border-amber-500/40 text-amber-300',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          accent: 'text-amber-400',
          icon: AlertTriangle,
          label: 'MODERATE VIABILITY',
          decision: 'Budget / DIY Intervention Only',
          barColor: 'from-amber-500 to-yellow-400',
        };
      case 'red':
        return {
          bg: 'bg-rose-950/40 border-rose-500/40 text-rose-300',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          accent: 'text-rose-400',
          icon: XCircle,
          label: 'END OF LIFE (REPLACE & RECYCLE)',
          decision: 'Route to E-Waste Recycler',
          barColor: 'from-rose-600 to-red-400',
        };
    }
  };

  const tierStyle = getTierStyles(currentViability.tier);
  const TierIcon = tierStyle.icon;

  const resetInteractive = () => {
    setEstCost(initialViability.estRepairCostINR);
    setCurrentAge(initialViability.currentAgeYears);
    setNewPrice(productMetadata.newEquivalentPriceINR || 25000);
    setLifespan(productMetadata.expectedLifespanYears || 10);
    setIsInteractive(false);
  };

  return (
    <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
      {/* Header with Title and Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-industrial-800/80 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>The Economic Brain</span>
              <span className="text-[10px] font-mono font-normal uppercase tracking-wider text-slate-400 bg-industrial-800 px-2 py-0.5 rounded">
                Feasibility Index
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Algorithmic Repair vs. Replace Mathematical Scorecard
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isInteractive && (
            <button
              onClick={resetInteractive}
              className="flex items-center space-x-1 rounded-lg border border-industrial-700 bg-industrial-800/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
              title="Reset to AI estimate"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              isInteractive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'border border-industrial-700 bg-industrial-800 text-slate-300 hover:text-white'
            }`}
          >
            <Sliders className="h-3 w-3" />
            <span>{isInteractive ? 'Interactive Mode ON' : 'Tweak Parameters'}</span>
          </button>
        </div>
      </div>

      {/* Main Score & Decision Row */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12 items-center">
        {/* Score Dial & Status */}
        <div className="md:col-span-5 flex flex-col items-center justify-center rounded-xl border border-industrial-800 bg-industrial-950/70 p-5 text-center relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${tierStyle.badgeBg}`}>
              <TierIcon className="h-3 w-3 mr-1" />
              {currentViability.tier.toUpperCase()} TIER
            </span>
          </div>

          <div className="relative mt-2 flex items-center justify-center">
            <div className={`text-6xl font-black font-mono tracking-tight ${tierStyle.accent}`}>
              {currentViability.score}
            </div>
            <span className="text-xl font-bold text-slate-500 ml-1">/100</span>
          </div>

          <div className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-200">
            {tierStyle.label}
          </div>

          {/* Color-Coded Progress Meter */}
          <div className="mt-3 w-full space-y-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-industrial-800/80">
              <div
                className={`h-full bg-gradient-to-r ${tierStyle.barColor} transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(5, currentViability.score))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span className="text-rose-400">0 (Recycle)</span>
              <span className="text-amber-400">40 (Moderate)</span>
              <span className="text-emerald-400">65+ (High)</span>
            </div>
          </div>
        </div>

        {/* Financial Metrics & Recommendation */}
        <div className="md:col-span-7 space-y-3.5">
          {/* Net Monetary Savings Card */}
          <div className={`rounded-xl border p-4 ${tierStyle.bg} transition-colors`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Net Monetary Value Impact
              </span>
              <TrendingUp className="h-4 w-4 text-brand-400" />
            </div>

            <div className="mt-1.5 flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">
                ₹{currentViability.netSavingsINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {currentViability.score >= 40 ? 'Saved vs. buying new' : 'Deficit if repaired'}
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {currentViability.summaryRecommendation}
            </p>
          </div>

          {/* Quick Metrics Matrix */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="rounded-lg border border-industrial-800 bg-industrial-950/60 p-2.5">
              <span className="text-[10px] text-slate-400 uppercase">Est. Repair Cost</span>
              <div className="text-sm font-bold text-white mt-0.5">
                ₹{estCost.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="rounded-lg border border-industrial-800 bg-industrial-950/60 p-2.5">
              <span className="text-[10px] text-slate-400 uppercase">Price of New Equivalent</span>
              <div className="text-sm font-bold text-white mt-0.5">
                ₹{newPrice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Next Recommended Step */}
          {currentViability.tier === 'red' ? (
            <button
              onClick={onNavigateRecyclers}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-all"
            >
              <span>Connect with APPCB Authorized Recyclers in Auto Nagar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={onNavigateShops}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
            >
              <span>View Local Repair Techs in Visakhapatnam</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive What-If Sliders */}
      {isInteractive && (
        <div className="mt-5 rounded-xl border border-brand-500/30 bg-industrial-950/90 p-4 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-industrial-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center space-x-1.5">
              <Sliders className="h-3.5 w-3.5 text-brand-400" />
              <span>Interactive Parameter Simulator</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Live Mathematical Recalculation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Repair Cost Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Estimated Repair Quote:</span>
                <span className="font-mono font-bold text-brand-400">₹{estCost.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={500}
                max={Math.min(50000, newPrice * 1.2)}
                step={250}
                value={estCost}
                onChange={(e) => setEstCost(Number(e.target.value))}
                className="w-full accent-brand-500 bg-industrial-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>₹500 (DIY)</span>
                <span>₹{Math.round(newPrice).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Current Age Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Current Machine Age:</span>
                <span className="font-mono font-bold text-brand-400">{currentAge} Years</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={15}
                step={0.5}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-brand-500 bg-industrial-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>6 Months</span>
                <span>15 Years</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Mathematical Breakdown */}
      <div className="mt-4 pt-3 border-t border-industrial-800/80">
        <button
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-brand-300 transition-colors"
        >
          <span className="font-mono">Formula: Viability = 100 - [ (Cost/Price) × 100 × (1 + Age/Life) ]</span>
          <span className="text-[10px] font-semibold text-brand-400 underline ml-2">
            {showFormulaDetails ? 'Hide computation steps' : 'View computation breakdown'}
          </span>
        </button>

        {showFormulaDetails && (
          <div className="mt-3 rounded-xl border border-industrial-800 bg-industrial-950 p-3.5 font-mono text-[11px] text-slate-300 space-y-2">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              PRD Formula Step-by-Step Execution:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-industrial-900/60 p-2.5 rounded-lg">
              <div>
                <span className="text-slate-400 text-[10px] block">1. Cost Ratio</span>
                <span className="font-bold text-white">
                  ({estCost} / {newPrice}) × 100 = {currentViability.formulaDetails.costRatio}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">2. Age Multiplier</span>
                <span className="font-bold text-white">
                  1 + ({currentAge} / {lifespan}) = {currentViability.formulaDetails.ageMultiplier}×
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">3. Total Penalty</span>
                <span className="font-bold text-rose-400">
                  {currentViability.formulaDetails.costRatio} × {currentViability.formulaDetails.ageMultiplier} = {currentViability.formulaDetails.penalty}
                </span>
              </div>
            </div>
            <div className="text-right text-xs font-bold text-brand-400 pt-1">
              Final Score: 100 - {currentViability.formulaDetails.penalty} = {currentViability.score} / 100
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
