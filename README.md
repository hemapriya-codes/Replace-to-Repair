# Project RRR (Repair First, Replace Last)

> **Core Motto:** *Diagnose Smartly. Repair First. Replace Only When Necessary.*  
> **Team:** Quantum Four  
> **Location:** Visakhapatnam, Andhra Pradesh, India  
> **Document & Build Version:** 2.0 (Master Comprehensive Specification)  

---

## 🌟 Executive Summary & Vision

**Project RRR** is an AI-powered global diagnostic platform engineered to eliminate premature appliance disposal, combat consumer financial opacity, and preserve tier-2 urban family wealth. It combines computer vision fault isolation, acoustic harmonic analysis, and mathematical feasibility modeling to calculate whether a broken machine is worth repairing versus replacing.

---

## 📐 The Economic Brain ("Repair vs. Replace" Feasibility Index)

At the heart of Project RRR is the **Economic Brain**, an algorithmic scorecard calculating a mathematical viability score using the master PRD formula:

$$\text{Viability Score} = 100 - \left( \frac{\text{Est. Repair Cost}}{\text{Price of New Equivalent}} \times 100 \times \left(1 + \frac{\text{Current Age}}{\text{Expected Lifespan}}\right) \right)$$

### Dynamic Color-Coded Thresholds

| Viability Tier | Score Range | Action & Recommendation | Impact & Output |
| :--- | :--- | :--- | :--- |
| **🟢 Green (High Viability)** | **Score > 65** | **Minor/Moderate Fix:** Repair immediately | Displays exact net monetary savings (e.g. *Fixing saves ₹18,000 vs. buying new*) |
| **🟡 Yellow (Moderate)** | **Score 40 – 65** | **Budget / DIY Intervention:** Viable via DIY steps or neighborhood technician | Prevents inflated OEM authorized quotes |
| **🔴 Red (End of Life)** | **Score < 40** | **Structural / Hazardous Failure:** Route directly to recyclers | Connects to APPCB-authorized E-Waste Recyclers in Auto Nagar, Vizag |

---

## 🚀 Key Modules & System Architecture

### 1. Module 1: AI Diagnostic & Product Identification Engine
- **Multimodal Computer Vision:** Inspects photos for physical chassis wear, stress fractures, rust, and level displacement.
- **Product Metadata Extraction:** Identifies brand, model number, warranty status, and estimated manufacturing year.
- **Fault Isolation:**
  - *Visible/External Faults:* Component damage, severity indicators, and immediate fixes.
  - *Internal/Hidden Faults:* Calculates percentage-based failure probabilities (e.g., *78% chance of internal drum bearing wear*), engineering rationales, and risks if ignored.
- **DIY Guidance:** Clear, step-by-step DIY repair instructions with tools required, estimated time, and mandatory safety notices.

### 2. Module 2: The Economic Brain
- Live score calculation with step-by-step mathematical breakdown.
- Interactive **"What-If" Parameter Simulator** allowing real-time adjustment of repair quotes and machine age.

### 3. Module 3: Local Repair Shop Matching & Geolocation
- Filterable localized service cards across **Visakhapatnam**:
  - *Sri Balaji Appliance Care & Motor Works* (MVP Colony, Sector 4 • 1.2 km • 4.9 ⭐)
  - *Vizag Tech Care & Micro Electronics* (Siripuram Junction • 2.8 km • 4.7 ⭐)
  - *Coastal Home Appliance Experts* (Madhurawada • 4.5 km • 4.8 ⭐)
  - *Dwaraka QuickFix Multi-Brand Service* (Dwaraka Nagar • 3.1 km • 4.6 ⭐)
  - *Gajuwaka Industrial & Household Spares* (Gajuwaka Main Road • 9.4 km • 4.8 ⭐)
- Doorstep technician booking modal and direct contact dispatch.
- Integrated **APPCB-Authorized E-Waste Recyclers** in Auto Nagar and Gambheeram.

### 4. Module 4: Analytics, Cost Trends & Impact Meters
- **Multi-Year Cost Divergence Chart:** Recharts visualization tracking repair expenditure vs. replacement appliance inflation from 2022 to 2026.
- **E-Waste & Cost Reduction Impact Meters:** Real-time tracking of cumulative weight (kg) diverted from landfills, money saved (₹), and CO₂ emissions prevented.
- **History & Previous Checks:** Searchable archive with status toggling (*Repaired*, *Recycled*, *Pending*) and instant score audits.

### 5. Module 5: Floating AI Assistant Bot
- Collapsible bottom-right widget: **`Ask RRR AI Assistant`**.
- Context-aware support providing spare part procurement advice in Vizag (Siripuram, Gajuwaka), safety protocols, and DIY guidance.

---

## 🛠️ Comprehensive Technical Stack

- **Frontend:** React 18/19, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, Canvas Confetti.
- **Backend & Proxy Layer:** Node.js, Express, Multer, CORS, Express-Rate-Limit, Dotenv.
- **AI & Multimodal Intelligence:** Google Gemini API (`gemini-2.5-flash` via `@google/generative-ai`) with intelligent offline rule-engine fallback.
- **Persistence:** LocalStorage sync, JSON repository, and Express REST APIs.

---

## ⚡ Quick Start Guide

### Option 1: Run Full Production App in One Command (Port 5000)
```bash
# Starts both Express backend and pre-built frontend UI
npm start
```
Open your browser to: **`http://localhost:5000`**

### Option 2: Run in Development Mode with Hot Reload
In two separate terminals:
```bash
# Terminal 1: Backend API Server (Port 5000)
npm run server

# Terminal 2: Vite React Frontend (Port 5173)
npm run client
```
Open your browser to: **`http://localhost:5173`** (Vite automatically proxies `/api` calls to port 5000).

---

## 🔑 Gemini AI API Configuration

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Either:
   - Create `server/.env` and set `GEMINI_API_KEY=your_api_key_here`
   - Or paste your API key directly in the **Settings** view in the web UI.
3. *Note: If no API key is provided, Project RRR automatically utilizes its built-in expert rule engine with zero interruptions!*

---

## 👥 Credits

**Team:** Quantum Four  
**Headquarters:** Visakhapatnam, Andhra Pradesh, India  
**Target Audience:** Urban middle-class households, working professionals, and student renters worldwide.
