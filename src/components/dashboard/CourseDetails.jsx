import React from "react";
import { MotionCard } from "./MotionCard";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { courseApi } from "@/features/courses/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CourseDetails({ course, onBack, onSelectStudent }) {
  const handleDelete = async () => {
    if (!confirm("⚠️ Voulez-vous vraiment supprimer ce cours ?")) return;

    try {
      await courseApi.deleteCourse(course._id);
      alert("✅ Cours supprimé avec succès !");
      onBack(); // retour à la liste (plus propre que reload)
    } catch (err) {
      console.error(err);
      alert("❌ Impossible de supprimer le cours.");
    }
  };

  return (
    <MotionCard>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Détails : {course.title}</CardTitle>

          <div className="flex items-center gap-3">
            {/* Voir */}
            <Link
              to={`/courses/${course._id}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
            >
              👁 Voir
            </Link>

            {/* Modifier */}
            <Link
              to={`/courses/${course._id}/edit`}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              ✏ Modifier
            </Link>

            {/* Supprimer */}
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              🗑 Supprimer
            </button>

            {/* Retour */}
            <button
              onClick={onBack}
              className="text-sm underline text-slate-600 hover:text-black"
            >
              Retour
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="font-medium">
          {course.students} étudiants — {course.avgProgress} progression moyenne
        </div>

        <div>
          <div className="font-semibold">Chapitres</div>
          <ul className="text-sm">
            {course.chapters.map((c, i) => (
              <li key={i}>
                {c.title} — {c.completed} compl.
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold mt-4">Liste des étudiants</div>
          <table className="w-full text-sm border-collapse mt-2">
            <tbody>
              {course?.studentsList?.map((s, i) => (
                <tr
                  key={i}
                  className="border-t cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => onSelectStudent(s)}
                >
                  <td className="py-1">{s.name}</td>
                  <td>{s.progress}</td>
                  <td>{s.time}</td>
                  <td>
                    {s.quizPassed}/{s.quizFailed}
                  </td>
                  <td>{s.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="font-semibold">Graphique progression</div>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={course.studentsList}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="progressValue" fill="#6D4AFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </MotionCard>
  );
}
