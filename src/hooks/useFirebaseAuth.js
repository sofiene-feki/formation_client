import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useFirebaseAuth() {
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const registerUser = async ({ email, password, firstName, lastName }) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      return userCredential.user;
    } catch (err) {
      console.error("Erreur register:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Connexion Firebase
  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auth avec téléphone
  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    setError(null);
    try {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      setConfirmationResult(confirmation);
      return confirmation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (code) => {
    if (!confirmationResult) throw new Error("Aucune demande d’OTP en cours");
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(code);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return { user, registerUser, loginUser, sendOTP, verifyOTP, loading, error };
}
