
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl border border-gray-200 shadow-xl">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Button variant="gradient" className="font-medium" asChild>
          <a href="/" className="no-underline">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
