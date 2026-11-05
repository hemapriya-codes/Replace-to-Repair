import { DiagnosisResult, LocalRepairShop, EWasteImpactMetrics, CostTrendPoint } from './types';

export const VIZAG_LOCAL_SHOPS: LocalRepairShop[] = [
  {
    id: 'shop-1',
    name: 'Sri Balaji Appliance Care & Motor Works',
    locality: 'MVP Colony, Sector 4',
    distanceKm: 1.2,
    rating: 4.9,
    reviewCount: 342,
    estimatedServiceCostINR: 850,
    phone: '+91 98480 12345',
    address: 'Near Rythu Bazaar, Double Road, MVP Colony, Visakhapatnam - 530017',
    specialties: ['Washing Machine Drums', 'Inverter Motor Rewinding', 'Same-day Diagnosis'],
    verified: true,
    isOpenNow: true,
  },
  {
    id: 'shop-2',
    name: 'Vizag Tech Care & Micro Electronics',
    locality: 'Siripuram Junction',
    distanceKm: 2.8,
    rating: 4.7,
    reviewCount: 218,
    estimatedServiceCostINR: 750,
    phone: '+91 891 274 5678',
    address: 'Opp. Gurajada Kalakshetram, Siripuram, Visakhapatnam - 530003',
    specialties: ['PCB Board Component Repair', 'Sensor Calibration', 'OEM Spares'],
    verified: true,
    isOpenNow: true,
  },
  {
    id: 'shop-3',
    name: 'Coastal Home Appliance Experts',
    locality: 'Madhurawada',
    distanceKm: 4.5,
    rating: 4.8,
    reviewCount: 189,
    estimatedServiceCostINR: 900,
    phone: '+91 94401 88990',
    address: 'Behind Car Shed Junction, Madhurawada, Visakhapatnam - 530048',
    specialties: ['Heavy Tub Replacement', 'Compressor Refurbishing', 'Doorstep Pickup'],
    verified: true,
    isOpenNow: true,
  },
  {
    id: 'shop-4',
    name: 'Dwaraka QuickFix Multi-Brand Service',
    locality: 'Dwaraka Nagar',
    distanceKm: 3.1,
    rating: 4.6,
    reviewCount: 412,
    estimatedServiceCostINR: 700,
    phone: '+91 891 255 4321',
    address: 'Lane 4, Beside RTC Complex, Dwaraka Nagar, Visakhapatnam - 530016',
    specialties: ['Belt & Pulley Replacements', 'Quick Drain Pump Swap', 'Budget Repairs'],
    verified: true,
    isOpenNow: false,
  },
  {
    id: 'shop-5',
    name: 'Gajuwaka Industrial & Household Spares',
    locality: 'Gajuwaka Main Road',
    distanceKm: 9.4,
    rating: 4.8,
    reviewCount: 156,
    estimatedServiceCostINR: 650,
    phone: '+91 98852 33445',
    address: 'Near High School Road, Old Gajuwaka, Visakhapatnam - 530026',
    specialties: ['Heavy Duty Bearings', 'Motor Brushes', 'Industrial Grade Soldering'],
    verified: true,
    isOpenNow: true,
  }
];

export const VIZAG_EWASTE_RECYCLERS = [
  {
    id: 'ewaste-1',
    name: 'Vizag Green Earth Recyclers (APPCB Authorized)',
    locality: 'Auto Nagar Industrial Area',
    phone: '+91 891 278 9900',
    address: 'Plot 44, Phase 2, Auto Nagar, Gajuwaka, Visakhapatnam - 530012',
    pickupOffered: true,
    governmentAuthorized: true,
    materialsHandled: ['Heavy appliances', 'PCBs & Motors', 'Lithium & Copper recovery'],
    carbonCreditValuePerKg: '₹14 / kg'
  },
  {
    id: 'ewaste-2',
    name: 'Clean Coastal E-Disposal Unit',
    locality: 'Gambheeram Tech Park Road',
    phone: '+91 94901 77665',
    address: 'Survey 22, Near IIM Vizag, Gambheeram, Visakhapatnam - 531163',
    pickupOffered: true,
    governmentAuthorized: true,
    materialsHandled: ['Refrigerators', 'Washing Machines', 'Compressor Degassing'],
    carbonCreditValuePerKg: '₹16 / kg'
  }
];

export const INITIAL_EWATE_METRICS: EWasteImpactMetrics = {
  totalDivertedKg: 3845,
  totalSavedINR: 1948500,
  totalDiagnosed: 428,
  repairConversionRate: 76.4,
  recycledCount: 68,
  pendingCount: 33,
  co2EquivalentPreventedKg: 8920,
};

export const INITIAL_DIAGNOSES: DiagnosisResult[] = [
  {
    id: 'diag-001',
    timestamp: '2026-11-04 14:32',
    machineLabel: 'LG Top-Load Smart Inverter Washing Machine (7.0 kg)',
    symptoms: 'Loud rattling metallic noise during high-speed spin cycle and mild chassis vibration',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    estimatedApplianceWeightKg: 38,
    status: 'Repaired',
    productMetadata: {
      brand: 'LG',
      model: 'T70SJSF1Z Smart Inverter',
      category: 'Washing Machine',
      estimatedYear: 2022,
      warrantyStatus: 'Expired',
      expectedLifespanYears: 10,
      newEquivalentPriceINR: 23990,
    },
    visibleFaults: [
      {
        component: 'Chassis Leveling Foot (Rear Right)',
        description: 'Uneven leveling causing drum oscillation wobble under centrifugal load.',
        severity: 'Low',
        immediateFix: 'Adjust threaded rubber leveling foot clockwise with 14mm spanner until spirit level balances.'
      },
      {
        component: 'Pulsator Center Cap',
        description: 'Loose plastic debris trap allowing coin or clip to slip beneath pulsator disc.',
        severity: 'Medium',
        immediateFix: 'Pry cap with flat screwdriver and check for trapped foreign coins/bobby pins.'
      }
    ],
    hiddenFaults: [
      {
        component: 'Rear Drum Ball Bearing (6205-2RS)',
        probabilityPercent: 78,
        rationale: 'Rattling pitch correlates with high-speed centrifugal radial play indicating seal breakdown.',
        riskIfIgnored: 'Complete rotor stator lockup, causing motor burnout within 30-45 spin cycles.'
      },
      {
        component: 'Suspension Rod Damper Springs',
        probabilityPercent: 54,
        rationale: 'Age-induced loss of silicone grease damping in 2 of 4 corner suspension struts.',
        riskIfIgnored: 'Drum banging against metal sidewall cabinet during water drain phase.'
      }
    ],
    diyGuidance: {
      feasibleForDIY: true,
      difficulty: 'Moderate',
      overallSafetyNotice: 'Disconnect 230V AC mains plug and drain residual sump water before opening back maintenance panel.',
      requiredTools: ['10mm & 14mm Socket Spanner', 'Phillips #2 Screwdriver', 'High-Viscosity Lithium Grease', 'Flashlight'],
      steps: [
        {
          stepNumber: 1,
          title: 'Mains Isolation & Inspection Hatch Removal',
          description: 'Unplug the power cord. Unscrew four rear galvanized screws securing the lower inspection panel.',
          safetyWarning: 'Beware of sharp stamped sheet-metal edges inside the casing.',
          toolsRequired: ['Phillips #2 Screwdriver'],
          estimatedMinutes: 5,
        },
        {
          stepNumber: 2,
          title: 'Drive Belt Tension & Pulley Inspection',
          description: 'Inspect drive belt for fraying or loose slack. Press finger against center of belt: deflection should not exceed 10mm.',
          toolsRequired: ['Flashlight'],
          estimatedMinutes: 8,
        },
        {
          stepNumber: 3,
          title: 'Rotor Radial Play Verification',
          description: 'Grasp the drum pulley firmly and wiggle radially. If there is noticeable side-to-side play with a dry grinding sound, the bearing requires repacking or bearing cup replacement.',
          toolsRequired: ['Protective Gloves'],
          estimatedMinutes: 10,
        },
        {
          stepNumber: 4,
          title: 'Suspension Strut Re-lubrication',
          description: 'Clean dried sludge from the upper ball cups of the four suspension rods and apply fresh lithium grease.',
          toolsRequired: ['High-Viscosity Lithium Grease', 'Clean Rag'],
          estimatedMinutes: 15,
        }
      ]
    },
    viability: {
      score: 83.5,
      tier: 'green',
      estRepairCostINR: 2850,
      newEquivalentPriceINR: 23990,
      currentAgeYears: 3.5,
      expectedLifespanYears: 10,
      netSavingsINR: 21140,
      summaryRecommendation: 'Highly Recommended to Repair. Fixing this bearing & suspension saves ₹21,140 compared to purchasing a new machine, with 6.5+ years of remaining operational life.',
      formulaDetails: {
        costRatio: 11.88,
        ageMultiplier: 1.35,
        penalty: 16.5,
      }
    },
    localShops: VIZAG_LOCAL_SHOPS.slice(0, 3),
    costTrend: [
      { year: '2023', repairCostINR: 2400, replacementCostINR: 21500, partsAvailabilityIndex: 92 },
      { year: '2024', repairCostINR: 2600, replacementCostINR: 22800, partsAvailabilityIndex: 90 },
      { year: '2025', repairCostINR: 2750, replacementCostINR: 23500, partsAvailabilityIndex: 88 },
      { year: '2026', repairCostINR: 2850, replacementCostINR: 23990, partsAvailabilityIndex: 86 },
    ]
  },
  {
    id: 'diag-002',
    timestamp: '2026-11-03 11:15',
    machineLabel: 'Samsung 253L Double Door Inverter Refrigerator',
    symptoms: 'Freezer compartment freezing solid but lower vegetable box not cooling; clicking relay noise from rear',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    estimatedApplianceWeightKg: 52,
    status: 'Repaired',
    productMetadata: {
      brand: 'Samsung',
      model: 'RT28T3722S9/HL Digital Inverter',
      category: 'Refrigerator',
      estimatedYear: 2021,
      warrantyStatus: 'Expired',
      expectedLifespanYears: 12,
      newEquivalentPriceINR: 26500,
    },
    visibleFaults: [
      {
        component: 'Lower Air Return Vent Duct',
        description: 'Dense frost buildup completely blocking cold air passage from freezer coil to fresh-food cabinet.',
        severity: 'Medium',
        immediateFix: 'Perform complete manual 12-hour defrost by leaving doors ajar and clearing drain drip tray.'
      }
    ],
    hiddenFaults: [
      {
        component: 'Bimetal Defrost Thermostat & Sensor',
        probabilityPercent: 86,
        rationale: 'Failure of defrost cycle termination causing persistent evaporator ice choke.',
        riskIfIgnored: 'Evaporator fan blade binds against ice pack, burning the fan motor.'
      },
      {
        component: 'Defrost Glass Heater Element',
        probabilityPercent: 64,
        rationale: 'Thermal fuse continuity intermittently tripping.',
        riskIfIgnored: 'Repeated manual defrosting required every 4 days.'
      }
    ],
    diyGuidance: {
      feasibleForDIY: true,
      difficulty: 'Easy',
      overallSafetyNotice: 'Unplug power and place towels below the door during defrosting.',
      requiredTools: ['Multimeter (Ohms test)', 'Hairdryer (low heat setting)', 'Phillips Screwdriver'],
      steps: [
        {
          stepNumber: 1,
          title: 'Remove Freezer Rear Plastic Shroud',
          description: 'Remove two screws inside freezer back wall and carefully unclip the molded plastic shroud.',
          toolsRequired: ['Phillips Screwdriver'],
          estimatedMinutes: 6,
        },
        {
          stepNumber: 2,
          title: 'Defrost Heater Continuity Test',
          description: 'Disconnect 2-pin white connector to defrost heater and measure resistance across pins. Normal reading: 250 - 350 Ohms.',
          safetyWarning: 'Do not tug directly on wire strands.',
          toolsRequired: ['Multimeter'],
          estimatedMinutes: 5,
        },
        {
          stepNumber: 3,
          title: 'Replace Clip-on Bimetal Sensor',
          description: 'If heater has continuity, unclip defective bimetal sensor from copper tube and clip on replacement OEM sensor (Part #DA47-00301D).',
          toolsRequired: ['Pliers'],
          estimatedMinutes: 10,
        }
      ]
    },
    viability: {
      score: 87.2,
      tier: 'green',
      estRepairCostINR: 1950,
      newEquivalentPriceINR: 26500,
      currentAgeYears: 4,
      expectedLifespanYears: 12,
      netSavingsINR: 24550,
      summaryRecommendation: 'Excellent Candidate for Repair. Inexpensive sensor swap (₹1,950) restores perfect twin cooling, saving over ₹24,500 vs. replacement.',
      formulaDetails: {
        costRatio: 7.35,
        ageMultiplier: 1.33,
        penalty: 9.8,
      }
    },
    localShops: [VIZAG_LOCAL_SHOPS[0], VIZAG_LOCAL_SHOPS[1], VIZAG_LOCAL_SHOPS[3]],
    costTrend: [
      { year: '2023', repairCostINR: 1700, replacementCostINR: 23900, partsAvailabilityIndex: 95 },
      { year: '2024', repairCostINR: 1850, replacementCostINR: 25200, partsAvailabilityIndex: 94 },
      { year: '2025', repairCostINR: 1900, replacementCostINR: 25900, partsAvailabilityIndex: 91 },
      { year: '2026', repairCostINR: 1950, replacementCostINR: 26500, partsAvailabilityIndex: 89 },
    ]
  },
  {
    id: 'diag-003',
    timestamp: '2026-11-01 09:40',
    machineLabel: 'IFB Senator 6.0kg Front-Load Washing Machine',
    symptoms: 'Error code E02, acrid burning smell, outer tub cracked and leaking water, heavy rusted chassis base',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
    estimatedApplianceWeightKg: 72,
    status: 'Recycled',
    productMetadata: {
      brand: 'IFB',
      model: 'Senator Aqua SX 6kg',
      category: 'Washing Machine',
      estimatedYear: 2016,
      warrantyStatus: 'Expired',
      expectedLifespanYears: 9,
      newEquivalentPriceINR: 34500,
    },
    visibleFaults: [
      {
        component: 'Outer Polypropylene Tub Casing',
        description: 'Fractured seam along drum weld with continuous water seepage into main drive motor.',
        severity: 'High',
        immediateFix: 'Cannot be glued or sealed reliably under hot water wash pressures.'
      },
      {
        component: 'Lower Galvanized Base Frame',
        description: 'Severe structural rust perforation; motor mounting brackets compromised.',
        severity: 'High',
        immediateFix: 'Structural safety hazard; risk of drum collapse.'
      }
    ],
    hiddenFaults: [
      {
        component: 'Main Controller PCB & Inverter Drive',
        probabilityPercent: 94,
        rationale: 'Water ingress through crack caused direct short circuit across IGBT switching modules.',
        riskIfIgnored: 'Fire hazard and ground fault leakage.'
      },
      {
        component: 'Spider Arm Hub Flange',
        probabilityPercent: 88,
        rationale: 'Galvanic corrosion disintegration of cast aluminum spider arm arms.',
        riskIfIgnored: 'Immediate catastrophic drum collision.'
      }
    ],
    diyGuidance: {
      feasibleForDIY: false,
      difficulty: 'Professional Only',
      overallSafetyNotice: 'DO NOT ATTEMPT DIY. Risk of electrical shock, structural failure, and high repair cost exceeding replacement value.',
      requiredTools: ['Specialized Tub Puller', 'Heavy Press Tool'],
      steps: []
    },
    viability: {
      score: 18.4,
      tier: 'red',
      estRepairCostINR: 21500,
      newEquivalentPriceINR: 34500,
      currentAgeYears: 9.5,
      expectedLifespanYears: 9,
      netSavingsINR: -2800,
      summaryRecommendation: 'End of Life (Replace & Recycle). Repair cost (₹21,500) represents 62% of new machine price, and machine is past its 9-year expected lifespan. Routing directly to verified Visakhapatnam E-Waste recyclers for precious metal recovery.',
      formulaDetails: {
        costRatio: 62.31,
        ageMultiplier: 2.05,
        penalty: 128.0,
      }
    },
    localShops: [],
    costTrend: [
      { year: '2023', repairCostINR: 14500, replacementCostINR: 31000, partsAvailabilityIndex: 65 },
      { year: '2024', repairCostINR: 17200, replacementCostINR: 32500, partsAvailabilityIndex: 52 },
      { year: '2025', repairCostINR: 19800, replacementCostINR: 33800, partsAvailabilityIndex: 41 },
      { year: '2026', repairCostINR: 21500, replacementCostINR: 34500, partsAvailabilityIndex: 28 },
    ]
  },
  {
    id: 'diag-004',
    timestamp: '2026-10-29 16:20',
    machineLabel: 'Voltas 1.5 Ton 3-Star Split Air Conditioner',
    symptoms: 'Indoor unit blower runs smoothly but cooling is weak; outdoor condenser fan turns slowly; occasional hissing sound',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80',
    estimatedApplianceWeightKg: 44,
    status: 'Pending',
    productMetadata: {
      brand: 'Voltas',
      model: '183V Vectra Prism 1.5T',
      category: 'Air Conditioner',
      estimatedYear: 2021,
      warrantyStatus: 'Expired',
      expectedLifespanYears: 8,
      newEquivalentPriceINR: 35990,
    },
    visibleFaults: [
      {
        component: 'Indoor Evaporator Mesh Filter',
        description: 'Dense dust coating restricting airflow across cooling coils by ~65%.',
        severity: 'Low',
        immediateFix: 'Wash filters under running tap water with mild liquid soap and air dry.'
      }
    ],
    hiddenFaults: [
      {
        component: 'Outdoor Run Capacitor (45µF + 5µF Dual)',
        probabilityPercent: 74,
        rationale: 'Weak outdoor fan rotation and slow compressor spool-up typical of bulged capacitor.',
        riskIfIgnored: 'Compressor thermal overload protector trips, stalling cooling.'
      },
      {
        component: 'Refrigerant R32 Micro-leak at flare nut',
        probabilityPercent: 62,
        rationale: 'Hissing sound and poor temperature differential.',
        riskIfIgnored: 'Complete loss of refrigerant leading to dry compressor lockup.'
      }
    ],
    diyGuidance: {
      feasibleForDIY: true,
      difficulty: 'Moderate',
      overallSafetyNotice: 'Condenser run capacitor can retain lethal DC voltage even with main switch off. Discharge terminals with insulated screwdriver.',
      requiredTools: ['Insulated Screwdriver', 'Multimeter with Capacitance meter', 'Adjustable Wrench', 'Soap Water spray bottle'],
      steps: [
        {
          stepNumber: 1,
          title: 'Clean Filters & Coil Fins',
          description: 'Pull front panel upward, slide out dual nylon filters, rinse and vacuum indoor cooling fins gently.',
          toolsRequired: ['Soft brush', 'Water spray'],
          estimatedMinutes: 10,
        },
        {
          stepNumber: 2,
          title: 'Soap Bubble Flare Joint Leak Check',
          description: 'Spray dilute soap solution over brass flare nuts at outdoor service valves. Inspect for expanding froth bubbles.',
          toolsRequired: ['Soap Water spray bottle'],
          estimatedMinutes: 8,
        },
        {
          stepNumber: 3,
          title: 'Capacitor Visual Inspection & Replacement',
          description: 'Inspect silver cylinder capacitor in outdoor electrical box for oily discharge or convex domed top. Replace with standard 45/5µF dual capacitor.',
          safetyWarning: 'Always short HERM and FAN terminals to COMMON with an insulated resistor or screwdriver before touching!',
          toolsRequired: ['Insulated Screwdriver', 'Protective Gloves'],
          estimatedMinutes: 15,
        }
      ]
    },
    viability: {
      score: 58.6,
      tier: 'yellow',
      estRepairCostINR: 4200,
      newEquivalentPriceINR: 35990,
      currentAgeYears: 5,
      expectedLifespanYears: 8,
      netSavingsINR: 31790,
      summaryRecommendation: 'Moderate Viability (Budget Local Intervention Recommended). Viable via budget neighborhood repair shop (capacitor replacement + leak flare tightening ~₹2,500 - ₹4,200). Avoid costly complete coil replacement.',
      formulaDetails: {
        costRatio: 11.66,
        ageMultiplier: 1.625,
        penalty: 18.9,
      }
    },
    localShops: [VIZAG_LOCAL_SHOPS[2], VIZAG_LOCAL_SHOPS[0], VIZAG_LOCAL_SHOPS[4]],
    costTrend: [
      { year: '2023', repairCostINR: 3200, replacementCostINR: 31500, partsAvailabilityIndex: 88 },
      { year: '2024', repairCostINR: 3600, replacementCostINR: 33000, partsAvailabilityIndex: 85 },
      { year: '2025', repairCostINR: 3950, replacementCostINR: 34500, partsAvailabilityIndex: 82 },
      { year: '2026', repairCostINR: 4200, replacementCostINR: 35990, partsAvailabilityIndex: 80 },
    ]
  }
];

export const GENERAL_COST_TREND_BY_CATEGORY: Record<string, CostTrendPoint[]> = {
  'Washing Machine': [
    { year: '2022', repairCostINR: 2100, replacementCostINR: 20000, partsAvailabilityIndex: 94 },
    { year: '2023', repairCostINR: 2350, replacementCostINR: 21800, partsAvailabilityIndex: 91 },
    { year: '2024', repairCostINR: 2550, replacementCostINR: 23200, partsAvailabilityIndex: 89 },
    { year: '2025', repairCostINR: 2700, replacementCostINR: 24500, partsAvailabilityIndex: 87 },
    { year: '2026', repairCostINR: 2850, replacementCostINR: 25500, partsAvailabilityIndex: 85 },
  ],
  'Refrigerator': [
    { year: '2022', repairCostINR: 1500, replacementCostINR: 22000, partsAvailabilityIndex: 96 },
    { year: '2023', repairCostINR: 1650, replacementCostINR: 23500, partsAvailabilityIndex: 94 },
    { year: '2024', repairCostINR: 1800, replacementCostINR: 25000, partsAvailabilityIndex: 92 },
    { year: '2025', repairCostINR: 1950, replacementCostINR: 26200, partsAvailabilityIndex: 90 },
    { year: '2026', repairCostINR: 2100, replacementCostINR: 27500, partsAvailabilityIndex: 88 },
  ],
  'Air Conditioner': [
    { year: '2022', repairCostINR: 3100, replacementCostINR: 29000, partsAvailabilityIndex: 90 },
    { year: '2023', repairCostINR: 3450, replacementCostINR: 31500, partsAvailabilityIndex: 87 },
    { year: '2024', repairCostINR: 3800, replacementCostINR: 33500, partsAvailabilityIndex: 84 },
    { year: '2025', repairCostINR: 4100, replacementCostINR: 35000, partsAvailabilityIndex: 82 },
    { year: '2026', repairCostINR: 4350, replacementCostINR: 36800, partsAvailabilityIndex: 79 },
  ],
  'Microwave Oven': [
    { year: '2022', repairCostINR: 950, replacementCostINR: 7500, partsAvailabilityIndex: 95 },
    { year: '2023', repairCostINR: 1050, replacementCostINR: 8200, partsAvailabilityIndex: 93 },
    { year: '2024', repairCostINR: 1200, replacementCostINR: 8900, partsAvailabilityIndex: 91 },
    { year: '2025', repairCostINR: 1300, replacementCostINR: 9500, partsAvailabilityIndex: 89 },
    { year: '2026', repairCostINR: 1400, replacementCostINR: 10200, partsAvailabilityIndex: 87 },
  ],
  'Television': [
    { year: '2022', repairCostINR: 2800, replacementCostINR: 26000, partsAvailabilityIndex: 86 },
    { year: '2023', repairCostINR: 3200, replacementCostINR: 28000, partsAvailabilityIndex: 82 },
    { year: '2024', repairCostINR: 3700, replacementCostINR: 29500, partsAvailabilityIndex: 78 },
    { year: '2025', repairCostINR: 4200, replacementCostINR: 31000, partsAvailabilityIndex: 75 },
    { year: '2026', repairCostINR: 4800, replacementCostINR: 32500, partsAvailabilityIndex: 72 },
  ]
};

// Economic Brain Mathematical Viability Calculator
// Formula: Viability Score = 100 - ( (Est. Repair Cost / Price of New) * 100 * (1 + (Current Age / Expected Lifespan)) )
export function calculateViabilityScore(
  repairCostINR: number,
  newEquivalentPriceINR: number,
  currentAgeYears: number,
  expectedLifespanYears: number
): {
  score: number;
  tier: 'green' | 'yellow' | 'red';
  netSavingsINR: number;
  summaryRecommendation: string;
  formulaDetails: {
    costRatio: number;
    ageMultiplier: number;
    penalty: number;
  };
} {
  const safeNewPrice = Math.max(1, newEquivalentPriceINR);
  const safeLifespan = Math.max(1, expectedLifespanYears);
  
  const costRatio = (repairCostINR / safeNewPrice) * 100;
  const ageMultiplier = 1 + (currentAgeYears / safeLifespan);
  const penalty = costRatio * ageMultiplier;
  
  let score = 100 - penalty;
  score = Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  
  const netSavingsINR = Math.max(0, newEquivalentPriceINR - repairCostINR);
  
  let tier: 'green' | 'yellow' | 'red';
  let summaryRecommendation: string;
  
  if (score > 65) {
    tier = 'green';
    summaryRecommendation = `High Viability: Minor or moderate fix. Fixing this machine saves ₹${netSavingsINR.toLocaleString('en-IN')} compared to buying new. Estimated remaining lifespan is high.`;
  } else if (score >= 40) {
    tier = 'yellow';
    summaryRecommendation = `Moderate Viability: Borderline economic threshold. Viable primarily through DIY guidance or a budget local repair technician in Visakhapatnam. Avoid high OEM authorized replacement quotes.`;
  } else {
    tier = 'red';
    summaryRecommendation = `End of Life (Replace & Recycle): Structural or multiple component failure. High repair cost relative to depreciated age makes repair uneconomical. Routing to certified E-Waste recyclers.`;
  }
  
  return {
    score,
    tier,
    netSavingsINR,
    summaryRecommendation,
    formulaDetails: {
      costRatio: Math.round(costRatio * 100) / 100,
      ageMultiplier: Math.round(ageMultiplier * 1000) / 1000,
      penalty: Math.round(penalty * 100) / 100,
    }
  };
}
