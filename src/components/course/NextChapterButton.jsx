import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NextChapterButton({ onClick, disabled, isLastStep }) {
  return (
    <Button
      variant="default"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="mt-6 flex items-center gap-2"
    >
      {isLastStep ? "Obtenir mon certificat" : "Chapitre suivant"}
      <ArrowRight className="size-4" />
    </Button>
  );
}
