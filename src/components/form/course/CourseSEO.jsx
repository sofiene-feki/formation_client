// components/course-sections/CourseSEO.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CourseSEO() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Meta</CardTitle>
        <CardDescription>
          Optimize your course for search engines and social media.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Title
          </label>
          <input
            type="text"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            rows={3}
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            type="text"
            placeholder="react, frontend, design..."
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
