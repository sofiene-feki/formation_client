import axios from "@/lib/axios";

export const userApi = {
  // 🔹 Récupérer tous les utilisateurs (admin)
  getAll: async () => {
    const { data } = await axios.get("/api/users");
    return data;
  },

  // 🔹 Récupérer utilisateur par email
  getByEmail: async (email) => {
    const { data } = await axios.get(`/api/users/find?email=${email}`);
    return data;
  },

  // 🔹 Créer un utilisateur Mongo
  create: async (userData) => {
    const { data } = await axios.post("/api/users", userData);
    return data;
  },

  // 🔹 Mettre à jour son profil
  update: async (updates) => {
    const { data } = await axios.put(`/api/users/me`, updates);
    return data;
  },
};
