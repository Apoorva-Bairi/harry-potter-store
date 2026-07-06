import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
  userOnly = false,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only routes
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User-only routes
  if (userOnly && user.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}