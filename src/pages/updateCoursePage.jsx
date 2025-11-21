// "use client";

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { courseApi } from "@/features/courses/api";
// import { Button } from "@/components/ui/button";
// import ChapterEditor from "@/components/form/ChapterEditor";

// export default function UpdateCoursePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Load course data
//   useEffect(() => {
//     if (!id) return;
//     console.log("Loading course with ID:", user);
//     const loadCourse = async () => {
//       try {
//         const data = await courseApi.getById(id);
//         setCourse(data.course);
//         console.log("Loaded course data:", data);
//       } catch (err) {
//         console.error("❌ Error loading course:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCourse();
//   }, [id]);

//   if (loading)
//     return <div className="p-10 text-center animate-pulse">Chargement...</div>;

//   if (!course)
//     return (
//       <div className="p-10 text-center text-red-600">Cours introuvable</div>
//     );

//   // ✅ Update field helper
//   const updateField = (key, value) => {
//     setCourse({ ...course, [key]: value });
//   };

//   // ✅ Update course API call
//   const updateCourse = async () => {
//     try {
//       await courseApi.update(id, course);
//       alert("✅ Cours mis à jour !");
//       navigate(`/courses/${id}`);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Erreur lors de la mise à jour");
//     }
//   };

//   // ✅ Add / remove chapter
//   const addChapter = () => {
//     updateField("chapters", [
//       ...course.chapters,
//       { title: "", videoUrl: "", content: "", quiz: [] },
//     ]);
//   };

//   const updateChapter = (index, updated) => {
//     const chapters = [...course.chapters];
//     chapters[index] = updated;
//     updateField("chapters", chapters);
//   };

//   const removeChapter = (index) => {
//     const chapters = course.chapters.filter((_, i) => i !== index);
//     updateField("chapters", chapters);
//   };

//   return (
//     <div className="p-10 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Modifier le cours</h1>

//       {/* Top buttons */}
//       <div className="flex gap-4">
//         <Button onClick={() => navigate(`/courses/${id}`)} variant="outline">
//           👁 Voir comme apprenant
//         </Button>

//         <Button onClick={updateCourse} className="ml-auto">
//           ✅ Sauvegarder les modifications
//         </Button>
//       </div>

//       {/* Title */}
//       <div>
//         <label className="block font-medium mb-1">Titre du cours</label>
//         <input
//           className="w-full border p-2 rounded"
//           value={course.title}
//           onChange={(e) => updateField("title", e.target.value)}
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block font-medium mb-1">Description</label>
//         <textarea
//           className="w-full border p-2 rounded"
//           rows={4}
//           value={course.description}
//           onChange={(e) => updateField("description", e.target.value)}
//         />
//       </div>

//       {/* Chapters */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <h3 className="text-xl font-semibold">Chapitres</h3>
//           <Button onClick={addChapter}>+ Ajouter un chapitre</Button>
//         </div>

//         {course?.chapters?.map((chapter, index) => (
//           <ChapterEditor
//             key={index}
//             chapter={chapter}
//             index={index}
//             updateChapter={updateChapter}
//             removeChapter={removeChapter}
//           />
//         ))}
//       </div>

//       <Button onClick={updateCourse} className="w-full py-3 text-lg">
//         ✅ Mettre à jour le cours
//       </Button>
//     </div>
//   );
// }
// import React from "react";
// import CreateCourseForm from "@/components/form/CreateCourseForm";

// export default function CreateCoursePage() {
//   return (
//     <div className="bg-gray-50 ">
//       <div className="max-w-7xl mx-auto py-10 px-4 bg-gray-50 ">
//         <h1 className="text-3xl font-bold mb-6">Modifier une formation</h1>
//         <CreateCourseForm />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { courseApi } from "@/features/courses/api";
import CreateCourseForm from "@/components/form/CreateCourseForm";

export default function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [course, setCourse] = useState(null);
  const [section, setSection] = useState(searchParams.get("section") || "info");

  // FIXED 🚀
  const handleSectionChange = (sectionKey) => {
    setSection(sectionKey);
    navigate(`?section=${sectionKey}`);
  };
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await courseApi.getById(id);
      const data = res.course;
      console.log("Fetched course data:", data.contentItems);
      setCourse({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        level: data.level || "",
        language: data.language || "",
        difficulty: data.difficulty || "Easy",
        prerequisites: data.prerequisites || "",
        price: data.price || 0,
        discountPrice: data.discountPrice || 0,
        promoVideo: data.promoVideo || "",
        thumbnail: data.thumbnail || "",
        contentItems: data.contentItems.map((item) => ({
          ...item,
          id: item._id || item.id || makeId(), // ensure each item has an id
        })),
      });
    };

    fetchCourse();
  }, [id]);

  const submit = async () => {
    try {
      await courseApi.update(id, course);
      alert("✔ Course updated!");
      navigate(`/dashboard/courses/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Error updating course");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-10 px-4 bg-gray-50 ">
        <h1 className="text-3xl font-bold mb-6">Modifier une formation</h1>
        <button onClick={() => console.log(course.contentItems)}>
          Log Course State
        </button>
        <CreateCourseForm
          course={course}
          setCourse={setCourse}
          section={section}
          setSection={handleSectionChange}
          onSubmit={submit}
        />{" "}
      </div>
    </div>
  );
}
