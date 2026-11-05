import { DiagnosisResult, LocalRepairShop, EWasteImpactMetrics, DeviceStatus, VisibleFault, HiddenFault, DIYStep } from '../types';
import { INITIAL_DIAGNOSES, VIZAG_LOCAL_SHOPS, INITIAL_EWATE_METRICS, calculateViabilityScore, GENERAL_COST_TREND_BY_CATEGORY } from '../mockData';
import { APPLIANCE_CATEGORIES, findApplianceCategory, checkEvidenceSufficiency } from '../data/applianceCatalog';

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
  imagePreviewUrl?: string,
  applianceCategoryId?: string
): Promise<DiagnosisResult> {
  const userApiKey = getSavedGeminiKey();
  const hasImage = !!(imageFile || imagePreviewUrl);

  // Determine appliance category from catalog
  let applianceCat = applianceCategoryId
    ? APPLIANCE_CATEGORIES.find(c => c.id === applianceCategoryId) || findApplianceCategory(machineLabel + ' ' + symptoms)
    : findApplianceCategory(machineLabel + ' ' + symptoms);

  // Try calling backend server first
  try {
    const formData = new FormData();
    formData.append('machineLabel', machineLabel);
    formData.append('symptoms', symptoms);
    formData.append('applianceCategory', applianceCat.name);
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
  const brand = machineLabel.split(' ')[0] || applianceCat.popularBrands[0] || 'Generic';

  // 1. Check evidence sufficiency
  const evidenceCheck = checkEvidenceSufficiency(symptoms, hasImage);
  const needsMoreInfo = !evidenceCheck.isSufficient;

  // 2. Find matching fault profile within appliance category
  let matchedProfile = applianceCat.defaultFaults.find(fp =>
    fp.keywords.some(kw => text.includes(kw))
  );

  if (!matchedProfile) {
    matchedProfile = applianceCat.defaultFaults[0];
  }

  // 3. Generate diagnosis specific to this appliance and fault
  const diagData = matchedProfile.generateDiagnosis({
    label: machineLabel,
    symptoms,
    hasImage,
    brand
  });

  const currentYear = new Date().getFullYear();
  const currentAge = 3.5;
  const lifespan = diagData.lifespanYears;
  const newPrice = diagData.newPriceINR;
  const repairCost = diagData.estRepairCostINR;
  const weight = diagData.weightKg;

  // 4. Calculate Viability using the Economic Brain Formula
  const viabilityRes = calculateViabilityScore(repairCost, newPrice, currentAge, lifespan);

  const costTrend = GENERAL_COST_TREND_BY_CATEGORY[applianceCat.name] ||
    GENERAL_COST_TREND_BY_CATEGORY[applianceCat.shortName] || [
    { year: '2023', repairCostINR: Math.round(repairCost * 0.84), replacementCostINR: Math.round(newPrice * 0.88), partsAvailabilityIndex: 91 },
    { year: '2024', repairCostINR: Math.round(repairCost * 0.90), replacementCostINR: Math.round(newPrice * 0.92), partsAvailabilityIndex: 88 },
    { year: '2025', repairCostINR: Math.round(repairCost * 0.96), replacementCostINR: Math.round(newPrice * 0.96), partsAvailabilityIndex: 86 },
    { year: '2026', repairCostINR: repairCost, replacementCostINR: newPrice, partsAvailabilityIndex: 84 },
  ];

  // 5. Filter local shops that support this appliance type
  const matchedShops = VIZAG_LOCAL_SHOPS.filter(shop =>
    shop.supportedAppliances.some(sa =>
      sa.toLowerCase().includes(applianceCat.name.toLowerCase()) ||
      sa.toLowerCase().includes(applianceCat.shortName.toLowerCase()) ||
      applianceCat.name.toLowerCase().includes(sa.toLowerCase())
    )
  );

  const relevantShops = matchedShops.length > 0
    ? matchedShops.slice(0, 4)
    : VIZAG_LOCAL_SHOPS.slice(0, 3);

  const result: DiagnosisResult = {
    id: `diag-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    machineLabel: machineLabel || `${applianceCat.name} (${brand})`,
    symptoms: symptoms || 'Diagnosed via live sensor feed',
    imageUrl: imagePreviewUrl || (hasImage ? undefined : 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80'),
    estimatedApplianceWeightKg: weight,
    status: viabilityRes.tier === 'red' ? 'Recycled' : 'Pending',
    needsMoreInfo,
    clarificationQuestions: needsMoreInfo ? applianceCat.clarificationQuestions : undefined,
    evidenceSummary: {
      hasImage,
      descriptionQuality: evidenceCheck.quality,
      confidenceScore: needsMoreInfo ? 42 : hasImage ? 94 : 81,
    },
    productMetadata: {
      brand,
      model: machineLabel,
      category: applianceCat.name,
      estimatedYear: currentYear - Math.floor(currentAge),
      warrantyStatus: 'Expired',
      expectedLifespanYears: lifespan,
      newEquivalentPriceINR: newPrice,
    },
    visibleFaults: diagData.visibleFaults,
    hiddenFaults: diagData.hiddenFaults,
    diyGuidance: diagData.diyGuidance,
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
    localShops: viabilityRes.tier === 'red' ? [] : relevantShops,
    costTrend,
  };

  const existing = getLocalHistory();
  saveLocalHistory([result, ...existing]);
  return result;
}

// Fetch all local repair shops (Visakhapatnam) with optional locality and appliance filters
export async function getLocalShops(locality?: string, appliance?: string): Promise<LocalRepairShop[]> {
  try {
    const params = new URLSearchParams();
    if (locality && !locality.includes('All Regions')) params.append('locality', locality);
    if (appliance) params.append('appliance', appliance);
    const queryString = params.toString() ? `?${params.toString()}` : '';

    const res = await fetch(`${API_BASE}/shops${queryString}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Backend shops fetch failed, using local shop database:', e);
  }

  let list = VIZAG_LOCAL_SHOPS;
  if (locality && !locality.includes('All Regions')) {
    const cleanLoc = locality.toLowerCase().replace(', visakhapatnam', '').replace('visakhapatnam', '').trim();
    list = list.filter(s => s.locality.toLowerCase().includes(cleanLoc));
  }
  if (appliance) {
    const cleanApp = appliance.toLowerCase();
    list = list.filter(s => s.supportedAppliances.some(a => a.toLowerCase().includes(cleanApp) || cleanApp.includes(a.toLowerCase())));
  }
  return list;
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
