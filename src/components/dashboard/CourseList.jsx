import React from "react";
import { MotionCard } from "./MotionCard";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function CourseList({ courses, onSelectCourse }) {
  // const courses = [
  //   {
  //     id: 1,
  //     title: "React Avancé : Patterns & Architecture",
  //     students: 420,
  //     avgProgress: "68%",
  //     chapters: [
  //       { title: "Intro & Setup", completed: 380 },
  //       { title: "Patterns", completed: 290 },
  //       { title: "Scaling", completed: 210 },
  //     ],
  //     studentsList: [
  //       {
  //         name: "Amine",
  //         progress: "92%",
  //         progressValue: 92,
  //         time: "12h",
  //         quizPassed: 5,
  //         quizFailed: 1,
  //         lastActivity: "2025-11-09",
  //       },
  //       {
  //         name: "Leila",
  //         progress: "34%",
  //         progressValue: 34,
  //         time: "2h",
  //         quizPassed: 1,
  //         quizFailed: 2,
  //         lastActivity: "2025-11-08",
  //       },
  //       {
  //         name: "Karim",
  //         progress: "58%",
  //         progressValue: 58,
  //         time: "8h",
  //         quizPassed: 3,
  //         quizFailed: 0,
  //         lastActivity: "2025-11-10",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="grid gap-4">
      {courses?.map((course) => (
        <Link
          to={`/instructor/courses/${course._id}`}
          className="block hover:opacity-80"
        >
          <MotionCard
            key={course.id}
            className="cursor-pointer"
            //  onClick={() => onSelectCourse(course)}
          >
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {course.students} étudiants • Progression moyenne :{" "}
              {course.avgProgress}
            </CardContent>
          </MotionCard>
        </Link>
      ))}
    </div>
  );
}
