import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

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

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-[18px] w-[18px]">
      <path
        fill="#FFC107"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
      />
      <path
        fill="#FF3D00"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.2v5.3A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#4CAF50"
        d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.2a20 20 0 0 0 0 18l7.4-5.3Z"
      />
      <path
        fill="#1976D2"
        d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.2 15l7.4 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px] fill-current"
    >
      <path d="M16.37 12.18c.02 2.15 1.89 2.87 1.91 2.88-.02.05-.3 1.03-.98 2.04-.59.87-1.2 1.74-2.16 1.76-.95.02-1.26-.57-2.35-.57-1.1 0-1.44.55-2.33.59-.93.04-1.64-.94-2.24-1.81-1.22-1.77-2.15-5-.9-7.19.62-1.09 1.73-1.78 2.93-1.8.91-.02 1.77.62 2.33.62.56 0 1.61-.77 2.71-.66.46.02 1.76.19 2.6 1.43-.07.04-1.55.91-1.53 2.71ZM14.6 6.28c.49-.59.82-1.41.73-2.23-.71.03-1.57.47-2.08 1.06-.46.53-.87 1.36-.76 2.16.79.06 1.62-.4 2.11-.99Z" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return visible ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="m3 3 18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6.1 0 9.5 6 9.5 6a15 15 0 0 1-3.2 3.7M6.2 6.4C3.8 8 2.5 12 2.5 12s3.4 6 9.5 6c1 0 1.9-.2 2.7-.5" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await login({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        remember: formData.get("remember") === "on",
      });
      const returnTo = location.state?.from;
      navigate(returnTo ? `${returnTo.pathname}${returnTo.search ?? ""}` : "/", {
        replace: true,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDemoLogin() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    if (emailInput && passwordInput) {
      emailInput.value = "demo@gatherly.events";
      passwordInput.value = "demo1234";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafb] px-5 py-10 text-stone-900 transition-colors duration-300 dark:bg-[#08080a] dark:text-stone-100">
      <div className="w-full max-w-[440px]">
        {/* Top bar with Back Link and Theme Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-stone-600 shadow-xs border border-stone-200 hover:text-[#f04b0b] hover:border-orange-200 transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
          >
            ← Back to Gatherly Home
          </Link>

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

        {/* Card Container */}
        <section
          className="rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10 dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          aria-labelledby="login-heading"
        >
          {/* Logo & Heading */}
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ff6a32] to-[#e8490b] text-xl font-extrabold text-white shadow-md shadow-[#f04b0b]/20">
              G
            </span>
            <h1
              id="login-heading"
              className="mt-4 font-machina text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white"
            >
              Sign in to Gatherly
            </h1>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Welcome back! Explore and manage your event tickets.
            </p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDemoLogin}
              title="Click to fill demo account"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 text-xs font-semibold text-stone-700 hover:border-stone-300 hover:bg-stone-100 transition dark:border-stone-800 dark:bg-[#181822] dark:text-stone-200 dark:hover:bg-[#20202c]"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              title="Click to fill demo account"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 text-xs font-semibold text-stone-700 hover:border-stone-300 hover:bg-stone-100 transition dark:border-stone-800 dark:bg-[#181822] dark:text-stone-200 dark:hover:bg-[#20202c]"
            >
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">or with email</span>
            <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-stone-700 dark:text-stone-300" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className="h-11 w-full rounded-2xl border border-stone-200 bg-stone-50/70 px-4 text-xs font-medium text-stone-800 outline-none transition hover:border-orange-300 focus:border-[#f04b0b] focus:bg-white focus:ring-4 focus:ring-[#f04b0b]/10 placeholder:text-stone-400 dark:border-stone-800 dark:bg-[#181822] dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-[#1e1e2b]"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-[11px] font-semibold text-[#f04b0b] dark:text-[#ff7b47] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative flex h-11 items-center rounded-2xl border border-stone-200 bg-stone-50/70 transition hover:border-orange-300 focus-within:border-[#f04b0b] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#f04b0b]/10 dark:border-stone-800 dark:bg-[#181822] dark:focus-within:bg-[#1e1e2b]">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="h-full min-w-0 flex-1 rounded-2xl bg-transparent px-4 text-xs font-medium text-stone-800 outline-none placeholder:text-stone-400 dark:text-stone-100 dark:placeholder-stone-500"
                />
                <button
                  type="button"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  aria-pressed={passwordVisible}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  className="mr-2 grid h-8 w-8 place-items-center rounded-xl text-stone-400 hover:text-stone-700 transition dark:hover:text-stone-200"
                >
                  <EyeIcon visible={passwordVisible} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex cursor-pointer items-center gap-2 font-medium text-stone-600 dark:text-stone-400">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded-md border border-stone-300 text-[#f04b0b] focus:ring-[#f04b0b]"
                />
                <span>Remember me</span>
              </label>
            </div>

            {error && (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f04b0b] to-[#e8490b] text-xs font-bold text-white shadow-[0_8px_20px_rgba(240,75,11,0.22)] transition hover:shadow-[0_12px_28px_rgba(240,75,11,0.32)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
            >
              {isSubmitting ? "Signing In..." : "Sign In to Gatherly"}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="font-bold text-[#f04b0b] dark:text-[#ff7b47] hover:underline">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
