
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building, Shield } from "lucide-react";
import { toast } from "sonner";

const BankRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bankName, setBankName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const bank = queryParams.get('bank') || '';
    
    const bankNames: { [key: string]: string } = {
      sbi: "State Bank of India",
      hdfc: "HDFC Bank",
      icici: "ICICI Bank",
      axis: "Axis Bank",
      pnb: "Punjab National Bank",
      kotak: "Kotak Mahindra Bank",
      bob: "Bank of Baroda",
      canara: "Canara Bank"
    };
    
    setBankName(bankNames[bank] || "Your Bank");
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    if (!userId || !password) {
      toast.error("Please enter both User ID and Password");
      return;
    }

    setIsLoading(true);
    
    // Simulate bank processing
    setTimeout(() => {
      setIsLoading(false);
      toast.error("Transaction failed - Backend not set :(");
      
      // Navigate back to home after showing error
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 3000);
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
                disabled={isLoading}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {bankName}
              </h1>
            </div>

            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Banking Login
              </h2>
              <p className="text-gray-600">
                Enter your internet banking credentials
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="userId" className="text-gray-700 font-medium">
                  User ID
                </Label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  <strong>Secure Connection:</strong> Your information is protected with 256-bit SSL encryption.
                </p>
              </div>
            </div>

            {isLoading && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 text-center">
                  Processing your payment... Please wait.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full py-3 text-gray-600 border-gray-300"
                disabled={isLoading}
              >
                Cancel Transaction
              </Button>

              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={!userId || !password || isLoading}
              >
                {isLoading ? "Processing..." : "Login & Pay"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BankRedirect;
