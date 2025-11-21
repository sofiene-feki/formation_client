import axiosClient from "@/lib/axiosClient";

export const authApi = {
  register: (data) => axiosClient.post("/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  getProfile: () => axiosClient.get("/auth/me"),
  logout: () => axiosClient.post("/auth/logout"),
};
