import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Leaf } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
      <Card className="w-full max-w-md mx-4 border-green-200 dark:border-green-800 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Let's get you back on track with your eco-friendly journey.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">
              Return to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
