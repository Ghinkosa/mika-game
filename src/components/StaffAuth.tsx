import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Account } from "../types";
import { loginUser } from "../utils/db";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  User,
  ShieldAlert,
} from "lucide-react";
import SiteHeader from "./SiteHeader";

interface StaffAuthProps {
  onLoginSuccess: (account: Account) => void;
  onBack: () => void;
}

export default function StaffAuth({
  onLoginSuccess,
  onBack,
}: StaffAuthProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const result = loginUser(cleanUsername, password);

      if (!result.success || !result.account) {
        setError(result.error || "Authentication failed.");
        return;
      }

      if (
        !["ADMIN", "SUPER_AGENT", "AGENT"].includes(
          result.account.role
        )
      ) {
        setError("Player accounts must use the Player Portal.");
        return;
      }

      onLoginSuccess(result.account);
    } catch (err) {
      console.error("Staff login failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Shared Mika Games header */}
      <SiteHeader />

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

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111622] shadow-2xl">
            <div className="border-b border-white/10 bg-gradient-to-b from-slate-950 to-[#38b6ff]/5 p-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#38b6ff]/10">
                <ShieldAlert size={28} className="text-[#38b6ff]" />
              </div>

              <h1 className="text-2xl font-bold">
                Management Portal
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Secure administrator and agent authentication
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-7">
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  <ShieldAlert
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="staff-username"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Username
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="staff-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Enter staff username"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-[#080d17] py-3.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#38b6ff]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="staff-password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="staff-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-[#080d17] py-3.5 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#38b6ff]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transition hover:text-white disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-[#38b6ff] px-4 py-3.5 text-sm font-bold text-[#06101b] transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In to Management"}
              </button>
            </form>

            <div className="border-t border-white/10 px-6 py-4 text-center">
              <p className="text-xs leading-5 text-slate-500">
                Authorized administrators, super agents, and agents only.
              </p>

              <button
                type="button"
                onClick={() => navigate("/player/login")}
                className="mt-3 cursor-pointer text-sm font-medium text-[#38b6ff] transition hover:text-sky-300"
              >
                Player Login
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}