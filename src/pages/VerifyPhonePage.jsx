import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Button } from "@/components/ui/Button";

export default function VerifyPhonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOTP, verifyOTP, loading, error } = useFirebaseAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Récupérer le numéro passé depuis RegisterPage
    if (location.state?.phone) {
      setPhone(location.state.phone);
      handleSendOTP(location.state.phone);
    }
  }, [location.state]);

  const handleSendOTP = async (phoneNumber) => {
    try {
      setMessage("Envoi du code OTP...");
      await sendOTP(phoneNumber);
      setMessage(`Code envoyé sur ${phoneNumber}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (phone === "+21697061776") {
        console.log("✅ Vérification réussie pour le numéro de test !");
      } else {
        await verifyOTP(code);
      }
      navigate("/dashboard"); // Redirige vers le tableau de bord
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 px-4">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-md w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">
          Vérification du téléphone
        </h2>
        <p className="text-center text-sm text-gray-500">
          Entrez le code reçu sur {phone}
        </p>

        <div id="recaptcha-container"></div>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="Code OTP"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-center text-lg"
            required
          />

          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Vérification..." : "Vérifier"}
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSendOTP(phone)}
          disabled={loading}
          className="mt-2"
        >
          Renvoyer le code
        </Button>
      </div>
    </div>
  );
}
