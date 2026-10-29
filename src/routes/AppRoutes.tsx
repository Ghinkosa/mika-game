
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import type { Account, SystemState, UserRole } from "../types";

import LandingPage from "../pages/LandingPage";
import PlayerLoginPage from "../pages/PlayerLoginPage";
import PlayerRegistrationPage from "../pages/PlayerRegistrationPage";
import StaffLoginPage from "../pages/StaffLoginPage";

import AdminPage from "../pages/AdminPage";
import SuperAgentPage from "../pages/SuperAgentPage";
import AgentPage from "../pages/AgentPage";
import PlayerPage from "../pages/PlayerPage";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

interface Props {
  state: SystemState | null;
  account: Account | null;
  onLogin: (account: Account) => void;
  onLogout: () => void;
  onStateUpdate: (state: SystemState) => void;
}

const destinations: Record<UserRole, string> = {
  ADMIN: "/admin",
  SUPER_AGENT: "/super-agent",
  AGENT: "/agent",
  PLAYER: "/player",
};

export default function AppRoutes({
  state,
  account,
  onLogin,
  onLogout,
  onStateUpdate,
}: Props) {
  const navigate = useNavigate();

  const homeDestination = account
    ? destinations[account.role] ?? "/"
    : "/";

  const handlePlayerLogin = (user: Account) => {
    if (user.role !== "PLAYER") {
      window.alert("Please use a player account.");
      return;
    }

    onLogin(user);
    navigate("/player", { replace: true });
  };

  const handleStaffLogin = (user: Account) => {
    const staffRoles: UserRole[] = [
      "ADMIN",
      "SUPER_AGENT",
      "AGENT",
    ];

    if (!staffRoles.includes(user.role)) {
      window.alert("Please use a staff account.");
      return;
    }

    onLogin(user);
    navigate(destinations[user.role], { replace: true });
  };

  const handleLogout = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  // Wait until application state is loaded.
  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d17] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#38b6ff]" />
          <p className="text-sm text-slate-400">
            Loading Mika Games...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public landing page */}
      <Route
        path="/"
        element={
          account ? (
            <Navigate to={homeDestination} replace />
          ) : (
            <LandingPage
              onPlayerLogin={() => navigate("/player/login")}
              onPlayerRegister={() => navigate("/player/register")}
            />
          )
        }
      />

      {/* Player login */}
      <Route
        path="/player/login"
        element={
          account ? (
            <Navigate to={homeDestination} replace />
          ) : (
            <PlayerLoginPage
              state={state}
              onLoginSuccess={handlePlayerLogin}
              onStateUpdate={onStateUpdate}
            />
          )
        }
      />

      {/* Public player registration */}
      <Route
        path="/player/register"
        element={
          account ? (
            <Navigate to={homeDestination} replace />
          ) : (
            <PlayerRegistrationPage
              state={state}
              onStateUpdate={onStateUpdate}
            />
          )
        }
      />

      {/* Staff login - no public landing-page link */}
      <Route
        path="/management/login"
        element={
          account ? (
            <Navigate to={homeDestination} replace />
          ) : (
            <StaffLoginPage
              onLoginSuccess={handleStaffLogin}
            />
          )
        }
      />

      {/* Admin dashboard */}
      <Route
        element={
          <ProtectedRoute
            accountRole={account?.role}
            allowedRoles={["ADMIN"]}
          />
        }
      >
        <Route
          path="/admin"
          element={
            account?.role === "ADMIN" ? (
              <AppLayout
                account={account}
                onLogout={handleLogout}
              >
                <AdminPage
                  state={state}
                  onStateUpdate={onStateUpdate}
                />
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* Super-agent dashboard */}
      <Route
        element={
          <ProtectedRoute
            accountRole={account?.role}
            allowedRoles={["SUPER_AGENT"]}
          />
        }
      >
        <Route
          path="/super-agent"
          element={
            account?.role === "SUPER_AGENT" ? (
              <AppLayout
                account={account}
                onLogout={handleLogout}
              >
                <SuperAgentPage
                  state={state}
                  superAgentId={account.id}
                  onStateUpdate={onStateUpdate}
                />
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* Agent dashboard */}
      <Route
        element={
          <ProtectedRoute
            accountRole={account?.role}
            allowedRoles={["AGENT"]}
          />
        }
      >
        <Route
          path="/agent"
          element={
            account?.role === "AGENT" ? (
              <AppLayout
                account={account}
                onLogout={handleLogout}
              >
                <AgentPage
                  state={state}
                  agentId={account.id}
                  onStateUpdate={onStateUpdate}
                />
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* Player dashboard */}
      <Route
        element={
          <ProtectedRoute
            accountRole={account?.role}
            allowedRoles={["PLAYER"]}
          />
        }
      >
        <Route
          path="/player"
          element={
            account?.role === "PLAYER" ? (
              <AppLayout
                account={account}
                onLogout={handleLogout}
              >
                <PlayerPage
                  state={state}
                  playerId={account.id}
                  onStateUpdate={onStateUpdate}
                />
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
