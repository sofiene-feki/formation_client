import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "../components/form/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect after login
  useEffect(() => {
    if (user && token) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "instructor") navigate("/instructor/courses");
      else navigate("/student/dashboard");
    }
  }, [user, token, navigate]);

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
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <Button className="w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </LoginForm>
  );
}
