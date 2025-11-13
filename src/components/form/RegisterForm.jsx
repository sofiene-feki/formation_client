import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    phone: "",
    job: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(formData);
    if (!success) return;

    // If you want to test OTP behavior:
    if (formData.phone === "+21697061776") {
      navigate("/verify-phone", {
        state: { phone: formData.phone, otp: "123456" },
      });
    } else {
      navigate("/verify-phone", { state: { phone: formData.phone } });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-md"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Créez votre compte
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom complet */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ex : Sofiane Ben..."
            value={formData.name}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Téléphone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+216 22 000 000"
            value={formData.phone}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Sexe */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="gender"
            className="text-sm font-medium text-slate-700"
          >
            Sexe
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Sélectionnez...</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>

        {/* Date de naissance */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="birthDate"
            className="text-sm font-medium text-slate-700"
          >
            Date de naissance
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            required
            value={formData.birthDate}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Métier */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="job" className="text-sm font-medium text-slate-700">
            Métier / Profession
          </label>
          <input
            type="text"
            id="job"
            name="job"
            placeholder="Ex : Enseignant, Comptable, Entrepreneur..."
            value={formData.job}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full mt-4 font-semibold"
      >
        {loading ? "Création du compte..." : "S'inscrire"}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Déjà membre ?{" "}
        <Link
          to="/login"
          className="text-primary font-medium hover:underline underline-offset-4"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}
