import React from "react";
import { MotionCard } from "./MotionCard";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StudentInsightsCard({ student, onBack }) {
  return (
    <MotionCard>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Profil étudiant : {student.name}</CardTitle>
        <button onClick={onBack} className="text-sm underline">
          Retour
        </button>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div>Email : {student.email || "non renseigné"}</div>
        <div>Progression : {student.progress}</div>
        <div>Temps total : {student.time}</div>
        <div>
          Quiz : {student.quizPassed} réussis / {student.quizFailed} échoués
        </div>
        <div>Dernière activité : {student.lastActivity}</div>
      </CardContent>
    </MotionCard>
  );
}
