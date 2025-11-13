import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CourseHealthScore() {
  const metrics = {
    score: 82,
    issues: [
      "Vidéo 3: durée 27min — drop après 12min",
      "4 chapitres sans quiz (recommandé: 1 quiz/module)",
      "Chapitre 3: drop important",
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Score du cours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm text-muted-foreground">Score actuel</div>
            <div className="text-3xl font-bold">{metrics.score}/100</div>
          </div>
          <div className="text-sm">
            <div className="font-medium">Audit automatique</div>
            <ul className="list-disc ml-5 mt-2 text-sm">
              {metrics.issues.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
