import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ChapterEditor from "./ChapterEditor";
import { courseApi } from "@/features/courses/api";
import { useSelector } from "react-redux";

export default function CreateCourseForm() {
  const { user } = useSelector((state) => state.auth);
  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";

  const [course, setCourse] = useState({
    title: "",
    description: "",
    level: "Beginner",
    thumbnail: "",
    Instructeur: fullName, // ✅ auto-fill
    chapters: [],
  });

  const addChapter = () => {
    setCourse({
      ...course,
      chapters: [
        ...course.chapters,
        { title: "", videoUrl: "", content: "", quiz: [] },
      ],
    });
  };

  const updateChapter = (index, updated) => {
    const newChapters = [...course.chapters];
    newChapters[index] = updated;

    setCourse({ ...course, chapters: newChapters });
  };

  const removeChapter = (index) => {
    const newChapters = course.chapters.filter((_, i) => i !== index);
    setCourse({ ...course, chapters: newChapters });
  };

  const submitCourse = async () => {
    try {
      console.log("✅ Course data sent:", course);

      const created = await courseApi.create(course);

      console.log("✅ API response:", created);

      alert("✅ Formation créée avec succès !");
    } catch (err) {
      console.error("❌ Erreur lors de la création du cours:", err);
      alert("❌ Erreur, veuillez réessayer");
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Title */}
      <div>
        <label className="block font-medium mb-1">Titre du cours</label>
        <input
          className="w-full border p-2 rounded"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          placeholder="Ex : Formation IA pour débutants"
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Chapitres</h3>

          <Button onClick={addChapter}>+ Ajouter un chapitre</Button>
        </div>

        {course.chapters.map((chapter, index) => (
          <ChapterEditor
            key={index}
            chapter={chapter}
            index={index}
            updateChapter={updateChapter}
            removeChapter={removeChapter}
          />
        ))}
      </div>

      {/* Submit */}
      <Button onClick={submitCourse} className="w-full mt-6">
        ✅ Créer la formation
      </Button>
    </div>
  );
}
