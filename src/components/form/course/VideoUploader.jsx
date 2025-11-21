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

    setProgress(0);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "http://localhost:8000/api/upload/video",
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

      // Return both URL and public_id
      onChange({ url: data.url, public_id: data.public_id });
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeVideo = () => {
    onChange({ url: "", public_id: "" });
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
