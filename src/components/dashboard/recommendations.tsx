import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Recommendation } from "@shared/schema";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  let gradientClass = "from-green-100 to-green-200";
  let buttonClass = "bg-primary hover:bg-primary-dark text-white";
  let iconClass = "bx bx-leaf text-primary";
  
  if (recommendation.category === "Health & Fitness") {
    gradientClass = "from-blue-100 to-blue-200";
    buttonClass = "bg-secondary hover:bg-secondary-dark text-white";
    iconClass = "bx bx-heart text-secondary";
  } else if (recommendation.category === "Finance & Savings") {
    gradientClass = "from-amber-100 to-amber-200";
    buttonClass = "bg-amber-500 hover:bg-amber-600 text-white";
    iconClass = "bx bx-dollar-circle text-amber-600";
  }
  
  return (
    <Card className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className={`h-36 bg-gradient-to-r ${gradientClass} p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-medium" style={{ color: recommendation.category === "Health & Fitness" ? "#00ACC1" : recommendation.category === "Finance & Savings" ? "#F59E0B" : "#2E7D32" }}>
              {recommendation.category}
            </span>
            <h3 className="text-lg font-bold mt-2">{recommendation.title}</h3>
          </div>
          <span className="flex items-center">
            {Array(recommendation.ecoBenefitScore).fill(null).map((_, i) => (
              <i key={i} className={iconClass}></i>
            ))}
          </span>
        </div>
      </div>
      <CardContent className="p-5">
        <p className="text-gray-600 mb-4">{recommendation.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{recommendation.timeEstimate}</span>
          <Button className={buttonClass}>{recommendation.actionText}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Recommendations() {
  const { data: recommendations, isLoading } = useQuery<Recommendation[]>({
    queryKey: ['/api/recommendations'],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="w-full p-8 text-center">
        <p className="text-gray-500">No recommendations available at this time</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {recommendations.map((recommendation) => (
        <RecommendationCard 
          key={recommendation.id} 
          recommendation={recommendation} 
        />
      ))}
    </div>
  );
}
