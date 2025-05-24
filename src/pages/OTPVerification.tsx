
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider, phone } = location.state || {};
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Simulate OTP verification
      setTimeout(() => {
        toast.error("Transaction failed {backend not set :( }");
        navigate("/payment-failed");
      }, 1500);
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    toast.success("OTP resent successfully");
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
            <h1 className="text-xl font-semibold">Verify OTP</h1>
          </div>
        </div>

        {/* OTP Verification */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Enter OTP</h2>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to {phone} via {provider}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
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
              {timer > 0 ? (
                <p className="text-gray-600 text-sm">
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="space-y-3">
              <Button 
                type="submit"
                disabled={otp.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Verify & Pay
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

export default OTPVerification;
