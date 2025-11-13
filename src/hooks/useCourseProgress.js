// src/hooks/useCourseProgress.js
import { useState, useEffect, useCallback } from "react";
import { useFirebaseAuth } from "./useFirebaseAuth";
import axios from "@/lib/axios";

export function useCourseProgress(courseId, totalChapters) {
  const { user } = useFirebaseAuth();
  const [lastVisitedChapter, setLastVisitedChapter] = useState(0);
  const [quizResults, setQuizResults] = useState([]); // [{chapterIndex, score, passed}]
  const [loading, setLoading] = useState(true);

  const progress =
    totalChapters > 0
      ? Math.min(((lastVisitedChapter + 1) / totalChapters) * 100, 100)
      : 0;

  // Fetch existing userCourse record
  useEffect(() => {
    if (!user || !courseId) return;

    let cancelled = false;
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/userCourses/${user.uid}/${courseId}`
        );
        if (cancelled) return;
        setLastVisitedChapter(data.lastVisitedChapter ?? 0);
        setQuizResults(Array.isArray(data.quizResults) ? data.quizResults : []);
      } catch (err) {
        console.error("Failed to fetch course progress:", err);
        // keep defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [user, courseId]);

  // increment lastVisitedChapter (useful if you want to move forward without quiz)
  const saveLastVisited = useCallback(
    async (newIndex) => {
      if (!user || !courseId) return;
      try {
        const { data } = await axios.put(
          `/api/userCourses/${user.uid}/${courseId}`,
          {
            lastVisitedChapter: newIndex,
            totalChapters,
          }
        );
        setLastVisitedChapter(data.lastVisitedChapter ?? newIndex);
      } catch (err) {
        console.error("Failed to save lastVisitedChapter:", err);
      }
    },
    [user, courseId, totalChapters]
  );

  // submit quiz result and update local state — backend will unlock next chapter if passed
  const submitQuiz = useCallback(
    async ({ chapterIndex, score, passed }) => {
      if (!user || !courseId) return null;
      try {
        const { data } = await axios.post(
          `/api/userCourses/${user.uid}/${courseId}/quiz`,
          { chapterIndex, score, passed }
        );

        // update local state from response
        setLastVisitedChapter(data.lastVisitedChapter ?? ((prev) => prev));
        setQuizResults(Array.isArray(data.quizResults) ? data.quizResults : []);

        return data;
      } catch (err) {
        console.error("Failed to submit quiz:", err);
        throw err;
      }
    },
    [user, courseId]
  );

  // helper: check if a chapter's quiz was passed
  const isChapterPassed = useCallback(
    (chapterIndex) => {
      const r = quizResults.find((q) => q.chapterIndex === chapterIndex);
      return r ? !!r.passed : false;
    },
    [quizResults]
  );

  return {
    lastVisitedChapter,
    progress,
    loading,
    saveLastVisited,
    submitQuiz,
    isChapterPassed,
    quizResults,
  };
}
