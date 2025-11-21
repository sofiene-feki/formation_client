import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user) {
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);

  return children;
}
