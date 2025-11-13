import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "🎯",
    title: "Apprentissage ciblé",
    text: "Des cours conçus par des experts du domaine.",
  },
  {
    icon: "🕒",
    title: "Flexible",
    text: "Apprenez à votre rythme, où que vous soyez.",
  },
  {
    icon: "💼",
    title: "Pratique & concret",
    text: "Des projets réels pour enrichir votre portfolio.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Pourquoi choisir notre plateforme ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-500">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
