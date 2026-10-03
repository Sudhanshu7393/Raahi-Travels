# 🌄 RAAHI Travels — Har Safar, Ek Kahani

<p align="center">
  <img src="public/raahi-logo-light.png" alt="RAAHI Travels Logo" width="320"/>
</p>

<p align="center">
  <strong>Bespoke weekend group journeys & Himalayan backpacking for thoughtful solo wanderers from Delhi NCR.</strong><br/>
  <em>"Travel with strangers, return as lifelong friends."</em>
</p>

<p align="center">
  <a href="https://github.com/Sudhanshu7393/Raahi-Travels"><img src="https://img.shields.io/badge/Status-Production%20Ready-emerald?style=for-the-badge&logo=vercel" alt="Status"/></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/></a>
</p>

---

## 🌟 About RAAHI

**RAAHI** is a modern spatial travel web application and booking platform designed for weekend travelers, solo backpackers, and small friend groups looking for safe, curated, and unforgettable escapes from Delhi NCR (Noida Sector 62 & Akshardham Metro).

Built with ultra-modern **Spatial Glass Architecture** (inspired by visionOS and atelier aesthetics), it blends cinematic Himalayan photography, interactive 3D perspective carousels, authentic batch photo galleries, and an effortless 4-step token booking workflow with live WhatsApp squad connection.

---

## ✨ Key Features

### 1. 🌌 Signature 3D Spatial Coverflow Carousel
- Interactive cylindrical perspective carousel (`perspective: 1200px`, `rotateY`, `translateZ`) featuring all curated destinations.
- **Center-Lock Technology**: Active trip is always centered on any mobile phone screen (iPhone, Samsung, OnePlus, etc.).
- **Smart Touch Gestures**: Horizontal swipe with vertical scroll-protection so mobile users can navigate without trapping page scrolling.
- **Desktop Hover Elevation**: Cursor hover triggers a smooth 3D forward pop with a glowing amber luxury ring.
- **Mobile Pagination Dots**: Tap any pill dot to jump directly to that destination.

### 2. 🛕 Verified Curated Himalayan Circuits
- **Flagship Circuit**: Neem Karoli Baba Ashram (Kainchi Dham) • Golu Devta Temple • Bhimtal Lake • Mukteshwar Chauli Ki Jali • Nainital Hillside Resort & DJ Bonfire.
- **Chopta Tungnath Trek**: World's highest Shiva temple (12,073 ft) & Chandrashila peak summit (13,100 ft).
- **Kasol & Kheerganga**: Parvati valley backpacking, natural sulfur hot springs, and riverside camps.
- **Rishikesh Adventure**: 16 KM Grade III/IV river rafting, cliff jumping, waterfall hikes, and valley pool parties.

### 3. 🛡️ 100% Solo Female Safety & Community Protocol
- Guaranteed separate, verified female sharing rooms.
- Verified co-travelers and strict zero-tolerance conduct policy.
- 50:50 gender balance and 60%+ solo wanderers per batch.
- On-ground coordination led personally by Founder & Lead Shubham.

### 4. 🎟️ 4-Step Frictionless Slot Booking Modal
- **Step 1**: Choose departure batch date & room occupancy (Triple/Quad or Double/Twin).
- **Step 2**: Add primary explorer and fellow passenger details (age, phone, city).
- **Step 3**: Transparent breakdown with ₹2,000 token advance option, coupon code discounts, and official UPI QR code.
- **Step 4**: Instant celebratory booking confirmation with animated confetti, booking ID, captain phone link, and direct WhatsApp Gang invite.

### 5. 📸 Live Batch #1 Marquee Gallery
- Authentic, uncompressed memories from completed batches (Batch #1, 25-27 Sep).
- Infinite smooth horizontal auto-scroll marquee with interactive lightbox zoom and pause/play controls.
- Local high-res imagery with universal `onError` graceful fallbacks.

### 6. 🚀 Enterprise-Grade SEO & Web Performance
- Semantic HTML5 structure with optimized `<h1>`, `<h2>`, and schema hierarchies.
- **Rich JSON-LD Structured Data**:
  - `TravelAgency` Schema (Local business, address, geo-coordinates, reviews).
  - `TouristTrip` Schema (Itinerary, inclusions, pricing, departure hubs).
  - `FAQPage` Schema (Rich snippet answers directly on Google Search).
- Complete OpenGraph (OG) & Twitter Card tags for high-CTR social sharing.
- Auto-generated `public/robots.txt` and `public/sitemap.xml`.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture & modern state primitives |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org/) | End-to-end type safety across trips, batches, and bookings |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-gen CSS-first styling, glassmorphism & 3D utility layers |
| **Build Tool** | [Vite 8.3](https://vite.dev/) | Instant HMR and lightning-fast production bundling (200ms) |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent geometric SVG iconography |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | High-performance particle celebration upon booking |
| **Linting** | [Oxlint](https://oxc.rs/) | Rust-powered high-speed linter (25ms execution) |
| **Hosting** | [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) | Edge network CDN, automatic HTTPS, and instant Git CI/CD |

---

## 📁 Project Structure

```bash
Raahi/
├── public/
│   ├── images/              # High-res local destination photography
│   ├── gallery/             # Authentic user Batch #1 memories
│   ├── brochure_images/     # Extracted official PDF assets
│   ├── raahi-logo-light.png # Illuminated white typography logo
│   ├── _redirects           # Netlify & SPA routing redirect rules
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # Google indexing sitemap
├── src/
│   ├── components/
│   │   ├── SpatialHero.tsx             # 3D Coverflow arc carousel & navbar
│   │   ├── RaahiJournalPage.tsx        # Editorial journal, stays & circuits
│   │   ├── PastTripsMarqueeGallery.tsx # Infinite memory marquee & lightbox
│   │   ├── SlotBookingModal.tsx        # 4-step token booking & UPI flow
│   │   ├── TripDetailModal.tsx         # Detailed day-by-day itinerary modal
│   │   ├── MyTripsDashboard.tsx        # User booking & ticket manager
│   │   └── RaahiAdminPortalModal.tsx   # Organizer batch & captain manager
│   ├── data/
│   │   └── communityData.ts            # Centralized trips, captains & brand data
│   ├── types/
│   │   └── trip.ts                     # TypeScript interface definitions
│   ├── App.tsx                         # Core application state & navigation
│   ├── main.tsx                        # React DOM root entry
│   └── index.css                       # Tailwind layers & spatial glass styles
├── vercel.json                         # Vercel SPA rewrites & build configuration
├── vite.config.ts                      # Vite build plugins & Tailwind integration
└── package.json                        # Dependencies and script definitions
```

---

## ⚡ Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Sudhanshu7393/Raahi-Travels.git
cd Raahi-Travels
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 4. Build for production
```bash
npm run build
```
This generates the optimized production bundle in the `dist/` folder.

### 5. Lint codebase
```bash
npm run lint
```

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)
1. Import this repository into [Vercel](https://vercel.com/new).
2. The project will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**. Vercel will build and assign a live SSL-secured URL.

### Deploying to Netlify
- Drag and drop the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop), or connect this repository directly for automatic branch previews.

---

## 📞 Contact & Community Links

- **Brand**: RAAHI Travels — *Har Safar, Ek Kahani*
- **Founder & Lead Coordinator**: Shubham Singh
- **Phone**: +91 93365 15066
- **WhatsApp**: [Chat with Raahi Support](https://wa.me/919336515066?text=Hi%20Raahi%20Team%2C%20I%20want%20to%20know%20about%20the%20upcoming%20batches)
- **Instagram**: [@theraahitravles](https://instagram.com/theraahitravles)
- **Departure Hub**: Noida Sector 62 & Akshardham Metro, Delhi NCR

---

<p align="center">
  Crafted with ❤️ for solo wanderers, backpackers, and lifelong friendships.
</p>
