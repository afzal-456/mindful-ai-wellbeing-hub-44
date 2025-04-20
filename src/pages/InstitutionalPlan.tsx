
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const InstitutionalPlan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-white to-wellness-light">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Building2 className="w-16 h-16 mx-auto text-wellness-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">Institutional Plan</h1>
            <p className="text-xl text-wellness-text">Customized solutions for organizations</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-wellness-primary">Custom</span>
              <span className="text-xl text-wellness-text ml-2">billed annually</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6">Enterprise Features:</h2>
            <div className="space-y-4">
              {[
                "Bulk user accounts",
                "Admin dashboard with analytics",
                "Dedicated account manager",
                "Custom wellness programs",
                "Group workshop sessions",
                "White-label options",
                "API access",
                "Custom integration support",
                "24/7 priority support",
                "Quarterly wellness reports"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-wellness-primary mr-2 mt-1" />
                  <span className="text-wellness-text">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <p className="text-sm text-center text-wellness-muted">Custom pricing based on organization size</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstitutionalPlan;
