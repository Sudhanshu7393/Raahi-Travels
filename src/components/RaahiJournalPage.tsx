import React, { useState } from 'react';
import type { CommunityTrip, GalleryItem, BrandDetails } from '../types/trip';
import { 
  MapPin, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  Quote,
  ShieldCheck,
  Settings,
  Users,
  Navigation,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2,
  HelpCircle
} from 'lucide-react';
import { PastTripsMarqueeGallery } from './PastTripsMarqueeGallery';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface RaahiJournalPageProps {
  trips: CommunityTrip[];
  onSelectTrip: (trip: CommunityTrip) => void;
  onBookTrip: (trip: CommunityTrip) => void;
  onOpenDashboard?: () => void;
  galleryPhotos: GalleryItem[];
  onOpenAdmin?: () => void;
  brandDetails: BrandDetails;
}

// Torn Paper Top Edge Divider SVG
const TornPaperTop: React.FC<{ color?: string; className?: string }> = ({ color = '#EAB308', className = '' }) => (
  <div className={`w-full overflow-hidden leading-none ${className}`}>
    <svg 
      viewBox="0 0 1440 45" 
      preserveAspectRatio="none" 
      className="w-full h-8 sm:h-11 block"
      style={{ fill: color }}
    >
      <path d="M0,0 L0,22 Q24,14 48,26 Q82,12 118,28 Q154,16 190,24 Q228,10 266,27 Q304,15 342,23 Q380,9 418,29 Q456,14 494,22 Q532,8 570,27 Q608,12 646,24 Q684,10 722,28 Q760,14 798,22 Q836,9 874,27 Q912,13 950,25 Q988,11 1026,28 Q1064,15 1102,23 Q1140,8 1178,27 Q1216,13 1254,24 Q1292,10 1330,28 Q1368,14 1406,22 Q1424,12 1440,24 L1440,0 Z" />
    </svg>
  </div>
);

// Torn Paper Bottom Edge Divider SVG
const TornPaperBottom: React.FC<{ color?: string; className?: string }> = ({ color = '#EAB308', className = '' }) => (
  <div className={`w-full overflow-hidden leading-none ${className}`}>
    <svg 
      viewBox="0 0 1440 45" 
      preserveAspectRatio="none" 
      className="w-full h-8 sm:h-11 block rotate-180"
      style={{ fill: color }}
    >
      <path d="M0,0 L0,22 Q24,14 48,26 Q82,12 118,28 Q154,16 190,24 Q228,10 266,27 Q304,15 342,23 Q380,9 418,29 Q456,14 494,22 Q532,8 570,27 Q608,12 646,24 Q684,10 722,28 Q760,14 798,22 Q836,9 874,27 Q912,13 950,25 Q988,11 1026,28 Q1064,15 1102,23 Q1140,8 1178,27 Q1216,13 1254,24 Q1292,10 1330,28 Q1368,14 1406,22 Q1424,12 1440,24 L1440,0 Z" />
    </svg>
  </div>
);

export const RaahiJournalPage: React.FC<RaahiJournalPageProps> = ({
  trips,
  onSelectTrip,
  onBookTrip,
  onOpenDashboard,
  galleryPhotos,
  onOpenAdmin,
  brandDetails,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Main akela / akeli join kar raha hoon, kya mujhe awkward lagega?',
      a: 'Bilkul nahi! Hamare 60%+ travelers solo backpackers hote hain jo akele aate hain. Departure point Noida 62 par hi Host Shubham sabhi ko introduce karate hain aur ice-breaking games hoti hain. Mukteshwar pahunchte-pahunchte sabhi strangers close family jaise ban jate hain.',
    },
    {
      q: 'Kya ye trip Solo Female travelers ke liye 100% safe hai?',
      a: 'Haan, 100% safe. Hum female solo travelers ke liye guaranteed separate sharing rooms allocate karte hain. Co-travelers verified aur respectful hote hain, aur hamara zero-tolerance safety protocol hota hai. Host Shubham 24/7 on-ground available rehte hain.',
    },
    {
      q: 'Pickup aur drop location kahan hai aur timing kya hai?',
      a: 'Primary pickup point Noida Sector 62 (Electronic City Metro Station Gate / Fortis Hospital circle) aur secondary Akshardham Metro Station hai. Departure Thursday raat 11:00 PM hoti hai jisse Friday subah seedha pahado me pahunch jayein aur poora din enjoy kar sakein.',
    },
    {
      q: 'Neem Karoli Baba Ashram (Kainchi Dham) me darshan ke kya niyam hain?',
      a: 'Ashram me peaceful aur pious vatavaran maintain karna hota hai. Modest Indian clothing zaruri hai. Subah prasad aur darshan aasaani se shanti-purvak ho jate hain.',
    },
    {
      q: 'Seat lock karne ke liye advance kitna dena hota hai?',
      a: 'Seat confirm karne ke liye sirf ₹2,000 token advance pay karna hota hai (via Google Pay / PhonePe / UPI ya SBI transfer). Baki balance aap trip wale din Traveller board karte waqt pay kar sakte hain.',
    },
  ];

  // Reference to Flagship Kainchi Dham Trip
  const flagshipTrip = trips[0] || trips.find((t) => t.id === 'trip-kainchi-dham-nainital') || trips[0];

  const stories = [
    {
      name: 'POOJA SHARMA',
      role: 'Solo Backpacker • Batch #1',
      city: 'Noida Sector 62',
      quote:
        'Batch #1 to Kainchi Dham & Nainital was pure magic! Boarded as complete strangers from Noida 62, and by Sunday evening boating at Naini Lake, we felt like an old gang of college friends. Clean stays, amazing food & Lead Shubham managed everything seamlessly!',
    },
    {
      name: 'ROHAN MEHTA',
      role: 'Solo Traveler • Batch #1',
      city: 'Delhi NCR',
      quote:
        'Being an introvert, I had serious hesitation about joining 25 strangers in an AC Traveller. But the vibe was so welcoming and chill. Chauli Ki Jali cliff views, evening bonfire DJ night, and zero awkwardness. Found my permanent travel squad!',
    },
    {
      name: 'ANANYA & SIMRAN',
      role: 'Strangers to Besties • Batch #1',
      city: 'Noida / Greater Noida',
      quote:
        'We both boarded the Traveller at Noida without knowing a single person. By Sunday afternoon boating in Naini Lake, we became inseparable buddies! Clean hotels, respectful crowd, and 100% safe for female solo travelers.',
    },
  ];

  return (
    <div className="w-full font-sans select-none overflow-hidden bg-[#0D0C0A] text-[#F4EFE6]">
      
      {/* ========================================================================= */}
      {/* 1. TOP INTRO HEADER: "DISCOVER THE RAAHI ESCAPES" + WHATSAPP BADGE */}
      {/* ========================================================================= */}
      <section className="pt-12 pb-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#0D0C0A]">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading uppercase tracking-tight text-white">
            DISCOVER THE RAAHI ESCAPES
          </h2>
          <p className="font-medium text-sm sm:text-base mt-1 text-stone-400">
            Curated Hillside Stays, Mountain Bonfires & 26-Seater AC Luxury Circuits
          </p>
        </div>

        {/* Green Floating WhatsApp Direct Contact Pill (Exact match to reference top right) */}
        <a
          href={brandDetails.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#20ba5a] hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <div className="text-left leading-tight">
            <span className="block text-[10px] uppercase font-semibold text-white/90">WhatsApp Support</span>
            <span className="font-extrabold">{brandDetails.phone}</span>
          </div>
        </a>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: TORN YELLOW TOPO SECTION — CURATED STAYS & TRANSIT FLEET */}
      {/* ========================================================================= */}
      <div className="relative">
        {/* Top Torn Transition into Yellow */}
        <TornPaperTop color="#F59E0B" />

        <section id="vibe" className="bg-amber-500 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Topographic Contour Line Overlay Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.3) 21%, transparent 22%), radial-gradient(circle at 20% 80%, transparent 40%, rgba(0,0,0,0.3) 41%, transparent 42%)`,
              backgroundSize: '160px 160px',
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* 2 Cards Side-by-Side (Exact match to reference SHIVAY & PANCHACHULI cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              
              {/* CARD 1: HILLSIDE BOUTIQUE RESORT & BONFIRE LAWN */}
              <div 
                onClick={() => onSelectTrip(flagshipTrip)}
                className="group cursor-pointer flex flex-col items-center"
              >
                <h3 className="font-black text-stone-950 uppercase tracking-widest text-sm sm:text-base mb-3 font-heading text-center">
                  HILLSIDE BOUTIQUE RESORT & BONFIRE LAWN
                </h3>
                
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-900 group-hover:scale-102 transition-transform duration-300">
                  <img
                    src="/images/hillside-resort-stay.jpg"
                    alt="Hillside Boutique Resort & Mountain Balcony"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Dusk Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  {/* Bottom details overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Attached Washrooms • Hot Meals • DJ Night
                    </span>
                    <span className="text-xs font-black bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full">
                      Included
                    </span>
                  </div>
                </div>

                <p className="font-bold text-stone-900 text-xs sm:text-sm mt-3 tracking-wide text-center">
                  Bhimtal & Mukteshwar Hills, Uttarakhand
                </p>
              </div>

              {/* CARD 2: 26-SEATER LUXURY AC TRAVELLER */}
              <div 
                onClick={() => onSelectTrip(flagshipTrip)}
                className="group cursor-pointer flex flex-col items-center"
              >
                <h3 className="font-black text-stone-950 uppercase tracking-widest text-sm sm:text-base mb-3 font-heading text-center">
                  26-SEATER LUXURY AC TRAVELLER
                </h3>
                
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-900 group-hover:scale-102 transition-transform duration-300">
                  <img
                    src="/images/luxury-traveller-interior.jpg"
                    alt="26-Seater Luxury AC Traveller Pushback Seats Interior"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay with "CLICK FOR MORE INFO" text (Exact match to reference) */}
                  <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center group-hover:bg-stone-950/30 transition-colors">
                    <span className="font-heading font-black text-white text-sm sm:text-base tracking-widest uppercase bg-stone-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-lg group-hover:scale-105 transition-transform">
                      CLICK FOR MORE INFO
                    </span>
                  </div>

                  {/* Bottom details overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Pushback Seats • Music System • USB Charging
                    </span>
                    <span className="text-xs font-black bg-white text-stone-950 px-2.5 py-1 rounded-full">
                      Noida Sec 62
                    </span>
                  </div>
                </div>

                <p className="font-bold text-stone-900 text-xs sm:text-sm mt-3 tracking-wide text-center">
                  Pickup & Drop: Noida Sector 62 & Akshardham Metro, Delhi NCR
                </p>
              </div>

            </div>

            {/* THE STRANGER TRAVEL & SOLO BACKPACKER PLEDGE (4 Pillars) */}
            <div className="mt-12 pt-8 border-t border-stone-900/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Pillar 1: 100% Female Solo Traveler Friendly */}
              <div className="bg-stone-950 text-white p-5 rounded-2xl border-2 border-stone-900 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold mb-3 shadow">
                    <ShieldCheck className="w-5 h-5 text-stone-950" />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                    100% Solo Female Friendly
                  </h4>
                  <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                    Guaranteed separate female sharing rooms, verified co-travelers, and zero-tolerance safety protocol.
                  </p>
                </div>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest mt-3 block">
                  ★ Verified Female Safety
                </span>
              </div>

              {/* Pillar 2: Balanced Squad Ratio */}
              <div className="bg-stone-950 text-white p-5 rounded-2xl border-2 border-stone-900 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold mb-3 shadow">
                    <Users className="w-5 h-5 text-stone-950" />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                    Balanced Stranger Squad
                  </h4>
                  <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                    ~50:50 gender balance and 60%+ solo wanderers. Fun ice-breaker games so you feel like old friends.
                  </p>
                </div>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest mt-3 block">
                  ★ Zero Awkwardness
                </span>
              </div>

              {/* Pillar 3: Exact Noida 62 Pickup Pin */}
              <div className="bg-stone-950 text-white p-5 rounded-2xl border-2 border-stone-900 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold mb-3 shadow">
                    <Navigation className="w-5 h-5 text-stone-950" />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                    Verified Departure Point
                  </h4>
                  <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                    Noida Sector 62 (Electronic City Metro / Fortis Circle) & Akshardham Metro with live bus tracking.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Noida+Sector+62+Metro+Station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-amber-300 hover:text-white uppercase tracking-widest mt-3 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>📍 Open in Google Maps →</span>
                </a>
              </div>

              {/* Pillar 4: Founder & Lead Shubham Care */}
              <div className="bg-stone-950 text-white p-5 rounded-2xl border-2 border-stone-900 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold mb-3 shadow">
                    <CheckCircle2 className="w-5 h-5 text-stone-950" />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                    Lead Shubham On-Ground
                  </h4>
                  <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                    Founder personally coordinates hotel check-ins, bonfire night, prasad line & seamless mountain transit.
                  </p>
                </div>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest mt-3 block">
                  ★ 100% Personal Care
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Torn Transition into White */}
        <TornPaperBottom color="#F59E0B" />
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: DOTTED ROUTE 📍 + 3 TALL VERTICAL CARDS */}
      {/* ========================================================================= */}
      <section id="batches" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Dotted Route Trail & Red Pin (Exact match to reference) */}
          <div className="lg:col-span-5 relative">
            
            {/* Dotted Route Curve with Red Pin 📍 */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
                <MapPin className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <span className="text-xs font-bold text-rose-400 tracking-wider uppercase">
                Curated Himalayan Circuit
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading uppercase tracking-tight leading-tight">
              WEEKEND ESCAPES WITH STRANGERS
            </h2>

            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              Embark on a spiritual and scenic journey with our verified <strong className="text-white font-semibold">Neem Karoli Baba (Kainchi Dham)</strong>, Chopta Tungnath & Kasol Himalayan circuits.
            </p>

            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              Traverse through picturesque pine forests, lush alpine valleys, and mountain summits, while discovering serene lakeside boat rides and evening bonfire DJ nights with like-minded solo wanderers.
            </p>

            {/* Dotted Decorative Route Trail */}
            <div className="my-6 hidden sm:block">
              <svg width="240" height="40" viewBox="0 0 240 40" fill="none">
                <path 
                  d="M10 20 C 60 5, 120 35, 230 20" 
                  stroke="#F59E0B" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 6" 
                />
                <circle cx="230" cy="20" r="4" fill="#E11D48" />
              </svg>
            </div>

            {/* Yellow Pill Button "LEARN MORE" */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectTrip(flagshipTrip)}
                className="px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer font-heading"
              >
                LEARN MORE
              </button>

              <button
                type="button"
                onClick={() => onBookTrip(flagshipTrip)}
                className="px-6 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:scale-105 cursor-pointer border border-white/20"
              >
                Book a Slot (₹5,484)
              </button>
            </div>
          </div>

          {/* Right Column: Tall Vertical Portrait Cards for Curated Destinations */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              
              {trips.map((trip, idx) => {
                const isFlagship = trip.id === 'trip-kainchi-dham-nainital';

                return (
                  <div
                    key={trip.id}
                    onClick={() => onSelectTrip(trip)}
                    className="group cursor-pointer relative h-[340px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-white/10 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-end p-4 sm:p-5 text-white"
                  >
                    {/* Background Photo */}
                    <img
                      src={trip.images[0]}
                      alt={`${trip.destination} - ${trip.title} with Raahi Travels`}
                      onError={(e) => {
                        e.currentTarget.src = '/images/kainchi-dham-temple.jpg';
                      }}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                    {/* Badge top */}
                    {isFlagship ? (
                      <span className="absolute top-4 left-4 text-[10px] font-extrabold bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        ★ Batch #1 Completed
                      </span>
                    ) : (
                      <span className="absolute top-4 left-4 text-[10px] font-bold bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                        {trip.badge || trip.category.split(' ')[0]}
                      </span>
                    )}

                    {/* Center Overlay "CLICK FOR MORE INFO" on middle card (Exact match to reference) */}
                    {idx === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="font-heading font-black text-white text-xs tracking-widest uppercase bg-stone-950/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 group-hover:scale-105 transition-transform">
                          CLICK FOR MORE INFO
                        </span>
                      </div>
                    )}

                    {/* Content Bottom */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] text-amber-300 font-bold block">
                          ₹{trip.startingPrice.toLocaleString('en-IN')} All-Inclusive
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white/90">
                          Squad: 13F • 13M
                        </span>
                      </div>
                      <h4 className="font-black text-lg sm:text-xl font-heading uppercase tracking-tight text-white leading-tight">
                        {trip.destination.split(',')[0]}
                      </h4>
                      <p className="text-[11px] text-stone-300 line-clamp-1 mt-1 font-normal">
                        {trip.title}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PAST TRIPS MOTION MARQUEE GALLERY (Immediately above About Section) */}
      {/* ========================================================================= */}
      <div id="gallery">
        <PastTripsMarqueeGallery
          photos={galleryPhotos}
          onOpenAdmin={onOpenAdmin}
          onBookNextBatch={() => onBookTrip(flagshipTrip)}
        />
      </div>

      {/* ========================================================================= */}
      {/* 5. SECTION 3: TORN YELLOW TOPO SECTION — "ABOUT RAAHI" */}
      {/* ========================================================================= */}
      <div id="about" className="relative">
        <TornPaperTop color="#F59E0B" />

        <section className="bg-amber-500 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
          {/* Topographic Contour Line Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 30%, transparent 20%, rgba(0,0,0,0.3) 21%, transparent 22%), radial-gradient(circle at 30% 70%, transparent 35%, rgba(0,0,0,0.3) 36%, transparent 37%)`,
              backgroundSize: '180px 180px',
            }}
          />

          <div className="max-w-3xl mx-auto relative z-10 text-stone-950">
            <h3 className="font-black text-2xl sm:text-3xl lg:text-4xl font-heading uppercase tracking-tight">
              ABOUT RAAHI TRAVELS
            </h3>

            <p className="font-extrabold text-stone-900 text-sm sm:text-base mt-2 max-w-xl mx-auto tracking-wide">
              At Raahi Travels, we take pride in offering the <br className="hidden sm:block" />
              <strong>best group weekend experiences & certified hill stays</strong>,
              <br />
              ensuring that every solo traveler feels at home while immersing in the mountains.
            </p>

            <p className="mt-4 text-stone-900/90 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Our trips provide a unique opportunity to connect with strangers who share your thirst for wonder. We curate end-to-end all-inclusive departures from Noida Sector 62 in a 26-seater luxury AC Traveller, hotel stays with mountain views, holy temple darshans, and acoustic campfire nights—making every journey an unforgettable story.
            </p>

            {/* White Pill Button "CONTACT US" (Exact match to reference) */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href={brandDetails.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105 cursor-pointer font-heading"
              >
                TALK TO HOST SHUBHAM ({brandDetails.phone})
              </a>
            </div>
          </div>
        </section>

        <TornPaperBottom color="#F59E0B" />
      </div>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: DARK MOUNTAIN TESTIMONIAL COLLAGE (Exact match to reference) */}
      {/* ========================================================================= */}
      <section id="reviews" className="relative bg-[#0F0E0C] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Dark Mountain Scenic Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0E0C] via-transparent to-[#0F0E0C]" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-heading font-black text-amber-400 tracking-widest uppercase text-xs sm:text-sm block">
              WHAT CLIENT HAVE TO SAY ABOUT US & THE EXPERIENCE
            </span>
          </div>

          {/* Central Testimonial & Floating Photo Collage Container */}
          <div className="relative min-h-[440px] flex items-center justify-center">
            
            {/* FLOATING PHOTO 1: Top Left - Rooftop Terrace Squad */}
            <div className="hidden md:block absolute -top-4 left-4 w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl rotate-[-8deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
              <img
                src="/gallery/batch1-terrace-group.jpg"
                alt="Batch 1 Squad on Terrace"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING PHOTO 2: Top Right - Host Shubham & Travelers Selfie */}
            <div className="hidden md:block absolute -top-4 right-6 w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl rotate-[6deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
              <img
                src="/gallery/batch1-rooftop-selfie.jpg"
                alt="Host Shubham & Travelers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING PHOTO 3: Bottom Left - Kainchi Dham Evening Darshan & Prasad */}
            <div className="hidden md:block absolute bottom-2 left-10 w-32 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl rotate-[5deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
              <img
                src="/gallery/batch1-kainchidham-prasad.png"
                alt="Kainchi Dham Prasad"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING PHOTO 4: Bottom Right - Family Dinner Gathering */}
            <div className="hidden md:block absolute bottom-0 right-12 w-28 h-32 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl rotate-[-6deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
              <img
                src="/gallery/batch1-dinner-gathering.jpg"
                alt="Family Dinner Gathering"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING PHOTO 5: Mid Right - Mountain Squad Boys */}
            <div className="hidden lg:block absolute top-28 right-0 w-28 h-28 rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-xl rotate-[12deg] hover:rotate-0 hover:scale-110 transition-all duration-300">
              <img
                src="/gallery/batch1-mountain-squad.jpg"
                alt="Mountain Boys Squad"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING PHOTO 6: Mid Left - Raahi Official Illuminated Logo */}
            <div className="hidden lg:block absolute top-28 left-0 w-28 h-24 rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-xl rotate-[-10deg] hover:rotate-0 hover:scale-110 transition-all duration-300 bg-stone-900/90 p-2 flex items-center justify-center">
              <img
                src="/raahi-logo-light.png"
                alt="RAAHI - Har Safar, Ek Kahani"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* CENTER QUOTE BLOCK (Exact match to reference centered card) */}
            <div className="max-w-xl mx-auto text-center px-4 relative z-20">
              
              {/* Mobile Real Photo Preview (Batch #1 Authentic Moments) */}
              <div className="flex md:hidden items-center justify-center -space-x-2 mb-5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                  <img src="/gallery/batch1-terrace-group.jpg" alt="Batch 1 Travelers" className="w-full h-full object-cover" />
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-300 shadow-xl ring-2 ring-amber-400/50 z-10 scale-105">
                  <img src="/gallery/batch1-rooftop-selfie.jpg" alt="Host Shubham & Travelers" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                  <img src="/gallery/batch1-kainchidham-prasad.png" alt="Kainchi Dham Darshan" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-4">
                <Quote className="w-6 h-6 fill-amber-400" />
              </div>

              <blockquote className="text-base sm:text-lg md:text-xl font-medium text-stone-100 leading-relaxed italic">
                "{stories[activeStoryIdx].quote}"
              </blockquote>

              <div className="mt-6">
                <span className="font-heading font-black text-amber-400 uppercase tracking-widest text-sm block">
                  {stories[activeStoryIdx].name}
                </span>
                <span className="text-xs text-stone-400 font-semibold block mt-0.5">
                  {stories[activeStoryIdx].role} • {stories[activeStoryIdx].city}
                </span>
              </div>

              {/* Story selector dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {stories.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeStoryIdx === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Show review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FREQUENTLY ASKED QUESTIONS & CONCERNS (Exact match to top community standards) */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t bg-[#0F0E0C] border-stone-800">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-bold mb-3 bg-amber-500/15 border-amber-400/40 text-amber-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Got Doubts? We’ve Got You Covered</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-heading uppercase tracking-tight text-white">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs sm:text-sm mt-2 max-w-lg mx-auto text-stone-400">
              Everything you need to know about joining our stranger squads, safety, pickups & room allocations.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 overflow-hidden transition-all duration-200 bg-stone-900/90 border-stone-800 hover:border-amber-400/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-black text-sm sm:text-base leading-snug text-white">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-stone-800 text-stone-300">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 animate-fadeIn text-stone-300 border-stone-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SHARE WITH GANG ON WHATSAPP BANNER */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-stone-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border-2 border-stone-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                Traveling with Friends or Convincing Your Gang?
              </span>
              <h4 className="text-lg sm:text-xl font-black font-heading text-white">
                Share Trip Details Directly on WhatsApp
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Forward full itinerary, stay photos, and pricing with 1 click.
              </p>
            </div>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                'Hey! Check out this weekend group trip to Neem Karoli Baba (Kainchi Dham), Bhimtal, Mukteshwar & Nainital with Raahi Travels! All-inclusive stays, meals & 26-Seater AC Traveller at ₹5,484 only. View itinerary: ' + window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp with Gang</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 6: CLEAN FOOTER & BRAND ACCENT BAR */}
      {/* ========================================================================= */}
      <footer className="pt-16 pb-0 border-t bg-[#0D0C0A] text-stone-300 border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1: Brand & Address (Exact match to reference left) */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl font-black font-heading uppercase tracking-tight text-white">
                  RAAHI TRAVELS
                </span>
              </div>
              <p className="text-xs font-bold text-amber-500 tracking-wider uppercase mb-4">
                Weekend Group Journeys & Mountain Backpacking
              </p>

              <div className="mt-4">
                <span className="text-[11px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                  DEPARTURE ADDRESS
                </span>
                <p className="text-sm font-semibold text-white">
                  Noida Sector 62 & Akshardham Metro, Delhi NCR
                </p>
                <p className="text-xs mt-1 text-stone-400">
                  Destination Circuits: Kainchi Dham, Golu Devta, Bhimtal, Mukteshwar & Nainital
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links (Exact match to reference middle) */}
            <div>
              <span className="text-xs font-black uppercase tracking-widest block mb-3 font-heading text-white">
                QUICK LINKS
              </span>
              <ul className="space-y-2 text-xs sm:text-sm font-medium text-stone-300">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectTrip(flagshipTrip)}
                    className="hover:text-amber-500 transition-colors cursor-pointer text-left"
                  >
                    • Neem Karoli Baba Ashram (Batch #1 Completed)
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => trips[1] ? onSelectTrip(trips[1]) : onSelectTrip(flagshipTrip)}
                    className="hover:text-amber-500 transition-colors cursor-pointer text-left"
                  >
                    • Upcoming Batch #2: 16 - 19 Oct (Weekend Special)
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => trips[2] ? onSelectTrip(trips[2]) : onSelectTrip(flagshipTrip)}
                    className="hover:text-amber-500 transition-colors cursor-pointer text-left"
                  >
                    • Upcoming Batch #3: 23 - 26 Oct (Dussehra Long Weekend)
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectTrip(flagshipTrip)}
                    className="hover:text-amber-500 transition-colors cursor-pointer text-left"
                  >
                    • 26-Seater AC Luxury Traveller & Hillside Stays
                  </button>
                </li>
                {onOpenDashboard && (
                  <li className="pt-2">
                    <button 
                      type="button" 
                      onClick={onOpenDashboard}
                      className="font-bold text-amber-500 hover:text-amber-600 transition-colors cursor-pointer text-left"
                    >
                      → View My Bookings Dashboard
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: About Us & Direct Contacts (Exact match to reference right) */}
            <div>
              <span className="text-xs font-black uppercase tracking-widest block mb-3 font-heading text-white">
                DIRECT CONTACT & BOOKINGS
              </span>

              {/* Social icons row */}
              <div className="flex items-center gap-3 mb-4">
                <a
                  href={brandDetails.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={brandDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </a>
                <a
                  href={`tel:${brandDetails.phone}`}
                  className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-1 text-xs text-stone-300">
                <p>
                  <strong className="text-white">Direct Phone:</strong> {brandDetails.phone}
                </p>
                <p>
                  <strong className="text-white">Official Instagram:</strong> {brandDetails.instagram}
                </p>
                <p>
                  <strong className="text-white">Official UPI ID:</strong> {brandDetails.bankDetails.upiId}
                </p>
                <p className="text-[11px] pt-1 text-stone-400">
                  SBI A/c: {brandDetails.bankDetails.accountNumber} ({brandDetails.bankDetails.ifscCode})
                </p>
              </div>

              {/* Admin Access Button in Footer */}
              {onOpenAdmin && (
                <div className="mt-4 pt-3 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-lg border text-amber-300 hover:text-amber-200 bg-amber-500/10 border-amber-500/20"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Control Center ⚙️</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* BOTTOM ACCENT BRAND BAR (Exact match to green bottom bar in reference: WWW.TREKTOHEAVEN.COM) */}
        <div className="w-full bg-emerald-600 py-2.5 px-4 flex items-center justify-between text-xs text-white max-w-7xl mx-auto">
          <p className="font-heading font-black tracking-widest uppercase">
            WWW.THERAAHITRAVELS.COM • HAR SAFAR, EK KAHANI
          </p>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-white/70 hover:text-white underline cursor-pointer text-[11px]"
            >
              Organizer Admin
            </button>
          )}
        </div>
      </footer>

    </div>
  );
};

export default RaahiJournalPage;
