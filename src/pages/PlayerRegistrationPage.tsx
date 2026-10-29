
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  User,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import type { Account, SystemState } from "../types";
import { createAccount } from "../services/auth";
import MikaLogo from "../components/MikaLogo";
import SiteHeader from "../components/SiteHeader";

interface PlayerRegistrationPageProps {
  state: SystemState;
  onStateUpdate: (newState: SystemState) => void;
  onLoginSuccess?: (account: Account) => void;
}

export default function PlayerRegistrationPage({
  state,
  onStateUpdate,
}: PlayerRegistrationPageProps) {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [cbeAccount, setCbeAccount] = useState("");
  const [agentId, setAgentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const agents = (state.accounts ?? []).filter(
    (account) => account.role === "AGENT"
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const normalizedName = displayName.trim();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const normalizedCbe = cbeAccount.trim();

    if (
      !normalizedName ||
      !normalizedUsername ||
      !normalizedPhone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Agent selection is optional.
       * If no agent is selected, undefined is passed.
       *
       * The createAccount implementation must support an
       * optional agent ID and handle it correctly on the backend.
       */
      const result = await createAccount(
        normalizedUsername,
        normalizedName,
        "PLAYER",
        0,
        agentId || undefined,
        0,
        normalizedPhone,
        normalizedCbe || undefined,
        password
      );

      if (!result) {
        setError("Registration failed. Please try again.");
        return;
      }

      /*
       * Preserve the existing registration response handling:
       * update the application state when the result includes it.
       */
      if (result.state) {
        onStateUpdate(result.state);
      }

      if (result.success === false) {
        setError(
          result.error ||
            result.message ||
            "Registration failed. Please try again."
        );
        return;
      }

      setSuccess("Your account has been created successfully!");

      window.setTimeout(() => {
        navigate("/player/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0c1220] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20";

  const labelClass = "mb-2 block text-sm font-medium text-gray-300";

  return (
    <div className="min-h-screen bg-[#080b12] px-4 py-8 text-white">
         <SiteHeader />
      <div className="mx-auto w-full max-w-lg">
        <button
          type="button"
          onClick={() => navigate("/", { replace: true })}
          className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="mb-8 flex justify-center">
          <MikaLogo />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101622] p-6 shadow-2xl sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#38b6ff]/10 text-[#38b6ff]">
              <UserPlus size={28} />
            </div>

            <h1 className="text-2xl font-bold">Create Player Account</h1>

            <p className="mt-2 text-sm text-gray-400">
              Join Mika Games and start playing.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-5 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="displayName" className={labelClass}>
                Full Name <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  autoComplete="name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Enter your full name"
                  className={`${inputClass} pl-10`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className={labelClass}>
                Username <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Choose a username"
                  className={`${inputClass} pl-10`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className={`${inputClass} pl-10`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cbeAccount" className={labelClass}>
                CBE Account{" "}
                <span className="text-gray-500">(Optional)</span>
              </label>

              <div className="relative">
                <CreditCard
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="cbeAccount"
                  name="cbeAccount"
                  type="text"
                  value={cbeAccount}
                  onChange={(event) => setCbeAccount(event.target.value)}
                  placeholder="Enter your CBE account number"
                  className={`${inputClass} pl-10`}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="agentId" className={labelClass}>
                Agent{" "}
                <span className="text-gray-500">(Optional)</span>
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <select
                  id="agentId"
                  name="agentId"
                  value={agentId}
                  onChange={(event) => setAgentId(event.target.value)}
                  className={`${inputClass} cursor-pointer appearance-none pl-10`}
                  disabled={loading}
                >
                  <option value="">Register without an agent</option>

                  {agents.map((agent) => (
                    <option key={agent.id} value={String(agent.id)}>
                      {agent.displayName || agent.username}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                You can register without selecting an agent.
              </p>
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className={`${inputClass} pl-10 pr-12`}
                  minLength={6}
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm your password"
                  className={`${inputClass} pl-10 pr-12`}
                  minLength={6}
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  disabled={loading}
                >
                  {showConfirmPassword ? (
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
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#38b6ff] px-4 py-3.5 font-bold text-[#080b12] transition hover:bg-[#60c5ff] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#080b12]/30 border-t-[#080b12]" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={19} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/player/login"
              className="font-semibold text-[#38b6ff] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          By registering, you agree to the Mika Games terms and conditions.
        </p>
      </div>
    </div>
  );
}