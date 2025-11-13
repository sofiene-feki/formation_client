import React from "react";
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <SearchX className="w-20 h-20 text-gray-500 mb-4" />

      <h1 className="text-4xl font-bold mb-2">404 - Page introuvable</h1>
      <p className="text-gray-600 max-w-md mb-6">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <Link to="/">
        <Button>Retour à l'accueil</Button>
      </Link>
    </div>
  );
}
