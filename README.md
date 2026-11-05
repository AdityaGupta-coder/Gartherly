# Gatherly — Next-Gen Event Discovery & Digital Registration Platform

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.18.5-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Web Crypto API](https://img.shields.io/badge/Security-PBKDF2_SHA--256-4CAF50?logo=webauthn&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits)
[![Theme](https://img.shields.io/badge/Theme-Light_Default_%2B_Dark_Mode-orange)](https://github.com)

**Gatherly** is a modern, high-performance event discovery and ticket registration web application engineered with React 19, Vite, and Tailwind CSS v4. Designed with an editorial aesthetic, Gatherly blends fluid micro-interactions, responsive typography, and an adaptive dual-theme visual system (Light Mode default + Ambient Cyber Dark Mode) with a robust client-side event management and authentication engine.

---

## Table of Contents

- [Architectural Overview](#architectural-overview)
- [Major Features Deep-Dive](#major-features-deep-dive)
  - [1. Event Discovery & Multi-Facet Filtering Engine](#1-event-discovery--multi-facet-filtering-engine)
  - [2. Spotlight & Live Event Experience](#2-spotlight--live-event-experience)
  - [3. Resilient Image Showcase Architecture](#3-resilient-image-showcase-architecture)
  - [4. Event Details & Social Sharing](#4-event-details--social-sharing)
  - [5. Smart Registration & Pass Issuance](#5-smart-registration--pass-issuance)
  - [6. Digital Ticket Passbook (My Registrations)](#6-digital-ticket-passbook-my-registrations)
  - [7. Cryptographic Client Authentication (PBKDF2)](#7-cryptographic-client-authentication-pbkdf2)
  - [8. Adaptive Dual-Theme Engine (Light/Dark)](#8-adaptive-dual-theme-engine-lightdark)
  - [9. Responsive Navigation & Mobile Drawer](#9-responsive-navigation--mobile-drawer)
- [Application Route Map](#application-route-map)
- [Data Models & Storage Schema](#data-models--storage-schema)
- [Project Directory Structure](#project-directory-structure)
- [Tech Stack & Tooling](#tech-stack--tooling)
- [Getting Started & Local Development](#getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation & Execution](#installation--execution)
- [Security & Production Readiness Guide](#security--production-readiness-guide)
- [License](#license)

---

## Architectural Overview

Gatherly is built on a modular client-side architecture that leverages React Contexts for cross-cutting state (Authentication and Theming) and deterministic browser storage abstractions for state persistence.

```
                           +------------------------+
                           |       App Router       |
                           |   (React Router v7)    |
                           +-----------+------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
        +----------v----------+                 +----------v----------+
        |    ThemeProvider    |                 |    AuthProvider     |
        | (Light/Dark Toggle) |                 | (PBKDF2 Credentials)|
        +----------+----------+                 +----------+----------+
                   |                                       |
      +------------+---------------------------------------+------------+
      |                                                                 |
+-----v---------------+   +-------------------+   +---------------------+---+
|  Discovery Engine   |   |   Event Showcase  |   |    Passbook Engine      |
|  - Realtime Search  |   | - Details View    |   |  - Authenticated Guard  |
|  - Status Tabs      |   | - Web Share API   |   |  - Ticket Stub UI       |
|  - Category Pills   |   | - Validated Form  |   |  - Cancellation Action  |
|  - Dynamic Cards    |   | - Duplicate Check |   |                         |
+---------------------+   +-------------------+   +-------------------------+
```

---

## Major Features Deep-Dive

### 1. Event Discovery & Multi-Facet Filtering Engine
- **Instant Search with Debounce Matching**: Filter events on the fly across title, venue location, descriptive tags, and category names without server latency.
- **Horizontal Categorization Bar**: Features smooth horizontal navigation with customized browser-agnostic scrollbar hiding (`.no-scrollbar`), allowing seamless touch-scrolling on mobile and clean presentation on desktop.
- **Event Lifecycle Tabs**: Switch between **All Events**, **Happening Now (Live)**, and **Upcoming Events** with instant UI updates.
- **Interactive Bookmarks**: Toggle favorites on any event card with a single tap. A live badge counter in the navigation bar displays the current count of saved events.
- **Dynamic Result Counters & Zero-State Recovery**: Displays exact match counts ("Showing X events") and provides a one-click "Reset all filters" button when queries yield no results.

### 2. Spotlight & Live Event Experience
- **Hero Spotlight Card**: Dedicated high-contrast feature module highlighting events currently marked with `"live"` status (e.g., *City Lights Music Festival*).
- **Pulsing Live Indicator**: Real-time animated CSS radar ping badge (`animate-ping`) alerting visitors to ongoing happenings.
- **Direct Express Booking**: Spotlight banner includes an immediate one-click pathway into the registration flow.

### 3. Resilient Image Showcase Architecture
- **Graceful Error Handling**: High-resolution photography loaded from remote CDNs (Unsplash) features automatic load error detection via `onError` hooks.
- **Visual Integrity Guard**: If a network glitch or missing URL causes an image to break, the broken image tag is cleanly unmounted and replaced by an aesthetic vector-patterned fallback block to ensure zero UI distortion.

### 4. Event Details & Social Sharing
- **Dedicated Route View (`/events/:eventId`)**: Complete agenda, venue specifics, time zones, event category badges, and comprehensive event overviews.
- **Native Web Share Integration**: Leverages the browser's native `navigator.share` API on supported devices for sharing events to messaging apps and social platforms.
- **Fallback Clipboard Copying**: Automatically falls back to asynchronous clipboard copy (`navigator.clipboard.writeText`) with a transient toast notification on desktop environments.

### 5. Smart Registration & Pass Issuance
- **Pre-filled User Context**: If an attendee is signed in, their name and email are automatically bound to the registration form.
- **Client-Side Data Sanitization & Strict Validation**:
  - Full Name: Minimum 2-character requirement.
  - Email: RFC-compliant regular expression validation.
  - Phone: Digit normalization enforcing valid 10-digit formats with real-time numeric typing filters.
- **Duplicate Registration Prevention**: Automatically cross-references existing user tickets to block double bookings for the same event.
- **Instant Digital Pass Issuance**: Generates a unique, cryptographically random `crypto.randomUUID()` ticket reference upon successful submission.

### 6. Digital Ticket Passbook (My Registrations)
- **Protected User Route (`/registrations`)**: Secured by the `RequireAuth` higher-order component. Unauthenticated attempts are redirected to `/login` with return-path preservation.
- **Perforated Ticket UI**: Custom-designed event ticket cards with dashed perforation lines, barcode decoration, event time stamps, and attendee information.
- **Booking Cancellation**: Attendees can release reservations at any time. Cancellations update storage immediately and reflect on the UI with optimistic state changes.

### 7. Cryptographic Client Authentication (PBKDF2)
- **Zero Plaintext Storage**: Passwords are never stored in raw text.
- **Hardware-Grade Cryptography via Web Crypto API**:
  - Algorithm: **PBKDF2** (Password-Based Key Derivation Function 2)
  - Hash Function: **SHA-256**
  - Key Length: **256 bits**
  - Iteration Count: **150,000 iterations**
  - Salt: **16-byte cryptographically secure random salt** generated per account using `crypto.getRandomValues(new Uint8Array(16))`.
- **Session Tiering ("Remember Me")**:
  - **Remembered sessions**: Preserved in `localStorage` across browser restarts.
  - **Temporary sessions**: Scoped strictly to `sessionStorage` for secure shared-terminal usage.

### 8. Adaptive Dual-Theme Engine (Light/Dark)
- **Light Mode by Default**: Tailored for readability with high-contrast neutral backgrounds, crisp typography, and a subtle 40px × 40px grid pattern (`rgba(0, 0, 0, 0.04)`).
- **Ambient Cyber Dark Mode**:
  - Faded grid pattern (`rgba(255, 255, 255, 0.035)`) masked with linear transparency gradients.
  - Dynamic ambient warm glow orbs (`#ff5500` backlight bloom with `blur-[90px]`) creating depth behind hero content.
- **Zero Flash of Unstyled Theme (FOUT)**: Theme preference is hydrated from `localStorage` (`gatherly_theme_preference`) and applied to the root document element before component rendering.
- **Instant Global Toggle**: Switch themes anywhere in the app with the navigation bar Sun/Moon toggle button.

### 9. Responsive Navigation & Mobile Drawer
- **Glassmorphic Sticky Header**: Semi-transparent frosted backdrop with `backdrop-blur-md` for legible scrolling.
- **Full-Featured Mobile Drawer**: Smooth slide-down menu handling navigation links, bookmarks overview, authentication actions, and theme switching on mobile screens.

---

## Application Route Map

| Path | Component | Guard / Access | Primary Functionality |
| :--- | :--- | :--- | :--- |
| `/` | `Landing.jsx` | Public | Event discovery, search, category/status filters, bookmarks, and spotlight banner. |
| `/events/:eventId` | `EventDetails.jsx` | Public / Contextual | Detailed event brief, share link, and interactive registration pass generator. |
| `/login` | `Login.jsx` | Public (Guest) | Demo sign-in with PBKDF2 credential verification and "Remember me" option. |
| `/signup` | `Signup.jsx` | Public (Guest) | New account registration with unique email validation and password hashing. |
| `/registrations` | `MyRegistrations.jsx` | Protected (`RequireAuth`) | Digital passbook showing confirmed tickets, attendee info, and cancellation options. |
| `*` | Wildcard | Public | Automatic redirect fallback to `/`. |

---

## Data Models & Storage Schema

Gatherly stores demo data locally in the user's browser using deterministic keys:

### 1. User Record (`gatherly.demo.users` in `localStorage`)
```json
[
  {
    "id": "e39f3796-03c2-4874-9549-c187bc954f9a",
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "salt": "u8Z...==",
    "passwordHash": "k9L...=="
  }
]
```

### 2. Session Object (`gatherly.demo.session` in `localStorage` or `sessionStorage`)
```json
{
  "id": "e39f3796-03c2-4874-9549-c187bc954f9a",
  "name": "Alex Mercer",
  "email": "alex@example.com"
}
```

### 3. Registration Ticket (`gatherly.demo.registrations` in `localStorage`)
```json
[
  {
    "id": "7f1b63b2-6523-4556-91b7-95133d183069",
    "userId": "e39f3796-03c2-4874-9549-c187bc954f9a",
    "eventId": 1,
    "eventTitle": "City Lights Music Festival",
    "eventDate": "November 6, 2026",
    "eventTime": "Happening now",
    "eventVenue": "Pier 27, San Francisco",
    "eventImage": "https://images.unsplash.com/...",
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "phone": "4155552671",
    "createdAt": "2026-11-06T04:20:00.000Z"
  }
]
```

---

## Project Directory Structure

```text
├── public/
│   ├── favicon.svg             # Application brand icon
│   └── fonts/                   # Typography assets (Neue Machina)
├── src/
│   ├── components/
│   │   ├── EventDetails.jsx     # Event showcase, share handler, registration form
│   │   ├── Landing.jsx          # Hero, live spotlight, filter bar, event grid
│   │   ├── Login.jsx            # Sign-in form with session management
│   │   ├── MyRegistrations.jsx  # Digital ticket passbook & cancellation manager
│   │   ├── RequireAuth.jsx      # Higher-order route guard for protected paths
│   │   └── Signup.jsx           # Account creation with PBKDF2 hashing
│   ├── context/
│   │   ├── AuthContext.jsx      # Global authentication provider and hook (`useAuth`)
│   │   └── ThemeContext.jsx     # Dual-theme provider and hook (`useTheme`)
│   ├── lib/
│   │   ├── localAuth.js         # PBKDF2 cryptography, salt generation, session storage
│   │   └── registrations.js     # Ticket issuance, duplicate checking, cancellations
│   ├── App.jsx                  # Application root with router configuration
│   ├── App.css                  # Component-specific animation helpers
│   ├── index.css                # Tailwind CSS v4 directives, fonts, and grid textures
│   └── main.jsx                 # React 19 DOM bootstrap
├── index.html                   # HTML5 entry with metadata and viewport configuration
├── package.json                 # Project dependencies and script declarations
├── vite.config.js               # Vite build configuration and Tailwind plugin
└── README.md                    # Production documentation
```

---

## Tech Stack & Tooling

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime & Framework** | [React](https://react.dev/) | `^19.1.0` | Core UI library utilizing modern concurrent rendering |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) | `^6.3.5` | Lightning-fast HMR and optimized production bundling |
| **Routing** | [React Router](https://reactrouter.com/) | `^7.18.5` | Declarative client-side routing and programmatic navigation |
| **Styling & Design System** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.4` | Utility-first CSS framework via `@tailwindcss/vite` |
| **Cryptography** | [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) | Native | Client-side PBKDF2 key derivation and random salt generation |
| **Typography** | Google Fonts & Neue Machina | N/A | Editorial display and clean body typography |
| **Assets & Media** | Unsplash Source CDN | N/A | High-resolution photography with fallback handlers |

---

## Getting Started & Local Development

### Prerequisites
- **Node.js**: `18.0.0` or higher
- **npm**: `9.0.0` or higher

### Installation & Execution

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gatherly.git
   cd gatherly
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Compiles optimized static assets into the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## Security & Production Readiness Guide

> [!NOTE]
> **Demo Architecture vs. Enterprise Backend**  
> Gatherly is designed as a fully functional frontend application using browser storage (`localStorage` and `sessionStorage`) with genuine Web Crypto PBKDF2 password derivation. While this provides an authentic user experience without external server dependencies, full production deployment requires connecting a trusted backend API.

For production enterprise deployment, the following architecture is recommended:

1. **Backend Integration**: Replace `src/lib/localAuth.js` and `src/lib/registrations.js` with RESTful or GraphQL endpoints (e.g., Node.js/Express, Go, or FastAPI) connected to a relational database (PostgreSQL / MySQL via Prisma or Drizzle).
2. **Server-Side Authentication**: Transition to secure HTTP-only cookies storing JWTs or session tokens, or integrate OAuth2 / OpenID Connect providers (Auth0, Clerk, Firebase Auth, or Supabase).
3. **Transactional Integrity & Concurrency**: Implement database-level row locking or transactions (e.g., `SELECT ... FOR UPDATE`) to enforce strict event capacity limits and eliminate race conditions during high-demand registrations.
4. **Email & Notification Engine**: Integrate transactional email APIs (Resend, SendGrid, or AWS SES) to send PDF event passes with verifiable QR codes upon registration.
5. **Payment Processing**: Integrate Stripe, Razorpay, or LemonSqueezy for paid ticket tiers and webhook-driven confirmation pipelines.
6. **CDN & Edge Hosting**: Host the static build on Vercel, Netlify, Cloudflare Pages, or AWS S3 + CloudFront with SPA fallback rules (`/* -> /index.html`).

---

## License

This project is licensed under the MIT License — feel free to explore, customize, and extend it for your own event platforms.
