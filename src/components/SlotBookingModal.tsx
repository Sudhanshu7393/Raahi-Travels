import React, { useState } from 'react';
import type { CommunityTrip, CommunityBooking, TravelerPassenger, BrandDetails } from '../types/trip';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Tag, 
  Lock, 
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';

interface SlotBookingModalProps {
  trip: CommunityTrip | null;
  onClose: () => void;
  onBookingConfirmed: (booking: CommunityBooking) => void;
  onOpenDashboard: () => void;
  brandDetails?: BrandDetails;
}

export const SlotBookingModal: React.FC<SlotBookingModalProps> = ({
  trip,
  onClose,
  onBookingConfirmed,
  onOpenDashboard,
  brandDetails,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Batch & Sharing
  const [selectedBatchId, setSelectedBatchId] = useState<string>(trip?.batches?.[0]?.id || '');
  const [selectedSharingIndex, setSelectedSharingIndex] = useState<number>(0);
  const [slotsCount, setSlotsCount] = useState<number>(1);

  // Step 2: Travelers
  const [travelers, setTravelers] = useState<TravelerPassenger[]>([
    { name: '', age: 24, gender: 'Female', phone: '', email: '', city: 'Delhi' },
  ]);
  const [emergencyContact, setEmergencyContact] = useState('');

  // Step 3: Payment Choice & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [paymentChoice, setPaymentChoice] = useState<'advance' | 'full'>('advance');
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 4: Confirmed Booking Record
  const [confirmedBooking, setConfirmedBooking] = useState<CommunityBooking | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!trip) return null;

  const selectedBatch = trip.batches.find((b) => b.id === selectedBatchId) || trip.batches[0];
  const selectedTier = trip.pricingTiers[selectedSharingIndex] || trip.pricingTiers[0];

  const subtotal = selectedTier.pricePerPerson * slotsCount;
  const discountAmount = discountPercent > 0 ? Math.round((subtotal * discountPercent) / 100) : 0;
  const finalTotal = subtotal - discountAmount;
  const advanceToken = 2000 * slotsCount;
  const balanceAtPickup = finalTotal - advanceToken;

  const amountToPayNow = paymentChoice === 'advance' ? advanceToken : finalTotal;

  // Handle slot count changes
  const handleSlotCountChange = (newCount: number) => {
    setSlotsCount(newCount);
    const updated = [...travelers];
    while (updated.length < newCount) {
      updated.push({ name: '', age: 24, gender: 'Female', phone: '', email: '', city: 'Delhi' });
    }
    while (updated.length > newCount) {
      updated.pop();
    }
    setTravelers(updated);
  };

  const updateTravelerField = (index: number, field: keyof TravelerPassenger, value: any) => {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setTravelers(updated);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SOLO10' || code === 'RAAHI10') {
      setDiscountPercent(10);
      setCouponMsg({ text: '10% Solo Traveler Discount applied successfully!', error: false });
    } else if (code === 'GANG20') {
      setDiscountPercent(20);
      setCouponMsg({ text: '20% Squad Discount applied!', error: false });
    } else {
      setDiscountPercent(0);
      setCouponMsg({ text: 'Invalid coupon. Try "SOLO10"', error: true });
    }
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const randomRef = `RAAHI-GANG-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: CommunityBooking = {
        id: `comm-bkg-${Date.now()}`,
        bookingRef: randomRef,
        createdAt: new Date().toLocaleString(),
        tripId: trip.id,
        tripTitle: trip.title,
        destination: trip.destination,
        pickupPoint: trip.pickupPoint,
        batchId: selectedBatch.id,
        batchDates: `${selectedBatch.startDate} - ${selectedBatch.endDate}`,
        sharingType: selectedTier.sharingType,
        pricePerPerson: selectedTier.pricePerPerson,
        slotsCount,
        travelers,
        primaryContact: {
          name: travelers[0]?.name || 'Explorer',
          phone: travelers[0]?.phone || '',
          email: travelers[0]?.email || '',
          emergencyContact: emergencyContact.trim() || 'Parent / Guardian',
        },
        totalAmount: finalTotal,
        advancePaid: amountToPayNow,
        balanceDue: paymentChoice === 'advance' ? balanceAtPickup : 0,
        paymentStatus: paymentChoice === 'advance' ? 'Advance Paid' : 'Fully Paid',
        bookingStatus: 'Confirmed',
        paymentTxnId: `rzp_solo_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        assignedCaptain: {
          name: selectedBatch.captainName || 'Senior Trip Captain',
          phone: '+91 98112 00011',
          photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        },
        whatsappGroupLink: 'https://chat.whatsapp.com/raahi-stranger-squad',
      };

      setConfirmedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsProcessing(false);
      setStep(4);

      try {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
              {step}/4
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">
                {step === 1 && 'Step 1: Select Batch & Occupancy'}
                {step === 2 && 'Step 2: Traveler Details'}
                {step === 3 && 'Step 3: Review & Lock Your Slot'}
                {step === 4 && 'Slot Confirmed! Welcome to the Gang'}
              </h3>
              <p className="text-xs text-rose-300">
                {trip.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="grid grid-cols-4 h-1.5 bg-slate-100">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-full transition-all duration-300 ${
                s <= step ? 'bg-rose-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: BATCH & SHARING SELECTION */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Batch Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-rose-600" />
                  Select Departure Batch Date
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {trip.batches.map((b) => {
                    const isSelected = selectedBatchId === b.id;
                    const left = b.totalSlots - b.bookedSlots;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBatchId(b.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/60 shadow-xs'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Departure</span>
                        <h5 className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{b.startDate} - {b.endDate}</h5>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                          <span className="text-slate-500">{b.captainName || 'Senior Lead'}</span>
                          <span className="text-rose-600 font-bold">{left} slots left</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Number of slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-600" />
                  Number of Slots (Seats) to Book
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSlotCountChange(num)}
                      className={`w-12 h-11 rounded-2xl font-bold text-sm transition-all ${
                        slotsCount === num
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 font-semibold ml-2">
                    {slotsCount === 1 ? 'Solo Traveler (Joining alone)' : `${slotsCount} Travel Buddies`}
                  </span>
                </div>
              </div>

              {/* Sharing Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Room Occupancy Type
                </label>
                <div className="space-y-2.5">
                  {trip.pricingTiers.map((tier, idx) => {
                    const isSelected = selectedSharingIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedSharingIndex(idx)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/60'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{tier.sharingType}</span>
                          <p className="text-xs text-slate-500 mt-0.5">{tier.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-900">₹{tier.pricePerPerson.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-400 block">/person</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
                >
                  <span>Continue to Traveler Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: TRAVELER DETAILS */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                💡 <strong>Community Matching Note:</strong> We balance gender ratios and match roommates by gender. Please provide accurate details.
              </div>

              {travelers.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-600" />
                    Traveler {idx + 1} Profile
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sneha Roy"
                        value={t.name}
                        onChange={(e) => updateTravelerField(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-slate-200 rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={t.phone}
                        onChange={(e) => updateTravelerField(idx, 'phone', e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-slate-200 rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Gender *</label>
                      <select
                        value={t.gender}
                        onChange={(e) => updateTravelerField(idx, 'gender', e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="Female">Female (Allocate in Female Room)</option>
                        <option value="Male">Male (Allocate in Male Room)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Age *</label>
                      <input
                        type="number"
                        min="18"
                        max="45"
                        value={t.age}
                        onChange={(e) => updateTravelerField(idx, 'age', Number(e.target.value))}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-slate-200 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Contact (Parent / Guardian / Spouse) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Roy (Father) - +91 98300 00112"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3 py-2.5 text-base sm:text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={!travelers[0]?.name.trim() || !travelers[0]?.phone.trim()}
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <span>Review & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FARE BREAKDOWN & PAYMENT */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between font-bold text-slate-800 pb-2 border-b border-slate-200">
                  <span>Batch: {selectedBatch.startDate} - {selectedBatch.endDate}</span>
                  <span>{slotsCount} Slot(s)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{selectedTier.sharingType} (₹{selectedTier.pricePerPerson} × {slotsCount}):</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Community Coupon ({discountPercent}%):</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-xl text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. SOLO10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-base sm:text-xs border border-slate-200 rounded-xl uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Apply
                </button>
              </form>
              {couponMsg && (
                <p className={`text-xs ${couponMsg.error ? 'text-rose-600' : 'text-emerald-700'} font-semibold`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Payment choice */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentChoice('advance')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'advance' ? 'border-[#E25841] bg-[#FFF0EB]' : 'border-stone-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">Pay Token Advance</span>
                  <span className="text-lg font-black text-[#E25841]">₹{advanceToken.toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-slate-500 mt-1">Balance ₹{balanceAtPickup.toLocaleString('en-IN')} at trip boarding.</p>
                </div>

                <div
                  onClick={() => setPaymentChoice('full')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentChoice === 'full' ? 'border-[#E25841] bg-[#FFF0EB]' : 'border-stone-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">Pay Full Amount</span>
                  <span className="text-lg font-black text-slate-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-slate-500 mt-1">Complete peace of mind. Zero dues.</p>
                </div>
              </div>

              {/* Official Verified UPI & Bank Transfer Card (from PDF) */}
              {(() => {
                const upiId = brandDetails?.bankDetails?.upiId || 'singhsubham0240-1@oksbi';
                const bankName = brandDetails?.bankDetails?.bankName || 'State Bank of India';
                const acctNum = brandDetails?.bankDetails?.accountNumber || '41895549477';
                const ifsc = brandDetails?.bankDetails?.ifscCode || 'SBIN0012573';
                const phone = brandDetails?.phone || '+91 93365 15066';
                const cleanPhone = phone.replace(/[^0-9]/g, '');

                const waMessage = encodeURIComponent(
                  `Hi Shubham! I want to book ${slotsCount} slot(s) for ${trip.title} (${selectedBatch.startDate} - ${selectedBatch.endDate}).\nTraveler: ${travelers[0]?.name} (${travelers[0]?.phone})\nSharing: ${selectedTier.sharingType}\nAmount: ₹${amountToPayNow} (Advance). Please confirm my seat!`
                );
                const waUrl = `https://wa.me/${cleanPhone || '919336515066'}?text=${waMessage}`;

                return (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-3">
                    <div className="flex items-center justify-between font-bold text-stone-800">
                      <span className="text-amber-800 uppercase text-[10px] tracking-wider">Official Payment Channel</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(upiId);
                          setCopiedUpi(true);
                          setTimeout(() => setCopiedUpi(false), 2000);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-white px-2.5 py-1 rounded-lg border border-amber-300 shadow-sm cursor-pointer"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">UPI Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-amber-700" />
                            <span>Copy UPI ID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-amber-200 items-center">
                      <div className="flex flex-col items-center justify-center p-1.5 bg-amber-50/70 rounded-lg border border-amber-200 shrink-0">
                        <img 
                          src="/images/official-upi-qr.png" 
                          alt="Scan to Pay UPI QR Code - SBI" 
                          className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded"
                        />
                        <span className="text-[9px] font-bold text-amber-900 mt-1">Scan & Pay (Any UPI)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700 flex-1 w-full">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-stone-400 block">Bank</span>
                          <span className="font-bold text-stone-900">{bankName}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-stone-400 block">UPI ID (GPay / PhonePe)</span>
                          <span className="font-mono font-bold text-stone-900 select-all break-all">{upiId}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-stone-400 block">Account No.</span>
                          <span className="font-mono font-bold text-stone-900 select-all">{acctNum}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-stone-400 block">IFSC Code</span>
                          <span className="font-mono font-bold text-stone-900 select-all">{ifsc}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Pay via Google Pay / PhonePe to <strong>{upiId}</strong> and share payment screenshot on WhatsApp: <strong className="text-stone-900">{phone}</strong>
                    </p>

                    {/* Direct WhatsApp booking option */}
                    <div className="pt-1">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          handleExecutePayment();
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Book & Send Details on WhatsApp Directly</span>
                      </a>
                    </div>
                  </div>
                );
              })()}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleExecutePayment}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Locking your seat...' : `Confirm Seat & Lock Advance (₹${amountToPayNow.toLocaleString('en-IN')})`}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & WHATSAPP GANG LINK */}
          {step === 4 && confirmedBooking && (
            <div className="text-center space-y-6 animate-fadeIn py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Seat Confirmed in Batch
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-heading">
                  You’re Traveling with Raahi, {confirmedBooking.primaryContact.name}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  You joined as a stranger, and you’ll return with lifelong friends. Your batch WhatsApp group is now active!
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-black text-rose-700">{confirmedBooking.bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trip:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.tripTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Batch Dates:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.batchDates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Trip Captain:</span>
                  <span className="font-bold text-emerald-700">{confirmedBooking.assignedCaptain?.name}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Advance Paid:</span>
                  <span className="font-bold text-emerald-600">₹{confirmedBooking.advancePaid.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Big WhatsApp Join Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={confirmedBooking.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Batch WhatsApp Gang</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDashboard();
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  View My Trips
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
