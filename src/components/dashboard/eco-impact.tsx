import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useQuery } from "@tanstack/react-query";
import { EcoImpact } from "@shared/schema";

export function EcoImpactCard() {
  const { data: ecoImpact, isLoading } = useQuery<EcoImpact>({
    queryKey: ['/api/eco-impact'],
  });

  if (isLoading || !ecoImpact) {
    return (
      <Card className="bg-white rounded-2xl shadow-card mb-8">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-2xl shadow-card mb-8">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Your Eco Impact</h2>
            <p className="text-gray-500 mt-1">
              You're {ecoImpact.improvementPercentage}% more sustainable than last month!
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-green-50 rounded-xl py-2 px-4">
              <i className="bx bx-leaf text-primary text-xl"></i>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Carbon Footprint</p>
                <p className="font-semibold">{ecoImpact.carbonFootprint} tons CO₂e</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 rounded-xl py-2 px-4">
              <i className="bx bx-droplet text-secondary text-xl"></i>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Water Saved</p>
                <p className="font-semibold">{ecoImpact.waterSaved} gallons</p>
              </div>
            </div>
            <div className="flex items-center bg-amber-50 rounded-xl py-2 px-4">
              <i className="bx bx-trash text-amber-600 text-xl"></i>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Waste Reduced</p>
                <p className="font-semibold">{ecoImpact.wasteReduced} lbs</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CircularProgress 
            value={ecoImpact.categoryScores.diet} 
            label="Diet Score" 
            color="text-primary" 
          />
          <CircularProgress 
            value={ecoImpact.categoryScores.fitness} 
            label="Fitness" 
            color="text-secondary" 
          />
          <CircularProgress 
            value={ecoImpact.categoryScores.finance} 
            label="Finance" 
            color="text-amber-500" 
          />
          <CircularProgress 
            value={ecoImpact.categoryScores.shopping} 
            label="Shopping" 
            color="text-green-600" 
          />
        </div>
      </CardContent>
    </Card>
  );
}
