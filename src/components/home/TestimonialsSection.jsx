import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah",
    text: "Grâce à ces cours, j’ai enfin trouvé un emploi dans le digital !",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Youssef",
    text: "La plateforme est intuitive et les formateurs sont excellents !",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-indigo-700 text-white py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Ce qu’ils disent de nous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-indigo-600 rounded-2xl p-6 text-left shadow"
            >
              <p className="italic mb-4">“{t.text}”</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
