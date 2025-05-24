
import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Payment Status</h1>
          </div>
        </div>

        {/* Failed Message */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            Transaction failed {"{backend not set :( }"}
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/payment-methods")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full py-3"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
