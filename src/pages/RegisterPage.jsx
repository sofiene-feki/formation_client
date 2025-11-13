import React from "react";
import RegisterForm from "../components/form/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 px-4">
      <RegisterForm />
    </div>
  );
}
