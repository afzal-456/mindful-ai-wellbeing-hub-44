
import React from "react";
import { MessageCircle, Calendar, Music, Gamepad2, Users, FileText } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="feature-icon" />,
      title: "AI Therapist",
      description: "24/7 Chat Support"
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: "Live Sessions",
      description: "Book Professionals"
    },
    {
      icon: <Music className="feature-icon" />,
      title: "Relaxation Tools",
      description: "Calming music & exercises"
    },
    {
      icon: <Gamepad2 className="feature-icon" />,
      title: "Mental Games",
      description: "Stress relievers"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Peer Support",
      description: "Community groups"
    },
    {
      icon: <FileText className="feature-icon" />,
      title: "Personalized Plans",
      description: "Custom guidance"
    }
  ];

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-wellness-dark">
          All-in-One Mental Wellness Toolkit
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need for your mental wellbeing journey, conveniently accessible in one place.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-wellness-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
