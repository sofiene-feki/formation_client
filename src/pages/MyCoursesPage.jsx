"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { courseApi } from "@/features/courses/api";
import { motion, AnimatePresence } from "framer-motion";

import CourseList from "@/components/dashboard/CourseList";
import CourseDetails from "@/components/dashboard/CourseDetails";
import StudentInsightsCard from "@/components/dashboard/StudentInsightsCard";

export default function MyCoursesPage() {
  const { user } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  useEffect(() => {
    if (!fullName) return;

    const load = async () => {
      try {
        const data = await courseApi.getByInstructor(fullName);
        setCourses(data);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fullName]);

  if (!user)
    return (
      <div className="p-10 text-center text-red-600">
        Vous devez être connecté.
      </div>
    );

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-slate-500">
        Chargement...
      </div>
    );

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Mes cours</h1>

      <AnimatePresence mode="wait">
        {/* ====== LISTE DES COURS ====== */}
        {!selectedCourse && (
          <motion.div
            key="course-list"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
          >
            <CourseList courses={courses} onSelectCourse={setSelectedCourse} />
          </motion.div>
        )}

        {/* ====== DÉTAILS COURS ====== */}
        {selectedCourse && !selectedStudent && (
          <motion.div
            key="course-details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
          >
            <CourseDetails
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
              onSelectStudent={setSelectedStudent}
            />
          </motion.div>
        )}

        {/* ====== DÉTAILS ÉTUDIANT ====== */}
        {selectedStudent && (
          <motion.div
            key="student-details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
          >
            <StudentInsightsCard
              student={selectedStudent}
              onBack={() => setSelectedStudent(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
