import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { fetchCurrentUser, logoutUser } from "./slice";
import { useNavigate } from "react-router-dom";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // 🔹 Surveille les changements Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", token);
        dispatch(fetchCurrentUser());
      } else {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // 🔹 Redirige selon le rôle dès qu’il est chargé

  return children;
}
