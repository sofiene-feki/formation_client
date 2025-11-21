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
import { useEffect, useState } from "react";
import { instructorApi } from "@/features/instructor/api";

export default function InstructorDashboard() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPI = async () => {
      try {
        const data = await instructorApi.getInstructorKPI();
        setKpi(data);
        console.log("Fetched KPI:", data);
      } catch (err) {
        console.error("Failed to fetch KPI:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKPI();
  }, []);

  return (
    <div className="w-full px-6 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-10"
      >
        {/* KPI top metrics */}
        <KPI kpi={kpi} loading={loading} />

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
