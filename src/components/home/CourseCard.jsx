import React from "react";
import { Star } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100">
      <img
        src={course.image}
        alt={course.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {course.instructor}
        </p>

        <div className="flex items-center text-sm mt-2">
          <span className="text-yellow-500 flex items-center">
            <Star size={14} className="mr-1" />
            {course.rating}
          </span>
          <span className="text-gray-400 text-xs ml-1">
            ({course.reviews} ratings)
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-gray-900">${course.price}</span>
          {course.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${course.oldPrice}
            </span>
          )}
        </div>

        {course.tag && (
          <div
            className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
              course.tag === "Bestseller"
                ? "bg-green-100 text-green-700"
                : course.tag === "Hot & New"
                ? "bg-red-100 text-red-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {course.tag}
          </div>
        )}
      </div>
    </div>
  );
}
