import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

import SidebarLayout from "../layout/Sidebar";
import CourseInfo from "./course/CourseInfo";
import CourseMedia from "./course/CourseMedia";
import CourseContent from "./course/CourseContent";
import CoursePricing from "./course/CoursePricing";
import CourseSEO from "./course/CourseSEO";
import CoursePublish from "./course/CoursePublish";

export default function CreateCourseForm({
  course,
  setCourse,
  section,
  setSection,
  onSubmit,
}) {
  const updateField = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (field, newValue) => {
    setCourse((prev) => ({ ...prev, [field]: newValue }));
  };

  const sidebarItems = [
    { key: "info", label: "General Info" },
    { key: "media", label: "Media Uploads" },
    { key: "content", label: "Content Builder" },
    { key: "pricing", label: "Pricing" },
    { key: "seo", label: "SEO & Meta" },
    { key: "publish", label: "Publish Settings" },
  ];

  // useEffect(() => {
  //   console.log("Content items updated:", course);
  // }, [course]);

  return (
    <div className="max-w-7xl mx-auto">
      <SidebarLayout
        sidebarItems={sidebarItems}
        active={section}
        onChange={setSection}
      >
        {section === "info" && (
          <CourseInfo course={course} updateField={updateField} />
        )}

        {section === "media" && (
          <CourseMedia course={course} updateField={updateField} />
        )}

        {section === "content" && (
          <CourseContent
            course={course}
            setCourse={setCourse}
            updateNested={updateNested}
          />
        )}

        {section === "pricing" && (
          <CoursePricing course={course} updateField={updateField} />
        )}

        {section === "seo" && (
          <CourseSEO course={course} updateField={updateField} />
        )}

        {section === "publish" && (
          <CoursePublish course={course} updateField={updateField} />
        )}
      </SidebarLayout>

      <Button className="w-full mt-8" onClick={onSubmit}>
        💾 Save
      </Button>
    </div>
  );
}
