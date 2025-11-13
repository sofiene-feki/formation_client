import React from "react";

export default function CourseHeader({
  title,
  instructor,
  thumbnail,
  description,
}) {
  return (
    <header className="flex flex-col md:flex-row gap-6 mb-10">
      <img
        src={thumbnail}
        alt={title}
        className="w-full md:w-1/3 rounded-2xl object-cover shadow-md"
      />
      <div className="flex flex-col justify-center space-y-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
        <span className="text-sm text-slate-500">
          Instructeur : {instructor}
        </span>
      </div>
    </header>
  );
}
