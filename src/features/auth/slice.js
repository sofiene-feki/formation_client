// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "./api";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // 👇 Ici tu peux décoder le token si besoin, mais on récupère depuis backend
      const email = JSON.parse(atob(token.split(".")[1])).email;
      const user = await userApi.getByEmail(email);

      console.log("✅ User fetched from Mongo:", user);
      return user;
    } catch (err) {
      console.error("❌ fetchCurrentUser error:", err);
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // 👈 user contient `role`
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
