import { DashboardLayout } from "@/layouts/dashboard-layout";
import { EcoImpactCard } from "@/components/dashboard/eco-impact";
import { Recommendations } from "@/components/dashboard/recommendations";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { QuickTools } from "@/components/dashboard/quick-tools";
import { WeeklyInsights } from "@/components/dashboard/weekly-insights";
import { EcoTips } from "@/components/dashboard/eco-tips";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Eco Impact Card */}
      <EcoImpactCard />

      {/* Today's Recommendations */}
      <h2 className="text-xl font-bold mb-4">Today's Recommendations</h2>
      <Recommendations />

      {/* Recent Activity */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <a href="#" className="text-primary text-sm font-medium hover:underline">View All</a>
      </div>
      <ActivityTable />

      {/* Quick Access & Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Access Section */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Quick Tools</h2>
          <QuickTools />
        </div>

        {/* Insights & Stats */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Weekly Insights</h2>
          <WeeklyInsights />
        </div>
      </div>

      {/* Eco Tips */}
      <h2 className="text-xl font-bold mb-4">Eco Tips & Challenges</h2>
      <EcoTips />
    </DashboardLayout>
  );
}
