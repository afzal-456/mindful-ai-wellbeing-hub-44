
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const FreePlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-white to-wellness-light">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">Free Plan</h1>
            <p className="text-xl text-wellness-text">Basic mental wellness support, forever free</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-wellness-primary">₹0</span>
              <span className="text-xl text-wellness-text ml-2">/ Forever</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6">What's Included:</h2>
            <div className="space-y-4">
              {[
                "AI therapist chat (limited)",
                "Basic mood tracking",
                "Relaxation audio samples",
                "General mental health resources",
                "Community forum access",
                "Basic progress tracking"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-wellness-primary mr-2 mt-1" />
                  <span className="text-wellness-text">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white" asChild>
                <Link to="/signup">Get Started Now</Link>
              </Button>
              <p className="text-sm text-center text-wellness-muted">No credit card required</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreePlan;
