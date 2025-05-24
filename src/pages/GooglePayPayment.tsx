
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GooglePayPayment = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      navigate("/payment/otp", { state: { provider: "Google Pay", phone: phoneNumber } });
    }
  };

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
            <h1 className="text-xl font-semibold">Google Pay</h1>
          </div>
        </div>

        {/* Google Pay Info */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">G</span>
          </div>
          <h2 className="text-lg font-medium mb-2">Pay with Google Pay</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your phone number linked with Google Pay
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                  <span className="text-gray-600">+91</span>
                </div>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter phone number"
                  className="rounded-l-none"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button 
                type="submit"
                disabled={phoneNumber.length !== 10}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Send OTP
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full py-3"
              >
                Cancel payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GooglePayPayment;
