// src/app/providers.jsx
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import AuthInitializer from "@/features/auth/useAuthRedirect";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer>{children}</AuthInitializer>
      </BrowserRouter>
    </Provider>
  );
}
