"use client";

import React, { useState, useMemo } from "react";
import { MotionCard } from "./MotionCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import {
  HiChevronDown,
  HiChevronUp,
  HiClipboardList,
  HiChartBar,
  HiPuzzle,
  HiUserGroup,
  HiUser,
} from "react-icons/hi";

// Progress bar component
const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
    <div
      className="bg-blue-600 h-3"
      style={{ width: `${value}%`, transition: "width 0.3s ease" }}
    />
  </div>
);

export default function CourseDetails({ course, onBack, onSelectStudent }) {
  const [showChapters, setShowChapters] = useState(true);
  const [studentFilter, setStudentFilter] = useState("all");

  const chapters = course.contentItems.filter((c) => c.type === "chapter");
  const quizzes = course.contentItems.filter((c) => c.type === "quiz");
  const totalStudents = course.studentsList?.length || 0;
  const avgProgress =
    totalStudents > 0
      ? Math.round(
          course.studentsList.reduce((a, s) => a + s.progressValue, 0) /
            totalStudents
        )
      : 0;

  const rows = useMemo(
    () =>
      course.studentsList
        .filter((s) => (studentFilter === "low" ? s.progressValue < 50 : true))
        .map((s, idx) => ({
          id: idx,
          name: s.name || s.email,
          progressValue: s.progressValue,
          time: s.time || "-",
          quiz: `${s.quizPassed}/${s.quizFailed}`,
          lastActivity: s.lastActivity || "-",
        })),
    [course.studentsList, studentFilter]
  );

  const columns = [
    { field: "name", headerName: "Nom / Email", flex: 1 },
    {
      field: "progressValue",
      headerName: "Progression",
      flex: 1,
      renderCell: (params) => <ProgressBar value={params.value} />,
    },
    { field: "time", headerName: "Temps", flex: 1 },
    { field: "quiz", headerName: "Quiz", flex: 1 },
    { field: "lastActivity", headerName: "Dernière activité", flex: 1 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen space-y-6">
      {/* Header & Metrics */}
      <MotionCard>
        {/* Header: Title + Actions */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4">
          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>

          <div className="flex gap-2 items-center flex-wrap mt-2 sm:mt-0">
            <Link
              to={`/course/${course._id}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1"
            >
              <HiUser /> Voir
            </Link>
            <Link
              to={`/courses/${course._id}/edit`}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1"
            >
              <HiClipboardList /> Modifier
            </Link>
            <button
              onClick={onBack}
              className="text-sm underline text-slate-600 hover:text-black flex items-center gap-1"
            >
              Retour
            </button>
          </div>
        </CardHeader>

        {/* Content: KPIs */}
        <CardContent className="flex flex-wrap gap-6">
          {/** Metric cards with subtle shadow, top border, and hover effect */}
          <div className="flex-1 min-w-[200px] bg-white rounded-xl shadow-sm border-t-4 border-yellow-400 p-6 hover:shadow-md transition flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <HiUser /> Étudiants inscrits
            </div>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-xl shadow-sm border-t-4 border-green-400 p-4 hover:shadow-md transition flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <HiChartBar /> Progression moyenne
            </div>

            {/* Pie chart + % text */}
            <div className="flex items-center gap-4">
              <div style={{ width: 30, height: 30 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "progress", value: avgProgress },
                        { name: "remaining", value: 100 - avgProgress },
                      ]}
                      innerRadius={9}
                      outerRadius={14}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell key="progress" fill="#22c55e" />
                      <Cell key="remaining" fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-2xl font-bold">{avgProgress}%</div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-xl shadow-sm border-t-4 border-blue-400 p-6 hover:shadow-md transition flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <HiClipboardList /> Chapitres
            </div>
            <div className="text-2xl font-bold">{chapters.length}</div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-xl shadow-sm border-t-4 border-purple-400 p-6 hover:shadow-md transition flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <HiPuzzle /> Quizzes
            </div>
            <div className="text-2xl font-bold">{quizzes.length}</div>
          </div>
        </CardContent>

        {/* Footer: Extra Info */}
        <div className="border-t px-6 pt-4 rounded-b-xl flex flex-wrap gap-4 text-sm text-gray-600">
          {/* {course.description && (
            <div>
              <span className="font-medium">Description:</span>{" "}
              {course.description}
            </div>
          )} */}
          {course.category && (
            <div>
              <span className="font-medium">Catégorie:</span> {course.category}
            </div>
          )}
          {course.language && (
            <div>
              <span className="font-medium">Langue:</span> {course.language}
            </div>
          )}
          {course.updatedAt && (
            <div>
              <span className="font-medium">Dernière mise à jour:</span>{" "}
              {new Date(course.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </MotionCard>

      {/* Chapters & Quizzes Overview */}
      <div className="flex flex-wrap gap-4">
        {/* Chapters */}
        <MotionCard className="flex-1 min-w-[300px]">
          <CardHeader
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowChapters((s) => !s)}
          >
            <CardTitle className="flex items-center gap-2">
              <HiClipboardList /> Chapitres ({chapters.length})
            </CardTitle>
            {showChapters ? <HiChevronUp /> : <HiChevronDown />}
          </CardHeader>

          {showChapters && (
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {chapters.map((c, idx) => {
                const progress = c.completedLessonsPercent || 0;

                return (
                  <div
                    key={c.id || c._id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
                  >
                    {/* LEFT SIDE — TITLE + INSIGHTS */}
                    <div className="flex flex-col w-full">
                      <div className="font-semibold text-sm">
                        {c.title || `Chapitre ${idx + 1}`}
                      </div>

                      {/* Metric bar */}
                      <div className="flex gap-3 mt-2 text-xs">
                        <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                          Durée : {c.duration || "—"}
                        </div>

                        <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                          Score moyen : {c.averageScore || 0}%
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE — MINI PIE CHART */}
                    <div className="flex flex-col items-center justify-center ml-4">
                      <div style={{ width: 30, height: 30 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "progress", value: progress },
                                { name: "remaining", value: 100 - progress },
                              ]}
                              innerRadius={9}
                              outerRadius={14}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            >
                              <Cell key="progress" fill="#22c55e" />
                              <Cell key="remaining" fill="#e5e7eb" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <span className="text-[10px] font-semibold mt-1">
                        {progress}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          )}
        </MotionCard>

        {/* Quizzes */}
        <MotionCard className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiPuzzle /> Quizzes ({quizzes.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {quizzes.map((q, idx) => {
              const questionsCount = q.questions?.length || q.quiz?.length || 0;
              const averageScore = q.averageScore || 0; // from backend analytics
              const attempts = q.attempts || 0;
              const completionRate = q.completionRate || 0;

              return (
                <div
                  key={q.id || q._id}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
                >
                  {/* LEFT SIDE — TITLE + SMALL METRICS */}
                  <div className="flex flex-col w-full">
                    <div className="font-semibold text-sm">
                      {q.title || `Quiz ${idx + 1}`}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                        {questionsCount} Questions
                      </div>

                      <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                        Score moyen : {averageScore}%
                      </div>

                      <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                        Tentatives : {attempts}
                      </div>

                      <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                        Taux réussite : {completionRate}%
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE — MINI PIE */}
                  <div className="flex flex-col items-center justify-center ml-4">
                    <div style={{ width: 30, height: 30 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "progress", value: completionRate },
                              {
                                name: "remaining",
                                value: 100 - completionRate,
                              },
                            ]}
                            innerRadius={9}
                            outerRadius={14}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            <Cell key="progress" fill="#3b82f6" />
                            <Cell key="remaining" fill="#e5e7eb" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <span className="text-[10px] font-semibold mt-1">
                      {completionRate}%
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </MotionCard>
      </div>

      {/* Student Table using MUI X DataGrid */}
      <MotionCard>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <HiUserGroup /> Étudiants 8
          </CardTitle>

          <div className="flex gap-2">
            <button
              onClick={() => setStudentFilter("all")}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                studentFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Tous
            </button>

            <button
              onClick={() => console.log(rows)}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                studentFilter === "low"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              50%
            </button>
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          <DataGrid
            rows={rows}
            columns={[
              {
                field: "name",
                headerName: "Étudiant",
                flex: 1.2,
                renderCell: (params) => (
                  <div className="flex flex-col">
                    <span className="font-medium">{params.row.name}</span>
                    <span className="text-xs text-gray-500">
                      {params.row.email}
                    </span>
                  </div>
                ),
              },
              {
                field: "progress",
                headerName: "Progression",
                flex: 0.8,
                sortable: true,
                renderCell: (params) => (
                  <div className="flex items-center gap-2">
                    {/* Mini pie chart */}
                    <div style={{ width: 26, height: 26 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { value: params.value },
                              { value: 100 - params.value },
                            ]}
                            innerRadius={8}
                            outerRadius={12}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            <Cell fill="#22c55e" />
                            <Cell fill="#e5e7eb" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <span className="text-sm font-semibold">
                      {params.value}%
                    </span>
                  </div>
                ),
              },
              {
                field: "quizAverage",
                headerName: "Score moyen",
                flex: 0.7,
                sortable: true,
                renderCell: (params) => (
                  <span className="text-sm font-medium">{params.value}%</span>
                ),
              },
              {
                field: "timeSpent",
                headerName: "Temps passé",
                flex: 0.7,
                // valueFormatter: ({ value }) =>
                //   `${Math.floor(value / 60)}h ${value % 60}m`,
              },
              {
                field: "lastActivity",
                headerName: "Dernière activité",
                flex: 0.8,
              },
              {
                field: "status",
                headerName: "Statut",
                flex: 0.6,
                renderCell: (params) => (
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      params.value === "Actif"
                        ? "bg-green-100 text-green-700"
                        : params.value === "Inactif"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {params.value}
                  </span>
                ),
              },
            ]}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableRowSelectionOnClick
            onRowClick={(row) => onSelectStudent(row.row)}
            autoHeight
          />
        </CardContent>
      </MotionCard>

      {/* Progress Chart */}
      <MotionCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HiChartBar /> Graphique de progression
          </CardTitle>
        </CardHeader>
        <CardContent style={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={course.studentsList}
              margin={{ top: 10, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="progressValue" fill="#6D4AFF">
                {course.studentsList.map((s, i) => (
                  <Cell
                    key={i}
                    fill={s.progressValue < 50 ? "#FF4D4F" : "#6D4AFF"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MotionCard>
    </div>
  );
}
