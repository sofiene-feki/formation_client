import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import CourseHeader from "@/components/course/CourseHeader";
import CourseProgress from "@/components/course/CourseProgress";
import ChapterSummary from "@/components/course/ChapterSummary";
import CourseContent from "@/components/course/CourseContent";
import NextChapterButton from "@/components/course/NextChapterButton";
import ChapterQuiz from "@/components/course/ChapterQuiz";

import { useSelector } from "react-redux";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { studentCourseApi } from "@/features/studentCourse/api";
import axios from "axios";

export default function CoursePage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const [course, setCourse] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/courses/${id}`
        );
        setCourse(data.course);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  const items = course?.contentItems || [];
  const totalSteps = items.length;

  const {
    itemsProgress,
    lastVisitedContent,
    progress,
    loading: progressLoading,
    updateItemProgress,
    isItemPassed,
  } = useCourseProgress(id, items, userId);

  // Set active step based on last visited
  useEffect(() => {
    if (course && itemsProgress.length) {
      setActiveStep(Math.min(lastVisitedContent, totalSteps - 1));
    }
  }, [course, lastVisitedContent, totalSteps, itemsProgress.length]);

  const currentItem = items[activeStep] || null;
  const isLastStep = activeStep === totalSteps - 1;

  // Handle next chapter/chapter completion
  const handleNext = useCallback(async () => {
    const nextIndex = activeStep + 1;
    if (!currentItem) return;

    if (currentItem.type === "chapter") {
      await updateItemProgress({
        itemIndex: activeStep,
        type: "chapter",
        completed: true,
      });
    }

    if (nextIndex < totalSteps) setActiveStep(nextIndex);
  }, [activeStep, currentItem, totalSteps, updateItemProgress]);

  // Handle quiz completion
  const handleQuizComplete = useCallback(
    async ({ score, passed }) => {
      if (!currentItem) return;

      await updateItemProgress({
        itemIndex: activeStep,
        type: "quiz",
        score,
        passed,
        completed: passed,
      });

      if (passed) handleNext();
      else alert("❌ Vous devez réussir le quiz pour continuer !");
    },
    [activeStep, currentItem, updateItemProgress, handleNext]
  );

  // if (!course || progressLoading) {
  //   return (
  //     <p className="text-center mt-10 text-slate-500 animate-pulse">
  //       Chargement du cours...
  //     </p>
  //   );
  // }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <CourseHeader
        title={course?.title}
        instructor={course?.Instructeur}
        thumbnail={course?.thumbnail?.url}
        description={course?.description}
      />

      <CourseProgress
        totalChapters={totalSteps}
        lastVisitedChapter={lastVisitedContent}
        quizPositions={items
          .map((item, i) => (item.type === "quiz" ? i : null))
          .filter((v) => v !== null)}
        isChapterPassed={isItemPassed}
        onSelectChapter={(index) => {
          if (index <= lastVisitedContent) setActiveStep(index);
        }}
      />

      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        {/* Render chapter */}
        {currentItem?.type === "chapter" && (
          <>
            <ChapterSummary chapter={currentItem} />
            <CourseContent content={currentItem.content} />
            <div className="flex justify-end mt-6">
              <NextChapterButton onClick={handleNext} disabled={isLastStep} />
            </div>
          </>
        )}

        {/* Render quiz */}
        {currentItem?.type === "quiz" && (
          <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Quiz : {currentItem.title}
            </h3>
            <ChapterQuiz
              quiz={currentItem.quiz}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </motion.div>

      {isLastStep && (
        <div className="text-center mt-8 text-green-600 font-semibold text-lg">
          🎉 Félicitations, vous avez terminé le cours !
        </div>
      )}
    </main>
  );
}
