import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle, ShieldCheck, Activity, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScannerModalProps {
  isOpen: boolean;
  imageSrc?: string;
  machineLabel: string;
  onScanComplete: () => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  imageSrc,
  machineLabel,
  onScanComplete,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const scanSteps = [
    { title: 'Optical Surface Analysis', detail: 'Inspecting visual chassis wear, rust and stress fractures...' },
    { title: 'Acoustic Fault Isolation', detail: 'Deconstructing user symptom harmonics and rotational noise frequencies...' },
    { title: 'Vizag Regional Parts Index', detail: 'Cross-referencing spare parts pricing in Siripuram & MVP Colony...' },
    { title: 'Economic Brain Formulation', detail: 'Computing Viability Score = 100 - [ (Cost/Price) × 100 × (1 + Age/Life) ]...' },
    { title: 'Diagnosis Finalized', detail: 'Generating component fault isolation & DIY guidance...' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setProgress(0);
      setIsDone(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#22c55e', '#10b981', '#3b82f6', '#f59e0b'],
            });
          } catch (e) {
            // ignore if confetti fails
          }
          return 100;
        }
        const next = prev + 1.8;
        const currentStep = Math.min(
          scanSteps.length - 1,
          Math.floor((next / 100) * scanSteps.length)
        );
        setStepIndex(currentStep);
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-brand-500/30 bg-industrial-950 p-6 shadow-2xl shadow-brand-500/20 text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {!isDone ? (
          <div>
            {/* Appliance Image with Animated Laser Line */}
            <div className="relative mx-auto mb-5 h-48 w-full max-w-xs overflow-hidden rounded-xl border border-industrial-700 bg-industrial-900 shadow-inner">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={machineLabel}
                  className="h-full w-full object-cover filter brightness-90"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-industrial-900 text-slate-500">
                  <Cpu className="h-12 w-12 animate-pulse text-brand-500" />
                </div>
              )}

              {/* Scanning Laser Beam */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_15px_3px_rgba(34,197,94,0.8)] animate-laser" />
              
              {/* Target HUD corners */}
              <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-brand-400" />
              <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-brand-400" />
              <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-brand-400" />
              <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-brand-400" />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-brand-300 border border-brand-500/30">
                SPECTRAL SCAN ACTIVE
              </div>
            </div>

            {/* Title & Telemetry */}
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2 text-brand-400">
                <Activity className="h-4 w-4 animate-spin text-brand-400" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Multimodal Neural Diagnosis
                </span>
              </div>
              <h3 className="text-lg font-bold text-white truncate max-w-sm mx-auto">
                {machineLabel || 'Analyzing Appliance...'}
              </h3>
            </div>

            {/* Progress bar */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between font-mono text-xs text-slate-400">
                <span className="text-slate-300 font-medium">{scanSteps[stepIndex]?.title}</span>
                <span className="text-brand-400 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-industrial-900 border border-industrial-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-brand-400 to-brand-300 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                {scanSteps[stepIndex]?.detail}
              </p>
            </div>
          </div>
        ) : (
          /* Instant popup confirmation matching PRD */
          <div className="py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/40 shadow-xl shadow-brand-500/20">
              <CheckCircle className="h-10 w-10 text-brand-400" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-white">
                Picture captured & analyzed successfully!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Full component isolation, Economic Brain viability score, and localized Visakhapatnam repair recommendations are compiled.
              </p>
            </div>

            <div className="rounded-xl border border-brand-800/40 bg-brand-950/40 p-3 text-left">
              <div className="flex items-center space-x-2 text-xs font-semibold text-brand-300">
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>Quantum Four Diagnostic Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Evaluated against the official <span className="font-mono text-brand-400">Viability Score Index</span> with spare parts pricing indexed across Visakhapatnam.
              </p>
            </div>

            <button
              onClick={onScanComplete}
              className="w-full rounded-xl bg-brand-500 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-brand-500/30 hover:bg-brand-400 transition-all active:scale-95"
            >
              Open Full Diagnostic Report →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
