import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();

  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
}
