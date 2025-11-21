import React, { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function ImageUploader({ value, onChange }) {
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
        "https://formation-server.onrender.com/api/upload/image",
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

      onChange({ url: data.url, public_id: data.public_id });
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    onChange({ url: "", public_id: "" });
    setProgress(0);
  };

  return (
    <div className="relative w-48 h-48 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {!value?.url && !uploading && (
        <div
          className="flex flex-col items-center text-gray-400 text-center cursor-pointer px-2"
          onClick={triggerUpload}
        >
          <Upload size={24} />
          <span className="text-sm mt-1">Upload image</span>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/50">
          <Progress value={progress} className="h-3 w-32 bg-gray-300" />
          <p className="text-xs text-gray-500 mt-1">{progress}%</p>
        </div>
      )}

      {value?.url && !uploading && (
        <>
          <img
            src={value.url}
            alt="preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
    </div>
  );
}
