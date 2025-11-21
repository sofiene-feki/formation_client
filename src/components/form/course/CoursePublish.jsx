// components/course-sections/CoursePublish.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CoursePublish() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Settings</CardTitle>
        <CardDescription>
          Choose visibility options and publish your course.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4" />
          <span className="text-gray-700 text-sm">Make course public</span>
        </div>

        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-700 transition w-fit">
          Publish Course
        </button>
      </CardContent>
    </Card>
  );
}
