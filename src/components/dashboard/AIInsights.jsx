import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AIInsights() {
  const insights = [
    "Votre cours perd 32% des étudiants au chapitre 3. Ajouter un quiz ou raccourcir la vidéo améliore généralement la rétention de +17%.",
    "Les étudiants avec un faible engagement ont tendance à abandonner après 4 jours d'inactivité.",
    "Activité maximale: 19h–22h — publier annonces à ce créneau augmente la visibilité.",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insight Engine</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          {insights.map((t, i) => (
            <li key={i} className="text-sm">
              {t}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
