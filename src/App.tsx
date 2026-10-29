
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useSystemState } from "./hooks/useSystemState";
import AppRoutes from "./routes/AppRoutes";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

function AppContent() {
  const {
    state,
    loading,
    error,
    updateState,
    loadState,
  } = useSystemState();

  const { account, login, logout } = useAuth(
    state?.accounts ?? []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleStateUpdate = (
    newState: NonNullable<typeof state>
  ) => {
    void updateState(newState).catch((err: unknown) => {
      console.error("Failed to update system state:", err);
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d17] text-white">
        <Loader2 className="mr-3 animate-spin" size={28} />
        <span>Loading Mika Games...</span>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080d17] p-6 text-white">
        <AlertCircle size={36} className="text-red-400" />

        <h1 className="text-xl font-bold">
          Unable to load Mika Games
        </h1>

        <p className="text-center text-slate-400">
          {error || "Unable to connect to the server."}
        </p>

        <button
          type="button"
          onClick={() => void loadState()}
          className="flex items-center gap-2 rounded-xl bg-[#38b6ff] px-5 py-3 font-bold text-[#06101b]"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <AppRoutes
      state={state}
      account={account}
      onLogin={login}
      onLogout={handleLogout}
      onStateUpdate={handleStateUpdate}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
