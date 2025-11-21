import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { userApi } from "@/features/auth/api";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (data) => {
    setLoading(true);
    setError(null);

    // Split full name into first and last
    const [firstName, ...rest] = data.name.split(" ");
    const lastName = rest.join(" ");

    try {
      // Call backend to create Firebase + MongoDB user
      // const res = await userApi.create({
      //   firstName,
      //   lastName,
      //   email: data.email,
      //   password: data.password,
      //   phone: data.phone,
      //   gender: data.gender,
      //   birthDate: data.birthDate,
      //   job: data.job,
      //   role: "user",
      // });
      // // ✅ Successfully created → redirect to phone verification
      // navigate("/verify-phone", { state: { phone: data.phone } });
      // return res.data;
    } catch (err) {
      console.error("❌ Register error:", err);
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
