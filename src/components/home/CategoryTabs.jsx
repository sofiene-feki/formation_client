import React from "react";

export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-6 border-b border-gray-200 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`pb-2 text-sm font-medium relative ${
            activeCategory === cat
              ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
