import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WeeklyInsight } from "@shared/schema";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

export function WeeklyInsights() {
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("week");
  
  const { data: insights, isLoading } = useQuery<WeeklyInsight>({
    queryKey: ['/api/insights', timeFrame],
  });

  const handleTimeFrameChange = (newTimeFrame: "week" | "month" | "year") => {
    setTimeFrame(newTimeFrame);
  };

  if (isLoading || !insights) {
    return (
      <Card className="bg-white rounded-xl shadow-card">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Impact Overview</h3>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-xs font-medium rounded-full ${timeFrame === "week" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleTimeFrameChange("week")}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium rounded-full ${timeFrame === "month" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleTimeFrameChange("month")}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium rounded-full ${timeFrame === "year" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleTimeFrameChange("year")}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insights.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2E7D32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100">
                <i className="bx bx-trending-up text-xl text-primary"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Most Improved</p>
                <p className="font-semibold">{insights.mostImproved}</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-amber-100">
                <i className="bx bx-trending-down text-xl text-amber-600"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Needs Attention</p>
                <p className="font-semibold">{insights.needsAttention}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
