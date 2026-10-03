import React, { useState, useEffect } from 'react';
import type { CommunityTrip, CommunityBooking, GalleryItem, BrandDetails } from './types/trip';
import { COMMUNITY_TRIPS, INITIAL_COMMUNITY_BOOKINGS, INITIAL_GALLERY_PHOTOS, RAAHI_BRAND } from './data/communityData';
import { SpatialHero } from './components/SpatialHero';
import { RaahiJournalPage } from './components/RaahiJournalPage';
import { MyTripsDashboard } from './components/MyTripsDashboard';
import { TripDetailModal } from './components/TripDetailModal';
import { SlotBookingModal } from './components/SlotBookingModal';
import { RaahiAdminPortalModal } from './components/RaahiAdminPortalModal';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'website' | 'dashboard'>('website');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Core Data: Diverse Community Trips
  const [trips, setTrips] = useState<CommunityTrip[]>(() => {
    try {
      const saved = localStorage.getItem('raahi_community_trips_v8');
      return saved ? JSON.parse(saved) : COMMUNITY_TRIPS;
    } catch {
      return COMMUNITY_TRIPS;
    }
  });

  // Core Data: Past Trips Gallery Photos
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('raahi_gallery_photos_v1');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_PHOTOS;
    } catch {
      return INITIAL_GALLERY_PHOTOS;
    }
  });

  // Core Data: Brand & Bank / UPI Details
  const [brandDetails, setBrandDetails] = useState<BrandDetails>(() => {
    try {
      const saved = localStorage.getItem('raahi_brand_details_v1');
      return saved ? JSON.parse(saved) : RAAHI_BRAND;
    } catch {
      return RAAHI_BRAND;
    }
  });

  // Core Data: Customer Bookings (Sanitize old dummy bookings)
  const [bookings, setBookings] = useState<CommunityBooking[]>(() => {
    try {
      const saved = localStorage.getItem('raahi_community_bookings_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter(
          (b: CommunityBooking) =>
            !b.tripTitle?.toLowerCase().includes('kasol') &&
            !b.tripTitle?.toLowerCase().includes('rishikesh') &&
            !b.tripTitle?.toLowerCase().includes('chopta')
        );
        return filtered.length > 0 ? filtered : INITIAL_COMMUNITY_BOOKINGS;
      }
      return INITIAL_COMMUNITY_BOOKINGS;
    } catch {
      return INITIAL_COMMUNITY_BOOKINGS;
    }
  });

  // Modal State
  const [selectedTripForDetail, setSelectedTripForDetail] = useState<CommunityTrip | null>(null);
  const [bookingTrip, setBookingTrip] = useState<CommunityTrip | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('raahi_community_trips_v8', JSON.stringify(trips));
    } catch {}
  }, [trips]);

  useEffect(() => {
    try {
      localStorage.setItem('raahi_gallery_photos_v1', JSON.stringify(galleryPhotos));
    } catch {}
  }, [galleryPhotos]);

  useEffect(() => {
    try {
      localStorage.setItem('raahi_brand_details_v1', JSON.stringify(brandDetails));
    } catch {}
  }, [brandDetails]);

  useEffect(() => {
    try {
      localStorage.setItem('raahi_community_bookings_v2', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  // Navigation Helper
  const handleNavigateSection = (sectionId: string) => {
    setCurrentView('website');
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // Booking confirmed handler
  const handleBookingConfirmed = (newBooking: CommunityBooking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update booked slots in that batch
    setTrips((prevTrips) =>
      prevTrips.map((trip) => {
        if (trip.id === newBooking.tripId) {
          return {
            ...trip,
            batches: trip.batches.map((b) =>
              b.id === newBooking.batchId
                ? { ...b, bookedSlots: Math.min(b.totalSlots, b.bookedSlots + newBooking.slotsCount) }
                : b
            ),
          };
        }
        return trip;
      })
    );
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: 'Cancelled' as const } : b
      )
    );
  };

  const confirmedBookingCount = bookings.filter((b) => b.bookingStatus !== 'Cancelled').length;

  return (
    <div className="min-h-screen bg-[#0D0C0A] flex flex-col font-sans selection:bg-white selection:text-black text-stone-200">
      
      {/* VIEW SWITCHER */}
      {currentView === 'dashboard' ? (
        /* CUSTOMER SQUAD DASHBOARD */
        <MyTripsDashboard
          bookings={bookings}
          onBackToHome={() => setCurrentView('website')}
          onCancelBooking={handleCancelBooking}
        />
      ) : (
        /* MAIN COMMUNITY PLATFORM */
        <main className="flex-1">
          {/* 1. Spatial Hero: VisionOS Glass Island + Minimalist Title + 3D Curved Perspective Carousel */}
          <SpatialHero
            trips={trips}
            onSelectTrip={(trip) => setSelectedTripForDetail(trip)}
            onBookTrip={(trip) => setBookingTrip(trip)}
            onNavigateSection={handleNavigateSection}
            onOpenDashboard={() => setCurrentView('dashboard')}
            onOpenAdmin={() => setIsAdminOpen(true)}
            bookingCount={confirmedBookingCount}
          />

          {/* 2. Topographic & Scrapbook Adventure Journal (Exact match to reference) */}
          <div id="trips">
            <RaahiJournalPage
              trips={trips}
              onSelectTrip={(trip) => setSelectedTripForDetail(trip)}
              onBookTrip={(trip) => setBookingTrip(trip)}
              onOpenDashboard={() => setCurrentView('dashboard')}
              galleryPhotos={galleryPhotos}
              onOpenAdmin={() => setIsAdminOpen(true)}
              brandDetails={brandDetails}
            />
          </div>
        </main>
      )}

      {/* MODAL 1: Full Trip Itinerary & Vibe Details */}
      <TripDetailModal
        trip={selectedTripForDetail}
        onClose={() => setSelectedTripForDetail(null)}
        onBookSlot={(trip) => setBookingTrip(trip)}
      />

      {/* MODAL 2: 4-Step Slot Booking & WhatsApp Batch Join */}
      <SlotBookingModal
        trip={bookingTrip}
        onClose={() => setBookingTrip(null)}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenDashboard={() => setCurrentView('dashboard')}
        brandDetails={brandDetails}
      />

      {/* MODAL 3: Admin Control Center (Gallery, Trips/Pricing/Batches, Brand/UPI, Bookings) */}
      <RaahiAdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        trips={trips}
        onUpdateTrips={(updated) => setTrips(updated)}
        galleryPhotos={galleryPhotos}
        onUpdateGallery={(updated) => setGalleryPhotos(updated)}
        brandDetails={brandDetails}
        onUpdateBrandDetails={(updated) => setBrandDetails(updated)}
        bookings={bookings}
        onUpdateBookings={(updated) => setBookings(updated)}
      />
    </div>
  );
};

export default App;
