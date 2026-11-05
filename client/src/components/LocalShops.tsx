import React, { useState } from 'react';
import { LocalRepairShop } from '../types';
import { 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Wrench, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Calendar, 
  Sparkles,
  Recycle,
  Navigation,
  MessageSquare,
  Filter,
  Info,
  AlertCircle
} from 'lucide-react';
import { VIZAG_EWASTE_RECYCLERS, VIZAG_LOCAL_SHOPS } from '../mockData';

interface LocalShopsProps {
  shops: LocalRepairShop[];
  userLocation: string;
  isEndOfLife?: boolean;
  applianceCategory?: string;
}

export const LocalShops: React.FC<LocalShopsProps> = ({
  shops: initialShops,
  userLocation,
  isEndOfLife = false,
  applianceCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'repair' | 'recycle'>(
    isEndOfLife ? 'recycle' : 'repair'
  );
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'Open' | 'Closed' | 'Temporarily Unavailable'>('All');
  const [contactModalShop, setContactModalShop] = useState<LocalRepairShop | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerSlot, setCustomerSlot] = useState('Today (Express within 3 Hours)');

  // Localities available in Vizag database
  const vizagLocalities = [
    'All',
    'MVP Colony',
    'Siripuram',
    'Madhurawada',
    'Dwaraka Nagar',
    'Gajuwaka',
    'Rushikonda',
    'Kurmannapalem'
  ];

  // Base list combines passed shops and catalog
  const allShops = initialShops && initialShops.length > 0 ? initialShops : VIZAG_LOCAL_SHOPS;

  // Filter based on locality, status, and appliance category
  const filteredShops = allShops.filter((shop) => {
    // Locality filter
    if (selectedLocality !== 'All') {
      if (!shop.locality.toLowerCase().includes(selectedLocality.toLowerCase())) {
        return false;
      }
    }

    // Status filter
    if (selectedStatusFilter !== 'All') {
      if (shop.status !== selectedStatusFilter) {
        return false;
      }
    }

    return true;
  });

  const handleOpenContact = (shop: LocalRepairShop) => {
    setContactModalShop(shop);
    setBookingSuccess(null);
  };

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(`Booking request dispatched to ${contactModalShop?.name}! Their service coordinator will call ${customerPhone || 'you'} shortly.`);
    setTimeout(() => {
      setContactModalShop(null);
      setBookingSuccess(null);
      setCustomerName('');
      setCustomerPhone('');
    }, 3500);
  };

  return (
    <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
      {/* Header and Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-industrial-800/80 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Local Partner & Service Center Matching</span>
              <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                Visakhapatnam Hub
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified neighborhood workshops with real-time availability status
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-industrial-950 p-1 border border-industrial-800">
          <button
            onClick={() => setActiveTab('repair')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'repair'
                ? 'bg-brand-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Repair Shops</span>
          </button>
          <button
            onClick={() => setActiveTab('recycle')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'recycle'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Recycle className="h-3.5 w-3.5" />
            <span>E-Waste Recyclers</span>
          </button>
        </div>
      </div>

      {/* Requirement 3: Explicit Demonstration Sample Data Disclosure */}
      <div className="mt-3 rounded-xl border border-sky-500/30 bg-sky-950/20 px-3.5 py-2.5 text-xs text-sky-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="h-4 w-4 shrink-0 text-sky-400" />
          <span>
            <strong>Demonstration Sample Data:</strong> Shop listings, availability schedules, and contacts shown below are prototype sample data for demonstration.
          </span>
        </div>
        <span className="text-[10px] font-mono bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded border border-sky-700/50">
          Prototype Mode
        </span>
      </div>

      {/* Interactive Locality & Availability Filter Bar */}
      {activeTab === 'repair' && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl border border-industrial-800 bg-industrial-950">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 text-brand-400" />
              Zone:
            </span>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="rounded-lg border border-industrial-700 bg-industrial-900 px-2.5 py-1 text-xs text-slate-200 focus:border-brand-500 focus:outline-none font-mono"
            >
              {vizagLocalities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Visakhapatnam' : loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-brand-400" />
              Availability:
            </span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
              className="rounded-lg border border-industrial-700 bg-industrial-900 px-2.5 py-1 text-xs text-slate-200 focus:border-brand-500 focus:outline-none font-mono"
            >
              <option value="All">All Statuses</option>
              <option value="Open">🟢 Open Now</option>
              <option value="Closed">🔴 Closed</option>
              <option value="Temporarily Unavailable">🟡 Temporarily Unavailable</option>
            </select>
          </div>

          <span className="text-[11px] font-mono text-slate-400 ml-auto">
            Showing {filteredShops.length} workshop{filteredShops.length === 1 ? '' : 's'}
          </span>
        </div>
      )}

      {/* Contact & Booking Modal */}
      {contactModalShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-industrial-700 bg-industrial-950 p-6 shadow-2xl">
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Dispatch Confirmed!</h4>
                <p className="text-xs text-slate-300">{bookingSuccess}</p>
                <div className="text-[10px] text-slate-500 font-mono">
                  (Simulated Dispatch Confirmation for Prototype Evaluation)
                </div>
              </div>
            ) : (
              <form onSubmit={confirmBooking} className="space-y-4">
                <div className="border-b border-industrial-800 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brand-400 uppercase font-bold">
                      Direct Workshop Contact
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      contactModalShop.status === 'Open'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : contactModalShop.status === 'Closed'
                        ? 'bg-slate-900 text-slate-400 border-slate-700'
                        : 'bg-amber-950 text-amber-400 border-amber-800'
                    }`}>
                      {contactModalShop.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{contactModalShop.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{contactModalShop.address}</p>
                </div>

                <div className="rounded-xl border border-industrial-800 bg-industrial-900/60 p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">Direct Phone Line</span>
                    <a href={`tel:${contactModalShop.phone}`} className="text-sm font-bold text-brand-400 font-mono hover:underline">
                      {contactModalShop.phone}
                    </a>
                  </div>
                  <a
                    href={`tel:${contactModalShop.phone}`}
                    className="rounded-lg bg-industrial-800 hover:bg-industrial-700 px-3 py-1.5 text-xs text-white flex items-center space-x-1"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Call Now</span>
                  </a>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98480 00000"
                      className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Preferred Service Slot</label>
                    <select
                      value={customerSlot}
                      onChange={(e) => setCustomerSlot(e.target.value)}
                      className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                    >
                      <option>Today (Express within 3 Hours)</option>
                      <option>Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                      <option>Tomorrow Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalShop(null)}
                    className="flex-1 rounded-xl border border-industrial-700 bg-industrial-900 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand-500/20 hover:bg-brand-400"
                  >
                    Confirm Dispatch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Content Body */}
      {activeTab === 'repair' ? (
        <div className="mt-4 space-y-3">
          {filteredShops.length === 0 ? (
            <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-6 text-center text-xs text-slate-400 space-y-2">
              <AlertCircle className="h-6 w-6 text-slate-500 mx-auto" />
              <p>No workshops matching the selected location or availability filter.</p>
              <button
                onClick={() => {
                  setSelectedLocality('All');
                  setSelectedStatusFilter('All');
                }}
                className="text-xs text-brand-400 underline font-semibold"
              >
                Reset filters to view all workshops
              </button>
            </div>
          ) : (
            filteredShops.map((shop) => {
              // Status Badge styling
              const statusStyle =
                shop.status === 'Open'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                  : shop.status === 'Closed'
                  ? 'bg-slate-900 text-slate-400 border-slate-700'
                  : 'bg-amber-950 text-amber-300 border-amber-800/80';

              return (
                <div
                  key={shop.id}
                  className="group rounded-xl border border-industrial-800 bg-industrial-950/70 p-4 transition-all hover:border-brand-500/40 hover:bg-industrial-950"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                          {shop.name}
                        </h4>
                        {shop.verified && (
                          <span className="flex items-center space-x-1 rounded bg-brand-950 px-1.5 py-0.5 text-[10px] font-medium text-brand-400 border border-brand-800/60">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Verified</span>
                          </span>
                        )}
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-industrial-900 text-slate-500 border border-industrial-800">
                          Sample Data
                        </span>
                      </div>

                      {/* Full Address */}
                      <p className="text-xs text-slate-400 mt-1 flex items-start">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-500 shrink-0 mt-0.5" />
                        <span>{shop.address}</span>
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center text-slate-300">
                          <Navigation className="h-3.5 w-3.5 mr-1 text-brand-400" />
                          {shop.locality} ({shop.distanceKm} km away)
                        </span>
                        <span className="flex items-center text-amber-400 font-semibold">
                          <Star className="h-3.5 w-3.5 mr-1 fill-amber-400" />
                          {shop.rating} ({shop.reviewCount} reviews)
                        </span>

                        {/* Availability Status (Requirement 3: Open, Closed, Temporarily Unavailable) */}
                        <span className={`flex items-center space-x-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase font-mono border ${statusStyle}`}>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{shop.status}</span>
                        </span>

                        {shop.openingHours && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {shop.openingHours}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Contact Actions */}
                    <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-slate-500">
                          Est. Service Cost
                        </div>
                        <div className="text-sm font-bold text-emerald-400 font-mono">
                          ₹{shop.estimatedServiceCostINR.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <a
                        href={`tel:${shop.phone}`}
                        className="rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-industrial-800 transition-colors flex items-center space-x-1"
                        title={`Call ${shop.phone}`}
                      >
                        <Phone className="h-3 w-3 text-emerald-400" />
                        <span>Call</span>
                      </a>

                      <button
                        onClick={() => handleOpenContact(shop)}
                        className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-brand-500 transition-colors"
                      >
                        Contact & Book
                      </button>
                    </div>
                  </div>

                  {/* Supported Appliance Types (Requirement 3) */}
                  <div className="mt-3 pt-2.5 border-t border-industrial-900 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold mr-1">
                      Supported Appliances:
                    </span>
                    {shop.supportedAppliances.map((app, i) => {
                      const isHighlighted = applianceCategory && app.toLowerCase().includes(applianceCategory.toLowerCase());
                      return (
                        <span
                          key={i}
                          className={`rounded px-2 py-0.5 text-[10px] font-mono border transition-colors ${
                            isHighlighted
                              ? 'bg-brand-950 text-brand-300 border-brand-700 font-bold'
                              : 'bg-industrial-900 text-slate-300 border-industrial-800'
                          }`}
                        >
                          {app}
                        </span>
                      );
                    })}

                    <a
                      href={`tel:${shop.phone}`}
                      className="ml-auto flex items-center text-[11px] font-mono text-slate-400 hover:text-brand-400 transition-colors pt-1 sm:pt-0"
                    >
                      <Phone className="h-3 w-3 mr-1 text-emerald-400" />
                      <span>{shop.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* E-Waste Recyclers List */
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-3 text-xs text-rose-300">
            For machines scoring &lt; 40, certified recyclers prevent hazardous lead, mercury, and refrigerant contamination in Visakhapatnam water tables.
          </div>
          {VIZAG_EWASTE_RECYCLERS.map((recycler) => (
            <div
              key={recycler.id}
              className="rounded-xl border border-industrial-800 bg-industrial-950/70 p-4 hover:border-rose-500/40 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white">{recycler.name}</h4>
                    <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-800/60">
                      Govt Authorized
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {recycler.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Scrap / Credit Payout</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">{recycler.carbonCreditValuePerKg}</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-industrial-900">
                <div className="flex flex-wrap gap-1.5">
                  {recycler.materialsHandled.map((m, i) => (
                    <span key={i} className="rounded bg-industrial-900 px-2 py-0.5 text-[10px] text-slate-300">
                      {m}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${recycler.phone}`}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-rose-500 transition-colors flex items-center space-x-1"
                >
                  <Phone className="h-3 w-3" />
                  <span>Schedule E-Waste Pickup</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
