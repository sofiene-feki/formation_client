import React from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/form/RichTextEditor";
import QuizEditor from "./QuizEditor";
import { Trash2 } from "lucide-react";

export default function ChapterEditor({
  chapter,
  index,
  updateChapter,
  removeChapter,
}) {
  const updateField = (field, value) => {
    updateChapter(index, { ...chapter, [field]: value });
  };

  return (
    <div className="border rounded p-5 bg-white shadow-sm space-y-4">
      <div className="flex justify-between mb-4">
        <h4 className="font-bold text-lg">Chapitre {index + 1}</h4>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeChapter(index)}
        >
          <Trash2 size={15} />
        </Button>
      </div>

      {/* Title */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Titre du chapitre"
        value={chapter.title}
        onChange={(e) => updateField("title", e.target.value)}
      />

      {/* Video URL */}
      <input
        className="w-full border p-2 rounded"
        placeholder="URL de la vidéo"
        value={chapter.videoUrl}
        onChange={(e) => updateField("videoUrl", e.target.value)}
      />

      {/* Rich Content */}
      <RichTextEditor
        value={chapter.content}
        onChange={(value) => updateField("content", value)}
      />

      {/* Quiz */}
      <QuizEditor
        quiz={chapter.quiz}
        updateQuiz={(quiz) => updateField("quiz", quiz)}
      />
    </div>
  );
}
