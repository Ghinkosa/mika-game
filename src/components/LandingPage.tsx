
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Trophy,
  Users,
  Gamepad2,
  Wallet,
  Headset,
} from "lucide-react";

import MikaLogo from "./MikaLogo";

interface LandingPageProps {
  onPlayerLogin: () => void;
  onPlayerRegister: () => void;
}

export default function LandingPage({
  onPlayerLogin,
  onPlayerRegister,
}: LandingPageProps) {
  const features = [
    {
      icon: Gamepad2,
      title: "Games in One Place",
      description:
        "Explore an organized lobby designed to bring your available games together.",
    },
    {
      icon: Wallet,
      title: "Wallet Management",
      description:
        "Access your player wallet and account information in one convenient place.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description:
        "Access your player account through a dedicated sign-in page.",
    },
    {
      icon: Smartphone,
      title: "Responsive Experience",
      description:
        "Use the platform on desktop, tablet, or mobile devices.",
    },
  ];

  const categories = [
    {
      title: "Slots",
      subtitle: "Discover slot-style games",
      icon: "🎰",
    },
    {
      title: "Live Casino",
      subtitle: "Explore live casino games",
      icon: "♠",
    },
    {
      title: "Table Games",
      subtitle: "Classic table-style games",
      icon: "♦",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#080d17] text-white">
      {/* Public Navigation */}
      <header className="border-b border-white/10 bg-[#080d17]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center">
            <MikaLogo />
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#games"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Games
            </a>

            <a
              href="#features"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPlayerLogin}
              className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Login
            </button>

            <button
              type="button"
              onClick={onPlayerRegister}
              className="rounded-xl bg-[#38b6ff] px-4 py-2.5 text-sm font-bold text-[#06101b] transition hover:bg-sky-300"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,182,255,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(56,182,255,0.08),transparent_40%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38b6ff]/30 bg-[#38b6ff]/10 px-4 py-2 text-sm font-medium text-sky-300">
                <span className="h-2 w-2 rounded-full bg-[#38b6ff]" />
                Welcome to Mika Games
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Your gaming experience,
                <span className="block text-[#38b6ff]">
                  all in one place.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Discover the Mika Games platform, access your player
                account, and explore the games available to you through
                one convenient experience.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={onPlayerLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#38b6ff] px-7 py-4 font-bold text-[#06101b] transition hover:-translate-y-0.5 hover:bg-sky-300"
                >
                  Enter Player Portal
                  <ArrowRight size={19} />
                </button>

                <button
                  type="button"
                  onClick={onPlayerRegister}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/5"
                >
                  Create an Account
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-[#38b6ff]" />
                  Account-based access
                </span>

                <span className="flex items-center gap-2">
                  <Smartphone size={17} className="text-[#38b6ff]" />
                  Mobile-friendly design
                </span>
              </div>
            </div>

            {/* Decorative Game Panel */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#38b6ff]/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111b2b] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">WELCOME TO</p>
                    <h2 className="mt-1 text-2xl font-black">
                      MIKA GAMES
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-[#38b6ff]/10 p-4 text-[#38b6ff]">
                    <Gamepad2 size={34} />
                  </div>
                </div>

                <div className="my-7 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <Trophy size={25} className="text-[#38b6ff]" />
                    <p className="mt-4 font-bold">Your Games</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Explore the lobby
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <Wallet size={25} className="text-[#38b6ff]" />
                    <p className="mt-4 font-bold">Your Account</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Manage your access
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onPlayerRegister}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#38b6ff] px-5 py-4 font-bold text-[#06101b] transition hover:bg-sky-300"
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Games and features depend on availability and your
                  account permissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section id="games" className="border-t border-white/10 bg-[#0b1220]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#38b6ff]">
                  Game Lobby
                </p>

                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  Explore the experience
                </h2>

                <p className="mt-3 max-w-2xl text-slate-400">
                  Explore the game categories available on your platform.
                  Actual games depend on your configured game providers.
                </p>
              </div>

              <button
                type="button"
                onClick={onPlayerLogin}
                className="inline-flex items-center gap-2 self-start font-semibold text-[#38b6ff] transition hover:text-sky-200 sm:self-auto"
              >
                Open player portal
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.title}
                  type="button"
                  onClick={onPlayerLogin}
                  className="group rounded-2xl border border-white/10 bg-[#111b2b] p-6 text-left transition hover:-translate-y-1 hover:border-[#38b6ff]/50 hover:bg-[#142238]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#38b6ff]/10 text-4xl">
                    {category.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {category.subtitle}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#38b6ff]">
                    Sign in to explore
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-[#080d17]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#38b6ff]">
                The Platform
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Built around your experience
              </h2>

              <p className="mt-4 text-slate-400">
                A unified platform for player access and day-to-day
                operations.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="inline-flex rounded-xl bg-[#38b6ff]/10 p-3 text-[#38b6ff]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 font-bold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Call to Action */}
        <section className="px-5 pb-16 sm:px-8 md:pb-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-[#38b6ff]/20 bg-[#111b2b] p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#38b6ff]">
                <Users size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Join Mika Games
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Ready to get started?
              </h2>

              <p className="mt-3 text-slate-400">
                Register for a player account or sign in to continue.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={onPlayerLogin}
                className="rounded-xl border border-white/15 px-6 py-3.5 font-bold transition hover:bg-white/5"
              >
                Login
              </button>

              <button
                type="button"
                onClick={onPlayerRegister}
                className="rounded-xl bg-[#38b6ff] px-6 py-3.5 font-bold text-[#06101b] transition hover:bg-sky-300"
              >
                Register
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mika Games. All rights reserved.

        <div className="mt-2 flex items-center justify-center gap-2">
          <Headset size={15} />
          <span>
            Play responsibly. Availability is subject to applicable rules.
          </span>
        </div>
      </footer>
    </div>
  );
}
