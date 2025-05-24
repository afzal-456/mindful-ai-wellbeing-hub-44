
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentMethods = () => {
  const navigate = useNavigate();

  const paymentOptions = [
    {
      id: "card",
      name: "Debit / Credit card",
      icon: <CreditCard className="h-6 w-6" />,
      route: "/payment/card"
    },
    {
      id: "internet-banking",
      name: "Internet Banking",
      icon: <Building2 className="h-6 w-6" />,
      route: "/payment/internet-banking"
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: (
        <div className="flex items-center">
          <span className="text-lg font-bold text-blue-600">G</span>
          <span className="text-sm ml-1">Pay</span>
        </div>
      ),
      route: "/payment/google-pay"
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">Pe</span>
        </div>
      ),
      route: "/payment/phonepe"
    }
  ];

  const additionalOptions = [
    { name: "Paytm", status: "Coming Soon" },
    { name: "Apple Pay", status: "Coming Soon" },
    { name: "Amazon Pay", status: "Coming Soon" },
    { name: "UPI", status: "Coming Soon" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Choose Payment option</h1>
          </div>
        </div>

        {/* Payment Options */}
        <div className="p-6">
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => navigate(option.route)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="mr-3">{option.icon}</div>
                  <span className="text-gray-800 font-medium">{option.name}</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
            ))}
          </div>

          {/* Add Another Option */}
          <div className="mt-6">
            <button className="flex items-center text-blue-600 font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Add another option
            </button>
            <div className="mt-3 pl-6">
              {additionalOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-600">{option.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {option.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
