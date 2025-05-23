import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Calendar, Music, Gamepad2, Users, FileText } from "lucide-react";
const FeaturesSection = () => {
  const features = [{
    icon: <MessageCircle className="feature-icon" />,
    title: "AI Therapist",
    description: "24/7 Chat Support",
    link: "/ai-therapist"
  }, {
    icon: <Calendar className="feature-icon" />,
    title: "Live Sessions",
    description: "Book Professionals",
    link: "/live-sessions"
  }, {
    icon: <Music className="feature-icon" />,
    title: "Relaxation Tools",
    description: "Calming music & exercises",
    link: "/relaxation-audio"
  }, {
    icon: <Gamepad2 className="feature-icon" />,
    title: "Mental Games",
    description: "Stress relievers",
    link: "/mental-games"
  }, {
    icon: <Users className="feature-icon" />,
    title: "Peer Support",
    description: "Community groups",
    link: "/support-groups"
  }, {
    icon: <FileText className="feature-icon" />,
    title: "Personalized Plans",
    description: "Custom guidance",
    link: "/user-dashboard"
  }];
  return <section className="py-16 px-6 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-12">
          
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-wellness-dark">
            All-in-One Mental Wellness Toolkit
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need for your mental wellbeing journey, conveniently accessible in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <Link key={index} to={feature.link} className="feature-card hover:scale-105 transition-transform duration-300">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-wellness-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>)}
        </div>
      </div>
    </section>;
};
export default FeaturesSection;