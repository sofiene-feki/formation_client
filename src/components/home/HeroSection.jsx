import React from "react";
import heroImage from "@/assets/banner_image.png";

export default function HeroSection() {
  return (
    <section className="bg-[#FFF8EE] py-10 px-6 md:px-20 relative overflow-hidden">
      {/* GRID 5 / 3 / 2  */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 items-center gap-10">
        {/* TEXT (5 columns) */}
        <div className="md:col-span-3 pr-0 md:pr-10 ">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Des compétences d'aujourd’hui qui ont de l’avenir
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Notre différence ? Une école 100 % en ligne et un modèle pédagogique
            unique qui seront les clés de votre réussite.
          </p>
        </div>

        {/* IMAGE (2 columns) */}
        <div className="md:col-span-2 flex justify-center">
          <img
            src={heroImage}
            alt="Étudiante travaillant sur un ordinateur"
            className="w-full object-contain"
            style={{ maxHeight: "360px" }} // 🔥 easily change height here
          />
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-3 md:gap-20">
        {/* Étudiant */}
        <div className="bg-[#FFFBEA] border-t-4 border-yellow-400 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Étudiants</h3>
          <p className="text-gray-700 mb-4 text-sm">
            Faites un grand pas vers votre nouvelle carrière en suivant l’une de
            nos formations diplômantes.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md text-sm">
              Démarrer mon inscription
            </button>
            <button className="text-purple-700 font-medium text-sm hover:underline">
              Découvrir les formations
            </button>
          </div>
        </div>

        {/* Formateur */}
        <div className="bg-[#EEF2FF] border-t-4 border-blue-400 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Formateurs</h3>
          <p className="text-gray-700 mb-4 text-sm">
            Partagez vos connaissances, accompagnez les apprenants et contribuez
            à leur réussite.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md text-sm">
              Explorer l’espace formateur
            </button>
            <button className="text-purple-700 font-medium text-sm hover:underline">
              Découvrir nos solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
