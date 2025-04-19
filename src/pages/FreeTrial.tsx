
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const FreeTrial = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">Start Your Free Trial</h1>
            <p className="text-lg text-gray-600">Experience the full power of MindfulAI for 14 days, completely free.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">What's Included:</h2>
                <ul className="space-y-4">
                  {[
                    "Unlimited AI therapy sessions",
                    "Access to all relaxation audio",
                    "Mental wellness games library",
                    "Mood tracking tools",
                    "Self-help resources",
                    "Community support access"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">After Your Trial</h3>
                <p className="text-gray-600 mb-6">Continue your wellness journey with our flexible plans starting at $9.99/month.</p>
                <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-lg py-6">
                  Start 14-Day Free Trial
                </Button>
                <p className="text-sm text-gray-500 mt-4 text-center">No credit card required. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeTrial;
