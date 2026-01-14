import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Loader2 className="w-8 h-8 animate-spin text-red-600" />
    </div>
  );
};

export default LoadingSpinner;
