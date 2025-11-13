"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { courseApi } from "@/features/courses/api";
import { Button } from "@/components/ui/button";
import ChapterEditor from "@/components/form/ChapterEditor";

export default function UpdateCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load course data
  useEffect(() => {
    if (!id) return;
    console.log("Loading course with ID:", user);
    const loadCourse = async () => {
      try {
        const data = await courseApi.getById(id);
        setCourse(data);
      } catch (err) {
        console.error("❌ Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center animate-pulse">Chargement...</div>;

  if (!course)
    return (
      <div className="p-10 text-center text-red-600">Cours introuvable</div>
    );

  // ✅ Ensure only instructor can edit
  if (course.Instructeur !== fullName)
    return (
      <div className="p-10 text-center text-red-600">
        Vous n’êtes pas l’instructeur de ce cours.
      </div>
    );

  // ✅ Update field helper
  const updateField = (key, value) => {
    setCourse({ ...course, [key]: value });
  };

  // ✅ Update course API call
  const updateCourse = async () => {
    try {
      await courseApi.update(id, course);
      alert("✅ Cours mis à jour !");
      navigate(`/courses/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  // ✅ Add / remove chapter
  const addChapter = () => {
    updateField("chapters", [
      ...course.chapters,
      { title: "", videoUrl: "", content: "", quiz: [] },
    ]);
  };

  const updateChapter = (index, updated) => {
    const chapters = [...course.chapters];
    chapters[index] = updated;
    updateField("chapters", chapters);
  };

  const removeChapter = (index) => {
    const chapters = course.chapters.filter((_, i) => i !== index);
    updateField("chapters", chapters);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Modifier le cours</h1>

      {/* Top buttons */}
      <div className="flex gap-4">
        <Button onClick={() => navigate(`/courses/${id}`)} variant="outline">
          👁 Voir comme apprenant
        </Button>

        <Button onClick={updateCourse} className="ml-auto">
          ✅ Sauvegarder les modifications
        </Button>
      </div>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Titre du cours</label>
        <input
          className="w-full border p-2 rounded"
          value={course.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={course.description}
          onChange={(e) => updateField("description", e.target.value)}
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

      <Button onClick={updateCourse} className="w-full py-3 text-lg">
        ✅ Mettre à jour le cours
      </Button>
    </div>
  );
}
