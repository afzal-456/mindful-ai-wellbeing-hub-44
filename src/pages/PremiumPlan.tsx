
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PremiumPlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-white to-wellness-light">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">Premium Plan</h1>
            <p className="text-xl text-wellness-text">Comprehensive personal wellness journey</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-wellness-primary">₹399</span>
              <span className="text-xl text-wellness-text ml-2">/ month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 border-2 border-wellness-primary">
            <h2 className="text-xl font-semibold mb-6">Premium Features:</h2>
            <div className="space-y-4">
              {[
                "Unlimited AI therapist access",
                "1 free session with a therapist / month",
                "Full access to relaxation tools",
                "Personalized wellness plans",
                "Community group access",
                "Priority support",
                "Advanced progress tracking",
                "Custom wellness reports",
                "Exclusive workshops access"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-wellness-primary mr-2 mt-1" />
                  <span className="text-wellness-text">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white" asChild>
                <Link to="/free-trial">Start 7-Day Free Trial</Link>
              </Button>
              <p className="text-sm text-center text-wellness-muted">Cancel anytime • Money-back guarantee</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremiumPlan;
