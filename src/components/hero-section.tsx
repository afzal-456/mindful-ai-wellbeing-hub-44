
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-gradient-wellness overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wellness-dark mb-6 opacity-0 animate-fade-in">
              Your Journey to Mental Wellness
            </h1>
            <p className="text-lg text-gray-700 mb-8 opacity-0 animate-fade-in-delay-1">
              24/7 emotional support, self-care tools, and access to live therapists—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-2">
              <Button 
                className="bg-wellness-primary hover:bg-wellness-dark text-white px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300" 
                asChild
              >
                <Link to="/free-trial">Start Free Trial</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-wellness-primary text-wellness-primary hover:bg-wellness-light px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300" 
                asChild
              >
                <Link to="/ai-therapist">Chat with AI Therapist</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="animate-fade-in-delay-3 transform hover:scale-105 transition-duration-300">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-wellness-light rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-wellness-light rounded-full -z-10"></div>
              <img
                src="/lovable-uploads/f3d1ebb8-aaa0-49d7-bd86-1518e7dfaf4e.png"
                alt="Doctor with patient and family"
                className="relative z-10 rounded-2xl shadow-xl w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
