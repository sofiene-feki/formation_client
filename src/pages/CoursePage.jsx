import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";

import CourseHeader from "@/components/course/CourseHeader";
import CourseProgress from "@/components/course/CourseProgress";
import ChapterSummary from "@/components/course/ChapterSummary";
import CourseContent from "@/components/course/CourseContent";
import NextChapterButton from "@/components/course/NextChapterButton";
import ChapterQuiz from "@/components/course/ChapterQuiz";
import { useCourseProgress } from "@/hooks/useCourseProgress";

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
          `https://formation-server.onrender.com/api/courses/${id}`
        );
        setCourse(data.course);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  const items = course?.contentItems || [];
  const totalSteps = items.length; // +1 for certificate

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
      setActiveStep(Math.min(lastVisitedContent, items.length - 1));
    }
  }, [course]);

  const currentItem = items[activeStep] || null;
  const isCertificateStep = activeStep === items.length; // certificate comes after last item
  const isLastStep = activeStep === items.length - 1;

  // Move to next step and update progress
  const handleNext = async () => {
    const item = items[activeStep]; // always fresh
    const isCertificate = activeStep === items.length;

    if (!isCertificate && item) {
      if (item.type === "chapter") {
        await updateItemProgress({
          itemIndex: activeStep,
          type: "chapter",
          completed: true,
        });
      } else if (item.type === "quiz") {
        await updateItemProgress({
          itemIndex: activeStep,
          type: "quiz",
          completed: true,
          passed: true,
        });
      }
    }

    setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

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

  if (!course || progressLoading) {
    return (
      <p className="text-center mt-10 text-slate-500 animate-pulse">
        Chargement du cours...
      </p>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <CourseHeader
        title={course?.title}
        instructor={course?.Instructeur}
        thumbnail={course?.thumbnail?.url}
        description={course?.description}
      />

      <CourseProgress
        totalChapters={items.length + 1} // include certificate step
        activeStep={activeStep} // active highlight!
        lastVisitedChapter={lastVisitedContent}
        quizPositions={items
          .map((item, i) => (item.type === "quiz" ? i : null))
          .filter((v) => v !== null)}
        isChapterPassed={isItemPassed}
        onSelectChapter={(index) => {
          if (index <= items.length) setActiveStep(index);
        }}
      />

      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        {!isCertificateStep && currentItem?.type === "chapter" && (
          <>
            <ChapterSummary chapter={currentItem} />
            <CourseContent content={currentItem.content} />
            <div className="flex justify-end mt-6">
              <NextChapterButton
                onClick={handleNext}
                disabled={false}
                isLastStep={isLastStep}
              />
            </div>
          </>
        )}

        {!isCertificateStep && currentItem?.type === "quiz" && (
          <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Quiz : {currentItem.title}
            </h3>
            <ChapterQuiz
              quiz={currentItem.quiz}
              onComplete={handleQuizComplete}
            />
            <div className="flex justify-end mt-6">
              <NextChapterButton
                onClick={handleNext}
                disabled={false}
                isLastStep={isLastStep}
              />
            </div>
          </div>
        )}

        {isCertificateStep && (
          <div className="mt-8 border p-6 rounded-xl bg-yellow-50 dark:bg-gray-800 shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              🎓 Certificat de complétion
            </h2>
            <p className="text-lg mb-2">
              Nom de l’étudiant :{" "}
              <span className="font-semibold">{user?.name}</span>
            </p>
            <p className="text-lg mb-2">
              Cours : <span className="font-semibold">{course?.title}</span>
            </p>
            <p className="text-lg mb-2">
              Date :{" "}
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg mb-2">
              Score :{" "}
              <span className="font-semibold">{Math.round(progress)}%</span>
            </p>
            <p className="mt-4 text-green-700 font-semibold">
              Félicitations ! Vous avez terminé le cours avec succès.
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
