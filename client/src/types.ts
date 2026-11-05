export type ViabilityTier = 'green' | 'yellow' | 'red';
export type DeviceStatus = 'Repaired' | 'Recycled' | 'Pending';

export interface ProductMetadata {
  brand: string;
  model: string;
  category: string;
  estimatedYear: number;
  warrantyStatus: 'Active' | 'Expired' | 'Unknown';
  expectedLifespanYears: number;
  newEquivalentPriceINR: number;
}

export interface VisibleFault {
  component: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  immediateFix: string;
  evidenceSource?: 'Visual Inspection (Image)' | 'User Description' | 'Both Image & Symptoms' | 'Operational Inference';
  confidence?: 'Confirmed' | 'Suspected' | 'Needs Clarification';
}

export interface HiddenFault {
  component: string;
  probabilityPercent: number;
  rationale: string;
  riskIfIgnored: string;
  verificationMethod?: string;
}

export interface DIYStep {
  stepNumber: number;
  title: string;
  description: string;
  safetyWarning?: string;
  toolsRequired: string[];
  estimatedMinutes: number;
  userSafe?: boolean; // Explicitly designates whether step is safe for ordinary users
  skillLevel?: 'Beginner-Friendly' | 'Moderate' | 'Professional Only';
}

export interface ViabilityCalculation {
  score: number;
  tier: ViabilityTier;
  estRepairCostINR: number;
  newEquivalentPriceINR: number;
  currentAgeYears: number;
  expectedLifespanYears: number;
  netSavingsINR: number;
  summaryRecommendation: string;
  formulaDetails: {
    costRatio: number;
    ageMultiplier: number;
    penalty: number;
  };
}

export interface LocalRepairShop {
  id: string;
  name: string;
  locality: string; // e.g. "MVP Colony", "Madhurawada", "Dwaraka Nagar", "Siripuram"
  distanceKm: number;
  rating: number;
  reviewCount: number;
  estimatedServiceCostINR: number;
  phone: string;
  address: string;
  specialties: string[];
  supportedAppliances: string[];
  status: 'Open' | 'Closed' | 'Temporarily Unavailable';
  openingHours?: string;
  isSampleData: boolean; // Explicitly designates prototype sample data
  verified: boolean;
  isOpenNow: boolean;
}

export interface CostTrendPoint {
  year: string;
  repairCostINR: number;
  replacementCostINR: number;
  partsAvailabilityIndex: number; // 0-100
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  machineLabel: string;
  symptoms: string;
  imageUrl?: string;
  productMetadata: ProductMetadata;
  visibleFaults: VisibleFault[];
  hiddenFaults: HiddenFault[];
  diyGuidance: {
    feasibleForDIY: boolean;
    difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Professional Only';
    overallSafetyNotice: string;
    requiredTools: string[];
    steps: DIYStep[];
    hasElectricalHazard?: boolean;
    electricalSafetyNotice?: string;
    technicianRequired?: boolean;
  };
  viability: ViabilityCalculation;
  localShops: LocalRepairShop[];
  costTrend: CostTrendPoint[];
  estimatedApplianceWeightKg: number;
  status: DeviceStatus;
  needsMoreInfo?: boolean;
  clarificationQuestions?: string[];
  evidenceSummary?: {
    hasImage: boolean;
    descriptionQuality: 'Detailed' | 'Moderate' | 'Vague / Insufficient';
    confidenceScore: number;
  };
}

export interface EWasteImpactMetrics {
  totalDivertedKg: number;
  totalSavedINR: number;
  totalDiagnosed: number;
  repairConversionRate: number; // percentage e.g. 74%
  recycledCount: number;
  pendingCount: number;
  co2EquivalentPreventedKg: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  suggestions?: string[];
  suggestedAction?: {
    type: 'open_diy' | 'view_shops' | 'recalculate';
    label: string;
  };
}
