
import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../types";

interface ProtectedRouteProps {
  accountRole?: UserRole;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({
  accountRole,
  allowedRoles,
}: ProtectedRouteProps) {
  if (!accountRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(accountRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
