import React from "react";
import CreateCourseForm from "@/components/form/CreateCourseForm";

export default function CreateCoursePage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Créer une nouvelle formation</h1>
      <CreateCourseForm />
    </div>
  );
}
