import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DropOffGraph() {
  const data = [
    { chapter: "Chapitre 1", retention: 98 },
    { chapter: "Chapitre 2", retention: 75 },
    { chapter: "Chapitre 3", retention: 42 },
    { chapter: "Chapitre 4", retention: 35 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drop-off par chapitre</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="chapter" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="retention" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
