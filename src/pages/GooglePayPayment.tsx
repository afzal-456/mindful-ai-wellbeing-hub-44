
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Smartphone } from "lucide-react";
import { toast } from "sonner";

const GooglePayPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSessionBooking, setIsSessionBooking] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsSessionBooking(queryParams.get('session') === 'true');
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const formatted = value.replace(/\D/g, "").substring(0, 10);
    setPhoneNumber(formatted);
  };

  const handlePayment = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
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
                Google Pay
              </h1>
            </div>

            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Pay with Google Pay
              </h2>
              <p className="text-gray-600">
                Enter your registered mobile number
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
                  Mobile Number
                </Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="pl-12"
                    maxLength={10}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>Secure Payment:</strong> Your payment will be processed through Google Pay's secure platform.
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
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3"
                disabled={!phoneNumber || phoneNumber.length !== 10}
              >
                Pay with Google Pay
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GooglePayPayment;
