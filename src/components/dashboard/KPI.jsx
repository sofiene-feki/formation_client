import React from "react";
import { MotionCard } from "./MotionCard";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function KPI({ onClickCourse }) {
  const stats = [
    { label: "Total cours", value: 12 },
    { label: "Total étudiants", value: 486 },
    { label: "Total revenus", value: "€14 820" },
    { label: "Progression moyenne", value: "67%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <MotionCard
          key={i}
          className="cursor-pointer"
          onClick={() => onClickCourse && onClickCourse(s)}
        >
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">{s.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-gray-900">
            {s.value}
          </CardContent>
        </MotionCard>
      ))}
    </div>
  );
}
