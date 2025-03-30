import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface QuickToolProps {
  icon: string;
  label: string;
  action: () => void;
}

function QuickTool({ icon, label, action }: QuickToolProps) {
  return (
    <button 
      onClick={action} 
      className="flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-colors"
    >
      <i className={`${icon} text-3xl text-primary`}></i>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </button>
  );
}

export function QuickTools() {
  const { toast } = useToast();

  const handleToolAction = (toolName: string) => {
    toast({
      title: `${toolName} tool activated`,
      description: `The ${toolName.toLowerCase()} feature will be available soon.`,
    });
  };

  const scanProduct = async () => {
    try {
      const res = await apiRequest("GET", "/api/scan-placeholder", undefined);
      toast({
        title: "Product Scanner",
        description: "Product scanner feature will be available soon.",
      });
    } catch (error) {
      toast({
        title: "Scanner Error",
        description: "Could not activate scanner. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-card">
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <QuickTool 
            icon="bx bx-barcode" 
            label="Scan Product" 
            action={() => scanProduct()} 
          />
          <QuickTool 
            icon="bx bx-calendar-plus" 
            label="Log Meal" 
            action={() => handleToolAction("Meal Logger")} 
          />
          <QuickTool 
            icon="bx bx-run" 
            label="Track Workout" 
            action={() => handleToolAction("Workout Tracker")} 
          />
          <QuickTool 
            icon="bx bx-credit-card" 
            label="Log Expense" 
            action={() => handleToolAction("Expense Logger")} 
          />
          <QuickTool 
            icon="bx bx-task" 
            label="Add Task" 
            action={() => handleToolAction("Task Manager")} 
          />
          <QuickTool 
            icon="bx bx-calculator" 
            label="Carbon Calc" 
            action={() => handleToolAction("Carbon Calculator")} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
