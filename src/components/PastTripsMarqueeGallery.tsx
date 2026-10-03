import React, { useState } from 'react';
import type { GalleryItem } from '../types/trip';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  X, 
  Settings, 
  CheckCircle2,
  ZoomIn
} from 'lucide-react';

interface PastTripsMarqueeGalleryProps {
  photos: GalleryItem[];
  onOpenAdmin?: () => void;
  onBookNextBatch?: () => void;
}

export const PastTripsMarqueeGallery: React.FC<PastTripsMarqueeGalleryProps> = ({
  photos,
  onOpenAdmin,
  onBookNextBatch,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate photos array to create an infinite continuous loop
  const displayPhotos = [...photos, ...photos];

  return (
    <div className="w-full py-14 sm:py-20 bg-stone-950 text-white relative overflow-hidden select-none">
      
      {/* Background Topo & Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.2) 21%, transparent 22%)`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Section Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Real Memories • Batch #1 Completed</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-white">
              MOMENTS FROM THE ROAD
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Unfiltered smiles from our completed trip to <strong className="text-white">Neem Karoli Baba Ashram, Bhimtal, Mukteshwar & Nainital</strong>. Strangers who boarded together from Noida 62 and returned as family.
            </p>
          </div>

          {/* Action Buttons: Pause/Play & Admin Manage */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 rounded-full glass-pill text-xs font-bold text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              {isPaused ? '▶ Resume Motion' : '⏸ Pause Motion'}
            </button>

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-md"
                title="Admin: Add / Edit / Remove Gallery Photos"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin Controls</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* INFINITE SMOOTH MOTION MARQUEE RIBBON */}
      {/* ========================================================================= */}
      <div 
        className="w-full overflow-hidden py-4"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        <div 
          className={`animate-marquee gap-5 sm:gap-6 px-4 ${isPaused ? '[animation-play-state:paused]' : ''}`}
        >
          {displayPhotos.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedPhoto(item)}
              className="relative w-72 sm:w-80 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden shrink-0 cursor-pointer group border-2 border-stone-800 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={`${item.title} - ${item.location} | Raahi Travels Batch`}
                onError={(e) => {
                  e.currentTarget.src = '/gallery/batch1-terrace-group.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-amber-300">
                  {item.tag || 'Batch #1 Memory'}
                </span>

                <div className="w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {item.location}
                </span>

                <h4 className="font-heading font-black text-base sm:text-lg text-white leading-snug line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                  {item.tripName}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE LIGHTBOX POPUP MODAL */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo View */}
            <div className="md:w-3/5 aspect-[4/3] md:aspect-auto bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                onError={(e) => {
                  e.currentTarget.src = '/gallery/batch1-terrace-group.jpg';
                }}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            {/* Photo Details Sidebar */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {selectedPhoto.tag || 'Verified Batch Moment'}
                </span>

                <h3 className="font-heading font-black text-2xl text-white leading-tight">
                  {selectedPhoto.title}
                </h3>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-300">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <strong>Location:</strong> {selectedPhoto.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <strong>Batch:</strong> {selectedPhoto.tripName} ({selectedPhoto.date || 'Sep 2026'})
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 text-xs text-stone-300 leading-relaxed">
                  "Har safar ek nayi kahani likhta hai. 25 anjaan log jo ek doosre ko jante bhi nahi the, do din me sabse acche dost ban gaye."
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                {onBookNextBatch && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(null);
                      onBookNextBatch();
                    }}
                    className="w-full py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-102 cursor-pointer font-heading text-center"
                  >
                    Join Next Upcoming Batch
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full py-2.5 rounded-full glass-pill text-xs font-bold text-stone-400 hover:text-white transition-all cursor-pointer"
                >
                  Close Photo
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PastTripsMarqueeGallery;
