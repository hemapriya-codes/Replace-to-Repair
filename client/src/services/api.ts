import { DiagnosisResult, LocalRepairShop, EWasteImpactMetrics, DeviceStatus, VisibleFault, HiddenFault, DIYStep } from '../types';
import { INITIAL_DIAGNOSES, VIZAG_LOCAL_SHOPS, INITIAL_EWATE_METRICS, calculateViabilityScore, GENERAL_COST_TREND_BY_CATEGORY } from '../mockData';

const API_BASE = '/api';

// Retrieve stored API key or return empty
export function getSavedGeminiKey(): string {
  return localStorage.getItem('rrr_gemini_api_key') || '';
}

export function saveGeminiKey(key: string): void {
  localStorage.setItem('rrr_gemini_api_key', key.trim());
}

// Retrieve stored history from localStorage or fallback
export function getLocalHistory(): DiagnosisResult[] {
  try {
    const raw = localStorage.getItem('rrr_diagnosis_history');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load local history:', e);
  }
  return INITIAL_DIAGNOSES;
}

export function saveLocalHistory(records: DiagnosisResult[]): void {
  try {
    localStorage.setItem('rrr_diagnosis_history', JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save local history:', e);
  }
}

// Full Diagnosis function
export async function runAIDiagnosis(
  machineLabel: string,
  symptoms: string,
  imageFile?: File | null,
  imagePreviewUrl?: string
): Promise<DiagnosisResult> {
  const userApiKey = getSavedGeminiKey();

  // Try calling backend server first
  try {
    const formData = new FormData();
    formData.append('machineLabel', machineLabel);
    formData.append('symptoms', symptoms);
    if (userApiKey) {
      formData.append('userApiKey', userApiKey);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await fetch(`${API_BASE}/diagnose`, {
      method: 'POST',
      body: formData,
      headers: userApiKey ? { 'x-gemini-key': userApiKey } : undefined,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.diagnosis) {
        // Update local storage history
        const existing = getLocalHistory();
        const updated = [data.diagnosis, ...existing];
        saveLocalHistory(updated);
        return data.diagnosis;
      }
    }
  } catch (serverErr) {
    console.warn('Backend server unreachable or returned error, executing client-side diagnostic engine:', serverErr);
  }

  // Client-side Intelligent Fallback Engine
  // Delays 1.2s to simulate deep neural multi-modal scan
  await new Promise(r => setTimeout(r, 1200));

  const text = `${machineLabel} ${symptoms}`.toLowerCase();
  let category = 'Home Appliance';
  let brand = machineLabel.split(' ')[0] || 'LG';
  let lifespan = 10;
  let newPrice = 24990;
  let repairCost = 2850;
  let currentAge = 3.5;
  let weight = 38;

  let visibleFaults: VisibleFault[] = [
    {
      component: 'Exterior Shock Absorbers & Leveling Mounts',
      description: 'Physical displacement detected. Unbalanced leveling causing severe chassis vibration during high-load cycles.',
      severity: 'Medium',
      immediateFix: 'Level machine chassis with adjustable foot spanner and position on anti-vibration rubber pads.'
    }
  ];

  let hiddenFaults: HiddenFault[] = [
    {
      component: 'Core Drive Rotor & Shaft Seal Bearing',
      probabilityPercent: 78,
      rationale: 'Acoustic pitch and vibration harmonic match classic radial bearing ball race spalling.',
      riskIfIgnored: 'Complete drum lockup, stripping rotor teeth and burning main stator winding.'
    },
    {
      component: 'Damper Suspension Struts',
      probabilityPercent: 62,
      rationale: 'Frictional damping loss in internal hydraulic/silicone chamber.',
      riskIfIgnored: 'Tub strikes front control console assembly during spin cycle.'
    }
  ];

  let diySteps: DIYStep[] = [
    {
      stepNumber: 1,
      title: 'Mains Isolation & Inspection Hatch Removal',
      description: 'Disconnect 230V mains power cord. Unscrew four rear galvanized screws securing the lower inspection panel.',
      safetyWarning: 'Ensure appliance is completely de-energized. Wait 5 minutes for internal capacitors to discharge.',
      toolsRequired: ['Phillips #2 Screwdriver'],
      estimatedMinutes: 5,
    },
    {
      stepNumber: 2,
      title: 'Drive Belt Tension & Pulley Inspection',
      description: 'Inspect drive belt for rubber fraying or loose slack. Deflection at center should not exceed 10mm.',
      toolsRequired: ['Flashlight', 'Gloves'],
      estimatedMinutes: 8,
    },
    {
      stepNumber: 3,
      title: 'Rotor Radial Play Verification & Bearing Replacement',
      description: 'Grasp the drum pulley firmly and wiggle radially. If noticeable play exists with grinding sound, replace sealed ball bearing 6205-2RS.',
      safetyWarning: 'Do not hit aluminum spider shaft with heavy metal hammer; use brass drift.',
      toolsRequired: ['14mm Spanner', 'Bearing Puller'],
      estimatedMinutes: 25,
    }
  ];

  if (text.includes('fridge') || text.includes('refrigerat') || text.includes('cool') || text.includes('freeze')) {
    category = 'Refrigerator';
    brand = machineLabel.split(' ')[0] || 'Samsung';
    lifespan = 12;
    newPrice = 26500;
    repairCost = 1950;
    currentAge = 4;
    weight = 52;
    visibleFaults = [
      {
        component: 'Evaporator Return Air Grille',
        description: 'Frost bridge choke blocking return air passage between freezer and fresh-food cabinet.',
        severity: 'Medium' as const,
        immediateFix: 'Perform 12-hour manual defrost with doors open; clean drip tray at compressor base.'
      }
    ];
    hiddenFaults = [
      {
        component: 'Bimetal Defrost Thermostat & Thermal Fuse',
        probabilityPercent: 86,
        rationale: 'Automatic defrost cycle not terminating properly, allowing ice pack to choke airflow.',
        riskIfIgnored: 'Evaporator fan blade strikes solid ice and burns motor winding.'
      }
    ];
    diySteps = [
      {
        stepNumber: 1,
        title: 'Freezer Back Shroud Removal',
        description: 'Remove 2 screws inside freezer back wall and carefully release molded plastic clips.',
        toolsRequired: ['Phillips Screwdriver'],
        estimatedMinutes: 6,
      },
      {
        stepNumber: 2,
        title: 'Defrost Heater Continuity Measurement',
        description: 'Disconnect 2-pin white harness to defrost heater and measure resistance. Normal: 250 - 350 Ohms.',
        safetyWarning: 'Ensure refrigerator is completely unplugged before touching harness.',
        toolsRequired: ['Digital Multimeter'],
        estimatedMinutes: 6,
      },
      {
        stepNumber: 3,
        title: 'Clip-on Bimetal Sensor Swap',
        description: 'Unclip defective bimetal sensor from copper tube and snap on replacement OEM sensor (approx. ₹380).',
        toolsRequired: ['Pliers'],
        estimatedMinutes: 8,
      }
    ];
  } else if (text.includes('ac') || text.includes('air cond') || text.includes('split')) {
    category = 'Air Conditioner';
    brand = machineLabel.split(' ')[0] || 'Voltas';
    lifespan = 8;
    newPrice = 36000;
    repairCost = 3800;
    currentAge = 4.5;
    weight = 44;
    visibleFaults = [
      {
        component: 'Indoor Evaporator Filter Mesh',
        description: 'Heavy particulate and dust buildup restricting airflow across cooling coils.',
        severity: 'Low' as const,
        immediateFix: 'Slide out dual nylon filters, rinse under lukewarm water with soft brush.'
      }
    ];
    hiddenFaults = [
      {
        component: 'Outdoor Dual Run Capacitor (45µF + 5µF)',
        probabilityPercent: 74,
        rationale: 'Slow outdoor fan rotation and delayed compressor spool-up typical of bulged capacitor.',
        riskIfIgnored: 'Compressor thermal overload protector trips repeatedly until coil fails.'
      }
    ];
  } else if (text.includes('burn') || text.includes('smoke') || text.includes('crack') || text.includes('flood') || text.includes('broken tub')) {
    // End of life condition demonstration
    lifespan = 8;
    newPrice = 28000;
    repairCost = 21000;
    currentAge = 9;
    weight = 65;
    visibleFaults = [
      {
        component: 'Main Structural Tub Casing',
        description: 'Multiple longitudinal fractures with continuous water leakage into electrical harness.',
        severity: 'High' as const,
        immediateFix: 'Cannot be safely repaired. Tub structural integrity is fatally compromised.'
      }
    ];
    hiddenFaults = [
      {
        component: 'Inverter Power Module (IPM) PCB',
        probabilityPercent: 96,
        rationale: 'Direct water ingress has caused explosive short circuit across high-voltage IGBTs.',
        riskIfIgnored: 'Major electrical shock risk and fire hazard.'
      }
    ];
    diySteps = [];
  }

  // Calculate Viability using the Master PRD Formula
  const viabilityRes = calculateViabilityScore(repairCost, newPrice, currentAge, lifespan);

  const costTrend = GENERAL_COST_TREND_BY_CATEGORY[category] || [
    { year: '2023', repairCostINR: Math.round(repairCost * 0.84), replacementCostINR: Math.round(newPrice * 0.88), partsAvailabilityIndex: 91 },
    { year: '2024', repairCostINR: Math.round(repairCost * 0.90), replacementCostINR: Math.round(newPrice * 0.92), partsAvailabilityIndex: 88 },
    { year: '2025', repairCostINR: Math.round(repairCost * 0.96), replacementCostINR: Math.round(newPrice * 0.96), partsAvailabilityIndex: 86 },
    { year: '2026', repairCostINR: repairCost, replacementCostINR: newPrice, partsAvailabilityIndex: 84 },
  ];

  const result: DiagnosisResult = {
    id: `diag-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    machineLabel: machineLabel || 'Household Appliance',
    symptoms: symptoms || 'Diagnosed via live sensor feed',
    imageUrl: imagePreviewUrl || 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    estimatedApplianceWeightKg: weight,
    status: viabilityRes.tier === 'red' ? 'Recycled' : 'Pending',
    productMetadata: {
      brand,
      model: machineLabel,
      category,
      estimatedYear: new Date().getFullYear() - Math.floor(currentAge),
      warrantyStatus: 'Expired',
      expectedLifespanYears: lifespan,
      newEquivalentPriceINR: newPrice,
    },
    visibleFaults,
    hiddenFaults,
    diyGuidance: {
      feasibleForDIY: diySteps.length > 0 && viabilityRes.tier !== 'red',
      difficulty: diySteps.length === 0 ? 'Professional Only' : 'Moderate',
      overallSafetyNotice: 'Disconnect 230V AC mains plug and drain residual water before disassembling any chassis panels.',
      requiredTools: ['10mm & 14mm Spanners', 'Phillips Screwdriver', 'Multimeter', 'Protective Gloves'],
      steps: diySteps,
    },
    viability: {
      score: viabilityRes.score,
      tier: viabilityRes.tier,
      estRepairCostINR: repairCost,
      newEquivalentPriceINR: newPrice,
      currentAgeYears: currentAge,
      expectedLifespanYears: lifespan,
      netSavingsINR: viabilityRes.netSavingsINR,
      summaryRecommendation: viabilityRes.summaryRecommendation,
      formulaDetails: viabilityRes.formulaDetails,
    },
    localShops: viabilityRes.tier === 'red' ? [] : VIZAG_LOCAL_SHOPS.slice(0, 3),
    costTrend,
  };

  const existing = getLocalHistory();
  saveLocalHistory([result, ...existing]);
  return result;
}

// Fetch all local repair shops (Visakhapatnam)
export async function getLocalShops(locality?: string): Promise<LocalRepairShop[]> {
  try {
    const url = locality ? `${API_BASE}/shops?locality=${encodeURIComponent(locality)}` : `${API_BASE}/shops`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Backend shops fetch failed, using local shop database:', e);
  }
  if (locality) {
    return VIZAG_LOCAL_SHOPS.filter(s => s.locality.toLowerCase().includes(locality.toLowerCase()));
  }
  return VIZAG_LOCAL_SHOPS;
}

// Update device status in history
export async function updateRecordStatus(id: string, status: DeviceStatus): Promise<DiagnosisResult[]> {
  try {
    await fetch(`${API_BASE}/history/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    console.warn('Backend update failed, updating local history store:', e);
  }

  const existing = getLocalHistory();
  const updated = existing.map(item => item.id === id ? { ...item, status } : item);
  saveLocalHistory(updated);
  return updated;
}

// Send message to Ask RRR AI Assistant
export async function sendChatMessage(message: string, context?: any): Promise<string> {
  const userApiKey = getSavedGeminiKey();
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(userApiKey ? { 'x-gemini-key': userApiKey } : {})
      },
      body: JSON.stringify({ message, context, userApiKey })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (e) {
    console.warn('Backend chat failed, using expert response generator:', e);
  }

  // Expert Assistant response generator
  const lower = message.toLowerCase();
  if (lower.includes('bearing') || lower.includes('noise') || lower.includes('spin') || lower.includes('rattl')) {
    return `That rattling vibration during high-speed spinning is typically the drum ball bearing (SKF 6205-2RS or 6206-2RS) or the spider shaft assembly. You can pick up an authentic OEM bearing kit for ₹400-₹650 at Gajuwaka Industrial Spares or near Siripuram Junction in Visakhapatnam. Replacing it right now saves ₹21,000+ compared to replacing the entire appliance!`;
  }
  if (lower.includes('cost') || lower.includes('worth') || lower.includes('replace') || lower.includes('formula')) {
    return `Our Economic Brain uses the official formula: Viability Score = 100 - [(Est. Repair Cost / Price of New) × 100 × (1 + Current Age / Expected Lifespan)]. If your score is above 65 (Green), repairing gives an enormous return on investment. If it's below 40 (Red), structural aging means recycling is safer and cleaner!`;
  }
  if (lower.includes('shop') || lower.includes('repairman') || lower.includes('technician') || lower.includes('vizag')) {
    return `In Visakhapatnam, we have verified top-rated partners: Sri Balaji Appliance Care in MVP Colony (4.9⭐, 1.2 km away) and Vizag Tech Care at Siripuram (4.7⭐). Both offer doorstep diagnostics and upfront pricing without hidden charges!`;
  }
  if (lower.includes('recycle') || lower.includes('scrap') || lower.includes('e-waste')) {
    return `For machines that have reached end-of-life (Red Score < 40), we route you directly to APPCB-authorized recyclers in Auto Nagar, Vizag. They safely recover precious metals (copper, aluminum, gold contacts) and ensure zero toxic landfill runoff.`;
  }

  return `Thanks for reaching out to RRR AI Assistant! For "${message}", our diagnostic engine recommends checking the step-by-step DIY instructions in the diagnosis tab or booking a verified technician in MVP Colony or Siripuram. Would you like me to generate a spare parts procurement checklist for you?`;
}
