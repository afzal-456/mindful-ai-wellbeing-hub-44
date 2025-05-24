
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CardPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardType, setCardType] = useState<"debit" | "credit">("debit");
  const [isSessionBooking, setIsSessionBooking] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsSessionBooking(queryParams.get('session') === 'true');
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === "cardNumber") {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (field === "expiryDate") {
      // Format expiry date as MM / YYYY
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + " / " + formattedValue.substring(2, 6);
      }
      if (formattedValue.length > 9) return;
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handlePayment = () => {
    // Validate form
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name) {
      toast.error("Please fill in all required fields");
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
                Debit / Credit Card
              </h1>
            </div>

            {/* Card Type Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => setCardType("debit")}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  cardType === "debit"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Debit Card
              </button>
              <button
                onClick={() => setCardType("credit")}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  cardType === "credit"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Credit Card
              </button>
            </div>

            {/* Card Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-gray-700 font-medium">
                  Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="8834 2834 8897 5370"
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-gray-700 font-medium">
                    Expiry date
                  </Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    placeholder="Jan • 2023"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-gray-700 font-medium">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="• • •"
                    type="password"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="ADDISON NELSON"
                  className="uppercase"
                />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="saveCard"
                  className="rounded border-gray-300"
                />
                <Label htmlFor="saveCard" className="text-sm text-gray-600">
                  Save card for future checkouts
                </Label>
              </div>
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
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CardPayment;
