import React, { useState, useEffect } from 'react';
import { 
  Key, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Cpu, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { getSavedGeminiKey, saveGeminiKey } from '../services/api';
import confetti from 'canvas-confetti';

interface SettingsViewProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLocation,
  onLocationChange,
  onResetData,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setApiKey(getSavedGeminiKey());
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    saveGeminiKey(apiKey);
    setSavedSuccess(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const vizagZones = [
    'Visakhapatnam, IN (All Regions)',
    'MVP Colony, Visakhapatnam',
    'Madhurawada, Visakhapatnam',
    'Siripuram, Visakhapatnam',
    'Dwaraka Nagar, Visakhapatnam',
    'Gajuwaka, Visakhapatnam',
    'Rushikonda, Visakhapatnam'
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-industrial-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">System Settings & API Proxy</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure Google Gemini AI credentials, local Visakhapatnam service zone, and data persistence
        </p>
      </div>

      {/* Google Gemini API Credentials */}
      <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-brand-400" />
            <h3 className="text-base font-bold text-white">Google Gemini API Configuration</h3>
          </div>
          <span className="text-[10px] font-mono text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800/80">
            gemini-2.5-flash
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Project RRR utilizes <strong>gemini-2.5-flash</strong> for visual fault identification, acoustic harmonic isolation, and repair cost estimation. You can supply your own API key from Google AI Studio, or leave blank to utilize our intelligent offline rule engine.
        </p>

        <form onSubmit={handleSaveKey} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google AI Studio API Key (GEMINI_API_KEY)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-industrial-700 bg-industrial-950 px-4 py-2.5 font-mono text-xs text-white placeholder-slate-600 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              <span>Obtain free API key from Google AI Studio</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/30 hover:bg-brand-500 transition-all active:scale-95"
            >
              {savedSuccess ? <Check className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <span>{savedSuccess ? 'API Key Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Default Service Location */}
      <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-industrial-800 pb-3">
          <MapPin className="h-5 w-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Default Geolocation Hub</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Sets your default neighborhood in Visakhapatnam to calculate distances, technician dispatch fees, and APPCB recycler routes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {vizagZones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => onLocationChange(zone)}
              className={`text-left rounded-xl p-3 text-xs font-medium border transition-all ${
                currentLocation === zone
                  ? 'bg-brand-950 text-brand-300 border-brand-500 font-bold shadow-md shadow-brand-950'
                  : 'bg-industrial-950 text-slate-300 border-industrial-800 hover:border-slate-700'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Diagnostics Data */}
      <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 border-b border-industrial-800 pb-3">
          <RotateCcw className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Reset Benchmark Data</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Restore default benchmark diagnostics (LG washing machine, Samsung refrigerator, Voltas AC, IFB recycler case).
        </p>

        <button
          onClick={() => {
            if (confirm('Reset diagnostic history to default sample logs?')) {
              onResetData();
            }
          }}
          className="rounded-xl border border-industrial-700 bg-industrial-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-industrial-800 transition-colors"
        >
          Reset to Factory Benchmarks
        </button>
      </div>

      {/* Project PRD Credits & Team Quantum Four */}
      <div className="rounded-2xl border border-industrial-800 bg-industrial-950 p-5 space-y-2 text-xs text-slate-400 font-mono">
        <div className="text-white font-bold">Project RRR (Repair First, Replace Last)</div>
        <div>Team: Quantum Four • Visakhapatnam, Andhra Pradesh, India</div>
        <div>PRD Specification Version: 2.0 (Master Comprehensive Specification)</div>
        <div className="text-slate-500 text-[11px] pt-1 border-t border-industrial-900">
          Target Audience: Urban middle-class households, working professionals, and student renters worldwide.
        </div>
      </div>
    </div>
  );
};
