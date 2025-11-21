import { studentCourseApi } from "@/features/studentCourse/api";
import { useState, useEffect, useCallback } from "react";

export function useCourseProgress(courseId, items, userId) {
  const [itemsProgress, setItemsProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Compute overall progress
  const progress =
    items.length > 0
      ? Math.min(
          (itemsProgress.filter((i) => i.completed || i.videoCompleted).length /
            items.length) *
            100,
          100
        )
      : 0;

  // Fetch existing progress
  useEffect(() => {
    if (!userId || !courseId) return;

    let cancelled = false;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const data = await studentCourseApi.getProgress(userId, courseId);
        if (cancelled) return;

        setItemsProgress(
          Array.isArray(data.itemsProgress) ? data.itemsProgress : []
        );
      } catch (err) {
        console.error("Failed to fetch course progress:", err);
        setItemsProgress([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [userId, courseId]);

  // Update item progress (chapter or quiz)
  const updateItemProgress = useCallback(
    async ({
      itemIndex,
      type,
      completed,
      watchedSeconds,
      totalSeconds,
      score,
      passed,
    }) => {
      if (!userId || !courseId) return;

      try {
        const updated = await studentCourseApi.updateItemProgress(
          userId, // ✅ first
          courseId, // ✅ second
          {
            itemIndex,
            type,
            completed,
            watchedSeconds,
            totalSeconds,
            score,
            passed,
          }
        );

        setItemsProgress(updated.itemsProgress);
        return updated;
      } catch (err) {
        console.error("Failed to update item progress:", err);
        throw err;
      }
    },
    [userId, courseId]
  );

  const isItemPassed = useCallback(
    (itemIndex) => {
      const item = itemsProgress[itemIndex];
      return item?.passed ?? false;
    },
    [itemsProgress]
  );

  const lastVisitedContent = itemsProgress.length
    ? Math.max(...itemsProgress.map((i) => i.itemIndex))
    : 0;

  return {
    itemsProgress,
    lastVisitedContent,
    progress,
    loading,
    updateItemProgress,
    isItemPassed,
  };
}
