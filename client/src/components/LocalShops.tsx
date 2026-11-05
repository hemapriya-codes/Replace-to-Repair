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
  Navigation
} from 'lucide-react';
import { VIZAG_EWASTE_RECYCLERS } from '../mockData';

interface LocalShopsProps {
  shops: LocalRepairShop[];
  userLocation: string;
  isEndOfLife?: boolean;
}

export const LocalShops: React.FC<LocalShopsProps> = ({
  shops,
  userLocation,
  isEndOfLife = false,
}) => {
  const [activeTab, setActiveTab] = useState<'repair' | 'recycle'>(
    isEndOfLife ? 'recycle' : 'repair'
  );
  const [selectedShop, setSelectedShop] = useState<LocalRepairShop | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBook = (shop: LocalRepairShop) => {
    setSelectedShop(shop);
  };

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(`Booking request dispatched to ${selectedShop?.name}! They will contact you shortly.`);
    setTimeout(() => {
      setSelectedShop(null);
      setBookingSuccess(null);
    }, 3000);
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
              <span>Local Partner Matching</span>
              <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                Visakhapatnam Hub
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified neighborhood repair centers & APPCB e-waste recyclers
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

      {/* Booking Toast Modal */}
      {selectedShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-industrial-700 bg-industrial-950 p-6 shadow-2xl">
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Booking Confirmed!</h4>
                <p className="text-xs text-slate-300">{bookingSuccess}</p>
              </div>
            ) : (
              <form onSubmit={confirmBooking} className="space-y-4">
                <div className="border-b border-industrial-800 pb-3">
                  <span className="text-[10px] font-mono text-brand-400 uppercase">Doorstep Service Dispatch</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{selectedShop.name}</h4>
                  <p className="text-xs text-slate-400">{selectedShop.locality} • Est. Cost: ₹{selectedShop.estimatedServiceCostINR}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 00000"
                      className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Preferred Slot</label>
                    <select className="w-full rounded-lg border border-industrial-700 bg-industrial-900 px-3 py-2 text-white focus:border-brand-500 focus:outline-none">
                      <option>Today (Express within 3 Hours)</option>
                      <option>Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                      <option>Tomorrow Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedShop(null)}
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
          {shops.length === 0 ? (
            <div className="rounded-xl border border-industrial-800 bg-industrial-950 p-6 text-center text-xs text-slate-400">
              No local repair centers available for this category or device marked for end-of-life recycling.
            </div>
          ) : (
            shops.map((shop) => (
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
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center text-slate-300">
                        <Navigation className="h-3.5 w-3.5 mr-1 text-brand-400" />
                        {shop.locality} ({shop.distanceKm} km away)
                      </span>
                      <span className="flex items-center text-amber-400 font-semibold">
                        <Star className="h-3.5 w-3.5 mr-1 fill-amber-400" />
                        {shop.rating} ({shop.reviewCount} reviews)
                      </span>
                      <span className="flex items-center text-slate-400">
                        <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
                        {shop.isOpenNow ? (
                          <span className="text-emerald-400">Open Now</span>
                        ) : (
                          <span className="text-slate-500">Opens 9 AM</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono text-slate-500">
                        Est. Service Cost
                      </div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        ₹{shop.estimatedServiceCostINR.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook(shop)}
                      className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-brand-500 transition-colors"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-industrial-900">
                  {shop.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="rounded bg-industrial-900 px-2 py-0.5 text-[10px] text-slate-300 border border-industrial-800"
                    >
                      {spec}
                    </span>
                  ))}
                  <a
                    href={`tel:${shop.phone}`}
                    className="ml-auto flex items-center text-[11px] font-mono text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    {shop.phone}
                  </a>
                </div>
              </div>
            ))
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
