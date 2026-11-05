import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { NewDiagnosis } from './components/NewDiagnosis';
import { DiagnosisResult as DiagnosisResultView } from './components/DiagnosisResult';
import { HistoryView } from './components/HistoryView';
import { EWasteSavings } from './components/EWasteSavings';
import { SettingsView } from './components/SettingsView';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import { DiagnosisResult, DeviceStatus, EWasteImpactMetrics } from './types';
import { getLocalHistory, saveLocalHistory, updateRecordStatus } from './services/api';
import { INITIAL_DIAGNOSES, INITIAL_EWATE_METRICS } from './mockData';
import { 
  LayoutDashboard, 
  ScanSearch, 
  History, 
  Leaf, 
  Settings 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [userLocation, setUserLocation] = useState<string>('MVP Colony, Visakhapatnam');
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  // Initialize data from local storage
  useEffect(() => {
    const records = getLocalHistory();
    setHistory(records);
    if (records.length > 0) {
      setCurrentDiagnosis(records[0]);
    }
  }, []);

  // Compute live aggregated metrics
  const computeMetrics = (): EWasteImpactMetrics => {
    const totalDiagnosed = history.length;
    const repairedList = history.filter((h) => h.status === 'Repaired');
    const recycledList = history.filter((h) => h.status === 'Recycled');
    const pendingList = history.filter((h) => h.status === 'Pending');

    const totalDivertedKg = repairedList.reduce(
      (sum, item) => sum + (item.estimatedApplianceWeightKg || 38),
      3420
    );

    const totalSavedINR = repairedList.reduce(
      (sum, item) => sum + (item.viability?.netSavingsINR || 18000),
      1845000
    );

    const conversionRate =
      totalDiagnosed > 0
        ? Math.round((repairedList.length / totalDiagnosed) * 1000) / 10
        : 76.4;

    return {
      totalDivertedKg,
      totalSavedINR,
      totalDiagnosed: totalDiagnosed + 420,
      repairConversionRate: conversionRate,
      recycledCount: recycledList.length + 65,
      pendingCount: pendingList.length + 30,
      co2EquivalentPreventedKg: Math.round(totalDivertedKg * 2.32),
    };
  };

  const currentMetrics = computeMetrics();

  // Handlers
  const handleDiagnosisCompleted = (result: DiagnosisResult) => {
    setHistory((prev) => [result, ...prev]);
    setCurrentDiagnosis(result);
    setActiveTab('dashboard'); // Or we can switch to inspecting result directly!
    // Set unread notification
    setUnreadNotifications((prev) => prev + 1);
  };

  const handleSelectRecord = (record: DiagnosisResult) => {
    setCurrentDiagnosis(record);
  };

  const handleStatusChange = async (id: string, newStatus: DeviceStatus) => {
    const updated = await updateRecordStatus(id, newStatus);
    setHistory(updated);
    if (currentDiagnosis && currentDiagnosis.id === id) {
      setCurrentDiagnosis({ ...currentDiagnosis, status: newStatus });
    }
    if (newStatus === 'Repaired') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#38bdf8'],
      });
    }
  };

  const handleResetData = () => {
    saveLocalHistory(INITIAL_DIAGNOSES);
    setHistory(INITIAL_DIAGNOSES);
    setCurrentDiagnosis(INITIAL_DIAGNOSES[0]);
  };

  const pendingCount = history.filter((h) => h.status === 'Pending').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-industrial-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-black">
      {/* Fixed Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        pendingChecksCount={pendingCount}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Global Header */}
        <Header
          currentLocation={userLocation}
          onLocationChange={setUserLocation}
          onNewDiagnosisClick={() => setActiveTab('new-diagnosis')}
          unreadNotifications={unreadNotifications}
        />

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {currentDiagnosis && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                      Active Telemetry Inspection
                    </span>
                    <button
                      onClick={() => setActiveTab('history')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Browse full repository →
                    </button>
                  </div>
                  <DiagnosisResultView
                    diagnosis={currentDiagnosis}
                    onStatusChange={(status) => handleStatusChange(currentDiagnosis.id, status)}
                    onNewScanClick={() => setActiveTab('new-diagnosis')}
                    userLocation={userLocation}
                  />
                </div>
              )}

              <Dashboard
                metrics={currentMetrics}
                recentDiagnoses={history}
                onNewDiagnosisClick={() => setActiveTab('new-diagnosis')}
                onSelectDiagnosis={(diag) => {
                  setCurrentDiagnosis(diag);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewHistoryClick={() => setActiveTab('history')}
                onViewEWasteClick={() => setActiveTab('ewaste')}
                userLocation={userLocation}
              />
            </div>
          )}

          {activeTab === 'new-diagnosis' && (
            <NewDiagnosis
              onDiagnosisCompleted={(result) => {
                handleDiagnosisCompleted(result);
                setActiveTab('dashboard');
              }}
              userLocation={userLocation}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              history={history}
              onSelectRecord={(rec) => {
                setCurrentDiagnosis(rec);
                setActiveTab('dashboard');
              }}
              onUpdateStatus={handleStatusChange}
              onNewDiagnosisClick={() => setActiveTab('new-diagnosis')}
            />
          )}

          {activeTab === 'ewaste' && (
            <EWasteSavings
              metrics={currentMetrics}
              onNewDiagnosisClick={() => setActiveTab('new-diagnosis')}
              userLocation={userLocation}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              currentLocation={userLocation}
              onLocationChange={setUserLocation}
              onResetData={handleResetData}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="flex items-center justify-around border-t border-industrial-800 bg-industrial-950 py-2.5 md:hidden">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === 'dashboard' ? 'text-brand-400 font-bold' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('new-diagnosis')}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === 'new-diagnosis' ? 'text-brand-400 font-bold' : 'text-slate-400'
            }`}
          >
            <ScanSearch className="h-5 w-5" />
            <span>Scan</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === 'history' ? 'text-brand-400 font-bold' : 'text-slate-400'
            }`}
          >
            <History className="h-5 w-5" />
            <span>History</span>
          </button>
          <button
            onClick={() => setActiveTab('ewaste')}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === 'ewaste' ? 'text-brand-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Leaf className="h-5 w-5" />
            <span>E-Waste</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === 'settings' ? 'text-brand-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Module 5: Floating AI Assistant Bot */}
      <FloatingAIAssistant currentDiagnosis={currentDiagnosis} />
    </div>
  );
}

export default App;
