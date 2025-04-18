
import React from "react";
import { MessageCircle, Lightbulb, Users, BarChart3, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageCircle className="process-icon" />,
      title: "Chat with AI",
      description: "Share your feelings with our empathetic AI therapist"
    },
    {
      icon: <Lightbulb className="process-icon" />,
      title: "Get Tools & Tips",
      description: "Receive personalized coping strategies and resources"
    },
    {
      icon: <Users className="process-icon" />,
      title: "Join Groups or Book Session",
      description: "Connect with peers or professional therapists"
    },
    {
      icon: <BarChart3 className="process-icon" />,
      title: "Track Progress",
      description: "Monitor your wellbeing journey with insights"
    }
  ];

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-wellness-dark">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A simple four-step process to support your mental health journey
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center max-w-xs">
                {step.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-wellness-dark">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="process-arrow hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
