import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/slice";
import productsReducer from "../features/products/slice";
import authReducer from "../features/auth/authSlice"; // renamed

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer, // clearer
  },
});

export default store;
