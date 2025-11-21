"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";

export default function StudentCoursesPage() {
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`/api/user-course/user/${user._id}`);
        setCourses(res.data || []);
        console.log("Fetched user courses:", res.data);
      } catch (err) {
        console.error("Failed to fetch user courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?._id]);

  if (!user)
    return (
      <div className="p-10 text-center text-red-600">
        Vous devez être connecté pour voir vos cours.
      </div>
    );

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-slate-500">
        Chargement de vos cours...
      </div>
    );

  if (courses.length === 0)
    return (
      <div className="p-10 text-center text-slate-600">
        Vous n'êtes inscrit à aucun cours pour le moment.
      </div>
    );

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Mes cours</h1>

      <AnimatePresence mode="wait">
        <motion.div
          key="course-list"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((uc) => {
            const course = uc.courseId; // populated course
            return (
              <Link
                key={uc._id}
                to={`/course/${course._id}`}
                className="block hover:opacity-80"
              >
                <motion.div
                  className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{course.title}</h2>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Progression: {uc.progress || 0}%
                      </span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                        Chapitre: {(uc.lastVisitedChapter || 0) + 1}/
                        {course.chapters?.length || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
