import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import LoginForm from "../components/form/LoginForm";
import { auth } from "@/lib/firebase";
import { fetchCurrentUser } from "@/features/auth/slice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 Étape 1 : Connexion Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 🔹 Étape 2 : Récupérer le token
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      // 🔹 Étape 3 : Charger le user Mongo via Redux
      const resultAction = await dispatch(fetchCurrentUser());

      if (fetchCurrentUser.fulfilled.match(resultAction)) {
        const user = resultAction.payload;
        console.log("✅ User Mongo chargé:", user);

        // 🔹 Étape 4 : Redirection selon le rôle
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "instructor":
            navigate("/instructor/dashboard");
            break;
          case "student":
          default:
            navigate("/dashboard");
            break;
        }
      } else {
        setError("Erreur lors du chargement de votre profil");
      }
    } catch (err) {
      console.error("❌ Erreur complète de connexion:", err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm title="Connexion" subtitle="Reprenez vos cours facilement">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.password}
        />

        <Button className="w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </LoginForm>
  );
}
