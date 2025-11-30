"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { courseApi } from "@/features/courses/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MotionCard } from "@/components/dashboard/MotionCard";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function CoursesPage() {
  const { user } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await courseApi.getAll();
        setCourses(data?.courses || []);
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // // ---- AUTH ----
  // if (!user) {
  //   return (
  //     <div className="p-10 text-center text-red-600 font-medium">
  //       Vous devez être connecté pour accéder à vos cours.
  //     </div>
  //   );
  // }

  // ---- LOADING ----
  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 animate-pulse">
        Chargement des cours...
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Liste des cours</h1>

      <AnimatePresence mode="wait">
        <motion.div
          key="course-list"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/course-intro/${course._id}`}
              className="block"
            >
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="cursor-pointer overflow-hidden hover:shadow-xl rounded-xl bg-white"
              >
                {/* ---- THUMBNAIL ---- */}
                <div className="w-full h-40 bg-slate-100 overflow-hidden">
                  {course.thumbnail?.url ? (
                    <img
                      src={course.thumbnail.url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      Pas d’image
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg font-semibold">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground space-y-3">
                  {/* ---- DESCRIPTION ---- */}
                  <p className="line-clamp-3">{course.description}</p>

                  {/* ---- INFO BADGES ---- */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {course.Instructeur && (
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        👤 {course.Instructeur}
                      </span>
                    )}

                    {course.language && (
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        🎧 {course.language}
                      </span>
                    )}

                    {course.level && (
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        📘 {course.level}
                      </span>
                    )}

                    {course.difficulty && (
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        ⚡ {course.difficulty}
                      </span>
                    )}
                  </div>

                  {/* ---- PRICE ---- */}
                  <div className="pt-3 font-semibold text-primary">
                    {course.discountPrice > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="line-through text-slate-400">
                          {course.price} TND
                        </span>
                        <span>{course.discountPrice} TND</span>
                      </div>
                    ) : (
                      <span>{course.price} TND</span>
                    )}
                  </div>
                </CardContent>
              </MotionCard>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
