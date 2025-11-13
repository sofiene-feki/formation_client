import React from "react";
import AppRoutes from "./routes";
import Navbar from "../components/layout/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import "../index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Navbar />
      <main className="">
        <AppRoutes />
      </main>
      <ThemeToggle />
    </div>
  );
}
