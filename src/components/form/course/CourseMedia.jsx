import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import VideoUploader from "./VideoUploader";
import ImageUploader from "./ImageUploader";

export default function CourseMedia({ course, updateField }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Uploads</CardTitle>
        <CardDescription>
          Add course cover, preview videos, and other media.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Cover Image */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <ImageUploader
            value={{
              url: course.thumbnail?.url || "",
              public_id: course.thumbnail?.public_id || "",
            }}
            onChange={(img) => updateField("thumbnail", img)}
          />
        </div>

        {/* Promo Video */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <VideoUploader
            value={{
              url: course.promoVideo?.url || "",
              public_id: course.promoVideo?.public_id || "",
            }}
            onChange={(video) => updateField("promoVideo", video)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
