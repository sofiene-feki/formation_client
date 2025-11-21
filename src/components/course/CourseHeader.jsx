import React from "react";

export default function CourseHeader({
  title,
  instructor,
  thumbnail,
  description,
}) {
  return (
    <header className="mb-6">
      <div className="flex gap-6 items-start">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-48 h-32 object-cover rounded-lg shadow"
          />
        ) : (
          <div className="w-48 h-32 bg-gray-100 rounded-lg" />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="mt-3 text-sm text-gray-700">
            Instructeur: {instructor}
          </div>
        </div>
      </div>
    </header>
  );
}
