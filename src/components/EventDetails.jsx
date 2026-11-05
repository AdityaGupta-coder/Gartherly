import { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { events } from "./Landing.jsx";
import { addRegistration } from "../lib/registrations.js";

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}


function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-[#f04b0b]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4.5" width="14" height="13" rx="2" />
      <path d="M6.5 2.5v4M13.5 2.5v4M3 8h14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-[#f04b0b]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16 8.3c0 4.3-6 9.2-6 9.2S4 12.6 4 8.3a6 6 0 1 1 12 0Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M8.6 10.9l3.8 2.2M12.4 6.9 8.6 9.1" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="7" r="3" />
      <path d="M4 17a6 6 0 0 1 12 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4.5" width="14" height="11" rx="2" />
      <path d="m3 6.5 7 5 7-5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h.6a1 1 0 0 1 1 .7l.8 2.4a1 1 0 0 1-.3 1l-1.3 1.1a10.5 10.5 0 0 0 4.2 4.2l1.1-1.3a1 1 0 0 1 1-.3l2.4.8a1 1 0 0 1 .7 1v.6A2.5 2.5 0 0 1 15.5 18H15C8.9 18 4 13.1 4 7v-.5Z" />
    </svg>
  );
}

export default function EventDetails() {
  const { eventId } = useParams();
  const event = events.find((item) => String(item.id) === eventId);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const phoneRef = useRef(null);

  function handleShare() {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  }

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-stone-900 transition-colors duration-300 dark:bg-[#08080a] dark:text-stone-100">
        <section className="w-full max-w-[460px] rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-xl dark:border-stone-800 dark:bg-[#121217]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-2xl dark:bg-red-950/40">
            🔍
          </div>
          <h1 className="mt-4 font-machina text-2xl font-bold tracking-tight text-stone-900 dark:text-white">Gathering Not Found</h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            This event may have been removed or the link might be expired.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#f04b0b] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#dc4006] transition"
          >
            ← Back to Explore Gatherings
          </Link>
        </section>
      </main>
    );
  }

  function handleSubmit(formEvent) {
    formEvent.preventDefault();
    setError("");

    const form = formEvent.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name || name.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      form.elements.namedItem("name")?.focus();
      return;
    }

    if (!form.elements.namedItem("email")?.validity.valid) {
      setError("Please enter a valid email address.");
      form.elements.namedItem("email")?.focus();
      return;
    }

    if (!/^[+()\d.\-\s]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Enter a valid phone number with 7 to 15 digits.");
      phoneRef.current?.focus();
      return;
    }

    try {
      const registration = addRegistration({
        userId: user.id,
        event,
        name,
        email,
        phone,
      });
      setConfirmation(registration);
    } catch (registrationError) {
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : "Unable to complete registration. Please try again.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafb] text-stone-900 transition-colors duration-300 dark:bg-[#08080a] dark:text-stone-100">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20 dark:border-stone-800/80 dark:bg-[#0d0d12]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
            <Link to="/" className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47] transition-colors">
              Home
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <Link to="/#events" className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47] transition-colors">
              Events
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <span className="text-stone-900 dark:text-stone-100 truncate max-w-[160px] sm:max-w-[320px]">
              {event.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-[#f04b0b] hover:text-[#f04b0b] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs hover:border-orange-300 hover:text-[#f04b0b] transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
            >
              <ShareIcon />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.85fr]">
          {/* Left Column: Event Showcase */}
          <article className="space-y-6">
            {/* Main Media Showcase */}
            <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <div className="relative h-72 sm:h-96 w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                {!imgError ? (
                  <img
                    src={event.image}
                    alt={event.imageAlt}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-500/10 via-stone-100 to-stone-200 dark:from-orange-500/15 dark:via-[#181822] dark:to-[#121217] p-8 text-center">
                    <span className="text-5xl">🎟️</span>
                    <span className="mt-3 font-machina text-base font-bold text-stone-700 dark:text-stone-300">
                      {event.category} Gathering
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Chips */}
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  {event.status === "live" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                      Live Stream & In-Person
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-white/40 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-md backdrop-blur-md dark:border-stone-700/80 dark:bg-stone-900/90 dark:text-stone-200">
                      {event.category}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    📍 {event.venue}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-6 sm:p-9">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-orange-50 border border-orange-200/80 px-3 py-1 text-xs font-bold text-[#e8490b] dark:bg-orange-950/40 dark:border-orange-500/30 dark:text-[#ff7b47]">
                    {event.category}
                  </span>
                  <span className="text-xs text-stone-400 font-medium dark:text-stone-500">· Free Admission</span>
                </div>

                <h1 className="mt-3 font-machina text-3xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-4xl dark:text-white">
                  {event.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  {event.description}
                </p>

                {/* Date & Location Grid */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3.5 rounded-2xl bg-stone-50 border border-stone-100 p-4 dark:bg-stone-900/60 dark:border-stone-800">
                    <CalendarIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Date & Schedule</p>
                      <p className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">{event.date}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl bg-stone-50 border border-stone-100 p-4 dark:bg-stone-900/60 dark:border-stone-800">
                    <LocationIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Venue & City</p>
                      <p className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">{event.venue}</p>
                      <p className="text-xs text-[#e8490b] dark:text-[#ff7b47] font-semibold mt-0.5">Doors open 30 min prior</p>
                    </div>
                  </div>
                </div>

                {/* Event Highlights Section */}
                <div className="mt-8 border-t border-stone-100 dark:border-stone-800 pt-7">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Experience Highlights</h3>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="flex items-center gap-2 rounded-xl bg-orange-50/60 border border-orange-100 px-3 py-2 text-xs font-semibold text-stone-700 dark:bg-stone-900/60 dark:border-stone-800 dark:text-stone-300">
                      <span>⚡</span> Instant Digital Pass
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-orange-50/60 border border-orange-100 px-3 py-2 text-xs font-semibold text-stone-700 dark:bg-stone-900/60 dark:border-stone-800 dark:text-stone-300">
                      <span>👥</span> All Ages Welcome
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-orange-50/60 border border-orange-100 px-3 py-2 text-xs font-semibold text-stone-700 dark:bg-stone-900/60 dark:border-stone-800 dark:text-stone-300">
                      <span>♿</span> Accessible Venue
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Right Column: RSVP & Registration Sidebar */}
          <section
            id="registration"
            className="sticky top-20 rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)] sm:p-8 dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
            aria-labelledby="registration-heading"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#f04b0b]">
                  Save Your Spot
                </p>
                <h2 id="registration-heading" className="mt-1 font-machina text-xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                  Event Registration
                </h2>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500/30 dark:text-emerald-400">
                100% Free
              </span>
            </div>

            {/* State 1: Confirmation Ticket Stub */}
            {confirmation ? (
              <div role="status" aria-live="polite" className="mt-6">
                {/* Boarding pass card design */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-50/90 to-white dark:from-emerald-950/30 dark:to-[#171720] dark:border-emerald-500/40 p-6 shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-sm">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-machina text-base font-bold text-emerald-950 dark:text-emerald-200">
                        You’re on the guest list!
                      </h3>
                      <p className="text-xs text-emerald-800 dark:text-emerald-400">
                        Ticket saved for {confirmation.name}
                      </p>
                    </div>
                  </div>

                  {/* Dashed Tear Line */}
                  <div className="my-5 flex items-center gap-2">
                    <div className="-ml-8 h-4 w-4 rounded-full bg-[#fafafb] dark:bg-[#121217] border-r border-emerald-500/30" />
                    <div className="h-[1px] flex-1 border-t-2 border-dashed border-emerald-300 dark:border-emerald-800" />
                    <div className="-mr-8 h-4 w-4 rounded-full bg-[#fafafb] dark:bg-[#121217] border-l border-emerald-500/30" />
                  </div>

                  {/* Ticket Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">Event:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100 text-right">{confirmation.eventTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">Date & Time:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{confirmation.eventDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">Venue:</span>
                      <span className="font-medium text-stone-700 dark:text-stone-300 text-right">{confirmation.eventVenue}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">Ticket ID:</span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">#GATH-{confirmation.id}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link
                    to="/registrations"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#f04b0b] text-xs font-bold text-white shadow-md hover:bg-[#dc4006] transition"
                  >
                    View My Registrations & Tickets →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    className="inline-flex h-10 w-full items-center justify-center rounded-full border border-stone-200 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
                  >
                    Register Another Guest
                  </button>
                </div>
              </div>
            ) : !user ? (
              /* State 2: Not logged in */
              <div className="mt-6 rounded-3xl border border-orange-200/80 bg-orange-50/50 p-6 text-center dark:border-orange-900/40 dark:bg-orange-950/20">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-xs text-xl dark:bg-stone-900">
                  🎟️
                </div>
                <h3 className="mt-3 font-machina text-base font-bold text-stone-900 dark:text-white">Sign in to claim your ticket</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  Join or sign in to Gatherly to save this registration to your account and access your digital passes anytime.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    state={{ from: location }}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 bg-white text-xs font-bold text-stone-800 shadow-xs hover:border-[#f04b0b] hover:text-[#f04b0b] transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-500"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    state={{ from: location }}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#f04b0b] text-xs font-bold text-white shadow-md hover:bg-[#dc4006] transition"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            ) : (
              /* State 3: Registration Form */
              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="eventId" value={event.id} />

                {/* Name */}
                <div>
                  <label htmlFor="participant-name" className="mb-1 block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <UserIcon />
                    </span>
                    <input
                      id="participant-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      defaultValue={user.name}
                      minLength={2}
                      maxLength={100}
                      required
                      placeholder="Your full name"
                      className="h-11 w-full rounded-2xl border border-stone-200 bg-stone-50/70 pl-10 pr-3.5 text-xs font-medium text-stone-800 outline-none transition hover:border-orange-300 focus:border-[#f04b0b] focus:bg-white focus:ring-4 focus:ring-[#f04b0b]/10 dark:border-stone-800 dark:bg-[#181822] dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-[#1e1e2b]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="participant-email" className="mb-1 block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <MailIcon />
                    </span>
                    <input
                      id="participant-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      defaultValue={user.email}
                      maxLength={254}
                      required
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-2xl border border-stone-200 bg-stone-50/70 pl-10 pr-3.5 text-xs font-medium text-stone-800 outline-none transition hover:border-orange-300 focus:border-[#f04b0b] focus:bg-white focus:ring-4 focus:ring-[#f04b0b]/10 dark:border-stone-800 dark:bg-[#181822] dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-[#1e1e2b]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="participant-phone" className="mb-1 block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <PhoneIcon />
                    </span>
                    <input
                      ref={phoneRef}
                      id="participant-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="[+()0-9.\\- ]{7,25}"
                      maxLength={25}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="h-11 w-full rounded-2xl border border-stone-200 bg-stone-50/70 pl-10 pr-3.5 text-xs font-medium text-stone-800 outline-none transition hover:border-orange-300 focus:border-[#f04b0b] focus:bg-white focus:ring-4 focus:ring-[#f04b0b]/10 dark:border-stone-800 dark:bg-[#181822] dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-[#1e1e2b]"
                    />
                  </div>
                </div>

                {/* Selected Event Readonly Pill */}
                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-3 text-xs dark:border-stone-800 dark:bg-[#181822]">
                  <span className="text-[10px] font-bold uppercase text-stone-400 dark:text-stone-500">Registering For:</span>
                  <p className="font-bold text-stone-800 dark:text-stone-200 truncate mt-0.5">{event.title}</p>
                </div>

                {/* Error Banner */}
                {error && (
                  <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                    ⚠️ {error}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f04b0b] to-[#e8490b] text-xs font-bold text-white shadow-[0_8px_20px_rgba(240,75,11,0.22)] transition hover:shadow-[0_12px_28px_rgba(240,75,11,0.32)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Confirm Free RSVP</span>
                  <span>→</span>
                </button>

                <p className="text-center text-[11px] text-stone-400 dark:text-stone-500 leading-normal">
                  Zero spam. We only use your information for this event's reminders.
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
