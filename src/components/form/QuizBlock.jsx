// components/course-sections/QuizBlock.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QuizEditor from "./QuizEditor";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function QuizBlock({
  id,
  index,
  quizBlock,
  updateQuizBlock,
  removeQuizBlock,
}) {
  const [collapsed, setCollapsed] = useState(false);

  // DND
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const updateQuiz = (quiz) => {
    updateQuizBlock({ ...quizBlock, quiz });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg bg-white shadow-sm"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer p-4"
        onClick={toggleCollapse}
      >
        {/* DRAG HANDLE */}

        <div className="flex-1">
          <h4 className="font-bold text-lg">Quiz {index + 1}</h4>
          <p className="text-gray-500 text-sm">
            {quizBlock.title || "Quiz"} | {quizBlock.quiz?.length || 0}{" "}
            question(s)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="cursor-grab select-none text-gray-500 hover:text-gray-700"
          >
            ☰
          </div>

          {collapsed ? <ChevronDown /> : <ChevronUp />}
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              removeQuizBlock();
            }}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>

      {/* Collapsible content */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre du quiz (optionnel)
            </label>
            <input
              className="w-full border p-2 rounded mt-2"
              placeholder="Titre du quiz"
              value={quizBlock.title || ""}
              onChange={(e) =>
                updateQuizBlock({ ...quizBlock, title: e.target.value })
              }
            />
          </div>

          <QuizEditor quiz={quizBlock.quiz || []} updateQuiz={updateQuiz} />
        </div>
      )}
    </div>
  );
}
