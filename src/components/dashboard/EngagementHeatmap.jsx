import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * Simple heatmap grid (static intensities).
 * intensity values: 0..4 mapped to rgba accent
 */
export default function EngagementHeatmap() {
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  // static mock intensities (day x hour) — here we create deterministic pattern
  const getValue = (dayIndex, hour) => {
    // higher evenings (18-22) on weekdays
    const isEvening = hour >= 18 && hour <= 22;
    if (dayIndex < 5 && isEvening) return 4;
    if (dayIndex < 5 && hour >= 9 && hour <= 12) return 2;
    if (dayIndex >= 5 && hour >= 10 && hour <= 14) return 2;
    return Math.floor((Math.sin((dayIndex + hour) / 4) + 1) * 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Heatmap (jour × heure)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `120px repeat(${hours.length}, 28px)`,
              gap: 6,
            }}
          >
            <div />
            {hours.map((h) => (
              <div
                key={h}
                className="text-xs text-muted-foreground text-center"
              >
                {h}:00
              </div>
            ))}

            {days.map((day, dIdx) => (
              <React.Fragment key={day}>
                <div className="text-sm font-medium p-1">{day}</div>
                {hours.map((h) => {
                  const v = getValue(dIdx, h);
                  const alpha = Math.max(0.06, v / 5);
                  return (
                    <div key={h} className="p-1">
                      <div
                        title={`${v * 25}%`}
                        className="w-6 h-4 rounded-sm"
                        style={{ background: `rgba(109,74,255,${alpha})` }}
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
