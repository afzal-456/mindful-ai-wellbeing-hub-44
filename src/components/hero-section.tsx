
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-gradient-wellness">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wellness-dark mb-4 opacity-0 animate-fade-in">
              Your Journey to Mental Wellness
            </h1>
            <p className="text-lg text-gray-700 mb-8 opacity-0 animate-fade-in-delay-1">
              24/7 emotional support, self-care tools, and access to live therapists—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-2">
              <Button className="bg-wellness-primary hover:bg-wellness-dark text-white px-8 py-6 text-lg" asChild>
                <Link to="/free-trial">Start Free Trial</Link>
              </Button>
              <Button variant="outline" className="border-wellness-primary text-wellness-primary hover:bg-wellness-light px-8 py-6 text-lg" asChild>
                <Link to="/ai-therapist">Chat with AI Therapist</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 opacity-0 animate-fade-in-delay-3">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-wellness-light rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-wellness-light rounded-full -z-10"></div>
              <div className="rounded-2xl shadow-xl overflow-hidden border border-wellness-secondary">
                <img
                 // src="/lovable-uploads/13c05d73-baf4-4cab-a127-191d9e6d39b6.png"
                 // alt="AI-powered mental health platform mobile interface"
                 // className="w-full object-cover"
               />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
