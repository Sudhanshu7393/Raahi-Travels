export type TripCategory = 'Weekend Getaways' | 'Himalayan Treks' | 'Road Trips' | 'Backpacking' | 'Festival Specials';

export interface TripBatch {
  id: string;
  startDate: string; // e.g. "10 Oct 2026"
  endDate: string; // e.g. "13 Oct 2026"
  totalSlots: number; // e.g. 16
  bookedSlots: number; // e.g. 12
  status: 'Open' | 'Filling Fast' | 'Sold Out';
  captainId?: string;
  captainName?: string;
}

export interface PricingTier {
  sharingType: 'Quad / Dorm Sharing' | 'Triple Sharing' | 'Double / Twin Sharing' | string;
  pricePerPerson: number;
  originalPrice: number;
  description: string;
}

export interface CommunityTrip {
  id: string;
  title: string;
  slug: string;
  destination: string;
  pickupPoint: string; // e.g. "Majnu Ka Tilla / Vidhan Sabha, Delhi"
  duration: string; // e.g. "3 Days / 2 Nights"
  category: TripCategory;
  badge?: string; // "Top Pick for Solo Travelers", "Weekend Bestseller", "High Energy"
  images: string[];
  vibe: string; // "Bonfires, Mountain Cafes, Stargazing, Acoustic Jams"
  groupSize: string; // "12 to 16 Like-minded Strangers"
  idealFor: string; // "Solo Travelers (60%+), Friends, Couples"
  pricingTiers: PricingTier[];
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  batches: TripBatch[];
  overview: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string;
    stay: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  faq?: { q: string; a: string }[];
}

export interface TripCaptain {
  id: string;
  name: string;
  nickname: string;
  age: number;
  photo: string;
  bio: string;
  tripsLed: number;
  rating: number;
  specialty: string; // "Guitar & Bonfire Jammer", "High-Altitude Certified", "Storyteller"
  instagramHandle?: string;
}

export interface TravelerPassenger {
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  email: string;
  city: string;
}

export interface CommunityBooking {
  id: string;
  bookingRef: string; // e.g. RAAHI-GANG-4891
  createdAt: string;
  tripId: string;
  tripTitle: string;
  destination: string;
  pickupPoint: string;
  batchId: string;
  batchDates: string;
  sharingType: string;
  pricePerPerson: number;
  slotsCount: number;
  travelers: TravelerPassenger[];
  primaryContact: {
    name: string;
    phone: string;
    email: string;
    emergencyContact: string;
  };
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  paymentStatus: 'Advance Paid' | 'Fully Paid';
  bookingStatus: 'Confirmed' | 'Completed' | 'Cancelled';
  paymentTxnId: string;
  assignedCaptain?: {
    name: string;
    phone: string;
    photo: string;
  };
  whatsappGroupLink?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  tripName: string;
  location: string;
  date?: string;
  tag?: string;
}

export interface BrandDetails {
  name: string;
  tagline: string;
  phone: string;
  whatsappUrl: string;
  instagram: string;
  instagramUrl: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
  };
}
