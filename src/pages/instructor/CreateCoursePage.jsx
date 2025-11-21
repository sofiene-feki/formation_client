import React, { useState } from "react";
import CreateCourseForm from "@/components/form/CreateCourseForm";
import { courseApi } from "@/features/courses/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    language: "",
    difficulty: "Easy",
    prerequisites: "",
    price: 0,
    promoVideo: "",
    thumbnail: "",
    contentItems: [],
  });

  const [section, setSection] = useState(searchParams.get("section") || "info");

  // FIXED 🚀
  const handleSectionChange = (sectionKey) => {
    setSection(sectionKey);
    navigate(`?section=${sectionKey}`);
  };

  const submit = async () => {
    try {
      await courseApi.create(course);
      alert("✔ Course created!");
      navigate("/dashboard/courses");
    } catch (error) {
      console.error(error);
      alert("❌ Error creating course");
    }
  };

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-10 px-4 bg-gray-50 ">
        <h1 className="text-3xl font-bold mb-6">
          Créer une nouvelle formation
        </h1>

        <CreateCourseForm
          course={course}
          setCourse={setCourse}
          section={section}
          setSection={handleSectionChange} // FIXED
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
