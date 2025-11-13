import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Développement Web", icon: "💻" },
  { name: "Design & UX", icon: "🎨" },
  { name: "Marketing Digital", icon: "📈" },
  { name: "IA & Data Science", icon: "🧠" },
];

export default function CategoriesSection() {
  return (
    <section className="px-6 max-w-6xl mx-auto my-20">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Explorez les catégories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer border hover:border-indigo-500 transition"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="font-medium text-gray-700">{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
