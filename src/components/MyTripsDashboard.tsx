import React from 'react';
import type { CommunityBooking } from '../types/trip';
import { 
  Users, 
  Calendar, 
  MapPin, 
  MessageSquare, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface MyTripsDashboardProps {
  bookings: CommunityBooking[];
  onBackToHome: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const MyTripsDashboard: React.FC<MyTripsDashboardProps> = ({
  bookings,
  onBackToHome,
  onCancelBooking,
}) => {
  return (
    <div className="min-h-screen pt-8 pb-20 font-sans relative overflow-hidden select-none bg-[#0D0C0A] text-white">
      
      {/* Background Topo & Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.2) 21%, transparent 22%)`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP BRANDED NAVIGATION CAPSULE */}
        <header className="glass-capsule rounded-full px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 mb-8 sm:mb-10 shadow-2xl">
          {/* Left: Official Raahi Logo Badge */}
          <div
            onClick={onBackToHome}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <div className="h-9 sm:h-10 px-2 rounded-2xl glass-pill flex items-center justify-center transition-all group-hover:scale-105 border border-white/20 shrink-0">
              <img
                src="/raahi-logo-light.png"
                alt="RAAHI - Har Safar, Ek Kahani"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-heading font-black text-xs sm:text-base tracking-tight block leading-none text-white">
                RAAHI
              </span>
              <span className="font-handwriting text-[10px] sm:text-xs text-amber-500 font-bold block -mt-0.5">
                Har Safar, Ek Kahani
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-pill hover:bg-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/15 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              <span>Home</span>
            </button>
          </div>
        </header>

        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-500 text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Traveler Squad Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading uppercase tracking-tight text-white">
            MY COMMUNITY TRIPS & SQUADS
          </h1>
          <p className="text-xs sm:text-sm mt-1 max-w-xl text-stone-400">
            Aapke booked departure batches, assigned Trip Captains, and WhatsApp community gang links.
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center border border-white/10 shadow-2xl">
            <Users className="w-14 h-14 text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-black font-heading uppercase text-white">
              No Trips Booked Yet
            </h3>
            <p className="text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed text-stone-400">
              Join our upcoming batch to <strong className="text-white">Neem Karoli Baba Ashram, Bhimtal, Mukteshwar & Nainital</strong> with a squad of fellow wanderers!
            </p>
            <button
              type="button"
              onClick={onBackToHome}
              className="mt-6 px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              Explore Upcoming Batches
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((bkg) => (
              <div
                key={bkg.id}
                className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl"
              >
                {/* Top Reference Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-amber-500 text-base sm:text-lg">
                        {bkg.bookingRef}
                      </span>
                      <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border ${
                        bkg.bookingStatus === 'Confirmed' 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : bkg.bookingStatus === 'Completed'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {bkg.bookingStatus}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">Booked on {bkg.createdAt}</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">Total Amount</span>
                    <span className="text-xl sm:text-2xl font-black text-white">₹{bkg.totalAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] font-medium text-emerald-400 block mt-0.5">
                      {bkg.paymentStatus} (Advance Paid: ₹{bkg.advancePaid.toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>

                {/* Trip Title & Departure Batch */}
                <div className="p-5 rounded-2xl border space-y-2.5 text-xs sm:text-sm bg-stone-900/60 border-stone-800 text-stone-300">
                  <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Flagship Journey</span>
                  </div>
                  <h3 className="font-black text-lg sm:text-xl font-heading text-white">
                    {bkg.tripTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <span className="flex items-center gap-1.5 font-bold text-amber-500">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      {bkg.batchDates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-stone-400" />
                      Pickup: {bkg.pickupPoint}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-stone-400" />
                      {bkg.slotsCount} Slot(s) • {bkg.sharingType}
                    </span>
                  </div>
                </div>

                {/* Assigned Trip Captain & WhatsApp Group Invite */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={bkg.assignedCaptain?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                      alt={bkg.assignedCaptain?.name}
                      className="w-13 h-13 rounded-full object-cover ring-2 ring-amber-400"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block">
                        Assigned Trip Captain
                      </span>
                      <h4 className="font-black text-base sm:text-lg text-white">
                        {bkg.assignedCaptain?.name || 'Lead Shubham'}
                      </h4>
                      <p className="text-[11px] text-stone-300">
                        Founder & Host • Coordinates pickup, hotel check-ins & ice-breaker games.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href={bkg.whatsappGroupLink || 'https://wa.me/919336515066'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Join WhatsApp Gang</span>
                    </a>
                  </div>
                </div>

                {/* Passenger Info */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2.5">
                    Travelers Registered
                  </h4>
                  <div className="space-y-2 text-xs">
                    {bkg.travelers.map((t, idx) => (
                      <div 
                        key={idx} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border gap-1 sm:gap-0 bg-stone-900/60 border-stone-800"
                      >
                        <span className="font-bold text-white">{t.name} ({t.gender}, Age: {t.age})</span>
                        <span className="text-stone-400">{t.phone} • {t.city}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-white/10">
                  <div className="flex items-center gap-2 text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>
                      Balance <strong className="text-white">₹{bkg.balanceDue.toLocaleString('en-IN')}</strong> payable at Traveller boarding point.
                    </span>
                  </div>

                  {bkg.bookingStatus !== 'Cancelled' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to cancel booking ${bkg.bookingRef}?`)) {
                          onCancelBooking(bkg.id);
                        }
                      }}
                      className="text-rose-400 hover:text-rose-300 font-bold hover:underline cursor-pointer"
                    >
                      Cancel Seat
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
