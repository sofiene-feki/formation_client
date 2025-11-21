// components/course-sections/CoursePricing.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CoursePricing({ course, updateField }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <CardDescription>
          Set your course price and discount options.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Base Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Base Price (USD)
          </label>
          <input
            type="number"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={course.price || ""}
            onChange={(e) => updateField("price", Number(e.target.value))}
            placeholder="Enter base price"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Price (optional)
          </label>
          <input
            type="number"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={course.discountPrice || ""}
            onChange={(e) =>
              updateField("discountPrice", Number(e.target.value))
            }
            placeholder="Enter discount price"
          />
        </div>
      </CardContent>
    </Card>
  );
}
