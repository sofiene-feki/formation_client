import React from "react";
import { CheckCircle, Circle, HelpCircle, Award } from "lucide-react";

export default function CourseProgress({
  totalChapters,
  activeStep, // NEW: real current step
  lastVisitedChapter,
  quizPositions = [],
  isChapterPassed,
  onSelectChapter,
}) {
  const allPassed = Array.from({ length: totalChapters }).every((_, idx) =>
    isChapterPassed(idx)
  );

  return (
    <div className="w-full mb-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2" />
        {Array.from({ length: totalChapters }).map((_, i) => {
          const isLast = i === totalChapters - 1; // ✅ certificate index
          const passed = isChapterPassed(i);
          const isActive = i === activeStep;
          const isQuizStep = quizPositions.includes(i);

          return (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectChapter(i)}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  // certificate step style
                  isLast
                    ? allPassed
                      ? "bg-yellow-500 text-white animate-pulse"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500"
                    : passed
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500"
                } group-hover:scale-110`}
              >
                {isLast ? (
                  <Award size={18} /> // 🎓 certificate icon
                ) : isQuizStep ? (
                  <HelpCircle size={18} />
                ) : passed ? (
                  <CheckCircle size={18} />
                ) : (
                  <Circle size={18} />
                )}
              </div>

              <span className="mt-1 text-xs text-center text-gray-600 dark:text-gray-300">
                {isLast
                  ? "Certificat"
                  : isQuizStep
                  ? "Quiz"
                  : `Chapitre ${i + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
