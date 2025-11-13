import React from "react";
import { CheckCircle, Circle, HelpCircle, Award } from "lucide-react";

export default function CourseProgress({
  totalChapters,
  lastVisitedChapter,
  quizPositions = [],
  isChapterPassed,
  onSelectChapter,
}) {
  return (
    <div className="w-full mb-8">
      <div className="relative flex items-center justify-between">
        {/* Ligne de fond */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2" />

        {/* Timeline des étapes */}
        {Array.from({ length: totalChapters }).map((_, i) => {
          const isQuizStep = quizPositions.includes(i);
          const passed = isChapterPassed(i);
          const isActive = i === lastVisitedChapter;

          return (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => {
                if (i <= lastVisitedChapter) onSelectChapter(i);
              }}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  passed
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500"
                } group-hover:scale-110`}
              >
                {isQuizStep ? (
                  <HelpCircle size={18} />
                ) : passed ? (
                  <CheckCircle size={18} />
                ) : (
                  <Circle size={18} />
                )}
              </div>
              <span className="mt-1 text-xs text-center text-gray-600 dark:text-gray-300">
                {isQuizStep ? "Quiz" : `Chapitre ${i + 1}`}
              </span>
            </div>
          );
        })}

        {/* Fin de parcours : certificat */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              lastVisitedChapter + 1 === totalChapters
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-400"
            }`}
          >
            <Award size={18} />
          </div>
          <span className="mt-1 text-xs text-center text-gray-600 dark:text-gray-300">
            Certificat
          </span>
        </div>
      </div>
    </div>
  );
}
