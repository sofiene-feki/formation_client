import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  return {
    isAuthenticated: !!auth.token,
    user: auth.user,
    role: auth.user?.role,
  };
}
