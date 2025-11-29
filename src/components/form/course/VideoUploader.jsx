import React, { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function VideoUploader({ value, onChange }) {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const triggerUpload = () => fileInputRef.current.click();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      // 1️⃣ Extract video duration BEFORE uploading
      const duration = await getVideoDuration(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("duration", duration);

      const { data } = await axios.post(
        "https://formation-server.onrender.com/api/upload/video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      // 2️⃣ Pass video metadata to parent
      onChange({
        url: data.url,
        public_id: data.public_id,
        duration, // save local duration too
      });
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Function that reads video metadata
  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.round(video.duration)); // in seconds
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const removeVideo = () => {
    onChange({ url: "", public_id: "", duration: 0 });
    setProgress(0);
  };

  return (
    <div className="border p-4 rounded bg-gray-50 space-y-4">
      <input
        type="file"
        accept="video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {!value?.url && !uploading && (
        <div
          className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer text-gray-500 hover:text-black"
          onClick={triggerUpload}
        >
          <Upload className="mr-2" />
          <span>Upload video</span>
        </div>
      )}

      {uploading && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600">Uploading...</div>
          <Progress value={progress} className="h-3 w-full bg-gray-300" />
          <p className="text-xs text-gray-500">{progress}%</p>
        </div>
      )}

      {value?.url && !uploading && (
        <div className="space-y-3">
          <video
            src={value.url}
            controls
            className="w-full rounded shadow max-h-80"
          />
          <p className="text-sm text-gray-600">
            🎬 Duration: {value.duration}s
          </p>
          <button
            onClick={removeVideo}
            className="flex items-center gap-2 text-red-600 hover:underline"
          >
            <Trash2 size={16} /> Remove video
          </button>
        </div>
      )}
    </div>
  );
}
