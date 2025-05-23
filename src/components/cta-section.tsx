
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 px-6 md:px-10 lg:px-20 bg-wellness-primary">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Start Your Mental Wellness Journey Today
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands who have transformed their mental health with our AI-powered platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-wellness-primary hover:bg-wellness-light hover:text-wellness-dark px-8 py-6 text-lg"
            asChild
          >
            <Link to="/free-trial">Start Free Trial</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white opacity-0 hover:opacity-100 transition-opacity duration-300 px-8 py-6 text-lg"
            asChild
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
