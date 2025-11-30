import React from "react";
import { motion } from "framer-motion";
import img_1 from "@/assets/img_1.png";
import img_2 from "@/assets/img_2.png";
import img_3 from "@/assets/img_3.png";

const steps = [
  {
    id: 1,
    title: "Apprenez à votre rythme",
    description:
      "Accédez à vos cours en illimité, avancez quand vous voulez et où vous voulez : ordinateur, tablette ou mobile.",
    image: img_1,
  },
  {
    id: 2,
    title: "Guidé par des formateurs experts",
    description:
      "Profitez des conseils d’un professionnel qui vous accompagne, corrige vos exercices et vous aide à progresser.",
    image: img_2,
  },
  {
    id: 3,
    title: "Pratique, projets & certification",
    description:
      "Réalisez des projets concrets, validez vos compétences avec des quiz et obtenez votre certificat officiel.",
    image: img_3,
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
              {/* Bigger & Equal Size Circle */}
              <div className="bg-yellow-50 rounded-full mb-6 w-64 h-64 flex items-center justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-auto h-48 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
