"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CourseDetails from "@/components/dashboard/CourseDetails";
import StudentInsightsCard from "@/components/dashboard/StudentInsightsCard";
import { instructorApi } from "@/features/instructor/api";

export default function InstructorCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await instructorApi.getInstructorCourseById(id);

        // Normalize contentItems to include `id` for frontend use
        const normalizedContentItems = (data.contentItems || []).map(
          (item) => ({
            ...item,
            id: item._id || item.id || `${Date.now()}_${Math.random()}`,
          })
        );

        setCourse({
          ...data,
          contentItems: normalizedContentItems,
        });

        // Optional debug
        console.log("Fetched course contentItems:", normalizedContentItems);
      } catch (err) {
        console.error("Error loading instructor course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadCourse();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center animate-pulse">Chargement...</div>;

  if (!course)
    return (
      <div className="p-10 text-center text-red-600">Course not found.</div>
    );

  return (
    <div className="p-10 bg-gray-100 ">
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
              onSelectStudent={async (student) => {
                try {
                  const details = await instructorApi.getStudentProgress(
                    id,
                    student.userId
                  );
                  setSelectedStudent(details);
                } catch (err) {
                  console.error("Error fetching student progress:", err);
                }
              }}
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
