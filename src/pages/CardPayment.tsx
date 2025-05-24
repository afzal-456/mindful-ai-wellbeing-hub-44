
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CardPayment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    saveCard: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      toast.error("Transaction failed {backend not set :( }");
      navigate("/payment-failed");
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? " / " + v.substring(2, 4) : "");
    }
    return v;
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
            <h1 className="text-xl font-semibold">Debit / Credit Card</h1>
          </div>
        </div>

        {/* Card Type Tabs */}
        <div className="p-6 border-b">
          <div className="flex border-b">
            <button className="flex-1 py-2 px-4 border-b-2 border-blue-500 text-blue-600 font-medium">
              Debit Card
            </button>
            <button className="flex-1 py-2 px-4 text-gray-500">
              Credit Card
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Card Number</label>
              <div className="relative">
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                  placeholder="8834 2834 8897 5370"
                  maxLength={19}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Expiry date</label>
                <Input
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                  placeholder="Jan • 2023"
                  maxLength={7}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">CVV</label>
                <Input
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  placeholder="• • •"
                  maxLength={4}
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ADDISON NELSON"
                className="uppercase"
              />
            </div>

            {/* Save Card Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                checked={formData.saveCard}
                onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="saveCard" className="text-sm text-gray-600">
                Save card for future checkouts
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
              Pay Now
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
  );
};

export default CardPayment;
