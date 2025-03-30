import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { EcoTip } from "@shared/schema";

interface EcoTipCardProps {
  tip: EcoTip;
}

function EcoTipCard({ tip }: EcoTipCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-card overflow-hidden">
      <div 
        className="w-full h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${tip.imageUrl})` }}
      />
      <CardContent className="p-5">
        <h3 className="font-bold mb-2">{tip.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
        <Button 
          variant="outline" 
          className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          {tip.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

export function EcoTips() {
  const { data: ecoTips, isLoading } = useQuery<EcoTip[]>({
    queryKey: ['/api/eco-tips'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="h-40 bg-gray-200 animate-pulse" />
            <CardContent className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded mb-1 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded mb-4 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!ecoTips || ecoTips.length === 0) {
    return (
      <Card className="w-full p-8 text-center">
        <p className="text-gray-500">No eco tips available at this time</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {ecoTips.map((tip) => (
        <EcoTipCard key={tip.id} tip={tip} />
      ))}
    </div>
  );
}
