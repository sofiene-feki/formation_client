import { PlayCircle } from "lucide-react";

export default function ChapterSummary({ chapter }) {
  if (!chapter) return null;
  return (
    <div className="p-5 border rounded-xl shadow-sm bg-white transition-all">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{chapter.title}</h2>
        <span className="text-sm text-muted-foreground">
          {chapter.duration}
        </span>
      </div>

      {chapter.videoUrl?.url ? (
        <video
          controls
          src={chapter.videoUrl.url}
          className="w-full rounded-lg border"
        />
      ) : (
        <div className="w-full rounded-lg border h-48 flex items-center justify-center text-gray-500">
          No video
        </div>
      )}

      <div className="mt-4 flex items-center text-primary font-medium">
        <PlayCircle className="mr-2" /> Lecture du chapitre
      </div>
    </div>
  );
}
