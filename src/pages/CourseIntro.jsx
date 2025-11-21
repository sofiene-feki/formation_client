"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FiPlay, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { studentCourseApi } from "@/features/studentCourse/api";

export default function CourseIntro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [lastContent, setLastContent] = useState(0);

  const userId = user?._id;

  useEffect(() => {
    //if (!userId) return;

    const loadCourse = async () => {
      try {
        // Fetch course details
        const res = await fetch(
          `https://formation-server.onrender.com/api/courses/${id}`
        );
        const data = await res.json();
        setCourse(data.course);

        // Fetch user progress
        const prog = await studentCourseApi.getProgress(userId, id);
        if (prog?.enrolled) {
          setHasStarted(true);
          setLastContent(prog.lastVisitedContent || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, userId]);

  const handleStart = async () => {
    try {
      const res = await studentCourseApi.assignCourse({ userId, courseId: id });
      setHasStarted(true);
      setLastContent(res.data?.lastVisitedContent || 0);
      navigate(
        `/course/${id}/chapter/${res.data?.lastVisitedContent + 1 || 1}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    navigate(`/course/${id}/chapter/${lastContent + 1}`);
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Chargement du cours...
      </p>
    );

  if (!course)
    return (
      <p className="text-center mt-20 text-red-500">
        Ce cours est introuvable.
      </p>
    );

  // count chapters & quizzes
  const chapterCount = (course.contentItems || []).filter(
    (c) => c.type === "chapter"
  ).length;
  const quizCount = (course.contentItems || []).filter(
    (c) => c.type === "quiz"
  ).length;

  return (
    <main className="max-w-6xl mx-auto px-5 py-12 space-y-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row gap-8 items-start"
      >
        {/* Left: Text */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">{course?.title}</h1>
          <p className="text-gray-700 text-lg">{course.description}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              📘 {course.level}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              👨‍🏫 {course.Instructeur}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              🌐 {course.language}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              🏷️ {course.category}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            {!hasStarted ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md"
              >
                <FiPlay /> Commencer le cours
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md"
              >
                <FiPlay /> Continuer (Chapitre {lastContent + 1})
              </button>
            )}
          </div>
        </div>

        {/* Right: Thumbnail */}
        {course.thumbnail?.url && (
          <div className="w-full lg:w-96 flex-shrink-0">
            <img
              src={course.thumbnail.url}
              alt="Course thumbnail"
              className="rounded-xl shadow-md w-full object-cover max-h-[350px]"
            />
          </div>
        )}
      </motion.div>

      {/* COURSE CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold">Contenu du cours</h2>

        <div className="border rounded-xl bg-white shadow divide-y">
          {course?.contentItems?.map((item, i) => (
            <div
              key={item._id}
              className="p-4 hover:bg-gray-50 transition flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.type === "chapter" ? `Chapitre ${i + 1}:` : "Quiz:"}{" "}
                  {item.title}
                </p>
                {item.content && item.type === "chapter" && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.content.replace(/<[^>]+>/g, "").substring(0, 100) +
                      "..."}
                  </p>
                )}
              </div>
              {item.type === "quiz" && item.quiz?.length > 0 && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  {item.quiz.length} questions
                </span>
              )}
            </div>
          ))}
        </div>

        {/* SUMMARY BADGES */}
        <div className="flex gap-6 mt-6 flex-wrap text-gray-700">
          <span className="flex items-center gap-1">
            <FiBookOpen /> {chapterCount} Chapitres
          </span>
          <span className="flex items-center gap-1">
            <FiCheckCircle /> {quizCount} Quiz
          </span>
        </div>
      </motion.div>
    </main>
  );
}
