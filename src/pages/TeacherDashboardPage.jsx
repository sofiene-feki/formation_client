"use client";
import KPI from "@/components/dashboard/KPI";
import CourseList from "@/components/dashboard/CourseList";
import AdvancedAnalytics from "@/components/dashboard/AdvancedAnalytics";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import DropOffGraph from "@/components/dashboard/DropOffGraph";
import EngagementHeatmap from "@/components/dashboard/EngagementHeatmap";
import CohortAnalysis from "@/components/dashboard/CohortAnalysis";
import VideoAnalytics from "@/components/dashboard/VideoAnalytics";
import CourseHealthScore from "@/components/dashboard/CourseHealthScore";
import RevenueCharts from "@/components/dashboard/RevenueCharts";
import { motion } from "framer-motion";

export default function InstructorDashboard() {
  return (
    <div className="w-full px-6 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-10"
      >
        {/* KPI top metrics */}
        <KPI />

        {/* Revenus + Course Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueCharts />
          <RecentActivity />
        </div>

        {/* Engagement & Dropoff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementHeatmap />
          <DropOffGraph />
        </div>

        {/* Insights & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvancedAnalytics />
          <CourseHealthScore />
        </div>

        {/* AI Smart Insights */}
        <AIInsights />

        {/* Cohort & Video Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CohortAnalysis />
          <VideoAnalytics />
        </div>

        {/* Liste des cours → maintenant clique redirige vers page détails */}
      </motion.div>
    </div>
  );
}
