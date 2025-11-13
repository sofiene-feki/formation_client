import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles = [] }) {
  // ✅ Access auth slice
  const { user, status } = useSelector((state) => state.auth);

  // ⏳ Wait until user is loaded
  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Unauthorized
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
}
