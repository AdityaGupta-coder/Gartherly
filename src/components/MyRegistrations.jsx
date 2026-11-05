import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  cancelRegistration,
  getUserRegistrations,
} from "../lib/registrations.js";

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

export default function MyRegistrations() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [registrations, setRegistrations] = useState(() =>
    getUserRegistrations(user.id),
  );
  const [pendingCancel, setPendingCancel] = useState(null);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState({});

  function handleCancel(registration) {
    setError("");
    try {
      cancelRegistration(registration.id, user.id);
      setRegistrations((current) =>
        current.filter((item) => item.id !== registration.id),
      );
      setPendingCancel(null);
    } catch (cancelError) {
      setError(
        cancelError instanceof Error
          ? cancelError.message
          : "Unable to cancel this registration.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafb] text-stone-900 px-5 py-8 sm:px-8 sm:py-12 transition-colors duration-300 dark:bg-[#08080a] dark:text-stone-100">
      <div className="mx-auto max-w-5xl">
        {/* Top Back Navigation & Theme Toggle */}
        <div className="flex items-center justify-between pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-xs hover:border-orange-300 hover:text-[#f04b0b] transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
          >
            ← Back to Explore Events
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-stone-400 font-medium dark:text-stone-500">Gatherly Ticket Pass Vault</span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-[#f04b0b] hover:text-[#f04b0b] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Account Header Card */}
        <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-9 dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-[#f04b0b] to-[#ff7b47] text-xl font-extrabold text-white shadow-md shadow-[#f04b0b]/20">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#f04b0b]">
                  Account Dashboard
                </p>
                <h1 className="font-machina text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-white">
                  My Registrations & Tickets
                </h1>
                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                  Signed in as <strong className="text-stone-800 dark:text-stone-200">{user.name}</strong> ({user.email})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-50 border border-orange-200/80 px-4 py-2 text-center dark:bg-orange-950/30 dark:border-orange-500/30">
                <span className="text-xl font-extrabold text-[#f04b0b] dark:text-[#ff7b47]">{registrations.length}</span>
                <span className="block text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">Reserved Tickets</span>
              </div>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
              ⚠️ {error}
            </p>
          )}

          {/* Registrations List */}
          {registrations.length === 0 ? (
            /* Empty State */
            <div className="mt-8 rounded-3xl border border-dashed border-stone-200 bg-stone-50/70 p-10 text-center sm:p-14 dark:border-stone-800 dark:bg-stone-900/40">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange-100 text-3xl dark:bg-orange-950/50">
                🎟️
              </div>
              <h2 className="mt-4 font-machina text-lg font-bold text-stone-800 dark:text-stone-100">
                No active ticket registrations yet
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                You haven't reserved any event tickets yet. Explore over 30+ curated concerts, workshops, and community suppers.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                  to="/"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#f04b0b] to-[#e8490b] px-6 text-xs font-bold text-white shadow-md hover:bg-[#dc4006] transition"
                >
                  Explore All Events →
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {registrations.map((registration) => (
                <article
                  key={registration.id}
                  className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(240,75,11,0.1)] hover:border-orange-200 dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] dark:hover:border-orange-500/40"
                >
                  {/* Top Image & Event summary */}
                  <div className="flex items-start gap-4 p-5">
                    {!failedImages[registration.id] ? (
                      <img
                        src={registration.eventImage}
                        alt={registration.eventTitle}
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [registration.id]: true }))
                        }
                        className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-sm dark:brightness-90"
                      />
                    ) : (
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-2xl dark:bg-orange-950/40 dark:border-orange-500/30">
                        🎟️
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500/30 dark:text-emerald-400">
                          Confirmed RSVP
                        </span>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">
                          #GATH-{registration.id}
                        </span>
                      </div>
                      <h2 className="mt-1.5 font-machina text-base font-bold leading-snug text-stone-900 truncate dark:text-white">
                        {registration.eventTitle}
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-[#f04b0b] dark:text-[#ff7b47]">
                        📅 {registration.eventDate} · {registration.eventTime}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400 truncate">
                        📍 {registration.eventVenue}
                      </p>
                    </div>
                  </div>

                  {/* Perforated ticket tear line */}
                  <div className="relative flex items-center gap-2 px-1">
                    <div className="-ml-3 h-5 w-5 rounded-full bg-[#fafafb] dark:bg-[#08080a] border-r border-stone-200 dark:border-stone-800" />
                    <div className="h-[1px] flex-1 border-t-2 border-dashed border-stone-200 dark:border-stone-800" />
                    <div className="-mr-3 h-5 w-5 rounded-full bg-[#fafafb] dark:bg-[#08080a] border-l border-stone-200 dark:border-stone-800" />
                  </div>

                  {/* Pass Footer & Cancellation */}
                  <div className="bg-stone-50/70 dark:bg-[#16161f] px-5 py-3.5 border-t border-stone-100 dark:border-stone-800">
                    {pendingCancel === registration.id ? (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          Release your spot for this event?
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleCancel(registration)}
                            className="rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition"
                          >
                            Yes, Cancel RSVP
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingCancel(null)}
                            className="rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                          >
                            Keep Ticket
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-stone-400 dark:text-stone-500">
                          Registered under: <strong className="text-stone-700 dark:text-stone-300">{registration.name}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setPendingCancel(registration.id)}
                          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline transition"
                        >
                          Cancel RSVP
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

