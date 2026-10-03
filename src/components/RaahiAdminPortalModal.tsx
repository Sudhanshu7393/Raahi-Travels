import React, { useState } from 'react';
import type { CommunityTrip, GalleryItem, BrandDetails, CommunityBooking } from '../types/trip';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Compass, 
  CreditCard, 
  Users, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';

interface RaahiAdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  trips: CommunityTrip[];
  onUpdateTrips: (updatedTrips: CommunityTrip[]) => void;
  galleryPhotos: GalleryItem[];
  onUpdateGallery: (updatedPhotos: GalleryItem[]) => void;
  brandDetails: BrandDetails;
  onUpdateBrandDetails: (updatedBrand: BrandDetails) => void;
  bookings: CommunityBooking[];
  onUpdateBookings: (updatedBookings: CommunityBooking[]) => void;
}

export const RaahiAdminPortalModal: React.FC<RaahiAdminPortalModalProps> = ({
  isOpen,
  onClose,
  trips,
  onUpdateTrips,
  galleryPhotos,
  onUpdateGallery,
  brandDetails,
  onUpdateBrandDetails,
  bookings,
  onUpdateBookings,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'trips' | 'brand' | 'bookings'>('gallery');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Gallery local state
  const [localGallery, setLocalGallery] = useState<GalleryItem[]>(galleryPhotos);
  const [newPhoto, setNewPhoto] = useState<Partial<GalleryItem>>({
    title: '',
    imageUrl: '',
    location: '',
    tripName: 'Neem Karoli Baba • Bhimtal • Mukteshwar • Nainital',
    tag: 'Batch Memory',
  });

  // Trips local state
  const [localTrips, setLocalTrips] = useState<CommunityTrip[]>(trips);
  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.id || '');

  // Brand local state
  const [localBrand, setLocalBrand] = useState<BrandDetails>(brandDetails);

  // Bookings local state
  const [localBookings, setLocalBookings] = useState<CommunityBooking[]>(bookings);

  // Security PIN Verification (Default Admin PIN: 7890)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('raahi_admin_authed') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '7890') {
      setIsAuthenticated(true);
      sessionStorage.setItem('raahi_admin_authed', 'true');
      setPinError(null);
    } else {
      setPinError('Galat PIN! Kripya sahi 4-digit admin PIN daalein.');
    }
  };

  const triggerSaveNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Image Upload handler (File to base64 Data URL with safe size check)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Browser localStorage has ~5MB limit; keep single photo under 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo size 2MB se kam honi chahiye taaki website memory aur storage par asar na pade.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setNewPhoto((prev) => ({ ...prev, imageUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Add new photo to gallery
  const handleAddPhoto = () => {
    if (!newPhoto.imageUrl || !newPhoto.title) {
      alert('Kripya photo select karein aur title enter karein');
      return;
    }

    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      imageUrl: newPhoto.imageUrl,
      title: newPhoto.title,
      tripName: newPhoto.tripName || 'Kumaon Weekend Trip',
      location: newPhoto.location || 'Uttarakhand',
      tag: newPhoto.tag || 'Batch Memory',
      date: newPhoto.date || 'Oct 2026',
    };

    const updated = [item, ...localGallery];
    setLocalGallery(updated);
    onUpdateGallery(updated);
    setNewPhoto({
      title: '',
      imageUrl: '',
      location: '',
      tripName: 'Neem Karoli Baba • Bhimtal • Mukteshwar • Nainital',
      tag: 'Batch Memory',
    });
    triggerSaveNotification('Photo gallery me successfully add ho gayi!');
  };

  // Delete photo from gallery
  const handleDeletePhoto = (id: string) => {
    if (confirm('Kya aap is photo ko gallery se hatana chahte hain?')) {
      const updated = localGallery.filter((p) => p.id !== id);
      setLocalGallery(updated);
      onUpdateGallery(updated);
      triggerSaveNotification('Photo gallery se hata di gayi!');
    }
  };

  // Save Trips Changes
  const handleSaveTrips = () => {
    onUpdateTrips(localTrips);
    triggerSaveNotification('Trips aur batches details save ho gayi!');
  };

  // Save Brand Details
  const handleSaveBrand = () => {
    onUpdateBrandDetails(localBrand);
    triggerSaveNotification('Brand, Contact aur UPI details save ho gayi!');
  };

  // Update Booking Status
  const handleBookingStatusChange = (bookingId: string, newStatus: 'Confirmed' | 'Completed' | 'Cancelled') => {
    const updated = localBookings.map((b) => (b.id === bookingId ? { ...b, bookingStatus: newStatus } : b));
    setLocalBookings(updated);
    onUpdateBookings(updated);
    triggerSaveNotification(`Booking status update ho gaya: ${newStatus}`);
  };

  const currentTrip = localTrips.find((t) => t.id === selectedTripId) || localTrips[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* 1. PIN SECURITY LOCK SCREEN */}
      {!isAuthenticated ? (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-md shadow-2xl text-white p-6 sm:p-8 my-auto relative animate-fadeIn">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-2xl mx-auto shadow-lg">
              🔒
            </div>
            <h3 className="font-heading font-black text-xl text-white">Organizer Security Access</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Admin Control Center me access karne ke liye 4-digit security PIN enter karein.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter PIN (Default: 7890)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(null);
                }}
                autoFocus
                className="w-full text-center text-xl tracking-widest font-mono py-3 px-4 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-white outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-semibold mt-2 text-center">
                  {pinError}
                </p>
              )}
              <p className="text-[11px] text-stone-500 text-center mt-2">
                Default Organizer PIN: <strong className="text-amber-400">7890</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-lg cursor-pointer"
            >
              Unlock Admin Center
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl shadow-2xl text-white flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* MODAL HEADER */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
              ⚙️
            </div>
            <div>
              <h2 className="font-heading font-black text-base sm:text-xl text-white flex items-center gap-2">
                <span>Raahi Admin Center</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 shrink-0">
                  Live Sync
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-1">
                Gallery photos, Trip dates/prices, Brand & UPI details manage karein
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* SAVE SUCCESS NOTIFICATION TOAST */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 sm:px-6 py-2.5 text-xs font-bold text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{saveSuccessMsg}</span>
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 px-3 sm:px-6 pt-2 sm:pt-3 border-b border-stone-800 bg-stone-950/40 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'gallery'
                ? 'border-amber-400 text-amber-300 bg-stone-800/60'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Trip Gallery ({localGallery.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trips')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'trips'
                ? 'border-amber-400 text-amber-300 bg-stone-800/60'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Trips & Pricing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'brand'
                ? 'border-amber-400 text-amber-300 bg-stone-800/60'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Bank & UPI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'bookings'
                ? 'border-amber-400 text-amber-300 bg-stone-800/60'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Bookings ({localBookings.length})</span>
          </button>
        </div>

        {/* TAB 1: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* ADD NEW PHOTO CARD */}
            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
              <h4 className="font-heading font-black text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Nayi Trip Photo Add Karein (Batch Memories)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Photo File Upload or URL */}
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-stone-400 block mb-1">
                    Photo File Upload (Phone/Laptop se chunein):
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500/20 file:text-amber-300 hover:file:bg-amber-500/30 file:cursor-pointer cursor-pointer bg-stone-900 rounded-xl p-1 border border-stone-800"
                  />
                  
                  <span className="text-[10px] text-stone-500 block mt-1">
                    Ya direct image URL paste karein:
                  </span>
                  <input
                    type="text"
                    value={newPhoto.imageUrl || ''}
                    onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                    placeholder="/gallery/batch1-terrace-group.jpg ya https://..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-white mt-0.5 focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Photo Title */}
                <div>
                  <label className="text-[11px] font-bold text-stone-400 block mb-1">Photo Title / Caption:</label>
                  <input
                    type="text"
                    value={newPhoto.title || ''}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    placeholder="e.g. Bonfire Night at Mukteshwar"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-[11px] font-bold text-stone-400 block mb-1">Location:</label>
                  <input
                    type="text"
                    value={newPhoto.location || ''}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    placeholder="e.g. Kainchi Dham / Bhimtal"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Tag */}
                <div>
                  <label className="text-[11px] font-bold text-stone-400 block mb-1">Tag Badge:</label>
                  <input
                    type="text"
                    value={newPhoto.tag || ''}
                    onChange={(e) => setNewPhoto({ ...newPhoto, tag: e.target.value })}
                    placeholder="e.g. Batch #1 Completed"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>

              </div>

              {/* Preview & Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                {newPhoto.imageUrl ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={newPhoto.imageUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-amber-400"
                    />
                    <span className="text-xs text-emerald-400 font-bold">Photo ready!</span>
                  </div>
                ) : (
                  <span className="text-xs text-stone-500">Photo preview yaha dikhega</span>
                )}

                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-md"
                >
                  Gallery me Add Karein
                </button>
              </div>

            </div>

            {/* EXISTING PHOTOS LIST */}
            <div>
              <h4 className="font-heading font-black text-xs text-stone-400 uppercase tracking-widest mb-3">
                Live Gallery Photos ({localGallery.length} Photos)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {localGallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between group hover:border-stone-700 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-stone-900/90 text-amber-300 px-2.5 py-0.5 rounded-full border border-white/10">
                        {photo.tag || 'Batch Photo'}
                      </span>
                    </div>

                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div>
                        <h5 className="font-bold text-xs text-white line-clamp-1">{photo.title}</h5>
                        <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{photo.location}</span>
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-stone-500">{photo.date || 'Sep 2026'}</span>
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TRIPS & BATCHES */}
        {activeTab === 'trips' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Trip Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {localTrips.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTripId(t.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTripId === t.id
                      ? 'bg-amber-400 text-stone-950 shadow-md font-black'
                      : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {t.destination.split(',')[0]}
                </button>
              ))}
            </div>

            {/* Selected Trip Edit Card */}
            {currentTrip && (
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-sm text-white uppercase tracking-wider">
                    Editing: {currentTrip.title}
                  </h4>
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/30">
                    ₹{currentTrip.startingPrice.toLocaleString('en-IN')} All-Inclusive
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-stone-400 font-bold block mb-1">Starting Price (₹):</label>
                    <input
                      type="number"
                      value={currentTrip.startingPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLocalTrips(
                          localTrips.map((t) => {
                            if (t.id === currentTrip.id) {
                              const updatedTiers = [...t.pricingTiers];
                              if (updatedTiers[0]) {
                                updatedTiers[0] = { ...updatedTiers[0], pricePerPerson: val };
                              }
                              return { ...t, startingPrice: val, pricingTiers: updatedTiers };
                            }
                            return t;
                          })
                        );
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold block mb-1">Duration:</label>
                    <input
                      type="text"
                      value={currentTrip.duration}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalTrips(
                          localTrips.map((t) => (t.id === currentTrip.id ? { ...t, duration: val } : t))
                        );
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold block mb-1">Pickup Point:</label>
                    <input
                      type="text"
                      value={currentTrip.pickupPoint}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalTrips(
                          localTrips.map((t) => (t.id === currentTrip.id ? { ...t, pickupPoint: val } : t))
                        );
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Batches Table */}
                <div className="mt-4 pt-4 border-t border-stone-800">
                  <h5 className="font-heading font-black text-xs text-amber-300 uppercase tracking-widest mb-3">
                    Batches & Slot Availability
                  </h5>

                  <div className="space-y-3">
                    {currentTrip.batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1">
                          <span className="font-bold text-white block">
                            {batch.startDate} - {batch.endDate}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            Booked: {batch.bookedSlots} / {batch.totalSlots} slots
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <label className="text-stone-400 text-[11px]">Booked:</label>
                            <input
                              type="number"
                              value={batch.bookedSlots}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setLocalTrips(
                                  localTrips.map((t) =>
                                    t.id === currentTrip.id
                                      ? {
                                          ...t,
                                          batches: t.batches.map((b) =>
                                            b.id === batch.id ? { ...b, bookedSlots: val } : b
                                          ),
                                        }
                                      : t
                                  )
                                );
                              }}
                              className="w-16 bg-stone-950 border border-stone-800 rounded-lg px-2 py-1 text-center font-bold text-white"
                            />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <label className="text-stone-400 text-[11px]">Status:</label>
                            <select
                              value={batch.status}
                              onChange={(e) => {
                                const val = e.target.value as 'Open' | 'Filling Fast' | 'Sold Out';
                                setLocalTrips(
                                  localTrips.map((t) =>
                                    t.id === currentTrip.id
                                      ? {
                                          ...t,
                                          batches: t.batches.map((b) =>
                                            b.id === batch.id ? { ...b, status: val } : b
                                          ),
                                        }
                                      : t
                                  )
                                );
                              }}
                              className="bg-stone-950 border border-stone-800 rounded-lg px-2 py-1 font-bold text-amber-300"
                            >
                              <option value="Open">Open</option>
                              <option value="Filling Fast">Filling Fast</option>
                              <option value="Sold Out">Sold Out</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSaveTrips}
                    className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Trip Changes Save Karein</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: BRAND, CONTACT & UPI */}
        {activeTab === 'brand' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
              <h4 className="font-heading font-black text-sm text-amber-300 uppercase tracking-wider">
                Official Contact & Social Links
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-400 font-bold block mb-1">Phone Number (Call/WhatsApp):</label>
                  <input
                    type="text"
                    value={localBrand.phone}
                    onChange={(e) => setLocalBrand({ ...localBrand, phone: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-stone-400 font-bold block mb-1">Instagram Handle:</label>
                  <input
                    type="text"
                    value={localBrand.instagram}
                    onChange={(e) => setLocalBrand({ ...localBrand, instagram: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <h4 className="font-heading font-black text-sm text-amber-300 uppercase tracking-wider pt-4 border-t border-stone-800">
                SBI Bank Account & UPI Details (Customer Advance Payment)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-400 font-bold block mb-1">Official UPI ID:</label>
                  <input
                    type="text"
                    value={localBrand.bankDetails.upiId}
                    onChange={(e) =>
                      setLocalBrand({
                        ...localBrand,
                        bankDetails: { ...localBrand.bankDetails, upiId: e.target.value },
                      })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-stone-400 font-bold block mb-1">Bank Name:</label>
                  <input
                    type="text"
                    value={localBrand.bankDetails.bankName}
                    onChange={(e) =>
                      setLocalBrand({
                        ...localBrand,
                        bankDetails: { ...localBrand.bankDetails, bankName: e.target.value },
                      })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-stone-400 font-bold block mb-1">SBI Account Number:</label>
                  <input
                    type="text"
                    value={localBrand.bankDetails.accountNumber}
                    onChange={(e) =>
                      setLocalBrand({
                        ...localBrand,
                        bankDetails: { ...localBrand.bankDetails, accountNumber: e.target.value },
                      })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-stone-400 font-bold block mb-1">IFSC Code:</label>
                  <input
                    type="text"
                    value={localBrand.bankDetails.ifscCode}
                    onChange={(e) =>
                      setLocalBrand({
                        ...localBrand,
                        bankDetails: { ...localBrand.bankDetails, ifscCode: e.target.value },
                      })
                    }
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleSaveBrand}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Payment & Contact Details Save Karein</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <h4 className="font-heading font-black text-xs text-stone-400 uppercase tracking-widest">
              Live Website Customer Bookings ({localBookings.length})
            </h4>

            {localBookings.length === 0 ? (
              <div className="bg-stone-950 p-8 rounded-2xl border border-stone-800 text-center text-stone-400 text-xs">
                Abhi koi booking record nahi hai. Customer booking karne par yaha list hogi.
              </div>
            ) : (
              <div className="space-y-3">
                {localBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-300 font-bold">{b.bookingRef}</span>
                        <span className="text-[10px] text-stone-500">{b.createdAt}</span>
                      </div>

                      <h5 className="font-bold text-white text-sm mt-1">{b.primaryContact.name}</h5>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        Phone: <strong className="text-white">{b.primaryContact.phone}</strong> • Trip: {b.tripTitle}
                      </p>
                      <p className="text-stone-400 text-[11px]">
                        Slots: {b.slotsCount} • Advance: ₹{b.advancePaid.toLocaleString('en-IN')} (Balance: ₹{b.balanceDue.toLocaleString('en-IN')})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) =>
                          handleBookingStatusChange(
                            b.id,
                            e.target.value as 'Confirmed' | 'Completed' | 'Cancelled'
                          )
                        }
                        className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 font-bold text-white text-xs"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-stone-800 flex items-center justify-between bg-stone-950/80 text-xs text-stone-400">
          <span>Updates instantly persist to your browser's local database.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold transition-all cursor-pointer"
          >
            Close Admin Panel
          </button>
        </div>

      </div>
      )}

    </div>
  );
};

export default RaahiAdminPortalModal;
