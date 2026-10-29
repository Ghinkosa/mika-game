
import type { ReactNode } from "react";
import { LogOut, User, Wallet } from "lucide-react";
import type { Account } from "../../types";
import MikaLogo from "../MikaLogo";

interface AppLayoutProps {
  account: Account;
  onLogout: () => void;
  children: ReactNode;
}

export default function AppLayout({
  account,
  onLogout,
  children,
}: AppLayoutProps) {
  const balance = Number(account.balance ?? 0);

  return (
    <div className="min-h-screen bg-[#080d17] text-white">
      {/* Shared application header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111b2b]/95 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center">
            <MikaLogo />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
            {/* Account information */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38b6ff]/10">
                <User size={20} className="text-[#38b6ff]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {account.displayName || account.username}
                </p>

                <p className="text-xs text-slate-400">
                  {account.role.replace("_", " ")}
                </p>
              </div>
            </div>

            {/* Account balance */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Wallet size={18} className="text-[#38b6ff]" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Balance
                </p>

                <p className="text-sm font-bold">
                  {balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="min-w-0">
        {children}
      </main>
    </div>
  );
}
