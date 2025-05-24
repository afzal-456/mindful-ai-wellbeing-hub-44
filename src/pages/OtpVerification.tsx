
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Smartphone, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setPaymentMethod(queryParams.get('method') || '');
    setPhoneNumber(queryParams.get('phone') || '');
  }, [location]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleResendOtp = () => {
    setCountdown(60);
    setOtp("");
    toast.success("OTP resent successfully");
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    // Simulate OTP verification failure
    toast.error("Transaction failed - Backend not set :(");
    
    // Navigate back to home after showing error
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const getMethodDetails = () => {
    switch (paymentMethod) {
      case 'gpay':
        return {
          name: 'Google Pay',
          color: 'from-blue-600 to-green-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      case 'phonepe':
        return {
          name: 'PhonePe',
          color: 'from-purple-600 to-purple-800',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800'
        };
      default:
        return {
          name: 'Payment',
          color: 'from-blue-600 to-blue-800',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
    }
  };

  const methodDetails = getMethodDetails();

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
                OTP Verification
              </h1>
            </div>

            <div className="text-center mb-8">
              <div className={`w-24 h-24 bg-gradient-to-br ${methodDetails.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Verify {methodDetails.name} Payment
              </h2>
              <p className="text-gray-600">
                Enter the 6-digit OTP sent to +91-{phoneNumber}
              </p>
            </div>

            <div className="space-y-6 mb-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in {countdown} seconds
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResendOtp}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Resend OTP
                  </Button>
                )}
              </div>
            </div>

            <div className={`${methodDetails.bgColor} rounded-lg p-4 mb-6`}>
              <p className={`text-sm ${methodDetails.textColor}`}>
                <strong>Security Note:</strong> Never share your OTP with anyone. {methodDetails.name} will never ask for your OTP over phone or email.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full py-3 text-gray-600 border-gray-300"
              >
                Cancel Payment
              </Button>

              <Button
                onClick={handleVerifyOtp}
                className={`w-full bg-gradient-to-r ${methodDetails.color} hover:opacity-90 text-white py-3`}
                disabled={otp.length !== 6}
              >
                Verify & Pay
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OtpVerification;
