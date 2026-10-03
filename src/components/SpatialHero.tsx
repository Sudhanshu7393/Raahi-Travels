import React, { useState, useEffect } from 'react';
import type { CommunityTrip } from '../types/trip';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface SpatialHeroProps {
  trips: CommunityTrip[];
  onSelectTrip: (trip: CommunityTrip) => void;
  onBookTrip: (trip: CommunityTrip) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard: () => void;
  onOpenAdmin?: () => void;
  bookingCount: number;
}

export const SpatialHero: React.FC<SpatialHeroProps> = ({
  trips,
  onSelectTrip,
  onBookTrip,
  onNavigateSection,
  onOpenDashboard,
  bookingCount,
}) => {
  // Center active index in the 3D carousel - default to 0 (Flagship Kainchi Dham trip)
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Touch Swipe Handling with Vertical Scroll Protection
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const minSwipeDistance = 25;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diffX = touchStartX - touchEndX;
    const diffY = (touchStartY ?? 0) - (touchEndY ?? 0);

    // Only swipe carousel if horizontal movement is dominant over vertical scrolling
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? trips.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === trips.length - 1 ? 0 : prev + 1));
  };

  const activeTrip = trips[activeIndex] || trips[0];

  return (
    <div className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[#0D0C0A] flex flex-col justify-between select-none">
      
      {/* 1. Cinematic Full-Bleed Rocky Landscape Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none transform scale-102 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2600&q=85')`,
        }}
      />
      {/* Deep dusk gradient overlays for depth and text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#0D0C0A] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-[#0D0C0A]/90 pointer-events-none" />

      {/* 2. Top Floating Glass Capsule Navigation with User's Official Logo */}
      <div className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-6 flex justify-center">
        <header className="glass-capsule rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-7 max-w-4xl w-full">
          
          {/* Left: Official Raahi Logo Badge */}
          <div
            onClick={() => onNavigateSection('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-9 sm:h-10 px-2 rounded-2xl glass-pill flex items-center justify-center transition-all group-hover:scale-105">
              <img
                src="/raahi-logo-light.png"
                alt="RAAHI - Har Safar, Ek Kahani"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block text-left">
              <span className="font-heading font-bold text-sm tracking-tight text-white block leading-none">
                RAAHI
              </span>
              <span className="font-handwriting text-[11px] text-amber-300 block -mt-0.5">
                Har Safar, Ek Kahani
              </span>
            </div>
          </div>

          {/* Center: Clean Essential Navigation */}
          <nav className="flex items-center gap-2.5 sm:gap-5 text-xs sm:text-sm font-medium text-white/80">
            <button
              type="button"
              onClick={() => onNavigateSection('batches')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Batches
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('vibe')}
              className="hidden sm:inline-block hover:text-white transition-colors cursor-pointer"
            >
              The Vibe
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('gallery')}
              className="hidden md:inline-block hover:text-white transition-colors cursor-pointer"
            >
              Photos
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('about')}
              className="hidden sm:inline-block hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('faqs')}
              className="hidden lg:inline-block hover:text-white transition-colors cursor-pointer"
            >
              FAQs
            </button>
            <button
              type="button"
              onClick={onOpenDashboard}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>My Trips</span>
              {bookingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right: High-Contrast Solid White Pill CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBookTrip(activeTrip)}
              className="glass-pill-white rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold hover:bg-stone-100 hover:scale-105 transition-all cursor-pointer shrink-0"
            >
              Book a Slot
            </button>
          </div>
        </header>
      </div>

      {/* 3. Center Hero Headline & Dual Pills */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        
        {/* Verified Batch Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30 text-[11px] font-bold text-emerald-300 mb-2.5 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Batch #1 Successfully Completed (25-27 Sep) • Next Batches Open</span>
        </div>

        {/* Official Brand Logo Emblem - Illuminated High Contrast (Never Merges with Background) */}
        <div className="flex justify-center mb-3">
          <div className="relative group cursor-pointer" onClick={() => onNavigateSection('home')}>
            {/* Semantic H1 for Search Engine Topical Authority */}
            <h1 className="sr-only">
              Raahi Travels — Weekend Group Trips & Solo Backpacking from Delhi NCR | Kainchi Dham, Chopta, Kasol
            </h1>

            {/* Soft Warm Mountain Sunset Glow (Warm gold/amber only - zero white) */}
            <div className="absolute -inset-6 bg-radial from-amber-400/25 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700 opacity-90" />
            
            {/* Pure Clean Illuminated Logo: Crisp White Typography & Radiant Orange Sun */}
            <img
              src="/raahi-logo-light.png"
              alt="RAAHI Travels - Har Safar, Ek Kahani | Weekend Group Trips for Solo Backpackers from Delhi NCR"
              className="relative z-10 w-64 sm:w-80 md:w-[360px] max-h-36 sm:max-h-44 object-contain mx-auto transition-transform duration-300 group-hover:scale-103 drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>
        
        <p className="text-xs sm:text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed text-stone-300/90">
          Bespoke group journeys & mountain backpacking for thoughtful solo wanderers. Travel with strangers, return as lifelong friends.
        </p>

        {/* Dual Capsule Pill Buttons */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateSection('batches')}
            className="glass-pill-white rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold hover:opacity-90 transition-all cursor-pointer shadow-lg"
          >
            Explore Upcoming Batches
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('vibe')}
            className="glass-pill rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer text-white hover:text-white"
          >
            The Experience
          </button>
        </div>
      </div>

      {/* 4. The Signature 3D Perspective Curved Arc Carousel */}
      <div className="relative z-20 w-full pb-6 sm:pb-8 pt-1 sm:pt-2 overflow-hidden">
        
        {/* Navigation Controls */}
        <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white/90">0{activeIndex + 1}</span>
            <span>/</span>
            <span>0{trips.length}</span>
            <span className="text-white/40">•</span>
            <span className="font-medium line-clamp-1 text-stone-300">{activeTrip.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer"
              aria-label="Next destination"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Arc Container with Cylinder Perspective */}
        <div 
          className="relative w-full h-[335px] sm:h-[370px] perspective-1200 preserve-3d flex items-center justify-center my-1 sm:my-3 touch-pan-y overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {trips.map((trip, idx) => {
            const n = trips.length;
            // Shortest circular offset from active center: -1, 0, 1, 2 (or -2)
            let offset = (idx - activeIndex) % n;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const isHovered = hoveredIndex === idx;
            const isCenter = offset === 0;

            // Responsive spacing between card centers in 3D arc
            const spacing = isMobile ? 140 : 230;
            const translateX = offset * spacing;

            let rotateY = 0;
            let translateZ = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 20 - Math.abs(offset) * 5;

            if (isHovered && !isMobile) {
              // Desktop hover: pops forward toward the user and scales up
              rotateY = 0;
              translateZ = 75;
              scale = 1.12;
              opacity = 1;
              zIndex = 50;
            } else if (isCenter) {
              // Center card: resting flat and clean in the center
              rotateY = 0;
              translateZ = 20;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (offset === -1) {
              // Left wing: angled back to the left
              rotateY = isMobile ? 26 : 18;
              translateZ = isMobile ? -35 : -25;
              scale = isMobile ? 0.88 : 0.92;
              opacity = isMobile ? 0.80 : 0.86;
              zIndex = 20;
            } else if (offset === 1) {
              // Right wing: angled back to the right
              rotateY = isMobile ? -26 : -18;
              translateZ = isMobile ? -35 : -25;
              scale = isMobile ? 0.88 : 0.92;
              opacity = isMobile ? 0.80 : 0.86;
              zIndex = 20;
            } else {
              // Background cards
              rotateY = offset > 0 ? -36 : 36;
              translateZ = -90;
              scale = 0.76;
              opacity = isMobile ? 0 : 0.45;
              zIndex = 10;
            }

            const transformStyle = `translate(-50%, -50%) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;

            return (
              <div
                key={trip.id}
                onMouseEnter={() => {
                  if (!isMobile) setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setHoveredIndex(null);
                }}
                onClick={() => {
                  if (isCenter) {
                    onSelectTrip(trip);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute left-1/2 top-1/2 rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 ease-out border shrink-0 group ${
                  isHovered && !isMobile
                    ? 'border-amber-400 ring-2 ring-amber-400/80 shadow-[0_30px_70px_rgba(0,0,0,0.95)]'
                    : isCenter
                    ? 'border-white/30 shadow-2xl'
                    : 'border-white/15 hover:border-white/40 shadow-lg'
                } w-[225px] sm:w-[250px] md:w-[260px] h-[305px] sm:h-[330px]`}
                style={{
                  transform: transformStyle,
                  opacity,
                  zIndex,
                  pointerEvents: Math.abs(offset) > 1 && isMobile ? 'none' : 'auto',
                }}
              >
                {/* High Quality Travel Photo with Fallback */}
                <img
                  src={trip.images[0]}
                  alt={trip.title}
                  onError={(e) => {
                    e.currentTarget.src = '/images/kainchi-dham-temple.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Dusk Glass Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-4.5 flex flex-col justify-between text-white">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-1.5 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 shrink-0">
                      {trip.category.split(' ')[0]}
                    </span>
                    {trip.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-white text-black truncate max-w-[125px] shrink-0 shadow-sm">
                        {trip.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Trip Info */}
                  <div className="pt-2">
                    <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1 mb-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0 text-amber-400" />
                      <span className="truncate">{trip.destination.split(',')[0]}</span>
                    </span>

                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug font-heading">
                      {trip.title}
                    </h4>

                    <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-[9px] text-white/60 uppercase block leading-none mb-0.5">Starting</span>
                        <span className="font-extrabold text-white text-xs sm:text-sm">₹{trip.startingPrice.toLocaleString('en-IN')}</span>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-white/20 group-hover:bg-amber-400 group-hover:text-black text-white font-bold text-[10px] transition-colors flex items-center gap-1">
                        <span>Details</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Interactive Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mb-1 sm:hidden">
          {trips.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to trip destination ${i + 1}`}
            />
          ))}
        </div>

        {/* Selected Trip Quick Strip */}
        <div className="mt-1 sm:mt-2 max-w-xl mx-auto px-4 w-full">
          <div className="glass-capsule rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20">
                <img 
                  src={activeTrip.images[0]} 
                  alt={activeTrip.title} 
                  onError={(e) => {
                    e.currentTarget.src = '/images/kainchi-dham-temple.jpg';
                  }}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold block text-xs sm:text-sm truncate text-white">{activeTrip.title}</span>
                  {activeTrip.id === 'trip-kainchi-dham-nainital' && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-amber-400 text-black shrink-0">
                      FLAGSHIP
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] flex items-center gap-1.5 text-stone-300 truncate mt-0.5">
                  <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{activeTrip.batches[0]?.startDate} - {activeTrip.batches[0]?.endDate}</span>
                  <span className="text-white/40 shrink-0">•</span>
                  <span className="font-bold text-amber-300 shrink-0">₹{activeTrip.startingPrice.toLocaleString('en-IN')}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookTrip(activeTrip)}
              className="glass-pill-white rounded-xl px-3 sm:px-4 py-2 font-bold text-xs hover:bg-stone-100 transition-all shrink-0 cursor-pointer"
            >
              Book Slot
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
