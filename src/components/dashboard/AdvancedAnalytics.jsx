import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdvancedAnalytics() {
  // static summary metrics
  const metrics = {
    completion30d: "63%",
    avgSession: "45m",
    retention7d: "72%",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics avancée</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Taux de complétion (30j)
            </div>
            <div className="font-semibold text-lg">{metrics.completion30d}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Engagement moyen
            </div>
            <div className="font-semibold text-lg">{metrics.avgSession}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Rétention 7j</div>
            <div className="font-semibold text-lg">{metrics.retention7d}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
