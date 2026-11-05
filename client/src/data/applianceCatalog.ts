import { VisibleFault, HiddenFault, DIYStep } from '../types';

export interface ApplianceFaultProfile {
  categoryName: string;
  keywords: string[];
  commonSymptoms: string[];
  hasElectricalHazard: boolean;
  isDangerousForDIY: boolean;
  dangerDescription?: string;
  generateDiagnosis: (params: {
    label: string;
    symptoms: string;
    hasImage: boolean;
    brand: string;
  }) => {
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
    estRepairCostINR: number;
    lifespanYears: number;
    newPriceINR: number;
    weightKg: number;
  };
}

export interface ApplianceCategory {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  typicalLifespanYears: number;
  newEquivalentPriceINR: number;
  averageWeightKg: number;
  popularBrands: string[];
  defaultFaults: ApplianceFaultProfile[];
  clarificationQuestions: string[];
}

export const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  // 1. Microwave Ovens
  {
    id: 'microwave',
    name: 'Microwave Oven',
    shortName: 'Microwave',
    icon: 'Flame',
    description: 'Solo, Grill, and Convection countertop and built-in microwave units.',
    typicalLifespanYears: 8,
    newEquivalentPriceINR: 11500,
    averageWeightKg: 15,
    popularBrands: ['LG', 'Samsung', 'IFB', 'Panasonic', 'Godrej', 'Whirlpool'],
    clarificationQuestions: [
      'Does the turntable rotate and does the interior lamp turn on when started?',
      'Do you observe any visible sparks, smoke, or buzzing from the interior right wall waveguide area?',
      'Does the timer count down normally even though the food remains completely cold?'
    ],
    defaultFaults: [
      {
        categoryName: 'High-Voltage Magnetron & Heating',
        keywords: ['not heat', 'cold', 'timer runs', 'no heat', 'warm', 'hum'],
        commonSymptoms: [
          'Timer counts down but food remains ice-cold',
          'Loud low hum when microwave starts heating cycle',
          'Smell of electrical overheating during heating'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: true,
        dangerDescription: 'LETHAL HIGH VOLTAGE: Internal capacitor stores 2,000V - 4,000V DC even when unplugged. DO NOT open metal cabinet.',
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: hasImage
            ? [
                {
                  component: 'Waveguide Mica Cover Plate (Interior Cavity)',
                  description: 'Inspection of interior cavity shows darkened or carbon-splattered waveguide mica sheet on right chamber wall.',
                  severity: 'Medium',
                  immediateFix: 'Wipe cavity with damp sponge; replace scorched mica plate sheet (cost ~₹150).',
                  evidenceSource: 'Visual Inspection (Image)',
                  confidence: 'Confirmed'
                }
              ]
            : [
                {
                  component: 'Door Latch & Exterior Casing',
                  description: 'Exterior visual check: door alignment hinges and safety interlock hooks show normal physical retention.',
                  severity: 'Low',
                  immediateFix: 'Ensure door latches tightly with a distinct mechanical click on closure.',
                  evidenceSource: 'Operational Inference',
                  confidence: 'Suspected'
                }
              ],
          hiddenFaults: [
            {
              component: 'High-Voltage Diode & Magnetron Vacuum Tube',
              probabilityPercent: 88,
              rationale: 'Absence of RF microwave oscillation with normal display logic indicates open HV diode or depleted magnetron filament.',
              riskIfIgnored: 'High-voltage transformer primary winding overheats and blows main chassis ceramic fuse.',
              verificationMethod: 'Authorized service tech checks HV diode forward bias voltage and magnetron filament continuity.'
            },
            {
              component: 'High-Voltage Filter Capacitor (0.91µF 2100VAC)',
              probabilityPercent: 62,
              rationale: 'Internal bleeder resistor or dielectric breakdown preventing voltage doubling.',
              riskIfIgnored: 'Dead short tripping household 16A MCB instantly upon start.',
              verificationMethod: 'Capacitance tester after professional terminal discharge using 20kΩ 5W bleeder probe.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: false,
            difficulty: 'Professional Only',
            overallSafetyNotice: 'CRITICAL HIGH VOLTAGE HAZARD: Microwave high-voltage capacitors store up to 4,000 Volts and can deliver a FATAL electric shock even after being unplugged for days. NEVER open the external metal chassis. Contact a certified technician.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Disconnect wall plug immediately. Do not attempt to dismantle the outer cabinet or discharge capacitors without insulated high-voltage equipment.',
            technicianRequired: true,
            requiredTools: ['Unplug Power Cord (Safety Only)'],
            steps: [
              {
                stepNumber: 1,
                title: 'Safe Electrical Isolation',
                description: 'Immediately disconnect the microwave 3-pin plug from the 16A wall socket. Do not use extension boards.',
                safetyWarning: 'Do not attempt to remove the rear or outer metal shell.',
                toolsRequired: ['None (Manual)'],
                estimatedMinutes: 2,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Safe Cavity Inspection',
                description: 'Open door and inspect the mica waveguide cover on the right wall for brown grease burns or holes. If burnt, snap out the plastic clip and wipe the area.',
                safetyWarning: 'Never place metal foils, cutlery, or gold-rimmed plates in microwave.',
                toolsRequired: ['Clean damp cloth'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Book Certified Magnetron Replacement',
                description: 'Contact a certified microwave service center in your locality. Technician will safely discharge HV capacitor and replace the diode/magnetron.',
                safetyWarning: 'Strictly technician-only operation.',
                toolsRequired: ['Phone / RRR Dispatch'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Professional Only'
              }
            ]
          },
          estRepairCostINR: 1450,
          lifespanYears: 8,
          newPriceINR: 11500,
          weightKg: 15
        })
      },
      {
        categoryName: 'Turntable & Rotating Mechanism',
        keywords: ['turntable', 'plate', 'rotate', 'spin', 'roller', 'glass'],
        commonSymptoms: [
          'Glass plate does not rotate or jerks erratically',
          'Clicking noise from bottom floor under glass tray'
        ],
        hasElectricalHazard: false,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Turntable Drive Coupler & Roller Ring',
              description: 'Plastic D-shaped center coupler teeth worn or roller ring wheels jammed with hardened food residue.',
              severity: 'Low',
              immediateFix: 'Lift glass plate, clean roller track with warm soapy water, replace stripped plastic coupler (₹80).',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Synchronous Turntable Sub-Motor (21V/220V AC 4W)',
              probabilityPercent: 74,
              rationale: 'Stripped internal reduction nylon gears inside sealed motor gearbox caused by heavy casserole dish.',
              riskIfIgnored: 'Uneven spot heating in food; motor coil open circuit.',
              verificationMethod: 'Check drive shaft resistance and continuity across lower motor terminals via bottom inspection hatch.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'Unplug microwave from power outlet before inspecting bottom panel or drive spindle.',
            hasElectricalHazard: false,
            technicianRequired: false,
            requiredTools: ['Warm soapy water', 'Small sponge', 'Replacement 3-arm roller ring'],
            steps: [
              {
                stepNumber: 1,
                title: 'Remove Glass Plate & Inspect Roller Ring',
                description: 'Carefully lift out circular glass tray. Inspect plastic wheels of roller ring for cracks, food buildup, or flat spots.',
                toolsRequired: ['Sponge', 'Warm water'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Inspect D-Shaft Center Coupler',
                description: 'Inspect the brown/white center plastic hub. If the D-shaped socket is rounded out or cracked, gently pry it upward and press on a replacement coupler.',
                toolsRequired: ['Replacement Coupler'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 350,
          lifespanYears: 8,
          newPriceINR: 11500,
          weightKg: 15
        })
      }
    ]
  },

  // 2. Inverters
  {
    id: 'inverter',
    name: 'Inverters & Home UPS',
    shortName: 'Inverter',
    icon: 'BatteryCharging',
    description: 'Pure sine wave, square wave inverters, and tubular battery backup systems.',
    typicalLifespanYears: 7,
    newEquivalentPriceINR: 18500,
    averageWeightKg: 45,
    popularBrands: ['Luminous', 'Microtek', 'Exide', 'Amaron', 'V-Guard', 'Livguard'],
    clarificationQuestions: [
      'Is the inverter displaying an "Overload" or "Low Battery" red LED with a continuous alarm beep?',
      'Are there white/green powdery sulfate crystals around the positive or negative battery terminals?',
      'Does the inverter switch to battery backup during a power outage, or do connected lights instantly turn off?'
    ],
    defaultFaults: [
      {
        categoryName: 'Battery Terminal Corrosion & Charging Failure',
        keywords: ['sulfate', 'terminal', 'not charging', 'acid', 'water', 'backup low', 'battery', 'overload'],
        commonSymptoms: [
          'Inverter continuously beeps overload or low battery warning',
          'Heavy crust of white/blue corrosion over lead battery lugs',
          'Backup duration reduced from 4 hours to under 20 minutes'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        dangerDescription: 'Lead-acid batteries emit explosive hydrogen gas during charging and carry high short-circuit current.',
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Battery Terminal Clamps & Lead Lug Posts',
              description: 'Heavy lead sulfate encrustation around battery posts causing high contact resistance and voltage drop under load.',
              severity: 'Medium',
              immediateFix: 'Pour hot water and baking soda over terminals, brush with wire brush, coat with petroleum jelly.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Tubular Battery Float Indicators',
              description: 'Electrolyte level low in 2 or more battery cells, exposing active tubular plates to oxidation.',
              severity: 'Medium',
              immediateFix: 'Top up each cell with pure battery-grade distilled water up to green float line.',
              evidenceSource: 'Operational Inference',
              confidence: 'Suspected'
            }
          ],
          hiddenFaults: [
            {
              component: 'Charging Section SCR / MOSFET Transistors & Fuse',
              probabilityPercent: 72,
              rationale: 'Grid voltage fluctuations or terminal arcing blown internal 30A DC charging fuse or MOSFET switching bank.',
              riskIfIgnored: 'Permanent battery deep-discharge sulfation destroying cell plates within weeks.',
              verificationMethod: 'Measure charging voltage across terminals while mains AC is on: should read 13.8V - 14.4V DC.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Moderate',
            overallSafetyNotice: 'BATTERY CURRENT & ACID HAZARD: Never bridge positive and negative terminals with metal wrenches (causes explosive spark and weld). Wear rubber gloves and safety glasses. Ensure room is well ventilated.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Disconnect inverter mains 230V plug and turn off rear DC battery circuit breaker before cleaning terminals.',
            technicianRequired: false,
            requiredTools: ['10mm/12mm Insulated Ring Spanner', 'Brass Wire Brush', 'Distilled Water (1L)', 'Petroleum Jelly / Vaseline', 'Rubber Gloves'],
            steps: [
              {
                stepNumber: 1,
                title: 'Turn Off Inverter & Isolate Mains',
                description: 'Press front power switch OFF, then unplug the 3-pin inverter mains cord from wall outlet.',
                safetyWarning: 'Ensure zero flame or spark source in vicinity of lead-acid battery.',
                toolsRequired: ['None'],
                estimatedMinutes: 2,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Neutralize & Clean Terminal Sulfate',
                description: 'Dissolve 2 tablespoons of baking soda in 500ml warm water. Pour slowly over corroded terminal posts. Scrub lead lugs with wire brush until bright metal is exposed.',
                safetyWarning: 'Wear rubber gloves to protect skin from dilute sulfuric acid splash.',
                toolsRequired: ['Baking soda', 'Warm water', 'Brass wire brush', 'Gloves'],
                estimatedMinutes: 12,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Tighten Clamps & Apply Protective Petroleum Jelly',
                description: 'Tighten terminal bolts securely with insulated spanner. Coat all exposed lead surfaces generously with petroleum jelly to prevent future oxidation.',
                safetyWarning: 'Tighten firmly but do not overtighten lead terminals to prevent stripping.',
                toolsRequired: ['10mm/12mm Spanner', 'Petroleum jelly'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 4,
                title: 'Top Up Distilled Water Only',
                description: 'Inspect tubular vent plug float indicators. If red marker drops, add battery-grade distilled water until float reaches green level. NEVER add tap water or acid.',
                toolsRequired: ['Distilled Water', 'Funnel'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 650,
          lifespanYears: 7,
          newPriceINR: 18500,
          weightKg: 45
        })
      }
    ]
  },

  // 3. Refrigerators
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    shortName: 'Fridge',
    icon: 'Snowflake',
    description: 'Single-door, double-door, frost-free, and side-by-side inverter refrigerators.',
    typicalLifespanYears: 12,
    newEquivalentPriceINR: 27500,
    averageWeightKg: 55,
    popularBrands: ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier', 'Bosch'],
    clarificationQuestions: [
      'Is the freezer section chilling normally while the lower fresh-food compartment is warm?',
      'Do you hear a clicking sound every few minutes from the lower back of the refrigerator?',
      'Is there standing water pooling beneath the vegetable crisper drawer?'
    ],
    defaultFaults: [
      {
        categoryName: 'Defrost Cycle & Airflow Choke',
        keywords: ['freezer cool', 'fridge warm', 'not cooling', 'ice build', 'frost', 'relay', 'water leak'],
        commonSymptoms: [
          'Freezer freezing solid but lower vegetable compartment is warm',
          'Heavy frost pack blocking air vents on back freezer panel',
          'Water leaking under vegetable crisper box'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Door Magnetic Gasket Seal',
              description: 'Magnetic door rubber perimeter inspection: minor gap or deformation at bottom corner allowing humid room air infiltration.',
              severity: 'Low',
              immediateFix: 'Clean rubber folds with warm soapy water; warm deformed gasket with hairdryer to restore magnetic seal.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Defrost Drain Hole Trough',
              description: 'Ice or food slime blockage in defrost drain trough behind evaporator coil causing thaw water overflow.',
              severity: 'Medium',
              immediateFix: 'Flush drain funnel with 60ml warm water and turkey baster / squeeze bottle.',
              evidenceSource: 'Operational Inference',
              confidence: 'Suspected'
            }
          ],
          hiddenFaults: [
            {
              component: 'Bimetal Defrost Thermostat & Defrost Heater',
              probabilityPercent: 84,
              rationale: 'Thermal bimetal contacts open-circuited, preventing automatic heater activation during 8-hour defrost timer cycle.',
              riskIfIgnored: 'Ice block encases evaporator fan blade, stalling and burning out fan motor.',
              verificationMethod: 'Test heater resistance (250-350Ω) and bimetal continuity when frozen sub-zero.'
            },
            {
              component: 'Evaporator Air Circulation Blower Fan',
              probabilityPercent: 58,
              rationale: 'Bearing sleeve dry or blade caught on frost blanket, stopping cold air transfer to lower duct.',
              riskIfIgnored: 'Complete loss of cooling in food storage compartment.',
              verificationMethod: 'Depress door light switch manually; listen for immediate high-pitch fan spool.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'Always unplug refrigerator from wall socket before removing back panel or testing electrical clips.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Unplug power cord. Do not puncture evaporator aluminum tubes with knives or sharp screwdrivers (causes explosive refrigerant loss).',
            technicianRequired: false,
            requiredTools: ['Phillips Screwdriver', 'Hairdryer (Warm Air)', 'Warm Water in Squeeze Bottle', 'Towels'],
            steps: [
              {
                stepNumber: 1,
                title: 'Power Down & Manual Defrost',
                description: 'Unplug power cord. Place old towels at base of fridge. Leave both freezer and fridge doors fully open for 12 hours.',
                safetyWarning: 'Never chip ice with knives or screwdrivers.',
                toolsRequired: ['Towels'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Clean Defrost Drain Hole',
                description: 'Locate drain hole at bottom center of freezer interior or lower rear trough. Flush warm water mixed with mild dish soap to clear algae sludge.',
                toolsRequired: ['Warm water', 'Squeeze bottle'],
                estimatedMinutes: 12,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Vacuum Condenser Coils',
                description: 'Slide refrigerator forward. Use vacuum brush attachment to remove dust blankets from lower rear wire coils and compressor housing.',
                toolsRequired: ['Vacuum cleaner / Soft brush'],
                estimatedMinutes: 15,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 1850,
          lifespanYears: 12,
          newPriceINR: 27500,
          weightKg: 55
        })
      }
    ]
  },

  // 4. Washing Machines
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    shortName: 'Washer',
    icon: 'Disc',
    description: 'Top-load, front-load, and semi-automatic inverter washing appliances.',
    typicalLifespanYears: 10,
    newEquivalentPriceINR: 24990,
    averageWeightKg: 42,
    popularBrands: ['LG', 'Samsung', 'IFB', 'Whirlpool', 'Bosch', 'Panasonic'],
    clarificationQuestions: [
      'Does the metallic rattling or banging occur during the wash cycle or only during high-speed spin?',
      'Is water draining completely from the machine within 3-4 minutes, or is it displaying an OE error code?',
      'Is the machine shaking or walking across the floor when spinning?'
    ],
    defaultFaults: [
      {
        categoryName: 'Drum Bearing & Suspension System',
        keywords: ['rattle', 'noise', 'spin', 'vibration', 'wobble', 'shak', 'bearing', 'drum', 'drain', 'oe'],
        commonSymptoms: [
          'Loud jet engine or metallic rumbling noise during spin cycle',
          'Violent tub oscillation knocking against metal cabinet',
          'Drain filter clogged or water left standing in drum'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Chassis Leveling Feet & Anti-Vibration Pads',
              description: 'Uneven contact of front-right leveling rubber foot causing geometric tilt and centrifugal drum oscillation.',
              severity: 'Low',
              immediateFix: 'Rotate threaded leveling foot clockwise until spirit level centers; secure with locking nut.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Lower Coin Trap / Lint Drain Filter',
              description: 'Debris accumulation (coins, lint, pins) in lower drain impeller hatch slowing pump discharge.',
              severity: 'Low',
              immediateFix: 'Open bottom access hatch, unscrew filter counter-clockwise, rinse under running tap.',
              evidenceSource: 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Rear Drum Sealed Ball Bearings (6205RS / 6206RS)',
              probabilityPercent: 78,
              rationale: 'High frequency acoustic harmonic during 800+ RPM spin indicates water ingress past tub shaft lip seal into ball race.',
              riskIfIgnored: 'Inner bearing race seizes onto steel shaft, causing stator motor burnout.',
              verificationMethod: 'Rotate empty drum by hand: rough sandpaper friction sound confirms bearing pitting.'
            },
            {
              component: 'Suspension Strut Damper Springs',
              probabilityPercent: 56,
              rationale: 'Loss of viscous silicone friction damping in corner struts allows tub to bounce unchecked.',
              riskIfIgnored: 'Tub strikes front control board or ruptures water inlet hose.',
              verificationMethod: 'Push down firmly on top of drum: drum should rebound once and stabilize immediately.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Moderate',
            overallSafetyNotice: 'Disconnect 230V AC mains plug and shut off water inlet taps before opening maintenance hatches.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Disconnect power. Never reach inside drum while spinning. For bearing replacements requiring tub splitting, professional tools are advised.',
            technicianRequired: false,
            requiredTools: ['14mm Spanner', 'Phillips Screwdriver', 'Flashlight', 'Shallow Drain Pan', 'Clean Towel'],
            steps: [
              {
                stepNumber: 1,
                title: 'Clean Coin Collector / Drain Pump Filter',
                description: 'Place shallow pan below bottom front flap. Unscrew circular drain filter slowly to catch residual water. Clean lint, coins, and hair pins.',
                safetyWarning: 'Water may be hot if recently washed with hot water cycle.',
                toolsRequired: ['Drain Pan', 'Towel'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Level Cabinet with Spirit Level',
                description: 'Place a bubble level across machine top. Adjust threaded front rubber feet with 14mm spanner until machine sits rock-solid with zero corner rocking.',
                toolsRequired: ['14mm Spanner', 'Spirit level / smartphone app'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Manual Radial Play Bearing Test',
                description: 'Unplug machine. Reach inside drum, push top rim upward against outer tub. If noticeable clicking play (>2mm) exists, schedule bearing kit replacement with local technician.',
                toolsRequired: ['None (Manual)'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 2850,
          lifespanYears: 10,
          newPriceINR: 24990,
          weightKg: 42
        })
      }
    ]
  },

  // 5. Air Conditioners
  {
    id: 'air-conditioner',
    name: 'Air Conditioner',
    shortName: 'AC',
    icon: 'Wind',
    description: 'Split and window inverter and fixed-speed air conditioning units.',
    typicalLifespanYears: 8,
    newEquivalentPriceINR: 36500,
    averageWeightKg: 46,
    popularBrands: ['Voltas', 'Daikin', 'Blue Star', 'LG', 'Hitachi', 'Carrier', 'Lloyd'],
    clarificationQuestions: [
      'Is the indoor blower blowing room-temperature air while the outdoor unit fan remains stopped?',
      'Is there water dripping or overflowing from the front or bottom of the indoor wall unit?',
      'Do you observe frost or thin ice forming along the thin copper pipes outside?'
    ],
    defaultFaults: [
      {
        categoryName: 'Cooling Loss & Outdoor Fan Capacitor',
        keywords: ['not cooling', 'weak cool', 'outdoor', 'capacitor', 'water drip', 'ice copper', 'gas leak', 'hiss'],
        commonSymptoms: [
          'Blower runs but room does not cool down',
          'Outdoor unit fan turns sluggishly or hums without starting',
          'Water leaking down wall from indoor unit evaporator'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: true,
        dangerDescription: 'Outdoor dual run capacitor (45µF 440V) stores lethal DC voltage. Refrigerant R32 is pressurized and flammable.',
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Indoor Evaporator High-Density Mesh Filters',
              description: 'Heavy blanket of airborne dust choking airflow across aluminum cooling fins by >70%.',
              severity: 'Low',
              immediateFix: 'Unclip front plastic grille, slide out nylon mesh filters, wash under running lukewarm tap.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Condensate Drain Tube Outlet',
              description: 'Algae jelly and slime clogging gravity drain hose, causing condensed water to back up into indoor drip tray.',
              severity: 'Medium',
              immediateFix: 'Gently blow or flush warm water through exterior drain pipe outlet to dislodge plug.',
              evidenceSource: 'Operational Inference',
              confidence: 'Suspected'
            }
          ],
          hiddenFaults: [
            {
              component: 'Outdoor Dual Run Capacitor (45µF + 5µF 450VAC)',
              probabilityPercent: 76,
              rationale: 'Thermal degradation in outdoor tropical enclosure causing dielectric fluid bulging and loss of microfarads.',
              riskIfIgnored: 'Compressor thermal overload switch trips repeatedly, eventually burning compressor motor winding.',
              verificationMethod: 'Measure capacitance with digital multimeter across C-HERM and C-FAN terminals.'
            },
            {
              component: 'Refrigerant Charge (R32 / R410A) at Flare Brass Joint',
              probabilityPercent: 54,
              rationale: 'Thermal expansion and vibration loosening flare nuts on service valves, allowing slow refrigerant vapor leak.',
              riskIfIgnored: 'Total refrigerant loss and compressor seizure from inadequate oil circulation.',
              verificationMethod: 'Soap bubble test around brass service flare joints; pressure gauge check by HVAC technician.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Moderate',
            overallSafetyNotice: 'HIGH VOLTAGE ELECTRICAL HAZARD: Never touch outdoor capacitor terminals without professional discharge resistor. Refrigerant lines are under high pressure. Strictly perform safe indoor filter & drain maintenance yourself.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Turn off AC circuit breaker / MCB on distribution board before touching any unit. Never tamper with outdoor electrical casing.',
            technicianRequired: false,
            requiredTools: ['Soft Nylon Brush', 'Lukewarm Water', 'Mild Soap', 'Clean Towel'],
            steps: [
              {
                stepNumber: 1,
                title: 'Power Off at MCB',
                description: 'Switch off the dedicated 16A/20A air conditioner MCB in your home distribution box to guarantee zero current.',
                safetyWarning: 'Do not rely solely on the remote control off button.',
                toolsRequired: ['None'],
                estimatedMinutes: 2,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Clean Dual Indoor Air Filters',
                description: 'Gently lift indoor front cover from bottom latches. Slide out two mesh filters. Rinse under tap water. Let dry completely before reinserting.',
                safetyWarning: 'Do not touch aluminum evaporator fins behind filters with bare fingers (sharp edges).',
                toolsRequired: ['Water tap', 'Soft cloth'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Clear Drain Line Obstruction',
                description: 'Locate drain water pipe exiting balcony or exterior wall. Ensure pipe is not bent or kinked. Flush gently with squeeze bottle to dislodge algae sludge.',
                toolsRequired: ['Water squeeze bottle'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 4,
                title: 'Book Certified HVAC Technician for Outdoor Checks',
                description: 'If cooling is still inadequate, book a verified local technician to replace the outdoor run capacitor (approx ₹650) and test gas pressure.',
                safetyWarning: 'Do not open outdoor electrical box yourself.',
                toolsRequired: ['Phone / RRR Dispatch'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Professional Only'
              }
            ]
          },
          estRepairCostINR: 3800,
          lifespanYears: 8,
          newPriceINR: 36500,
          weightKg: 46
        })
      }
    ]
  },

  // 6. Televisions
  {
    id: 'television',
    name: 'Televisions (LED / Smart TV)',
    shortName: 'TV',
    icon: 'Tv',
    description: 'Smart LED, QLED, OLED 32-inch to 65-inch flat panel televisions.',
    typicalLifespanYears: 7,
    newEquivalentPriceINR: 28000,
    averageWeightKg: 12,
    popularBrands: ['Samsung', 'Sony', 'LG', 'Mi / Xiaomi', 'TCL', 'OnePlus', 'Vu'],
    clarificationQuestions: [
      'Is there sound playing normally from speakers while the screen remains totally pitch black?',
      'If you shine a smartphone flashlight directly against the dark screen, can you faintly see the picture/menu?',
      'Does the front standby LED flash in a specific blink code pattern (e.g. 5 red blinks)?'
    ],
    defaultFaults: [
      {
        categoryName: 'Backlight Strip & Power Board Failure',
        keywords: ['screen black', 'sound no picture', 'lines', 'flicker', 'led backlight', 'standby', 'power light', 'flash'],
        commonSymptoms: [
          'Sound audible from TV but display panel is totally black',
          'Flashlight test shows faint moving video behind dark screen',
          'TV stuck on red standby light; clicks but will not power on'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: true,
        dangerDescription: 'Switch-mode power supplies (SMPS) store 400V DC across main smoothing filter capacitors. Delicate LCD glass panel cracks easily.',
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'External HDMI / AV Cable Ports',
              description: 'Check exterior ports and power cord connection: HDMI input pins show no corrosion or physical bending.',
              severity: 'Low',
              immediateFix: 'Reseat HDMI cables firmly and switch inputs using remote TV source button.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Internal LED Backlight Array Strips (Edge/Direct Lit)',
              probabilityPercent: 86,
              rationale: 'Flashlight reflection test revealing LCD imagery with zero illumination confirms open-circuit SMD LED bead in series string.',
              riskIfIgnored: 'Constant voltage boost driver overload trips main board safety shutdown.',
              verificationMethod: 'Technician tests backlight strips using specialized constant-current LED tester tool.'
            },
            {
              component: 'SMPS Power Supply Secondary Capacitors (1000µF 25V/35V)',
              probabilityPercent: 64,
              rationale: 'Bulged electrolytic capacitor tops causing ripple voltage and failing to deliver 12V/24V to main board.',
              riskIfIgnored: 'Standby circuit lockout preventing TV startup.',
              verificationMethod: 'Visual inspection for domed capacitor tops and ESR meter testing.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: false,
            difficulty: 'Professional Only',
            overallSafetyNotice: 'ELECTRICAL & FRAGILE GLASS HAZARD: TV power boards contain 400V capacitors. LCD panels are 1.2mm fragile glass that fractures under minimal torsional strain. Backlight replacement requires cleanroom suction cup panel removal. Contact a certified display technician.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Unplug power cord. Do not press hard on display panel face or attempt to pry open bezel tabs without specialized suction cups.',
            technicianRequired: true,
            requiredTools: ['Smartphone Flashlight (Diagnosis Only)', 'Remote Control'],
            steps: [
              {
                stepNumber: 1,
                title: 'Perform The Flashlight Diagnostic Test',
                description: 'Turn TV ON in a darkened room. Play a YouTube video or TV channel with sound. Hold your phone flashlight 2 inches from the glass and inspect closely for faint ghostly images.',
                safetyWarning: 'Do not press flashlight hard against display glass.',
                toolsRequired: ['Smartphone Flashlight'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Perform Soft Power Cycle Reset',
                description: 'Unplug TV power cord from wall. Hold down the physical power button on TV bottom/side for 30 seconds to drain standby energy. Plug back in directly to wall socket.',
                toolsRequired: ['None'],
                estimatedMinutes: 4,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Book Certified Display Tech for Backlight Swap',
                description: 'If flashlight test reveals image, the repair is simply replacing LED backlight strips (approx ₹1,800 - ₹3,200). Book a certified local technician who has cleanroom dust benches.',
                safetyWarning: 'Never attempt to peel back the LCD glass yourself.',
                toolsRequired: ['Phone / RRR Dispatch'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Professional Only'
              }
            ]
          },
          estRepairCostINR: 2800,
          lifespanYears: 7,
          newPriceINR: 28000,
          weightKg: 12
        })
      }
    ]
  },

  // 7. Fans
  {
    id: 'fan',
    name: 'Fans (Ceiling / Stand / Exhaust)',
    shortName: 'Fan',
    icon: 'Fan',
    description: 'Ceiling fans, pedestal stand fans, and wall-mounted exhaust fans.',
    typicalLifespanYears: 10,
    newEquivalentPriceINR: 2800,
    averageWeightKg: 4.5,
    popularBrands: ['Crompton', 'Havells', 'Usha', 'Orient', 'Atomberg', 'Bajaj'],
    clarificationQuestions: [
      'Is the fan humming loudly but rotating very slowly, or requiring a manual push to start spinning?',
      'Does the fan wobble violently or produce a dry squeaking / grinding metallic noise?',
      'Is the regulator switch on the wall working at all speed settings?'
    ],
    defaultFaults: [
      {
        categoryName: 'Run Capacitor & Motor Bearings',
        keywords: ['slow', 'speed', 'hum', 'capacitor', 'bearing', 'wobble', 'squeak', 'push', 'noise'],
        commonSymptoms: [
          'Fan spins at 20% speed even at maximum regulator setting',
          'Fan hums and only starts spinning when manually pushed with a stick',
          'Squeaking or dry grinding chirp from top motor housing'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Aerofoil Fan Blades & Blade Brackets',
              description: 'Heavy electrostatic dust coating on leading blade edges and loose bracket mounting screw causing dynamic aerodynamic imbalance.',
              severity: 'Low',
              immediateFix: 'Wipe blades with damp microfiber cloth and tighten 6 blade bracket screws with Phillips screwdriver.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Motor Run Capacitor (2.25µF - 2.5µF 440VAC)',
              probabilityPercent: 88,
              rationale: 'Thermal aging in ceiling air pocket degraded metallized polypropylene film, dropping capacitance below 1.2µF.',
              riskIfIgnored: 'Auxiliary starting winding overheats, eventually causing short-circuit stator coil burnout.',
              verificationMethod: 'Test microfarads with capacitance meter or observe immediate restoration upon swapping fresh ₹40 capacitor.'
            },
            {
              component: 'Upper & Lower Ball Bearings (6201 / 6202)',
              probabilityPercent: 62,
              rationale: 'Factory grease dried up under years of continuous heat, causing dry ball friction and squeak.',
              riskIfIgnored: 'Bearing seizure causing rotor shaft lockup and electrical tripping.',
              verificationMethod: 'Spin fan blade slowly by hand: rotation should be silent and spin freely for >30 seconds.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'SHUT OFF MAINS POWER AT SWITCHBOARD: Always switch off the wall switch AND fan circuit breaker before climbing a ladder or touching capacitor wiring.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Disconnect power. Discharge capacitor by briefly touching its two wire tips together with insulated pliers before handling.',
            technicianRequired: false,
            requiredTools: ['Sturdy Step Ladder', 'Phillips Screwdriver', 'Replacement 2.5µF Capacitor (₹40)', 'Insulated Pliers', 'Microfiber Cloth'],
            steps: [
              {
                stepNumber: 1,
                title: 'Power Isolation at Wall Switch & Breaker',
                description: 'Turn off the wall fan switch. Confirm blades have completely stopped. Tape switch in OFF position.',
                safetyWarning: 'Ensure stable footing on stepladder. Do not stand on plastic chairs.',
                toolsRequired: ['Step ladder'],
                estimatedMinutes: 2,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Clean Dust & Balance Blades',
                description: 'Wipe all 3 blades thoroughly from root to tip. Tighten the 2 screws securing each blade to the motor hub.',
                toolsRequired: ['Microfiber cloth', 'Phillips screwdriver'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Slide Up Plastic Shroud & Swap 2.5µF Capacitor',
                description: 'Loosen screw holding upper ceiling canopy bell. Locate small black/white cylindrical capacitor. Note wire connections, unscrew wire terminal clamp, and insert new 2.5µF 440V capacitor.',
                safetyWarning: 'Touch insulated plastic body only. Never use higher than 2.5µF rating (overheats motor).',
                toolsRequired: ['Replacement 2.5µF Capacitor', 'Screwdriver'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 350,
          lifespanYears: 10,
          newPriceINR: 2800,
          weightKg: 4.5
        })
      }
    ]
  },

  // 8. Water Heaters / Geysers
  {
    id: 'geyser',
    name: 'Water Heaters & Geysers',
    shortName: 'Geyser',
    icon: 'Droplets',
    description: 'Instant and storage electric water heaters (10L - 25L).',
    typicalLifespanYears: 7,
    newEquivalentPriceINR: 9500,
    averageWeightKg: 14,
    popularBrands: ['AO Smith', 'Racold', 'Bajaj', 'Havells', 'Crompton', 'V-Guard', 'Venus'],
    clarificationQuestions: [
      'Is the water not heating at all while the indicator lamp is OFF or red?',
      'Do you feel a slight electric tingle or shock when touching the water tap or metal shower pipe?',
      'Is water leaking from the bottom base plate or around the brass pressure relief valve?'
    ],
    defaultFaults: [
      {
        categoryName: 'Heating Element & Thermal Cutout',
        keywords: ['not heat', 'cold water', 'leak', 'tripping', 'mcb', 'shock', 'element', 'scale', 'lukewarm'],
        commonSymptoms: [
          'Water remains cold; geyser indicator lights do not turn on',
          'Home MCB trips immediately when geyser switch is turned ON',
          'Water is only lukewarm even after 45 minutes of heating'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: true,
        dangerDescription: 'EXTREME ELECTRICAL & SCALDING HAZARD: 230V AC immersion heating element in direct contact with water. Risk of lethal shock or scald burns.',
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Pressure Relief Valve (PRV) & Inlet Pipes',
              description: 'Inspection of lower plumbing connection: minor calcium lime crusted around pressure relief valve discharge nozzle.',
              severity: 'Low',
              immediateFix: 'Manually flick PRV spring lever twice to flush loose lime grit; ensure overflow drain pipe is routed to drain.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: '2000W Copper/Incoloy Immersion Heating Element',
              probabilityPercent: 86,
              rationale: 'Severe calcium carbonate hard water scale encrustation insulating copper sheath, causing overheating and sheath rupture.',
              riskIfIgnored: 'Direct electrical grounding into bathroom water stream, posing lethal shock hazard.',
              verificationMethod: 'Isolate power, test resistance across element terminals (approx 26-28Ω) and check insulation resistance with Megger.'
            },
            {
              component: 'Bimetallic Safety Thermal Cutout (90°C Trip)',
              probabilityPercent: 74,
              rationale: 'Element overheating tripped the secondary manual reset thermal protector button under lower plastic cover.',
              riskIfIgnored: 'Repeated tripping or thermostat failure leading to excessive steam pressure.',
              verificationMethod: 'Check continuity across thermal cutout switch contacts.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: false,
            difficulty: 'Professional Only',
            overallSafetyNotice: 'CRITICAL SHOCK & WATER HAZARD: Water heaters combine 2000W electricity with pressurized water. Never open the lower electrical panel while geyser is plugged in or filled with hot water. If electric shock is felt, SHUT OFF MCB IMMEDIATELY and contact an authorized plumber/electrician.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Shut off geyser switch and MCB immediately. Never operate a geyser without confirmed earthing (ground wire).',
            technicianRequired: true,
            requiredTools: ['MCB Breaker Switch (Safety Only)'],
            steps: [
              {
                stepNumber: 1,
                title: 'Immediate Mains MCB Isolation',
                description: 'Turn OFF the geyser wall switch and pull down the dedicated MCB on your distribution board.',
                safetyWarning: 'If any electric shock or tingling was felt in water, do NOT touch water taps until MCB is tripped.',
                toolsRequired: ['None'],
                estimatedMinutes: 1,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Inspect External Thermal Reset Button',
                description: 'On many storage geysers, a small red button labeled "RESET" is located on the underside. If geyser simply failed to turn on, press this button firmly until a click is felt.',
                safetyWarning: 'Ensure power switch is strictly OFF before pressing.',
                toolsRequired: ['None'],
                estimatedMinutes: 3,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Book Certified Plumber/Electrician for Element Swap',
                description: 'Replacing the scaled heating element (cost ~₹650 for OEM copper element) requires draining 15-25L water and replacing the rubber flange gasket. Use a verified technician.',
                safetyWarning: 'Strictly technician-only procedure to guarantee earthing integrity.',
                toolsRequired: ['Phone / RRR Dispatch'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Professional Only'
              }
            ]
          },
          estRepairCostINR: 1250,
          lifespanYears: 7,
          newPriceINR: 9500,
          weightKg: 14
        })
      }
    ]
  },

  // 9. Mixers and Grinders
  {
    id: 'mixer-grinder',
    name: 'Mixers & Grinders',
    shortName: 'Mixer',
    icon: 'RotateCw',
    description: 'Mixer grinders, blenders, and food processing kitchen units.',
    typicalLifespanYears: 8,
    newEquivalentPriceINR: 3800,
    averageWeightKg: 4.8,
    popularBrands: ['Preethi', 'Philips', 'Bajaj', 'Sujata', 'Butterfly', 'Bosch'],
    clarificationQuestions: [
      'Did the mixer abruptly shut down while grinding thick batter, with a burning smell from the bottom base?',
      'Does the jar blade feel stiff or completely jammed when you try to rotate it with your fingers?',
      'Is there liquid leaking from the jar bottom into the motor coupling socket?'
    ],
    defaultFaults: [
      {
        categoryName: 'Motor Overload & Coupler Breakdown',
        keywords: ['shut off', 'stopped', 'jam', 'stiff', 'coupler', 'overload', 'red button', 'leak jar', 'carbon brush', 'spark'],
        commonSymptoms: [
          'Motor stopped suddenly during heavy load; won’t start',
          'Plastic teeth on top motor coupler chewed out or cracked',
          'Jar blade stuck; burning plastic / carbon brush smell'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Motor & Jar Drive Coupler Teeth',
              description: 'Teeth on rubber/nylon drive coupler stripped or rounded off due to jar being placed while motor was still spinning.',
              severity: 'Medium',
              immediateFix: 'Pry off stripped coupler with flat-head screwdriver; screw on fresh universal coupler (cost ~₹40).',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Jar Brass Bushing & Rubber Oil Seal',
              description: 'Hardened batter seepage into jar brass bush causing blade spindle friction and seizure.',
              severity: 'Low',
              immediateFix: 'Pour 5 drops of coconut or edible cooking oil down jar blade shaft and rotate manually with cloth.',
              evidenceSource: 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Bi-metallic Overload Protector Switch (OLP)',
              probabilityPercent: 92,
              rationale: 'Thermal bimetal strip in bottom OLP tripped automatically to protect universal motor from winding burnout.',
              riskIfIgnored: 'Repeated forcing without cooling melts armature commutator insulation.',
              verificationMethod: 'Cool unit for 15 minutes, press red trip button located under mixer bottom plate.'
            },
            {
              component: 'Carbon Brushes (Grade E-14 Motor)',
              probabilityPercent: 58,
              rationale: 'Carbon brushes worn down past minimum wear mark, causing heavy sparking and power cutouts.',
              riskIfIgnored: 'Copper brush spring rubs against copper commutator bars, scoring rotor shaft.',
              verificationMethod: 'Inspect carbon length: replace if under 6mm length.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'Unplug power plug from wall socket before touching couplers or bottom reset button.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Always unplug mixer before inspecting drive teeth. Never operate jars without lids firmly seated.',
            technicianRequired: false,
            requiredTools: ['Flathead Screwdriver', 'Edible Cooking / Coconut Oil', 'Clean Rag', 'Replacement Coupler (₹40)'],
            steps: [
              {
                stepNumber: 1,
                title: 'Press The Red Overload Reset Button',
                description: 'Unplug mixer. Let motor cool for 15 minutes. Invert the mixer base. Locate the small red push-button at the bottom center. Press it firmly until it clicks in.',
                safetyWarning: 'Ensure power cord is unplugged before inverting.',
                toolsRequired: ['None (Manual)'],
                estimatedMinutes: 3,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Free Up Jammed Jar Blade',
                description: 'If blade is hard to turn, invert jar. Add 4-5 drops of cooking oil onto brass spindle. Grasp blade from inside with a thick cloth and twist back and forth until it spins freely.',
                safetyWarning: 'Always hold sharp stainless blades with a folded cloth to prevent cuts.',
                toolsRequired: ['Cooking oil', 'Thick cloth'],
                estimatedMinutes: 6,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Replace Stripped Plastic Drive Coupler',
                description: 'If motor spins but jar blade does not engage, insert flathead screwdriver under motor coupler and pry gently upwards (or turn clockwise if reverse-threaded). Press on new coupler.',
                toolsRequired: ['Flathead Screwdriver', 'Replacement Coupler'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 250,
          lifespanYears: 8,
          newPriceINR: 3800,
          weightKg: 4.8
        })
      }
    ]
  },

  // 10. Dishwashers
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    shortName: 'Dishwasher',
    icon: 'Utensils',
    description: 'Freestanding and built-in 12 to 16 place setting dishwashers.',
    typicalLifespanYears: 9,
    newEquivalentPriceINR: 38000,
    averageWeightKg: 48,
    popularBrands: ['Bosch', 'IFB', 'LG', 'Siemens', 'Voltas Beko', 'Faber'],
    clarificationQuestions: [
      'Is water pooling at the bottom sump basin after the cycle finishes without draining?',
      'Are dishes coming out gritty with chalky food residue or white film?',
      'Is error code E15 or tap symbol flashing with continuous drain pump humming?'
    ],
    defaultFaults: [
      {
        categoryName: 'Drain Pump & Spray Arm Filtration',
        keywords: ['not drain', 'e15', 'dirty dishes', 'white film', 'spray arm', 'filter', 'water leak', 'sump', 'smell'],
        commonSymptoms: [
          'Standing pool of murky water in tub bottom after cycle',
          'Dishes dirty with white lime or baked-on food particles',
          'Spray arms blocked with lemon seeds or toothpick fragments'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Cylindrical Micro-Filter Assembly (Basin Sump)',
              description: 'Fine stainless mesh screen choked with grease sludge and trapped bone fragments.',
              severity: 'Medium',
              immediateFix: 'Rotate cylindrical filter counter-clockwise, lift out, scrub with dish soap and toothbrush under warm tap.',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Upper & Lower Rotating Spray Arm Nozzles',
              description: 'Several jet holes obstructed by lemon seeds and calcium deposits, preventing water curtain rotation.',
              severity: 'Low',
              immediateFix: 'Unclip spray arm, shake out debris, clear individual jet holes with wooden toothpick.',
              evidenceSource: 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Drain Pump Impeller & Non-Return Check Valve',
              probabilityPercent: 74,
              rationale: 'Small broken glass fragment or olive pit jammed between magnetic pump impeller blades, stopping rotation.',
              riskIfIgnored: 'Drain pump synchronous motor coil burns out from locked-rotor current.',
              verificationMethod: 'Remove filter, pop off white pump impeller cover, check if plastic impeller spins freely with fingertip.'
            },
            {
              component: 'Anti-Flood Float Switch (Error E15)',
              probabilityPercent: 62,
              rationale: 'Slow leak from door perimeter or sump gasket accumulated in bottom drip tray, raising styrofoam safety float.',
              riskIfIgnored: 'Continuous drain pump running preventing any new cycle from starting.',
              verificationMethod: 'Tilt machine 45 degrees backward (unplugged) to drain base pan and reset float.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'Unplug power cord and shut off water isolation valve before servicing drain filter or sump.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Disconnect mains power. Watch for broken glass shards inside the bottom sump.',
            technicianRequired: false,
            requiredTools: ['Old Toothbrush', 'Wooden Toothpick', 'Dish Soap', 'Sponge', 'Rubber Gloves'],
            steps: [
              {
                stepNumber: 1,
                title: 'Remove & Clean Triple Stage Filter',
                description: 'Pull out bottom dish rack. Turn cylindrical micro-filter 1/4 turn counter-clockwise. Lift filter basket out. Scrub mesh under warm running tap with an old toothbrush.',
                safetyWarning: 'Inspect sump basin with flashlight for sharp broken glass before reaching in.',
                toolsRequired: ['Toothbrush', 'Dish soap', 'Rubber gloves'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Unclog Spray Arm Jets',
                description: 'Gently unscrew upper and lower spray arms. Use a wooden toothpick to poke trapped seeds out of nozzles. Flush water through center hub.',
                toolsRequired: ['Toothpick'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Check Drain Pump Impeller Freedom',
                description: 'Inside the filter recess, unclip the small white plastic impeller cover (if equipped). Use a gloved finger to flick the impeller wings: they should rotate with slight magnetic resistance.',
                toolsRequired: ['Rubber gloves', 'Flashlight'],
                estimatedMinutes: 5,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 1100,
          lifespanYears: 9,
          newPriceINR: 38000,
          weightKg: 48
        })
      }
    ]
  },

  // 11. Electric Irons
  {
    id: 'electric-iron',
    name: 'Electric Irons & Steam Irons',
    shortName: 'Iron',
    icon: 'Shirt',
    description: 'Dry irons, steam irons, and heavy fabric pressing units.',
    typicalLifespanYears: 6,
    newEquivalentPriceINR: 1950,
    averageWeightKg: 1.4,
    popularBrands: ['Philips', 'Bajaj', 'Morphy Richards', 'Usha', 'Havells', 'Crompton'],
    clarificationQuestions: [
      'Does the iron fail to heat up completely with the indicator lamp remaining dark at all dial settings?',
      'Is brown dirty water or calcified white flakes spitting out from the soleplate steam holes?',
      'Does the power cord swivel joint at the rear of the handle feel loose, frayed, or intermittently cut power?'
    ],
    defaultFaults: [
      {
        categoryName: 'Soleplate Heating & Power Cord Fatigue',
        keywords: ['not heat', 'cold', 'cord', 'wire', 'frayed', 'light off', 'calc', 'scale', 'steam', 'stuck', 'soleplate', 'burn fabric'],
        commonSymptoms: [
          'Iron not heating up; indicator light does not turn on',
          'Power cuts in and out when wiggling handle power cord',
          'Steam vents clogged with white chalk; brown water stains fabric'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'Handle Swivel Power Cord & Rubber Grommet',
              description: 'Internal copper strand fatigue and insulation fraying near handle strain relief due to repetitive ironing flexion.',
              severity: 'High',
              immediateFix: 'Do not use with frayed cord; replace 3-core heat-resistant silicone cord with molded 16A 3-pin plug (₹150).',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Soleplate Steam Vent Nozzles & Non-Stick Coating',
              description: 'Hard water calcium scale clogging steam chambers and fabric starch scorched onto ceramic/Teflon soleplate.',
              severity: 'Low',
              immediateFix: 'Clean cold soleplate with baking soda & vinegar paste; run internal calc-clean steam burst cycle.',
              evidenceSource: 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Thermal Fuse (240°C 10A Safety Link)',
              probabilityPercent: 78,
              rationale: 'Thermostat contact chatter or overheating blew the non-resettable thermal fuse crimped inside handle.',
              riskIfIgnored: 'Dead iron with zero power delivery to heater element.',
              verificationMethod: 'Multimeter continuity test across inline thermal fuse sleeve.'
            },
            {
              component: 'Bimetallic Thermostat Contact Points',
              probabilityPercent: 62,
              rationale: 'Carbon arcing pitting electrical contacts, causing premature opening or sticking ON (burning fabrics).',
              riskIfIgnored: 'Extreme overheating melting plastic casing or fire hazard.',
              verificationMethod: 'Inspect contact separation while rotating temperature dial.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'SHOCK & BURN HAZARD: Never perform repairs while plugged in. Allow soleplate to cool for 45 minutes before cleaning.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Unplug power cord. Any cord with exposed copper strands must be replaced immediately before further use.',
            technicianRequired: false,
            requiredTools: ['White Vinegar', 'Baking Soda', 'Cotton Swabs', 'Soft Cloth', 'Clean Water'],
            steps: [
              {
                stepNumber: 1,
                title: 'Clean Starch & Scorched Soleplate',
                description: 'Mix 1 tablespoon of baking soda with 1 teaspoon of water to form paste. Rub gently onto cold soleplate with a soft cloth. Wipe clean with damp towel.',
                safetyWarning: 'Never scrub with steel wool or abrasive metal scourers (scratches non-stick coating).',
                toolsRequired: ['Baking soda', 'Soft cloth'],
                estimatedMinutes: 8,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Vinegar Steam Descaling Flush',
                description: 'Fill water tank 50% with equal parts white vinegar and distilled water. Plug iron in, turn to MAX steam for 5 minutes. Hold iron over sink and press steam burst button repeatedly to blow out lime scale.',
                safetyWarning: 'Steam and vinegar fumes are hot: perform in well-ventilated area.',
                toolsRequired: ['White vinegar', 'Distilled water'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Inspect Power Cord & Plug',
                description: 'Inspect entire length of braided cord. If copper is visible or handle joint cuts out when bent, take to neighborhood repair shop for a quick ₹150 cord replacement.',
                toolsRequired: ['Visual inspection'],
                estimatedMinutes: 3,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 250,
          lifespanYears: 6,
          newPriceINR: 1950,
          weightKg: 1.4
        })
      }
    ]
  },

  // 12. Water Purifiers
  {
    id: 'water-purifier',
    name: 'Water Purifier & RO Systems',
    shortName: 'Water Purifier',
    icon: 'Filter',
    description: 'Reverse Osmosis (RO), UV, UF, and multi-stage alkaline domestic water purifiers.',
    typicalLifespanYears: 7,
    newEquivalentPriceINR: 14500,
    averageWeightKg: 8.5,
    popularBrands: ['Kent', 'Aquaguard / Eureka Forbes', 'Pureit', 'Livpure', 'Havells', 'Blue Star'],
    clarificationQuestions: [
      'Is purified water flowing into the storage tank as a thin trickle or stopped completely?',
      'Is reject / waste water running continuously through the drain pipe even after the tank is full?',
      'Does the purified drinking water have a strange bitter taste or high TDS reading?'
    ],
    defaultFaults: [
      {
        categoryName: 'Sediment Filter Choke & RO Membrane Depletion',
        keywords: ['trickle', 'slow flow', 'waste water', 'leak', 'tds', 'taste', 'smell', 'pump noise', 'filter', 'membrane', 'beep'],
        commonSymptoms: [
          'Purified water dripping in very slow drops; tank takes 6+ hours to fill',
          'Waste water tube drains continuously 24/7 without stopping',
          'Booster pump vibrates loudly or emits high-pitched buzzing'
        ],
        hasElectricalHazard: true,
        isDangerousForDIY: false,
        generateDiagnosis: ({ label, hasImage }) => ({
          visibleFaults: [
            {
              component: 'External Spun Polypropylene (PP) Pre-Filter Candle',
              description: 'External transparent bowl shows white PP sediment candle darkened to deep mud-brown, choking raw water pressure.',
              severity: 'Medium',
              immediateFix: 'Unscrew bowl with plastic spanner, flush housing, replace 5-micron spun candle (cost ~₹120).',
              evidenceSource: hasImage ? 'Visual Inspection (Image)' : 'User Description',
              confidence: 'Confirmed'
            },
            {
              component: 'Push-Fit 1/4" Collet Elbow Fittings & Tubing',
              description: 'Minor drip leak from 1/4 inch blue/white RO tubing joint near booster pump inlet.',
              severity: 'Low',
              immediateFix: 'Push tubing firmly into quick-connect collet; trim flattened tube end square with sharp blade.',
              evidenceSource: 'Operational Inference',
              confidence: 'Confirmed'
            }
          ],
          hiddenFaults: [
            {
              component: 'Reverse Osmosis (RO) Thin-Film Membrane (75/80 GPD)',
              probabilityPercent: 82,
              rationale: 'Dissolved calcium/magnesium scaling blocked microscopic 0.0001 micron membrane pores, cutting pure water permeate flow.',
              riskIfIgnored: 'Excessive backpressure damages booster pump head and diaphragm seals.',
              verificationMethod: 'Measure TDS of raw input vs permeate output: rejection efficiency should be >90%.'
            },
            {
              component: 'Automatic Shut-Off Valve (ASV) / 24V Solenoid Valve (SV)',
              probabilityPercent: 68,
              rationale: 'Internal rubber diaphragm in ASV or solenoid valve stuck open with silt, allowing waste water to drain non-stop.',
              riskIfIgnored: 'Hundreds of liters of drinking water wasted down drain every day.',
              verificationMethod: 'Disconnect power: waste water should stop draining instantly within 15 seconds.'
            }
          ],
          diyGuidance: {
            feasibleForDIY: true,
            difficulty: 'Easy',
            overallSafetyNotice: 'Unplug 24V power adapter and close blue inlet water tap before servicing filters.',
            hasElectricalHazard: true,
            electricalSafetyNotice: 'Always isolate electrical power supply and close raw water ball valve before unscrewing filter housings.',
            technicianRequired: false,
            requiredTools: ['Housing Spanner Wrench', 'Replacement PP Spun Candle (₹120)', 'Bucket / Basin', 'Sharp Utility Knife'],
            steps: [
              {
                stepNumber: 1,
                title: 'Close Raw Water Inlet & Disconnect Power',
                description: 'Turn off the small blue/chrome valve connected to your kitchen water tap. Unplug the 24V DC power adapter from the wall socket.',
                toolsRequired: ['None'],
                estimatedMinutes: 2,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 2,
                title: 'Replace External 5-Micron Pre-Filter Candle',
                description: 'Slide bucket below external pre-filter cylinder. Use plastic ring spanner to unscrew bowl clockwise (looking from top). Discard brown cartridge, rinse bowl with tap water, insert new white PP candle and tighten securely.',
                safetyWarning: 'Ensure black rubber O-ring sits flat in bowl groove to prevent leaks.',
                toolsRequired: ['Housing Wrench', 'New PP Candle (₹120)', 'Bucket'],
                estimatedMinutes: 10,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              },
              {
                stepNumber: 3,
                title: 'Flush & Check Waste Water Shutoff',
                description: 'Open water tap, plug in power adapter. Allow system to run for 5 minutes. Close pure water storage tank valve: waste water flow should stop within 30-45 seconds. If it keeps draining, replace the Solenoid Valve.',
                toolsRequired: ['None'],
                estimatedMinutes: 6,
                userSafe: true,
                skillLevel: 'Beginner-Friendly'
              }
            ]
          },
          estRepairCostINR: 1450,
          lifespanYears: 7,
          newPriceINR: 14500,
          weightKg: 8.5
        })
      }
    ]
  }
];

// Helper to find category by label or category string
export function findApplianceCategory(input: string): ApplianceCategory {
  const text = (input || '').toLowerCase();
  
  if (text.includes('microwave') || text.includes('oven')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'microwave')!;
  }
  if (text.includes('inverter') || text.includes('ups') || text.includes('battery')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'inverter')!;
  }
  if (text.includes('fridge') || text.includes('refrigerat')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'refrigerator')!;
  }
  if (text.includes('wash') || text.includes('spin') || text.includes('drum')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'washing-machine')!;
  }
  if (text.includes('ac') || text.includes('air cond') || text.includes('split') || text.includes('window ac')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'air-conditioner')!;
  }
  if (text.includes('tv') || text.includes('televis') || text.includes('led') || text.includes('screen') || text.includes('oled')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'television')!;
  }
  if (text.includes('fan') || text.includes('ceiling') || text.includes('cooler')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'fan')!;
  }
  if (text.includes('geyser') || text.includes('water heat') || text.includes('heater') || text.includes('hot water')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'geyser')!;
  }
  if (text.includes('mixer') || text.includes('grinder') || text.includes('blender') || text.includes('juicer')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'mixer-grinder')!;
  }
  if (text.includes('dishwash') || text.includes('dish')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'dishwasher')!;
  }
  if (text.includes('iron') || text.includes('steam iron') || text.includes('press')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'electric-iron')!;
  }
  if (text.includes('purif') || text.includes('ro') || text.includes('water filter') || text.includes('aquaguard') || text.includes('kent')) {
    return APPLIANCE_CATEGORIES.find(c => c.id === 'water-purifier')!;
  }

  // Default to washing machine if no match
  return APPLIANCE_CATEGORIES[3];
}

// Check if description is too brief / insufficient
export function checkEvidenceSufficiency(symptoms: string, hasImage: boolean): {
  isSufficient: boolean;
  quality: 'Detailed' | 'Moderate' | 'Vague / Insufficient';
  reason?: string;
} {
  const clean = (symptoms || '').trim();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const lower = clean.toLowerCase();

  // If literally just "not working", "broken", "issue", "fault" and no image
  const tooGeneric = ['not working', 'broken', 'not turning on', 'issue', 'problem', 'repair', 'fault', 'bad'].includes(lower);

  if (wordCount < 4 || tooGeneric) {
    if (!hasImage) {
      return {
        isSufficient: false,
        quality: 'Vague / Insufficient',
        reason: 'Symptom description is very brief and no appliance photo was provided. Please describe visible signs, sounds, lights, or error codes.'
      };
    }
    return {
      isSufficient: true,
      quality: 'Moderate',
      reason: 'Description is brief, but appliance photo is available for visual inspection.'
    };
  }

  if (wordCount < 7) {
    return {
      isSufficient: true,
      quality: 'Moderate'
    };
  }

  return {
    isSufficient: true,
    quality: 'Detailed'
  };
}

