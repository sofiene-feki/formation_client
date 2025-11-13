"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "@/features/courses/api";
import CourseDetails from "@/components/dashboard/CourseDetails";
import StudentInsightsCard from "@/components/dashboard/StudentInsightsCard";
import { motion, AnimatePresence } from "framer-motion";

export default function InstructorCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await courseApi.getById(id);
        setCourse(data);
      } catch (e) {
        navigate("/instructor/courses"); // si erreur
      }
    };
    load();
  }, [id]);

  if (!course)
    return <div className="p-10 text-center text-slate-500">Chargement...</div>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedStudent ? (
          <motion.div
            key="course"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <CourseDetails
              course={course}
              onBack={() => navigate("/instructor/courses")}
              onSelectStudent={setSelectedStudent}
            />
          </motion.div>
        ) : (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
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
