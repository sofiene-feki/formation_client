import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueCharts() {
  const monthly = [
    { month: "Jun", revenue: 4200 },
    { month: "Jul", revenue: 4800 },
    { month: "Aug", revenue: 6200 },
    { month: "Sep", revenue: 7000 },
    { month: "Oct", revenue: 9200 },
    { month: "Nov", revenue: 10420 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenus (6 derniers mois)</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6D4AFF"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
