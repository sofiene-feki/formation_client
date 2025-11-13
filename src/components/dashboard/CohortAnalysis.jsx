import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CohortAnalysis() {
  const cohorts = [
    { name: "Juillet", enrolled: 120, retention30: "46%", completion: "22%" },
    { name: "Août", enrolled: 180, retention30: "52%", completion: "28%" },
    { name: "Septembre", enrolled: 210, retention30: "54%", completion: "30%" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th className="pb-2">Cohorte</th>
              <th>Inscrits</th>
              <th>Rétention 30j</th>
              <th>Completion</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((c) => (
              <tr key={c.name} className="border-t">
                <td className="py-2">{c.name}</td>
                <td>{c.enrolled}</td>
                <td>{c.retention30}</td>
                <td>{c.completion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
