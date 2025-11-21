import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, roles }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  // ✅ Authorized
  return <Outlet />;
}
