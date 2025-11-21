import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import VerifyPhonePage from "@/pages/VerifyPhonePage";
import CoursePage from "@/pages/CoursePage";

import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Unauthorized from "@/pages/Unauthorized";
import NotFoundPage from "@/pages/NotFoundPage";
import CreateCoursePage from "@/pages/instructor/CreateCoursePage";
import MyCoursesPage from "@/pages/instructor/MyCoursesPage";
import UpdateCoursePage from "@/pages/updateCoursePage";
import InstructorDashboard from "@/pages/instructor/TeacherDashboardPage";
import InstructorCourseDetails from "@/pages/instructor/InstructorCourseDetails";
import CoursesPage from "@/pages/CoursesPage";
import CourseIntro from "@/pages/CourseIntro";
import StudentCoursesPage from "@/pages/student/StudentCoursesPage";
import AdminUsers from "@/pages/admin/AdminUsers";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-phone" element={<VerifyPhonePage />} />
      <Route path="/course/:id" element={<CoursePage />} />
      <Route path="/course-intro/:id" element={<CourseIntro />} />
      <Route path="/courses" element={<CoursesPage />} />

      {/* ✅ ÉTUDIANT ROUTES */}
      <Route element={<ProtectedRoute roles={["student", "admin"]} />}>
        <Route path="/my-courses" element={<StudentCoursesPage />} />
      </Route>

      {/* ✅ FORMATEUR ROUTES */}
      <Route element={<ProtectedRoute roles={["instructor", "admin"]} />}>
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/create" element={<CreateCoursePage />} />
        <Route path="/instructor/courses" element={<MyCoursesPage />} />
        <Route path="/courses/:id/edit" element={<UpdateCoursePage />} />
        <Route
          path="/instructor/courses/:id"
          element={<InstructorCourseDetails />}
        />
      </Route>

      {/* ✅ ADMIN ROUTES */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<CoursePage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courses" element={<CoursePage />} />
        <Route path="/admin/analytics" element={<CoursePage />} />
      </Route>

      {/* ✅ Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ✅ 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
