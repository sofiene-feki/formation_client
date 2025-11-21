// components/course-sections/CourseInfo.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CourseInfo({ course, updateField }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Basic details that define your course identity.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* --- Course Title --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            placeholder="e.g. Advanced React Development"
            value={course.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        {/* --- Short Description --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            rows={3}
            placeholder="Brief summary of your course..."
            value={course.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        {/* --- Language Selector --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-white"
            value={course.language}
            onChange={(e) => updateField("language", e.target.value)}
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Arabic">Arabic</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        {/* --- Category Selector --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-white"
            value={course.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="AI">Artificial Intelligence</option>
          </select>
        </div>

        {/* --- Level Selector --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-white"
            value={course.level}
            onChange={(e) => updateField("level", e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
