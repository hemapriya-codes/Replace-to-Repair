import React, { useState } from 'react';
import { DiagnosisResult as DiagnosisResultType, DeviceStatus } from '../types';
import { ViabilityCard } from './ViabilityCard';
import { LocalShops } from './LocalShops';
import { CostTrendChart } from './CostTrendChart';
import { 
  Cpu, 
  Eye, 
  Search, 
  Wrench, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Printer, 
  Share2, 
  Calendar, 
  Tag, 
  Clock, 
  Sparkles, 
  Check, 
  Layers, 
  ChevronRight,
  Zap,
  HelpCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { runAIDiagnosis } from '../services/api';

interface DiagnosisResultProps {
  diagnosis: DiagnosisResultType;
  onStatusChange: (newStatus: DeviceStatus) => void;
  onNewScanClick: () => void;
  userLocation: string;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  diagnosis: initialDiagnosis,
  onStatusChange,
  onNewScanClick,
  userLocation,
}) => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisResultType>(initialDiagnosis);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [clarificationInput, setClarificationInput] = useState('');
  const [isUpdatingDiagnosis, setIsUpdatingDiagnosis] = useState(false);

  // Sync when prop updates
  React.useEffect(() => {
    setDiagnosis(initialDiagnosis);
  }, [initialDiagnosis]);

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      const next = [...completedSteps, stepNumber];
      setCompletedSteps(next);
      if (next.length === diagnosis.diyGuidance.steps.length && diagnosis.diyGuidance.steps.length > 0) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#22c55e', '#3b82f6', '#10b981'],
        });
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClarificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationInput.trim()) return;

    setIsUpdatingDiagnosis(true);
    try {
      const combinedSymptoms = `${diagnosis.symptoms}. Additional details: ${clarificationInput}`;
      const updated = await runAIDiagnosis(
        diagnosis.machineLabel,
        combinedSymptoms,
        null,
        diagnosis.imageUrl
      );
      setDiagnosis(updated);
      setClarificationInput('');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981']
      });
    } catch (e) {
      console.error('Failed to update diagnosis:', e);
    } finally {
      setIsUpdatingDiagnosis(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner / Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-industrial-800 bg-industrial-950/80 p-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>ID: {diagnosis.id}</span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {diagnosis.timestamp}
            </span>
            {diagnosis.evidenceSummary && (
              <>
                <span>•</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  diagnosis.evidenceSummary.confidenceScore > 80
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                    : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                }`}>
                  Evidence Score: {diagnosis.evidenceSummary.confidenceScore}%
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">
            {diagnosis.machineLabel}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 italic">
            "{diagnosis.symptoms}"
          </p>
        </div>

        {/* Status Dropdown & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1.5 rounded-xl border border-industrial-800 bg-industrial-900 px-3 py-1.5">
            <span className="text-xs text-slate-400 font-medium">Device Status:</span>
            <select
              value={diagnosis.status}
              onChange={(e) => onStatusChange(e.target.value as DeviceStatus)}
              className={`rounded-lg px-2 py-0.5 text-xs font-bold font-mono uppercase focus:outline-none transition-colors ${
                diagnosis.status === 'Repaired'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                  : diagnosis.status === 'Recycled'
                  ? 'bg-rose-950 text-rose-400 border border-rose-800/80'
                  : 'bg-amber-950 text-amber-400 border border-amber-800/80'
              }`}
            >
              <option value="Repaired">Repaired</option>
              <option value="Recycled">Recycled</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-xl border border-industrial-700 bg-industrial-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-industrial-800 transition-colors"
          >
            <Printer className="h-3.5 w-3.5 text-slate-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onNewScanClick}
            className="flex items-center space-x-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all active:scale-95"
          >
            <span>Scan Another</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Requirement 1: Clarification Request Banner (When evidence is insufficient) */}
      {(diagnosis.needsMoreInfo || (diagnosis.clarificationQuestions && diagnosis.clarificationQuestions.length > 0)) && (
        <div className="rounded-2xl border border-amber-500/50 bg-amber-950/30 p-5 shadow-xl space-y-3">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Additional Details Requested for Higher Certainty
              </h3>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                The current appliance image and symptom description provided limited evidence. To avoid false guesses and distinguish exact components, please review the questions below:
              </p>
            </div>
          </div>

          {diagnosis.clarificationQuestions && (
            <ul className="space-y-1.5 pl-9 text-xs text-amber-200 list-disc font-medium">
              {diagnosis.clarificationQuestions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}

          <form onSubmit={handleClarificationSubmit} className="pt-2 pl-9 flex flex-wrap gap-2">
            <input
              type="text"
              value={clarificationInput}
              onChange={(e) => setClarificationInput(e.target.value)}
              placeholder="e.g. Yes, the turntable motor hums but food stays cold; no error codes..."
              className="flex-1 min-w-[280px] rounded-xl border border-amber-500/40 bg-industrial-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isUpdatingDiagnosis || !clarificationInput.trim()}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isUpdatingDiagnosis ? 'Re-analyzing...' : 'Refine Diagnosis'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Module 2: The Economic Brain (Viability Scorecard) */}
      <ViabilityCard
        viability={diagnosis.viability}
        productMetadata={diagnosis.productMetadata}
        onNavigateShops={() => {
          document.getElementById('local-shops-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateRecyclers={() => {
          document.getElementById('local-shops-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Module 1: AI Diagnostic & Fault Isolation Engine */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Product Metadata & Fault Isolation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Product Metadata Extraction */}
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-industrial-800 pb-3">
              <Cpu className="h-5 w-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">Product Metadata Extraction</h3>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Brand / Make</span>
                <div className="text-sm font-bold text-white mt-1">
                  {diagnosis.productMetadata.brand}
                </div>
              </div>
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Category</span>
                <div className="text-sm font-bold text-brand-300 mt-1">
                  {diagnosis.productMetadata.category}
                </div>
              </div>
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Mfg. Year (Est)</span>
                <div className="text-sm font-bold text-white mt-1">
                  {diagnosis.productMetadata.estimatedYear}
                </div>
              </div>
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Warranty Status</span>
                <div className="text-sm font-bold text-amber-400 mt-1">
                  {diagnosis.productMetadata.warrantyStatus}
                </div>
              </div>
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Expected Lifespan</span>
                <div className="text-sm font-bold text-white mt-1">
                  {diagnosis.productMetadata.expectedLifespanYears} Years
                </div>
              </div>
              <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-3">
                <span className="text-[10px] text-slate-400 uppercase">Appliance Mass</span>
                <div className="text-sm font-bold text-emerald-400 mt-1">
                  {diagnosis.estimatedApplianceWeightKg} kg
                </div>
              </div>
            </div>
          </div>

          {/* Requirement 1: Visible / External Fault Isolation */}
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-emerald-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Visible / External Faults</h3>
                  <p className="text-[11px] text-slate-400">Exterior casing, seals, filters & physical mountings</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded">
                Surface & Optical
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {diagnosis.visibleFaults.length === 0 ? (
                <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-4 text-xs text-slate-400 text-center">
                  No visible exterior fractures or surface damage detected. The appliance casing is intact; the reported defect is an internal/operational failure.
                </div>
              ) : (
                diagnosis.visibleFaults.map((vf, i) => (
                  <div key={i} className="rounded-xl border border-industrial-800 bg-industrial-950 p-3.5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-white font-mono">{vf.component}</span>
                      <div className="flex items-center space-x-1.5">
                        {vf.evidenceSource && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-industrial-900 text-slate-400 border border-industrial-800">
                            {vf.evidenceSource}
                          </span>
                        )}
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            vf.severity === 'High'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                              : vf.severity === 'Medium'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800/80'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                          }`}
                        >
                          {vf.severity} Severity
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">{vf.description}</p>
                    <div className="rounded bg-industrial-900/80 p-2 text-[11px] text-brand-300 border border-brand-900/30">
                      <strong className="text-white">Immediate Fix / Inspection:</strong> {vf.immediateFix}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Requirement 1: Internal / Hidden Fault Isolation */}
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Internal / Hidden Fault Isolation</h3>
                  <p className="text-[11px] text-slate-400">Suspected electrical, mechanical & circuit wear</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                Engineering Probability
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {diagnosis.hiddenFaults.map((hf, i) => (
                <div key={i} className="rounded-xl border border-industrial-800 bg-industrial-950 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{hf.component}</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {hf.probabilityPercent}% Probability
                    </span>
                  </div>

                  {/* Failure Probability Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-industrial-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                      style={{ width: `${hf.probabilityPercent}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-400 font-semibold">Engineering Rationale:</span> {hf.rationale}
                  </p>

                  {hf.verificationMethod && (
                    <p className="text-[11px] text-sky-300 leading-relaxed">
                      <span className="text-slate-400 font-semibold">Verification Method:</span> {hf.verificationMethod}
                    </p>
                  )}

                  <div className="rounded bg-rose-950/40 p-2 text-[11px] text-rose-300 border border-rose-900/40">
                    <strong className="text-rose-200">Risk if ignored:</strong> {hf.riskIfIgnored}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: DIY Guidance & Electrical Safety Warnings (Requirement 2) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-industrial-800 pb-3">
              <div className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-brand-400" />
                <h3 className="text-base font-bold text-white">DIY Repair Guidance</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase font-mono border ${
                    diagnosis.diyGuidance.difficulty === 'Easy'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                      : diagnosis.diyGuidance.difficulty === 'Moderate'
                      ? 'bg-amber-950 text-amber-300 border-amber-800/80'
                      : 'bg-rose-950 text-rose-300 border-rose-800/80'
                  }`}
                >
                  Difficulty: {diagnosis.diyGuidance.difficulty}
                </span>
              </div>
            </div>

            {/* Requirement 2: Electrical Hazard Advisory Alert */}
            {diagnosis.diyGuidance.hasElectricalHazard && (
              <div className="mt-4 rounded-xl border border-rose-500/50 bg-rose-950/30 p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-400">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    ⚡ High-Voltage & Electrical Safety Warning
                  </span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed font-medium">
                  {diagnosis.diyGuidance.electricalSafetyNotice ||
                    'Dangerous electrical voltages detected. Disconnect power immediately. Never open sealed enclosures or touch high-voltage capacitors / immersion elements. Contact a certified technician for internal repairs.'}
                </p>
                <div className="text-[10px] text-rose-300/80 font-mono pt-1">
                  Rule: Ordinary users must only execute non-hazardous exterior checks.
                </div>
              </div>
            )}

            {/* Overall Safety Notice */}
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Mandatory Safety Warning
                </span>
                <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
                  {diagnosis.diyGuidance.overallSafetyNotice}
                </p>
              </div>
            </div>

            {/* Required Household Tools */}
            <div className="mt-4">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                Required Household Tools
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {diagnosis.diyGuidance.requiredTools.map((tool, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-industrial-950 px-2.5 py-1 text-xs text-slate-300 border border-industrial-800 font-mono"
                  >
                    🔧 {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirement 2: Numbered, Beginner-Friendly Steps with Safe/Caution Badges */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Step-by-Step Procedure:</span>
                <span className="font-mono text-brand-400">
                  {completedSteps.length} / {diagnosis.diyGuidance.steps.length} Completed
                </span>
              </div>

              {diagnosis.diyGuidance.steps.length === 0 ? (
                <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-6 text-center text-xs text-slate-400">
                  This appliance failure is classified as hazardous / structural. DIY repair is not recommended. Directing to certified Visakhapatnam technicians.
                </div>
              ) : (
                diagnosis.diyGuidance.steps.map((step) => {
                  const isChecked = completedSteps.includes(step.stepNumber);
                  const isUserSafe = step.userSafe !== false;

                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        isChecked
                          ? 'border-brand-500/40 bg-brand-950/20 shadow-md'
                          : 'border-industrial-800 bg-industrial-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            isChecked
                              ? 'border-brand-500 bg-brand-500 text-black'
                              : 'border-industrial-700 bg-industrial-900 text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h4
                              className={`text-xs font-bold ${
                                isChecked ? 'line-through text-slate-500' : 'text-white'
                              }`}
                            >
                              Step {step.stepNumber}: {step.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {/* Safe for Ordinary Users Badge */}
                              {isUserSafe ? (
                                <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-800/70 font-mono">
                                  ✓ Safe for Beginners
                                </span>
                              ) : (
                                <span className="rounded bg-rose-950 px-1.5 py-0.5 text-[9px] font-bold text-rose-300 border border-rose-800/70 font-mono">
                                  ⚠️ Qualified Tech Only
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.estimatedMinutes}m
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {step.description}
                          </p>

                          {step.safetyWarning && (
                            <div className="rounded bg-rose-950/30 px-2.5 py-1 text-[11px] text-rose-300 border border-rose-900/40 font-mono">
                              ⚠️ {step.safetyWarning}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Module 4: Multi-Year Cost Trend Graph */}
      <CostTrendChart
        data={diagnosis.costTrend}
        category={diagnosis.productMetadata.category}
      />

      {/* Module 3: Local Repair Shop Matching & Geolocation (Requirement 3) */}
      <div id="local-shops-section">
        <LocalShops
          shops={diagnosis.localShops}
          userLocation={userLocation}
          isEndOfLife={diagnosis.viability.tier === 'red'}
          applianceCategory={diagnosis.productMetadata.category}
        />
      </div>
    </div>
  );
};
