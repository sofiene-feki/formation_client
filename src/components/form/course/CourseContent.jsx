import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ContentSection from "../ContentSection";

export default function CourseContent({ course, setCourse }) {
  //   useEffect(() => {
  //     console.log("Content items updated:", course);
  //   }, [course]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Builder</CardTitle>
        <CardDescription>
          Create chapters and lessons for your course.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ContentSection course={course} setCourse={setCourse} />
      </CardContent>
    </Card>
  );
}
