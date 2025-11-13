import React from "react";
import { Button } from "@/components/ui/button";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor({ quiz, updateQuiz }) {
  const addQuestion = () => {
    updateQuiz([
      ...quiz,
      { question: "", options: ["", ""], correctAnswers: [] },
    ]);
  };

  const updateQuestion = (index, updated) => {
    const newQuiz = [...quiz];
    newQuiz[index] = updated;
    updateQuiz(newQuiz);
  };

  const removeQuestion = (index) => {
    const newQuiz = quiz.filter((_, i) => i !== index);
    updateQuiz(newQuiz);
  };

  return (
    <div className="border rounded p-4 bg-gray-50 mt-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Quiz du chapitre</h4>
        <Button size="sm" onClick={addQuestion}>
          + Ajouter une question
        </Button>
      </div>

      {quiz.map((question, index) => (
        <QuestionEditor
          key={index}
          question={question}
          index={index}
          updateQuestion={updateQuestion}
          removeQuestion={removeQuestion}
        />
      ))}
    </div>
  );
}
