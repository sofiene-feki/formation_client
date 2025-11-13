import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecentActivity() {
  const events = [
    { text: "Leila a terminé le chapitre 'Patterns'", time: "2025-11-10" },
    { text: "Karim a passé un quiz (réussi)", time: "2025-11-10" },
    { text: "Sara s'est inscrite au cours 'Node.js'", time: "2025-11-09" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dernières activités</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm">
          {events.map((e, i) => (
            <li key={i} className="flex justify-between">
              <span>{e.text}</span>
              <span className="text-muted-foreground text-xs">{e.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
