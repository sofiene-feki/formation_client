import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Apprenez où que vous soyez",
    description:
      "Accédez à votre formation 100% en ligne au bureau, à la maison, en ville ou à la montagne… Partout !",
    image: "https://cdn-icons-png.flaticon.com/512/4341/4341078.png", // remplace par ton image locale
  },
  {
    id: 2,
    title: "Un mentor pour vous accompagner",
    description:
      "Bénéficiez des conseils d’un expert professionnel qui vous aide à progresser tout au long de votre formation.",
    image: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
  },
  {
    id: 3,
    title: "Travaillez sur des projets professionnalisants",
    description:
      "Réalisez des projets concrets issus de scénarios métiers, directement applicables dans le monde du travail.",
    image: "https://cdn-icons-png.flaticon.com/512/4341/4341147.png",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Savoir. Faire. Savoir-faire.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Découvrez une nouvelle façon d'apprendre :{" "}
          <strong>20% de théorie</strong>, <strong>80% de pratique</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-yellow-50 rounded-full p-10 mb-6 w-52 h-52 flex items-center justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="block">
                  {step.title.split(" ").slice(-2).join(" ")}
                </span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
