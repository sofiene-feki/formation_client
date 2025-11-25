import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function QuestionEditor({
  question,
  index,
  updateQuestion,
  removeQuestion,
}) {
  const updateField = (field, value) => {
    updateQuestion(index, { ...question, [field]: value });
  };

  const updateOption = (i, value) => {
    const newOptions = [...question.options];
    newOptions[i] = value;
    updateField("options", newOptions);
  };

  const toggleCorrect = (i) => {
    const newCorrect = [...(question.correctAnswer || [])];

    if (newCorrect.includes(i)) {
      updateField(
        "correctAnswer",
        newCorrect.filter((x) => x !== i)
      );
    } else {
      updateField("correctAnswer", [...newCorrect, i]);
    }
  };

  return (
    <div className="border p-3 rounded bg-white mb-3 shadow-sm">
      <div className="flex justify-between">
        <h5 className="font-medium">Question {index + 1}</h5>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeQuestion(index)}
        >
          <Trash2 size={14} />
        </Button>
      </div>

      <input
        className="w-full border mt-3 p-2 rounded"
        placeholder="Question..."
        value={question.question}
        onChange={(e) => updateField("question", e.target.value)}
      />

      <div className="mt-3 space-y-2">
        {question.options.map((opt, optIndex) => (
          <div key={optIndex} className="flex items-center gap-3">
            <input
              className="w-full border p-2 rounded"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => updateOption(optIndex, e.target.value)}
            />

            <input
              type="checkbox"
              className="size-5"
              checked={(question.correctAnswer || []).includes(optIndex)}
              onChange={() => toggleCorrect(optIndex)}
            />
          </div>
        ))}
      </div>

      <Button
        className="mt-3"
        variant="outline"
        onClick={() => updateField("options", [...question.options, ""])}
      >
        + Ajouter une option
      </Button>
    </div>
  );
}
