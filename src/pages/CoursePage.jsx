import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "@/lib/axios";

import CourseHeader from "@/components/course/CourseHeader";
import CourseProgress from "@/components/course/CourseProgress";
import ChapterSummary from "@/components/course/ChapterSummary";
import CourseContent from "@/components/course/CourseContent";
import NextChapterButton from "@/components/course/NextChapterButton";
import ChapterQuiz from "@/components/course/ChapterQuiz";

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function CoursePage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useFirebaseAuth();

  const [course, setCourse] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // fetch course
  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  // 👉 always define totalChapters safely
  const totalChapters = course?.chapters?.length ?? 0;

  // ✅ always call the hook (never conditionally)
  const {
    lastVisitedChapter,
    progress,
    loading: progressLoading,
    saveLastVisited,
    submitQuiz,
    isChapterPassed,
  } = useCourseProgress(id, totalChapters);

  useEffect(() => {
    if (course && lastVisitedChapter < totalChapters) {
      setActiveStep(lastVisitedChapter);
      setShowQuiz(false);
    }
  }, [course, lastVisitedChapter, totalChapters]);

  const currentChapter = course?.chapters?.[activeStep];
  const isLastChapter = totalChapters > 0 && activeStep === totalChapters - 1;

  const handleNext = useCallback(async () => {
    if (showQuiz) {
      setShowQuiz(false);
      const nextStep = activeStep + 1;
      await saveLastVisited(nextStep);
      setActiveStep(nextStep);
      return;
    }

    if (currentChapter?.quiz?.length > 0) {
      setShowQuiz(true);
    } else {
      const nextStep = activeStep + 1;
      await saveLastVisited(nextStep);
      setActiveStep(nextStep);
    }
  }, [showQuiz, currentChapter, activeStep, saveLastVisited]);

  const handleQuizComplete = useCallback(
    async ({ score, passed }) => {
      if (!course || !user) return;

      const chapterIndex = activeStep;
      const result = await submitQuiz({ chapterIndex, score, passed });

      if (passed) {
        const nextStep = activeStep + 1;
        await saveLastVisited(nextStep);
        setShowQuiz(false);
        setActiveStep(nextStep);
      } else {
        alert("❌ Vous devez obtenir au moins 70% pour continuer !");
      }
    },
    [course, user, activeStep, submitQuiz, saveLastVisited]
  );

  if (authLoading || progressLoading || !course)
    return <p className="text-center mt-10">Chargement du cours...</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <CourseHeader
        title={course.title}
        instructor={course.Instructeur}
        thumbnail={course.thumbnail}
        description={course.description}
      />

      <CourseProgress
        totalChapters={totalChapters}
        lastVisitedChapter={lastVisitedChapter}
        quizPositions={course?.chapters?.reduce((arr, c, i) => {
          if (c.quiz && c.quiz.length > 0) arr.push(i);
          return arr;
        }, [])}
        isChapterPassed={isChapterPassed}
        onSelectChapter={setActiveStep}
      />

      <motion.div
        key={`${activeStep}-${showQuiz}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        {!showQuiz ? (
          <>
            <ChapterSummary chapter={currentChapter} />
            <CourseContent content={currentChapter?.content} />
            <div className="flex justify-end mt-6">
              <NextChapterButton
                onClick={handleNext}
                disabled={isLastChapter && !currentChapter?.quiz?.length}
              />
            </div>
          </>
        ) : (
          <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Quiz du chapitre {activeStep + 1}
            </h3>
            <ChapterQuiz
              quiz={currentChapter.quiz}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </motion.div>

      {isLastChapter && !showQuiz && (
        <div className="text-center mt-8 text-green-600 font-semibold text-lg">
          🎉 Félicitations, vous avez terminé le cours !
        </div>
      )}
    </main>
  );
}
