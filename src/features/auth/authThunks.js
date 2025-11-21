import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const res = await authApi.register(formData);
    return res.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const res = await authApi.login(formData);
  return res.data;
});

export const fetchCurrentUser = createAsyncThunk("auth/me", async () => {
  const res = await authApi.getProfile();
  return res.data;
});
