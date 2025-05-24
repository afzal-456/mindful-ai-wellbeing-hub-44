
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Building } from "lucide-react";
import { toast } from "sonner";

const InternetBankingPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isSessionBooking, setIsSessionBooking] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsSessionBooking(queryParams.get('session') === 'true');
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }

    // Simulate payment processing
    if (isSessionBooking) {
      toast.success("Session payment successful! Your session has been booked.");
    } else {
      toast.success("Payment successful! You are now a premium member.");
      localStorage.setItem("userType", "premium");
    }
    
    // Navigate to success page
    navigate("/");
  };

  const banks = [
    { id: "sbi", name: "State Bank of India" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "pnb", name: "Punjab National Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank" },
    { id: "bob", name: "Bank of Baroda" },
    { id: "canara", name: "Canara Bank" }
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
                Internet Banking
              </h1>
            </div>

            <div className="mb-6">
              <Label className="text-gray-700 font-medium mb-3 block">
                Select your bank
              </Label>
              <RadioGroup
                value={selectedBank}
                onValueChange={setSelectedBank}
                className="space-y-3"
              >
                {banks.map((bank) => (
                  <div
                    key={bank.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      selectedBank === bank.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    } cursor-pointer`}
                  >
                    <RadioGroupItem
                      value={bank.id}
                      id={bank.id}
                      className="text-blue-500"
                    />
                    <Label
                      htmlFor={bank.id}
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                    >
                      <Building className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-900">{bank.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> You will be redirected to your bank's secure website to complete the payment.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full py-3 text-gray-600 border-gray-300"
              >
                Cancel payment
              </Button>

              <Button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={!selectedBank}
              >
                Proceed to Bank
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InternetBankingPayment;
