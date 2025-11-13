import React, { use, useEffect } from "react";
import { PlayCircle } from "lucide-react";

export default function ChapterSummary({ chapter }) {
  if (!chapter) return null;

  return (
    <div className="p-5 border rounded-xl shadow-sm bg-white dark:bg-slate-900 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{chapter.title}</h2>
        <span className="text-sm text-muted-foreground">
          {chapter.duration}
        </span>
      </div>
      <video
        controls
        src={chapter.videoUrl}
        className="w-full rounded-lg border border-slate-200"
      />

      <div className="mt-4 flex items-center text-primary font-medium">
        <PlayCircle className="size-5 mr-2" />
        Lecture du chapitre
      </div>
    </div>
  );
}
