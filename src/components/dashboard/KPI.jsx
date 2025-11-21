import React from "react";
import { MotionCard } from "./MotionCard";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function KPI({ kpi, loading, onClickCourse }) {
  const stats = [
    { label: "Total cours", value: kpi?.totalCourses },
    { label: "Total étudiants", value: kpi?.totalStudents },
    { label: "Total revenus", value: `€${kpi?.totalRevenue}` },
    { label: "Progression moyenne", value: `${kpi?.averageProgress}%` },
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
