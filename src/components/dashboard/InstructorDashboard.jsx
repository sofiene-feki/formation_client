import KPI from "./components/KPI";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import RevenueCharts from "./components/RevenueCharts";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import RecentActivity from "./components/RecentActivity";
import AIInsights from "./components/AIInsights";
import DropOffGraph from "./components/DropOffGraph";
import EngagementHeatmap from "./components/EngagementHeatmap";
import CohortAnalysis from "./components/CohortAnalysis";
import VideoAnalytics from "./components/VideoAnalytics";
import CourseHealthScore from "./components/CourseHealthScore";
import StudentInsightsCard from "./components/StudentInsightsCard";

export default function InstructorDashboard() {
  return (
    <div className="p-6 space-y-6">
      <KPI />
      <RevenueCharts />
      <AdvancedAnalytics />
      <DropOffGraph />
      <EngagementHeatmap />
      <CohortAnalysis />
      <VideoAnalytics />
      <CourseHealthScore />
      <AIInsights />
      <CourseList />
      <CourseDetails />
      <StudentInsightsCard />
      <RecentActivity />
    </div>
  );
}
