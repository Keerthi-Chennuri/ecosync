import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@shared/schema";

export function ActivityTable() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  function getIconClass(category: string): string {
    switch (category.toLowerCase()) {
      case "diet":
        return "bx bx-food-menu text-primary";
      case "fitness":
        return "bx bx-heart text-secondary";
      case "shopping":
        return "bx bx-shopping-bag text-amber-500";
      case "finance":
        return "bx bx-dollar-circle text-gray-600";
      default:
        return "bx bx-check text-primary";
    }
  }

  function getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "verified":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500">Activity</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500">Impact</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</TableHead>
              <TableHead className="px-6 py-4 text-right text-sm font-medium text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <TableRow key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      <i className={`${getIconClass(activity.category)} text-xl`}></i>
                      <span className="ml-2 text-sm font-medium">{activity.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">{activity.description}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {activity.impact}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-500">{activity.date}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(activity.status)}`}>
                      {activity.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No activities logged yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
