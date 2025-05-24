
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const InternetBankingPayment = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    { id: "sbi", name: "State Bank of India", url: "https://retail.onlinesbi.sbi/" },
    { id: "hdfc", name: "HDFC Bank", url: "https://netbanking.hdfcbank.com/" },
    { id: "icici", name: "ICICI Bank", url: "https://infinity.icicibank.com/" },
    { id: "axis", name: "Axis Bank", url: "https://www.axisbank.com/" },
    { id: "kotak", name: "Kotak Mahindra Bank", url: "https://netbanking.kotak.com/" },
    { id: "pnb", name: "Punjab National Bank", url: "https://netpnb.com/" }
  ];

  const handleProceed = () => {
    if (!selectedBank) {
      return;
    }
    
    const bank = banks.find(b => b.id === selectedBank);
    if (bank) {
      // Open bank website in new tab
      window.open(bank.url, '_blank');
      
      // Simulate payment failure after redirect
      setTimeout(() => {
        navigate("/payment-failed");
      }, 3000);
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
            <h1 className="text-xl font-semibold">Internet Banking</h1>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Select your bank</h2>
          <div className="space-y-3">
            {banks.map((bank) => (
              <label key={bank.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="bank"
                  value={bank.id}
                  checked={selectedBank === bank.id}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-800">{bank.name}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <Button 
              onClick={handleProceed}
              disabled={!selectedBank}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Proceed to Bank
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full py-3"
            >
              Cancel payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBankingPayment;
