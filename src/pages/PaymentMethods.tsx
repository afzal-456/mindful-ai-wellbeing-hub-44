
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Building, Smartphone } from "lucide-react";
import { toast } from "sonner";

const PaymentMethods = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const handleContinue = () => {
    const routeMap = {
      card: "/payment/card",
      banking: "/payment/banking",
      gpay: "/payment/gpay",
      phonepe: "/payment/phonepe"
    };

    const route = routeMap[selectedMethod as keyof typeof routeMap];
    if (route) {
      navigate(route + location.search);
    } else {
      toast.error("Invalid payment method selected");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Debit / Credit card",
      icon: <CreditCard className="h-5 w-5" />,
      available: true
    },
    {
      id: "banking",
      name: "Internet Banking",
      icon: <Building className="h-5 w-5" />,
      available: true
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: <Smartphone className="h-5 w-5" />,
      available: true
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: <Smartphone className="h-5 w-5" />,
      available: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8 px-6">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                Choose Payment option
              </h1>
            </div>

            <RadioGroup
              value={selectedMethod}
              onValueChange={setSelectedMethod}
              className="space-y-3"
            >
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!method.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    disabled={!method.available}
                    className="text-blue-500"
                  />
                  <Label
                    htmlFor={method.id}
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                  >
                    <div className="text-blue-500">{method.icon}</div>
                    <span className="text-gray-900 font-medium">{method.name}</span>
                  </Label>
                  {selectedMethod === method.id && method.available && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full py-3 text-gray-600 border-gray-300"
              >
                + Add another option
              </Button>

              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={!paymentMethods.find(m => m.id === selectedMethod)?.available}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMethods;
