import React, { useState } from 'react';
import type { CommunityTrip } from '../types/trip';
import { 
  X, 
  MapPin, 
  Star, 
  Calendar, 
  Check, 
  XCircle, 
  Utensils, 
  Bed, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Users,
  Share2
} from 'lucide-react';

interface TripDetailModalProps {
  trip: CommunityTrip | null;
  onClose: () => void;
  onBookSlot: (trip: CommunityTrip) => void;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  trip,
  onClose,
  onBookSlot,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!trip) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-stone-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-800 max-h-[92vh] flex flex-col relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto flex-1">
          {/* Visual Header */}
          <div className="relative h-64 sm:h-96 overflow-hidden bg-stone-900">
            <img
              src={trip.images[activeImgIdx] || trip.images[0]}
              alt={trip.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            {/* Thumbnail Selectors */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-1.5 sm:gap-2 z-10 max-w-[calc(100%-65px)] overflow-x-auto scrollbar-none py-0.5">
              {trip.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImgIdx === i ? 'border-amber-400 scale-105 shadow-lg' : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider">
                  {trip.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                  {trip.duration}
                </span>
                <div className="flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{trip.rating} ({trip.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white uppercase tracking-tight">
                {trip.title}
              </h2>
              <div className="text-xs sm:text-sm text-stone-300 mt-1 flex flex-wrap items-center gap-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{trip.destination} • Pickup: {trip.pickupPoint}</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Noida+Sector+62+Metro+Station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-amber-300 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <span>📍 Map Pin</span>
                </a>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* The Vibe & Philosophy */}
            <div className="bg-stone-900/80 p-6 rounded-3xl border border-stone-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-black tracking-widest text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>The Stranger Squad Experience</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                You join solo or with a friend, you return as family.
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {trip.overview}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-stone-300">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span><strong>Squad Fleet:</strong> {trip.groupSize}</span>
                </span>
                <span>✨ <strong>Ideal For:</strong> {trip.idealFor}</span>
              </div>
            </div>

            {/* Upcoming Departure Batches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  Upcoming Fixed Departure Batches
                </h3>
                <span className="text-xs text-amber-300 font-bold bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  26-Seater AC Luxury Traveller
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {trip.batches.map((batch) => {
                  const left = batch.totalSlots - batch.bookedSlots;
                  return (
                    <div
                      key={batch.id}
                      className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between hover:border-stone-700 transition-colors"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold uppercase text-stone-400">Batch Dates</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            batch.status === 'Sold Out'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : batch.status === 'Filling Fast'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {batch.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1">{batch.startDate} - {batch.endDate}</h4>
                        <p className="text-xs text-stone-400 mt-1">Lead: <strong className="text-stone-200">{batch.captainName || 'Lead Shubham'}</strong></p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-800 text-xs flex justify-between items-center">
                        <span className="text-amber-400 font-bold">
                          {left > 0 ? `${left} slots remaining` : 'Batch Completed'}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${left > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Sharing & Pricing Options */}
            <div>
              <h3 className="text-lg font-bold text-white font-heading mb-3">
                Occupancy & Pricing Options (Per Person)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border-2 border-stone-800 bg-stone-900/90 hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        {tier.sharingType}
                      </span>
                      <p className="text-xs text-stone-400 leading-relaxed mb-3">
                        {tier.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 line-through">₹{tier.originalPrice}</span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          SAVE ₹{tier.originalPrice - tier.pricePerPerson}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-white mt-1">
                        ₹{tier.pricePerPerson.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day by Day Detailed Itinerary */}
            <div>
              <h3 className="text-lg font-bold text-white font-heading mb-4">
                Day-by-Day Experience Blueprint
              </h3>
              <div className="space-y-3">
                {trip.itinerary.map((item) => {
                  const isOpen = expandedDay === item.day;
                  return (
                    <div
                      key={item.day}
                      className="border border-stone-800 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDay(isOpen ? null : item.day)}
                        className={`w-full p-4 text-left flex items-center justify-between transition-colors cursor-pointer ${
                          isOpen ? 'bg-amber-500/15 text-amber-300' : 'bg-stone-900 hover:bg-stone-850 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center shrink-0">
                            D{item.day}
                          </span>
                          <span className="font-bold text-sm sm:text-base">
                            Day {item.day}: {item.title}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-stone-950 border-t border-stone-800 text-xs sm:text-sm text-stone-300 space-y-3 animate-fadeIn">
                          <p className="leading-relaxed font-normal">{item.description}</p>
                          <div className="flex flex-wrap gap-4 pt-2 border-t border-stone-800 text-xs text-stone-400 font-medium">
                            <span className="flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-amber-400" />
                              <span>Meals: <strong className="text-white">{item.meals}</strong></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Bed className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Stay: <strong className="text-white">{item.stay}</strong></span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-900/80 p-6 rounded-3xl border border-stone-800">
              <div>
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Trip Inclusions
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                  {trip.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Trip Exclusions
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                  {trip.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-400 uppercase font-bold block">Starting Price</span>
            <div className="text-2xl font-black text-white">
              ₹{trip.startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-stone-400"> /person (all-inclusive)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hey! Check out this trip: ${trip.title} with Raahi Travels. Stays, meals & AC Traveller included. Starting at ₹${trip.startingPrice}. Details: ` + window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share with friends on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Share</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-stone-800 text-stone-300 hover:bg-stone-900 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onBookSlot(trip);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <span>Book Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
