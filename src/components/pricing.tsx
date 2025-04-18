
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      period: "Free Forever",
      description: "Basic mental wellness support",
      features: [
        "AI therapist chat (limited)",
        "Basic mood tracking",
        "Relaxation audio samples",
        "General mental health resources"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Premium Plan",
      price: "₹399",
      period: "per month",
      description: "Comprehensive personal wellness",
      features: [
        "Unlimited AI therapist access",
        "1 free session with a therapist / month",
        "Full access to relaxation tools",
        "Personalized wellness plans",
        "Community group access",
        "Priority support"
      ],
      buttonText: "Start 7-Day Free Trial",
      buttonVariant: "default" as const,
      highlight: true
    },
    {
      name: "Institutional Plan",
      price: "Custom",
      period: "billed annually",
      description: "For organizations and schools",
      features: [
        "Bulk user accounts",
        "Admin dashboard with analytics",
        "Dedicated account manager",
        "Custom wellness programs",
        "Group workshop sessions",
        "White-label options"
      ],
      buttonText: "Contact Us",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-wellness-dark">
          Pricing Plans
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Affordable mental wellness solutions for everyone
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.highlight ? 'border-wellness-primary shadow-lg' : 'shadow'}`}
            >
              <CardHeader>
                <CardTitle className="text-xl text-wellness-dark">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-wellness-dark">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-wellness-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.buttonVariant} 
                  className={`w-full ${plan.buttonVariant === 'default' ? 'bg-wellness-primary hover:bg-wellness-dark' : 'border-wellness-primary text-wellness-primary hover:bg-wellness-light'}`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
