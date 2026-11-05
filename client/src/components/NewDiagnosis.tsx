import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Cpu, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { ScannerModal } from './ScannerModal';
import { runAIDiagnosis } from '../services/api';
import { DiagnosisResult } from '../types';

interface NewDiagnosisProps {
  onDiagnosisCompleted: (result: DiagnosisResult) => void;
  userLocation: string;
}

export const NewDiagnosis: React.FC<NewDiagnosisProps> = ({
  onDiagnosisCompleted,
  userLocation,
}) => {
  const [machineLabel, setMachineLabel] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [pendingResult, setPendingResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick Demo Presets
  const demoPresets = [
    {
      title: 'LG Top-Load Washing Machine',
      symptoms: 'Loud rattling noise during spin cycle, violent drum wobble against chassis',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
      badge: 'Green Tier Demo',
      badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
    },
    {
      title: 'Samsung 253L Digital Inverter Refrigerator',
      symptoms: 'Freezer freezing fine but lower vegetable compartment is warm; back panel iced up',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
      badge: 'Green Tier Demo',
      badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
    },
    {
      title: 'Voltas 1.5 Ton Split AC',
      symptoms: 'Blower running smoothly but weak cooling; outdoor condenser fan turns sluggishly',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80',
      badge: 'Yellow Tier Demo',
      badgeColor: 'text-amber-400 bg-amber-950 border-amber-800',
    },
    {
      title: 'IFB Front-Load Washing Machine (9 Years Old)',
      symptoms: 'Error E02, acrid burning smell, outer tub cracked and leaking water, rusted frame',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
      badge: 'Red Tier (Recycle Demo)',
      badgeColor: 'text-rose-400 bg-rose-950 border-rose-800',
    },
  ];

  const applyPreset = (preset: typeof demoPresets[0]) => {
    setMachineLabel(preset.title);
    setSymptoms(preset.symptoms);
    setImagePreview(preset.image);
    setSelectedImage(null);
    setErrorMsg(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineLabel.trim()) {
      setErrorMsg('Please specify the machine label or model (e.g., LG Top-Load Washing Machine).');
      return;
    }
    if (!symptoms.trim()) {
      setErrorMsg('Please describe the live symptoms observed.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      // Trigger API call
      const result = await runAIDiagnosis(
        machineLabel,
        symptoms,
        selectedImage,
        imagePreview || undefined
      );
      setPendingResult(result);
      // Trigger animated scan modal
      setIsScanning(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Diagnosis failed. Please check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanFinished = () => {
    setIsScanning(false);
    if (pendingResult) {
      onDiagnosisCompleted(pendingResult);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="border-b border-industrial-800 pb-4">
        <div className="flex items-center space-x-2 text-brand-400 text-xs font-mono font-semibold uppercase">
          <Cpu className="h-4 w-4" />
          <span>Multimodal Diagnostic Suite</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white mt-1">
          New AI Appliance Diagnosis
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect visual component degradation, isolate hidden failure modes, and compute real-time Economic Brain viability.
        </p>
      </div>

      {/* Preset Quick Loaders */}
      <div className="rounded-2xl border border-industrial-800 bg-industrial-950/60 p-4">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
            <Zap className="h-3.5 w-3.5 text-brand-400" />
            <span>Instant Benchmark Presets (1-Click Test)</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Indexed for Visakhapatnam
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {demoPresets.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-left rounded-xl border border-industrial-800 bg-industrial-900/80 p-3 hover:border-brand-500/50 hover:bg-industrial-800 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${preset.badgeColor}`}>
                  {preset.badge}
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-2 group-hover:text-brand-300 transition-colors truncate">
                {preset.title}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                {preset.symptoms}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Input Form */}
      <form onSubmit={handleRunDiagnosis} className="space-y-6">
        {/* Step 1: Image Upload / Capture */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-brand-400 font-bold tracking-wider">
                Step 1 of 3
              </span>
              <h3 className="text-base font-bold text-white">Appliance Photo / Visual Evidence</h3>
            </div>
            <span className="text-xs text-slate-400">Computer Vision Analysis</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative rounded-xl border border-industrial-700 bg-industrial-950 overflow-hidden h-64 max-w-lg mx-auto group">
              <img
                src={imagePreview}
                alt="Appliance Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg bg-industrial-800/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-industrial-700"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedImage(null);
                  }}
                  className="rounded-lg bg-rose-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
                >
                  Remove
                </button>
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                Visual Ready for Neural Inspection
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-industrial-700 hover:border-brand-500/60 rounded-xl p-8 text-center cursor-pointer bg-industrial-950/50 hover:bg-industrial-950 transition-all group"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-industrial-800 group-hover:bg-brand-500/20 text-slate-400 group-hover:text-brand-400 transition-colors">
                <Camera className="h-7 w-7" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                Drag and drop machine photo, or <span className="text-brand-400 underline">browse file</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports JPG, PNG, WEBP (Photo of exterior, label plate, or damaged section)
              </p>
            </div>
          )}
        </div>

        {/* Step 2: Machine Label / Model */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-400 font-bold tracking-wider">
              Step 2 of 3
            </span>
            <h3 className="text-base font-bold text-white">Machine Label / Model Specification</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify brand, capacity, or model code if known (e.g., <em>LG Top-Load Washing Machine 7kg</em>).
            </p>
          </div>

          <input
            type="text"
            value={machineLabel}
            onChange={(e) => setMachineLabel(e.target.value)}
            placeholder="e.g. LG Top-Load Washing Machine (T70SJSF1Z)"
            required
            className="w-full rounded-xl border border-industrial-700 bg-industrial-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all font-mono"
          />
        </div>

        {/* Step 3: User Message Box (Live Symptoms) */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-400 font-bold tracking-wider">
              Step 3 of 3
            </span>
            <h3 className="text-base font-bold text-white">Observed Symptoms & Fault Description</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Describe auditory cues, error codes, leaks, or performance abnormalities.
            </p>
          </div>

          <textarea
            rows={4}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Loud rattling metallic noise during high-speed spin cycle, mild burning smell, water leaking from rear drain pipe..."
            required
            className="w-full rounded-xl border border-industrial-700 bg-industrial-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all leading-relaxed"
          />
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="flex items-center space-x-2 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-600 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-brand-500/25 hover:from-brand-500 hover:to-emerald-500 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5" />
            <span>{isLoading ? 'Processing Neural Scan...' : 'Run AI Diagnosis'}</span>
          </button>
          <p className="text-center text-[11px] text-slate-500 mt-2 font-mono">
            Powered by Google Gemini Multimodal Engine • Indexed for Visakhapatnam, IN
          </p>
        </div>
      </form>

      {/* Animated Scan Modal Overlay */}
      <ScannerModal
        isOpen={isScanning}
        imageSrc={imagePreview || undefined}
        machineLabel={machineLabel}
        onScanComplete={handleScanFinished}
      />
    </div>
  );
};
