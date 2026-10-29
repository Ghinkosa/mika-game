import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import MikaLogo from "./MikaLogo";

export default function SiteHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080b12]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
          aria-label="Mika Games home"
        >
          <MikaLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-300 transition hover:text-[#38b6ff]"
          >
            Home
          </Link>

          <a
            href="/#games"
            className="text-sm font-medium text-gray-300 transition hover:text-[#38b6ff]"
          >
            Games
          </a>

          <a
            href="/#features"
            className="text-sm font-medium text-gray-300 transition hover:text-[#38b6ff]"
          >
            Features
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => goTo("/player/login")}
            className="cursor-pointer rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#38b6ff] hover:text-[#38b6ff]"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => goTo("/player/register")}
            className="cursor-pointer rounded-lg bg-[#38b6ff] px-5 py-2.5 text-sm font-bold text-[#080b12] transition hover:bg-[#60c5ff]"
          >
            Register
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#080b12] px-4 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm text-gray-300 hover:text-[#38b6ff]"
            >
              Home
            </Link>

            <a
              href="/#games"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm text-gray-300 hover:text-[#38b6ff]"
            >
              Games
            </a>

            <a
              href="/#features"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm text-gray-300 hover:text-[#38b6ff]"
            >
              About Us
            </a>

            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm text-gray-300 hover:text-[#38b6ff]"
            >
              Contact
            </a>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => goTo("/player/login")}
                className="cursor-pointer rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:border-[#38b6ff]"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => goTo("/player/register")}
                className="cursor-pointer rounded-lg bg-[#38b6ff] px-4 py-3 text-sm font-bold text-[#080b12] hover:bg-[#60c5ff]"
              >
                Register
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}