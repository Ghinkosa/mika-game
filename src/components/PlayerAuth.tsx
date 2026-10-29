import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  User,
} from "lucide-react";

import type { Account, SystemState } from "../types";
import { loginUser } from "../services/auth";
import SiteHeader from "./SiteHeader";

interface PlayerAuthProps {
  state: SystemState;
  onLoginSuccess: (account: Account) => void;
  onStateUpdate: (newState: SystemState) => void;
  onBack: () => void;
}

export default function PlayerAuth({
  onLoginSuccess,
  onBack,
}: PlayerAuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanUsername = username.trim().toLowerCase();

    if (!cleanUsername || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(cleanUsername, password);

      if (!result?.account) {
        setError(result?.error || "Invalid username or password.");
        return;
      }

      const user = result.account;

      if (user.role !== "PLAYER") {
        setError("This portal is for player accounts only.");
        return;
      }

      if (!user.id) {
        setError("Your account is missing a valid account ID.");
        return;
      }

      // The parent handles authentication and navigation.
      onLoginSuccess(user);
    } catch (err) {
      console.error("Player login failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Shared landing page header */}
      <SiteHeader />

      {/* Login content */}
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition hover:text-[#38b6ff]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>

          <div className="rounded-3xl border border-white/10 bg-[#111b2b] p-7 shadow-2xl sm:p-9">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#38b6ff]/10">
                <User size={28} className="text-[#38b6ff]" />
              </div>

              <h1 className="text-3xl font-extrabold">
                Player Login
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to access your Mika Games account.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="player-username"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Username
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d17] px-4 transition focus-within:border-[#38b6ff]">
                  <User size={18} className="shrink-0 text-slate-500" />

                  <input
                    id="player-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-600"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="player-password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d17] px-4 transition focus-within:border-[#38b6ff]">
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-slate-500"
                  />

                  <input
                    id="player-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-600"
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="cursor-pointer text-slate-500 transition hover:text-white"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-[#38b6ff] px-5 py-3.5 font-bold text-[#06101b] transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Player access is available to authorized player accounts.
            </p>

            <p className="mt-4 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/player/register";
                }}
                className="cursor-pointer font-semibold text-[#38b6ff] hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}