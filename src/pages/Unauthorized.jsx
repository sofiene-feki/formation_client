import React from "react";
import { Link } from "react-router-dom";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Ban className="w-20 h-20 text-red-500 mb-4" />

      <h1 className="text-3xl font-bold mb-2">Accès refusé</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Vous n’avez pas les permissions nécessaires pour accéder à cette page.
      </p>

      <div className="flex gap-3">
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>

        <Link to="/login">
          <Button variant="outline">Se connecter</Button>
        </Link>
      </div>
    </div>
  );
}
