// components/course-sections/ChapterEditor.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/form/RichTextEditor";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import VideoUploader from "./course/VideoUploader";

export default function ChapterEditor({
  id,
  index,
  chapter,
  updateChapter, // now expects (updatedChapter) => ...
  removeChapter, // expects () => ...
}) {
  const [collapsed, setCollapsed] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleCollapse = () => setCollapsed((s) => !s);

  // IMPORTANT: call updateChapter(updatedChapter) (not index-based)
  const updateField = (field, value) => {
    const updated = { ...chapter, [field]: value };
    updateChapter(updated);
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
        <div className="flex-1">
          <h4 className="font-bold text-lg">Chapitre {index + 1}</h4>
          <p className="text-gray-500 text-sm">
            {chapter.title || "Titre non défini"} |{" "}
            {chapter.lessons?.length || 0} leçon(s) |{" "}
            {chapter.quiz?.length || 0} question(s) de quiz
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab select-none"
          >
            ☰
          </div>

          {collapsed ? <ChevronDown /> : <ChevronUp />}

          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // call parent remove with no args (parent knows id)
              removeChapter();
            }}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>

      {/* Collapsible Content */}
      {collapsed && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Chapter Title */}
          <input
            className="w-full border p-2 rounded"
            placeholder="Titre du chapitre"
            value={chapter.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          {/* Video URL */}
          <VideoUploader
            value={chapter.videoUrl}
            onChange={(url) => updateField("videoUrl", url)}
          />

          {/* Rich Content */}
          <RichTextEditor
            value={chapter.content || ""}
            onChange={(val) => updateField("content", val)}
          />
        </div>
      )}
    </div>
  );
}
