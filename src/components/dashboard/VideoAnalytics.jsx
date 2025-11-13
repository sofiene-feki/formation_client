import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VideoAnalytics() {
  const videos = [
    {
      title: "Intro & Setup",
      avgWatched: "78%",
      dropOff: "12%",
      rewatch: ["00:45-01:10"],
    },
    {
      title: "Patterns",
      avgWatched: "62%",
      dropOff: "28%",
      rewatch: ["07:20-07:45", "12:10-12:40"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Vidéos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {videos.map((v) => (
            <div key={v.title} className="border rounded p-3">
              <div className="font-medium">{v.title}</div>
              <div className="text-xs text-muted-foreground">
                Avg watched: {v.avgWatched} • Drop-off: {v.dropOff}
              </div>
              <div className="text-xs mt-2">
                Rewatch sections: {v.rewatch.join(", ") || "—"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
